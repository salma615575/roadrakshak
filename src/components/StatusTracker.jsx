import React, { useState } from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  EyeOff, 
  ThumbsUp, 
  FileText,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function StatusTracker() {
  const { reports, statuses, upvoteReport, setActiveTab, setSelectedHazardId } = useRoadSafety();
  const [searchId, setSearchId] = useState('');
  const [selectedReportId, setSelectedReportId] = useState(reports[0]?.id || 'RR-2026-8401');

  // Find targeted report
  const currentReport = reports.find(r => r.id.toLowerCase() === (searchId.trim().toLowerCase() || selectedReportId.toLowerCase())) || reports[0];

  const getStepStatus = (stepIndex, reportStatus) => {
    // 0: Filed, 1: Community Verified, 2: Authority Dispatched, 3: Resolved
    const statusMap = {
      unverified: 0,
      community_verified: 1,
      authority_dispatched: 2,
      resolved: 3
    };
    const currentStep = statusMap[reportStatus] ?? 0;
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const steps = [
    { title: 'Incident Filed', desc: 'Crowdsourced by commuter with GPS timestamp & photo' },
    { title: 'Community Triage', desc: 'Verified by 3+ peer eyewitness motorists in corridor' },
    { title: 'Authority Dispatched', desc: 'Transmitted to GHMC / Cyberabad Traffic Police DRF' },
    { title: 'Hazard Cleared', desc: 'Remediation completed and verified safe for commuters' }
  ];

  return (
    <div className="status-tracker-page">
      {/* Header & Search Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '4px' }}>
            Report Status & Lifecycle Tracking
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Track the end-to-end civic resolution workflow of reported road hazards
          </p>
        </div>

        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '380px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
              placeholder="Search Report ID (e.g. RR-2026-8401)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Quick Selector, Right Detail Lifecycle Timeline */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 340px) 1fr',
        gap: '24px'
      }}>
        {/* Left List of Recent Reports */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxHeight: '620px',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
            SELECT INCIDENT TO TRACK ({reports.length}):
          </div>

          {reports.map(rep => {
            const isSelected = currentReport?.id === rep.id;
            const statusConfig = statuses[rep.status] || statuses.unverified;

            return (
              <div
                key={rep.id}
                onClick={() => {
                  setSelectedReportId(rep.id);
                  setSearchId('');
                }}
                style={{
                  backgroundColor: isSelected ? 'rgba(249, 115, 22, 0.12)' : 'var(--bg-card)',
                  border: isSelected ? '1px solid var(--saffron-orange)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: isSelected ? '#f97316' : '#fff' }}>
                    {rep.id}
                  </span>
                  <span className={`status-badge ${statusConfig.badgeClass}`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                    {statusConfig.label.split(' ')[0]}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rep.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  📍 {rep.location.split(',')[0]} • {rep.reportedAt}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Lifecycle Timeline Card */}
        {currentReport && (
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* Top Report Info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f97316' }}>
                    {currentReport.id}
                  </span>
                  <span className={`status-badge ${statuses[currentReport.status]?.badgeClass}`}>
                    {statuses[currentReport.status]?.label}
                  </span>
                  <span className={`severity-pill severity-${currentReport.severity.toLowerCase()}`}>
                    {currentReport.severity}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                  {currentReport.title}
                </h3>
                {currentReport.titleTe && (
                  <div className="telugu-font" style={{ fontSize: '0.95rem', color: '#93c5fd', marginBottom: '6px' }}>
                    {currentReport.titleTe}
                  </div>
                )}
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#f97316" />
                  <span>{currentReport.location}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => upvoteReport(currentReport.id)}
                  style={{ fontSize: '0.8rem' }}
                >
                  <ThumbsUp size={14} /> Confirm ({currentReport.upvotes})
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setSelectedHazardId(currentReport.id);
                    setActiveTab('map');
                  }}
                  style={{ fontSize: '0.8rem' }}
                >
                  View on Map
                </button>
              </div>
            </div>

            {/* Visual Stepper Timeline */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
                Official Resolution Progress Timeline
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {steps.map((step, idx) => {
                  const state = getStepStatus(idx, currentReport.status);
                  const isCompleted = state === 'completed';
                  const isActive = state === 'active';

                  return (
                    <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                      {/* Step Indicator Dot */}
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? '#10b981' : isActive ? '#f97316' : '#334155',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        flexShrink: 0,
                        zIndex: 2,
                        boxShadow: isActive ? '0 0 12px rgba(249, 115, 22, 0.6)' : 'none'
                      }}>
                        {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isCompleted || isActive ? '#fff' : 'var(--text-muted)' }}>
                            {step.title}
                          </span>
                          {isActive && (
                            <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#f97316', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                              Current Stage
                            </span>
                          )}
                          {isCompleted && (
                            <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>
                              Verified ✓
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Description & Civic Dispatch Update */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Citizen Description
                </div>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {currentReport.description}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.3)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={14} /> Authority Notes & Field Clearance
                </div>
                <p style={{ fontSize: '0.85rem', color: '#bae6fd', lineHeight: 1.5 }}>
                  {currentReport.authorityNotes || 'No authority notes logged yet. Field triage pending.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
