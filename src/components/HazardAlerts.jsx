import React, { useState } from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { ROUTE_SIMULATION } from '../data/initialData';
import { 
  BellRing, 
  AlertTriangle, 
  ShieldAlert, 
  Navigation, 
  Volume2, 
  VolumeX, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles,
  MapPin,
  Waves,
  Trees,
  Ban,
  CircleAlert,
  Zap
} from 'lucide-react';

const HOTSPOT_LOCATIONS = [
  { name: 'Hitec City, Cyber Towers Corridor', lat: 17.4485, lng: 78.3800 },
  { name: 'Tolichowki Flyover Underpass Sector', lat: 17.4082, lng: 78.4143 },
  { name: 'Jubilee Hills Checkpost / Road 36', lat: 17.4342, lng: 78.4067 },
  { name: 'Kukatpally Y Junction (NH65)', lat: 17.4938, lng: 78.4011 }
];

export default function HazardAlerts() {
  const { 
    nearbyHazards, 
    alertRadiusKm, 
    setAlertRadiusKm, 
    soundEnabled, 
    setSoundEnabled, 
    playAlertChime,
    userLocation,
    setUserLocation,
    setSelectedHazardId,
    setActiveTab
  } = useRoadSafety();

  const [activeSimulationRoute, setActiveSimulationRoute] = useState('safe');
  const criticalNearby = nearbyHazards.filter(h => h.severity === 'Critical');

  const triggerTestAlarm = () => {
    playAlertChime();
  };

  return (
    <div className="hazard-alerts-page">
      {/* Top Warning Banner if any Critical hazard is within immediate proximity */}
      {criticalNearby.length > 0 && (
        <div className="alert-box-danger" style={{ animation: 'pulse-danger 3s infinite' }}>
          <ShieldAlert size={26} color="#ef4444" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '2px' }}>
              CRITICAL HAZARD DETECTED WITHIN YOUR SECTOR ({alertRadiusKm} KM)
            </div>
            <div style={{ fontSize: '0.85rem', color: '#fca5a5' }}>
              {criticalNearby[0].title} is active {criticalNearby[0].distanceKm} km away ({criticalNearby[0].location}).
              Review safer route detour recommendations below.
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Left Proximity Radar, Right Safe Route Detour Advisor */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* Card 1: Proximity Radar & Nearby Warnings */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <BellRing size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Proximity Hazard Radar</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Scans active hazards around your vehicle's GPS position
                </p>
              </div>
            </div>

            {/* Test Audio Alarm */}
            <button
              className="btn-secondary"
              onClick={triggerTestAlarm}
              style={{ fontSize: '0.75rem', padding: '6px 10px', color: '#f97316' }}
              title="Test the Web Audio high-urgency chime"
            >
              <Volume2 size={14} /> Test Alert Beep
            </button>
          </div>

          {/* Location Simulator Switcher */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#f97316" /> Current Simulated Sector (Click to relocate):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {HOTSPOT_LOCATIONS.map(loc => {
                const isActive = loc.name === userLocation.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() => setUserLocation({ ...loc, isSimulated: true })}
                    style={{
                      backgroundColor: isActive ? 'var(--saffron-orange)' : 'var(--bg-surface)',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--saffron-orange)' : 'var(--border-subtle)',
                      borderRadius: 'var(--radius-full)',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {loc.name.split(',')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Radar Visual Display & Radius Control */}
          <div style={{
            position: 'relative',
            height: '180px',
            backgroundColor: '#070c18',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Concentric rings */}
            <div style={{ position: 'absolute', width: '60px', height: '60px', border: '1px solid rgba(249, 115, 22, 0.4)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', width: '120px', height: '120px', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', width: '170px', height: '170px', border: '1px dashed rgba(249, 115, 22, 0.15)', borderRadius: '50%' }} />
            
            {/* Radar scan wave */}
            <div className="radar-ring" />
            
            {/* Center Vehicle Pin */}
            <div style={{
              width: '18px',
              height: '18px',
              backgroundColor: '#f97316',
              borderRadius: '50%',
              border: '3px solid #fff',
              zIndex: 10,
              boxShadow: '0 0 15px rgba(249, 115, 22, 0.8)'
            }} />

            <div style={{
              position: 'absolute',
              bottom: '8px',
              backgroundColor: 'rgba(11, 17, 32, 0.85)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              color: '#94a3b8'
            }}>
              Radar Scanning: <strong>{alertRadiusKm} KM Radius</strong> — {nearbyHazards.length} Hazards Detected
            </div>
          </div>

          {/* Alert Radius Selector */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Scan Coverage Radius:
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1.0, 3.0, 5.0].map(r => (
                <button
                  key={r}
                  onClick={() => setAlertRadiusKm(r)}
                  style={{
                    backgroundColor: alertRadiusKm === r ? 'var(--saffron-orange)' : 'var(--bg-card)',
                    color: alertRadiusKm === r ? '#fff' : 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  {r} KM
                </button>
              ))}
            </div>
          </div>

          {/* List of Hazards in Proximity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
              Nearby Threats in Sector ({nearbyHazards.length}):
            </div>

            {nearbyHazards.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem' }}>
                <CheckCircle2 size={24} style={{ margin: '0 auto 8px auto' }} />
                Sector Clear! No active hazards reported within {alertRadiusKm} km of your vehicle.
              </div>
            ) : (
              nearbyHazards.map(hazard => (
                <div
                  key={hazard.id}
                  onClick={() => {
                    setSelectedHazardId(hazard.id);
                    setActiveTab('map');
                  }}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: hazard.severity === 'Critical' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span className={`severity-pill severity-${hazard.severity.toLowerCase()}`}>
                        {hazard.severity}
                      </span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                        {hazard.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      📍 {hazard.location} • {hazard.reportedAt}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f97316' }}>
                      {hazard.distanceKm} km
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                      from you
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Card 2: Safe Route Detour Advisor */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <Navigation size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Safe Route Detour Advisor</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Evaluates active hazard corridors to steer drivers toward safer paths
              </p>
            </div>
          </div>

          {/* Corridor Selection Indicator */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>FROM</span>
              <div style={{ fontWeight: 700, color: '#fff' }}>{ROUTE_SIMULATION.origin}</div>
            </div>
            <ArrowRight size={18} color="#f97316" />
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>TO</span>
              <div style={{ fontWeight: 700, color: '#fff' }}>{ROUTE_SIMULATION.destination}</div>
            </div>
          </div>

          {/* Comparison Cards: Dangerous Route vs Safe Detour */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Danger Route Card */}
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fca5a5' }}>
                  ❌ Standard Navigation Route
                </span>
                <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                  Safety Score: {ROUTE_SIMULATION.dangerRoute.safetyScore}/100
                </span>
              </div>

              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Via Tolichowki Underpass ({ROUTE_SIMULATION.dangerRoute.distance} • {ROUTE_SIMULATION.dangerRoute.estimatedTime})
              </div>

              <div style={{ fontSize: '0.75rem', color: '#f87171', backgroundColor: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '6px' }}>
                ⚠️ <strong>Obstruction Alert:</strong> Submerged underpass (2ft deep water). Vehicles stalling. Heavy multi-car backlog.
              </div>
            </div>

            {/* Recommended Safe Route Card */}
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '2px solid rgba(16, 185, 129, 0.5)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#10b981" /> Recommended Safe Detour
                </span>
                <span style={{ backgroundColor: '#10b981', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                  Safety Score: {ROUTE_SIMULATION.safeRoute.safetyScore}/100
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
                Via Shaikpet Flyover & Gachibowli Bypass
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Distance: <strong>{ROUTE_SIMULATION.safeRoute.distance}</strong></span>
                <span>Est. Time: <strong style={{ color: '#34d399' }}>{ROUTE_SIMULATION.safeRoute.estimatedTime}</strong></span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.78rem', color: '#cbd5e1' }}>
                {ROUTE_SIMULATION.safeRoute.benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#10b981' }}>✓</span> {benefit}
                  </div>
                ))}
              </div>

              <button
                className="btn-primary"
                onClick={() => setActiveTab('map')}
                style={{ marginTop: '6px', fontSize: '0.85rem' }}
              >
                <Compass size={16} /> View Safe Detour on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
