// src/data/mockData.js
// Predefined local datasets for ClimateShield AI (Frontend-Only simulated environment)

export const LOCATIONS = [
  { id: 'loc-1', name: 'Coastal Bay City', region: 'Eastern Seaboard', coordinates: '13.0827° N, 80.2707° E', lat: 13.0827, lon: 80.2707 },
  { id: 'loc-2', name: 'River Basin Metropolis', region: 'Northern Plains', coordinates: '28.6139° N, 77.2090° E', lat: 28.6139, lon: 77.2090 },
  { id: 'loc-3', name: 'Arid Valley District', region: 'Western Plateau', coordinates: '26.9124° N, 75.7873° E', lat: 26.9124, lon: 75.7873 },
  { id: 'loc-4', name: 'Highland Hill Crest', region: 'Southern Hills', coordinates: '11.4102° N, 76.6950° E', lat: 11.4102, lon: 76.6950 }
];

export const SCENARIO_PRESETS = {
  SUNNY: {
    id: 'sunny',
    name: 'Sunny Day',
    icon: 'Sun',
    condition: 'Sunny',
    temp: 31,
    tempFeelsLike: 33,
    wind: 18,
    windGusts: 18,
    sustainedWind: 12,
    rainfall: 0,
    humidity: 45,
    pressure: 1014,
    uvIndex: 8,
    aqi: 45,
    aqiStatus: 'Good',
    aqiStandard: 'India CPCB Standard',
    pm25: 22,
    pm10: 45,
    description: 'Clear skies with intense solar radiation and minimal cloud cover.',
    riskLevel: 'LOW',
    riskScore: 18,
    summary: 'Normal operational conditions with mild UV elevation during peak hours.',
    hazards: {
      flood: { level: 'LOW', score: 5, status: 'No threat detected' },
      heatwave: { level: 'LOW', score: 25, status: 'Moderate daytime warm spell' },
      cyclone: { level: 'LOW', score: 0, status: 'Calm atmospheric pressure' }
    },
    historicalTrends: [
      { time: '00:00', temp: 24, rainfall: 0, wind: 8 },
      { time: '04:00', temp: 23, rainfall: 0, wind: 6 },
      { time: '08:00', temp: 27, rainfall: 0, wind: 10 },
      { time: '12:00', temp: 32, rainfall: 0, wind: 14 },
      { time: '16:00', temp: 31, rainfall: 0, wind: 12 },
      { time: '20:00', temp: 28, rainfall: 0, wind: 9 },
      { time: '24:00', temp: 25, rainfall: 0, wind: 7 }
    ],
    alerts: []
  },
  WINDY: {
    id: 'windy',
    name: 'Windy Day',
    icon: 'Wind',
    condition: 'Windy',
    temp: 24,
    tempFeelsLike: 23,
    wind: 68,
    windGusts: 68,
    sustainedWind: 48,
    rainfall: 2,
    humidity: 58,
    pressure: 1006,
    uvIndex: 4,
    aqi: 72,
    aqiStatus: 'Satisfactory',
    aqiStandard: 'India CPCB Standard',
    pm25: 42,
    pm10: 72,
    description: 'Gusty continental breezes with occasional dust swirl and swaying utility lines.',
    riskLevel: 'MODERATE',
    riskScore: 42,
    summary: 'Elevated surface wind speeds. High-profile vehicles and lightweight structures need caution.',
    hazards: {
      flood: { level: 'LOW', score: 10, status: 'Dry drainage channels' },
      heatwave: { level: 'LOW', score: 5, status: 'Adequate thermal dissipation' },
      cyclone: { level: 'MODERATE', score: 45, status: 'Peripheral gust boundary monitoring' }
    },
    historicalTrends: [
      { time: '00:00', temp: 22, rainfall: 0, wind: 24 },
      { time: '04:00', temp: 21, rainfall: 0, wind: 30 },
      { time: '08:00', temp: 23, rainfall: 1, wind: 40 },
      { time: '12:00', temp: 25, rainfall: 2, wind: 48 },
      { time: '16:00', temp: 24, rainfall: 1, wind: 52 },
      { time: '20:00', temp: 22, rainfall: 0, wind: 42 },
      { time: '24:00', temp: 21, rainfall: 0, wind: 35 }
    ],
    alerts: [
      {
        id: 'alt-wind-1',
        title: 'High Wind Speed Advisory',
        severity: 'Advisory',
        timestamp: '15 mins ago',
        category: 'Wind Hazard',
        message: 'Surface wind gusts up to 55 km/h recorded. Secure loose outdoor fixtures and avoid parking beneath weak tree branches.',
        action: 'Fasten balcony furniture, double-check window latches, and maintain a firm grip on handrails.'
      }
    ]
  },
  RAINY: {
    id: 'rainy',
    name: 'Rainy Day',
    icon: 'CloudRain',
    condition: 'Rainy',
    temp: 22,
    tempFeelsLike: 22,
    wind: 38,
    windGusts: 38,
    sustainedWind: 28,
    rainfall: 35,
    humidity: 88,
    pressure: 1008,
    uvIndex: 2,
    aqi: 28,
    aqiStatus: 'Good',
    aqiStandard: 'India CPCB Standard',
    pm25: 14,
    pm10: 28,
    description: 'Steady temperate precipitation with overcast cloud ceiling and wet road conditions.',
    riskLevel: 'MODERATE',
    riskScore: 48,
    summary: 'Continuous rain shower. Slippery road surfaces and localized low-lying puddling.',
    hazards: {
      flood: { level: 'MODERATE', score: 40, status: 'Stormwater drains at 45% capacity' },
      heatwave: { level: 'LOW', score: 0, status: 'No heat stress' },
      cyclone: { level: 'LOW', score: 20, status: 'Stable monsoonal trough' }
    },
    historicalTrends: [
      { time: '00:00', temp: 21, rainfall: 5, wind: 18 },
      { time: '04:00', temp: 20, rainfall: 12, wind: 22 },
      { time: '08:00', temp: 21, rainfall: 20, wind: 26 },
      { time: '12:00', temp: 23, rainfall: 35, wind: 30 },
      { time: '16:00', temp: 22, rainfall: 28, wind: 28 },
      { time: '20:00', temp: 21, rainfall: 15, wind: 24 },
      { time: '24:00', temp: 20, rainfall: 8, wind: 20 }
    ],
    alerts: [
      {
        id: 'alt-rain-1',
        title: 'Sustained Rain & Wet Pavement Warning',
        severity: 'Warning',
        timestamp: '30 mins ago',
        category: 'Precipitation',
        message: 'Persistent rainfall has created reduced braking traction on municipal highways.',
        action: 'Increase vehicle following distance, illuminate headlights, and keep umbrellas handy.'
      }
    ]
  },
  HEAVY_RAIN: {
    id: 'heavy_rain',
    name: 'Heavy Rainfall',
    icon: 'CloudLightning',
    condition: 'Rainy', // Weather condition category includes Rainy/Heavy Rain
    temp: 20,
    tempFeelsLike: 19,
    wind: 62,
    windGusts: 62,
    sustainedWind: 45,
    rainfall: 95,
    humidity: 96,
    pressure: 998,
    uvIndex: 1,
    aqi: 18,
    aqiStatus: 'Good',
    aqiStandard: 'India CPCB Standard',
    pm25: 9,
    pm10: 18,
    description: 'Torrents of torrential rain accompanied by lightning strikes and rapidly surging gutter flow.',
    riskLevel: 'HIGH',
    riskScore: 74,
    summary: 'Severe precipitation pulse. Urban waterlogging, visibility drops below 500 meters.',
    hazards: {
      flood: { level: 'HIGH', score: 78, status: 'Urban runoff exceeding culvert design limits' },
      heatwave: { level: 'LOW', score: 0, status: 'Cooled atmospheric inversion' },
      cyclone: { level: 'MODERATE', score: 50, status: 'Squall line with convective downbursts' }
    },
    historicalTrends: [
      { time: '00:00', temp: 22, rainfall: 10, wind: 20 },
      { time: '04:00', temp: 21, rainfall: 25, wind: 28 },
      { time: '08:00', temp: 20, rainfall: 50, wind: 36 },
      { time: '12:00', temp: 20, rainfall: 95, wind: 45 },
      { time: '16:00', temp: 19, rainfall: 80, wind: 48 },
      { time: '20:00', temp: 19, rainfall: 45, wind: 40 },
      { time: '24:00', temp: 18, rainfall: 20, wind: 30 }
    ],
    alerts: [
      {
        id: 'alt-hrain-1',
        title: 'Flash Waterlogging Alert',
        severity: 'Warning',
        timestamp: '10 mins ago',
        category: 'Hydrological',
        message: 'Precipitation rate of 35mm/hr detected. Underpasses and low-elevation roads are submerging.',
        action: 'Avoid subway pedestrian subways, do not drive through flooded underpasses, stay indoors.'
      }
    ]
  },
  FLOOD_RISK: {
    id: 'flood_risk',
    name: 'Flood Risk',
    icon: 'Waves',
    condition: 'Rainy',
    temp: 19,
    tempFeelsLike: 18,
    wind: 52,
    windGusts: 52,
    sustainedWind: 38,
    rainfall: 165,
    humidity: 98,
    pressure: 994,
    uvIndex: 1,
    aqi: 22,
    aqiStatus: 'Good',
    aqiStandard: 'India CPCB Standard',
    pm25: 11,
    pm10: 22,
    description: 'Catastrophic stormwater accumulation with river cresting and backflow in sewage networks.',
    riskLevel: 'CRITICAL',
    riskScore: 92,
    summary: 'Critical inundation threat. Low-lying zones facing severe flood depth of 0.5m to 1.8m.',
    hazards: {
      flood: { level: 'CRITICAL', score: 96, status: 'River stage breached Red Warning mark' },
      heatwave: { level: 'LOW', score: 0, status: 'Submerged infrastructure' },
      cyclone: { level: 'MODERATE', score: 55, status: 'Deep depression lingering inland' }
    },
    historicalTrends: [
      { time: '00:00', temp: 20, rainfall: 40, wind: 25 },
      { time: '04:00', temp: 19, rainfall: 75, wind: 32 },
      { time: '08:00', temp: 19, rainfall: 120, wind: 35 },
      { time: '12:00', temp: 19, rainfall: 165, wind: 38 },
      { time: '16:00', temp: 18, rainfall: 145, wind: 40 },
      { time: '20:00', temp: 18, rainfall: 110, wind: 35 },
      { time: '24:00', temp: 18, rainfall: 85, wind: 30 }
    ],
    alerts: [
      {
        id: 'alt-flood-1',
        title: 'IMMEDIATE EVACUATION: River Basin Inundation',
        severity: 'Critical',
        timestamp: '5 mins ago',
        category: 'Flood Disaster',
        message: 'DEMO ALERT: Basin river levels have exceeded threshold by 1.4m. Sector 4 & Sector 7 must relocate to designated emergency shelters.',
        action: 'Power down main circuit breaker, move valuables to upper levels, grab 72-hr Go-Bag and follow designated evacuation route.'
      },
      {
        id: 'alt-flood-2',
        title: 'Drinking Water Contamination Watch',
        severity: 'Warning',
        timestamp: '22 mins ago',
        category: 'Public Health',
        message: 'Floodwater infiltration detected near municipal pumping station #3.',
        action: 'Boil tap water for at least 3 minutes before drinking or use sealed bottled rations.'
      }
    ]
  },
  HEATWAVE: {
    id: 'heatwave',
    name: 'Heatwave',
    icon: 'Flame',
    condition: 'Sunny',
    temp: 43,
    tempFeelsLike: 48,
    wind: 22,
    windGusts: 22,
    sustainedWind: 16,
    rainfall: 0,
    humidity: 28,
    pressure: 1004,
    uvIndex: 11,
    aqi: 245,
    aqiStatus: 'Poor',
    aqiStandard: 'India CPCB Standard',
    pm25: 108,
    pm10: 220,
    description: 'Oppressive, dry thermal dome trapping scorching heat with dangerous solar irradiance.',
    riskLevel: 'HIGH',
    riskScore: 84,
    summary: 'Extreme thermal stress warning. Wet-bulb temperatures exceed safety limits for prolonged outdoor work.',
    hazards: {
      flood: { level: 'LOW', score: 0, status: 'No precipitation' },
      heatwave: { level: 'CRITICAL', score: 95, status: 'Max temperatures +7°C above historical seasonal mean' },
      cyclone: { level: 'LOW', score: 5, status: 'Stagnant anticyclone pressure system' }
    },
    historicalTrends: [
      { time: '00:00', temp: 31, rainfall: 0, wind: 10 },
      { time: '04:00', temp: 29, rainfall: 0, wind: 8 },
      { time: '08:00', temp: 36, rainfall: 0, wind: 12 },
      { time: '12:00', temp: 42, rainfall: 0, wind: 15 },
      { time: '15:00', temp: 44, rainfall: 0, wind: 18 },
      { time: '18:00', temp: 41, rainfall: 0, wind: 14 },
      { time: '24:00', temp: 34, rainfall: 0, wind: 10 }
    ],
    alerts: [
      {
        id: 'alt-heat-1',
        title: 'Red Alert: Severe Heatstroke Hazard',
        severity: 'Critical',
        timestamp: '12 mins ago',
        category: 'Thermal Emergency',
        message: 'Ambient heat index at 48°C. Dehydration and hyperthermia risk is severe within 30 minutes of direct sun exposure.',
        action: 'Stay in air-conditioned environments, ingest electrolyte-balanced water continuously, check on elderly neighbors.'
      },
      {
        id: 'alt-heat-2',
        title: 'Agricultural & Power Grid Stress Notice',
        severity: 'Advisory',
        timestamp: '1 hour ago',
        category: 'Infrastructure',
        message: 'High air conditioner load placing high peak demand on substation transformers.',
        action: 'Pre-cool living spaces, draw heavy curtains to block radiant solar heat.'
      }
    ]
  },
  CYCLONE: {
    id: 'cyclone',
    name: 'Cyclone',
    icon: 'Tornado',
    condition: 'Cyclone',
    temp: 24,
    tempFeelsLike: 21,
    wind: 185,
    windGusts: 185,
    sustainedWind: 135,
    rainfall: 180,
    humidity: 97,
    pressure: 958,
    uvIndex: 0,
    aqi: 15,
    aqiStatus: 'Good',
    aqiStandard: 'India CPCB Standard',
    pm25: 8,
    pm10: 15,
    description: 'Violent Category 3 tropical cyclone with gale-force eye-wall winds, flying debris, and storm surge.',
    riskLevel: 'CRITICAL',
    riskScore: 98,
    summary: 'Catastrophic cyclonic impact. Wind speeds exceeding 130 km/h with destructive surge waves along coastlines.',
    hazards: {
      flood: { level: 'CRITICAL', score: 94, status: 'Storm surge cresting 3 meters above mean tide' },
      heatwave: { level: 'LOW', score: 0, status: 'Intense atmospheric turbulence' },
      cyclone: { level: 'CRITICAL', score: 99, status: 'Eye-wall radius 25km approaching landfall' }
    },
    historicalTrends: [
      { time: '00:00', temp: 26, rainfall: 30, wind: 55 },
      { time: '04:00', temp: 25, rainfall: 70, wind: 85 },
      { time: '08:00', temp: 24, rainfall: 120, wind: 110 },
      { time: '12:00', temp: 23, rainfall: 180, wind: 135 },
      { time: '16:00', temp: 23, rainfall: 150, wind: 125 },
      { time: '20:00', temp: 24, rainfall: 90, wind: 95 },
      { time: '24:00', temp: 25, rainfall: 40, wind: 60 }
    ],
    alerts: [
      {
        id: 'alt-cyc-1',
        title: 'EMERGENCY: Category 3 Cyclone Eye-Wall Landfall',
        severity: 'Critical',
        timestamp: 'Just now',
        category: 'Severe Cyclone',
        message: 'DEMO ALERT: Sustained winds of 135 km/h with gusts exceeding 160 km/h. Roof peeling, tree uprooting, and structural collapses underway.',
        action: 'DO NOT USE UMBRELLAS (they act as kites and flying shrapnel). Shelter inside an interior windowless room, crouch beneath sturdy furniture.'
      },
      {
        id: 'alt-cyc-2',
        title: 'Coastal Surge Warning: 3.5m Ingress',
        severity: 'Critical',
        timestamp: '18 mins ago',
        category: 'Marine Hazard',
        message: 'Storm surge pushing sea waters inland up to 2.5 kilometers.',
        action: 'Immediate vertical or inland evacuation away from sea wall and tidal creeks.'
      }
    ]
  }
};

export const SAFETY_CHECKLISTS = [
  {
    category: 'Universal 72-Hour Emergency Go-Bag',
    icon: 'Briefcase',
    description: 'Essential life-support gear packed in an easy-to-carry waterproof backpack.',
    items: [
      { id: 'gb-1', text: 'Bottled drinking water (1 gallon / 4L per person per day for 3 days)', critical: true },
      { id: 'gb-2', text: 'Non-perishable energy bars, canned goods, and manual can opener', critical: true },
      { id: 'gb-3', text: 'Battery-powered or hand-crank emergency radio with spare batteries', critical: true },
      { id: 'gb-4', text: 'High-lumen LED flashlight and glow sticks', critical: false },
      { id: 'gb-5', text: 'Comprehensive First Aid kit (bandages, antiseptic, personal prescriptions for 7+ days)', critical: true },
      { id: 'gb-6', text: 'Heavy-duty multi-tool, Swiss knife, and duct tape', critical: false },
      { id: 'gb-7', text: 'Waterproof pouch with passport, identity cards, insurance policies & cash in small denominations', critical: true },
      { id: 'gb-8', text: 'Power bank (20,000mAh+) fully charged with universal charging cables', critical: false },
      { id: 'gb-9', text: 'N95 respirator masks and sterile wet wipes', critical: false }
    ]
  },
  {
    category: 'Flood Preparedness Protocol',
    icon: 'Waves',
    description: 'Actions to safeguard family, residence, and vehicles against rising waters.',
    items: [
      { id: 'fl-1', text: 'Identify elevated escape routes avoiding underpasses and canal banks', critical: true },
      { id: 'fl-2', text: 'Shut off electricity, natural gas, and water main valves before vacating', critical: true },
      { id: 'fl-3', text: 'Move appliances, computers, and furniture to second floor or above flood line', critical: false },
      { id: 'fl-4', text: 'Fill bathtubs and clean containers with fresh water before supply disruption', critical: false },
      { id: 'fl-5', text: 'Never drive through water of unknown depth ("Turn Around, Don\'t Drown")', critical: true },
      { id: 'fl-6', text: 'Keep boots, rain jackets, and waterproof phone cases ready', critical: false }
    ]
  },
  {
    category: 'Cyclone & Extreme Storm Defense',
    icon: 'Tornado',
    description: 'High-wind safety measures to prevent structural damage and projectile impacts.',
    items: [
      { id: 'cy-1', text: 'Reinforce external windows with storm shutters or board up with 5/8-inch plywood', critical: true },
      { id: 'cy-2', text: 'Clear patios, balconies, and rooftops of unanchored items (pots, chairs, satellite dishes)', critical: true },
      { id: 'cy-3', text: 'DO NOT USE UMBRELLAS outdoors — extreme gale forces destroy them instantly into hazardous spears', critical: true },
      { id: 'cy-4', text: 'Establish an interior safe room (windowless bathroom, closet, or hallway on ground floor)', critical: true },
      { id: 'cy-5', text: 'Fuel your vehicle and park inside a garage or away from large trees', critical: false },
      { id: 'cy-6', text: 'Beware the Eye of the Storm: Calm conditions are temporary before violent reverse winds strike', critical: true }
    ]
  },
  {
    category: 'Extreme Heatwave Countermeasures',
    icon: 'Flame',
    description: 'Thermal protection strategies to prevent life-threatening heat exhaustion and heatstroke.',
    items: [
      { id: 'ht-1', text: 'Consume at least 3-4 liters of water and electrolyte solutions even if not thirsty', critical: true },
      { id: 'ht-2', text: 'Avoid outdoor exertion between 11:00 AM and 4:00 PM peak radiation hours', critical: true },
      { id: 'ht-3', text: 'Wear lightweight, loose-fitting, light-colored cotton clothing and UV-rated sunglasses', critical: false },
      { id: 'ht-4', text: 'Carry an umbrella for solar radiation deflection when forced to walk outside', critical: true },
      { id: 'ht-5', text: 'Never leave children, vulnerable individuals, or pets inside parked vehicles for even 1 minute', critical: true },
      { id: 'ht-6', text: 'Know heatstroke signs: confusion, slurred speech, absence of sweating with boiling skin', critical: true }
    ]
  }
];

export const EMERGENCY_CONTACTS = [
  { service: 'National Disaster Response (NDRF/FEMA)', phone: '1078 / 911', badge: 'Toll-Free 24/7' },
  { service: 'Emergency Medical & Ambulance', phone: '108 / 911', badge: 'Immediate Response' },
  { service: 'Fire & Rescue Brigade', phone: '101 / 911', badge: 'Structural Extraction' },
  { service: 'Police & Public Safety Helpline', phone: '100 / 112', badge: 'Civil Protection' },
  { service: 'Central Meteorological Storm Tracking', phone: '1800-180-1717', badge: 'Radar Updates' },
  { service: 'Electricity Grid Hazard Dispatch', phone: '1912', badge: 'Downed Power Lines' }
];

export const HACKATHON_INFO = {
  projectName: 'ClimateShield AI',
  tagline: 'Understand Risk. Prepare Early. Stay Safer.',
  problemStatement: `Climate volatility and extreme weather anomalies (cyclones, sudden urban flash floods, scorching thermal domes) pose imminent danger to human lives, urban infrastructure, and economic stability. Most existing weather applications provide static metrics (temperatures, millimeter stats) without translating them into actionable, contextual risk tiers and clear behavioral directives.`,
  solution: `ClimateShield AI bridges meteorological numbers and human safety. Built with an intelligent local simulation engine, it correlates atmospheric pressure, wind gusts, and precipitation to compute live risk indexes (LOW, MODERATE, HIGH, CRITICAL). It features proactive contextual directives—including mandatory umbrella reminders in appropriate conditions and imperative no-umbrella safety alerts during cyclone events.`,
  architecture: [
    { title: 'Frontend Architecture', detail: 'React 19 + Vite with modular, state-driven scenario engine.' },
    { title: 'Local Simulated Data Store', detail: 'Predefined comprehensive datasets (src/data/mockData.js & src/utils/simulator.js) ensuring 100% reliability, zero external API latency, and complete demo controllability.' },
    { title: 'Dynamic Risk Engine', detail: 'Multi-factor risk assessment classifying environmental anomalies into 4 color-coded safety tiers with weighted hazard metrics.' },
    { title: 'Interactive Analytics', detail: 'Recharts-driven trend line graphs dynamically updating across 24-hour diurnal curves.' },
    { title: 'Human Behavioral Shield', detail: 'Context-aware alerts such as our patented Umbrella Safety Advisor and actionable 72-hour preparedness checklists.' }
  ]
};
