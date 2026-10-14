import React, { useState, useEffect } from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { 
  X, 
  PlusCircle, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Camera, 
  EyeOff, 
  ThumbsUp, 
  ShieldAlert,
  Sparkles,
  Waves,
  Trees,
  CircleAlert,
  Ban,
  Zap
} from 'lucide-react';

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Waterlogging / Flood', url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80' },
  { label: 'Fallen Tree', url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=600&auto=format&fit=crop&q=80' },
  { label: 'Deep Pothole', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80' },
  { label: 'Accident Scene', url: 'https://images.unsplash.com/photo-1598197748967-b4674cb3c266?w=600&auto=format&fit=crop&q=80' },
  { label: 'Road Barrier / Works', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80' },
  { label: 'Rash Truck / Speeding', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80' }
];

export default function ReportHazardModal() {
  const { 
    isReportModalOpen, 
    setIsReportModalOpen, 
    addReport, 
    categories, 
    checkDuplicateReport, 
    upvoteReport, 
    userLocation,
    setSelectedHazardId,
    setActiveTab
  } = useRoadSafety();

  const [category, setCategory] = useState('potholes');
  const [severity, setSeverity] = useState('High');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState(userLocation.name);
  const [lat, setLat] = useState(userLocation.lat);
  const [lng, setLng] = useState(userLocation.lng);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterName, setReporterName] = useState('Citizen Commuter');
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_PHOTO_PRESETS[2].url);
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Check for duplicate hazard when category or location changes
  useEffect(() => {
    if (isReportModalOpen) {
      const dup = checkDuplicateReport(category, lat, lng, locationName);
      setDuplicateWarning(dup || null);
    }
  }, [category, lat, lng, locationName, isReportModalOpen]);

  if (!isReportModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please provide a brief hazard description.');
      return;
    }

    const newReport = addReport({
      category,
      severity,
      title: title.trim() || `Citizen Alert: ${category.replace('_', ' ').toUpperCase()}`,
      description: description.trim(),
      location: locationName.trim() || 'Highway Sector, Hyderabad',
      lat: Number(lat),
      lng: Number(lng),
      isAnonymous,
      reporterName: isAnonymous ? 'Anonymous Good Samaritan' : reporterName,
      photoUrl: selectedPhoto
    });

    setSuccessMessage(`Hazard report ${newReport.id} successfully broadcasted! It is now visible on the live map under community review.`);

    setTimeout(() => {
      setSuccessMessage(null);
      setIsReportModalOpen(false);
      setSelectedHazardId(newReport.id);
      setActiveTab('map');
    }, 1400);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsReportModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
              <PlusCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>Report Road Hazard</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Citizen warning for potholes, waterlogging, accidents, and blockages
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReportModalOpen(false)}
            style={{ color: 'var(--text-muted)', padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Success notification */}
            {successMessage && (
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <CheckCircle2 size={18} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* DUPLICATE WARNING ALERT BANNER */}
            {duplicateWarning && (
              <div className="alert-box-warning" style={{ margin: 0 }}>
                <AlertTriangle size={22} color="#f59e0b" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fef08a' }}>
                    ⚠️ Potential Duplicate Report Warning
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#fde68a', marginTop: '2px' }}>
                    A similar <strong>{duplicateWarning.category.replace('_', ' ')}</strong> was already reported nearby ({duplicateWarning.location}, ID: {duplicateWarning.id}).
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        upvoteReport(duplicateWarning.id);
                        setIsReportModalOpen(false);
                        setSelectedHazardId(duplicateWarning.id);
                        setActiveTab('map');
                      }}
                      style={{ fontSize: '0.75rem', padding: '4px 10px', color: '#f59e0b', borderColor: '#f59e0b' }}
                    >
                      <ThumbsUp size={13} /> Upvote Existing Report Instead
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Category & Severity Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Hazard Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    const matchedPreset = SAMPLE_PHOTO_PRESETS.find(p => p.label.toLowerCase().includes(e.target.value.split('_')[0]));
                    if (matchedPreset) setSelectedPhoto(matchedPreset.url);
                  }}
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Severity Level</label>
                <select
                  className="form-select"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="Critical">Critical (Immediate Danger)</option>
                  <option value="High">High (Major Risk)</option>
                  <option value="Moderate">Moderate (Caution Required)</option>
                  <option value="Low">Low (Minor Inconvenience)</option>
                </select>
              </div>
            </div>

            {/* Title / Summary */}
            <div className="form-group">
              <label className="form-label">Incident Headline / Summary</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Deep crater on left lane after flyover..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Location & Coordinates */}
            <div className="form-group">
              <label className="form-label">Location / Landmark Description</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Near Peddamma Temple, Jubilee Hills Road 36..."
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
              />
            </div>

            {/* Detailed Description */}
            <div className="form-group">
              <label className="form-label">Observations & Detour Advice for Drivers</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Describe road blockage, water depth, fallen branches, or exact lanes impacted..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Evidence Photo Selector */}
            <div className="form-group">
              <label className="form-label">Attach Photo Evidence (Select Demo Scene)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {SAMPLE_PHOTO_PRESETS.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedPhoto(photo.url)}
                    style={{
                      height: '60px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: selectedPhoto === photo.url ? '2px solid #f97316' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <img src={photo.url} alt={photo.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', bottom: '2px', left: '2px', right: '2px', fontSize: '0.62rem', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', padding: '1px 3px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {photo.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Protection Checkbox */}
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem' }}>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  style={{ accentColor: '#f97316' }}
                />
                <span style={{ color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <EyeOff size={14} color="#34d399" />
                  Privacy Protection: Submit Anonymously (Do not show my name)
                </span>
              </label>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', paddingLeft: '22px' }}>
                Your identity and phone number will not be published. Report will appear as "Anonymous Good Samaritan".
              </div>
            </div>

            {/* Unverified Triage Notice */}
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={14} color="#f97316" />
              <span>
                To protect against misinformation, all citizen submissions start with a clear <strong>[Under Review (Unverified)]</strong> label until 3+ commuters confirm it.
              </span>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsReportModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <PlusCircle size={16} /> Broadcast Hazard Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
