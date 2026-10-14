// RoadRakshak AI — Sample Datasets and Config
// All sample reports are clearly labeled as demo data.

export const HAZARD_CATEGORIES = [
  { id: 'floods', label: 'Floods & Waterlogging', icon: 'Waves', color: '#0284c7', bg: '#e0f2fe', description: 'Water accumulation, submerged roads, drain overflow' },
  { id: 'fallen_trees', label: 'Fallen Trees & Debris', icon: 'Trees', color: '#16a34a', bg: '#dcfce7', description: 'Downed tree trunks, large branches blocking carriageway' },
  { id: 'potholes', label: 'Potholes & Broken Asphalt', icon: 'CircleAlert', color: '#ea580c', bg: '#ffedd5', description: 'Deep road depressions, tire puncture risks, crater clusters' },
  { id: 'blocked_roads', label: 'Blocked Roads & Landslides', icon: 'Ban', color: '#9333ea', bg: '#f3e8ff', description: 'Under construction without diversion, debris, barricades' },
  { id: 'accidents', label: 'Accidents & Collision', icon: 'ShieldAlert', color: '#dc2626', bg: '#fee2e2', description: 'Vehicle collisions, overturning, emergency triage required' },
  { id: 'dangerous_driving', label: 'Dangerous Driving & Rash Behavior', icon: 'Zap', color: '#ca8a04', bg: '#fef9c3', description: 'Wrong-side driving, reckless speeding, drunk driving suspicion' },
];

export const VERIFICATION_STATUSES = {
  unverified: {
    label: 'Under Review (Unverified)',
    badgeClass: 'badge-unverified',
    color: '#e11d48',
    description: 'Crowdsourced citizen report. Awaiting community verification or field validation.',
    icon: 'AlertTriangle'
  },
  community_verified: {
    label: 'Community Verified (3+ Citizens)',
    badgeClass: 'badge-verified',
    color: '#0284c7',
    description: 'Confirmed by multiple verified nearby drivers.',
    icon: 'CheckCheck'
  },
  authority_dispatched: {
    label: 'Civic Authority Dispatched',
    badgeClass: 'badge-dispatched',
    color: '#ea580c',
    description: 'Notified GHMC / Traffic Police / NHAI rescue teams on route.',
    icon: 'Truck'
  },
  resolved: {
    label: 'Resolved & Safe',
    badgeClass: 'badge-resolved',
    color: '#16a34a',
    description: 'Hazard cleared. Normal traffic movement restored.',
    icon: 'CheckCircle2'
  }
};

export const INITIAL_REPORTS = [
  {
    id: 'RR-2026-8401',
    category: 'floods',
    title: 'Severe Waterlogging at Tolichowki Underpass',
    titleTe: 'తోలిచౌకి అండర్‌పాస్ వద్ద తీవ్రమైన నీటి నిల్వ',
    description: 'Water level reached ~2 feet after sudden flash rain. Small hatchbacks and two-wheelers are getting stalled. Traffic moving at crawling pace.',
    descriptionTe: 'హఠాత్తుగా కురిసిన వర్షం వల్ల అండర్‌పాస్‌లో 2 అడుగుల మేర నీరు నిలిచిపోయింది. ద్విచక్ర వాహనాలు, కార్లు ఆగిపోతున్నాయి.',
    location: 'Tolichowki Flyover Underpass, Hyderabad',
    lat: 17.4082,
    lng: 78.4143,
    severity: 'Critical',
    reportedAt: '12 mins ago',
    timestamp: Date.now() - 12 * 60 * 1000,
    status: 'authority_dispatched',
    upvotes: 24,
    reporterName: 'Anonymous Good Samaritan',
    isAnonymous: true,
    photoUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    authorityNotes: 'GHMC Monsoon Emergency Action Team 4 dispatched with de-watering submersible pumps.',
    suggestedAlternate: 'Use Shaikpet Flyover upper deck towards Mehdipatnam to bypass waterlogged underpass.'
  },
  {
    id: 'RR-2026-8402',
    category: 'fallen_trees',
    title: 'Gulmohar Tree Uprooted on Road No. 36',
    titleTe: 'రోడ్ నెం. 36 పై పడిపోయిన గుల్మోహర్ చెట్టు',
    description: 'Massive tree trunk fallen across 2 out of 3 lanes right opposite Metro Pillar 18. Electric cables tangled in branches.',
    descriptionTe: 'మెట్రో పిల్లర్ 18 ఎదురుగా రోడ్డుపై భారీ చెట్టు కూలిపోయింది. విద్యుత్ తీగలు కొమ్మల్లో చిక్కుకున్నాయి.',
    location: 'Jubilee Hills Road No. 36, near Peddamma Temple',
    lat: 17.4342,
    lng: 78.4067,
    severity: 'High',
    reportedAt: '28 mins ago',
    timestamp: Date.now() - 28 * 60 * 1000,
    status: 'community_verified',
    upvotes: 18,
    reporterName: 'K. Sai Krishna',
    isAnonymous: false,
    photoUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=600&auto=format&fit=crop&q=80',
    authorityNotes: 'Traffic redirected to single lane. Forest & DRF team cutting branches.',
    suggestedAlternate: 'Divert through Road No. 10 or Durgam Cheruvu cable bridge road.'
  },
  {
    id: 'RR-2026-8403',
    category: 'potholes',
    title: 'Cluster of Deep Potholes on NH65 Highway',
    titleTe: 'NH65 హైవేపై ప్రమాదకర గుంతల సమూహం',
    description: 'Hidden beneath thin rainwater film, 3 consecutive deep craters causing sudden braking and two-wheeler tire punctures.',
    descriptionTe: 'వర్షపు నీటి కింద దాగి ఉన్న 3 పెద్ద గుంతలు. బైక్ రైడర్లు అదుపు తప్పి పడిపోతున్నారు.',
    location: 'Kukatpally Y Junction, towards Miyapur',
    lat: 17.4938,
    lng: 78.4011,
    severity: 'High',
    reportedAt: '45 mins ago',
    timestamp: Date.now() - 45 * 60 * 1000,
    status: 'community_verified',
    upvotes: 31,
    reporterName: 'Anonymous Driver',
    isAnonymous: true,
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    authorityNotes: 'Marked with warning cones by local traffic warden.',
    suggestedAlternate: 'Keep to the extreme right lane or reduce speed to under 25 km/h.'
  },
  {
    id: 'RR-2026-8404',
    category: 'accidents',
    title: 'Multi-Car Fender Bender on Flyover Ascent',
    titleTe: 'ఫ్లైఓవర్ ప్రవేశం వద్ద పలు కార్ల ప్రమాదం',
    description: '3-car pileup due to sudden braking. No fatal injuries reported. Ambulance and towing crane arriving shortly. Heavy tailback.',
    descriptionTe: 'హఠాత్తుగా బ్రేకులు వేయడం వల్ల 3 కార్లు ఒకదానికొకటి ఢీకొన్నాయి. ట్రాఫిక్ తీవ్రంగా స్తంభించింది.',
    location: 'Gachibowli Bio-Diversity Flyover Entry',
    lat: 17.4431,
    lng: 78.3774,
    severity: 'Critical',
    reportedAt: '8 mins ago',
    timestamp: Date.now() - 8 * 60 * 1000,
    status: 'unverified',
    upvotes: 7,
    reporterName: 'V. Rajesh (Commuter)',
    isAnonymous: false,
    photoUrl: 'https://images.unsplash.com/photo-1598197748967-b4674cb3c266?w=600&auto=format&fit=crop&q=80',
    authorityNotes: '108 Ambulance en-route. Cyberabad Traffic Police on spot managing lane diversion.',
    suggestedAlternate: 'Take ground level surface road under the flyover towards Mindspace.'
  },
  {
    id: 'RR-2026-8405',
    category: 'blocked_roads',
    title: 'Emergency Pipeline Excavation without Signboard',
    titleTe: 'హెచ్చరిక బోర్డు లేకుండా పైప్‌లైన్ తవ్వకాలు',
    description: 'Road dug up for stormwater line. Deep ditch cut open across entire left lane without reflective safety barriers.',
    descriptionTe: 'డ్రైనేజీ పైప్‌లైన్ కోసం రోడ్డు తవ్వారు. రాత్రిపూట కనిపించే హెచ్చరిక బోర్డులు లేవు.',
    location: 'Madhapur 100 Feet Road, near Ayyappa Society',
    lat: 17.4529,
    lng: 78.3912,
    severity: 'Moderate',
    reportedAt: '1 hr ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    status: 'community_verified',
    upvotes: 14,
    reporterName: 'Anonymous Citizen',
    isAnonymous: true,
    photoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80',
    authorityNotes: 'Contractor instructed to place glowing reflective drums.',
    suggestedAlternate: 'Use Hitec City rear road via Silparamam.'
  },
  {
    id: 'RR-2026-8406',
    category: 'dangerous_driving',
    title: 'Heavy Truck Driving Wrong-Side on Highway Ramp',
    titleTe: 'హైవే ర్యాంప్‌పై రాంగ్ రూట్‌లో వస్తున్న భారీ ట్రక్కు',
    description: 'Commercial dumper truck entering expressway exit ramp in reverse/wrong-side direction to skip U-turn. Serious collision threat.',
    descriptionTe: 'యూ-టర్న్ తప్పించుకోవడానికి ఎక్స్‌ప్రెస్‌వే ఎగ్జిట్ వద్ద రాంగ్ రూట్‌లో వచ్చిన లారీ. ఎదురుగా వచ్చే వాహనాలకు పెను ప్రమాదం.',
    location: 'PVNR Expressway Pillar 114 Ramp, Attapur',
    lat: 17.3758,
    lng: 78.4326,
    severity: 'Critical',
    reportedAt: '5 mins ago',
    timestamp: Date.now() - 5 * 60 * 1000,
    status: 'unverified',
    upvotes: 9,
    reporterName: 'Anonymous Driver',
    isAnonymous: true,
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    authorityNotes: 'Traffic Police control room alerted via CCTV Feed 22.',
    suggestedAlternate: 'Slow down immediately, flash hazard lights, move to outer shoulder.'
  },
  {
    id: 'RR-2026-8407',
    category: 'potholes',
    title: 'Repaired & Cleared: Pothole Patching at Cyber Towers',
    titleTe: 'సమస్య పరిష్కారం: సైబర్ టవర్స్ వద్ద గుంతల మరమ్మత్తు',
    description: 'Deep road cavity reported earlier was completely filled and leveled with cold asphalt mix. Smooth passage restored.',
    descriptionTe: 'సైబర్ టవర్స్ జంక్షన్ వద్ద ఉన్న పెద్ద గుంతలను జీహెచ్‌ఎంసీ సిబ్బంది తారుతో పూడ్చివేశారు.',
    location: 'Cyber Towers Junction, Hitec City',
    lat: 17.4504,
    lng: 78.3808,
    severity: 'Low',
    reportedAt: '3 hrs ago',
    timestamp: Date.now() - 180 * 60 * 1000,
    status: 'resolved',
    upvotes: 42,
    reporterName: 'GHMC Ward Inspector & Citizens',
    isAnonymous: false,
    photoUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    authorityNotes: 'Quality inspection verified. Clearance marked resolved.',
    suggestedAlternate: 'Road fully open and safe for normal driving.'
  }
];

export const DEMO_STATISTICS = {
  activeHazardsCount: 148,
  criticalAlertsCount: 6,
  communityVerificationRate: '82%',
  avgClearanceTimeHours: '3.8 hrs',
  hazardsAvoidedThisWeek: '1,420+',
  totalCitizensProtected: '48,500+',
  categoryBreakdown: [
    { category: 'Potholes & Road Damage', count: 52, percentage: 35, color: '#ea580c' },
    { category: 'Floods & Waterlogging', count: 34, percentage: 23, color: '#0284c7' },
    { category: 'Fallen Trees & Obstacles', count: 21, percentage: 14, color: '#16a34a' },
    { category: 'Blocked Roads & Works', count: 18, percentage: 12, color: '#9333ea' },
    { category: 'Accidents & Collision', count: 14, percentage: 10, color: '#dc2626' },
    { category: 'Dangerous Driving', count: 9, percentage: 6, color: '#ca8a04' }
  ],
  hotspotCorridors: [
    { name: 'Kukatpally - Miyapur Corridor (NH65)', hazardCount: 19, riskLevel: 'High Risk', primaryIssue: 'Deep Potholes & Flash Flooding' },
    { name: 'Tolichowki - Gachibowli Radial Road', hazardCount: 16, riskLevel: 'Severe', primaryIssue: 'Flyover Underpass Waterlogging' },
    { name: 'Jubilee Hills Road No. 36 & 45', hazardCount: 11, riskLevel: 'Moderate', primaryIssue: 'Fallen Tree Branches & Slope Turns' },
    { name: 'PVNR Expressway - Airport Corridor', hazardCount: 8, riskLevel: 'Moderate', primaryIssue: 'High Speed Rash Driving & Ramp Blockage' }
  ]
};

export const EMERGENCY_NUMBERS = [
  {
    number: '112',
    title: 'National Emergency Helpline (112 India)',
    titleTe: 'జాతీయ అత్యవసర హెల్ప్‌లైన్ 112',
    subtitle: 'All-in-One Emergency: Police, Ambulance, Fire, Disaster',
    priority: true,
    action: 'tel:112',
    badge: 'Primary 24/7 National Hub'
  },
  {
    number: '100',
    title: 'Police Assistance',
    titleTe: 'పోలీస్ సహాయం',
    subtitle: 'Traffic incident, hit-and-run, dangerous driver reporting',
    priority: false,
    action: 'tel:100',
    badge: 'Law & Order'
  },
  {
    number: '108',
    title: 'Emergency Medical & Trauma Ambulance',
    titleTe: 'అత్యవసర అంబులెన్స్',
    subtitle: 'Critical injury, paramedic rescue, trauma transport',
    priority: true,
    action: 'tel:108',
    badge: 'Free Ambulance'
  },
  {
    number: '101',
    title: 'Fire & Emergency Rescue',
    titleTe: 'అగ్నిమాపక & రెస్క్యూ సేవలు',
    subtitle: 'Vehicle fire, fallen tree removal, trapped passenger extraction',
    priority: false,
    action: 'tel:101',
    badge: 'Fire Services'
  },
  {
    number: '1073',
    title: 'National Highway Road Safety Helpline (NHAI)',
    titleTe: 'జాతీయ రహదారుల హెల్ప్‌లైన్ (NHAI)',
    subtitle: 'Highway breakdown, emergency patrol, towing on national highways',
    priority: false,
    action: 'tel:1073',
    badge: 'Highway Patrol'
  },
  {
    number: '1098',
    title: 'Childline & Vulnerable Commuters',
    titleTe: 'చైల్డ్‌లైన్ హెల్ప్‌లైన్',
    subtitle: 'Protection for children and families stranded in road crisis',
    priority: false,
    action: 'tel:1098',
    badge: 'Child Welfare'
  }
];

export const AI_PRESET_EXAMPLES = [
  {
    lang: 'Telugu',
    label: 'తెలుగు: రోడ్డుపై నీరు నిలిచిపోవడం (Flood)',
    text: 'తోలిచౌకి ఫ్లైఓవర్ కింద భారీ వర్షం వల్ల మోకాలి లోతు నీళ్లు నిలిచాయి. కార్లు, ఆటోలు ఆగిపోయాయి. పెద్ద ఎత్తున ట్రాఫిక్ జామ్ అయింది. వెంటనే సహాయం కావాలి.'
  },
  {
    lang: 'Telugu',
    label: 'తెలుగు: పెద్ద చెట్టు కూలిపోవడం (Fallen Tree)',
    text: 'జూబ్లీహిల్స్ రోడ్ నెంబర్ 36 వద్ద ఒక పెద్ద చెట్టు రోడ్డుపై పడిపోయింది. రోడ్డు రెండు వైపులా బ్లాక్ అయింది, కరెంట్ తీగలు తెగిపడ్డాయి.'
  },
  {
    lang: 'Tanglish',
    label: 'Tanglish: గుంతల ప్రమాదం (Potholes)',
    text: 'Kukatpally Y junction daggara chaala pedda potholes unnayi, rain water valla kanipiyatledu, 2 bikes slip ayyi padipoyaru, please warn commuters.'
  },
  {
    lang: 'English',
    label: 'English: Major Road Collision (Accident)',
    text: 'Serious accident near Gachibowli Bio-diversity flyover ramp. Two cars collided and oil is spilling on the road. Need traffic police and ambulance urgently.'
  },
  {
    lang: 'English',
    label: 'English: Rash Truck Driving (Dangerous Driving)',
    text: 'A cement mixer truck is driving rashly on the wrong side near Miyapur metro station, almost hit multiple scooters. License plate partially visible.'
  }
];

// Simulated Corridor Routes for Safe Navigation Advisor
export const ROUTE_SIMULATION = {
  origin: 'Hitec City Cyber Towers',
  destination: 'Mehdipatnam Bus Terminal',
  dangerRoute: {
    name: 'Standard Route via Tolichowki Underpass',
    distance: '11.4 km',
    estimatedTime: '48 mins (Heavy Delays)',
    safetyScore: 38,
    hazardsAlongRoute: [
      { id: 'RR-2026-8401', name: 'Severe Flood at Tolichowki Underpass (2ft deep)', severity: 'Critical' },
      { id: 'RR-2026-8404', name: 'Bio-Diversity Ramp Traffic Backlog', severity: 'High' }
    ],
    status: 'High Hazard Risk — Not Recommended'
  },
  safeRoute: {
    name: 'RoadRakshak Safe Detour via Shaikpet Flyover & Gachibowli ORR Bypass',
    distance: '13.1 km',
    estimatedTime: '26 mins (Smooth Traffic)',
    safetyScore: 94,
    hazardsAlongRoute: [],
    benefits: [
      'Bypasses submerged Tolichowki underpass completely',
      'Continuous elevated flyover with active drainage',
      'Real-time verified zero obstruction path',
      'Saves estimated 22 mins of stalled traffic risk'
    ],
    status: 'Verified Safe Route — Recommended'
  }
};
