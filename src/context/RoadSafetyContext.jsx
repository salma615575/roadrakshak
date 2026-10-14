import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_REPORTS, HAZARD_CATEGORIES, VERIFICATION_STATUSES } from '../data/initialData';
import { calculateDistanceKm } from '../utils/aiAnalyzer';

const RoadSafetyContext = createContext();

export function RoadSafetyProvider({ children }) {
  // Reports State
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('roadrakshak_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading stored reports:', e);
      }
    }
    return INITIAL_REPORTS;
  });

  // Simulated User Location (Default: Cyber Towers, Hitec City, Hyderabad)
  const [userLocation, setUserLocation] = useState({
    name: 'Hitec City, Cyber Towers Corridor',
    lat: 17.4485,
    lng: 78.3800,
    isSimulated: true
  });

  // Proximity Alert Radius (km)
  const [alertRadiusKm, setAlertRadiusKm] = useState(3.0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedHazardId, setSelectedHazardId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Save to localStorage when reports change
  useEffect(() => {
    localStorage.setItem('roadrakshak_reports', JSON.stringify(reports));
  }, [reports]);

  // Audio Beep Chime Synthesizer using Web Audio API
  const playAlertChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Double pulse high-urgency chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc2.frequency.setValueAtTime(1320, ctx.currentTime); // E6

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio playback not supported or user gesture needed:', e);
    }
  };

  // Upvote / Community Confirm a report
  const upvoteReport = (reportId) => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        const newUpvotes = rep.upvotes + 1;
        let newStatus = rep.status;
        // Promote unverified reports once they receive >= 3 community confirmations
        if (rep.status === 'unverified' && newUpvotes >= 3) {
          newStatus = 'community_verified';
        }
        return {
          ...rep,
          upvotes: newUpvotes,
          status: newStatus
        };
      }
      return rep;
    }));
  };

  // Check for potential duplicate reports within 600m
  const checkDuplicateReport = (category, lat, lng, landmarkName = '') => {
    return reports.find(rep => {
      if (rep.status === 'resolved') return false;
      const sameCategory = rep.category === category;
      const dist = calculateDistanceKm(lat, lng, rep.lat, rep.lng);
      const isNearby = dist < 0.6; // within 600 meters
      const matchesLandmark = landmarkName && rep.location.toLowerCase().includes(landmarkName.toLowerCase());
      return sameCategory && (isNearby || matchesLandmark);
    });
  };

  // Add a new report
  const addReport = (newReportData) => {
    const reportId = `RR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry = {
      id: reportId,
      category: newReportData.category,
      title: newReportData.title || `Citizen Report: ${newReportData.category.replace('_', ' ')}`,
      titleTe: newReportData.titleTe || 'పౌరుల భద్రతా నివేదిక',
      description: newReportData.description,
      descriptionTe: newReportData.descriptionTe || '',
      location: newReportData.location || 'Reported Location, Hyderabad',
      lat: Number(newReportData.lat) || 17.4400,
      lng: Number(newReportData.lng) || 78.3900,
      severity: newReportData.severity || 'Moderate',
      reportedAt: 'Just now',
      timestamp: Date.now(),
      status: 'unverified', // Always starts as unverified for privacy & crowd safety
      upvotes: 1,
      reporterName: newReportData.isAnonymous ? 'Anonymous Good Samaritan' : (newReportData.reporterName || 'Citizen Commuter'),
      isAnonymous: Boolean(newReportData.isAnonymous),
      photoUrl: newReportData.photoUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      authorityNotes: 'Filed via RoadRakshak AI. Notification queued for community verification.',
      suggestedAlternate: newReportData.suggestedAlternate || 'Exercise caution and reduce transit speed.'
    };

    setReports(prev => [newEntry, ...prev]);

    if (soundEnabled) {
      playAlertChime();
    }

    return newEntry;
  };

  // Calculate nearby hazards for alert radar
  const nearbyHazards = reports
    .filter(rep => rep.status !== 'resolved')
    .map(rep => {
      const distanceKm = calculateDistanceKm(userLocation.lat, userLocation.lng, rep.lat, rep.lng);
      return { ...rep, distanceKm: Number(distanceKm.toFixed(2)) };
    })
    .filter(rep => rep.distanceKm <= alertRadiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  // Reset demo data to default initial state
  const resetDemoData = () => {
    localStorage.removeItem('roadrakshak_reports');
    setReports(INITIAL_REPORTS);
  };

  return (
    <RoadSafetyContext.Provider
      value={{
        reports,
        userLocation,
        setUserLocation,
        alertRadiusKm,
        setAlertRadiusKm,
        soundEnabled,
        setSoundEnabled,
        playAlertChime,
        activeTab,
        setActiveTab,
        selectedHazardId,
        setSelectedHazardId,
        isReportModalOpen,
        setIsReportModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedStatusFilter,
        setSelectedStatusFilter,
        upvoteReport,
        addReport,
        checkDuplicateReport,
        nearbyHazards,
        resetDemoData,
        categories: HAZARD_CATEGORIES,
        statuses: VERIFICATION_STATUSES
      }}
    >
      {children}
    </RoadSafetyContext.Provider>
  );
}

export function useRoadSafety() {
  const context = useContext(RoadSafetyContext);
  if (!context) {
    throw new Error('useRoadSafety must be used within a RoadSafetyProvider');
  }
  return context;
}
