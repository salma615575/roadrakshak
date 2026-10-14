import React, { useEffect, useRef, useState } from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { ROUTE_SIMULATION } from '../data/initialData';
import L from 'leaflet';
import { 
  AlertTriangle, 
  MapPin, 
  CheckCircle2, 
  Truck, 
  ShieldAlert, 
  ThumbsUp, 
  Navigation, 
  Layers, 
  Info, 
  EyeOff,
  Filter,
  Route,
  ArrowRight
} from 'lucide-react';

const categoryColors = {
  floods: '#0284c7',
  fallen_trees: '#16a34a',
  potholes: '#ea580c',
  blocked_roads: '#9333ea',
  accidents: '#dc2626',
  dangerous_driving: '#ca8a04'
};

export default function CommunityMap() {
  const { 
    reports, 
    selectedHazardId, 
    setSelectedHazardId, 
    upvoteReport, 
    userLocation,
    categories,
    statuses
  } = useRoadSafety();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routesLayerRef = useRef(null);

  const [mapCategoryFilter, setMapCategoryFilter] = useState('all');
  const [showSafeRouteOverlay, setShowSafeRouteOverlay] = useState(true);
  const [activeReportDetails, setActiveReportDetails] = useState(null);

  // Initialize selected hazard if passed from dashboard
  useEffect(() => {
    if (selectedHazardId) {
      const found = reports.find(r => r.id === selectedHazardId);
      if (found) {
        setActiveReportDetails(found);
      }
    } else if (reports.length > 0 && !activeReportDetails) {
      setActiveReportDetails(reports[0]);
    }
  }, [selectedHazardId, reports]);

  // Leaflet Map Initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Centered around Hyderabad / Cyberabad Corridor (17.43, 78.40)
    const map = L.map(mapContainerRef.current, {
      center: [17.4350, 78.4050],
      zoom: 12,
      zoomControl: true
    });

    // OpenStreetMap dark / carto Voyager style tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    routesLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Hazard Markers and Safe Route Polyline when data or filters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !routesLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    routesLayerRef.current.clearLayers();

    // 1. Plot User Current Simulated Location Pin
    const userIcon = L.divIcon({
      className: 'user-pin-icon',
      html: `
        <div style="position:relative; width:34px; height:34px; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; inset:0; background:rgba(249, 115, 22, 0.35); border-radius:50%; animation:pulse-danger 2s infinite;"></div>
          <div style="width:16px; height:16px; background:#f97316; border:3px solid #fff; border-radius:50%; box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .bindTooltip(`📍 You are here: ${userLocation.name}`, { permanent: false, direction: 'top' })
      .addTo(markersLayerRef.current);

    // 2. Plot Hazard Markers
    const filtered = reports.filter(r => {
      if (mapCategoryFilter !== 'all' && r.category !== mapCategoryFilter) return false;
      return true;
    });

    filtered.forEach(report => {
      const color = categoryColors[report.category] || '#ea580c';
      const isCritical = report.severity === 'Critical';

      const customDivIcon = L.divIcon({
        className: 'custom-hazard-pin',
        html: `
          <div style="
            position: relative;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: ${color};
            border: 2px solid #ffffff;
            box-shadow: 0 3px 10px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 14px;
            font-weight: bold;
            ${isCritical ? 'animation: pulse-danger 1.5s infinite;' : ''}
          ">
            <span>⚠️</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([report.lat, report.lng], { icon: customDivIcon });
      
      marker.on('click', () => {
        setActiveReportDetails(report);
        setSelectedHazardId(report.id);
      });

      marker.bindTooltip(`<b>${report.category.replace('_', ' ').toUpperCase()}</b><br/>${report.title}`, {
        direction: 'top',
        offset: [0, -10]
      });

      marker.addTo(markersLayerRef.current);
    });

    // 3. Draw Corridor Route Simulation if Enabled
    if (showSafeRouteOverlay) {
      // Danger Route coordinates (via Tolichowki Underpass)
      const dangerCoords = [
        [17.4485, 78.3800], // Hitec City
        [17.4300, 78.3950], // Jubilee Hills edge
        [17.4082, 78.4143], // Submerged Tolichowki Underpass (Hazard!)
        [17.3916, 78.4428]  // Mehdipatnam
      ];

      // Safe Alternate Route coordinates (via elevated Shaikpet Bypass)
      const safeCoords = [
        [17.4485, 78.3800], // Hitec City
        [17.4350, 78.3700], // Gachibowli Ring
        [17.4150, 78.3950], // Shaikpet Flyover Deck
        [17.3916, 78.4428]  // Mehdipatnam
      ];

      // Dangerous Path (Dashed Crimson)
      L.polyline(dangerCoords, {
        color: '#ef4444',
        weight: 5,
        opacity: 0.8,
        dashArray: '8, 8'
      }).bindTooltip('⚠️ Avoid: Default Route with Flood Obstruction', { permanent: false }).addTo(routesLayerRef.current);

      // Safe Detour (Solid Emerald)
      L.polyline(safeCoords, {
        color: '#10b981',
        weight: 6,
        opacity: 0.95
      }).bindTooltip('🛡️ Recommended: RoadRakshak Verified Safe Route', { permanent: false }).addTo(routesLayerRef.current);
    }

  }, [reports, mapCategoryFilter, showSafeRouteOverlay, userLocation]);

  return (
    <div className="community-map-page">
      {/* Map Control Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: '18px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(2, 132, 199, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
            <Layers size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Civic Community Hazard Map</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Interactive GPS pins of crowdsourced and verified road dangers
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          <select
            className="form-select"
            style={{ width: 'auto', fontSize: '0.82rem', padding: '6px 12px' }}
            value={mapCategoryFilter}
            onChange={(e) => setMapCategoryFilter(e.target.value)}
          >
            <option value="all">Show All Hazard Pins</option>
            <option value="floods">Floods & Waterlogging</option>
            <option value="fallen_trees">Fallen Trees</option>
            <option value="potholes">Potholes</option>
            <option value="blocked_roads">Blocked Roads</option>
            <option value="accidents">Accidents & Collisions</option>
            <option value="dangerous_driving">Dangerous Driving</option>
          </select>

          {/* Toggle Route Simulation Overlay */}
          <button
            className={`btn-secondary ${showSafeRouteOverlay ? 'active' : ''}`}
            onClick={() => setShowSafeRouteOverlay(!showSafeRouteOverlay)}
            style={{
              fontSize: '0.82rem',
              padding: '6px 12px',
              backgroundColor: showSafeRouteOverlay ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)',
              borderColor: showSafeRouteOverlay ? '#10b981' : 'var(--border-subtle)',
              color: showSafeRouteOverlay ? '#34d399' : 'var(--text-main)'
            }}
          >
            <Route size={15} />
            <span>{showSafeRouteOverlay ? 'Route Advisor: Active' : 'Show Route Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Map Layout: Left Map & Right Detail Drawer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(320px, 380px)',
        gap: '20px',
        minHeight: '580px'
      }}>
        {/* Leaflet Map Card */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '480px'
        }}>
          {/* Map Canvas */}
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '540px' }} />

          {/* Map Legend Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            backgroundColor: 'rgba(11, 17, 32, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '0.72rem',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            maxWidth: '240px'
          }}>
            <div style={{ fontWeight: 700, color: '#fff', marginBottom: '2px' }}>Map Key & Indicators</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f97316' }} />
              <span>📍 Your Simulated GPS Location</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626' }} />
              <span>⚠️ Accidents / Critical Hazards</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284c7' }} />
              <span>🌊 Waterlogging & Floods</span>
            </div>
            {showSafeRouteOverlay && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid var(--border-subtle)', paddingTop: '4px' }}>
                  <span style={{ width: '16px', height: '3px', background: '#10b981' }} />
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Safe Detour Route</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '16px', height: '3px', background: '#ef4444', borderStyle: 'dashed' }} />
                  <span style={{ color: '#f87171' }}>Avoid (Hazard on path)</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Selected Hazard Details Drawer */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxHeight: '620px',
          overflowY: 'auto'
        }}>
          {activeReportDetails ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`severity-pill severity-${activeReportDetails.severity.toLowerCase()}`}>
                  {activeReportDetails.severity} Severity
                </span>
                <span className="status-badge" style={{ fontSize: '0.72rem' }}>
                  ID: {activeReportDetails.id}
                </span>
              </div>

              {/* Photo preview */}
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '150px', background: '#0f172a' }}>
                <img
                  src={activeReportDetails.photoUrl}
                  alt={activeReportDetails.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Title & Bilingual Subtitle */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  {activeReportDetails.title}
                </h4>
                {activeReportDetails.titleTe && (
                  <div className="telugu-font" style={{ fontSize: '0.85rem', color: '#93c5fd' }}>
                    {activeReportDetails.titleTe}
                  </div>
                )}
              </div>

              {/* Status pill & Privacy badge */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span className={`status-badge ${statuses[activeReportDetails.status]?.badgeClass || 'badge-unverified'}`}>
                  {statuses[activeReportDetails.status]?.label || 'Under Review'}
                </span>
                {activeReportDetails.isAnonymous && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <EyeOff size={12} /> Anonymous Good Samaritan
                  </span>
                )}
              </div>

              {/* Location & Time */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#f97316" />
                  <span style={{ color: '#fff' }}>{activeReportDetails.location}</span>
                </div>
                <div style={{ paddingLeft: '20px', fontSize: '0.75rem' }}>
                  Reported: {activeReportDetails.reportedAt} ({activeReportDetails.lat.toFixed(4)}, {activeReportDetails.lng.toFixed(4)})
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                {activeReportDetails.description}
              </p>

              {/* Safe Route Suggestion */}
              {activeReportDetails.suggestedAlternate && (
                <div style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 700, marginBottom: '4px' }}>
                    <Navigation size={14} /> Recommended Commuter Detour
                  </div>
                  <div style={{ color: '#e2e8f0' }}>
                    {activeReportDetails.suggestedAlternate}
                  </div>
                </div>
              )}

              {/* Confirm / Upvote Button */}
              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '0.85rem' }}
                  onClick={() => upvoteReport(activeReportDetails.id)}
                >
                  <ThumbsUp size={16} />
                  <span>Confirm / Upvote Hazard ({activeReportDetails.upvotes} Confirmations)</span>
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Info size={32} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
              <p>Click on any hazard pin on the map to inspect incident details, photos, and safer route detours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
