// RoadRakshak AI — Bilingual Telugu & English Intelligent Report Parser
// Provides immediate, client-side, zero-latency NLP structuring with clear transparent indicators.

export function analyzeHazardText(inputText, existingReports = []) {
  if (!inputText || !inputText.trim()) {
    return null;
  }

  const raw = inputText.trim();
  const lower = raw.toLowerCase();

  // Detect script
  const isTeluguScript = /[\u0C00-\u0C7F]/.test(raw);
  const isTanglish = !isTeluguScript && (
    lower.includes('daggara') || lower.includes('chettu') || lower.includes('pedda') ||
    lower.includes('neellu') || lower.includes('guntha') || lower.includes('valla') ||
    lower.includes('padipoyindi') || lower.includes('chaala') || lower.includes('kavali')
  );

  let detectedLanguage = 'English';
  if (isTeluguScript) detectedLanguage = 'Telugu (తెలుగు)';
  else if (isTanglish) detectedLanguage = 'Tanglish (Telugu in Latin script)';

  // Category Scoring
  const scores = {
    floods: 0,
    fallen_trees: 0,
    potholes: 0,
    blocked_roads: 0,
    accidents: 0,
    dangerous_driving: 0,
  };

  // Keyword mappings
  const floodKeywords = ['flood', 'water', 'waterlogging', 'submerged', 'rain', 'drain', 'canal', 'underpass water', 'neellu', 'varada', 'నీరు', 'వరద', 'మునిగిపోయింది', 'వర్షం', 'నీళ్లు', 'మునక'];
  const treeKeywords = ['tree', 'branch', 'fallen tree', 'uprooted', 'trunk', 'electric wire', 'chettu', 'padipoyindi', 'చెట్టు', 'కొమ్మ', 'కూలిపోయింది', 'చెట్లు'];
  const potholeKeywords = ['pothole', 'potholes', 'crater', 'broken road', 'skid', 'puncture', 'deep hole', 'guntha', 'gunthalu', 'గుంత', 'గుంతలు', 'రోడ్డు పగిలింది'];
  const blockedKeywords = ['block', 'blocked', 'closed', 'construction', 'digging', 'pipeline', 'barricade', 'debris', 'మూసివేశారు', 'తవ్వారు', 'బ్లాక్', 'బారికేడ్', 'దారి మళ్లింపు'];
  const accidentKeywords = ['accident', 'crash', 'collision', 'injured', 'injury', 'ambulance', 'overturn', 'blood', 'car hit', 'ప్రమాదం', 'ఢీకొన్నాయి', 'గాయాలు', 'అంబులెన్స్', 'ఆక్సిడెంట్'];
  const rashKeywords = ['rash', 'speeding', 'wrong side', 'wrong route', 'drunk', 'reckless', 'dumper', 'tailgating', 'రాంగ్ రూట్', 'వేగంగా', 'మద్యం', 'విచ్చలవిడిగా'];

  floodKeywords.forEach(k => { if (lower.includes(k) || raw.includes(k)) scores.floods += 3; });
  treeKeywords.forEach(k => { if (lower.includes(k) || raw.includes(k)) scores.fallen_trees += 3; });
  potholeKeywords.forEach(k => { if (lower.includes(k) || raw.includes(k)) scores.potholes += 3; });
  blockedKeywords.forEach(k => { if (lower.includes(k) || raw.includes(k)) scores.blocked_roads += 3; });
  accidentKeywords.forEach(k => { if (lower.includes(k) || raw.includes(k)) scores.accidents += 3.5; });
  rashKeywords.forEach(k => { if (lower.includes(k) || raw.includes(k)) scores.dangerous_driving += 3; });

  // Pick highest scoring category or default
  let bestCategory = 'potholes';
  let maxScore = 0;
  for (const [cat, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = cat;
    }
  }

  // Severity Evaluation
  let severity = 'Moderate';
  const criticalTerms = ['urgent', 'emergency', 'blood', 'fatal', 'ambulance', 'stalled', 'submerged', '2 feet', 'high speed', 'life', 'వెంటనే', 'తీవ్రమైన', 'అంబులెన్స్', 'చాలా ప్రమాదకరం', 'urgent help'];
  const highTerms = ['severe', 'heavy', 'deep', 'blocked', 'fallen', 'spill', 'slip', 'crash', 'భారీ', 'పెద్ద', 'కూలిపోయింది', 'జామ్'];

  if (criticalTerms.some(t => lower.includes(t) || raw.includes(t)) || bestCategory === 'accidents') {
    severity = 'Critical';
  } else if (highTerms.some(t => lower.includes(t) || raw.includes(t))) {
    severity = 'High';
  }

  // Landmark Extraction
  const knownLandmarks = [
    { name: 'Tolichowki Underpass', match: ['tolichowki', 'తోలిచౌకి'], lat: 17.4082, lng: 78.4143 },
    { name: 'Jubilee Hills Road No. 36', match: ['jubilee hills', 'road no 36', 'road 36', 'peddamma', 'జూబ్లీహిల్స్'], lat: 17.4342, lng: 78.4067 },
    { name: 'Gachibowli Bio-Diversity Flyover', match: ['gachibowli', 'bio-diversity', 'biodiversity', 'గచ్చిబౌలి'], lat: 17.4431, lng: 78.3774 },
    { name: 'Kukatpally Y Junction (NH65)', match: ['kukatpally', 'miyapur', 'కూకట్‌పల్లి', 'మియాపూర్'], lat: 17.4938, lng: 78.4011 },
    { name: 'Hitec City Cyber Towers', match: ['cyber towers', 'hitec city', 'hitech city', 'సైబర్ టవర్స్', 'హైటెక్ సిటీ'], lat: 17.4504, lng: 78.3808 },
    { name: 'Madhapur 100 Feet Road', match: ['madhapur', 'ayyappa society', 'మాదాపూర్'], lat: 17.4529, lng: 78.3912 },
    { name: 'PVNR Expressway Pillar Ramp', match: ['pvnr', 'expressway', 'attapur', 'ఎక్స్‌ప్రెస్‌వే'], lat: 17.3758, lng: 78.4326 },
    { name: 'Mehdipatnam Bus Junction', match: ['mehdipatnam', 'మెహదీపట్నం'], lat: 17.3916, lng: 78.4428 }
  ];

  let detectedLandmark = null;
  for (const lm of knownLandmarks) {
    if (lm.match.some(m => lower.includes(m) || raw.includes(m))) {
      detectedLandmark = lm;
      break;
    }
  }

  const finalLocation = detectedLandmark ? detectedLandmark.name : 'Reported Highway Corridor (Awaiting Geolocation Pin)';
  const finalLat = detectedLandmark ? detectedLandmark.lat : 17.4200;
  const finalLng = detectedLandmark ? detectedLandmark.lng : 78.4100;

  // Title Generation
  const titles = {
    floods: {
      en: `Reported Waterlogging near ${detectedLandmark ? detectedLandmark.name : 'City Corridor'}`,
      te: `${detectedLandmark ? detectedLandmark.name : 'నగర రోడ్డు'} వద్ద రోడ్డుపై నీటి నిల్వ హెచ్చరిక`
    },
    fallen_trees: {
      en: `Downed Tree / Obstruction on ${detectedLandmark ? detectedLandmark.name : 'Carriageway'}`,
      te: `${detectedLandmark ? detectedLandmark.name : 'రోడ్డు'} పై చెట్టు కూలిపోవడం వల్ల ఆటంకం`
    },
    potholes: {
      en: `Hazardous Pothole Crater at ${detectedLandmark ? detectedLandmark.name : 'Traffic Sector'}`,
      te: `${detectedLandmark ? detectedLandmark.name : 'రహదారి'} వద్ద ప్రమాదకర గుంతల హెచ్చరిక`
    },
    blocked_roads: {
      en: `Road Blockage / Work Zone at ${detectedLandmark ? detectedLandmark.name : 'Corridor'}`,
      te: `${detectedLandmark ? detectedLandmark.name : 'ప్రాంతం'} లో రోడ్డు మూసివేత లేదా పనుల ఆటంకం`
    },
    accidents: {
      en: `Emergency Crash Collision Alert: ${detectedLandmark ? detectedLandmark.name : 'Junction'}`,
      te: `అత్యవసర ప్రమాద హెచ్చరిక: ${detectedLandmark ? detectedLandmark.name : 'జంక్షన్'} వద్ద ప్రమాదం`
    },
    dangerous_driving: {
      en: `Rash / Wrong-Way Driving Hazard near ${detectedLandmark ? detectedLandmark.name : 'Sector'}`,
      te: `${detectedLandmark ? detectedLandmark.name : 'సమీపంలో'} రాంగ్ రూట్ / ప్రమాదకర డ్రైవింగ్ రిపోర్ట్`
    }
  };

  // Precaution Advice
  const precautions = {
    floods: {
      en: 'Slow down below 20 km/h. Do not drive through standing water if depth is above wheel rim. Watch for submerged open manholes.',
      te: 'వేగాన్ని 20 కి.మీ కంటే తగ్గించండి. చక్రాల పైభాగం వరకు నీరు ఉంటే ముందుకు వెళ్లవద్దు. తెరిచి ఉన్న మ్యాన్‌హోల్స్ పట్ల జాగ్రత్తగా ఉండండి.'
    },
    fallen_trees: {
      en: 'Maintain lane discipline. Beware of exposed electrical wires. Turn on hazard flashers to warn trailing motorists.',
      te: 'లైన్ క్రమశిక్షణ పాటించండి. విద్యుత్ తీగల నుండి జాగ్రత్తగా ఉండండి. వెనుక వచ్చే వాహనాలను అప్రమత్తం చేయడానికి హజార్డ్ లైట్లు వేయండి.'
    },
    potholes: {
      en: 'Maintain safe braking distance. Two-wheeler riders must keep to the center-right lane to avoid deep shoulder ruts.',
      te: 'ముందు వాహనానికి తగినంత దూరం పాటించండి. బైక్ నడిపేవారు రోడ్డు అంచున ఉన్న పెద్ద గుంతల్లో పడకుండా జాగ్రత్త పడండి.'
    },
    blocked_roads: {
      en: 'Seek early diversion. Do not attempt unpaved narrow shoulders during peak transit hours.',
      te: 'ముందుగానే ప్రత్యామ్నాయ మార్గాన్ని ఎంచుకోండి. ట్రాఫిక్ ఎక్కువగా ఉన్నప్పుడు ప్రమాదకరమైన మట్టి మార్గాల్లోకి వెళ్లవద్దు.'
    },
    accidents: {
      en: 'Give immediate way to 108 Emergency Ambulances. Do not rubberneck or stop abruptly on flyover ascents.',
      te: '108 అంబులెన్స్ మరియు ఎమర్జెన్సీ వాహనాలకు దారి ఇవ్వండి. ఫ్లైఓవర్లపై హఠాత్తుగా వాహనాలు ఆపవద్దు.'
    },
    dangerous_driving: {
      en: 'Do not confront aggressive drivers. Keep extreme left lane and immediately report location to Highway Control 100/112.',
      te: 'ప్రమాదకర డ్రైవర్లను అడ్డుకోవద్దు. రోడ్డు ఎడమవైపున నెమ్మదిగా వెళ్తూ వెంటనే 100 లేదా 112 కి సమాచారం అందించండి.'
    }
  };

  // Duplicate Check against existing reports
  const duplicateCandidates = existingReports.filter(rep => {
    if (rep.status === 'resolved') return false;
    const sameCat = rep.category === bestCategory;
    const sameArea = detectedLandmark && rep.location.toLowerCase().includes(detectedLandmark.name.toLowerCase().split(' ')[0]);
    return sameCat && sameArea;
  });

  const hasDuplicate = duplicateCandidates.length > 0;
  const duplicateReport = hasDuplicate ? duplicateCandidates[0] : null;

  // Civic Dispatch Draft
  const dispatchDept = (bestCategory === 'accidents' || bestCategory === 'dangerous_driving')
    ? 'Cyberabad / Hyderabad Traffic Police & 112 Command'
    : (bestCategory === 'floods' || bestCategory === 'fallen_trees' || bestCategory === 'potholes')
      ? 'GHMC Disaster Response Force (DRF) & Engineering Wing'
      : 'NHAI / Municipal Road Safety Division';

  const dispatchDraft = `[CIVIC DISPATCH TRANSMISSION — ROADRAKSHAK AI]
TO: ${dispatchDept}
INCIDENT: ${titles[bestCategory].en}
SEVERITY: ${severity.toUpperCase()}
LOCATION: ${finalLocation}
COORDINATES: ${finalLat.toFixed(4)} N, ${finalLng.toFixed(4)} E
COMMUNITY SUMMARY: ${raw}
PRIMARY RISK: Immediate commuter hazard & secondary traffic disruption.
RECOMMENDED ACTION: Dispatch rapid field inspection unit & mark temporary reflective barricades.`;

  return {
    detectedLanguage,
    category: bestCategory,
    severity,
    location: finalLocation,
    lat: finalLat,
    lng: finalLng,
    titleEn: titles[bestCategory].en,
    titleTe: titles[bestCategory].te,
    descriptionEn: raw,
    precautionEn: precautions[bestCategory].en,
    precautionTe: precautions[bestCategory].te,
    dispatchDraft,
    hasDuplicate,
    duplicateReport,
    confidenceScore: Math.min(98, 70 + (maxScore * 4))
  };
}

// Distance calculation between coordinates (Haversine formula in KM)
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
