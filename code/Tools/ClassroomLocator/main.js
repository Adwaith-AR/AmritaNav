document.addEventListener('DOMContentLoaded', () => {
  // Flag to suppress room selection click when user was dragging/panning
  let suppressClick = false;

  // ==========================================
  // --- Theme Engine (Light / Dark Mode) ---
  // ==========================================
  // ==========================================
  // --- Theme Engine (Light / Dark Mode) ---
  // ==========================================
  const themeBtnLight = document.getElementById('theme-btn-light');
  const themeBtnDark  = document.getElementById('theme-btn-dark');
  let currentTheme = 'light';

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('amritanav-theme', theme);

    if (themeBtnLight) {
      const isLight = theme === 'light';
      themeBtnLight.classList.toggle('active', isLight);
      themeBtnLight.setAttribute('aria-checked', String(isLight));
    }
    if (themeBtnDark) {
      const isDark = theme === 'dark';
      themeBtnDark.classList.toggle('active', isDark);
      themeBtnDark.setAttribute('aria-checked', String(isDark));
    }
  }

  // Initialise from saved preference, fall back to OS preference
  const savedTheme = localStorage.getItem('amritanav-theme');
  const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (osPrefersDark ? 'dark' : 'light'));

  if (themeBtnLight) {
    themeBtnLight.addEventListener('click', (e) => { e.stopPropagation(); applyTheme('light'); });
  }
  if (themeBtnDark) {
    themeBtnDark.addEventListener('click', (e) => { e.stopPropagation(); applyTheme('dark'); });
  }

  // --- Room Selection Logic ---
  const rooms = document.querySelectorAll('.selectable-room');
  let selectedRoom = null;

  function selectRoom(room) {
    document.querySelectorAll('.selectable-room.search-highlighted').forEach(el => {
      el.classList.remove('search-highlighted');
    });
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

      if (typeof handleMapRoomClick === 'function') {
        handleMapRoomClick(room);
      }
    });

    room.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectRoom(room);

        if (typeof handleMapRoomClick === 'function') {
          handleMapRoomClick(room);
        }
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (suppressClick) return;
    if (e && e.target && (e.target.closest('#room-details-popup') || e.target.closest('.selectable-room') || e.target.closest('#classroom-search-container'))) {
      return;
    }
    if (selectedRoom) {
      selectedRoom.classList.remove('selected');
      selectedRoom.setAttribute('aria-pressed', 'false');
      selectedRoom = null;
    }
    document.querySelectorAll('.selectable-room.search-highlighted').forEach(el => {
      el.classList.remove('search-highlighted');
    });
    if (typeof hideRoomDetailsPopup === 'function') {
      hideRoomDetailsPopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (selectedRoom) {
        selectedRoom.classList.remove('selected');
        selectedRoom.setAttribute('aria-pressed', 'false');
        selectedRoom = null;
      }
      document.querySelectorAll('.selectable-room.search-highlighted').forEach(el => {
        el.classList.remove('search-highlighted');
      });
      if (typeof hideRoomDetailsPopup === 'function') {
        hideRoomDetailsPopup();
      }
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
  let activeCategoryFilter = null; // 'toilet' | 'lab' | 'office' | null

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

    // Re-apply active category filter (washrooms, labs, offices) on the newly selected floor
    if (typeof applyCategoryHighlight === 'function' && activeCategoryFilter) {
      applyCategoryHighlight(activeCategoryFilter);
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
    defaultX: 305,
    defaultY: 835
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
    if (typeof syncNavDestInputFromSelect === 'function') {
      syncNavDestInputFromSelect();
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
    if (typeof syncNavDestInputFromSelect === 'function') {
      syncNavDestInputFromSelect();
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
          if (typeof syncNavInputsFromSelects === 'function') {
            syncNavInputsFromSelects();
          }
        }
        return;
      }
      if (curDest) {
        navStartSelect.value = curDest;
        navDestSelect.value = curStart;
        if (typeof syncNavInputsFromSelects === 'function') {
          syncNavInputsFromSelects();
        }
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
  let focusOnCoordinates = null;

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
      mapPanStage.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    }

    mapPanStage.addEventListener('transitionend', () => {
      mapPanStage.style.transition = 'none';
    });

    function clampPan() {
      if (!mapContainer || !mapPanStage) return;
      const cRect = mapContainer.getBoundingClientRect();
      const stageW = mapPanStage.offsetWidth || cRect.width;
      const stageH = mapPanStage.offsetHeight || cRect.height;
      const scaledW = stageW * scale;
      const scaledH = stageH * scale;

      // Allow dragging freely across the screen at any zoom level
      const marginX = Math.max(cRect.width * 0.75, 350);
      const marginY = Math.max(cRect.height * 0.75, 350);

      const boundMinX = Math.min(cRect.width - scaledW - marginX, marginX);
      const boundMaxX = Math.max(cRect.width - scaledW - marginX, marginX);
      panX = Math.min(boundMaxX, Math.max(boundMinX, panX));

      const boundMinY = Math.min(cRect.height - scaledH - marginY, marginY);
      const boundMaxY = Math.max(cRect.height - scaledH - marginY, marginY);
      panY = Math.min(boundMaxY, Math.max(boundMinY, panY));
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

    focusOnCoordinates = function(cx, cy, targetScale = 2.4, smooth = true) {
      if (!mapContainer || !mapPanStage) return;
      const cRect = mapContainer.getBoundingClientRect();
      const activeLayer = document.querySelector('.floor-layer.active');
      const img = activeLayer ? activeLayer.querySelector('.central-image') : null;
      const stageW = (img && img.offsetWidth) ? img.offsetWidth : (mapPanStage.offsetWidth || 1000);
      const stageH = (img && img.offsetHeight) ? img.offsetHeight : (mapPanStage.offsetHeight || 615);

      const stageX = (cx / 2112) * stageW;
      const stageY = (cy / 1300) * stageH;

      scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, targetScale));
      panX = (cRect.width / 2) - (stageX * scale);
      panY = (cRect.height / 2) - (stageY * scale);

      clampPan();
      applyTransform(smooth);
    };

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
      // Don't initiate map pan if interacting with control buttons or floating bars
      if (e.target.closest('#map-zoom-controls') ||
          e.target.closest('#gps-dock') ||
          e.target.closest('.floating-top-bar')) {
        return;
      }

      if (e.button !== undefined && e.button !== 0) return;

      try {
        mapContainer.setPointerCapture(e.pointerId);
      } catch (_) {}

      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.size === 1) {
        isDragging = true;
        totalDragDistance = 0;
        mapPanStage.style.transition = 'none';
        mapPanStage.classList.add('is-panning');
        mapContainer.classList.add('is-panning');
      } else if (activePointers.size === 2) {
        isDragging = false;
        mapPanStage.classList.remove('is-panning');
        mapContainer.classList.remove('is-panning');
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
        if (totalDragDistance > 4) {
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
        mapContainer.classList.remove('is-panning');
        if (suppressClick) {
          setTimeout(() => {
            suppressClick = false;
          }, 80);
        }
      } else if (activePointers.size === 1) {
        isDragging = true;
        mapPanStage.classList.add('is-panning');
        mapContainer.classList.add('is-panning');
      }
    }

    mapContainer.addEventListener('pointerup', handlePointerEnd);
    mapContainer.addEventListener('pointercancel', handlePointerEnd);
    mapContainer.addEventListener('lostpointercapture', handlePointerEnd);
    mapContainer.addEventListener('dragstart', (e) => e.preventDefault());

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

  // ==========================================
  // --- Classroom Search Engine ---
  // ==========================================
  const searchInput = document.getElementById('classroom-search-input');
  const searchClear = document.getElementById('classroom-search-clear');
  const searchBtn = document.getElementById('classroom-search-btn');
  const searchSuggestions = document.getElementById('classroom-search-suggestions');
  const searchFeedback = document.getElementById('classroom-search-feedback');

  // Build searchable rooms list using existing project data (window.CAMPUS_NAV_DATA)
  // with fallback to querying DOM SVG selectable-room elements.
  function getSearchableRooms() {
    const navData = window.CAMPUS_NAV_DATA || window.GROUND_NAV_DATA;
    const floorKeys = ['ground', 'first', 'second', 'third'];
    const floorTitles = {
      ground: 'Ground Floor',
      first: '1st Floor',
      second: '2nd Floor',
      third: '3rd Floor'
    };

    const roomList = [];
    const seenIds = new Set();

    if (navData && navData.floors) {
      floorKeys.forEach(fKey => {
        const floorObj = navData.floors[fKey];
        if (!floorObj || !floorObj.rooms) return;
        floorObj.rooms.forEach(r => {
          if (!r.id || seenIds.has(r.id)) return;
          if (r.id.toLowerCase().includes('courtyard') || (r.name && r.name.toLowerCase().includes('courtyard')) || (r.code && r.code.toLowerCase().includes('cyd'))) {
            return;
          }
          seenIds.add(r.id);

          const rName = r.name || r.id;
          const rCode = r.code || '';
          const isToilet = /toilet|washroom|restroom|wc/i.test(rName) || /^wc$/i.test(rCode) || r.id.toLowerCase().includes('toilet');
          const isLab = /lab/i.test(rName) || /lab/i.test(rCode);
          const isOffice = /office|admin|reception|dept/i.test(rName) || /adm|dir|off/i.test(rCode);
          const isHall = /hall|seminar|conf/i.test(rName) || /sph|amh|ach|conf|cir/i.test(rCode);

          let category = 'room';
          let icon = '🎓';
          let categoryLabel = 'Classroom';
          if (isToilet) {
            category = 'toilet';
            icon = '🚻';
            categoryLabel = 'Restroom / Washroom';
          } else if (isLab) {
            category = 'lab';
            icon = '🔬';
            categoryLabel = 'Laboratory';
          } else if (isOffice) {
            category = 'office';
            icon = '🏢';
            categoryLabel = 'Department Office';
          } else if (isHall) {
            category = 'hall';
            icon = '🏛️';
            categoryLabel = 'Hall & Seminar';
          }

          roomList.push({
            id: r.id,
            name: rName,
            code: rCode,
            floor: fKey,
            floorTitle: floorTitles[fKey] || fKey,
            cx: typeof r.cx === 'number' ? r.cx : 1056,
            cy: typeof r.cy === 'number' ? r.cy : 650,
            isToilet,
            category,
            icon,
            categoryLabel
          });
        });
      });
    }

    // Fallback for any DOM selectable room not in dataset
    const domRooms = document.querySelectorAll('.selectable-room');
    domRooms.forEach(roomEl => {
      const id = roomEl.id;
      if (!id || seenIds.has(id)) return;
      if (id.toLowerCase().includes('courtyard')) return;
      seenIds.add(id);

      const layer = roomEl.closest('.floor-layer');
      const floor = layer ? (layer.dataset.floor || 'ground') : 'ground';
      const name = roomEl.dataset.name || roomEl.getAttribute('aria-label') || id;
      const code = roomEl.dataset.code || '';

      const isToilet = /toilet|washroom|restroom|wc/i.test(name) || /^wc$/i.test(code) || id.toLowerCase().includes('toilet');
      const isLab = /lab/i.test(name) || /lab/i.test(code);
      const isOffice = /office|admin|reception|dept/i.test(name) || /adm|dir|off/i.test(code);
      const isHall = /hall|seminar|conf/i.test(name) || /sph|amh|ach|conf|cir/i.test(code);

      let category = 'room';
      let icon = '🎓';
      let categoryLabel = 'Classroom';
      if (isToilet) {
        category = 'toilet';
        icon = '🚻';
        categoryLabel = 'Restroom / Washroom';
      } else if (isLab) {
        category = 'lab';
        icon = '🔬';
        categoryLabel = 'Laboratory';
      } else if (isOffice) {
        category = 'office';
        icon = '🏢';
        categoryLabel = 'Department Office';
      } else if (isHall) {
        category = 'hall';
        icon = '🏛️';
        categoryLabel = 'Hall & Seminar';
      }

      let cx = 1056;
      let cy = 650;
      const tf = roomEl.getAttribute('transform');
      if (tf) {
        const rotMatch = tf.match(/rotate\(\s*[\d\.\-]+\s+([\d\.\-]+)\s+([\d\.\-]+)\s*\)/);
        if (rotMatch) {
          cx = parseFloat(rotMatch[1]);
          cy = parseFloat(rotMatch[2]);
        }
      } else {
        const x = parseFloat(roomEl.getAttribute('x')) || 0;
        const y = parseFloat(roomEl.getAttribute('y')) || 0;
        const w = parseFloat(roomEl.getAttribute('width')) || 0;
        const h = parseFloat(roomEl.getAttribute('height')) || 0;
        cx = x + w / 2;
        cy = y + h / 2;
      }

      roomList.push({
        id,
        name,
        code,
        floor,
        floorTitle: floorTitles[floor] || floor,
        cx,
        cy,
        isToilet,
        category,
        icon,
        categoryLabel
      });
    });

    return roomList;
  }

  const searchableRooms = getSearchableRooms();

  // Normalize query and room text by stripping whitespaces, dashes, and special characters
  function normalizeRoomQuery(str) {
    if (!str) return '';
    return str.toLowerCase().replace(/[\s\-_—]/g, '');
  }

  // Detect floor intent from query
  function parseFloorQuery(q) {
    const lower = q.toLowerCase();
    if (/\b(third|3rd)\b|floor\s*3\b/i.test(lower)) return 'third';
    if (/\b(second|2nd)\b|floor\s*2\b/i.test(lower)) return 'second';
    if (/\b(first|1st)\b|floor\s*1\b/i.test(lower)) return 'first';
    if (/\b(ground)\b|floor\s*0\b/i.test(lower)) return 'ground';
    return null;
  }

  // Smart Scoring function:
  // Recognizes floor intent, category synonyms (toilet/washroom/restroom/wc, lab, office),
  // room codes (e.g. A-301, SPH-102, WC, 306), and names.
  function scoreRoomMatch(room, query) {
    const qRaw = query.trim().toLowerCase();
    const qNorm = normalizeRoomQuery(query);
    if (!qNorm) return 0;

    const targetFloor = parseFloorQuery(query);

    // Strip floor tokens to find subject query
    const subject = qRaw.replace(/\b(third|3rd|second|2nd|first|1st|ground|floor|\d(st|nd|rd|th))\b/gi, '').trim();
    const subjectNorm = normalizeRoomQuery(subject);

    // If user searched only a floor (e.g., "third floor", "3rd floor", "third", "3rd", "floor 3"):
    if (targetFloor && !subjectNorm) {
      if (room.floor === targetFloor) {
        if (room.isToilet) return 85;
        if (room.category === 'lab' || room.category === 'office') return 75;
        return 65;
      }
      return 0;
    }

    // If user specified a floor and room is on a different floor, exclude it
    if (targetFloor && room.floor !== targetFloor) {
      return 0;
    }

    const testSubject = subject || qRaw;
    const testNorm = subjectNorm || qNorm;

    // Check toilet / washroom / restroom / bathroom / wc synonyms
    const isToiletSearch = /\b(toilet|toilets|washroom|washrooms|restroom|restrooms|bathroom|bathrooms|wc|lavatory)\b/i.test(testSubject);
    if (isToiletSearch && room.isToilet) {
      let score = 95;
      if (targetFloor && room.floor === targetFloor) score += 120;
      else if (room.floor === currentFloor) score += 35;
      return score;
    }

    // Check lab synonym
    const isLabSearch = /\b(lab|labs|laboratory|laboratories)\b/i.test(testSubject);
    if (isLabSearch && (room.category === 'lab' || (room.name && /lab/i.test(room.name)))) {
      let score = 90;
      if (targetFloor && room.floor === targetFloor) score += 120;
      else if (room.floor === currentFloor) score += 25;
      return score;
    }

    const nameRaw = (room.name || '').toLowerCase();
    const codeRaw = (room.code || '').toLowerCase();
    const idRaw = (room.id || '').toLowerCase();

    const nameNorm = normalizeRoomQuery(room.name);
    const codeNorm = normalizeRoomQuery(room.code);
    const idNorm = normalizeRoomQuery(room.id);

    let score = 0;

    // Room code exact & prefix matches have highest priority
    if (codeNorm === testNorm || nameNorm === testNorm) {
      score = 120;
    } else if (codeNorm.startsWith(testNorm) || nameNorm.startsWith(testNorm)) {
      score = 95;
    } else if (codeRaw.includes(testSubject) || nameRaw.includes(testSubject) || idRaw.includes(testSubject)) {
      score = 75;
    } else if (codeNorm.includes(testNorm) || nameNorm.includes(testNorm) || idNorm.includes(testNorm)) {
      score = 55;
    }

    if (score > 0) {
      if (targetFloor && room.floor === targetFloor) {
        score += 80;
      } else if (room.floor === currentFloor) {
        score += 20;
      }
    }

    return score;
  }

  function findRoomMatches(query) {
    if (!query || !query.trim()) return [];
    return searchableRooms
      .map(room => ({ room, score: scoreRoomMatch(room, query) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.room);
  }

  let activeSuggestionIndex = -1;

  function renderSuggestions(matches) {
    if (!searchSuggestions) return;
    searchSuggestions.innerHTML = '';
    activeSuggestionIndex = -1;

    if (!matches || matches.length === 0) {
      searchSuggestions.style.display = 'none';
      return;
    }

    // Increased capacity to ensure all matching rooms/toilets across all 4 floors are visible
    const maxItems = 28;
    const displayed = matches.slice(0, maxItems);

    displayed.forEach((room, idx) => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', idx);

      const iconSpan = document.createElement('span');
      iconSpan.className = 'suggestion-icon';
      iconSpan.textContent = room.icon || '📍';
      iconSpan.style.fontSize = '16px';
      iconSpan.style.flexShrink = '0';
      item.appendChild(iconSpan);

      const infoDiv = document.createElement('div');
      infoDiv.className = 'suggestion-room-info';
      infoDiv.style.flex = '1';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'suggestion-room-name';
      nameSpan.textContent = room.name;
      infoDiv.appendChild(nameSpan);

      if (room.code && room.code !== room.name) {
        const codeSpan = document.createElement('span');
        codeSpan.className = 'suggestion-room-code';
        codeSpan.textContent = room.code;
        infoDiv.appendChild(codeSpan);
      }

      const badge = document.createElement('span');
      badge.className = `suggestion-floor-badge floor-${room.floor}`;
      badge.textContent = room.floorTitle;

      item.appendChild(infoDiv);
      item.appendChild(badge);

      item.addEventListener('click', (e) => {
        e.stopPropagation();
        searchInput.value = room.name;
        selectAndPreviewRoom(room);
      });

      searchSuggestions.appendChild(item);
    });

    searchSuggestions.style.display = 'block';
  }

  // ── Room Details Popup Manager ────────────────────────────────
  let currentPopupRoom = null;

  function showRoomDetailsPopup(room) {
    if (!room) return;
    currentPopupRoom = room;

    const popup = document.getElementById('room-details-popup');
    if (!popup) return;

    const iconEl = document.getElementById('room-popup-icon');
    const floorBadgeEl = document.getElementById('room-popup-floor-badge');
    const categoryBadgeEl = document.getElementById('room-popup-category-badge');
    const titleEl = document.getElementById('room-popup-title');
    const codeBadgeEl = document.getElementById('room-popup-code-badge');
    const floorNameEl = document.getElementById('room-popup-floor-name');

    if (iconEl) iconEl.textContent = room.icon || '📍';
    if (floorBadgeEl) {
      floorBadgeEl.textContent = room.floorTitle || room.floor;
      floorBadgeEl.className = `room-popup-floor-badge floor-${room.floor}`;
    }
    if (categoryBadgeEl) {
      categoryBadgeEl.textContent = room.categoryLabel || 'Classroom';
    }
    if (titleEl) {
      titleEl.textContent = room.name;
    }
    if (codeBadgeEl) {
      if (room.code && room.code !== room.name) {
        codeBadgeEl.textContent = `Code: ${room.code}`;
        codeBadgeEl.style.display = 'inline-block';
      } else {
        codeBadgeEl.style.display = 'none';
      }
    }
    if (floorNameEl) {
      floorNameEl.textContent = `${room.floorTitle} • Amrita Campus`;
    }

    popup.style.display = 'block';
  }

  function hideRoomDetailsPopup() {
    const popup = document.getElementById('room-details-popup');
    if (popup) {
      popup.style.display = 'none';
    }
    currentPopupRoom = null;
  }

  // Global helper for map room clicks
  function handleMapRoomClick(roomEl) {
    if (!roomEl) return;
    const found = searchableRooms.find(r => r.id === roomEl.id);
    if (found) {
      showRoomDetailsPopup(found);
    }
  }

  // Preview searched room on map WITHOUT starting navigation immediately
  function selectAndPreviewRoom(room) {
    if (!room) return;

    // 1. Hide initial floor prompt if active & ensure main-content is visible
    if (floorPromptModal && floorPromptModal.style.display !== 'none') {
      floorPromptModal.style.display = 'none';
    }
    if (mainContent && mainContent.style.display === 'none') {
      mainContent.style.display = 'flex';
    }

    // 2. Clear invalid search feedback & hide suggestions
    if (searchFeedback) {
      searchFeedback.style.display = 'none';
      searchFeedback.textContent = '';
    }
    if (searchSuggestions) {
      searchSuggestions.style.display = 'none';
    }

    // 3. Switch floor if room is on another floor
    if (currentFloor !== room.floor) {
      switchFloor(room.floor);
    }

    // 4. Highlight the room element on map
    const roomEl = document.getElementById(room.id);
    if (roomEl) {
      document.querySelectorAll('.selectable-room.search-highlighted').forEach(el => {
        el.classList.remove('search-highlighted');
      });

      if (selectedRoom !== roomEl) {
        selectRoom(roomEl);
      }
      roomEl.classList.add('search-highlighted');
    }

    // 5. Center and zoom map on the searched room
    requestAnimationFrame(() => {
      if (typeof focusOnCoordinates === 'function') {
        focusOnCoordinates(room.cx, room.cy, 2.4, true);
      }
    });

    // 6. Show room details popup card with "Start Navigation" button underneath
    showRoomDetailsPopup(room);
  }

  function locateClassroom(room) {
    selectAndPreviewRoom(room);
  }

  function performSearch() {
    if (!searchInput) return;
    const query = searchInput.value.trim();
    if (!query) return;

    const matches = findRoomMatches(query);

    if (matches.length > 0) {
      const bestMatch = matches[0];
      searchInput.value = bestMatch.name;
      selectAndPreviewRoom(bestMatch);
    } else {
      if (searchFeedback) {
        searchFeedback.textContent = 'Room not found.';
        searchFeedback.style.display = 'block';
      }
      if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
      }
    }
  }

  // ── Popup Action Buttons (Start Navigation & Close) ───────────
  const roomPopupCloseBtn = document.getElementById('room-popup-close-btn');
  const roomPopupNavBtn = document.getElementById('room-popup-nav-btn');

  if (roomPopupCloseBtn) {
    roomPopupCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideRoomDetailsPopup();
      document.querySelectorAll('.selectable-room.search-highlighted').forEach(el => {
        el.classList.remove('search-highlighted');
      });
      if (selectedRoom) {
        selectedRoom.classList.remove('selected');
        selectedRoom.setAttribute('aria-pressed', 'false');
        selectedRoom = null;
      }
    });
  }

  if (roomPopupNavBtn) {
    roomPopupNavBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!currentPopupRoom) return;
      const targetRoom = currentPopupRoom;
      hideRoomDetailsPopup();

      if (navDestSelect) {
        navDestSelect.value = targetRoom.id;
      }
      if (typeof syncNavDestInputFromSelect === 'function') {
        syncNavDestInputFromSelect();
      }
      if (groundNavBar) {
        groundNavBar.style.display = 'flex';
      }
      generateCampusRoute();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value;
      if (searchClear) {
        searchClear.style.display = val ? 'inline-flex' : 'none';
      }
      if (searchFeedback) {
        searchFeedback.style.display = 'none';
      }

      if (!val.trim()) {
        if (searchSuggestions) searchSuggestions.style.display = 'none';
        return;
      }

      const matches = findRoomMatches(val);
      renderSuggestions(matches);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (searchSuggestions && searchSuggestions.style.display !== 'none') {
        const items = searchSuggestions.querySelectorAll('.suggestion-item');
        if (items.length > 0) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
            items.forEach((it, idx) => it.classList.toggle('active', idx === activeSuggestionIndex));
            items[activeSuggestionIndex].scrollIntoView({ block: 'nearest' });
            return;
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
            items.forEach((it, idx) => it.classList.toggle('active', idx === activeSuggestionIndex));
            items[activeSuggestionIndex].scrollIntoView({ block: 'nearest' });
            return;
          } else if (e.key === 'Enter' && activeSuggestionIndex >= 0 && activeSuggestionIndex < items.length) {
            e.preventDefault();
            items[activeSuggestionIndex].click();
            return;
          }
        }
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      } else if (e.key === 'Escape') {
        if (searchSuggestions) searchSuggestions.style.display = 'none';
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      performSearch();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', (e) => {
      e.stopPropagation();
      searchInput.value = '';
      searchClear.style.display = 'none';
      if (searchSuggestions) searchSuggestions.style.display = 'none';
      if (searchFeedback) searchFeedback.style.display = 'none';
      document.querySelectorAll('.selectable-room.search-highlighted').forEach(el => {
        el.classList.remove('search-highlighted');
      });
      hideRoomDetailsPopup();
      searchInput.focus();
    });
  }

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#classroom-search-container')) {
      if (searchSuggestions) searchSuggestions.style.display = 'none';
    }
  });

  // ==========================================
  // --- Category Chips & Quick Filters (Washrooms, Labs, Offices) ---
  // ==========================================
  const categoryChips = document.querySelectorAll('.category-chip');

  function isToiletRoom(el) {
    const name = el.dataset.name || el.getAttribute('aria-label') || '';
    const code = el.dataset.code || '';
    const id = el.id || '';
    return /toilet|mens\s*toilet|ladies\s*toilet|\bwc\b/i.test(name) ||
           /toilet|\bwc\b/i.test(code) ||
           /toilet/i.test(id) ||
           (/\bmens\b/i.test(name) && !/nanosciences/i.test(name));
  }

  function isLabRoom(el) {
    const name = el.dataset.name || el.getAttribute('aria-label') || '';
    const code = el.dataset.code || '';
    const id = el.id || '';
    return /lab|workshop|metallurgy|wind_tunnel|cae_cell/i.test(name) ||
           /lab/i.test(code) ||
           /lab|workshop|metallurgy|wind_tunnel|cae_cell/i.test(id);
  }

  function isOfficeRoom(el) {
    const name = el.dataset.name || el.getAttribute('aria-label') || '';
    const code = el.dataset.code || '';
    const id = el.id || '';
    return /office|dept|staff|dean|director|principal|admin|reception|chair|hod|reserve|\bsa\b/i.test(name) ||
           /office|admin|dept|dir/i.test(code) ||
           /office|admin|director|principal|dept/i.test(id);
  }

  function clearCategoryHighlights() {
    document.querySelectorAll('.selectable-room').forEach(el => {
      el.classList.remove('search-highlighted', 'toilet-highlighted', 'lab-highlighted', 'office-highlighted');
    });
  }

  function applyCategoryHighlight(category) {
    clearCategoryHighlights();
    if (!category) return;

    const activeLayer = document.querySelector('.floor-layer.active');
    if (!activeLayer) return;

    const roomsOnFloor = activeLayer.querySelectorAll('.selectable-room');
    let matchedCount = 0;
    const highlightClass = category === 'toilet' ? 'toilet-highlighted' : (category === 'lab' ? 'lab-highlighted' : 'office-highlighted');

    roomsOnFloor.forEach(roomEl => {
      let matches = false;
      if (category === 'toilet') matches = isToiletRoom(roomEl);
      else if (category === 'lab') matches = isLabRoom(roomEl);
      else if (category === 'office') matches = isOfficeRoom(roomEl);

      if (matches) {
        roomEl.classList.add('search-highlighted', highlightClass);
        matchedCount++;
      }
    });

    const categoryNames = {
      toilet: 'Washrooms',
      lab: 'Labs',
      office: 'Offices'
    };

    const floorNames = {
      ground: 'Ground Floor',
      first: '1st Floor',
      second: '2nd Floor',
      third: '3rd Floor'
    };

    const floorName = floorNames[currentFloor] || 'this floor';
    if (searchFeedback) {
      if (matchedCount > 0) {
        searchFeedback.textContent = `Showing all ${matchedCount} ${categoryNames[category] || category} on ${floorName}`;
        searchFeedback.style.color = category === 'toilet' ? '#0d9488' : (category === 'lab' ? '#e11d48' : '#2563eb');
        searchFeedback.style.display = 'block';
      } else {
        searchFeedback.textContent = `No ${categoryNames[category] || category} found on ${floorName}`;
        searchFeedback.style.color = '#dc2626';
        searchFeedback.style.display = 'block';
      }
    }
  }

  categoryChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const cat = chip.dataset.category;

      // If clicking already active chip, toggle it off
      if (activeCategoryFilter === cat) {
        activeCategoryFilter = null;
        chip.classList.remove('active');
        clearCategoryHighlights();
        if (searchFeedback) searchFeedback.style.display = 'none';
        return;
      }

      // Activate selected category chip, deactivate others
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategoryFilter = cat;

      // Clear single room selection & suggestions
      if (searchSuggestions) searchSuggestions.style.display = 'none';
      if (selectedRoom) {
        selectedRoom.classList.remove('selected');
        selectedRoom.setAttribute('aria-pressed', 'false');
        selectedRoom = null;
      }

      applyCategoryHighlight(cat);
    });
  });

  // ==========================================
  // --- Navigation Search Feature for From & To ---
  // ==========================================
  const navStartInput = document.getElementById('nav-start-input');
  const navStartClear = document.getElementById('nav-start-clear');
  const navStartSuggestions = document.getElementById('nav-start-suggestions');
  const navStartWrapper = document.getElementById('nav-start-wrapper');

  const navDestInput = document.getElementById('nav-dest-input');
  const navDestClear = document.getElementById('nav-dest-clear');
  const navDestSuggestions = document.getElementById('nav-dest-suggestions');
  const navDestWrapper = document.getElementById('nav-dest-wrapper');

  function getRoomDisplayLabel(id) {
    if (!id) return '';
    if (id === 'gps') return '📍 Current Location (GPS)';
    const room = (typeof searchableRooms !== 'undefined' ? searchableRooms : []).find(r => r.id === id);
    if (room) {
      return room.code && room.code !== room.name ? `${room.name} (${room.code})` : room.name;
    }
    if (navDestSelect) {
      const opt = navDestSelect.querySelector(`option[value="${id}"]`);
      if (opt && opt.textContent) return opt.textContent;
    }
    return id;
  }

  function syncNavStartInputFromSelect() {
    if (!navStartInput || !navStartSelect) return;
    const val = navStartSelect.value;
    navStartInput.value = getRoomDisplayLabel(val);
    if (navStartClear) {
      navStartClear.style.display = val ? 'flex' : 'none';
    }
  }

  function syncNavDestInputFromSelect() {
    if (!navDestInput || !navDestSelect) return;
    const val = navDestSelect.value;
    navDestInput.value = getRoomDisplayLabel(val);
    if (navDestClear) {
      navDestClear.style.display = val ? 'flex' : 'none';
    }
  }

  function syncNavInputsFromSelects() {
    syncNavStartInputFromSelect();
    syncNavDestInputFromSelect();
  }

  function setupNavSearchCombobox({ input, clearBtn, dropdown, selectEl, wrapper, isStart }) {
    if (!input || !dropdown || !selectEl) return;

    let activeIndex = -1;
    let currentItems = [];

    function renderDropdown(items) {
      dropdown.innerHTML = '';
      currentItems = items || [];
      activeIndex = -1;

      if (!currentItems.length) {
        const empty = document.createElement('div');
        empty.className = 'nav-suggestion-empty';
        empty.textContent = isStart ? 'No matching starting locations' : 'No matching destinations';
        dropdown.appendChild(empty);
        dropdown.style.display = 'flex';
        input.setAttribute('aria-expanded', 'true');
        return;
      }

      const frag = document.createDocumentFragment();
      currentItems.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'nav-suggestion-item';
        row.setAttribute('role', 'option');
        row.setAttribute('data-index', idx);

        row.innerHTML = `
          <span class="nav-suggestion-icon">${item.icon || '🚪'}</span>
          <div class="nav-suggestion-info">
            <span class="nav-suggestion-name">${item.title}</span>
            <span class="nav-suggestion-sub">${item.subtitle || ''}</span>
          </div>
          ${item.badge ? `<span class="nav-suggestion-badge">${item.badge}</span>` : ''}
        `;

        row.addEventListener('click', (e) => {
          e.stopPropagation();
          selectItem(item);
        });

        frag.appendChild(row);
      });

      dropdown.appendChild(frag);
      dropdown.style.display = 'flex';
      input.setAttribute('aria-expanded', 'true');
    }

    function selectItem(item) {
      input.value = item.displayLabel || item.title;
      selectEl.value = item.id;
      if (clearBtn) clearBtn.style.display = 'flex';
      dropdown.style.display = 'none';
      input.setAttribute('aria-expanded', 'false');

      if (!isStart) {
        const roomEl = document.getElementById(item.id);
        if (roomEl && roomEl.classList.contains('selectable-room')) {
          if (selectedRoom !== roomEl) {
            selectRoom(roomEl);
          }
        }
      }

      if (navStartSelect && navDestSelect && navStartSelect.value && navDestSelect.value) {
        generateCampusRoute();
      }
    }

    function getItemsForQuery(rawQuery) {
      const q = (rawQuery || '').trim();
      const results = [];

      if (isStart) {
        if (!q || /gps|curr|loc|start|my\s*loc|entrance/i.test(q)) {
          results.push({
            id: 'gps',
            title: 'Current Location (GPS)',
            subtitle: '📍 Live device GPS or campus entrance',
            icon: '📍',
            badge: 'GPS',
            displayLabel: '📍 Current Location (GPS)'
          });
        }
      }

      if (!q) {
        const sorted = (searchableRooms || []).slice().sort((a, b) => {
          if (a.floor === currentFloor && b.floor !== currentFloor) return -1;
          if (b.floor === currentFloor && a.floor !== currentFloor) return 1;
          return a.name.localeCompare(b.name);
        });

        sorted.slice(0, 32).forEach(r => {
          results.push({
            id: r.id,
            title: r.name,
            subtitle: (r.code && r.code !== r.name ? `Code: ${r.code} • ` : '') + (r.categoryLabel || r.floorTitle),
            icon: r.icon || (r.isToilet ? '🚻' : (r.category === 'lab' ? '🔬' : '🚪')),
            badge: r.floorTitle,
            displayLabel: r.code && r.code !== r.name ? `${r.name} (${r.code})` : r.name
          });
        });
      } else {
        const matches = findRoomMatches(q);
        matches.slice(0, 32).forEach(r => {
          results.push({
            id: r.id,
            title: r.name,
            subtitle: (r.code && r.code !== r.name ? `Code: ${r.code} • ` : '') + (r.categoryLabel || r.floorTitle),
            icon: r.icon || (r.isToilet ? '🚻' : (r.category === 'lab' ? '🔬' : '🚪')),
            badge: r.floorTitle,
            displayLabel: r.code && r.code !== r.name ? `${r.name} (${r.code})` : r.name
          });
        });
      }

      return results;
    }

    input.addEventListener('focus', () => {
      if (isStart && navDestSuggestions) navDestSuggestions.style.display = 'none';
      if (!isStart && navStartSuggestions) navStartSuggestions.style.display = 'none';

      const items = getItemsForQuery(input.value === '📍 Current Location (GPS)' ? '' : input.value);
      renderDropdown(items);
    });

    input.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dropdown.style.display === 'none' || !dropdown.style.display) {
        const items = getItemsForQuery(input.value === '📍 Current Location (GPS)' ? '' : input.value);
        renderDropdown(items);
      }
    });

    input.addEventListener('input', () => {
      const val = input.value;
      if (clearBtn) clearBtn.style.display = val ? 'flex' : 'none';
      const items = getItemsForQuery(val);
      renderDropdown(items);
    });

    input.addEventListener('keydown', (e) => {
      const itemsEl = dropdown.querySelectorAll('.nav-suggestion-item');
      if (dropdown.style.display !== 'none' && itemsEl.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          activeIndex = (activeIndex + 1) % itemsEl.length;
          itemsEl.forEach((it, idx) => it.classList.toggle('active', idx === activeIndex));
          itemsEl[activeIndex].scrollIntoView({ block: 'nearest' });
          return;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          activeIndex = (activeIndex - 1 + itemsEl.length) % itemsEl.length;
          itemsEl.forEach((it, idx) => it.classList.toggle('active', idx === activeIndex));
          itemsEl[activeIndex].scrollIntoView({ block: 'nearest' });
          return;
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < currentItems.length) {
            selectItem(currentItems[activeIndex]);
          } else if (currentItems.length > 0) {
            selectItem(currentItems[0]);
          }
          return;
        }
      }

      if (e.key === 'Escape') {
        dropdown.style.display = 'none';
        input.setAttribute('aria-expanded', 'false');
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        input.value = '';
        selectEl.value = '';
        clearBtn.style.display = 'none';
        dropdown.style.display = 'none';
        input.setAttribute('aria-expanded', 'false');
        input.focus();
        if (!isStart) {
          clearActiveRoute();
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (wrapper && !wrapper.contains(e.target)) {
        dropdown.style.display = 'none';
        input.setAttribute('aria-expanded', 'false');
        if (selectEl.value) {
          input.value = getRoomDisplayLabel(selectEl.value);
          if (clearBtn) clearBtn.style.display = 'flex';
        }
      }
    });
  }

  setupNavSearchCombobox({
    input: navStartInput,
    clearBtn: navStartClear,
    dropdown: navStartSuggestions,
    selectEl: navStartSelect,
    wrapper: navStartWrapper,
    isStart: true
  });

  setupNavSearchCombobox({
    input: navDestInput,
    clearBtn: navDestClear,
    dropdown: navDestSuggestions,
    selectEl: navDestSelect,
    wrapper: navDestWrapper,
    isStart: false
  });

  // Initial display sync
  if (navStartInput && navStartSelect) {
    syncNavStartInputFromSelect();
  }
  if (navDestInput && navDestSelect) {
    syncNavDestInputFromSelect();
  }

});