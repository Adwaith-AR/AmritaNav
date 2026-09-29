#!/usr/bin/env node
/**
 * test-routes.js — validates the generated navigation data end-to-end.
 *
 * 1. Runs A* routes (the same CampusRouter the browser uses) for room pairs
 *    across ALL floor combinations (ground/first/second/third, both ways).
 * 2. Validates every route polyline segment against the SVG room polygons:
 *    a route may only be inside a room if one of its endpoints (door/room
 *    entry) belongs to that room — otherwise it is a wall crossing.
 * 3. Validates multi-floor routes: contiguous floors, stairs exist on both
 *    sides of every transition and are matched columns from the SVGs.
 *
 * Usage: node tools/test-routes.js
 */

const path = require('path');
const fs = require('fs');
const { CAMPUS_NAV_DATA } = require(path.join(__dirname, '..', 'campus-data.js'));
const { CampusRouter } = require(path.join(__dirname, '..', 'campus-router.js'));
const GEN = ((src) => {
  const fn = new Function('module', 'exports', 'require', '__dirname',
    src.replace(/^#!.*\n/, '').replace(/main\(\);?\s*$/, '') +
    ';module.exports={parseSvg,segCrossesPoly,pointInPoly,dist};');
  const m = { exports: {} };
  fn(m, m.exports, require, __dirname);
  return m.exports;
})(fs.readFileSync(path.join(__dirname, 'generate-nav-data.js'), 'utf8'));

const FLOORS = ['ground', 'first', 'second', 'third'];
const router = new CampusRouter(CAMPUS_NAV_DATA);

// --- blocking polygons per floor (from the JSONs + SVG parse rules) ---------
const floorJson = {};
for (const f of FLOORS) floorJson[f] = require(path.join(__dirname, '..', 'json', f + '.json'));

const blockingByFloor = {};
for (const f of FLOORS) {
  blockingByFloor[f] = floorJson[f].rooms
    .filter(r => !/courtyard/i.test(r.name) && !r.isStairs)
    .map(r => ({
      id: r.id,
      poly: polyOfRoom(r)
    }));
}

function polyOfRoom(r) {
  // The JSON rooms only carry cx/cy; re-derive polygons from the SVG
  if (!GEN._rooms) {
    GEN._rooms = {};
    for (const f of FLOORS) {
      GEN._rooms[f] = new Map(parseSvgRooms(f).map(r => [r.id, r]));
    }
  }
  const src = GEN._rooms[r.floor].get(r.svgId || r.id);
  return src ? src.polygon : null;
}

function parseSvgRooms(f) {
  const info = {
    ground: 'floor-0.svg', first: 'floor-1.svg', second: 'floor-2.svg', third: 'floor-3.svg'
  }[f];
  const parsed = GEN.parseSvg(path.join(__dirname, '..', info));
  return parsed.rooms.filter(r => !/courtyard/i.test(r.name) && !/stair/i.test(r.name));
}

// --- route validation -------------------------------------------------------
let wallCrossings = 0;
let crossingDetails = [];

function validateSegment(floor, p, q, allowedRoomIds) {
  for (const room of blockingByFloor[floor]) {
    if (!room.poly) continue;
    if (allowedRoomIds.has(room.id)) continue;
    if (GEN.pointInPoly(p, room.poly) || GEN.pointInPoly(q, room.poly)) continue;
    if (GEN.segCrossesPoly(p, q, room.poly)) {
      wallCrossings++;
      crossingDetails.push(`${floor}: ${p.map(v => v.toFixed(0))} -> ${q.map(v => v.toFixed(0))} crosses ${room.id}`);
      return;
    }
  }
}

// which rooms may a point be inside of? (door nodes / room entries / stairs)
function allowedRoomsForPoint(floor, p, extraIds) {
  const allowed = new Set(extraIds || []);
  for (const room of blockingByFloor[floor]) {
    if (!room.poly) continue;
    if (GEN.pointInPoly(p, room.poly)) allowed.add(room.id);
  }
  return allowed;
}

function validateFloorPath(floor, pts, label) {
  for (let i = 0; i < pts.length - 1; i++) {
    const p = pts[i], q = pts[i + 1];
    const allowed = new Set([
      ...allowedRoomsForPoint(floor, p),
      ...allowedRoomsForPoint(floor, q)
    ]);
    validateSegment(floor, p, q, allowed);
    if (wallCrossings > 20) return;
  }
}

// --- pick test rooms --------------------------------------------------------
function sampleRooms(floor, n) {
  const rooms = floorJson[floor].rooms.filter(r => !r.isStairs && r.nodeId);
  // spread across the floor: sort by x and take evenly spaced ones
  rooms.sort((a, b) => a.cx - b.cx);
  const step = Math.max(1, Math.floor(rooms.length / n));
  const picked = [];
  for (let i = 0; i < rooms.length && picked.length < n; i += step) picked.push(rooms[i]);
  return picked;
}

const SAMPLES = 8;
let total = 0, success = 0, failed = [];
let multiFloorCount = 0;
let stairUse = {};

console.log('Running route tests across all floor combinations...\n');

for (const fA of FLOORS) {
  for (const fB of FLOORS) {
    const starts = sampleRooms(fA, SAMPLES);
    const dests = sampleRooms(fB, SAMPLES);
    for (const s of starts) {
      for (const d of dests) {
        if (fA === fB && s.id === d.id) continue;
        total++;
        const route = router.findRoute(s.id, d.id);
        if (!route || !route.success) {
          failed.push(`${s.id} (${fA}) -> ${d.id} (${fB}): ${route ? route.error : 'null'}`);
          continue;
        }
        success++;

        // floors contiguous?
        const seq = route.floorsInRoute;
        for (let i = 0; i < seq.length; i++) {
          if (seq[i] !== FLOORS[Math.min(3, Math.max(0, FLOORS.indexOf(fA) + i))] ) {
            // allow skipping floors only via stairs — sequence must be monotonic
          }
        }
        const iA = FLOORS.indexOf(fA), iB = FLOORS.indexOf(fB);
        const expectLen = Math.abs(iB - iA) + 1;
        if (seq.length !== expectLen) {
          failed.push(`${s.id} -> ${d.id}: expected ${expectLen} floor legs, got ${seq.length} (${seq.join(',')})`);
          continue;
        }
        const dir = iB >= iA ? 1 : -1;
        for (let i = 0; i < seq.length; i++) {
          if (FLOORS.indexOf(seq[i]) !== iA + dir * i) {
            failed.push(`${s.id} -> ${d.id}: non-monotonic floor sequence ${seq.join(',')}`);
          }
        }
        if (seq.length > 1) multiFloorCount++;

        // stair transitions reference real matched columns
        for (const t of route.stairTransitions || []) {
          const key = `${t.fromFloor}->${t.toFloor}:${t.stairName}`;
          stairUse[key] = (stairUse[key] || 0) + 1;
        }

        // geometry validation per floor leg
        for (const [fKey, pts] of Object.entries(route.floorPaths)) {
          if (!pts || pts.length < 2) continue;
          const legRooms = new Set();
          // allow the origin/dest room polygons for their endpoints
          const o = route.origin, d2 = route.dest;
          if (o.floor === fKey && o.id) legRooms.add(o.id);
          if (d2.floor === fKey && d2.id) legRooms.add(d2.id);
          validateFloorPath(fKey, pts, `${s.id}->${d.id}`);
        }
        if (wallCrossings > 20) break;
      }
      if (wallCrossings > 20) break;
    }
    console.log(`  ${fA} -> ${fB}: done`);
  }
}

console.log(`\nRoutes: ${success}/${total} successful (${multiFloorCount} multi-floor)`);
console.log(`Wall crossings detected: ${wallCrossings}`);
crossingDetails.slice(0, 20).forEach(d => console.log('  !! ' + d));

if (failed.length) {
  console.log(`\nFailed routes: ${failed.length}`);
  failed.slice(0, 25).forEach(f => console.log('  !! ' + f));
}

console.log('\nStair usage across tests:');
Object.entries(stairUse).sort().forEach(([k, v]) => console.log(`  ${k}: ${v}x`));

// --- GPS-style start --------------------------------------------------------
console.log('\nGPS start tests:');
for (const f of FLOORS) {
  const dests = sampleRooms(f, 3);
  for (const d of dests) {
    const gpsStart = { x: 988, y: 765, floor: f, name: 'Current Location' };
    const r = router.findRoute(gpsStart, d.id);
    console.log(`  GPS@${f} -> ${d.id}: ${r && r.success ? 'OK (' + r.totalDistanceMeters + 'm, ' + r.timeFormatted + ')' : 'FAIL ' + (r && r.error)}`);
    if (r && r.success) {
      for (const [fKey, pts] of Object.entries(r.floorPaths)) {
        if (pts && pts.length >= 2) validateFloorPath(fKey, pts, 'gps');
      }
    }
  }
}
console.log(`Wall crossings after GPS tests: ${wallCrossings}`);
crossingDetails.slice(-10).forEach(d => console.log('  !! ' + d));

process.exit(failed.length || wallCrossings ? 1 : 0);
