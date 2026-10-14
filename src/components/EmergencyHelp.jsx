import React, { useState } from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { EMERGENCY_NUMBERS } from '../data/initialData';
import { 
  PhoneCall, 
  MapPin, 
  Share2, 
  Copy, 
  CheckCircle2, 
  ShieldAlert, 
  HeartHandshake, 
  AlertOctagon, 
  Hospital, 
  Activity, 
  Ambulance, 
  Shield, 
  Compass
} from 'lucide-react';

export default function EmergencyHelp() {
  const { userLocation } = useRoadSafety();
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedSOSMessage, setCopiedSOSMessage] = useState(false);

  const sosCoordinates = `${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}`;
  const sosMessageText = `🚨 EMERGENCY ROAD SOS: I need urgent assistance at ${userLocation.name}. Coordinates: https://maps.google.com/?q=${sosCoordinates} . Please dispatch emergency first responders immediately!`;

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(sosCoordinates);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleCopySOSMessage = () => {
    navigator.clipboard.writeText(sosMessageText);
    setCopiedSOSMessage(true);
    setTimeout(() => setCopiedSOSMessage(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(sosMessageText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="emergency-help-page">
      {/* 1. PROMINENT CALL 112 HERO SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)',
        border: '2px solid #ef4444',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 24px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-danger)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 'var(--radius-full)',
          padding: '6px 16px',
          color: '#fecaca',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          <ShieldAlert size={18} color="#f87171" />
          <span>India All-in-One Emergency Response Support</span>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: '8px' }}>
          National Emergency Helpline: <span style={{ color: '#fef08a' }}>112</span>
        </h1>
        <p style={{ color: '#fee2e2', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
          Unified 24x7 toll-free emergency number across all Indian States and Union Territories for immediate Police, Ambulance, Fire, and Highway Rescue dispatch.
        </p>

        {/* Huge Prominent Call Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href="tel:112"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#ffffff',
              color: '#991b1b',
              padding: '16px 36px',
              borderRadius: 'var(--radius-full)',
              fontSize: '1.35rem',
              fontWeight: 900,
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              textDecoration: 'none',
              transition: 'transform 0.15s ease',
              animation: 'pulse-danger 2s infinite'
            }}
          >
            <PhoneCall size={28} color="#b91c1c" />
            <span>DIAL 112 NOW</span>
          </a>
        </div>
      </div>

      {/* 2. SOS GPS LOCATION BEACON */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '580px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f97316', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
            <MapPin size={18} /> LIVE SOS GEOLOCATION BEACON
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            {userLocation.name}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Share your high-precision coordinates with first responders, police control room, or family members to guide dispatchers straight to your vehicle.
          </p>
          <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#38bdf8', backgroundColor: 'var(--bg-card)', padding: '6px 12px', borderRadius: '6px', display: 'inline-block' }}>
            GPS Coordinates: {sosCoordinates}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            className="btn-secondary"
            onClick={handleCopyCoordinates}
            style={{ fontSize: '0.85rem' }}
          >
            {copiedCoords ? <CheckCircle2 size={16} color="#34d399" /> : <Copy size={16} />}
            <span>{copiedCoords ? 'Coordinates Copied' : 'Copy GPS Lat/Lng'}</span>
          </button>

          <button
            className="btn-secondary"
            onClick={handleCopySOSMessage}
            style={{ fontSize: '0.85rem' }}
          >
            {copiedSOSMessage ? <CheckCircle2 size={16} color="#34d399" /> : <Copy size={16} />}
            <span>{copiedSOSMessage ? 'SOS Message Copied' : 'Copy Full SOS'}</span>
          </button>

          <button
            className="btn-primary"
            onClick={handleWhatsAppShare}
            style={{ fontSize: '0.85rem', background: '#16a34a' }}
          >
            <Share2 size={16} />
            <span>Share SOS via WhatsApp</span>
          </button>
        </div>
      </div>

      {/* 3. INDIA EMERGENCY HELPLINE DIRECTORY */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PhoneCall size={20} color="#f97316" />
        India Dedicated Emergency Services Directory
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        {EMERGENCY_NUMBERS.map(helpline => (
          <div
            key={helpline.number}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: helpline.priority ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: helpline.priority ? '#ef4444' : '#f97316' }}>
                  {helpline.number}
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'var(--bg-card)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                  {helpline.badge}
                </span>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                {helpline.title}
              </h4>
              {helpline.titleTe && (
                <div className="telugu-font" style={{ fontSize: '0.85rem', color: '#93c5fd', marginBottom: '6px' }}>
                  {helpline.titleTe}
                </div>
              )}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {helpline.subtitle}
              </p>
            </div>

            <a
              href={helpline.action}
              className={helpline.priority ? 'btn-emergency-112' : 'btn-secondary'}
              style={{ justifyContent: 'center', width: '100%', fontSize: '0.9rem' }}
            >
              <PhoneCall size={16} />
              <span>Call {helpline.number}</span>
            </a>
          </div>
        ))}
      </div>

      {/* 4. DRABC FIRST RESPONDER ROAD ACCIDENT PROTOCOL */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Activity size={22} color="#10b981" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
            Standard DRABC First-Aid Protocol for Road Accidents
          </h3>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Under India's Good Samaritan guidelines, citizens rendering first aid to road crash victims are legally protected from civil or criminal liability.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '1rem', marginBottom: '4px' }}>D — Danger</div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Check for oncoming vehicles, fuel leaks, or live power cables before approaching crash site.</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: '#f97316', fontSize: '1rem', marginBottom: '4px' }}>R — Response</div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Gently tap victim's shoulder and ask loudly: "Can you hear me?" Look for eyes opening.</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: '#eab308', fontSize: '1rem', marginBottom: '4px' }}>A — Airway</div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Ensure throat and airway are clear. Do not move spine or neck unless imminent vehicle fire hazard.</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1rem', marginBottom: '4px' }}>B — Breathing</div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Look, listen, and feel for normal chest rise for 10 seconds. If absent, start CPR immediately.</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '1rem', marginBottom: '4px' }}>C — Call 112 / 108</div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Immediately dial 112 or 108. State exact landmark, number of injured, and vehicle types.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
