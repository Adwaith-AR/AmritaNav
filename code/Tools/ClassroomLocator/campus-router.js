/**
 * CampusRouter - Multi-Floor A* Shortest Path Navigation Engine
 * Calibrated for Amrita Campus SVG floorplans (viewBox: 2112 x 1300, ~6.67 px/meter)
 */

(function() {
  'use strict';

  class MinHeap {
    constructor() {
      this.data = [];
    }

    push(item) {
      this.data.push(item);
      this._bubbleUp(this.data.length - 1);
    }

    pop() {
      if (this.data.length === 0) return null;
      const top = this.data[0];
      const bottom = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = bottom;
        this._sinkDown(0);
      }
      return top;
    }

    _bubbleUp(idx) {
      while (idx > 0) {
        const parentIdx = (idx - 1) >> 1;
        if (this.data[idx].priority < this.data[parentIdx].priority) {
          [this.data[idx], this.data[parentIdx]] = [this.data[parentIdx], this.data[idx]];
          idx = parentIdx;
        } else {
          break;
        }
      }
    }

    _sinkDown(idx) {
      const length = this.data.length;
      while ((idx << 1) + 1 < length) {
        const leftIdx = (idx << 1) + 1;
        const rightIdx = leftIdx + 1;
        let smallest = idx;

        if (this.data[leftIdx].priority < this.data[smallest].priority) {
          smallest = leftIdx;
        }
        if (rightIdx < length && this.data[rightIdx].priority < this.data[smallest].priority) {
          smallest = rightIdx;
        }
        if (smallest !== idx) {
          [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
          idx = smallest;
        } else {
          break;
        }
      }
    }

    get size() {
      return this.data.length;
    }
  }

  class CampusRouter {
    constructor(data) {
      this.data = data || (typeof window !== 'undefined' ? window.CAMPUS_NAV_DATA : null);
      if (!this.data) {
        console.warn('CampusRouter: initialized without navigation data.');
      }

      this.pxPerMeter = (this.data && this.data.pxPerMeter) || 6.67;
      this.scale = (this.data && this.data.scaleMetersPerPixel) || (1 / this.pxPerMeter);
      this.walkingSpeed = (this.data && this.data.avgWalkingSpeedMps) || 1.3; // 1.3 m/s
      this.stairPenaltyMeters = (this.data && this.data.stairPenaltyMeters) || 15.0;

      this.floorKeys = ['ground', 'first', 'second', 'third'];
      this.floorIndices = { ground: 0, first: 1, second: 2, third: 3 };
      this.floorTitles = {
        ground: 'Ground Floor',
        first: 'First Floor',
        second: 'Second Floor',
        third: 'Third Floor'
      };

      this.nodesMap = new Map();
      this.roomsMap = new Map();
      this.adj = new Map();

      this._initGraph();
    }

    _initGraph() {
      if (!this.data) return;

      // 1. Index rooms
      const roomList = this.data.rooms || this.data.allRooms || [];
      roomList.forEach(r => {
        this.roomsMap.set(r.id, r);
      });

      // 2. Index nodes
      const nodeList = this.data.nodes || [];
      nodeList.forEach(n => {
        this.nodesMap.set(n.id, n);
        this.adj.set(n.id, []);
      });

      // 3. Populate adjacency list
      const edgeData = this.data.edges || {};
      if (Array.isArray(edgeData)) {
        edgeData.forEach(e => {
          const u = e.u !== undefined ? e.u : e.from;
          const v = e.v !== undefined ? e.v : e.to;
          const w = e.weight !== undefined ? e.weight : e.dist;
          this._addEdgeInternal(u, v, w, e.type);
        });
      } else {
        Object.entries(edgeData).forEach(([uId, neighbors]) => {
          if (!this.adj.has(uId)) {
            this.adj.set(uId, []);
          }
          const list = this.adj.get(uId);
          neighbors.forEach(e => {
            const vId = e.node || e.target || e.to;
            const w = e.weight !== undefined ? e.weight : e.distPx;
            list.push({
              node: vId,
              target: vId,
              weight: w,
              distPx: w,
              distMeters: e.distMeters !== undefined ? e.distMeters : (w / this.pxPerMeter),
              type: e.type || 'corridor'
            });
          });
        });
      }
    }

    _addEdgeInternal(u, v, weight, type = 'corridor') {
      if (!this.adj.has(u)) this.adj.set(u, []);
      if (!this.adj.has(v)) this.adj.set(v, []);
      const w = +weight.toFixed(2);
      const dMeters = +(w / this.pxPerMeter).toFixed(2);

      const uList = this.adj.get(u);
      if (!uList.some(e => e.node === v)) {
        uList.push({ node: v, target: v, weight: w, distPx: w, distMeters: dMeters, type });
      }

      const vList = this.adj.get(v);
      if (!vList.some(e => e.node === u)) {
        vList.push({ node: u, target: u, weight: w, distPx: w, distMeters: dMeters, type });
      }
    }

    _getFloorIndex(floor) {
      if (typeof floor === 'number') return floor;
      return this.floorIndices[floor] !== undefined ? this.floorIndices[floor] : 0;
    }

    /**
     * A* Heuristic: 2D Euclidean distance divided by pxPerMeter + vertical stair penalty
     * @param {Object|string} nodeA 
     * @param {Object|string} nodeB 
     * @returns {number} Distance estimate in meters
     */
    _heuristic(nodeA, nodeB) {
      const a = typeof nodeA === 'string' ? this.nodesMap.get(nodeA) : nodeA;
      const b = typeof nodeB === 'string' ? this.nodesMap.get(nodeB) : nodeB;
      if (!a || !b) return 0;

      const floorA = this._getFloorIndex(a.floor);
      const floorB = this._getFloorIndex(b.floor);
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist2d = Math.sqrt(dx * dx + dy * dy) / this.pxPerMeter;
      const stairPenalty = Math.abs(floorA - floorB) * this.stairPenaltyMeters;
      return dist2d + stairPenalty;
    }

    /**
     * Locates the nearest walkable corridor waypoint on the matching floor
     * @param {number} x 
     * @param {number} y 
     * @param {string} floor 
     * @returns {Object|null}
     */
    _findNearestWaypoint(x, y, floor = 'ground') {
      const fl = floor || 'ground';
      let bestNode = null;
      let minDistance = Infinity;

      // Primary search: walkable waypoints on the target floor
      for (const node of this.nodesMap.values()) {
        if (node.floor === fl && node.type === 'waypoint') {
          const d = Math.hypot(node.x - x, node.y - y);
          if (d < minDistance) {
            minDistance = d;
            bestNode = node;
          }
        }
      }

      // Secondary fallback: any node on the target floor
      if (!bestNode) {
        for (const node of this.nodesMap.values()) {
          if (node.floor === fl) {
            const d = Math.hypot(node.x - x, node.y - y);
            if (d < minDistance) {
              minDistance = d;
              bestNode = node;
            }
          }
        }
      }

      // Tertiary fallback: any waypoint on campus
      if (!bestNode) {
        for (const node of this.nodesMap.values()) {
          if (node.type === 'waypoint') {
            const d = Math.hypot(node.x - x, node.y - y);
            if (d < minDistance) {
              minDistance = d;
              bestNode = node;
            }
          }
        }
      }

      if (!bestNode) return null;

      return {
        ...bestNode,
        distance: minDistance,
        distanceMeters: +(minDistance / this.pxPerMeter).toFixed(2)
      };
    }

    resolveTarget(target, defaultFloor = 'ground') {
      if (typeof target === 'string') {
        const room = this.roomsMap.get(target);
        if (room) {
          return {
            id: room.id,
            nodeId: room.nodeId,
            name: room.name || room.title,
            title: room.title || room.name,
            code: room.code || '',
            floor: room.floor,
            floorIdx: room.floorIdx !== undefined ? room.floorIdx : this._getFloorIndex(room.floor),
            floorTitle: room.floorTitle || this.floorTitles[room.floor],
            x: room.x !== undefined ? room.x : room.cx,
            y: room.y !== undefined ? room.y : room.cy,
            cx: room.cx !== undefined ? room.cx : room.x,
            cy: room.cy !== undefined ? room.cy : room.y,
            entryX: room.entryX !== undefined ? room.entryX : room.cx,
            entryY: room.entryY !== undefined ? room.entryY : room.cy,
            node: room.node,
            isRoom: true,
            isStairs: room.isStairs || false,
            stairColId: room.stairColId || null
          };
        }
        const node = this.nodesMap.get(target);
        if (node) {
          return {
            id: node.id,
            nodeId: node.id,
            name: node.title || node.stairName || node.id,
            title: node.title || node.stairName || node.id,
            code: '',
            floor: node.floor,
            floorIdx: node.floorIdx !== undefined ? node.floorIdx : this._getFloorIndex(node.floor),
            floorTitle: this.floorTitles[node.floor],
            x: node.x,
            y: node.y,
            cx: node.x,
            cy: node.y,
            entryX: node.x,
            entryY: node.y,
            node: null,
            isRoom: false,
            isStairs: node.type === 'stair',
            stairColId: node.stairId || null
          };
        }
      } else if (target && typeof target === 'object') {
        const fl = target.floor || defaultFloor || 'ground';
        const fIdx = this._getFloorIndex(fl);
        const x = target.x;
        const y = target.y;
        return {
          id: target.id || 'gps_location',
          nodeId: target.nodeId || null,
          name: target.name || 'Current Location',
          title: target.title || target.name || 'Current Location',
          code: 'GPS',
          floor: fl,
          floorIdx: fIdx,
          floorTitle: this.floorTitles[fl],
          x,
          y,
          cx: x,
          cy: y,
          entryX: x,
          entryY: y,
          isRoom: false,
          isStairs: false,
          isGps: true
        };
      }
      return null;
    }

    /**
     * Finds multi-floor shortest route between startTarget and destTarget
     * @param {string|Object} startTarget Room ID string or GPS coordinate object { x, y, floor }
     * @param {string|Object} destTarget Room ID string or coordinate object
     * @returns {Object} Route result conforming to renderCampusRoute data contract
     */
    findRoute(startTarget, destTarget) {
      const origin = this.resolveTarget(startTarget);
      const dest = this.resolveTarget(destTarget);

      if (!origin || !dest) {
        return { success: false, error: 'Invalid start or destination location' };
      }

      // Same location check
      if (origin.id === dest.id) {
        const floorKey = origin.floor;
        const floorPaths = { ground: [], first: [], second: [], third: [] };
        floorPaths[floorKey] = [[origin.x, origin.y]];
        return {
          success: true,
          totalDistanceMeters: 0,
          timeFormatted: '0 sec',
          timeSeconds: 0,
          floorPaths,
          floorsInRoute: [floorKey],
          isMultiFloor: false,
          stairTransitions: [],
          floorSegments: [
            {
              type: 'floor_walk',
              floor: floorKey,
              floorTitle: origin.floorTitle,
              distanceMeters: 0,
              coords: [[origin.x, origin.y]],
              points: [[origin.x, origin.y]],
              instruction: `You are already at ${origin.name}`
            }
          ],
          origin,
          dest,
          points: [[origin.x, origin.y]]
        };
      }

      // Temporary node injection state
      const injectedNodeIds = [];
      const injectedEdges = [];

      let startNodeId = origin.nodeId;
      if (!startNodeId || origin.isGps || !this.nodesMap.has(startNodeId)) {
        const nearestWp = this._findNearestWaypoint(origin.x, origin.y, origin.floor);
        if (!nearestWp) {
          return { success: false, error: 'Could not connect start location to corridor pathways' };
        }
        startNodeId = '__temp_gps_src__';
        const tempSrcNode = {
          id: startNodeId,
          x: origin.x,
          y: origin.y,
          floor: origin.floor,
          floorIdx: origin.floorIdx,
          type: 'waypoint'
        };
        this.nodesMap.set(startNodeId, tempSrcNode);
        this.adj.set(startNodeId, []);
        injectedNodeIds.push(startNodeId);

        const dist = Math.hypot(origin.x - nearestWp.x, origin.y - nearestWp.y);
        this._addEdgeInternal(startNodeId, nearestWp.id, dist, 'gps_access');
        injectedEdges.push([startNodeId, nearestWp.id]);
      }

      let destNodeId = dest.nodeId;
      if (!destNodeId || dest.isGps || !this.nodesMap.has(destNodeId)) {
        const nearestWp = this._findNearestWaypoint(dest.x, dest.y, dest.floor);
        if (!nearestWp) {
          this._cleanupInjected(injectedNodeIds, injectedEdges);
          return { success: false, error: 'Could not connect destination to corridor pathways' };
        }
        destNodeId = '__temp_dest__';
        const tempDestNode = {
          id: destNodeId,
          x: dest.x,
          y: dest.y,
          floor: dest.floor,
          floorIdx: dest.floorIdx,
          type: 'waypoint'
        };
        this.nodesMap.set(destNodeId, tempDestNode);
        this.adj.set(destNodeId, []);
        injectedNodeIds.push(destNodeId);

        const dist = Math.hypot(dest.x - nearestWp.x, dest.y - nearestWp.y);
        this._addEdgeInternal(destNodeId, nearestWp.id, dist, 'room_access');
        injectedEdges.push([destNodeId, nearestWp.id]);
      }

      // A* Search
      const startNode = this.nodesMap.get(startNodeId);
      const destNode = this.nodesMap.get(destNodeId);

      const openSet = new MinHeap();
      const cameFrom = new Map();
      const gScore = new Map();
      gScore.set(startNodeId, 0);

      const initialH = this._heuristic(startNode, destNode);
      openSet.push({ id: startNodeId, priority: initialH });

      let found = false;

      while (openSet.size > 0) {
        const current = openSet.pop();
        const currId = current.id;

        if (currId === destNodeId) {
          found = true;
          break;
        }

        const currG = gScore.get(currId);
        const neighbors = this.adj.get(currId) || [];

        for (let i = 0; i < neighbors.length; i++) {
          const edge = neighbors[i];
          const neighborId = edge.node;
          const neighborNode = this.nodesMap.get(neighborId);
          if (!neighborNode) continue;

          // Step cost in meters
          const stepCostMeters = edge.distMeters !== undefined ? edge.distMeters : (edge.weight / this.pxPerMeter);
          const tentativeG = currG + stepCostMeters;

          if (!gScore.has(neighborId) || tentativeG < gScore.get(neighborId)) {
            cameFrom.set(neighborId, currId);
            gScore.set(neighborId, tentativeG);
            const h = this._heuristic(neighborNode, destNode);
            openSet.push({ id: neighborId, priority: tentativeG + h });
          }
        }
      }

      if (!found) {
        this._cleanupInjected(injectedNodeIds, injectedEdges);
        return { success: false, error: 'No walkable pathway found between selected locations' };
      }

      // Backtrack path
      const pathNodeIds = [];
      let curr = destNodeId;
      while (curr) {
        pathNodeIds.unshift(curr);
        curr = cameFrom.get(curr);
      }

      const pathNodes = pathNodeIds.map(id => this.nodesMap.get(id));

      // Cleanup injected nodes and temporary edges
      this._cleanupInjected(injectedNodeIds, injectedEdges);

      // Break path into floor legs
      const legs = [];
      let currentLeg = null;

      for (let i = 0; i < pathNodes.length; i++) {
        const node = pathNodes[i];
        if (!currentLeg || currentLeg.floor !== node.floor) {
          if (currentLeg) legs.push(currentLeg);
          currentLeg = {
            floor: node.floor,
            floorIdx: node.floorIdx,
            nodes: [node]
          };
        } else {
          currentLeg.nodes.push(node);
        }
      }
      if (currentLeg) legs.push(currentLeg);

      // Build per-floor coordinates and identify stair transitions
      const floorPaths = { ground: [], first: [], second: [], third: [] };
      const stairTransitions = [];
      const floorSegments = [];
      let totalWalkMeters = 0;
      let stairFlightCount = 0;

      for (let legIdx = 0; legIdx < legs.length; legIdx++) {
        const leg = legs[legIdx];
        const fKey = leg.floor;
        const isFirstLeg = (legIdx === 0);
        const isLastLeg = (legIdx === legs.length - 1);
        const legPoints = [];

        // Start of leg
        if (isFirstLeg) {
          legPoints.push([origin.x, origin.y]);
          if (origin.isRoom && (origin.entryX !== origin.x || origin.entryY !== origin.y)) {
            legPoints.push([origin.entryX, origin.entryY]);
          }
        }

        // Add node coordinates
        for (let ni = 0; ni < leg.nodes.length; ni++) {
          const n = leg.nodes[ni];
          const pt = [n.x, n.y];
          const last = legPoints[legPoints.length - 1];
          if (!last || Math.hypot(last[0] - pt[0], last[1] - pt[1]) > 0.5) {
            legPoints.push(pt);
          }
        }

        // End of leg
        if (isLastLeg) {
          if (dest.isRoom && (dest.entryX !== dest.x || dest.entryY !== dest.y)) {
            const last = legPoints[legPoints.length - 1];
            if (!last || Math.hypot(last[0] - dest.entryX, last[1] - dest.entryY) > 0.5) {
              legPoints.push([dest.entryX, dest.entryY]);
            }
          }
          const last = legPoints[legPoints.length - 1];
          if (!last || Math.hypot(last[0] - dest.x, last[1] - dest.y) > 0.5) {
            legPoints.push([dest.x, dest.y]);
          }
        }

        // Intermediate floor with single stair point: duplicate so polyline has 2 points
        if (legPoints.length === 1) {
          legPoints.push([legPoints[0][0], legPoints[0][1]]);
        }

        floorPaths[fKey] = legPoints;

        // Calculate walking distance on this floor
        let legDistPx = 0;
        for (let k = 0; k < legPoints.length - 1; k++) {
          legDistPx += Math.hypot(legPoints[k + 1][0] - legPoints[k][0], legPoints[k + 1][1] - legPoints[k][1]);
        }
        const legDistMeters = Math.round(legDistPx / this.pxPerMeter);
        totalWalkMeters += legDistMeters;

        // Instruction text
        const legTitle = this.floorTitles[fKey];
        let instruction = '';
        if (isFirstLeg && isLastLeg) {
          instruction = `Walk directly on ${legTitle} to ${dest.name}`;
        } else if (isFirstLeg) {
          const nextLeg = legs[legIdx + 1];
          const stairNode = leg.nodes[leg.nodes.length - 1];
          const stairName = stairNode.stairName || 'Stairs';
          instruction = `Walk on ${legTitle} to ${stairName}`;
        } else if (isLastLeg) {
          instruction = `Walk on ${legTitle} to ${dest.name}`;
        } else {
          const nextLeg = legs[legIdx + 1];
          const stairNode = leg.nodes[leg.nodes.length - 1];
          const stairName = stairNode.stairName || 'Stairs';
          instruction = `Walk across ${legTitle} to ${stairName}`;
        }

        floorSegments.push({
          type: 'floor_walk',
          floor: fKey,
          floorTitle: legTitle,
          distanceMeters: legDistMeters,
          coords: legPoints,
          points: legPoints,
          instruction
        });

        // Identify stair transition to next floor
        if (!isLastLeg) {
          const nextLeg = legs[legIdx + 1];
          const fromTitle = this.floorTitles[fKey];
          const toTitle = this.floorTitles[nextLeg.floor];
          const dir = nextLeg.floorIdx > leg.floorIdx ? 'up' : 'down';
          const fromStairNode = leg.nodes[leg.nodes.length - 1];
          const toStairNode = nextLeg.nodes[0];
          const stairName = fromStairNode.stairName || toStairNode.stairName || 'Stairs';
          const stairPos = { x: toStairNode.x, y: toStairNode.y };

          stairFlightCount++;

          const transition = {
            type: 'stair_transition',
            fromFloor: fKey,
            toFloor: nextLeg.floor,
            fromFloorTitle: fromTitle,
            toFloorTitle: toTitle,
            direction: dir,
            stairName,
            stairPos,
            instruction: `Take ${stairName} ${dir} to ${toTitle}`,
            distanceMeters: Math.round(this.stairPenaltyMeters),
            coords: [[fromStairNode.x, fromStairNode.y], [toStairNode.x, toStairNode.y]],
            points: [[fromStairNode.x, fromStairNode.y], [toStairNode.x, toStairNode.y]]
          };

          stairTransitions.push(transition);
          floorSegments.push(transition);
        }
      }

      const totalDistanceMeters = Math.round(totalWalkMeters + stairFlightCount * this.stairPenaltyMeters);
      const timeSec = Math.round(totalDistanceMeters / this.walkingSpeed);
      const minutes = Math.floor(timeSec / 60);
      const seconds = timeSec % 60;
      const timeFormatted = minutes > 0
        ? `${minutes} min${seconds > 0 ? ' ' + seconds + 's' : ''}`
        : `${seconds}s`;

      const floorsInRoute = legs.map(l => l.floor);

      return {
        success: true,
        totalDistanceMeters,
        timeFormatted,
        timeSeconds: timeSec,
        floorPaths,
        floorsInRoute,
        isMultiFloor: legs.length > 1,
        stairTransitions,
        floorSegments,
        origin,
        dest,
        points: floorPaths[origin.floor] || (floorsInRoute[0] ? floorPaths[floorsInRoute[0]] : [])
      };
    }

    _cleanupInjected(injectedNodeIds, injectedEdges) {
      // Remove temporary edges
      injectedEdges.forEach(([u, v]) => {
        if (this.adj.has(u)) {
          const list = this.adj.get(u);
          const idx = list.findIndex(e => e.node === v);
          if (idx !== -1) list.splice(idx, 1);
        }
        if (this.adj.has(v)) {
          const list = this.adj.get(v);
          const idx = list.findIndex(e => e.node === u);
          if (idx !== -1) list.splice(idx, 1);
        }
      });

      // Remove temporary nodes
      injectedNodeIds.forEach(id => {
        this.nodesMap.delete(id);
        this.adj.delete(id);
      });
    }

    dist(p1, p2) {
      const dx = p1[0] - p2[0];
      const dy = p1[1] - p2[1];
      return Math.hypot(dx, dy);
    }

    pointToSegmentDist(p, a, b) {
      const abx = b[0] - a[0];
      const aby = b[1] - a[1];
      const abl2 = abx * abx + aby * aby;
      if (abl2 < 1e-6) {
        return { dist: this.dist(p, a), proj: a };
      }
      let t = ((p[0] - a[0]) * abx + (p[1] - a[1]) * aby) / abl2;
      t = Math.max(0, Math.min(1, t));
      const proj = [a[0] + t * abx, a[1] + t * aby];
      return { dist: this.dist(p, proj), proj };
    }

    findNearestCorridorPoint(floorKey, x, y) {
      const wp = this._findNearestWaypoint(x, y, floorKey);
      if (wp) {
        return {
          proj: [wp.x, wp.y],
          dist: wp.distance,
          nearestNode: wp.id
        };
      }
      return { proj: [x, y], dist: 0, nearestNode: null };
    }
  }

  // Export to window
  if (typeof window !== 'undefined') {
    window.CampusRouter = CampusRouter;
    window.GroundRouter = CampusRouter;
  }

  // CommonJS export for Node/testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CampusRouter };
  }
})();
