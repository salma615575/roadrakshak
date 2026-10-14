import React from 'react';
import { RoadSafetyProvider, useRoadSafety } from './context/RoadSafetyContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CommunityMap from './components/CommunityMap';
import HazardAlerts from './components/HazardAlerts';
import AIReportWriter from './components/AIReportWriter';
import EmergencyHelp from './components/EmergencyHelp';
import StatusTracker from './components/StatusTracker';
import SafetyInsights from './components/SafetyInsights';
import ReportHazardModal from './components/ReportHazardModal';
import { ShieldAlert, Heart, Github, ExternalLink } from 'lucide-react';

function AppContent() {
  const { activeTab } = useRoadSafety();

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'map' && <CommunityMap />}
        {activeTab === 'alerts' && <HazardAlerts />}
        {activeTab === 'ai-report' && <AIReportWriter />}
        {activeTab === 'track' && <StatusTracker />}
        {activeTab === 'insights' && <SafetyInsights />}
        {activeTab === 'emergency' && <EmergencyHelp />}
      </main>

      <ReportHazardModal />

      {/* Global Safety Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px 20px',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <ShieldAlert size={16} />
            </div>
            <strong style={{ color: '#fff' }}>RoadRakshak AI — Every Warning Matters</strong>
          </div>

          <div>
            Built with React & Vite for Road Safety Hackathon • Powered by Indian Civic Crowdsourcing & Bilingual AI
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#34d399' }}>● Demo Simulation Active</span>
            <span>Emergency: <strong>112</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <RoadSafetyProvider>
      <AppContent />
    </RoadSafetyProvider>
  );
}
