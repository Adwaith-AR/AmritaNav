#!/usr/bin/env node
/**
 * generate-nav-data.js
 *
 * Builds per-floor navigation data (json/ground.json, json/first.json,
 * json/second.json, json/third.json) directly from the real SVG floor maps:
 *
 *   floor-0.svg -> Ground Floor
 *   floor-1.svg -> First Floor
 *   floor-2.svg -> Second Floor
 *   floor-3.svg -> Third Floor
 *
 * Geometry source of truth (per SVG, viewBox 0 0 2112 1300):
 *   - polyline.pathway-wall  : walkable corridor centerlines (waypoint graph)
 *   - rect.room-wall         : rooms (walls block routing)
 *   - rect[data-name=Stairs] : staircases (floor transition points)
 *
 * Also emits the combined campus-data.js consumed by the browser
 * (window.CAMPUS_NAV_DATA) with cross-floor stair connections.
 *
 * Usage: node tools/generate-nav-data.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FLOOR_SOURCES = [
  { file: 'floor-0.svg', id: 'ground', idx: 0, title: 'Ground Floor' },
  { file: 'floor-1.svg', id: 'first', idx: 1, title: 'First Floor' },
  { file: 'floor-2.svg', id: 'second', idx: 2, title: 'Second Floor' },
  { file: 'floor-3.svg', id: 'third', idx: 3, title: 'Third Floor' }
];

const PX_PER_METER = 6.67;
const STAIR_PENALTY_METERS = 15;
const MAX_SEG = 24;          // max distance between waypoints along a corridor (px)
const JUNCTION_TOL = 12;     // vertex-vertex junction link tolerance (px)
const T_JUNCTION_TOL = 10;   // vertex-to-segment junction tolerance (px)
const STAIR_MATCH_TOL = 30;  // cross-floor stair matching tolerance (px)

// Reference stair column names/positions (from First Floor SVG, identical on 2nd/3rd)
const STAIR_COLUMNS = [
  { id: 'STAIR-NW', name: 'North-West Stairs (Near Reception / CAD)', pos: [542.5, 688.5] },
  { id: 'STAIR-SW', name: 'South-West Stairs (Near Acharya Hall)', pos: [570.5, 942.5] },
  { id: 'STAIR-N', name: 'North Wing Stairs (Near Physics / Chemistry Labs)', pos: [889, 320.5] },
  { id: 'STAIR-CS', name: 'Central-South Stairs (Near Courtyard)', pos: [922.5, 990.5] },
  { id: 'STAIR-CTR', name: 'Central Spine Stairs (Main Axis)', pos: [988, 765] },
  { id: 'STAIR-NE', name: 'North-East Stairs (Near Nanotech / CIR)', pos: [1361.5, 491.5] },
  { id: 'STAIR-E', name: 'East Wing Stairs (Near Computer Labs)', pos: [1661, 691.5] }
];

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------
function parsePoints(str) {
  return str.trim().split(/\s+/).map(pair => {
    const [x, y] = pair.split(',').map(Number);
    return [x, y];
  });
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : null;
}

function rotatePoint(p, c, deg) {
  const rad = (deg * Math.PI) / 180;
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  return [
    c[0] + dx * Math.cos(rad) - dy * Math.sin(rad),
    c[1] + dx * Math.sin(rad) + dy * Math.cos(rad)
  ];
}

// Rotated rect -> corner polygon
function rectPolygon(r) {
  const corners = [
    [r.x, r.y],
    [r.x + r.w, r.y],
    [r.x + r.w, r.y + r.h],
    [r.x, r.y + r.h]
  ];
  if (!r.rot) return corners;
  return corners.map(c => rotatePoint(c, r.rotCenter, r.rot));
}

function polygonCentroid(poly) {
  let x = 0, y = 0;
  poly.forEach(p => { x += p[0]; y += p[1]; });
  return [x / poly.length, y / poly.length];
}

function dist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function pointSegDist(p, a, b) {
  const abx = b[0] - a[0], aby = b[1] - a[1];
  const l2 = abx * abx + aby * aby;
  if (l2 < 1e-9) return { d: dist(p, a), t: 0 };
  let t = ((p[0] - a[0]) * abx + (p[1] - a[1]) * aby) / l2;
  t = Math.max(0, Math.min(1, t));
  return { d: Math.hypot(p[0] - (a[0] + t * abx), p[1] - (a[1] + t * aby)), t };
}

function pointInPoly(p, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    if (((yi > p[1]) !== (yj > p[1])) &&
        (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

function segIntersectsSeg(p1, p2, p3, p4) {
  const d1 = cross(p3, p4, p1);
  const d2 = cross(p3, p4, p2);
  const d3 = cross(p1, p2, p3);
  const d4 = cross(p1, p2, p4);
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
      ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return true;
  return false;
}

function cross(a, b, p) {
  return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
}

/**
 * Returns true if segment p-q properly crosses the polygon interior
 * or its midpoint lies inside. Touching the boundary within `graze`
 * px of an endpoint is tolerated (junction nodes sit on room corners).
 */
function segCrossesPoly(p, q, poly, graze = 1.5) {
  // midpoint inside => crosses
  if (pointInPoly([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], poly)) return true;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if (segIntersectsSeg(p, q, a, b)) {
      // tolerate intersections right at the segment endpoints
      const dA = pointSegDist(a, p, q).d;
      const dB = pointSegDist(b, p, q).d;
      const touchA = dist(a, p) <= graze || dist(a, q) <= graze;
      const touchB = dist(b, p) <= graze || dist(b, q) <= graze;
      if ((touchA || dA <= graze) && (touchB || dB <= graze)) continue;
      if (dA <= graze || dB <= graze) continue;
      return true;
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// SVG parsing
// ---------------------------------------------------------------------------
function parseSvg(filePath) {
  const svg = fs.readFileSync(filePath, 'utf8');

  const rooms = [];
  const rectRe = /<rect\b[^>]*>/g;
  let m;
  while ((m = rectRe.exec(svg)) !== null) {
    const tag = m[0];
    if (!/class="room-wall"/.test(tag)) continue;
    const rotMatch = tag.match(/transform="rotate\(\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*\)"/);
    const room = {
      id: attr(tag, 'id'),
      name: (attr(tag, 'data-name') || '').trim(),
      code: (attr(tag, 'data-code') || '').trim(),
      x: parseFloat(attr(tag, 'x')),
      y: parseFloat(attr(tag, 'y')),
      w: parseFloat(attr(tag, 'width')),
      h: parseFloat(attr(tag, 'height'))
    };
    if (rotMatch) {
      room.rot = parseFloat(rotMatch[1]);
      room.rotCenter = [parseFloat(rotMatch[2]), parseFloat(rotMatch[3])];
    }
    room.cx = room.x + room.w / 2;
    room.cy = room.y + room.h / 2;
    if (room.rot) {
      const c = rotatePoint([room.cx, room.cy], room.rotCenter, room.rot);
      room.cx = c[0];
      room.cy = c[1];
    }
    room.polygon = rectPolygon(room);
    rooms.push(room);
  }

  const pathways = [];
  const lineRe = /<polyline\b[^>]*>/g;
  while ((m = lineRe.exec(svg)) !== null) {
    const tag = m[0];
    if (!/class="pathway-wall"/.test(tag)) continue;
    const id = attr(tag, 'id');
    if (!id || id.endsWith('-casing')) continue;
    pathways.push({
      id,
      name: (attr(tag, 'data-name') || id).trim(),
      width: parseFloat(attr(tag, 'stroke-width')) || 16,
      points: parsePoints(attr(tag, 'points'))
    });
  }

  return { rooms, pathways };
}

// ---------------------------------------------------------------------------
// Per-floor graph construction
// ---------------------------------------------------------------------------
function buildFloorGraph(floorInfo, parsed, report) {
  const { rooms, pathways } = parsed;
  const nodes = [];
  const adj = new Map();
  const nodeKey = new Map();

  const isCourtyard = r => /courtyard/i.test(r.name) || /^cyd/i.test(r.code || '');
  const isStairRoom = r => /stair/i.test(r.name);
  const blocking = rooms.filter(r => !isCourtyard(r) && !isStairRoom(r));

  function addNode(x, y, type, extra = {}) {
    const key = `${Math.round(x * 2) / 2}|${Math.round(y * 2) / 2}`;
    if (nodeKey.has(key)) {
      const n = nodes[nodeKey.get(key)];
      if (extra.pathwayId && !n.pathways.includes(extra.pathwayId)) {
        n.pathways.push(extra.pathwayId);
      }
      return n;
    }
    const n = {
      id: `${floorInfo.id}_wp_${nodes.length}`,
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
      floor: floorInfo.id,
      floorIdx: floorInfo.idx,
      type,
      pathways: extra.pathwayId ? [extra.pathwayId] : [],
      ...extra
    };
    delete n.pathwayId;
    nodeKey.set(key, nodes.length);
    nodes.push(n);
    adj.set(n.id, []);
    return n;
  }

  function addEdge(u, v, type) {
    if (u.id === v.id) return;
    const w = Math.round(dist([u.x, u.y], [v.x, v.y]) * 100) / 100;
    if (!adj.get(u.id).some(e => e.node === v.id)) {
      adj.get(u.id).push({ node: v.id, weight: w, type });
    }
    if (!adj.get(v.id).some(e => e.node === u.id)) {
      adj.get(v.id).push({ node: u.id, weight: w, type });
    }
  }

  function edgeBlocked(u, v, skipRoomIds = []) {
    for (const room of blocking) {
      if (skipRoomIds.includes(room.id)) continue;
      // If either endpoint lies inside this room, the SVG draws walkable
      // space inside it (halls, wings) — the room cannot block this edge.
      if (pointInPoly([u.x, u.y], room.polygon) ||
          pointInPoly([v.x, v.y], room.polygon)) continue;
      if (segCrossesPoly([u.x, u.y], [v.x, v.y], room.polygon)) return room;
    }
    return null;
  }

  // --- 1. Waypoints along every pathway centerline ---
  for (const pw of pathways) {
    const pts = pw.points;
    let prev = null;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const segLen = dist(a, b);
      const steps = Math.max(1, Math.ceil(segLen / MAX_SEG));
      for (let s = 0; s <= steps; s++) {
        if (i > 0 && s === 0) continue; // shared vertex already added
        const t = s / steps;
        const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        const n = addNode(p[0], p[1], 'waypoint', { pathwayId: pw.id });
        if (prev && prev.pathwayId === pw.id) addEdge(prev.node, n, 'corridor');
        prev = { node: n, pathwayId: pw.id };
      }
      // reset chain at each original vertex pair start
      prev = { node: addNode(b[0], b[1], 'waypoint', { pathwayId: pw.id }), pathwayId: pw.id };
    }
    if (pts.length === 1) {
      addNode(pts[0][0], pts[0][1], 'waypoint', { pathwayId: pw.id });
    }
  }

  // --- 2. Junction links between different pathways ---
  // a) vertex-vertex (corridors drawn touching / sharing coordinates)
  let junctionCount = 0;
  const verticesByPathway = pathways.map(pw => {
    const vs = [];
    for (const [x, y] of pw.points) {
      const key = `${Math.round(x * 2) / 2}|${Math.round(y * 2) / 2}`;
      if (nodeKey.has(key)) vs.push(nodes[nodeKey.get(key)]);
    }
    return vs;
  });

  for (let i = 0; i < pathways.length; i++) {
    for (let j = 0; j < pathways.length; j++) {
      if (i === j) continue;
      for (const v of verticesByPathway[i]) {
        let best = null;
        for (const w of verticesByPathway[j]) {
          const d = dist([v.x, v.y], [w.x, w.y]);
          if (d <= JUNCTION_TOL && (!best || d < best.d)) best = { n: w, d };
        }
        if (best && !blockedJunction(v, best.n)) {
          const before = adj.get(v.id).length;
          addEdge(v, best.n, 'junction');
          if (adj.get(v.id).length > before) junctionCount++;
        }
      }
    }
  }

  function blockedJunction(a, b) {
    return !!edgeBlocked(a, b);
  }

  // b) vertex-to-segment (T junctions without shared coordinates)
  for (let i = 0; i < pathways.length; i++) {
    for (let j = 0; j < pathways.length; j++) {
      if (i === j) continue;
      const pwB = pathways[j];
      const ptsB = pwB.points;
      for (const v of verticesByPathway[i]) {
        let best = null;
        for (let k = 0; k < ptsB.length - 1; k++) {
          const { d, t } = pointSegDist([v.x, v.y], ptsB[k], ptsB[k + 1]);
          if (t > 0.02 && t < 0.98 && d <= T_JUNCTION_TOL && (!best || d < best.d)) {
            best = { d, segIndex: k, t };
          }
        }
        if (!best) continue;
        // nearest waypoint node on that segment of B
        const a = ptsB[best.segIndex], b = ptsB[best.segIndex + 1];
        const target = [a[0] + (b[0] - a[0]) * best.t, a[1] + (b[1] - a[1]) * best.t];
        let bn = null, bd = Infinity;
        for (const w of nodes) {
          if (!w.pathways.includes(pwB.id)) continue;
          const d = dist([w.x, w.y], target);
          if (d < bd) { bd = d; bn = w; }
        }
        if (bn && !adj.get(v.id).some(e => e.node === bn.id) && !edgeBlocked(v, bn)) {
          addEdge(v, bn, 'junction');
          junctionCount++;
        }
      }
    }
  }
  report.junctions = junctionCount;

  // --- 3. Stairs ---
  const stairRooms = rooms.filter(isStairRoom);
  const stairs = [];
  for (const sr of stairRooms) {
    const col = matchStairColumn(sr.cx, sr.cy);
    const stairNode = addNode(sr.cx, sr.cy, 'stair', {
      stairId: col ? col.id : `${floorInfo.id}_STAIR_X${stairs.length}`,
      stairName: col ? col.name : sr.name,
      isStair: true
    });
    // link stair to nearest walkable waypoints (a few, not just one)
    const cands = nodes
      .filter(n => n.type === 'waypoint')
      .map(n => ({ n, d: dist([n.x, n.y], [sr.cx, sr.cy]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 12);
    let linked = 0;
    for (const { n, d } of cands) {
      if (linked >= 3 || d > 60) break;
      if (adj.get(stairNode.id).some(e => e.node === n.id)) continue;
      if (!edgeBlocked(stairNode, n)) {
        addEdge(stairNode, n, 'stair_access');
        linked++;
      }
    }
    if (linked === 0) report.errors.push(`Stair ${sr.id} (${col ? col.id : '?'}) has NO walkable access on ${floorInfo.id}`);
    stairs.push({
      id: stairNode.id,
      roomId: sr.id,
      colId: stairNode.stairId,
      name: stairNode.stairName,
      x: sr.cx,
      y: sr.cy
    });
  }

  // --- 4. Room doors (room -> corridor entry point) ---
  const doorNodes = [];
  const roomEntries = new Map();
  const routingRooms = rooms.filter(r => !isStairRoom(r));
  for (const room of routingRooms) {
    const isCourtyardRoom = isCourtyard(room);
    // nearest walkable waypoints to the room center
    const cands = nodes
      .filter(n => n.type === 'waypoint')
      .map(n => ({ n, d: dist([n.x, n.y], [room.cx, room.cy]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 14);

    let bestDoor = null;
    for (const { n } of cands) {
      // door point: closest point on room boundary to this waypoint
      const door = closestBoundaryPoint(room.polygon, [n.x, n.y]);
      const blocked = edgeBlocked({ x: door[0], y: door[1] }, n, [room.id]);
      // If the waypoint itself lies inside this room, the SVG draws walkable
      // space inside it (halls/reception) — entering is legitimate.
      const wpInside = pointInPoly([n.x, n.y], room.polygon);
      const ownerOk = wpInside || !segCrossesPoly([door[0], door[1]], [n.x, n.y], room.polygon, 0.5);
      if (!blocked && ownerOk) {
        bestDoor = { wp: n, door };
        break;
      }
    }

    if (!bestDoor) {
      report.errors.push(`Room ${room.id} (${room.name || room.code}) on ${floorInfo.id}: no door connection found`);
      roomEntries.set(room.id, null);
      continue;
    }

    const doorNode = addNode(bestDoor.door[0], bestDoor.door[1], 'room_door', { roomId: room.id });
    addEdge(doorNode, bestDoor.wp, 'room_access');
    roomEntries.set(room.id, {
      nodeId: doorNode.id,
      entryX: Math.round(bestDoor.door[0] * 10) / 10,
      entryY: Math.round(bestDoor.door[1] * 10) / 10
    });
    if (!isCourtyardRoom) doorNodes.push(doorNode);
  }

  // --- 5. Connectivity check & island healing ---
  const nodeById = new Map(nodes.map(n => [n.id, n]));
  const components = connectedComponents(nodes, adj);
  if (components.length > 1) {
    components.sort((a, b) => b.size - a.size);
    const mainSet = components[0];
    report.components = components.length;
    for (let ci = 1; ci < components.length; ci++) {
      // try to bridge island to the main component
      let bridged = false;
      outer:
      for (const islandNodeId of components[ci]) {
        const islandNode = nodeById.get(islandNodeId);
        for (const mainNodeId of mainSet) {
          const mainNode = nodeById.get(mainNodeId);
          const d = dist([islandNode.x, islandNode.y], [mainNode.x, mainNode.y]);
          if (d > 90) continue;
          if (!edgeBlocked(islandNode, mainNode)) {
            addEdge(islandNode, mainNode, 'bridge');
            bridged = true;
            break outer;
          }
        }
      }
      if (!bridged) report.errors.push(`Island of ${components[ci].length} nodes on ${floorInfo.id} could not be bridged`);
    }
  }

  // reachable room check
  const mainComp = connectedComponents(nodes, adj)[0];
  const reach = new Set(mainComp);
  let unreachableRooms = 0;
  for (const [roomId, entry] of roomEntries) {
    if (!entry) { unreachableRooms++; continue; }
    if (!reach.has(entry.nodeId)) {
      unreachableRooms++;
      report.errors.push(`Room ${roomId} on ${floorInfo.id} is NOT reachable from the corridor network`);
    }
  }
  report.unreachableRooms = unreachableRooms;

  // --- 6. Assemble floor data ---
  const floorRooms = routingRooms.map(room => {
    const entry = roomEntries.get(room.id);
    const stair = stairs.find(s => s.roomId === room.id);
    return {
      id: room.id,
      nodeId: stair ? stair.id : (entry ? entry.nodeId : null),
      title: room.name || room.code || room.id,
      name: room.name || room.code || room.id,
      code: room.code || '',
      floor: floorInfo.id,
      floorIdx: floorInfo.idx,
      floorTitle: floorInfo.title,
      cx: Math.round(room.cx * 10) / 10,
      cy: Math.round(room.cy * 10) / 10,
      x: Math.round(room.cx * 10) / 10,
      y: Math.round(room.cy * 10) / 10,
      entryX: stair ? stair.x : (entry ? entry.entryX : null),
      entryY: stair ? stair.y : (entry ? entry.entryY : null),
      isStairs: !!stair,
      stairColId: stair ? stair.colId : null
    };
  });

  return {
    id: floorInfo.id,
    floor: floorInfo.id,
    floorIdx: floorInfo.idx,
    title: floorInfo.title,
    viewBox: [2112, 1300],
    sourceSvg: floorInfo.file,
    rooms: floorRooms,
    stairs,
    nodes: nodes.map(n => ({
      id: n.id, x: n.x, y: n.y, floor: n.floor, floorIdx: n.floorIdx,
      type: n.type, ...(n.stairId ? { stairId: n.stairId, stairName: n.stairName } : {})
    })),
    edges: Object.fromEntries(Array.from(adj.entries()).map(([k, v]) => [k, v])),
    meta: report
  };
}

function closestBoundaryPoint(poly, p) {
  let best = null;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const { d, t } = pointSegDist(p, a, b);
    if (!best || d < best.d) {
      best = {
        d,
        pt: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
      };
    }
  }
  return best.pt;
}

function matchStairColumn(x, y) {
  let best = null;
  for (const col of STAIR_COLUMNS) {
    const d = dist([x, y], col.pos);
    if (d <= STAIR_MATCH_TOL && (!best || d < best.d)) best = { ...col, d };
  }
  return best;
}

function connectedComponents(nodes, adj) {
  const seen = new Set();
  const comps = [];
  for (const n of nodes) {
    if (seen.has(n.id)) continue;
    const comp = [];
    const stack = [n.id];
    seen.add(n.id);
    while (stack.length) {
      const cur = stack.pop();
      comp.push(cur);
      for (const e of adj.get(cur) || []) {
        if (!seen.has(e.node)) {
          seen.add(e.node);
          stack.push(e.node);
        }
      }
    }
    comps.push(comp);
  }
  return comps;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const jsonDir = path.join(ROOT, 'json');
  if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });

  const floorData = {};
  const usedColumns = new Set();
  const usedRoomIds = new Set(); // room ids are made unique per floor

  // Room ids are namespaced per floor to match the interactive overlay rects
  // in index.html: ground keeps the SVG id, upper floors use the existing
  // "f1_<id>" / "f2_<id>" / "f3_<id>" convention (the four SVGs share ids
  // for common shell rooms, so ids must be unique per floor).
  function uniqueRoomId(room, floorInfo) {
    if (floorInfo.idx === 0) return room.id;
    return `f${floorInfo.idx}_${room.id}`;
  }

  for (const info of FLOOR_SOURCES) {
    const parsed = parseSvg(path.join(ROOT, info.file));
    const report = { errors: [], junctions: 0, components: 1, unreachableRooms: 0 };
    const data = buildFloorGraph(info, parsed, report);

    // rename room ids for this floor (and dependent fields)
    const idMap = new Map();
    for (const room of data.rooms) {
      const newId = uniqueRoomId({ id: room.id }, info);
      if (newId !== room.id) idMap.set(room.id, newId);
      usedRoomIds.add(newId);
    }
    const remap = id => idMap.get(id) || id;
    data.rooms.forEach(r => {
      r.svgId = r.id;
      r.id = remap(r.id);
    });
    data.stairs.forEach(s => {
      s.roomId = remap(s.roomId);
    });
    data.nodes.forEach(n => {
      if (n.type === 'room_door' && n.roomId) n.roomId = remap(n.roomId);
    });

    // only keep stair columns that actually matched on this floor
    data.stairs.forEach(s => usedColumns.add(s.colId));

    fs.writeFileSync(
      path.join(jsonDir, `${info.id}.json`),
      JSON.stringify(data, null, 2)
    );

    console.log(`\n=== ${info.title} (${info.file}) ===`);
    console.log(`rooms: ${parsed.rooms.length} | pathways: ${parsed.pathways.length} | ` +
      `waypoints+doors: ${data.nodes.length} | stairs: ${data.stairs.length}`);
    console.log(`junction links: ${report.junctions} | components: ${report.components} | ` +
      `unreachable rooms: ${report.unreachableRooms}`);
    if (report.errors.length) {
      report.errors.forEach(e => console.log('  !! ' + e));
    }
    console.log('stairs: ' + data.stairs.map(s => s.colId).join(', '));
    floorData[info.id] = data;
  }

  // --- Cross-floor stair connections (only columns present on BOTH floors) ---
  const floorOrder = ['ground', 'first', 'second', 'third'];
  const stairConnections = [];
  for (const col of STAIR_COLUMNS) {
    const presentOn = floorOrder.filter(fk =>
      floorData[fk].stairs.some(s => s.colId === col.id));
    if (presentOn.length > 0) usedColumns.add(col.id);
    if (presentOn.length > 1) {
      stairConnections.push({ id: col.id, name: col.name, floors: presentOn });
    }
  }

  // --- Combined campus-data.js (schema consumed by script.js / campus-router.js) ---
  const allNodes = [];
  const mergedEdges = {};
  const allRooms = [];
  const floorsOut = {};

  for (const fk of floorOrder) {
    const fd = floorData[fk];
    const nodeOffset = allNodes.length;
    const indexById = {};
    fd.nodes.forEach((n, i) => { indexById[n.id] = nodeOffset + i; });

    // cross-floor stair edges: link stair node to same column on adjacent floor
    const extraEdges = {};
    const crossFloorLinks = [];
    for (const s of fd.stairs) {
      const link = stairConnections.find(l => l.id === s.colId);
      if (!link) continue;
      const myIdx = link.floors.indexOf(fk);
      ['first', 'second', 'third', 'ground'].forEach(other => {
        if (other === fk) return;
        const otherIdx = link.floors.indexOf(other);
        if (otherIdx === -1 || Math.abs(otherIdx - myIdx) !== 1) return;
        // only add once per pair (from the higher floor)
        if (myIdx > otherIdx) {
          const otherStair = floorData[other].stairs.find(st => st.colId === s.colId);
          if (otherStair) {
            crossFloorLinks.push([s.id, otherStair.id]);
          }
        }
      });
    }
    // emit BOTH directions — the router's adjacency builder does not
    // symmetrise object-style edge lists.
    for (const [higher, lower] of crossFloorLinks) {
      extraEdges[higher] = (extraEdges[higher] || []).concat([{
        node: lower,
        weight: STAIR_PENALTY_METERS * PX_PER_METER,
        distPx: STAIR_PENALTY_METERS * PX_PER_METER,
        distMeters: STAIR_PENALTY_METERS,
        type: 'stairwell'
      }]);
      extraEdges[lower] = (extraEdges[lower] || []).concat([{
        node: higher,
        weight: STAIR_PENALTY_METERS * PX_PER_METER,
        distPx: STAIR_PENALTY_METERS * PX_PER_METER,
        distMeters: STAIR_PENALTY_METERS,
        type: 'stairwell'
      }]);
    }

    fd.nodes.forEach(n => allNodes.push(n));
    Object.entries(fd.edges).forEach(([k, v]) => { mergedEdges[k] = v; });
    Object.entries(extraEdges).forEach(([k, v]) => {
      mergedEdges[k] = (mergedEdges[k] || []).concat(v);
    });

    fd.rooms.forEach(r => {
      allRooms.push(r);
    });

    floorsOut[fk] = {
      id: fd.id,
      floor: fd.floor,
      floorIdx: fd.floorIdx,
      title: fd.title,
      viewBox: fd.viewBox,
      sourceSvg: fd.sourceSvg,
      rooms: fd.rooms,
      stairs: fd.stairs,
      nodes: fd.nodes,
      edges: fd.edges
    };
  }

  const combined = {
    pxPerMeter: PX_PER_METER,
    scaleMetersPerPixel: Math.round((1 / PX_PER_METER) * 10000) / 10000,
    avgWalkingSpeedMps: 1.3,
    stairPenaltyMeters: STAIR_PENALTY_METERS,
    generatedFrom: FLOOR_SOURCES.map(f => `${f.id}=${f.file}`).join(', '),
    stairColumns: STAIR_COLUMNS.filter(c => usedColumns.has(c.id)),
    stairConnections,
    floors: floorsOut,
    rooms: allRooms,
    allRooms,
    nodes: allNodes,
    edges: mergedEdges
  };

  const jsOut = `/**
 * AmritaNav - Multi-Floor Campus Navigation Data (AUTO-GENERATED)
 * Source of truth: the real SVG floor maps (floor-0/1/2/3.svg).
 * Regenerate with: node tools/generate-nav-data.js
 *
 * Per-floor data files: json/ground.json, json/first.json, json/second.json, json/third.json
 * ViewBox: 0 0 2112 1300, ~${PX_PER_METER} px/meter
 */
(function() {
  const CAMPUS_NAV_DATA = ${JSON.stringify(combined)};

  if (typeof window !== "undefined") {
    window.CAMPUS_NAV_DATA = CAMPUS_NAV_DATA;
    window.GROUND_NAV_DATA = CAMPUS_NAV_DATA;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAMPUS_NAV_DATA: CAMPUS_NAV_DATA };
  }
})();
`;
  fs.writeFileSync(path.join(ROOT, 'campus-data.js'), jsOut);

  console.log('\n=== Stair connections (from actual SVG positions) ===');
  stairConnections.forEach(l =>
    console.log(`${l.id}: ${l.floors.join(' <-> ')}`));
  const missing = STAIR_COLUMNS.filter(c => !usedColumns.has(c.id));
  if (missing.length) console.log('unused columns: ' + missing.map(c => c.id).join(', '));

  console.log(`\nWrote json/{ground,first,second,third}.json and campus-data.js`);
  console.log(`Total nodes: ${allNodes.length} | total rooms: ${allRooms.length}`);
}

main();
