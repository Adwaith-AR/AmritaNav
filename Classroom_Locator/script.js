document.addEventListener('DOMContentLoaded', () => {
  // Flag to suppress room selection click when user was dragging/panning
  let suppressClick = false;

  // --- Room Selection Logic ---
  const rooms = document.querySelectorAll('.selectable-room');
  let selectedRoom = null;

  function selectRoom(room) {
    if (selectedRoom === room) {
      room.classList.remove('selected');
      room.setAttribute('aria-pressed', 'false');
      selectedRoom = null;
    } else {
      if (selectedRoom) {
        selectedRoom.classList.remove('selected');
        selectedRoom.setAttribute('aria-pressed', 'false');
      }
      room.classList.add('selected');
      room.setAttribute('aria-pressed', 'true');
      selectedRoom = room;
    }
  }

  rooms.forEach(room => {
    room.addEventListener('click', (e) => {
      if (suppressClick) return;
      e.stopPropagation();
      selectRoom(room);

      // Selecting a room on any floor automatically sets it as navigation destination
      if (room.id && typeof onRoomClicked === 'function') {
        onRoomClicked(room.id);
      } else if (currentFloor === 'ground' && room.id && typeof onGroundRoomClicked === 'function') {
        onGroundRoomClicked(room.id);
      }
    });

    room.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectRoom(room);

        if (room.id && typeof onRoomClicked === 'function') {
          onRoomClicked(room.id);
        } else if (currentFloor === 'ground' && room.id && typeof onGroundRoomClicked === 'function') {
          onGroundRoomClicked(room.id);
        }
      }
    });
  });

  document.addEventListener('click', () => {
    if (suppressClick) return;
    if (selectedRoom) {
      selectedRoom.classList.remove('selected');
      selectedRoom.setAttribute('aria-pressed', 'false');
      selectedRoom = null;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && selectedRoom) {
      selectedRoom.classList.remove('selected');
      selectedRoom.setAttribute('aria-pressed', 'false');
      selectedRoom = null;
    }
  });

  // ==========================================
  // --- Floor Switching & Prompt Logic ---
  // ==========================================
  // Floor System: Ground Floor, First Floor, Second Floor, Third Floor
  const floorButtons = document.querySelectorAll('.floor-btn');
  const floorLayers = document.querySelectorAll('.floor-layer');
  const floorPromptModal = document.getElementById('floor-prompt-modal');
  const floorPromptBtns = document.querySelectorAll('.floor-prompt-btn');
  const mainContent = document.getElementById('main-content');
  const groundNavBar = document.getElementById('ground-nav-bar');
  let currentFloor = null;

  function moveGpsMarkerToActiveFloor() {
    const activeLayer = document.querySelector('.floor-layer.active');
    const marker = document.getElementById('gps-marker');
    if (!activeLayer || !marker) return;
    const activeOverlay = activeLayer.querySelector('.selection-overlay');
    if (activeOverlay && marker.parentElement !== activeOverlay) {
      activeOverlay.appendChild(marker);
    }
  }

  function switchFloor(floorId) {
    if (currentFloor === floorId && document.querySelector('.floor-layer.active')) return;
    currentFloor = floorId;

    // Deselect any selected room when switching floors to avoid lingering state
    if (selectedRoom) {
      selectedRoom.classList.remove('selected');
      selectedRoom.setAttribute('aria-pressed', 'false');
      selectedRoom = null;
    }

    // Update floor switcher button controls
    floorButtons.forEach(btn => {
      const isSelected = btn.dataset.floor === floorId;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Display only selected floor's map, hide the others
    floorLayers.forEach(layer => {
      const isSelected = layer.dataset.floor === floorId;
      layer.classList.toggle('active', isSelected);
    });

    // Move/display GPS location marker on the active floor's map
    moveGpsMarkerToActiveFloor();

    // Multi-Floor Navigation visibility:
    // Navigation works across all four floors (Ground, First, Second, Third).
    if (groundNavBar) {
      groundNavBar.style.display = 'flex';
    }
    // Update active floor pill in route summary if route is active
    if (typeof updateRouteFloorPills === 'function') {
      updateRouteFloorPills();
    }
  }

  // Handle Initial Floor Selection Prompt (on website open)
  floorPromptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFloor = btn.dataset.floor;
      if (selectedFloor) {
        if (floorPromptModal) {
          floorPromptModal.style.display = 'none';
        }
        if (mainContent) {
          mainContent.style.display = 'flex';
        }
        switchFloor(selectedFloor);
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const selectedFloor = btn.dataset.floor;
        if (selectedFloor) {
          if (floorPromptModal) {
            floorPromptModal.style.display = 'none';
          }
          if (mainContent) {
            mainContent.style.display = 'flex';
          }
          switchFloor(selectedFloor);
        }
      }
    });
  });

  // Handle Floor Switcher Control Buttons
  floorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetFloor = btn.dataset.floor;
      if (targetFloor) {
        switchFloor(targetFloor);
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        const targetFloor = btn.dataset.floor;
        if (targetFloor) {
          switchFloor(targetFloor);
        }
      }
    });
  });

  // ==========================================
  // --- GPS Live Location & Tracking Engine ---
  // ==========================================
  // GeoTIFF Affine Transform (from gdalinfo gf.tiff)
  // Origin (Upper Left): lon 76.4906642, lat 9.0946142
  // Pixel Size: 0.00000103926192 deg/px (both axes, no rotation)
  // Image Size: 2112 x 1300 (matches SVG viewBox)
  const GPS_CALIBRATION = {
    originLat: 9.0946142,                // Upper-left corner latitude
    originLon: 76.4906642,               // Upper-left corner longitude
    latPerPixel: 0.00000103926192,       // degrees latitude per pixel
    lonPerPixel: 0.00000103926192,       // degrees longitude per pixel
    mapWidth: 2112,
    mapHeight: 1300,
    // Center of map in GPS coords (for campus boundary check)
    centerLat: 9.0939387,               // (Upper Left + Lower Right) / 2
    centerLon: 76.4917617,
    campusRadiusMeters: 750,
    // Default marker position (Admin Reception Entrance in SVG pixels)
    defaultX: 380,
    defaultY: 830
  };

  // UI Element References
  const gpsDock = document.getElementById('gps-dock');
  const gpsToggleBtn = document.getElementById('gps-toggle-btn');
  const gpsBtnText = document.getElementById('gps-btn-text');
  const gpsStatusDot = document.getElementById('gps-status-dot');

  // SVG Marker References
  const gpsMarker = document.getElementById('gps-marker');
  const gpsAccuracyRing = document.getElementById('gps-accuracy-ring');
  const gpsHeadingCone = document.getElementById('gps-heading-cone');
  const mapContainer = document.querySelector('.map-container');
  const selectionOverlay = document.querySelector('.selection-overlay');

  let isGpsActive = false;
  let watchId = null;
  let currentHeading = null;
  let currentPos = { x: GPS_CALIBRATION.defaultX, y: GPS_CALIBRATION.defaultY };

  // Prevent dock clicks from bubbling to map/rooms
  if (gpsDock) {
    gpsDock.addEventListener('click', (e) => e.stopPropagation());
  }

  // --- Coordinate Transformation (Direct GeoTIFF Affine) ---
  // No rotation needed — the GeoTIFF is axis-aligned to WGS 84.
  // px = (lon - originLon) / lonPerPixel
  // py = (originLat - lat) / latPerPixel   (Y-axis is flipped)
  function gpsToCanvas(lat, lon) {
    let x = (lon - GPS_CALIBRATION.originLon) / GPS_CALIBRATION.lonPerPixel;
    let y = (GPS_CALIBRATION.originLat - lat) / GPS_CALIBRATION.latPerPixel;

    // Clamp inside map canvas bounds
    x = Math.max(0, Math.min(GPS_CALIBRATION.mapWidth, x));
    y = Math.max(0, Math.min(GPS_CALIBRATION.mapHeight, y));

    return { x, y };
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth radius in meters
    const toRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * toRad;
    const dLon = (lon2 - lon1) * toRad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // Update SVG Marker Position & Visuals
  function updateMarker(x, y, accuracyMeters = 5, headingDeg = null) {
    if (!gpsMarker) return;
    currentPos = { x, y };

    gpsMarker.style.display = 'block';
    gpsMarker.setAttribute('transform', `translate(${x.toFixed(1)}, ${y.toFixed(1)})`);

    if (gpsAccuracyRing) {
      // Scale accuracy in meters to SVG pixel radius (approx 6.67 px/m, clamp 20..95px)
      const r = Math.max(20, Math.min(95, accuracyMeters * 6.67));
      gpsAccuracyRing.setAttribute('r', r.toFixed(1));
    }

    if (headingDeg !== null && gpsHeadingCone) {
      gpsHeadingCone.style.display = 'block';
      gpsHeadingCone.setAttribute('transform', `rotate(${Math.round(headingDeg)})`);
    }

    // Dynamic route update if active and starting from GPS
    if (activeRoute && typeof generateCampusRoute === 'function' && navStartSelect && navStartSelect.value === 'gps') {
      generateCampusRoute();
    }

    // Automatic floor switching check when approaching staircase transition
    if (activeRoute && activeRoute.isMultiFloor && typeof checkAutoFloorSwitch === 'function') {
      checkAutoFloorSwitch(x, y);
    }
  }

  function hideMarker() {
    if (gpsMarker) {
      gpsMarker.style.display = 'none';
    }
    if (gpsHeadingCone) {
      gpsHeadingCone.style.display = 'none';
    }
  }

  // Device Compass Heading Listener
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (!isGpsActive) return;
      let heading = null;
      if (typeof e.webkitCompassHeading === 'number') {
        heading = e.webkitCompassHeading;
      } else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }
      if (heading !== null) {
        currentHeading = heading;
        if (gpsHeadingCone) {
          gpsHeadingCone.style.display = 'block';
          gpsHeadingCone.setAttribute('transform', `rotate(${Math.round(heading)})`);
        }
      }
    }, { passive: true });
  }

  // --- Real Device GPS Geolocation ---
  function startGpsTracking() {
    if (!navigator.geolocation) {
      setGpsStatus('unsupported');
      return;
    }

    isGpsActive = true;
    gpsToggleBtn.classList.add('active', 'locating');
    gpsBtnText.textContent = 'Locating...';
    setGpsStatus('locating');

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 2000
    };

    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    watchId = navigator.geolocation.watchPosition(
      handleGpsSuccess,
      handleGpsError,
      options
    );
  }

  function stopGpsTracking() {
    isGpsActive = false;
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
    hideMarker();

    gpsToggleBtn.classList.remove('active', 'locating');
    gpsBtnText.textContent = 'Locate Me';
    if (gpsStatusDot) gpsStatusDot.className = 'gps-status-dot';
  }

  function handleGpsSuccess(pos) {
    if (!isGpsActive) return;

    gpsToggleBtn.classList.remove('locating');

    const { latitude, longitude, accuracy, heading } = pos.coords;
    const dist = haversineDistance(
      latitude,
      longitude,
      GPS_CALIBRATION.centerLat,
      GPS_CALIBRATION.centerLon
    );

    const insideCampus = dist <= GPS_CALIBRATION.campusRadiusMeters;

    if (heading !== null && !isNaN(heading)) {
      currentHeading = heading;
    }

    if (insideCampus) {
      const pt = gpsToCanvas(latitude, longitude);
      updateMarker(pt.x, pt.y, accuracy || 5, currentHeading);
      setGpsStatus('active');
    } else {
      updateMarker(GPS_CALIBRATION.defaultX, GPS_CALIBRATION.defaultY, 15, currentHeading);
      setGpsStatus('warning');
    }
  }

  function handleGpsError(err) {
    if (!isGpsActive) return;

    gpsToggleBtn.classList.remove('locating');
    setGpsStatus('error');
  }

  function setGpsStatus(state) {
    if (gpsStatusDot) {
      gpsStatusDot.className = `gps-status-dot ${state}`;
    }
  }

  // --- Button & Interaction Listeners ---
  gpsToggleBtn.addEventListener('click', () => {
    if (isGpsActive) {
      stopGpsTracking();
    } else {
      startGpsTracking();
    }
  });

  // Allow double-clicking on the map when GPS is active to manually test repositioning
  const selectionOverlays = document.querySelectorAll('.selection-overlay');
  selectionOverlays.forEach(overlay => {
    overlay.addEventListener('dblclick', (e) => {
      if (!isGpsActive) return;
      const rect = overlay.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 2112;
      const clickY = ((e.clientY - rect.top) / rect.height) * 1300;

      updateMarker(clickX, clickY, 4, currentHeading);
      setGpsStatus('active');
    });
  });

  // ==========================================
  // --- Multi-Floor Campus Navigation System ---
  // ==========================================
  const navStartSelect = document.getElementById('nav-start-select');
  const navDestSelect = document.getElementById('nav-dest-select');
  const navSwapBtn = document.getElementById('nav-swap-btn');
  const getRouteBtn = document.getElementById('get-route-btn');
  const clearRouteBtn = document.getElementById('clear-route-btn');
  const routeSummaryBar = document.getElementById('route-summary-bar');
  const routeDistanceText = document.getElementById('route-distance-text');
  const routeTimeText = document.getElementById('route-time-text');
  const routeFloorSteps = document.getElementById('route-floor-steps');
  const routeInstructionBar = document.getElementById('route-instruction-bar');

  const floorRouteLayers = {
    ground: document.getElementById('ground-route-layer'),
    first: document.getElementById('route-layer-first'),
    second: document.getElementById('route-layer-second'),
    third: document.getElementById('route-layer-third')
  };
  const groundRouteLayer = floorRouteLayers.ground;

  let campusRouter = null;
  if (typeof window.CampusRouter === 'function' && window.CAMPUS_NAV_DATA) {
    campusRouter = new window.CampusRouter(window.CAMPUS_NAV_DATA);
  } else if (typeof window.GroundRouter === 'function' && window.GROUND_NAV_DATA) {
    campusRouter = new window.GroundRouter(window.GROUND_NAV_DATA);
  }
  let groundRouter = campusRouter;

  let activeRoute = null;

  function populateNavDropdowns() {
    const navData = window.CAMPUS_NAV_DATA || window.GROUND_NAV_DATA;
    if (!navData) return;

    const floorOrder = ['ground', 'first', 'second', 'third'];
    const floorTitles = {
      ground: 'Ground Floor',
      first: 'First Floor',
      second: 'Second Floor',
      third: 'Third Floor'
    };

    if (navStartSelect) {
      while (navStartSelect.options.length > 1) {
        navStartSelect.remove(1);
      }
    }
    if (navDestSelect) {
      while (navDestSelect.options.length > 1) {
        navDestSelect.remove(1);
      }
    }

    floorOrder.forEach(fKey => {
      const fData = navData.floors ? navData.floors[fKey] : null;
      if (!fData || !fData.rooms) return;

      const title = floorTitles[fKey] || fData.title || fKey;
      const startGroup = document.createElement('optgroup');
      startGroup.label = title;
      const destGroup = document.createElement('optgroup');
      destGroup.label = title;

      const sortedRooms = fData.rooms.slice().sort((a, b) => a.name.localeCompare(b.name));

      sortedRooms.forEach(r => {
        // Do not add courtyards to navigation
        if (r.id.toLowerCase().includes('courtyard') || r.name.toLowerCase().includes('courtyard') || (r.code && r.code.toLowerCase().includes('cyd'))) {
          return;
        }

        const text = r.code && r.code !== r.name ? `${r.name} (${r.code})` : r.name;

        if (navStartSelect) {
          const optStart = document.createElement('option');
          optStart.value = r.id;
          optStart.textContent = text;
          startGroup.appendChild(optStart);
        }

        if (navDestSelect) {
          const optDest = document.createElement('option');
          optDest.value = r.id;
          optDest.textContent = text;
          destGroup.appendChild(optDest);
        }
      });

      if (navStartSelect && startGroup.children.length > 0) {
        navStartSelect.appendChild(startGroup);
      }
      if (navDestSelect && destGroup.children.length > 0) {
        navDestSelect.appendChild(destGroup);
      }
    });
  }

  populateNavDropdowns();

  function updateRouteFloorPills() {
    if (!routeFloorSteps) return;
    const pills = routeFloorSteps.querySelectorAll('.route-floor-pill');
    pills.forEach(pill => {
      const isCur = pill.dataset.floor === currentFloor;
      pill.classList.toggle('active', isCur);
    });
  }

  let lastAutoSwitchTime = 0;
  function checkAutoFloorSwitch(x, y) {
    if (!activeRoute || !activeRoute.isMultiFloor || !activeRoute.stairTransitions) return;
    const now = performance.now();
    if (now - lastAutoSwitchTime < 1800) return; // Debounce auto switch

    // Check if on currentFloor there is an exit transition to another floor
    const transition = activeRoute.stairTransitions.find(t => t.fromFloor === currentFloor);
    if (!transition) return;

    // The stair exit point on currentFloor
    const curFloorPts = activeRoute.floorPaths ? activeRoute.floorPaths[currentFloor] : null;
    if (!curFloorPts || curFloorPts.length === 0) return;
    const stairExitPt = curFloorPts[curFloorPts.length - 1];

    const distToStairs = Math.hypot(x - stairExitPt[0], y - stairExitPt[1]);
    if (distToStairs <= 28) {
      lastAutoSwitchTime = now;
      // Auto switch to next floor
      switchFloor(transition.toFloor);

      // Place marker at stair entry on the new floor if available
      if (transition.stairPos) {
        updateMarker(transition.stairPos.x, transition.stairPos.y, 4, currentHeading);
      }

      if (routeInstructionBar) {
        routeInstructionBar.textContent = `🪜 Reached ${transition.stairName}. Automatically switched to ${transition.toFloorTitle}.`;
        routeInstructionBar.style.display = 'flex';
        setTimeout(() => {
          if (routeInstructionBar) routeInstructionBar.style.display = 'none';
        }, 3500);
      }
    }
  }

  function renderCampusRoute(route) {
    activeRoute = route;

    // Clear all floor route layers
    Object.values(floorRouteLayers).forEach(layer => {
      if (layer) layer.innerHTML = '';
    });

    if (!route || !route.floorPaths || Object.keys(route.floorPaths).length === 0) {
      if (routeSummaryBar) routeSummaryBar.style.display = 'none';
      if (clearRouteBtn) clearRouteBtn.style.display = 'none';
      if (routeFloorSteps) routeFloorSteps.innerHTML = '';
      return;
    }

    const floorShort = {
      ground: 'Ground',
      first: '1st Floor',
      second: '2nd Floor',
      third: '3rd Floor'
    };

    // Render SVG path elements for each traversed floor
    Object.entries(route.floorPaths).forEach(([fKey, pts]) => {
      const layer = floorRouteLayers[fKey];
      if (!layer || !pts || pts.length === 0) return;

      const pointsStr = pts.map(pt => `${pt[0].toFixed(1)},${pt[1].toFixed(1)}`).join(' ');
      let svgHtml = '';

      // Underlay glowing path
      svgHtml += `<polyline points="${pointsStr}" class="route-glow-polyline" />`;
      // Animated dashed corridor path
      svgHtml += `<polyline points="${pointsStr}" class="route-core-polyline" />`;

      const isStartFloor = route.floorsInRoute[0] === fKey;
      const isEndFloor = route.floorsInRoute[route.floorsInRoute.length - 1] === fKey;

      // Start Pin (shown on start floor if not GPS origin or non-active GPS)
      if (isStartFloor) {
        const startPt = pts[0];
        if (route.origin && route.origin.id !== 'gps_location') {
          svgHtml += `
            <g class="route-pin route-pin-start" transform="translate(${startPt[0].toFixed(1)}, ${startPt[1].toFixed(1)})">
              <circle cx="0" cy="0" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
            </g>
          `;
        }
      }

      // Destination Pin (shown on destination floor)
      if (isEndFloor) {
        const endPt = pts[pts.length - 1];
        svgHtml += `
          <g class="route-pin route-pin-dest" transform="translate(${endPt[0].toFixed(1)}, ${endPt[1].toFixed(1)})">
            <circle cx="0" cy="0" r="8" fill="#e11d48" stroke="#ffffff" stroke-width="2.5" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        `;
      }

      // Stair Pins on this floor
      if (route.stairTransitions && route.stairTransitions.length > 0) {
        // Exiting stairs
        const exitTrans = route.stairTransitions.find(t => t.fromFloor === fKey);
        if (exitTrans) {
          const exitPt = pts[pts.length - 1];
          const dirArrow = exitTrans.direction === 'up' ? '▲' : '▼';
          const toName = floorShort[exitTrans.toFloor] || exitTrans.toFloor;
          svgHtml += `
            <g class="route-stair-pin" transform="translate(${exitPt[0].toFixed(1)}, ${exitPt[1].toFixed(1)})">
              <circle cx="0" cy="0" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="2.5" />
              <text x="0" y="4.5" text-anchor="middle" font-size="12" fill="#ffffff">🪜</text>
              <rect x="-42" y="-30" width="84" height="18" rx="9" fill="#0f172a" fill-opacity="0.88" />
              <text x="0" y="-18" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#fef08a">${dirArrow} To ${toName}</text>
            </g>
          `;
        }

        // Entering stairs
        const enterTrans = route.stairTransitions.find(t => t.toFloor === fKey);
        if (enterTrans) {
          const enterPt = pts[0];
          const fromName = floorShort[enterTrans.fromFloor] || enterTrans.fromFloor;
          svgHtml += `
            <g class="route-stair-pin" transform="translate(${enterPt[0].toFixed(1)}, ${enterPt[1].toFixed(1)})">
              <circle cx="0" cy="0" r="14" fill="#3b82f6" stroke="#ffffff" stroke-width="2.5" />
              <text x="0" y="4.5" text-anchor="middle" font-size="12" fill="#ffffff">🪜</text>
              <rect x="-45" y="-30" width="90" height="18" rx="9" fill="#0f172a" fill-opacity="0.88" />
              <text x="0" y="-18" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#ffffff">From ${fromName}</text>
            </g>
          `;
        }
      }

      layer.innerHTML = svgHtml;
    });

    // Populate route summary metrics
    if (routeDistanceText && routeTimeText) {
      routeDistanceText.textContent = `Distance: ${route.totalDistanceMeters}m`;
      routeTimeText.textContent = `Est. Walk: ~${route.timeFormatted}`;
    }

    // Populate floor step pills
    if (routeFloorSteps) {
      routeFloorSteps.innerHTML = '';
      if (route.isMultiFloor && route.floorSegments) {
        route.floorSegments.forEach(seg => {
          if (seg.type === 'floor_walk') {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = `route-floor-pill ${seg.floor === currentFloor ? 'active' : ''}`;
            pill.dataset.floor = seg.floor;
            pill.title = `Switch to ${seg.floorTitle}`;
            pill.textContent = `${floorShort[seg.floor] || seg.floor}: ${seg.distanceMeters}m`;
            pill.addEventListener('click', (e) => {
              e.stopPropagation();
              switchFloor(seg.floor);
            });
            routeFloorSteps.appendChild(pill);
          } else if (seg.type === 'stair_transition') {
            const arrow = document.createElement('span');
            arrow.className = 'route-step-arrow';
            arrow.textContent = '→';
            routeFloorSteps.appendChild(arrow);

            const stairBadge = document.createElement('span');
            stairBadge.className = 'route-stair-badge';
            stairBadge.title = seg.instruction;
            const dirSym = seg.direction === 'up' ? '▲' : '▼';
            stairBadge.textContent = `🪜 Stairs (${dirSym})`;
            routeFloorSteps.appendChild(stairBadge);

            const arrow2 = document.createElement('span');
            arrow2.className = 'route-step-arrow';
            arrow2.textContent = '→';
            routeFloorSteps.appendChild(arrow2);
          }
        });
      }
    }

    if (routeSummaryBar) {
      routeSummaryBar.style.display = 'inline-flex';
    }
    if (clearRouteBtn) {
      clearRouteBtn.style.display = 'inline-block';
    }
  }

  function renderGroundRoute(route) {
    renderCampusRoute(route);
  }

  function generateCampusRoute() {
    if (!campusRouter) return;
    if (!navDestSelect || !navDestSelect.value) {
      clearActiveRoute();
      return;
    }

    const startVal = navStartSelect ? navStartSelect.value : 'gps';
    const destVal = navDestSelect.value;

    let startTarget;
    if (startVal === 'gps') {
      startTarget = {
        x: currentPos.x,
        y: currentPos.y,
        floor: currentFloor || 'ground',
        name: isGpsActive ? 'Current GPS Location' : 'Current Location'
      };
    } else {
      startTarget = startVal;
    }

    const result = campusRouter.findRoute(startTarget, destVal);
    if (result && result.success) {
      renderCampusRoute(result);
    } else {
      clearActiveRoute();
    }
  }

  function generateGroundRoute() {
    generateCampusRoute();
  }

  function clearActiveRoute() {
    activeRoute = null;
    Object.values(floorRouteLayers).forEach(layer => {
      if (layer) layer.innerHTML = '';
    });
    if (routeSummaryBar) {
      routeSummaryBar.style.display = 'none';
    }
    if (clearRouteBtn) {
      clearRouteBtn.style.display = 'none';
    }
    if (routeFloorSteps) {
      routeFloorSteps.innerHTML = '';
    }
    if (routeInstructionBar) {
      routeInstructionBar.style.display = 'none';
    }
    if (navDestSelect) {
      navDestSelect.value = '';
    }
  }

  function onRoomClicked(roomId) {
    if (!selectedRoom) {
      clearActiveRoute();
      return;
    }
    if (navDestSelect) {
      navDestSelect.value = roomId;
    }
    generateCampusRoute();
  }

  function onGroundRoomClicked(roomId) {
    onRoomClicked(roomId);
  }

  // Event Listeners for Campus Navigation Controls
  if (getRouteBtn) {
    getRouteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      generateCampusRoute();
    });
  }

  if (clearRouteBtn) {
    clearRouteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearActiveRoute();
      if (selectedRoom) {
        selectedRoom.classList.remove('selected');
        selectedRoom.setAttribute('aria-pressed', 'false');
        selectedRoom = null;
      }
    });
  }

  if (navDestSelect) {
    navDestSelect.addEventListener('change', () => {
      const targetRoomId = navDestSelect.value;
      if (targetRoomId) {
        const roomEl = document.getElementById(targetRoomId);
        if (roomEl && roomEl.classList.contains('selectable-room')) {
          if (selectedRoom !== roomEl) {
            selectRoom(roomEl);
          }
        }
        generateCampusRoute();
      } else {
        clearActiveRoute();
        if (selectedRoom) {
          selectedRoom.classList.remove('selected');
          selectedRoom.setAttribute('aria-pressed', 'false');
          selectedRoom = null;
        }
      }
    });
  }

  if (navStartSelect) {
    navStartSelect.addEventListener('change', () => {
      if (navDestSelect && navDestSelect.value) {
        generateCampusRoute();
      }
    });
  }

  if (navSwapBtn) {
    navSwapBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const curStart = navStartSelect.value;
      const curDest = navDestSelect.value;
      if (curStart === 'gps') {
        if (curDest) {
          navStartSelect.value = curDest;
          navDestSelect.value = '';
          clearActiveRoute();
        }
        return;
      }
      if (curDest) {
        navStartSelect.value = curDest;
        navDestSelect.value = curStart;
        const newDestEl = document.getElementById(curStart);
        if (newDestEl && newDestEl.classList.contains('selectable-room')) {
          if (selectedRoom !== newDestEl) {
            selectRoom(newDestEl);
          }
        }
        generateCampusRoute();
      }
    });
  }

  // ==========================================
  // --- Map Pan & Zoom Engine (Map Area Only) ---
  // ==========================================
  const mapPanStage = document.getElementById('map-pan-stage');
  const zoomInBtn = document.getElementById('map-zoom-in');
  const zoomOutBtn = document.getElementById('map-zoom-out');
  const zoomResetBtn = document.getElementById('map-zoom-reset');

  if (mapContainer && mapPanStage) {
    let scale = 1;
    let panX = 0;
    let panY = 0;
    const MIN_SCALE = 1.0;
    const MAX_SCALE = 4.5;

    function applyTransform(smooth = false) {
      if (!mapPanStage) return;
      if (smooth) {
        mapPanStage.style.transition = 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)';
      } else {
        mapPanStage.style.transition = 'none';
      }
      mapPanStage.style.transform = `translate3d(${panX}px, ${panY}px, 0px) scale(${scale})`;
    }

    mapPanStage.addEventListener('transitionend', () => {
      mapPanStage.style.transition = 'none';
    });

    function clampPan() {
      if (!mapContainer) return;
      const cRect = mapContainer.getBoundingClientRect();
      const scaledW = cRect.width * scale;
      const scaledH = cRect.height * scale;

      if (scale <= 1.01) {
        panX = 0;
        panY = 0;
        return;
      }

      // Allow comfortable panning margins so edge rooms can be centered
      const marginX = Math.min(80, cRect.width * 0.2);
      const marginY = Math.min(80, cRect.height * 0.2);

      const minX = cRect.width - scaledW - marginX;
      const maxX = marginX;
      panX = Math.min(maxX, Math.max(minX, panX));

      const minY = cRect.height - scaledH - marginY;
      const maxY = marginY;
      panY = Math.min(maxY, Math.max(minY, panY));
    }

    function zoomAtPoint(targetScale, clientX, clientY, smooth = false) {
      const rect = mapContainer.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;

      const stageX = (offsetX - panX) / scale;
      const stageY = (offsetY - panY) / scale;

      scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, targetScale));
      panX = offsetX - stageX * scale;
      panY = offsetY - stageY * scale;

      clampPan();
      applyTransform(smooth);
    }

    function resetView(smooth = true) {
      scale = 1;
      panX = 0;
      panY = 0;
      applyTransform(smooth);
    }

    // 1. Mouse wheel & Mac Trackpad Pinch inside Map Container ONLY
    mapContainer.addEventListener('wheel', (e) => {
      // Prevent entire webpage from scrolling or zooming while hovering map
      e.preventDefault();

      let zoomFactor;
      if (e.ctrlKey) {
        // macOS trackpad pinch gesture
        zoomFactor = Math.exp(-e.deltaY * 0.01);
      } else {
        // Traditional mouse scroll wheel
        zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      }

      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * zoomFactor));
      zoomAtPoint(newScale, e.clientX, e.clientY, false);
    }, { passive: false });

    // 2. Pointer Events for 1-Finger / Mouse Drag and 2-Finger Touch Pinch
    const activePointers = new Map();
    let isDragging = false;
    let startPointerDist = 0;
    let startPinchScale = 1;
    let totalDragDistance = 0;

    mapContainer.addEventListener('pointerdown', (e) => {
      // Don't initiate map pan if interacting with control buttons
      if (e.target.closest('#map-zoom-controls') || e.target.closest('#gps-dock')) {
        return;
      }

      mapContainer.setPointerCapture(e.pointerId);
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.size === 1) {
        isDragging = true;
        totalDragDistance = 0;
        mapPanStage.style.transition = 'none';
        mapPanStage.classList.add('is-panning');
      } else if (activePointers.size === 2) {
        isDragging = false;
        mapPanStage.classList.remove('is-panning');
        const pts = Array.from(activePointers.values());
        startPointerDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        startPinchScale = scale;
      }
    });

    mapContainer.addEventListener('pointermove', (e) => {
      if (!activePointers.has(e.pointerId)) return;
      const prevPt = activePointers.get(e.pointerId);
      const dx = e.clientX - prevPt.x;
      const dy = e.clientY - prevPt.y;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.size === 1 && isDragging) {
        totalDragDistance += Math.hypot(dx, dy);
        if (totalDragDistance > 5) {
          suppressClick = true;
        }
        panX += dx;
        panY += dy;
        clampPan();
        applyTransform(false);
      } else if (activePointers.size === 2) {
        suppressClick = true;
        const pts = Array.from(activePointers.values());
        const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (startPointerDist > 0) {
          const pinchCenterX = (pts[0].x + pts[1].x) / 2;
          const pinchCenterY = (pts[0].y + pts[1].y) / 2;
          const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, startPinchScale * (currentDist / startPointerDist)));
          zoomAtPoint(newScale, pinchCenterX, pinchCenterY, false);
        }
      }
    });

    function handlePointerEnd(e) {
      if (activePointers.has(e.pointerId)) {
        try {
          mapContainer.releasePointerCapture(e.pointerId);
        } catch (_) {}
        activePointers.delete(e.pointerId);
      }

      if (activePointers.size === 0) {
        isDragging = false;
        mapPanStage.classList.remove('is-panning');
        if (suppressClick) {
          setTimeout(() => {
            suppressClick = false;
          }, 100);
        }
      } else if (activePointers.size === 1) {
        isDragging = true;
        mapPanStage.classList.add('is-panning');
      }
    }

    mapContainer.addEventListener('pointerup', handlePointerEnd);
    mapContainer.addEventListener('pointercancel', handlePointerEnd);

    // 3. Floating Zoom Controls
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = mapContainer.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const newScale = Math.min(MAX_SCALE, scale * 1.3);
        zoomAtPoint(newScale, cx, cy, true);
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = mapContainer.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const newScale = Math.max(MIN_SCALE, scale / 1.3);
        zoomAtPoint(newScale, cx, cy, true);
      });
    }

    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetView(true);
      });
    }

    // 4. Resize listener to re-clamp pan if container size changes
    window.addEventListener('resize', () => {
      clampPan();
      applyTransform(false);
    });
  }
});