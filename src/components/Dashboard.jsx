import React, { useState } from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { DEMO_STATISTICS } from '../data/initialData';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Truck, 
  ShieldAlert, 
  Clock, 
  TrendingUp, 
  ThumbsUp, 
  MapPin, 
  Filter, 
  ExternalLink, 
  Waves, 
  Trees, 
  CircleAlert, 
  Ban, 
  Zap, 
  Bot, 
  PhoneCall, 
  PlusCircle, 
  Sparkles,
  ArrowRight,
  EyeOff,
  Compass
} from 'lucide-react';

const categoryIconMap = {
  floods: Waves,
  fallen_trees: Trees,
  potholes: CircleAlert,
  blocked_roads: Ban,
  accidents: ShieldAlert,
  dangerous_driving: Zap
};

export default function Dashboard() {
  const { 
    reports, 
    categories, 
    statuses, 
    upvoteReport, 
    setActiveTab, 
    setSelectedHazardId, 
    setIsReportModalOpen,
    userLocation
  } = useRoadSafety();

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filtered reports
  const filteredReports = reports.filter(item => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (filterSeverity !== 'all' && item.severity.toLowerCase() !== filterSeverity.toLowerCase()) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  const criticalCount = reports.filter(r => r.severity === 'Critical' && r.status !== 'resolved').length;
  const activeCount = reports.filter(r => r.status !== 'resolved').length;
  const verifiedCount = reports.filter(r => r.status === 'community_verified' || r.status === 'authority_dispatched').length;

  return (
    <div className="dashboard-container">
      {/* Hero Welcome & Quick Mission Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #131c31 0%, #1e293b 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '680px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '4px 12px', borderRadius: 'var(--radius-full)', color: '#f97316', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
            <Sparkles size={14} /> Crowdsourced Indian Civic Safety Initiative
          </div>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
            RoadRakshak AI — <span style={{ color: '#f97316' }}>Every Warning Matters</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '18px' }}>
            Real-time citizen hazard reporting for floods, potholes, fallen trees, road blockages, and accidents. Protect yourself and fellow commuters across high-risk urban and highway corridors.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button className="btn-primary" onClick={() => setIsReportModalOpen(true)}>
              <PlusCircle size={17} /> Report a Hazard
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('ai-report')}>
              <Bot size={17} color="#3b82f6" /> AI Assist (English / తెలుగు)
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('map')}>
              <Compass size={17} color="#10b981" /> Explore Live Map
            </button>
          </div>
        </div>

        {/* Quick Simulator Stats Pill */}
        <div style={{
          background: 'rgba(11, 17, 32, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '18px 22px',
          minWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <MapPin size={16} color="#f97316" /> Current Sim Sector:
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
            {userLocation.name}
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Hazards within 3km:</span>
            <span style={{ color: '#ef4444', fontWeight: 800 }}>
              {reports.filter(r => r.status !== 'resolved' && (r.category === 'floods' || r.category === 'accidents' || r.category === 'potholes')).length} Active
            </span>
          </div>
        </div>
      </div>

      {/* 1. Road-Safety Statistics Grid */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <ShieldAlert size={22} />
          </div>
          <div className="stat-card-value" style={{ color: '#ef4444' }}>
            {criticalCount}
          </div>
          <div className="stat-card-label">Critical Immediate Dangers</div>
          <div className="stat-card-trend" style={{ color: '#f87171' }}>
            <AlertTriangle size={14} /> Flash floods, major crashes, wrong-side rash
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)', color: '#f97316' }}>
            <TrendingUp size={22} />
          </div>
          <div className="stat-card-value" style={{ color: '#f97316' }}>
            {activeCount}
          </div>
          <div className="stat-card-label">Active Monitored Hazards</div>
          <div className="stat-card-trend" style={{ color: 'var(--text-muted)' }}>
            Across Hyderabad / Cyberabad & NH corridors
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#0284c7' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-card-value" style={{ color: '#38bdf8' }}>
            {Math.round((verifiedCount / (activeCount || 1)) * 100)}%
          </div>
          <div className="stat-card-label">Community Verification Rate</div>
          <div className="stat-card-trend" style={{ color: '#7dd3fc' }}>
            Confirmed by 3+ peer drivers
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <Clock size={22} />
          </div>
          <div className="stat-card-value" style={{ color: '#34d399' }}>
            {DEMO_STATISTICS.avgClearanceTimeHours}
          </div>
          <div className="stat-card-label">Avg Civic Response Time</div>
          <div className="stat-card-trend" style={{ color: '#86efac' }}>
            GHMC & Traffic Police field teams
          </div>
        </div>
      </div>

      {/* 2. Hazard Category Distribution */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Hazard Types Monitored</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Select any category to filter live community incident reports
            </p>
          </div>
          {filterCategory !== 'all' && (
            <button 
              className="btn-secondary" 
              onClick={() => setFilterCategory('all')} 
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              Reset Category Filter
            </button>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          {categories.map(cat => {
            const IconComp = categoryIconMap[cat.id] || AlertTriangle;
            const count = reports.filter(r => r.category === cat.id && r.status !== 'resolved').length;
            const isSelected = filterCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setFilterCategory(isSelected ? 'all' : cat.id)}
                style={{
                  backgroundColor: isSelected ? 'rgba(249, 115, 22, 0.12)' : 'var(--bg-card)',
                  border: isSelected ? '1px solid var(--saffron-orange)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: cat.bg,
                  color: cat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComp size={20} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {cat.label.split('&')[0]}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: cat.color, fontWeight: 700 }}>{count}</span> active incidents
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Hotspot Corridors Warning Box */}
      <div style={{
        backgroundColor: 'rgba(245, 158, 11, 0.08)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, marginBottom: '10px' }}>
          <AlertTriangle size={18} /> High-Risk Vulnerability Corridors (Monsoon & Transit Watch)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {DEMO_STATISTICS.hotspotCorridors.map((hotspot, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{hotspot.name}</span>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 700, 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  backgroundColor: hotspot.riskLevel.includes('Severe') ? '#ef4444' : '#f59e0b',
                  color: '#fff'
                }}>
                  {hotspot.riskLevel}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Primary: <span style={{ color: '#cbd5e1' }}>{hotspot.primaryIssue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Live Reports Feed Section */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        {/* Feed Header with Filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Live Community Hazard Reports</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Showing {filteredReports.length} incidents ({reports.filter(r => r.status === 'unverified').length} labeled as unverified community triage)
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            {/* Filter by Severity */}
            <select
              className="form-select"
              style={{ width: 'auto', fontSize: '0.82rem', padding: '6px 12px' }}
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>

            {/* Filter by Status */}
            <select
              className="form-select"
              style={{ width: 'auto', fontSize: '0.82rem', padding: '6px 12px' }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="unverified">Under Review (Unverified)</option>
              <option value="community_verified">Community Verified</option>
              <option value="authority_dispatched">Authority Dispatched</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Reports Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '18px'
        }}>
          {filteredReports.map((report) => {
            const statusConfig = statuses[report.status] || statuses.unverified;
            const CategoryIcon = categoryIconMap[report.category] || AlertTriangle;
            const isCritical = report.severity === 'Critical';

            return (
              <div
                key={report.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: isCritical ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.15s ease, border-color 0.15s ease'
                }}
              >
                {/* Image & Category Header Banner */}
                <div style={{ position: 'relative', height: '140px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
                  <img
                    src={report.photoUrl}
                    alt={report.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(11, 17, 32, 0.85)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    <CategoryIcon size={14} color="#f97316" />
                    <span>{report.category.replace('_', ' ').toUpperCase()}</span>
                  </div>

                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <span className={`severity-pill severity-${report.severity.toLowerCase()}`}>
                      {report.severity}
                    </span>
                  </div>

                  {report.isAnonymous && (
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.68rem',
                      color: '#cbd5e1'
                    }}>
                      <EyeOff size={12} /> Privacy Guard: Anonymous Report
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
                  {/* Status Badge Ribbon */}
                  <div>
                    <span className={`status-badge ${statusConfig.badgeClass}`}>
                      {report.status === 'unverified' && <AlertTriangle size={12} />}
                      {report.status === 'community_verified' && <CheckCircle2 size={12} />}
                      {report.status === 'authority_dispatched' && <Truck size={12} />}
                      {report.status === 'resolved' && <CheckCircle2 size={12} />}
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Title & Bilingual Subtitle */}
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '4px', color: '#fff' }}>
                      {report.title}
                    </h4>
                    {report.titleTe && (
                      <div className="telugu-font" style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 500 }}>
                        {report.titleTe}
                      </div>
                    )}
                  </div>

                  {/* Location & Time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <MapPin size={14} color="#f97316" style={{ flexShrink: 0 }} />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {report.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {report.description}
                  </p>

                  {/* Unverified Notice Alert if unverified */}
                  {report.status === 'unverified' && (
                    <div style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px dashed rgba(239, 68, 68, 0.4)',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '0.72rem',
                      color: '#fca5a5',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <AlertTriangle size={13} style={{ flexShrink: 0 }} />
                      <span>Unverified Crowdsourced Report. Confirm below if you witness this hazard.</span>
                    </div>
                  )}

                  {/* Authority Dispatch Note if present */}
                  {report.authorityNotes && (
                    <div style={{
                      backgroundColor: 'rgba(2, 132, 199, 0.1)',
                      borderLeft: '3px solid #0284c7',
                      padding: '6px 10px',
                      borderRadius: '0 6px 6px 0',
                      fontSize: '0.74rem',
                      color: '#bae6fd'
                    }}>
                      <strong>Civic Update:</strong> {report.authorityNotes}
                    </div>
                  )}

                  {/* Card Footer / Action Buttons */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}>
                    <button
                      className="btn-secondary"
                      onClick={() => upvoteReport(report.id)}
                      style={{ fontSize: '0.78rem', padding: '6px 12px', color: '#38bdf8' }}
                      title="Confirm this hazard as an eyewitness driver"
                    >
                      <ThumbsUp size={14} />
                      <span>Confirm / Upvote ({report.upvotes})</span>
                    </button>

                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setSelectedHazardId(report.id);
                        setActiveTab('map');
                      }}
                      style={{ fontSize: '0.78rem', padding: '6px 10px' }}
                      title="View on Community Hazard Map"
                    >
                      <Compass size={14} />
                      <span>View Map</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
