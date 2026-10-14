import React, { useState } from 'react';
import { useRoadSafety } from '../context/RoadSafetyContext';
import { analyzeHazardText } from '../utils/aiAnalyzer';
import { AI_PRESET_EXAMPLES } from '../data/initialData';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  Languages, 
  Copy, 
  EyeOff, 
  ThumbsUp, 
  Share2,
  HelpCircle,
  Truck
} from 'lucide-react';

export default function AIReportWriter() {
  const { reports, addReport, upvoteReport, setActiveTab, setSelectedHazardId } = useRoadSafety();

  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submittedReportId, setSubmittedReportId] = useState(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleRunAnalysis = (textToAnalyze = inputText) => {
    if (!textToAnalyze.trim()) return;
    setIsAnalyzing(true);
    setSubmittedReportId(null);

    // Realistic small AI processing timeout
    setTimeout(() => {
      const result = analyzeHazardText(textToAnalyze, reports);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleSelectPreset = (presetText) => {
    setInputText(presetText);
    handleRunAnalysis(presetText);
  };

  const handlePublishReport = () => {
    if (!analysisResult) return;

    const newReport = addReport({
      category: analysisResult.category,
      title: analysisResult.titleEn,
      titleTe: analysisResult.titleTe,
      description: analysisResult.descriptionEn,
      descriptionTe: analysisResult.titleTe,
      location: analysisResult.location,
      lat: analysisResult.lat,
      lng: analysisResult.lng,
      severity: analysisResult.severity,
      isAnonymous: isAnonymous,
      suggestedAlternate: analysisResult.precautionEn
    });

    setSubmittedReportId(newReport.id);
  };

  const copyDispatchToClipboard = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult.dispatchDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="ai-report-writer-page">
      {/* Header Banner */}
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
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
          }}>
            <Bot size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              RoadRakshak AI Assistant
              <span className="telugu-font" style={{ fontSize: '1rem', color: '#60a5fa', fontWeight: 600 }}>
                (తెలుగు & ఇంగ్లీష్)
              </span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Type or paste rough citizen observations in English, Telugu (తెలుగు), or Tanglish. AI structures it into official civic dispatches and map alerts.
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 'var(--radius-full)',
          padding: '6px 14px',
          fontSize: '0.78rem',
          color: '#93c5fd'
        }}>
          <Sparkles size={14} color="#60a5fa" />
          <span>Client-Side Zero-Latency NLP Engine</span>
        </div>
      </div>

      {/* Main Grid: Left Input & Presets, Right Structured AI Output */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px'
      }}>
        {/* Left Column: Input Form & Sample Voice/Text Presets */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                Commuter Observation Note
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                English, Telugu script, or Tanglish accepted
              </span>
            </div>

            <textarea
              className="form-textarea telugu-font"
              rows={5}
              placeholder="ఉదాహరణ: 'తోలిచౌకి వద్ద మోకాలి లోతు నీరు నిలిచిపోయింది, కార్లు ఆగిపోయాయి' or 'Big tree fallen on Jubilee Hills road 36 blocking traffic'..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ fontSize: '0.95rem', lineHeight: 1.6 }}
            />
          </div>

          {/* Action Button */}
          <button
            className="btn-primary"
            onClick={() => handleRunAnalysis()}
            disabled={!inputText.trim() || isAnalyzing}
            style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
          >
            {isAnalyzing ? (
              <span>Analyzing NLP Tokens...</span>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Structure with RoadRakshak AI</span>
              </>
            )}
          </button>

          {/* Quick Demo Presets */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Languages size={15} color="#38bdf8" /> One-Click Presets for Hackathon Testing:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {AI_PRESET_EXAMPLES.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectPreset(preset.text)}
                  style={{
                    textAlign: 'left',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 12px',
                    transition: 'border-color 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f97316' }}>
                      {preset.label}
                    </span>
                    <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>
                      {preset.lang}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {preset.text}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction & Civic Dispatch Results */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#3b82f6" />
            AI Structured Incident Analysis
          </h3>

          {!analysisResult ? (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 20px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-subtle)',
              color: 'var(--text-muted)'
            }}>
              <Bot size={40} style={{ opacity: 0.4, marginBottom: '12px' }} />
              <h4 style={{ color: '#fff', marginBottom: '6px' }}>Awaiting Commuter Input</h4>
              <p style={{ fontSize: '0.85rem', maxWidth: '340px' }}>
                Type an incident description on the left or click any preset to see how RoadRakshak AI extracts structured hazard metadata in real time.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Duplicate Report Alert if found */}
              {analysisResult.hasDuplicate && (
                <div className="alert-box-warning" style={{ margin: 0, padding: '12px 14px' }}>
                  <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fef08a' }}>
                      Potential Duplicate Incident Detected!
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#fde68a', marginTop: '2px' }}>
                      A similar {analysisResult.duplicateReport.category.replace('_', ' ')} report exists nearby ({analysisResult.duplicateReport.location}).
                    </div>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        upvoteReport(analysisResult.duplicateReport.id);
                        setSelectedHazardId(analysisResult.duplicateReport.id);
                        setActiveTab('map');
                      }}
                      style={{ marginTop: '8px', fontSize: '0.75rem', padding: '4px 10px', color: '#f59e0b', borderColor: '#f59e0b' }}
                    >
                      <ThumbsUp size={13} /> Confirm Existing Report ({analysisResult.duplicateReport.id})
                    </button>
                  </div>
                </div>
              )}

              {/* Classification Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span className={`severity-pill severity-${analysisResult.severity.toLowerCase()}`}>
                  {analysisResult.severity} Severity
                </span>
                <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  Category: {analysisResult.category.replace('_', ' ').toUpperCase()}
                </span>
                <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  Language: {analysisResult.detectedLanguage}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  AI Confidence: {analysisResult.confidenceScore}%
                </span>
              </div>

              {/* Extracted Titles */}
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                  Generated Bilingual Title:
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  🇬🇧 {analysisResult.titleEn}
                </div>
                <div className="telugu-font" style={{ fontSize: '0.95rem', color: '#93c5fd', fontWeight: 600 }}>
                  🇮🇳 {analysisResult.titleTe}
                </div>
              </div>

              {/* Extracted Location & Landmark */}
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Extracted Landmark & Coordinates:
                </div>
                <div style={{ fontWeight: 700, color: '#f97316', marginTop: '2px' }}>
                  📍 {analysisResult.location}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  GPS: {analysisResult.lat.toFixed(4)} N, {analysisResult.lng.toFixed(4)} E
                </div>
              </div>

              {/* Precaution Advisory */}
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', marginBottom: '4px' }}>
                  Actionable Driver Safety Advisory:
                </div>
                <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginBottom: '4px' }}>
                  {analysisResult.precautionEn}
                </div>
                <div className="telugu-font" style={{ fontSize: '0.82rem', color: '#a7f3d0' }}>
                  {analysisResult.precautionTe}
                </div>
              </div>

              {/* Official Civic Dispatch Draft */}
              <div style={{ backgroundColor: '#070c18', border: '1px solid #1e293b', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                    Civic Transmission Draft (GHMC / Police / 112)
                  </span>
                  <button
                    onClick={copyDispatchToClipboard}
                    style={{ fontSize: '0.72rem', color: copiedDraft ? '#34d399' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Copy size={13} /> {copiedDraft ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.4 }}>
                  {analysisResult.dispatchDraft}
                </pre>
              </div>

              {/* Privacy Toggle & Direct Publish Action */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    style={{ accentColor: '#f97316' }}
                  />
                  <span>
                    <EyeOff size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    Publish as <strong>Anonymous Good Samaritan</strong> (Privacy Protection)
                  </span>
                </label>

                {submittedReportId ? (
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center', color: '#6ee7b7', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    Published to Community Safety Map as <strong>{submittedReportId}</strong>!
                    <div style={{ marginTop: '8px' }}>
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          setSelectedHazardId(submittedReportId);
                          setActiveTab('map');
                        }}
                        style={{ fontSize: '0.78rem', padding: '4px 12px' }}
                      >
                        View Live on Map
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={handlePublishReport}
                    style={{ width: '100%', padding: '10px' }}
                  >
                    <Send size={16} />
                    <span>Publish Report to Community Map (Starts as Unverified)</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
