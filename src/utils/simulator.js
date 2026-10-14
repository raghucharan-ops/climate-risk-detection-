// src/utils/simulator.js
import { SCENARIO_PRESETS } from '../data/mockData';

export const SCENARIO_KEYS = [
  'SUNNY',
  'WINDY',
  'RAINY',
  'HEAVY_RAIN',
  'FLOOD_RISK',
  'HEATWAVE',
  'CYCLONE'
];

export const SCENARIOS = Object.values(SCENARIO_PRESETS);

/**
 * Retrieve scenario preset by key or ID
 */
export function getScenario(identifier) {
  if (!identifier) return SCENARIO_PRESETS.SUNNY;
  const upper = identifier.toUpperCase();
  if (SCENARIO_PRESETS[upper]) return SCENARIO_PRESETS[upper];

  const found = SCENARIOS.find(
    (s) => s.id.toLowerCase() === identifier.toLowerCase()
  );
  return found || SCENARIO_PRESETS.SUNNY;
}

/**
 * Calculate dynamic risk tier based on atmospheric parameters
 */
export function calculateRiskLevel(temp, wind, rainfall, condition = '') {
  const isCyclone =
    condition.toLowerCase().includes('cyclone') ||
    condition.toLowerCase().includes('severe storm');

  if (isCyclone || wind >= 100 || rainfall >= 150) {
    return 'CRITICAL';
  }
  if (rainfall >= 75 || temp >= 40 || wind >= 65) {
    return 'HIGH';
  }
  if (wind >= 38 || rainfall >= 20 || temp >= 34) {
    return 'MODERATE';
  }
  return 'LOW';
}

/**
 * Color metadata and styling helper for risk levels
 */
export function getRiskColorConfig(level) {
  switch (level?.toUpperCase()) {
    case 'CRITICAL':
      return {
        level: 'CRITICAL',
        color: '#ef4444', // Red
        lightBg: '#fef2f2',
        badgeBg: 'rgba(239, 68, 68, 0.15)',
        badgeBorder: 'rgba(239, 68, 68, 0.4)',
        glow: '0 0 15px rgba(239, 68, 68, 0.35)',
        textColor: '#dc2626',
        description: 'Imminent danger to life and vital structures. Emergency disaster protocol in effect.'
      };
    case 'HIGH':
      return {
        level: 'HIGH',
        color: '#f97316', // Orange
        lightBg: '#fff7ed',
        badgeBg: 'rgba(249, 115, 22, 0.15)',
        badgeBorder: 'rgba(249, 115, 22, 0.4)',
        glow: '0 0 15px rgba(249, 115, 22, 0.3)',
        textColor: '#ea580c',
        description: 'Substantial environmental disruption. High readiness measures and safety warnings active.'
      };
    case 'MODERATE':
      return {
        level: 'MODERATE',
        color: '#eab308', // Yellow
        lightBg: '#fefce8',
        badgeBg: 'rgba(234, 179, 8, 0.15)',
        badgeBorder: 'rgba(234, 179, 8, 0.4)',
        glow: '0 0 15px rgba(234, 179, 8, 0.25)',
        textColor: '#ca8a04',
        description: 'Noticeable weather anomalies present. Caution advised for transit and outdoor operations.'
      };
    case 'LOW':
    default:
      return {
        level: 'LOW',
        color: '#10b981', // Green
        lightBg: '#ecfdf5',
        badgeBg: 'rgba(16, 185, 129, 0.15)',
        badgeBorder: 'rgba(16, 185, 129, 0.4)',
        glow: '0 0 15px rgba(16, 185, 129, 0.25)',
        textColor: '#059669',
        description: 'Atmospheric conditions remain within comfortable, safe baseline thresholds.'
      };
  }
}

/**
 * Checks umbrella safety requirements per hackathon specification:
 * - Sunny, Windy, or Rainy: display exact mandatory reminder banner
 * - Cyclone or Severe Storm: display explicit warning that umbrella is unsafe
 */
export function checkUmbrellaStatus(condition, wind = 0) {
  const normCondition = (condition || '').toLowerCase().trim();

  const isCycloneOrStorm =
    normCondition.includes('cyclone') ||
    normCondition.includes('severe storm') ||
    wind >= 75;

  if (isCycloneOrStorm) {
    return {
      status: 'UNSAFE',
      bannerTitle: 'DANGER: UMBRELLA USE IS HIGHLY HAZARDOUS',
      message:
        '⚠️ Severe Storm & Cyclone Warning: DO NOT use an umbrella! Extreme gale-force gusts turn umbrellas into dangerous airborne projectiles and metal shrapnel, while offering zero protection. Seek sturdy indoor shelter immediately.',
      badge: 'UNSAFE TO CARRY',
      icon: 'ShieldAlert',
      theme: 'danger'
    };
  }

  const isEligibleCondition =
    normCondition === 'sunny' ||
    normCondition === 'windy' ||
    normCondition === 'rainy' ||
    normCondition.includes('rain') ||
    normCondition.includes('sun') ||
    normCondition.includes('wind');

  if (isEligibleCondition) {
    return {
      status: 'MANDATORY_REMINDER',
      // Exact specification text required:
      bannerTitle: 'Mandatory Weather Directive',
      message:
        '☂️ Umbrella Reminder: Carry an umbrella whenever you go outside in sunny, windy, or rainy conditions.',
      badge: 'CARRY UMBRELLA',
      icon: 'Umbrella',
      theme: 'recommended'
    };
  }

  return {
    status: 'NEUTRAL',
    bannerTitle: 'General Weather Guidance',
    message: 'Check local weather condition forecasts before stepping out.',
    badge: 'MONITORING',
    icon: 'Info',
    theme: 'neutral'
  };
}

/**
 * Create a customized scenario based on slider adjustments in simulator
 */
export function createCustomScenario(baseScenario, overrides = {}) {
  const temp = overrides.temp !== undefined ? Number(overrides.temp) : baseScenario.temp;
  const wind = overrides.wind !== undefined ? Number(overrides.wind) : baseScenario.wind;
  const rainfall = overrides.rainfall !== undefined ? Number(overrides.rainfall) : baseScenario.rainfall;
  const humidity = overrides.humidity !== undefined ? Number(overrides.humidity) : baseScenario.humidity;

  let condition = baseScenario.condition;
  if (wind >= 100) condition = 'Cyclone';
  else if (rainfall >= 90) condition = 'Rainy';
  else if (temp >= 40) condition = 'Sunny';

  const riskLevel = calculateRiskLevel(temp, wind, rainfall, condition);

  // Generate 24-hr curve based on parameters
  const historicalTrends = [
    { time: '00:00', temp: Math.round(temp * 0.8), rainfall: Math.round(rainfall * 0.3), wind: Math.round(wind * 0.6) },
    { time: '04:00', temp: Math.round(temp * 0.75), rainfall: Math.round(rainfall * 0.5), wind: Math.round(wind * 0.7) },
    { time: '08:00', temp: Math.round(temp * 0.9), rainfall: Math.round(rainfall * 0.7), wind: Math.round(wind * 0.85) },
    { time: '12:00', temp: temp, rainfall: rainfall, wind: wind },
    { time: '16:00', temp: Math.round(temp * 0.95), rainfall: Math.round(rainfall * 0.85), wind: Math.round(wind * 0.9) },
    { time: '20:00', temp: Math.round(temp * 0.85), rainfall: Math.round(rainfall * 0.5), wind: Math.round(wind * 0.75) },
    { time: '24:00', temp: Math.round(temp * 0.8), rainfall: Math.round(rainfall * 0.3), wind: Math.round(wind * 0.65) }
  ];

  return {
    ...baseScenario,
    id: 'custom-' + Date.now(),
    name: 'Custom Parameter Simulation',
    condition,
    temp,
    wind,
    rainfall,
    humidity,
    riskLevel,
    riskScore: Math.min(100, Math.round((temp > 35 ? (temp - 30) * 4 : 0) + (wind * 0.4) + (rainfall * 0.4))),
    historicalTrends
  };
}
