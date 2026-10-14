import React from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { DEMO_STATISTICS } from '../data/initialData';
import { 
  BarChart3, 
  ShieldCheck, 
  CopyCheck, 
  AlertTriangle, 
  HeartHandshake, 
  EyeOff, 
  FileCheck2, 
  Info,
  Waves,
  Trees,
  CircleAlert,
  Ban,
  ShieldAlert,
  Zap,
  RotateCcw
} from 'lucide-react';

export default function SafetyInsights() {
  const { resetDemoData } = useRoadSafety();

  return (
    <div className="safety-insights-page">
      {/* Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
            <BarChart3 size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              Civic Safety Insights & Governance Framework
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Monsoon hazard analytics, duplicate report deduplication logic, and citizen privacy protection policies
            </p>
          </div>
        </div>

        <button
          className="btn-secondary"
          onClick={() => {
            if (window.confirm('Reset all sample reports to original demo state?')) {
              resetDemoData();
            }
          }}
          style={{ fontSize: '0.8rem', color: '#f97316' }}
        >
          <RotateCcw size={14} /> Reset Demo Data
        </button>
      </div>

      {/* Grid: 3 Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '28px'
      }}>
        {/* Pillar 1: Monsoon Hazard Breakdown & Stats */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Waves size={20} color="#0284c7" />
            Monsoon Road Hazard Distribution
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Empirical breakdown of road risks across metro corridors during seasonal showers:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEMO_STATISTICS.categoryBreakdown.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{item.category}</span>
                  <span style={{ color: item.color, fontWeight: 700 }}>{item.count} reports ({item.percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-card)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percentage}%`, height: '100%', backgroundColor: item.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 2: Duplicate Prevention & Deduplication Logic */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CopyCheck size={20} color="#f59e0b" />
            Duplicate-Report Warning Engine
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            To prevent civic reporting fatigue and keep traffic dispatch rooms actionable, RoadRakshak AI implements automated deduplication:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: '3px' }}>
                1. Spatial Proximity Threshold (&lt; 600m)
              </div>
              <p style={{ color: '#cbd5e1' }}>
                If a hazard of the identical category is detected within 600 meters of an active open incident, a prominent duplicate prompt is triggered.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: '3px' }}>
                2. One-Tap Peer Upvote / Confirmation
              </div>
              <p style={{ color: '#cbd5e1' }}>
                Instead of creating clutter, motorists are invited to upvote the existing report. 3+ confirmations instantly promote unverified reports to "Community Verified".
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: '3px' }}>
                3. Temporal Expiry & Resolution Window
              </div>
              <p style={{ color: '#cbd5e1' }}>
                Resolved reports are archived from deduplication candidate pools, enabling fresh reporting if potholes re-open after heavy storms.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 3: Privacy Protection & Verification Badges */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#10b981" />
            Citizen Privacy & Transparency
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Designed strictly aligned with Indian digital privacy principles and crowdsourced safety ethics:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <EyeOff size={14} /> Anonymous Reporting by Default
              </div>
              <p style={{ color: '#cbd5e1' }}>
                Motorists can file hazard warnings anonymously without providing phone numbers, Aadhaar, or personal identities.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={14} /> Transparent "Unverified" Labels
              </div>
              <p style={{ color: '#cbd5e1' }}>
                Every fresh user report is transparently watermarked as <strong>"Under Review (Unverified)"</strong> to avoid false panic until peer-corroborated.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HeartHandshake size={14} /> Good Samaritan Protection
              </div>
              <p style={{ color: '#cbd5e1' }}>
                Full compliance with Section 134A of the Motor Vehicles Amendment Act, 2019: Citizens assisting crash victims are free from police interrogation or harassment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
