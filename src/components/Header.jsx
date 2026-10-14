import React from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { 
  ShieldAlert, 
  Map, 
  LayoutDashboard, 
  BellRing, 
  Bot, 
  Search, 
  PhoneCall, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  MapPin,
  Sparkles,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

export default function Header() {
  const {
    activeTab,
    setActiveTab,
    nearbyHazards,
    setIsReportModalOpen,
    soundEnabled,
    setSoundEnabled,
    playAlertChime,
    userLocation,
    setUserLocation
  } = useRoadSafety();

  const toggleSound = () => {
    if (!soundEnabled) {
      playAlertChime();
    }
    setSoundEnabled(!soundEnabled);
  };

  const criticalNearbyCount = nearbyHazards.filter(h => h.severity === 'Critical').length;

  return (
    <>
      {/* Honest Demo Mode & Safety Disclaimer Top Ribbon */}
      <div className="demo-banner">
        <div className="demo-banner-content">
          <span className="demo-badge">Demo Mode</span>
          <span>
            Simulated civic data for hackathon evaluation. No live 112 emergency dispatch is initiated. Do not operate device while driving.
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
            <ShieldCheck size={14} color="#34d399" /> Citizen Privacy Protected
          </span>
        </div>
      </div>

      <header className="header">
        <div className="header-inner">
          {/* Brand Logo & Title */}
          <div className="brand-section" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
            <div className="brand-logo-icon">
              <ShieldAlert size={26} />
            </div>
            <div className="brand-text">
              <h1>
                RoadRakshak <span style={{ color: '#f97316' }}>AI</span>
                <span className="telugu-font" style={{ fontSize: '0.9rem', color: '#fb923c', fontWeight: 600 }}>రహదారి రక్షక్</span>
              </h1>
              <div className="tagline">Every Warning Matters — Indian Civic Road Safety</div>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="nav-tabs">
            <button
              className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              <Map size={16} />
              <span>Hazard Map</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveTab('alerts')}
            >
              <BellRing size={16} />
              <span>Radar Alerts</span>
              {nearbyHazards.length > 0 && (
                <span className="nav-badge-count">
                  {nearbyHazards.length}
                </span>
              )}
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'ai-report' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai-report')}
            >
              <Bot size={16} />
              <span>AI Assist</span>
              <span style={{ fontSize: '0.65rem', background: '#3b82f6', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>
                En/తె
              </span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'track' ? 'active' : ''}`}
              onClick={() => setActiveTab('track')}
            >
              <Search size={16} />
              <span>Track Status</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
              onClick={() => setActiveTab('insights')}
            >
              <BarChart3 size={16} />
              <span>Insights</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
              onClick={() => setActiveTab('emergency')}
            >
              <PhoneCall size={16} color="#ef4444" />
              <span style={{ color: activeTab === 'emergency' ? '#fff' : '#ef4444' }}>Emergency 112</span>
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            {/* Audio Radar Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Hazard Audio Alert Enabled' : 'Hazard Audio Alert Muted'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: soundEnabled ? 'rgba(249, 115, 22, 0.2)' : 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: soundEnabled ? '#f97316' : 'var(--text-muted)'
              }}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Quick Report Hazard Button */}
            <button
              className="btn-primary btn-report-quick"
              onClick={() => setIsReportModalOpen(true)}
            >
              <PlusCircle size={18} />
              <span>Report Hazard</span>
            </button>

            {/* Direct Prominent 112 Call Button */}
            <a
              href="tel:112"
              className="btn-emergency-112"
              title="Call India's 112 National Emergency Helpline"
              onClick={(e) => {
                // If on desktop browser, also switch to emergency tab for instant helpline cards
                if (!navigator.userAgent.match(/Mobi|Android|iPhone/i)) {
                  setActiveTab('emergency');
                }
              }}
            >
              <PhoneCall size={18} />
              <span>CALL 112</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <button
          className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={18} />
          <span style={{ fontSize: '0.7rem' }}>Dashboard</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={18} />
          <span style={{ fontSize: '0.7rem' }}>Map</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <BellRing size={18} />
          <span style={{ fontSize: '0.7rem' }}>Radar</span>
          {nearbyHazards.length > 0 && <span className="nav-badge-count">{nearbyHazards.length}</span>}
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'ai-report' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai-report')}
        >
          <Bot size={18} />
          <span style={{ fontSize: '0.7rem' }}>AI En/తె</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          <PhoneCall size={18} color="#ef4444" />
          <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 800 }}>112</span>
        </button>
      </nav>
    </>
  );
}
