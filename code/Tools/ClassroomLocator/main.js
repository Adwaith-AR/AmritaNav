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
  // Destination chosen via search + "Start Navigation" while the floor
  // question is being (re-)asked; navigation resumes once the user answers.
  let pendingNavDestAfterFloorPrompt = null;

  // ==========================================
  // --- Global 90° Anticlockwise Display Orientation ---
  // ==========================================
  function rotatePoint90CCW(x, y, floorW, floorH) {
    return {
      x: y,
      y: floorW - x
    };
  }

  function unrotatePoint90CCW(displayX, displayY, floorW, floorH) {
    return {
      x: floorW - displayY,
      y: displayX
    };
  }

  function getFloorDimensions(floorKey) {
    const f = floorKey || currentFloor || 'ground';
    const navData = window.CAMPUS_NAV_DATA || window.GROUND_NAV_DATA;
    if (navData && navData.floors && navData.floors[f] && navData.floors[f].viewBox) {
      return {
        width: navData.floors[f].viewBox[0],
        height: navData.floors[f].viewBox[1]
      };
    }
    const layer = document.getElementById(`floor-layer-${f}`);
    if (layer) {
      const origW = layer.dataset.origWidth;
      const origH = layer.dataset.origHeight;
      if (origW && origH) return { width: parseFloat(origW), height: parseFloat(origH) };
    }
    return { width: 2112, height: 1300 };
  }

  function moveGpsMarkerToActiveFloor() {
    const activeLayer = document.querySelector('.floor-layer.active');
    const marker = document.getElementById('gps-marker');
    if (!activeLayer || !marker) return;
    const activeOrientationLayer = activeLayer.querySelector('.selection-overlay .map-orientation-layer');
    const activeOverlay = activeLayer.querySelector('.selection-overlay');
    const targetParent = activeOrientationLayer || activeOverlay;
    if (targetParent && marker.parentElement !== targetParent) {
      targetParent.appendChild(marker);
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
  // The chosen floor becomes the user's current floor for "Current Location"
  // navigation; live GPS is started right away so the precise position on
  // that floor shows as soon as the first fix arrives.
  function handleFloorPromptChoice(selectedFloor) {
    if (!selectedFloor) return;
    if (floorPromptModal) {
      floorPromptModal.style.display = 'none';
    }
    if (mainContent) {
      mainContent.style.display = 'flex';
    }
    switchFloor(selectedFloor);
    if (!isGpsActive) {
      pendingFocusUser = true;
      startGpsTracking();
    }
    // The question was re-asked by "Start Navigation": continue it now on the
    // user's actual floor (route start, view and GPS all follow this floor).
    if (pendingNavDestAfterFloorPrompt) {
      const destRoomId = pendingNavDestAfterFloorPrompt;
      pendingNavDestAfterFloorPrompt = null;
      startNavigationToRoom(destRoomId);
    }
  }

  floorPromptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      handleFloorPromptChoice(btn.dataset.floor);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFloorPromptChoice(btn.dataset.floor);
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

  // Campus exit points: the spots where people leave the campus on foot.
  // "Nearest Exit" routes to whichever of these is closest.
  //  - the outdoor walkway just outside the Admin Block entrance (ADM-BLK-A)
  //  - the north opening of the east-wing connector corridor (between
  //    Prayer Hall and Nanotech / Computer Lab)
  const CAMPUS_EXIT_POINTS = [
    { x: 280, y: 845, floor: 'ground' },
    { x: 1964, y: 656, floor: 'ground' }
  ];

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
  let lastGpsFixTs = -Infinity; // newest fix timestamp already applied
  let currentHeading = null;
  let currentPos = { x: GPS_CALIBRATION.defaultX, y: GPS_CALIBRATION.defaultY };

  // Bridge filled in by the Map Pan & Zoom engine below; lets the navigation
  // rotation engine pan the map (auto-center) without touching pan internals.
  let navPanBridge = null;

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

    // Turn-by-turn step advancement + wrong-way/off-route detection. The
    // route itself stays fixed; it is only re-planned (inside
    // updateNavigationProgress) when the user strays off it.
    if (activeRoute && typeof updateNavigationProgress === 'function') {
      updateNavigationProgress();
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
    updateNavRotationActive();
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
    lastGpsFixTs = -Infinity;

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
    updateNavRotationActive();

    gpsToggleBtn.classList.remove('active', 'locating');
    gpsBtnText.textContent = 'Locate Me';
    if (gpsStatusDot) gpsStatusDot.className = 'gps-status-dot';
  }

  function handleGpsSuccess(pos) {
    if (!isGpsActive) return;

    gpsToggleBtn.classList.remove('locating');

    const { latitude, longitude, accuracy, heading } = pos.coords;

    // Validate the fix and drop stale/out-of-order callbacks. While the page
    // is backgrounded (e.g. user is in a fake-GPS app), fixes queue up and can
    // arrive as an out-of-order burst on resume; only the newest valid fix may
    // drive the marker, heading and any viewport follow logic.
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;
    const fixTs = Number.isFinite(pos.timestamp) ? pos.timestamp : Date.now();
    if (fixTs < lastGpsFixTs) return;
    lastGpsFixTs = fixTs;

    updateHeadingFromFix(latitude, longitude, accuracy, heading, pos.coords.speed, pos.timestamp);
    const dist = haversineDistance(
      latitude,
      longitude,
      GPS_CALIBRATION.centerLat,
      GPS_CALIBRATION.centerLon
    );

    // Off the campus map canvas counts as out of campus even inside the
    // radius — the marker then sits on the default gate position.
    const rawX = (longitude - GPS_CALIBRATION.originLon) / GPS_CALIBRATION.lonPerPixel;
    const rawY = (GPS_CALIBRATION.originLat - latitude) / GPS_CALIBRATION.latPerPixel;
    const onCampusMap = rawX >= 0 && rawX <= GPS_CALIBRATION.mapWidth &&
                        rawY >= 0 && rawY <= GPS_CALIBRATION.mapHeight;
    const insideCampus = dist <= GPS_CALIBRATION.campusRadiusMeters && onCampusMap;

    if (heading !== null && !isNaN(heading)) {
      currentHeading = heading;
    }

    if (insideCampus) {
      const pt = gpsToCanvas(latitude, longitude);
      updateMarker(pt.x, pt.y, accuracy || 5, currentHeading);
      setGpsStatus('active');
      // Navigation was just started: snap the view onto the user's precise
      // location on their chosen floor as soon as the first fix arrives.
      if (pendingFocusUser) {
        pendingFocusUser = false;
        centerViewOnUser();
      }
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
      const floorKey = currentFloor || 'ground';
      const dims = getFloorDimensions(floorKey);
      const visualW = dims.height;
      const visualH = dims.width;

      const stageW = rect.width;
      const stageH = rect.height;
      const scaleSvg = Math.min(stageW / visualW, stageH / visualH);
      const svgLeft = (stageW - visualW * scaleSvg) / 2;
      const svgTop = (stageH - visualH * scaleSvg) / 2;

      const clickDisplayX = (e.clientX - rect.left - svgLeft) / scaleSvg;
      const clickDisplayY = (e.clientY - rect.top - svgTop) / scaleSvg;

      // Undo the navigation map rotation (rotation pivots about the user
      // marker's display position) before unrotating the base 90° orientation.
      let dispX = clickDisplayX, dispY = clickDisplayY;
      if (typeof navRotCurrent === 'number' && navRotCurrent !== 0 && typeof markerDisplayPt === 'function') {
        const piv = markerDisplayPt();
        const rad = -navRotCurrent * Math.PI / 180;
        const ddx = dispX - piv.x, ddy = dispY - piv.y;
        dispX = piv.x + ddx * Math.cos(rad) - ddy * Math.sin(rad);
        dispY = piv.y + ddx * Math.sin(rad) + ddy * Math.cos(rad);
      }

      const originalPt = unrotatePoint90CCW(dispX, dispY, dims.width, dims.height);
      updateMarker(originalPt.x, originalPt.y, 4, currentHeading);
      setGpsStatus('active');
    });
  });

  // ==========================================
  // --- Multi-Floor Campus Navigation System ---
  // ==========================================
  const navStartSelect = document.getElementById('nav-start-select');
  const navDestSelect = document.getElementById('nav-dest-select');
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navControlGroup = document.getElementById('nav-control-group');

  // ── Route planner dropdown (icon → form) ──────────────────────
  function isRoutePlannerOpen() {
    return navControlGroup ? !navControlGroup.classList.contains('collapsed') : false;
  }

  function setRoutePlannerOpen(open) {
    if (navControlGroup) navControlGroup.classList.toggle('collapsed', !open);
    if (navToggleBtn) {
      navToggleBtn.classList.toggle('active', open);
      navToggleBtn.setAttribute('aria-expanded', String(open));
    }
  }

  if (navToggleBtn) {
    navToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setRoutePlannerOpen(!isRoutePlannerOpen());
    });
  }

  // ── Show the user's location when navigation starts ───────────
  // The floor chosen in the opening prompt is the user's current floor
  // (switchFloor sets it); GPS then gives the precise position on it.
  let pendingFocusUser = false;

  function focusUserLocation() {
    if (!isGpsActive) {
      pendingFocusUser = true;
      startGpsTracking();
      return;
    }
    // No precise fix yet (marker still hidden): snap once the first fix lands.
    if (!gpsMarker || gpsMarker.style.display === 'none') {
      pendingFocusUser = true;
      return;
    }
    pendingFocusUser = false;
    centerViewOnUser();
  }

  // Zoom in and place the user's GPS marker at the centre of the viewport
  // (same framing as tapping a room), falling back to a plain pan if the
  // zoom-capable focus helper isn't available yet.
  function centerViewOnUser() {
    if (typeof focusOnCoordinates === 'function') {
      focusOnCoordinates(currentPos.x, currentPos.y, 2.4, true);
    } else {
      autoCenterOnUser(1);
    }
  }
  const navSwapBtn = document.getElementById('nav-swap-btn');
  const getRouteBtn = document.getElementById('get-route-btn');
  const clearRouteBtn = document.getElementById('clear-route-btn');
  const routeSummaryBar = document.getElementById('route-summary-bar');
  const routeDistanceText = document.getElementById('route-distance-text');
  const routeTimeText = document.getElementById('route-time-text');
  const routeFloorSteps = document.getElementById('route-floor-steps');
  const routeInstructionBar = document.getElementById('route-instruction-bar');
  const routeSummaryIconBtn = document.getElementById('route-summary-icon');
  const routeSummaryIconText = document.getElementById('route-summary-icon-text');
  const routeSummaryMinimizeBtn = document.getElementById('route-summary-minimize');
  const routeDirections = document.getElementById('route-directions');
  const routeStepNow = document.getElementById('route-step-now');

  // The route summary can shrink into a small tappable icon so the map stays
  // clear while navigating; tapping the icon expands the full panel again.
  function setRouteSummaryMinimized(minimized) {
    if (!routeSummaryBar) return;
    routeSummaryBar.classList.toggle('minimized', minimized);
    if (routeSummaryIconBtn) {
      routeSummaryIconBtn.setAttribute('aria-expanded', String(!minimized));
    }
  }

  function isRouteSummaryMinimized() {
    return !!(routeSummaryBar && routeSummaryBar.classList.contains('minimized'));
  }

  if (routeSummaryIconBtn) {
    routeSummaryIconBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setRouteSummaryMinimized(false);
    });
  }

  if (routeSummaryMinimizeBtn) {
    routeSummaryMinimizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setRouteSummaryMinimized(true);
    });
  }

  // ── Turn-by-turn progress, wrong-way & off-route detection ───────
  // The route is planned once from the start position and kept fixed; the
  // user's live GPS projection along it advances the current step. Only when
  // the user strays off the polyline or consistently walks backwards does the
  // route re-plan from their position.
  const navProgress = { samples: [], originPt: null };
  const OFF_ROUTE_PX = 60;          // ~9 m from the drawn route
  const WRONG_WAY_PX = 25;          // ~4 m net backwards along the route
  const REROUTE_DEBOUNCE_MS = 8000;
  let lastRerouteAt = 0;

  function nearestPointOnPolyline(pts, x, y) {
    let best = { dist: Infinity, s: 0 };
    let acc = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const ax = pts[i][0], ay = pts[i][1];
      const abx = pts[i + 1][0] - ax, aby = pts[i + 1][1] - ay;
      const ab2 = abx * abx + aby * aby;
      let t = ab2 > 0 ? ((x - ax) * abx + (y - ay) * aby) / ab2 : 0;
      t = Math.max(0, Math.min(1, t));
      const px = ax + abx * t, py = ay + aby * t;
      const d = Math.hypot(x - px, y - py);
      if (d < best.dist) {
        best = { dist: d, s: acc + Math.hypot(px - ax, py - ay) };
      }
      acc += Math.hypot(abx, aby);
    }
    if (pts.length === 1) {
      best = { dist: Math.hypot(x - pts[0][0], y - pts[0][1]), s: 0 };
    }
    return best;
  }

  function rerouteFromGps() {
    const now = performance.now();
    if (now - lastRerouteAt < REROUTE_DEBOUNCE_MS) return;
    lastRerouteAt = now;
    navProgress.samples = [];
    // Point-destination routes (Campus Exit) aren't in navDestSelect, so
    // re-plan them directly — generateCampusRoute would clear them.
    if (activeRoute && activeRoute.dest && activeRoute.dest.id === 'campus_exit_point') {
      navigateToNearestExit();
      return;
    }
    if (typeof generateCampusRoute === 'function') {
      generateCampusRoute();
    }
  }

  function polylineLengthPx(pts) {
    let len = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      len += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    }
    return len;
  }

  // Remaining walk distance: what's left on the user's floor, plus the full
  // length of every later floor in the route, plus stair-climb penalties.
  function computeRemainingMeters(route, floor, sOnFloor, mPerPx) {
    const order = route.floorsInRoute || [];
    const idx = order.indexOf(floor);
    if (idx === -1) return null;
    let remPx = Math.max(0, polylineLengthPx(route.floorPaths[floor] || []) - sOnFloor);
    for (let i = idx + 1; i < order.length; i++) {
      remPx += polylineLengthPx(route.floorPaths[order[i]] || []);
    }
    const penalty = (window.CAMPUS_NAV_DATA && window.CAMPUS_NAV_DATA.stairPenaltyMeters) || 15;
    const stairsLeft = (route.stairTransitions || []).filter(t => order.indexOf(t.fromFloor) > idx).length;
    return Math.max(0, Math.round(remPx * mPerPx + stairsLeft * penalty));
  }

  function formatWalkTime(meters) {
    const speed = (window.CAMPUS_NAV_DATA && window.CAMPUS_NAV_DATA.avgWalkingSpeedMps) || 1.3;
    const sec = Math.round(meters / speed);
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return min > 0 ? `${min} min${s ? ' ' + s + 's' : ''}` : `${s}s`;
  }

  function updateNavigationProgress() {
    if (!activeRoute || !activeRoute.steps || !activeRoute.steps.length) return;
    const pts = activeRoute.floorPaths && activeRoute.floorPaths[currentFloor];
    if (!pts || pts.length === 0) return;
    const steps = activeRoute.steps;
    const mPerPx = (window.CAMPUS_NAV_DATA && window.CAMPUS_NAV_DATA.scaleMetersPerPixel) || 0.15;

    // A freshly planned route (origin jumped): restart progress tracking
    if (!navProgress.originPt ||
        Math.hypot(activeRoute.origin.x - navProgress.originPt.x, activeRoute.origin.y - navProgress.originPt.y) > 20) {
      navProgress.originPt = { x: activeRoute.origin.x, y: activeRoute.origin.y };
      navProgress.samples = [];
    }

    const proj = nearestPointOnPolyline(pts, currentPos.x, currentPos.y);

    // Multi-stop trip: reached the current leg's stop (inside its room
    // footprint or within a couple of metres of the leg's end) — switch to
    // the next leg.
    if (activeMultiLeg && activeRoute.multiLeg &&
        activeMultiLeg.index < activeMultiLeg.legs.length - 1) {
      const dStop = Math.hypot(currentPos.x - activeRoute.dest.x, currentPos.y - activeRoute.dest.y);
      const stopInBox = isInsideRoomBox(activeRoute.dest && activeRoute.dest.id, currentPos.x, currentPos.y);
      if (dStop < 15 || stopInBox) {
        advanceMultiLeg();
        return;
      }
    }

    // Arrival: on the final leg, the user walked into the destination
    // room's footprint (or came within a couple of metres of the route's
    // end) — navigation ends by itself.
    const isFinalLeg = !activeMultiLeg || activeMultiLeg.index >= activeMultiLeg.legs.length - 1;
    if (isFinalLeg && activeRoute.totalDistanceMeters > 0) {
      const endFloor = activeRoute.floorsInRoute[activeRoute.floorsInRoute.length - 1];
      if (currentFloor === endFloor) {
        const endPts = activeRoute.floorPaths[endFloor];
        const endPt = endPts[endPts.length - 1];
        const dEnd = Math.hypot(currentPos.x - endPt[0], currentPos.y - endPt[1]);
        const inBox = isInsideRoomBox(activeRoute.dest && activeRoute.dest.id, currentPos.x, currentPos.y);
        if (inBox || dEnd < 15) {
          arriveAtDestination();
          return;
        }
      }
    }

    // Highlight the step the user has reached: last step at/behind their
    // projection on the current floor.
    let curIdx = -1;
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      if (st.floor !== currentFloor || st.arcLocal === undefined) continue;
      // Stair steps trigger slightly early so the pin popup has time to show
      if (st.arcLocal <= proj.s + (st.type === 'stair' ? 20 : 6)) {
        curIdx = Math.max(curIdx, i);
      }
    }
    if (curIdx === -1) {
      curIdx = steps.findIndex(st => st.floor === currentFloor);
      if (curIdx === -1) curIdx = 0;
    }
    if (routeDirections) {
      [...routeDirections.children].forEach((li, i) => li.classList.toggle('current', i === curIdx));
    }

    // Guidance chip: next event ahead on this floor and the distance to it
    let guide = null;
    let remM = 0;
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      if (st.floor !== currentFloor || st.arcLocal === undefined) continue;
      if (st.arcLocal > proj.s + 4) {
        guide = st;
        remM = Math.max(0, Math.round((st.arcLocal - proj.s) * mPerPx));
        break;
      }
    }
    if (!guide) guide = steps[steps.length - 1];

    // Wrong-way / off-route: progress samples over the last ~20 s
    const now = performance.now();
    const hist = navProgress.samples.filter(h => now - h.t < 20000);
    hist.push({ t: now, s: proj.s, d: proj.dist });
    navProgress.samples = hist.slice(-6);

    let warning = null;
    if (hist.length >= 4) {
      const net = hist[hist.length - 1].s - hist[0].s;
      if (hist[hist.length - 1].d > OFF_ROUTE_PX) {
        warning = 'Off route — re-routing…';
      } else if (net < -WRONG_WAY_PX) {
        warning = '⚠ Wrong way — turn around';
      }
    }
    if (warning) {
      routeStepNow.textContent = warning;
      routeStepNow.classList.add('warning');
      rerouteFromGps(); // re-plans from the live GPS position (debounced)
    } else {
      routeStepNow.classList.remove('warning');
      routeStepNow.textContent = guide.type === 'walk' ? `${guide.text} · in ${remM}m` : guide.text;
    }

    // Live ETA: re-compute remaining walk distance and time from the user's
    // position along the route instead of the static start-to-end total.
    const remainingM = computeRemainingMeters(activeRoute, currentFloor, proj.s, mPerPx);
    if (remainingM !== null) {
      const eta = formatWalkTime(remainingM);
      if (routeDistanceText) {
        routeDistanceText.textContent = `Distance: ${activeRoute.totalDistanceMeters}m · ${remainingM}m left`;
      }
      if (routeTimeText) {
        routeTimeText.textContent = `Est. Walk: ~${eta}`;
      }
      if (routeSummaryIconText) {
        routeSummaryIconText.textContent = `${remainingM}m · ~${eta}`;
      }
    }
  }

  const floorRouteLayers = {
    ground: document.getElementById('ground-route-layer'),
    first: document.getElementById('route-layer-first'),
    second: document.getElementById('route-layer-second'),
    third: document.getElementById('route-layer-third')
  };
  const groundRouteLayer = floorRouteLayers.ground;

  // ── Consistent toilet colour scheme across all floors ──────────
  // Every men's / ladies' toilet gets the same fill & stroke on every floor
  // so they're recognisable at a glance while navigating.
  const TOILET_COLORS = {
    mens: { fill: '#bfdbfe', stroke: '#2563eb' },   // blue
    ladies: { fill: '#fbcfe8', stroke: '#db2777' }  // pink
  };

  function applyToiletColorScheme() {
    document.querySelectorAll('rect.room-wall[data-name]').forEach(el => {
      const name = el.dataset.name || '';
      const scheme = /ladies/i.test(name)
        ? TOILET_COLORS.ladies
        : /\bmen'?s\b|\bmens\b/i.test(name) ? TOILET_COLORS.mens : null;
      if (!scheme) return;
      el.setAttribute('fill', scheme.fill);
      el.setAttribute('stroke', scheme.stroke);
    });
  }
  applyToiletColorScheme();

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

  // ── Staircase climb popup ─────────────────────────────────────
  const stairPopup = document.getElementById('stair-popup');
  const stairPopupTitle = document.getElementById('stair-popup-title');
  const stairPopupSub = document.getElementById('stair-popup-sub');
  let stairPopupTimer = null;

  function hideStairPopup() {
    if (stairPopup) stairPopup.style.display = 'none';
    if (stairPopupTimer) {
      clearTimeout(stairPopupTimer);
      stairPopupTimer = null;
    }
  }

  function showStairPopup(transition, route) {
    if (!stairPopup || !transition) return;
    const dirWord = transition.direction === 'down' ? 'down' : 'up';
    if (stairPopupTitle) {
      stairPopupTitle.textContent = `Climb ${dirWord} to ${transition.toFloorTitle}`;
    }
    if (stairPopupSub) {
      // Tell the user which floor the climb ends at: the immediate transition
      // floor, plus the final destination floor when the route continues.
      const destTitle = route && route.dest && route.dest.floorTitle ? route.dest.floorTitle : null;
      if (destTitle && destTitle !== transition.toFloorTitle) {
        stairPopupSub.textContent = `via ${transition.stairName} — then continue on to ${destTitle}`;
      } else {
        stairPopupSub.textContent = `via ${transition.stairName}`;
      }
    }
    stairPopup.style.display = 'block';
    if (stairPopupTimer) clearTimeout(stairPopupTimer);
    stairPopupTimer = setTimeout(hideStairPopup, 7000);
  }

  const stairPopupCloseBtn = document.getElementById('stair-popup-close');
  if (stairPopupCloseBtn) {
    stairPopupCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideStairPopup();
    });
  }

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

      // Popup: tell the user to climb and till which floor
      showStairPopup(transition, activeRoute);

      // Auto switch to next floor
      switchFloor(transition.toFloor);

      // Place marker at stair entry on the new floor if available
      if (transition.stairPos) {
        updateMarker(transition.stairPos.x, transition.stairPos.y, 4, currentHeading);
      }

      if (routeInstructionBar) {
        routeInstructionBar.textContent = `Reached ${transition.stairName}. Automatically switched to ${transition.toFloorTitle}.`;
        routeInstructionBar.style.display = 'flex';
        // The message lives inside the route summary panel: expand it so
        // the instruction is actually visible, then let it auto-hide.
        setRouteSummaryMinimized(false);
        setTimeout(() => {
          if (routeInstructionBar) routeInstructionBar.style.display = 'none';
        }, 3500);
      }
    }
  }

  function renderCampusRoute(route) {
    activeRoute = route;
    updateNavRotationActive();

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
            <g class="route-pin route-pin-start" transform="translate(${startPt[0].toFixed(1)}, ${startPt[1].toFixed(1)}) rotate(90)">
              <circle cx="0" cy="0" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
            </g>
          `;
        }
      }

      // Destination Pin (shown on destination floor)
      if (isEndFloor) {
        const endPt = pts[pts.length - 1];
        // Campus-exit routes end on the walkway near the user's marker — the
        // pin can hide under it, so raise an EXIT flag above the point.
        const exitFlag = route.dest && route.dest.id === 'campus_exit_point' ? `
            <rect x="-24" y="-48" width="48" height="20" rx="10" fill="#e11d48" stroke="#ffffff" stroke-width="1.5" />
            <text x="0" y="-33.5" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">EXIT</text>` : '';
        svgHtml += `
          <g class="route-pin route-pin-dest" transform="translate(${endPt[0].toFixed(1)}, ${endPt[1].toFixed(1)}) rotate(90)">
            <circle cx="0" cy="0" r="8" fill="#e11d48" stroke="#ffffff" stroke-width="2.5" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />${exitFlag}
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
            <g class="route-stair-pin" transform="translate(${exitPt[0].toFixed(1)}, ${exitPt[1].toFixed(1)}) rotate(90)">
              <circle cx="0" cy="0" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="2.5" />
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
            <g class="route-stair-pin" transform="translate(${enterPt[0].toFixed(1)}, ${enterPt[1].toFixed(1)}) rotate(90)">
              <circle cx="0" cy="0" r="14" fill="#3b82f6" stroke="#ffffff" stroke-width="2.5" />
              <rect x="-45" y="-30" width="90" height="18" rx="9" fill="#0f172a" fill-opacity="0.88" />
              <text x="0" y="-18" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#ffffff">From ${fromName}</text>
            </g>
          `;
        }
      }

      layer.innerHTML = svgHtml;
    });

    // Multi-stop trip preview: remaining legs as faint dashed paths, plus
    // numbered amber pins on the stops still ahead (the current leg's stop
    // is already marked by the red destination pin).
    if (route.multiLeg && activeMultiLeg) {
      const { legs, index } = activeMultiLeg;
      legs.slice(index + 1).forEach(leg => {
        Object.entries(leg.floorPaths || {}).forEach(([fk, pts]) => {
          const layer = floorRouteLayers[fk];
          if (!layer || !pts || !pts.length) return;
          const ps = pts.map(pt => `${pt[0].toFixed(1)},${pt[1].toFixed(1)}`).join(' ');
          layer.innerHTML += `<polyline points="${ps}" class="route-future-polyline" />`;
        });
      });
      legs.slice(index + 1, legs.length - 1).forEach((leg, k) => {
        const st = leg.dest;
        const layer = floorRouteLayers[st.floor];
        if (layer) {
          layer.innerHTML += `
            <g class="route-pin route-pin-stop" transform="translate(${st.x.toFixed(1)}, ${st.y.toFixed(1)}) rotate(90)">
              <circle cx="0" cy="0" r="9" fill="#f59e0b" stroke="#ffffff" stroke-width="2.5" />
              <text x="0" y="3.5" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">${index + k + 2}</text>
            </g>
          `;
        }
      });
    }

    // Populate route summary metrics
    if (routeDistanceText && routeTimeText) {
      if (route.multiLeg) {
        routeDistanceText.textContent = `Distance: ${route.totalDistanceMeters}m of ${route.multiLeg.totalDistanceMeters}m trip`;
      } else {
        routeDistanceText.textContent = `Distance: ${route.totalDistanceMeters}m`;
      }
      routeTimeText.textContent = `Est. Walk: ~${route.timeFormatted}`;
    }

    // Compact one-liner shown while the panel is minimized into the icon
    if (routeSummaryIconText) {
      routeSummaryIconText.textContent = `${route.totalDistanceMeters}m · ~${route.timeFormatted}`;
    }

    // Populate floor step pills
    if (routeFloorSteps) {
      routeFloorSteps.innerHTML = '';
      if (route.multiLeg) {
        const tripPill = document.createElement('span');
        tripPill.className = 'route-trip-pill';
        const stopCount = route.multiLeg.count - 1;
        tripPill.textContent = `${stopCount} stop${stopCount === 1 ? '' : 's'} · ~${route.multiLeg.totalDistanceMeters}m trip`;
        routeFloorSteps.appendChild(tripPill);
      }
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
            stairBadge.textContent = `Stairs (${dirSym})`;
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

    // Turn-by-turn step list; tapping a step centres the map on its point
    if (routeDirections) {
      routeDirections.innerHTML = '';
      (route.steps || []).forEach((st) => {
        const li = document.createElement('li');
        li.className = `route-direction ${st.type}${st.turn ? ` turn-${st.turn}` : ''}`;
        li.title = 'Tap to view this step on the map';
        const txt = document.createElement('span');
        txt.className = 'route-direction-text';
        txt.textContent = st.text;
        li.appendChild(txt);
        if (st.distanceMeters > 0) {
          const d = document.createElement('span');
          d.className = 'route-direction-dist';
          d.textContent = st.type === 'walk' && st.turn ? `then ${st.distanceMeters}m` : `${st.distanceMeters}m`;
          li.appendChild(d);
        }
        li.addEventListener('click', (e) => {
          e.stopPropagation();
          if (st.point && typeof focusOnCoordinates === 'function') {
            focusOnCoordinates(st.point[0], st.point[1], 2.4, true);
          }
        });
        routeDirections.appendChild(li);
      });

      // Multi-stop trip: list the stops that follow this leg.
      if (route.multiLeg && activeMultiLeg) {
        activeMultiLeg.legs
          .slice(route.multiLeg.index, activeMultiLeg.legs.length - 1)
          .forEach((leg, k) => {
            const li = document.createElement('li');
            li.className = 'route-direction trip-stop';
            li.textContent = `Stop ${route.multiLeg.index + k + 1}: then go to ${leg.dest.name}`;
            routeDirections.appendChild(li);
          });
      }
    }

    // Re-apply the current navigation rotation to freshly rendered route pins
    if (typeof applyMapRotation === 'function' && navRotCurrent !== 0) {
      applyMapRotation(navRotCurrent);
    }

    // Advance the step highlight with the user's current position
    if (typeof updateNavigationProgress === 'function') {
      updateNavigationProgress();
    }
  }

  function renderGroundRoute(route) {
    renderCampusRoute(route);
  }

  // Multi-stop trips navigate leg-by-leg: each leg (start → stop → … →
  // destination) is a normal router route, so pins, turn-by-turn, ETA and
  // re-routing all work unchanged per leg. When the user reaches the
  // current stop, advanceMultiLeg() switches to the next leg.
  let activeMultiLeg = null; // { legs: [...], index: 0 }

  function planMultiStopRoute(startTarget, stopVals, destVal) {
    const legs = [];
    let prev = startTarget;
    for (const t of [...stopVals, destVal]) {
      const leg = campusRouter.findRoute(prev, t);
      if (!leg || !leg.success) return { error: leg };
      legs.push(leg);
      prev = t;
    }
    return { legs };
  }

  // Stamp the current trip position onto a leg so renderCampusRoute can
  // preview the remaining legs and stops.
  function attachMultiLegMeta(leg) {
    if (!activeMultiLeg || !leg) return;
    const { legs, index } = activeMultiLeg;
    leg.multiLeg = {
      index,
      count: legs.length,
      totalDistanceMeters: legs.reduce((s, l) => s + (l.totalDistanceMeters || 0), 0)
    };
    leg.upcomingStops = legs.slice(index + 1, legs.length - 1).map(l => l.dest);
  }

  function advanceMultiLeg() {
    if (!activeMultiLeg || !activeRoute) return;
    const nextName = activeRoute.dest && activeRoute.dest.name;
    activeMultiLeg.index++;
    if (activeMultiLeg.index >= activeMultiLeg.legs.length) {
      activeMultiLeg = null;
      return;
    }
    const leg = activeMultiLeg.legs[activeMultiLeg.index];
    attachMultiLegMeta(leg);
    renderCampusRoute(leg);
    if (routeStepNow) {
      routeStepNow.textContent = nextName ? `Stop reached — continuing to ${activeRoute.dest.name}` : 'Stop reached — continuing…';
    }
  }

  // Point-in-rotated-rect test against the destination room's map shape.
  // Room ids on floors above ground carry an f1_/f2_/f3_ prefix in the nav
  // data but not on their SVG rects, so both forms are tried.
  function isInsideRoomBox(roomId, x, y) {
    if (!roomId) return false;
    let el = document.getElementById(roomId);
    if (!el) el = document.getElementById(roomId.replace(/^f\d_/, ''));
    if (!el || !el.hasAttribute || !el.hasAttribute('x')) return false;
    const rx = parseFloat(el.getAttribute('x'));
    const ry = parseFloat(el.getAttribute('y'));
    const rw = parseFloat(el.getAttribute('width'));
    const rh = parseFloat(el.getAttribute('height'));
    if (isNaN(rx) || isNaN(ry) || isNaN(rw) || isNaN(rh)) return false;
    let px = x, py = y;
    const tm = (el.getAttribute('transform') || '').match(/rotate\(\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*\)/);
    if (tm) {
      const a = parseFloat(tm[1]) * Math.PI / 180;
      const cx = parseFloat(tm[2]), cy = parseFloat(tm[3]);
      const dx = x - cx, dy = y - cy;
      // inverse of the SVG rotate transform
      px = cx + dx * Math.cos(a) + dy * Math.sin(a);
      py = cy - dx * Math.sin(a) + dy * Math.cos(a);
    }
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
  }

  // Navigation ends by itself once the user reaches the destination.
  function arriveAtDestination() {
    const name = activeRoute && activeRoute.dest ? (activeRoute.dest.title || activeRoute.dest.name) : '';
    clearActiveRoute();
    if (searchFeedback) {
      searchFeedback.textContent = `✅ You have arrived${name ? ' at ' + name : ''}`;
      searchFeedback.style.color = '#16a34a';
      searchFeedback.style.display = 'block';
      clearTimeout(arriveAtDestination._t);
      arriveAtDestination._t = setTimeout(() => {
        if (searchFeedback.textContent.startsWith('✅')) {
          searchFeedback.style.display = 'none';
        }
      }, 6000);
    }
    if (navigator.vibrate) {
      try { navigator.vibrate([80, 60, 80]); } catch (err) { /* unsupported */ }
    }
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

    const stopVals = getNavStopValues();
    let result = null;
    if (stopVals.length) {
      const plan = planMultiStopRoute(startTarget, stopVals, destVal);
      if (plan.legs) {
        activeMultiLeg = { legs: plan.legs, index: 0 };
        result = plan.legs[0];
        attachMultiLegMeta(result);
      } else {
        activeMultiLeg = null;
        result = plan.error;
      }
    } else {
      activeMultiLeg = null;
      result = campusRouter.findRoute(startTarget, destVal);
    }

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
    activeMultiLeg = null;
    updateNavRotationActive();
    hideStairPopup();
    Object.values(floorRouteLayers).forEach(layer => {
      if (layer) layer.innerHTML = '';
    });
    if (routeSummaryBar) {
      routeSummaryBar.style.display = 'none';
      routeSummaryBar.classList.remove('minimized');
    }
    if (clearRouteBtn) {
      clearRouteBtn.style.display = 'none';
    }
    if (routeFloorSteps) {
      routeFloorSteps.innerHTML = '';
    }
    if (routeDirections) {
      routeDirections.innerHTML = '';
    }
    if (routeStepNow) {
      routeStepNow.textContent = '';
      routeStepNow.classList.remove('warning');
    }
    navProgress.samples = [];
    navProgress.originPt = null;
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
      if (activeRoute) {
        // Navigation mode: shrink the planner and the route summary panel into
        // their small icons so the map stays clear (tap an icon to reopen).
        setRoutePlannerOpen(false);
        setRouteSummaryMinimized(true);
      }
      // Always bring the user's live GPS position to the centre of the view
      // (zooms in like tapping a room, and starts GPS if it isn't running yet).
      focusUserLocation();
    });
  }

  if (clearRouteBtn) {
    clearRouteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearActiveRoute();
      clearNavStopRows();
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
      const floorKey = activeLayer ? activeLayer.dataset.floor : currentFloor;
      const dims = getFloorDimensions(floorKey);

      // Rotate coordinates 90° anticlockwise for display
      const rotated = rotatePoint90CCW(cx, cy, dims.width, dims.height);
      const visualW = dims.height;
      const visualH = dims.width;

      const img = activeLayer ? activeLayer.querySelector('.central-image') : null;
      const stageW = (img && img.offsetWidth) ? img.offsetWidth : (mapPanStage.offsetWidth || 1000);
      const stageH = (img && img.offsetHeight) ? img.offsetHeight : (mapPanStage.offsetHeight || 615);

      const scaleSvg = Math.min(stageW / visualW, stageH / visualH);
      const svgLeft = (stageW - visualW * scaleSvg) / 2;
      const svgTop = (stageH - visualH * scaleSvg) / 2;

      const stageX = svgLeft + (rotated.x * scaleSvg);
      const stageY = svgTop + (rotated.y * scaleSvg);

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
      if (navPanBridge) navPanBridge.markUserPan();

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
        if (navPanBridge) navPanBridge.markUserPan();
        panX += dx;
        panY += dy;
        clampPan();
        applyTransform(false);
      } else if (activePointers.size === 2) {
        suppressClick = true;
        if (navPanBridge) navPanBridge.markUserPan();
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
        if (navPanBridge) navPanBridge.markUserPan();
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
        if (navPanBridge) navPanBridge.markUserPan();
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
        if (navPanBridge) navPanBridge.markUserPan();
        resetView(true);
      });
    }

    // 4. Resize listener to re-clamp pan if container size changes
    window.addEventListener('resize', () => {
      clampPan();
      applyTransform(false);
    });

    // 5. Bridge used by the navigation rotation engine: tracks the last time
    //    the user moved/zoomed the map by hand and exposes a smooth pan step
    //    so navigation can auto-center on the user without touching these
    //    closure-local variables directly.
    let lastUserPanTime = 0;
    navPanBridge = {
      markUserPan() {
        lastUserPanTime = performance.now();
      },
      lastUserPanAt() {
        return lastUserPanTime;
      },
      panTowards(targetX, targetY, factor = 0.08) {
        panX += (targetX - panX) * factor;
        panY += (targetY - panY) * factor;
        clampPan();
        applyTransform(false);
      },
      getPan() {
        return { x: panX, y: panY, scale };
      }
    };
  }

  // ==========================================
  // --- Navigation Map Rotation Engine (Google Maps style) ---
  // ==========================================
  // While a route is active AND live GPS tracking is on, the map content
  // (rooms, labels, corridors, routes, marker) rotates so the user's
  // direction of travel always points towards the top of the screen.
  // The rotation is applied to the SVG orientation layers only — the website
  // UI (header, search, floor buttons, zoom controls) stays upright.
  //
  // Heading sources, in order of trust:
  //   1. GPS course-over-ground (coords.heading) — only trusted while moving.
  //   2. Bearing between successive GPS fixes — only when the move is larger
  //      than the reported accuracy (filters noisy indoor positions).
  //   3. Device compass heading — only while moving (gated by GPS fixes).
  // When the user is stationary the last heading (and thus map orientation)
  // is retained; a circular exponential filter absorbs GPS noise.

  const ORIENT_LAYERS = document.querySelectorAll('.map-orientation-layer');
  let navRotCurrent = 0;        // extra rotation currently applied (deg, CCW map convention)
  let navRotTarget = 0;         // rotation we are easing towards (deg)
  let navRotActive = false;     // true while route + GPS are active
  let navRotRafId = null;

  const headingTracker = {
    smoothed: null,        // smoothed compass heading (deg 0..360)
    bearingAnchor: null,   // { lat, lon, t } start of the current movement segment
    trustProvided: true,   // false once a valid movement bearing contradicts the provided heading
    lastUpdateT: 0
  };

  function angleDeltaDeg(from, to) {
    let d = (to - from) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  }

  function bearingBetweenDeg(lat1, lon1, lat2, lon2) {
    const toRad = Math.PI / 180;
    const y = Math.sin((lon2 - lon1) * toRad) * Math.cos(lat2 * toRad);
    const x = Math.cos(lat1 * toRad) * Math.sin(lat2 * toRad) -
      Math.sin(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.cos((lon2 - lon1) * toRad);
    return (Math.atan2(y, x) / toRad + 360) % 360;
  }

  function updateHeadingFromFix(latitude, longitude, accuracy, gpsHeading, speed, timestamp) {
    const now = timestamp || Date.now();
    // The bearing anchor only advances when its segment has actually been
    // consumed, so movement KEEPS ACCUMULATING across fixes until a reliable
    // bearing is possible. (Re-anchoring on every accepted fix would starve
    // the bearing path whenever a compass-style heading is always available,
    // letting an indoor-mirrored compass control the rotation forever.)
    const anchor = headingTracker.bearingAnchor;
    if (!anchor) {
      headingTracker.bearingAnchor = { lat: latitude, lon: longitude, t: now };
      return;
    }
    const movedM = haversineDistance(anchor.lat, anchor.lon, latitude, longitude);

    // Below ~3.5 m of accumulated movement treat the user as stationary and
    // keep the previous orientation (avoids rotation from GPS jitter).
    if (movedM < 3.5) return;

    let measured = null;
    const acc = Number.isFinite(accuracy) ? accuracy : 20;

    // Direction of travel derived from the movement itself. This is the
    // ground truth for "which way am I walking" and stays correct indoors,
    // where magnetometer-based headings (coords.heading on iOS Safari, the
    // device compass) are frequently mirrored or stale.
    const bearingValid = acc <= 25 && movedM >= Math.max(4, acc * 0.8);
    const segBearing = bearingValid
      ? bearingBetweenDeg(anchor.lat, anchor.lon, latitude, longitude)
      : null;
    const gpsHeadingOk = Number.isFinite(gpsHeading) && gpsHeading !== null;

    if (segBearing !== null && gpsHeadingOk) {
      // Only keep trusting the provided heading while it agrees with the
      // movement evidence; a contradiction (mirrored indoor compass) demotes
      // it until it agrees again.
      if (Math.abs(angleDeltaDeg(gpsHeading, segBearing)) <= 90) {
        measured = gpsHeading;
        headingTracker.trustProvided = true;
      } else {
        measured = segBearing;
        headingTracker.trustProvided = false;
      }
    } else if (segBearing !== null) {
      measured = segBearing;
    } else if (gpsHeadingOk && headingTracker.trustProvided !== false &&
               (!Number.isFinite(speed) || speed >= 0.6)) {
      // Segment too short to bear from positions, but the fix reports real
      // course-over-ground speed (or speed is unknown).
      measured = gpsHeading;
    } else if (headingTracker.trustProvided !== false &&
               Number.isFinite(currentHeading) && currentHeading !== null) {
      // Device compass fallback, still gated on real movement.
      measured = currentHeading;
    }

    if (measured === null || !Number.isFinite(measured)) return;

    // A valid movement bearing that contradicts the current heading is
    // decisive (indoor compass was wrong): accept it outright instead of
    // slowly dragging the orientation through the wrong side.
    const decisive = segBearing !== null && headingTracker.smoothed !== null &&
      Math.abs(angleDeltaDeg(headingTracker.smoothed, segBearing)) > 90;

    if (headingTracker.smoothed === null || decisive) {
      headingTracker.smoothed = measured;
    } else {
      const d = angleDeltaDeg(headingTracker.smoothed, measured);
      headingTracker.smoothed = (headingTracker.smoothed + d * 0.45 + 360) % 360;
    }
    if (bearingValid) {
      // Segment consumed: start a fresh one from here. If it was not valid,
      // keep the anchor so the next fixes extend the same segment.
      headingTracker.bearingAnchor = { lat: latitude, lon: longitude, t: now };
    }
    headingTracker.lastUpdateT = now;
    headingTracker.lastDebug = {
      movedM: +movedM.toFixed(2),
      segBearing: segBearing === null ? null : +segBearing.toFixed(1),
      gpsHeading: gpsHeadingOk ? gpsHeading : null,
      measured: +measured.toFixed(1),
      decisive
    };

    // Convert compass heading -> extra map rotation so that the direction of
    // travel points to the top of the screen. (Map +x axis already points up
    // on screen due to the base 90° CCW orientation, i.e. heading 90° = no
    // extra rotation.)
    // Rotation is a navigation-only feature: never steer the map orientation
    // from a bare GPS jump while no route is active. The floor-plan SVGs clip
    // to their fixed viewBox, so an arbitrary pivot rotation would permanently
    // crop the map out of the viewport (zoom/pan cannot recover clipped
    // content) — the fake-GPS "map cropped after location change" bug.
    if (navRotActive) {
      let target = 90 - headingTracker.smoothed;
      target = ((target % 360) + 540) % 360 - 180;
      navRotTarget = target;
      kickNavRotationLoop();
    }
  }

  function applyMapRotation(deg) {
    // Pivot about the user's current location marker. The pivot rotation is
    // the rightmost operation in the chain, so it acts in RAW MAP coords:
    // pivoting at the marker's map position keeps the marker's display-space
    // position fixed on screen while the world turns around the user — never
    // around the view centre, route end or destination.
    ORIENT_LAYERS.forEach(g => {
      g.setAttribute('transform', `translate(0, 2112) rotate(-90) rotate(${deg.toFixed(2)} ${currentPos.x.toFixed(1)} ${currentPos.y.toFixed(1)})`);
    });
    // Keep route/stair pin captions screen-horizontal: they were drawn with
    // rotate(90) to cancel the base -90° orientation, so cancel the extra
    // rotation as well.
    document.querySelectorAll('.route-pin, .route-stair-pin').forEach(pin => {
      const tf = pin.getAttribute('transform') || '';
      if (/rotate\(/.test(tf)) {
        pin.setAttribute('transform', tf.replace(/rotate\([^)]*\)\s*$/, `rotate(${(90 - deg).toFixed(2)})`));
      }
    });
  }

  function markerDisplayPt() {
    // Display-space coords (viewBox 1300 x 2112) of the GPS marker.
    return { x: currentPos.y, y: 2112 - currentPos.x };
  }

  function autoCenterOnUser(factor = 0.06) {
    if (!navPanBridge || !mapContainer || !mapPanStage) return;
    const img = document.querySelector('.floor-layer.active .central-image');
    const stageW = (img && img.offsetWidth) ? img.offsetWidth : (mapPanStage.offsetWidth || 1000);
    const stageH = (img && img.offsetHeight) ? img.offsetHeight : (mapPanStage.offsetHeight || 615);
    const scaleSvg = Math.min(stageW / 1300, stageH / 2112);
    const svgLeft = (stageW - 1300 * scaleSvg) / 2;
    const svgTop = (stageH - 2112 * scaleSvg) / 2;
    const disp = markerDisplayPt();
    const stageX = svgLeft + disp.x * scaleSvg;
    const stageY = svgTop + disp.y * scaleSvg;
    const cRect = mapContainer.getBoundingClientRect();
    const pan = navPanBridge.getPan();
    navPanBridge.panTowards(cRect.width / 2 - stageX * pan.scale, cRect.height / 2 - stageY * pan.scale, factor);
  }

  function navRotationLoop() {
    navRotRafId = null;
    const d = angleDeltaDeg(navRotCurrent, navRotTarget);
    if (Math.abs(d) > 0.05) {
      navRotCurrent += d * 0.08; // smooth ease, no sudden jumps
      applyMapRotation(navRotCurrent);
    } else if (navRotCurrent !== navRotTarget) {
      navRotCurrent = navRotTarget;
      applyMapRotation(navRotCurrent);
    }

    if (navRotActive && isGpsActive && activeRoute) {
      // Gentle auto-center on the user while navigating, unless the user
      // panned/zoomed manually within the last few seconds.
      const lastPan = navPanBridge ? navPanBridge.lastUserPanAt() : 0;
      if (performance.now() - lastPan > 3500) {
        autoCenterOnUser();
      }
      navRotRafId = requestAnimationFrame(navRotationLoop);
    } else if (navRotCurrent !== navRotTarget) {
      // Deactivated: keep easing back to the default orientation.
      navRotRafId = requestAnimationFrame(navRotationLoop);
    }
  }

  function kickNavRotationLoop() {
    if (navRotRafId === null) {
      navRotRafId = requestAnimationFrame(navRotationLoop);
    }
  }

  function updateNavRotationActive() {
    const shouldBeActive = !!(activeRoute && isGpsActive);
    if (shouldBeActive !== navRotActive) {
      navRotActive = shouldBeActive;
      if (!navRotActive) {
        navRotTarget = 0; // ease back to the default map orientation
      } else if (headingTracker.smoothed !== null) {
        // Rotation just became active: orient immediately to the heading
        // already tracked from recent movement instead of waiting for the
        // next fix to arrive.
        let target = 90 - headingTracker.smoothed;
        navRotTarget = ((target % 360) + 540) % 360 - 180;
      }
    }
    kickNavRotationLoop();
  }

  // Minimal hook for automated tests / debugging (not used by the UI):
  // lets a driver feed synthetic GPS fixes and inspect the rotation state.
  window.__amritanavTest = {
    injectFix(latitude, longitude, opts = {}) {
      handleGpsSuccess({
        coords: {
          latitude,
          longitude,
          accuracy: Number.isFinite(opts.accuracy) ? opts.accuracy : 6,
          heading: opts.heading !== undefined ? opts.heading : null,
          speed: Number.isFinite(opts.speed) ? opts.speed : null
        },
        timestamp: opts.timestamp || Date.now()
      });
    },
    rotationState() {
      return {
        active: navRotActive,
        current: +navRotCurrent.toFixed(2),
        target: +navRotTarget.toFixed(2),
        heading: headingTracker.smoothed === null ? null : +headingTracker.smoothed.toFixed(1),
        lastDebug: headingTracker.lastDebug || null
      };
    }
  };

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
  // Room names in the generated dataset sometimes contain raw HTML entities
  // (e.g. "Men&#039;s Toilet") — decode them so search, display and matching
  // all see plain text.
  function decodeHtmlEntities(str) {
    if (!str || !str.includes('&')) return str || '';
    const t = document.createElement('textarea');
    t.innerHTML = str;
    return t.value;
  }

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

          const rName = decodeHtmlEntities(r.name || r.id);
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
      const name = decodeHtmlEntities(roomEl.dataset.name || roomEl.getAttribute('aria-label') || id);
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
      // A new search cancels any navigation that was waiting on the floor answer
      pendingNavDestAfterFloorPrompt = null;
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

  // Run navigation to a room: plot the route from the user's current floor,
  // shrink the planner/summary into their icons and centre the GPS position.
  function startNavigationToRoom(destRoomId) {
    if (!destRoomId) return;
    if (navDestSelect) {
      navDestSelect.value = destRoomId;
    }
    if (typeof syncNavDestInputFromSelect === 'function') {
      syncNavDestInputFromSelect();
    }
    if (groundNavBar) {
      groundNavBar.style.display = 'flex';
    }
    generateCampusRoute();
    if (activeRoute) {
      setRoutePlannerOpen(false);
      setRouteSummaryMinimized(true);
    }
    focusUserLocation();
  }

  if (roomPopupNavBtn) {
    roomPopupNavBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!currentPopupRoom) return;
      const targetRoom = currentPopupRoom;
      hideRoomDetailsPopup();

      // Starting from live GPS: the map is previewing the destination's
      // floor, so first confirm which floor the user is actually on — the
      // answer decides the view, the route start and where GPS is centred.
      const startingFromGps = !navStartSelect || navStartSelect.value === 'gps';
      if (startingFromGps && floorPromptModal) {
        pendingNavDestAfterFloorPrompt = targetRoom.id;
        floorPromptModal.style.display = 'flex';
        return;
      }

      startNavigationToRoom(targetRoom.id);
    });
  }

  // ── Nearest-facility quick navigation ("Nearest Washroom/Stairs/Exit") ──
  // Picks the candidate with the shortest actual walking route from the
  // user's live position (not straight-line distance), across all floors,
  // then starts normal turn-by-turn navigation to it.
  function navigateToNearestRoom(matcher, notFoundMsg) {
    if (!campusRouter || !searchableRooms) return;
    const start = {
      x: currentPos.x,
      y: currentPos.y,
      floor: currentFloor || 'ground',
      name: 'Current Location'
    };
    let best = null;
    searchableRooms.forEach(r => {
      if (!matcher(r)) return;
      const res = campusRouter.findRoute(start, r.id);
      if (res && res.success && (!best || res.totalDistanceMeters < best.distance)) {
        best = { roomId: r.id, distance: res.totalDistanceMeters };
      }
    });
    if (!best) {
      if (searchFeedback) {
        searchFeedback.textContent = notFoundMsg;
        searchFeedback.style.display = 'block';
      }
      return;
    }
    startNavigationToRoom(best.roomId);
  }

  const nearestToiletBtn = document.getElementById('nearest-toilet-btn');
  const nearestStairsBtn = document.getElementById('nearest-stairs-btn');
  const nearestExitBtn = document.getElementById('nearest-exit-btn');

  if (nearestToiletBtn) {
    nearestToiletBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideNearbyMenu();
      if (!washroomChoicePop) return;
      washroomChoicePop.style.display = washroomChoicePop.style.display === 'none' ? 'flex' : 'none';
    });
  }

  const washroomChoicePop = document.getElementById('washroom-choice-pop');
  const washroomMensBtn = document.getElementById('washroom-mens-btn');
  const washroomLadiesBtn = document.getElementById('washroom-ladies-btn');
  const washroomCancelBtn = document.getElementById('washroom-cancel-btn');

  function hideWashroomChoice() {
    if (washroomChoicePop) washroomChoicePop.style.display = 'none';
  }

  const isWashroomRoom = r => r.category === 'toilet' || r.isToilet;

  if (washroomMensBtn) {
    washroomMensBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideWashroomChoice();
      navigateToNearestRoom(r => isWashroomRoom(r) && /\bmen'?s\b|\bmens\b/i.test(r.name || ''), 'No men\u2019s washroom found on campus.');
    });
  }

  if (washroomLadiesBtn) {
    washroomLadiesBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideWashroomChoice();
      navigateToNearestRoom(r => isWashroomRoom(r) && /ladies/i.test(r.name || ''), 'No ladies\u2019 washroom found on campus.');
    });
  }

  if (washroomCancelBtn) {
    washroomCancelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideWashroomChoice();
    });
  }

  if (nearestStairsBtn) {
    nearestStairsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideNearbyMenu();
      navigateToNearestStairs();
    });
  }

  // Staircases aren't rooms in the dataset — they live as graph nodes — so
  // "Nearest Stairs" routes to the closest stair node by walking distance and
  // renders the route directly instead of going through the destination select.
  function navigateToNearestStairs() {
    if (!campusRouter) return;
    const navData = window.CAMPUS_NAV_DATA;
    if (!navData || !navData.nodes) return;
    const start = {
      x: currentPos.x,
      y: currentPos.y,
      floor: currentFloor || 'ground',
      name: 'Current Location'
    };
    let best = null;
    navData.nodes.forEach(n => {
      if (n.type !== 'stair') return;
      const res = campusRouter.findRoute(start, n.id);
      if (res && res.success && (!best || res.totalDistanceMeters < best.distance)) {
        best = { res, distance: res.totalDistanceMeters, node: n };
      }
    });
    if (!best) {
      if (searchFeedback) {
        searchFeedback.textContent = 'No staircases found on campus.';
        searchFeedback.style.display = 'block';
      }
      return;
    }
    if (navDestSelect) navDestSelect.value = '';
    if (typeof syncNavDestInputFromSelect === 'function') syncNavDestInputFromSelect();
    if (navDestInput) navDestInput.value = best.node.stairName || 'Nearest Stairs';
    if (groundNavBar) groundNavBar.style.display = 'flex';
    if (selectedRoom) {
      selectedRoom.classList.remove('selected');
      selectedRoom.setAttribute('aria-pressed', 'false');
      selectedRoom = null;
    }
    renderCampusRoute(best.res);
    setRoutePlannerOpen(false);
    setRouteSummaryMinimized(true);
    focusUserLocation();
  }

  // "Nearest Exit" always navigates to the closest campus exit point
  // (CAMPUS_EXIT_POINTS) — never to the "Entrance" room itself.
  function navigateToNearestExit() {
    if (!campusRouter) return;
    const start = {
      x: currentPos.x,
      y: currentPos.y,
      floor: currentFloor || 'ground',
      name: 'Current Location'
    };
    let best = null;
    CAMPUS_EXIT_POINTS.forEach(p => {
      const res = campusRouter.findRoute(start, {
        // Distinct id: without it this resolves to 'gps_location' like the
        // start target and findRoute would treat it as "already there".
        id: 'campus_exit_point',
        x: p.x,
        y: p.y,
        floor: p.floor,
        name: 'Campus Exit'
      });
      if (res && res.success && (!best || res.totalDistanceMeters < best.res.totalDistanceMeters)) {
        best = { res };
      }
    });
    if (!best) {
      if (searchFeedback) {
        searchFeedback.textContent = 'No exit found on campus.';
        searchFeedback.style.display = 'block';
      }
      return;
    }
    const res = best.res;
    // The exit sits on the ground-floor walkway: when the whole route is on
    // ground (e.g. the user is outside campus), jump there so the pin is in
    // view; multi-floor routes stay on the current floor until descent.
    if (!res.isMultiFloor && res.floorsInRoute[0] === 'ground' && currentFloor !== 'ground') {
      switchFloor('ground');
    }
    if (navDestSelect) navDestSelect.value = '';
    if (typeof syncNavDestInputFromSelect === 'function') syncNavDestInputFromSelect();
    if (navDestInput) navDestInput.value = 'Campus Exit';
    if (groundNavBar) groundNavBar.style.display = 'flex';
    if (selectedRoom) {
      selectedRoom.classList.remove('selected');
      selectedRoom.setAttribute('aria-pressed', 'false');
      selectedRoom = null;
    }
    renderCampusRoute(res);
    setRoutePlannerOpen(false);
    setRouteSummaryMinimized(true);
    focusUserLocation();
  }

  if (nearestExitBtn) {
    nearestExitBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideNearbyMenu();
      navigateToNearestExit();
    });
  }

  // ── "Nearby" chip dropdown: anchors under the chip, closes on selection ──
  const nearbyToggleBtn = document.getElementById('nearby-toggle-btn');
  const nearbyMenu = document.getElementById('nearby-menu');

  function hideNearbyMenu() {
    if (nearbyMenu) nearbyMenu.style.display = 'none';
    if (nearbyToggleBtn) {
      nearbyToggleBtn.classList.remove('open');
      nearbyToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function positionNearbyMenu() {
    if (!nearbyToggleBtn || !nearbyMenu) return;
    const r = nearbyToggleBtn.getBoundingClientRect();
    nearbyMenu.style.top = `${Math.round(r.bottom + 8)}px`;
    const menuW = nearbyMenu.offsetWidth || 200;
    let left = r.left + r.width / 2 - menuW / 2;
    left = Math.max(8, Math.min(window.innerWidth - menuW - 8, left));
    nearbyMenu.style.left = `${Math.round(left)}px`;
  }

  if (nearbyToggleBtn) {
    nearbyToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!nearbyMenu) return;
      const show = nearbyMenu.style.display !== 'flex';
      if (show) {
        nearbyMenu.style.display = 'flex';
        positionNearbyMenu();
        nearbyToggleBtn.classList.add('open');
        nearbyToggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        hideNearbyMenu();
      }
    });
  }

  if (nearbyMenu) {
    nearbyMenu.addEventListener('click', (e) => e.stopPropagation());
    // Close when tapping anywhere else (map, panels, other chrome)
    document.addEventListener('click', (e) => {
      if (nearbyMenu.style.display !== 'none' && !nearbyMenu.contains(e.target)) {
        hideNearbyMenu();
      }
    });
    // Keep the menu anchored under the chip when the viewport changes
    window.addEventListener('resize', () => {
      if (nearbyMenu.style.display === 'flex') positionNearbyMenu();
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
  // --- Category Chips & Quick Filters (Classrooms, Washrooms, Labs, Offices, Halls, Stairs) ---
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
    return /office|dept|staff|dean|director|principal|admin|reception|chair|hod|reserve|affair|\bsa\b/i.test(name) ||
           /office|admin|dept|dir/i.test(code) ||
           /office|admin|director|principal|dept/i.test(id);
  }

  function isHallRoom(el) {
    const name = el.dataset.name || el.getAttribute('aria-label') || '';
    const id = el.id || '';
    return /hall|seminar|conf/i.test(name) || /hall|seminar|conf/i.test(id);
  }

  function isStairRoom(el) {
    const name = el.dataset.name || el.getAttribute('aria-label') || '';
    const code = el.dataset.code || '';
    const id = el.id || '';
    return /stair/i.test(name) || /stair/i.test(code) || /stair/i.test(id);
  }

  // Classrooms are the plain numbered rooms (N-220, S-212, A-104A, Room 12…).
  // The DOM data-code is shared per graph node (N-220 carries code LAB-MDL),
  // so detection relies on the name pattern after excluding every other
  // category first.
  function isClassroomRoom(el) {
    if (isToiletRoom(el) || isLabRoom(el) || isOfficeRoom(el) ||
        isHallRoom(el) || isStairRoom(el)) {
      return false;
    }
    const name = el.dataset.name || el.getAttribute('aria-label') || '';
    return /^\s*[NSA]\s*-\s*\d/i.test(name) || /^room\s*\d+/i.test(name);
  }

  function clearCategoryHighlights() {
    document.querySelectorAll('.selectable-room').forEach(el => {
      el.classList.remove('search-highlighted', 'toilet-highlighted', 'lab-highlighted',
        'office-highlighted', 'classroom-highlighted', 'hall-highlighted', 'stairs-highlighted');
    });
  }

  function applyCategoryHighlight(category) {
    clearCategoryHighlights();
    if (!category) return;

    const activeLayer = document.querySelector('.floor-layer.active');
    if (!activeLayer) return;

    const roomsOnFloor = activeLayer.querySelectorAll('.selectable-room');
    let matchedCount = 0;
    const highlightClasses = {
      toilet: 'toilet-highlighted',
      lab: 'lab-highlighted',
      office: 'office-highlighted',
      classroom: 'classroom-highlighted',
      hall: 'hall-highlighted',
      stairs: 'stairs-highlighted'
    };
    const matchers = {
      toilet: isToiletRoom,
      lab: isLabRoom,
      office: isOfficeRoom,
      classroom: isClassroomRoom,
      hall: isHallRoom,
      stairs: isStairRoom
    };
    const highlightClass = highlightClasses[category];

    roomsOnFloor.forEach(roomEl => {
      const matches = matchers[category] ? matchers[category](roomEl) : false;

      if (matches) {
        roomEl.classList.add('search-highlighted', highlightClass);
        matchedCount++;
      }
    });

    const categoryNames = {
      toilet: 'Washrooms',
      lab: 'Labs',
      office: 'Offices',
      classroom: 'Classrooms',
      hall: 'Halls',
      stairs: 'Staircases'
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
        const feedbackColors = {
          toilet: '#0d9488',
          lab: '#e11d48',
          office: '#2563eb',
          classroom: '#9333ea',
          hall: '#d97706',
          stairs: '#16a34a'
        };
        searchFeedback.textContent = `Showing all ${matchedCount} ${categoryNames[category] || category} on ${floorName}`;
        searchFeedback.style.color = feedbackColors[category] || '#2563eb';
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

  function setupNavSearchCombobox({ input, clearBtn, dropdown, selectEl, wrapper, isStart, isStop }) {
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
      // Stop-row selects have no <option> per room, so a bare .value write
      // would reset to '' — keep the id on the element itself as well.
      selectEl.dataset.value = item.id || '';
      if (clearBtn) clearBtn.style.display = 'flex';
      dropdown.style.display = 'none';
      input.setAttribute('aria-expanded', 'false');

      if (!isStart && !isStop) {
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
        selectEl.dataset.value = '';
        clearBtn.style.display = 'none';
        dropdown.style.display = 'none';
        input.setAttribute('aria-expanded', 'false');
        input.focus();
        if (!isStart && !isStop) {
          clearActiveRoute();
        } else if (isStop) {
          // A cleared "via" just drops out of the trip; re-plan if one exists.
          if (navStartSelect && navStartSelect.value && navDestSelect && navDestSelect.value) {
            generateCampusRoute();
          }
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (wrapper && !wrapper.contains(e.target)) {
        dropdown.style.display = 'none';
        input.setAttribute('aria-expanded', 'false');
        const storedId = selectEl.dataset.value || selectEl.value;
        if (storedId) {
          input.value = getRoomDisplayLabel(storedId);
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

  // ── Multi-stop "Via" rows ────────────────────────────────────
  // Each row reuses the destination combobox (isStop mode: no room-selection
  // side effects). Rows are read at route time via getNavStopValues().
  const navStopsContainer = document.getElementById('nav-stops-container');
  const navAddStopBtn = document.getElementById('nav-add-stop-btn');
  const navStopRows = [];
  const MAX_NAV_STOPS = 3;

  function getNavStopValues() {
    return navStopRows
      .map(row => row.select.dataset.value || row.select.value || '')
      .filter(v => v);
  }

  function updateNavStopUi() {
    navStopRows.forEach((row, i) => {
      row.label.textContent = `Via ${i + 1}`;
    });
    if (navAddStopBtn) {
      navAddStopBtn.style.display = navStopRows.length >= MAX_NAV_STOPS ? 'none' : 'flex';
    }
  }

  function removeNavStopRow(row, regenerateRoute = true) {
    const idx = navStopRows.indexOf(row);
    if (idx !== -1) navStopRows.splice(idx, 1);
    if (row.wrapper.parentNode) row.wrapper.parentNode.removeChild(row.wrapper);
    updateNavStopUi();
    if (regenerateRoute &&
        navStartSelect && navStartSelect.value && navDestSelect && navDestSelect.value) {
      generateCampusRoute();
    }
  }

  function clearNavStopRows() {
    while (navStopRows.length) removeNavStopRow(navStopRows[0], false);
  }

  function addNavStopRow() {
    if (!navStopsContainer || navStopRows.length >= MAX_NAV_STOPS) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-select-wrapper nav-stop-row';
    wrapper.innerHTML = `
      <label class="nav-label">Via</label>
      <div class="nav-input-container">
        <input type="text" class="nav-search-input" placeholder="Search stop..." autocomplete="off" spellcheck="false" aria-label="Stop along the route" role="combobox" aria-expanded="false" aria-autocomplete="list" />
        <button type="button" class="nav-input-clear" title="Clear stop" aria-label="Clear stop" style="display: none;">✕</button>
        <div class="nav-suggestions-dropdown" style="display: none;" role="listbox"></div>
      </div>
      <select class="nav-select" style="display: none;" aria-hidden="true" tabindex="-1"><option value="">Select stop...</option></select>
      <button type="button" class="nav-stop-remove" title="Remove stop" aria-label="Remove stop">✕</button>
    `;
    navStopsContainer.appendChild(wrapper);

    const row = {
      wrapper,
      label: wrapper.querySelector('.nav-label'),
      input: wrapper.querySelector('input'),
      select: wrapper.querySelector('select')
    };
    navStopRows.push(row);
    updateNavStopUi();

    wrapper.querySelector('.nav-stop-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      removeNavStopRow(row);
    });

    setupNavSearchCombobox({
      input: row.input,
      clearBtn: wrapper.querySelector('.nav-input-clear'),
      dropdown: wrapper.querySelector('.nav-suggestions-dropdown'),
      selectEl: row.select,
      wrapper,
      isStart: false,
      isStop: true
    });
  }

  if (navAddStopBtn) {
    navAddStopBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addNavStopRow();
      if (navStopRows.length) navStopRows[navStopRows.length - 1].input.focus();
    });
  }

  // ==========================================
  // --- Room Label Layout Engine (wrap / fit / center) ---
  // ==========================================
  // The labels already inherit the map's 90° anticlockwise orientation layer,
  // so no extra rotation is applied here. This engine only re-flows each
  // label's text so that long room names wrap onto multiple lines and stay
  // inside their room boundaries, centred both ways, with a slightly smaller
  // font for small rooms when needed.

  function layoutRoomLabels() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontStr = px => `600 ${px}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    const NAME_SIZES = [13, 12, 11, 10, 9];
    const CODE_FONT = 10;

    const escapeXml = s => s
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

    const measure = (text, px) => {
      ctx.font = fontStr(px);
      return ctx.measureText(text).width;
    };

    document.querySelectorAll('.floor-layer').forEach(layer => {
      const labels = layer.querySelectorAll('.central-image .layer-labels > g[transform]');
      if (!labels.length) return;

      // Room geometry from the background map rects (rotated like the SVG)
      const roomEls = [...layer.querySelectorAll('.central-image rect[data-name]')].map(rect => {
        const x = parseFloat(rect.getAttribute('x')) || 0;
        const y = parseFloat(rect.getAttribute('y')) || 0;
        const w = parseFloat(rect.getAttribute('width')) || 0;
        const h = parseFloat(rect.getAttribute('height')) || 0;
        let cx = x + w / 2, cy = y + h / 2;
        const rm = (rect.getAttribute('transform') || '').match(/rotate\(\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*\)/);
        if (rm) {
          const a = parseFloat(rm[1]) * Math.PI / 180;
          const dx = cx - parseFloat(rm[2]), dy = cy - parseFloat(rm[3]);
          cx = parseFloat(rm[2]) + dx * Math.cos(a) - dy * Math.sin(a);
          cy = parseFloat(rm[3]) + dx * Math.sin(a) + dy * Math.cos(a);
        }
        return { rect, w, h, cx, cy, ang: rm ? parseFloat(rm[1]) : 0 };
      });

      // Pass 1: match every label to its room by proximity of the label
      // anchor to the (rotated) room centre.
      const pairs = [];
      labels.forEach(g => {
        const nameText = g.querySelector('text.room-label');
        if (!nameText) return;
        const name = nameText.textContent.trim();
        if (!name) return;
        const codeText = g.querySelector('text.room-code');
        const code = codeText ? codeText.textContent.trim() : '';
        const tm = (g.getAttribute('transform') || '').match(/translate\(\s*([-\d.]+)[,\s]+([-\d.]+)\s*\)/);
        if (!tm) return;
        const tx = parseFloat(tm[1]), ty = parseFloat(tm[2]);
        let room = null, bestD = Infinity;
        for (const r of roomEls) {
          const d = Math.hypot(r.cx - tx, r.cy - ty);
          if (d < bestD) { bestD = d; room = r; }
        }
        if (!room || bestD > 5) return;
        pairs.push({ g, nameText, codeText, code, name, room });
      });

      // Rooms nested inside a bigger labelled room (e.g. stairs inside a
      // corridor wing) make both labels collide at the same spot. Move the
      // container room's label to the centre of the longest span of the
      // container that the nested room does not cover.
      const labelShift = new Map(); // container room -> { x, y, axisLen, alongY }
      pairs.forEach(({ room: A }) => {
        if (!A || labelShift.has(A)) return;
        let child = null;
        pairs.forEach(({ room: B }) => {
          if (!B || B === A || B.w * B.h >= A.w * A.h) return;
          const rad = -A.ang * Math.PI / 180;
          const dx = B.cx - A.cx, dy = B.cy - A.cy;
          const ux = dx * Math.cos(rad) - dy * Math.sin(rad);
          const uy = dx * Math.sin(rad) + dy * Math.cos(rad);
          if (Math.abs(ux) < A.w / 2 && Math.abs(uy) < A.h / 2) {
            const d = Math.hypot(ux, uy);
            if (!child || d < child.d) child = { ux, uy, B, d };
          }
        });
        if (!child) return;
        const alongY = A.h >= A.w;
        const L = alongY ? A.h : A.w;
        const v = alongY ? child.uy : child.ux;
        const half = Math.max(child.B.w, child.B.h) / 2 + 8;
        const segs = [[-L / 2, v - half], [v + half, L / 2]].filter(s => s[1] - s[0] >= 44);
        if (!segs.length) return;
        segs.sort((s1, s2) => (s2[1] - s2[0]) - (s1[1] - s1[0]));
        const t = (segs[0][0] + segs[0][1]) / 2;
        const rad2 = A.ang * Math.PI / 180;
        const lx = alongY ? 0 : t, ly = alongY ? t : 0;
        labelShift.set(A, {
          x: A.cx + lx * Math.cos(rad2) - ly * Math.sin(rad2),
          y: A.cy + lx * Math.sin(rad2) + ly * Math.cos(rad2),
          axisLen: segs[0][1] - segs[0][0],
          alongY
        });
      });

      // Pass 2: lay out each label inside its room.
      pairs.forEach(({ g, nameText, codeText, code, name, room }) => {
        // Labels read horizontally on screen: rotate(90) inside the group
        // cancels the base -90° map orientation, so text runs along the
        // room's map-y extent and lines stack along its map-x extent.
        let availW = Math.max(room.h - 8, room.h * 0.86, 18);
        let availH = Math.max(room.w - 10, 20);

        let anchorX = parseFloat(g.getAttribute('transform').match(/translate\(\s*([-\d.]+)[,\s]+([-\d.]+)\s*\)/)[1]);
        let anchorY = parseFloat(g.getAttribute('transform').match(/translate\(\s*([-\d.]+)[,\s]+([-\d.]+)\s*\)/)[2]);

        const shift = labelShift.get(room);
        if (shift) {
          anchorX = shift.x;
          anchorY = shift.y;
          if (shift.alongY) availW = Math.max(shift.axisLen - 8, 20);
          else availH = Math.max(shift.axisLen - 8, 20);
        }
        g.setAttribute('transform', `translate(${anchorX.toFixed(1)}, ${anchorY.toFixed(1)}) rotate(90)`);

        // Greedy wrap; optionally hard-split words that can never fit
        // (kept as a last resort so text stays inside the room).
        const splitHyphen = t => {
          const parts = [];
          let cur = '';
          for (const ch of t) {
            cur += ch;
            if (ch === '-') { parts.push(cur); cur = ''; }
          }
          if (cur) parts.push(cur);
          return parts;
        };
        const words = name.split(/\s+/).filter(Boolean).flatMap(splitHyphen);

        const wrap = (px, hard) => {
          const lines = [];
          let cur = '';
          let tooWide = false;
          const pushWord = wd => {
            if (!wd) return;
            if (measure(wd, px) <= availW || !hard) {
              if (cur) lines.push(cur);
              cur = wd;
              if (measure(wd, px) > availW) tooWide = true;
              return;
            }
            // hard-split an over-long word into chunks that fit
            if (cur) { lines.push(cur); cur = ''; }
            let chunk = '';
            for (const ch of wd) {
              if (chunk && measure(chunk + ch, px) > availW) {
                lines.push(chunk);
                chunk = ch;
              } else {
                chunk += ch;
              }
            }
            cur = chunk;
          };
          for (const wd of words) {
            const cand = cur ? cur + ' ' + wd : wd;
            if (measure(cand, px) <= availW) {
              cur = cand;
            } else {
              pushWord(wd);
            }
          }
          if (cur) lines.push(cur);
          return { lines, tooWide };
        };

        // Pick the largest font size whose wrapped block fits the room;
        // if none fits, fall back to the smallest size (best effort).
        let chosen = null;
        for (const px of NAME_SIZES) {
          const lh = px + 3;
          const { lines, tooWide } = wrap(px, false);
          const codeH = code ? CODE_FONT + 4 : 0;
          const totalH = lines.length * lh + codeH;
          const fits = !tooWide && lines.length * lh <= availH - codeH && totalH <= availH;
          chosen = { px, lh, lines, codeH, totalH, fits };
          if (fits) break;
        }
        if (!chosen) return;
        if (!chosen.fits) {
          // Last resort: hard-split over-long words at the smallest size so
          // the text stays inside the room boundaries.
          const lh = chosen.px + 3;
          const { lines } = wrap(chosen.px, true);
          const totalH = lines.length * lh + chosen.codeH;
          chosen = { ...chosen, lh, lines, totalH, fits: totalH <= availH };
        }

        // Vertically centre the whole block (name lines + code) on the room
        // centre; each <text>/<tspan> uses dominant-baseline: central, so the
        // y values below are line-centre positions.
        const c0 = -chosen.totalH / 2 + chosen.lh / 2;
        let inner = '';
        chosen.lines.forEach((ln, i) => {
          inner += `<tspan x="0" y="${(c0 + i * chosen.lh).toFixed(1)}">${escapeXml(ln)}</tspan>`;
        });
        nameText.innerHTML = inner;
        nameText.style.fontSize = chosen.px + 'px';
        if (codeText && code) {
          const codeY = -chosen.totalH / 2 + chosen.lines.length * chosen.lh + chosen.codeH / 2;
          codeText.setAttribute('y', codeY.toFixed(1));
        }
      });
    });
  }

  layoutRoomLabels();

  // Initial display sync
  if (navStartInput && navStartSelect) {
    syncNavStartInputFromSelect();
  }
  if (navDestInput && navDestSelect) {
    syncNavDestInputFromSelect();
  }

});