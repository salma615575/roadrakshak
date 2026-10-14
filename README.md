# RoadRakshak AI — Every Warning Matters
### రహదారి రక్షక్ (Every Warning Matters) — Indian Civic Road Safety Network

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Emergency Helpline](https://img.shields.io/badge/Emergency-Dial%20112%20India-red?logo=target)](tel:112)
[![Bilingual](https://img.shields.io/badge/Bilingual-English%20%7C%20%E0%B0%A4%E0%B1%86%E0%B0%B2%E0%B1%81%E0%B0%97%E0%B1%81-blue)](#-5-ai-report-writing-assistant-english--telugu)

**RoadRakshak AI** is a civic road-safety platform designed to prevent highway collisions and urban monsoon casualties through crowdsourced hazard intelligence, proximity radar warnings, safer route recommendations, and bilingual English/Telugu AI incident triage.

---

## 🌟 Core Feature Overview

### 📊 1. Road-Safety Statistics Dashboard
- **Live Key Performance Indicators**: Real-time counters for active hazards, critical threats, community verification rate, and average civic clearance turnaround time.
- **Monsoon & Highway Hazard Breakdown**: Visual progress bars and counters for:
  - 🌊 Floods & Waterlogging
  - 🌳 Fallen Trees & Debris
  - 🕳️ Potholes & Broken Asphalt
  - 🚧 Blocked Roads & Unmarked Digging
  - 💥 Accidents & Collisions
  - ⚡ Dangerous Driving & Wrong-Side Rash Driving
- **Hotspot Corridor Rankings**: Proactive alerts on high-risk sectors (e.g., Kukatpally-Miyapur NH65, Tolichowki Underpass, Jubilee Hills Road 36, PVNR Expressway).

### 🗺️ 2. Community Hazard Map
- Interactive, responsive map powered by Leaflet with custom color-coded pins.
- **Visual Status Badges**: Distinguishes between `[Under Review (Unverified)]`, `[Community Verified]`, `[Authority Dispatched]`, and `[Resolved]`.
- **Corridor Route Simulation**: Visually highlights hazardous paths in dashed red while overlaying recommended safe detour routes in emerald green with time and safety score estimates.
- One-click eyewitness confirmations directly from map pin cards.

### ⚠️ 3. Hazard Alert Interface & Proximity Radar
- **Proximity Radar Scanner**: Computes distance (in km) from user's current GPS position to all active road threats.
- **Coverage Radius Selector**: Switch between 1 km (Immediate Danger Zone), 3 km, and 5 km radar coverage.
- **Emergency Audio Alert**: Web Audio API synthesized high-urgency chime that sounds when critical hazards enter the proximity radius.
- **Safe Route Advisor**: Side-by-side comparison between obstructed default corridors (Safety Score: 38/100) and elevated safe bypass routes (Safety Score: 94/100).

### 🤖 4. AI Report-Writing Assistant (English & Telugu)
- **Bilingual & Tanglish Parsing**: Accepts rough notes in English, Telugu script (`తోలిచౌకి ఫ్లైఓవర్ కింద నీళ్లు నిలిచాయి`), or phonetic Tanglish (`chettu padipoyindi road block ayyindi`).
- **Automated NLP Extraction**:
  - Hazard category classification
  - Severity assessment (Critical, High, Moderate, Low)
  - Landmark and corridor detection
  - Bilingual titles and driver safety advisories (English & Telugu side-by-side)
  - Official Civic Dispatch Draft formatted for GHMC, Cyberabad/Hyderabad Traffic Police, or NHAI.
- **One-Click Presets**: Bundled with realistic hackathon demo scenarios for quick evaluation.

### 🚨 5. Emergency Help Hub (Dial 112 India)
- **Prominent 112 Direct Dial**: One-tap access to India's unified 24x7 National Emergency Helpline (`tel:112`).
- **SOS Geolocation Beacon**: Instant latitude and longitude display with one-click "Copy GPS Coordinates" and "Share SOS via WhatsApp" containing emergency links.
- **Dedicated Helplines Directory**:
  - 100 — Police Assistance
  - 108 — Emergency Medical & Ambulance
  - 101 — Fire & Rescue Services
  - 1073 — National Highway Road Safety (NHAI)
  - 1098 — Childline Support
- **DRABC Protocol**: First-aid guidelines for citizen first responders at road accident scenes.

### 🔍 6. End-to-End Status Tracking & Duplicate Prevention
- **Unique Report ID Lookup**: Track incident progress (e.g., `RR-2026-8401`).
- **4-Stage Resolution Stepper**:
  1. *Incident Filed* (Unverified citizen upload)
  2. *Community Triage* (3+ eyewitness confirmations)
  3. *Authority Dispatched* (Civic crews / police DRF en-route)
  4. *Hazard Cleared* (Normal traffic restored)
- **Duplicate-Report Warning Engine**: Automatically alerts users if a similar hazard category is detected within 600m of an existing report, prompting motorists to upvote rather than cluttering civic dispatch.

### 🛡️ 7. Privacy Protection & Good Samaritan Safeguards
- **Anonymous Reporting**: Citizens can broadcast hazards anonymously as "Anonymous Good Samaritan" without sharing phone numbers or personal identities.
- **Transparent Labelling**: Every citizen submission is clearly marked as `[Under Review (Unverified)]` until verified by community peers.
- **Legal Protection**: Highlights protections under Section 134A of the Motor Vehicles Amendment Act, 2019, safeguarding citizens assisting road crash victims from harassment.

---

## 💻 Running the Application in PowerShell

In Windows PowerShell, scripts like `npm.ps1` are often blocked by the default execution policy (`Restricted`). Always use **`npm.cmd`** in PowerShell:

### 1. Install Dependencies
```powershell
npm.cmd install
```

### 2. Start Local Development Server
```powershell
npm.cmd run dev
```

The application will start on [http://localhost:3000](http://localhost:3000).

### 3. Build for Production
```powershell
npm.cmd run build
```

### 4. Preview Production Build
```powershell
npm.cmd run preview
```

---

## 📁 Project Architecture

```
RoadRakshak-ai/
├── .gitignore                   # Excludes node_modules, dist, secrets
├── index.html                   # HTML entry with Leaflet & Indian typography
├── package.json                 # Project dependencies & Vite scripts
├── vite.config.js               # Vite build configuration (Port 3000)
├── README.md                    # Documentation & setup guide
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Main layout & module router
    ├── index.css                # High-contrast road safety design system
    ├── context/
    │   └── RoadSafetyContext.jsx # State, simulated GPS, audio chime & deduplication
    ├── data/
    │   └── initialData.js       # Preloaded Indian road safety sample datasets
    ├── utils/
    │   └── aiAnalyzer.js        # Bilingual English/Telugu client-side NLP engine
    └── components/
        ├── Header.jsx           # Nav, demo banner, sound toggle & 112 button
        ├── Dashboard.jsx        # Stats overview, categories & live feed
        ├── CommunityMap.jsx     # Leaflet interactive map & route simulation
        ├── HazardAlerts.jsx     # Proximity radar & safe route advisor
        ├── AIReportWriter.jsx   # Telugu/English NLP assistant & presets
        ├── EmergencyHelp.jsx    # Prominent 112 dial, SOS beacon & helplines
        ├── StatusTracker.jsx    # Report ID search & lifecycle stepper
        ├── SafetyInsights.jsx   # Deduplication rules, privacy & analytics
        └── ReportHazardModal.jsx# Manual reporting modal with duplicate alerts
```

---

## 🔒 Important Hackathon Disclaimers

- **Demo Data Notice**: All initial incident locations, photos, and statistics are realistic sample datasets provided for hackathon demonstration.
- **No Live Emergency Transmission**: Calling 112 uses the standard device dialer (`tel:112`). No automated mock 112 emergency calls are generated in demo mode.
- **Driver Safety**: Never operate mobile applications while actively operating a vehicle. RoadRakshak AI is intended for use by passengers, parked commuters, or in hands-free audio radar mode.
