// src/utils/liveWeather.js
import { calculateRiskLevel } from './simulator';

/**
 * Calculate AQI based on the Indian Central Pollution Control Board (CPCB) standard.
 *
 * Linear Interpolation Formula:
 *   Ip = [ (I_hi - I_lo) / (B_hi - B_lo) ] * (Cp - B_lo) + I_lo
 *
 * CPCB Breakpoints (24-hour average in µg/m³):
 * Category          AQI Range    PM2.5 Range    PM10 Range
 * Good              0 - 50       0 - 30         0 - 50
 * Satisfactory      51 - 100     31 - 60        51 - 100
 * Moderate          101 - 200    61 - 90        101 - 250
 * Poor              201 - 300    91 - 120       251 - 350
 * Very Poor         301 - 400    121 - 250      351 - 430
 * Severe            401 - 500    250+ (up 500)  430+ (up 600)
 */
export function calculateIndianAQI(pm25, pm10) {
  const calcSubIndex = (conc, breakpoints) => {
    if (conc === null || conc === undefined || isNaN(conc) || conc < 0) return null;
    for (const bp of breakpoints) {
      if (conc <= bp.bHi) {
        const val = ((bp.iHi - bp.iLo) / (bp.bHi - bp.bLo)) * (conc - bp.bLo) + bp.iLo;
        return Math.round(val);
      }
    }
    // Beyond highest breakpoint cap at 500
    return 500;
  };

  const pm25Breakpoints = [
    { bLo: 0,   bHi: 30,  iLo: 0,   iHi: 50 },
    { bLo: 31,  bHi: 60,  iLo: 51,  iHi: 100 },
    { bLo: 61,  bHi: 90,  iLo: 101, iHi: 200 },
    { bLo: 91,  bHi: 120, iLo: 201, iHi: 300 },
    { bLo: 121, bHi: 250, iLo: 301, iHi: 400 },
    { bLo: 251, bHi: 500, iLo: 401, iHi: 500 }
  ];

  const pm10Breakpoints = [
    { bLo: 0,   bHi: 50,  iLo: 0,   iHi: 50 },
    { bLo: 51,  bHi: 100, iLo: 51,  iHi: 100 },
    { bLo: 101, bHi: 250, iLo: 101, iHi: 200 },
    { bLo: 251, bHi: 350, iLo: 201, iHi: 300 },
    { bLo: 351, bHi: 430, iLo: 301, iHi: 400 },
    { bLo: 431, bHi: 600, iLo: 401, iHi: 500 }
  ];

  const subPm25 = calcSubIndex(pm25, pm25Breakpoints);
  const subPm10 = calcSubIndex(pm10, pm10Breakpoints);

  const subIndices = [subPm25, subPm10].filter((v) => v !== null);
  const aqi = subIndices.length > 0 ? Math.max(...subIndices) : 45;

  let status = 'Good';
  let categoryDesc = 'Minimal health impact. Air quality is safe.';

  if (aqi > 400) {
    status = 'Severe';
    categoryDesc = 'Affects healthy people and seriously impacts those with existing respiratory conditions.';
  } else if (aqi > 300) {
    status = 'Very Poor';
    categoryDesc = 'May cause respiratory illness on prolonged exposure.';
  } else if (aqi > 200) {
    status = 'Poor';
    categoryDesc = 'Breathing discomfort to most people on prolonged exposure.';
  } else if (aqi > 100) {
    status = 'Moderate';
    categoryDesc = 'Breathing discomfort to people with sensitive lungs, asthma, and heart conditions.';
  } else if (aqi > 50) {
    status = 'Satisfactory';
    categoryDesc = 'Minor breathing discomfort to highly sensitive individuals.';
  } else {
    status = 'Good';
    categoryDesc = 'Minimal health impact. Clean ambient air.';
  }

  return {
    aqi,
    status,
    subPm25: subPm25 ?? Math.round(aqi * 0.9),
    subPm10: subPm10 ?? Math.round(aqi * 0.7),
    pm25: pm25 !== null && pm25 !== undefined ? Math.round(pm25 * 10) / 10 : null,
    pm10: pm10 !== null && pm10 !== undefined ? Math.round(pm10 * 10) / 10 : null,
    standard: 'India CPCB Standard',
    categoryDesc
  };
}

/**
 * Interpret WMO weather codes from Open-Meteo into human-readable condition & icon
 */
export function interpretWmoCode(code, temp = 25, wind = 10, rain = 0) {
  // If extreme wind speed, prioritize Cyclone classification
  if (wind >= 100) {
    return {
      condition: 'Cyclone',
      icon: 'Tornado',
      description: 'Dangerous storm system with extreme gale-force winds detected.'
    };
  }

  // If severe rain
  if (rain >= 50) {
    return {
      condition: 'Rainy',
      icon: 'CloudRain',
      description: 'Torrential rainfall detected at your GPS coordinates.'
    };
  }

  // WMO Code interpretation
  switch (code) {
    case 0:
      return {
        condition: 'Sunny',
        icon: 'Sun',
        description: 'Clear sunny skies with direct solar exposure.'
      };
    case 1:
    case 2:
    case 3:
      if (temp >= 35) {
        return {
          condition: 'Sunny',
          icon: 'Sun',
          description: 'High ambient temperature with mild cloud scattering.'
        };
      }
      if (wind >= 38) {
        return {
          condition: 'Windy',
          icon: 'Wind',
          description: 'Elevated sustained wind velocity and breezy cloud drifts.'
        };
      }
      return {
        condition: 'Sunny',
        icon: 'Sun',
        description: 'Partly cloudy to fair atmospheric conditions.'
      };
    case 45:
    case 48:
      return {
        condition: 'Windy',
        icon: 'Wind',
        description: 'Dense fog layers with restricted horizontal visibility.'
      };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return {
        condition: 'Rainy',
        icon: 'CloudRain',
        description: 'Light continuous drizzle and damp surface conditions.'
      };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return {
        condition: 'Rainy',
        icon: 'CloudRain',
        description: 'Rainfall showers detected across localized GPS area.'
      };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return {
        condition: 'Rainy',
        icon: 'CloudRain',
        description: 'Wintry precipitation and localized cooling.'
      };
    case 95:
    case 96:
    case 99:
      return {
        condition: 'Rainy',
        icon: 'CloudLightning',
        description: 'Convective thunderstorm cells with squalls and lightning.'
      };
    default:
      if (rain > 0) return { condition: 'Rainy', icon: 'CloudRain', description: 'Precipitation active.' };
      if (wind >= 35) return { condition: 'Windy', icon: 'Wind', description: 'Gusty surface winds.' };
      return { condition: 'Sunny', icon: 'Sun', description: 'Normal daytime atmospheric conditions.' };
  }
}

/**
 * Builds a full ClimateShield AI Scenario object from Open-Meteo live API response & Air Quality data
 */
export function buildLiveScenario(openMeteoData, openMeteoAirQualityData, latitude, longitude) {
  const current = openMeteoData.current || {};
  const temp = Math.round((current.temperature_2m ?? 24) * 10) / 10;
  const humidity = Math.round(current.relative_humidity_2m ?? 50);
  const rainfall = Math.round((current.precipitation ?? 0) * 10) / 10;
  const sustainedWind = Math.round((current.wind_speed_10m ?? 12) * 10) / 10;
  const windGusts = current.wind_gusts_10m !== undefined && current.wind_gusts_10m !== null
    ? Math.round(current.wind_gusts_10m * 10) / 10
    : Math.round(sustainedWind * 1.35 * 10) / 10;
  // Use peak wind gusts (wind_gusts_10m) instead of sustained wind speed for extreme weather monitoring
  const wind = windGusts;
  const weatherCode = current.weather_code ?? 0;

  // Process Air Quality using Indian CPCB formula
  const currentAq = openMeteoAirQualityData?.current || {};
  const rawPm25 = currentAq.pm2_5 !== undefined ? currentAq.pm2_5 : (humidity > 80 ? 45 : 28);
  const rawPm10 = currentAq.pm10 !== undefined ? currentAq.pm10 : (humidity > 80 ? 65 : 42);
  const indianAqi = calculateIndianAQI(rawPm25, rawPm10);

  const wmoMeta = interpretWmoCode(weatherCode, temp, wind, rainfall);
  const condition = wmoMeta.condition;
  const riskLevel = calculateRiskLevel(temp, wind, rainfall, condition);

  // Approximate Feels-Like temperature
  let feelsLike = temp;
  if (temp >= 27) {
    feelsLike = Math.round(temp + ((humidity - 40) * 0.1));
  } else if (temp <= 15 && wind >= 15) {
    feelsLike = Math.round(temp - (wind * 0.08));
  }

  // Dynamic Hazard Calculations based on real sensor inputs
  const floodScore = Math.min(100, Math.max(5, Math.round(rainfall * 1.5 + (humidity > 85 ? 15 : 0))));
  const heatwaveScore = temp >= 32
    ? Math.min(100, Math.round((temp - 30) * 9 + (humidity < 40 ? 15 : 0)))
    : Math.max(0, Math.round(temp * 0.6));
  const cycloneScore = wind >= 60
    ? Math.min(100, Math.round((wind - 50) * 1.6))
    : Math.max(0, Math.round(wind * 0.4));

  const hazards = {
    flood: {
      level: floodScore >= 80 ? 'CRITICAL' : floodScore >= 60 ? 'HIGH' : floodScore >= 30 ? 'MODERATE' : 'LOW',
      score: floodScore,
      status: rainfall > 20 ? 'Active localized precipitation detected' : 'Normal storm runoff'
    },
    heatwave: {
      level: heatwaveScore >= 80 ? 'CRITICAL' : heatwaveScore >= 60 ? 'HIGH' : heatwaveScore >= 30 ? 'MODERATE' : 'LOW',
      score: heatwaveScore,
      status: temp >= 38 ? 'High daytime thermal radiation warning' : 'Comfortable thermal envelope'
    },
    cyclone: {
      level: cycloneScore >= 80 ? 'CRITICAL' : cycloneScore >= 55 ? 'HIGH' : cycloneScore >= 35 ? 'MODERATE' : 'LOW',
      score: cycloneScore,
      status: wind >= 65 ? 'Elevated atmospheric shear and squall risk' : 'Stable regional pressure gradient'
    }
  };

  // Generate 24-hr progression based on the real-time baseline
  const historicalTrends = [
    { time: '00:00', temp: Math.round(temp * 0.8), rainfall: Math.round(rainfall * 0.3), wind: Math.round(wind * 0.6) },
    { time: '04:00', temp: Math.round(temp * 0.75), rainfall: Math.round(rainfall * 0.4), wind: Math.round(wind * 0.7) },
    { time: '08:00', temp: Math.round(temp * 0.9), rainfall: Math.round(rainfall * 0.6), wind: Math.round(wind * 0.85) },
    { time: '12:00', temp: temp, rainfall: rainfall, wind: wind },
    { time: '16:00', temp: Math.round(temp * 0.95), rainfall: Math.round(rainfall * 0.85), wind: Math.round(wind * 0.9) },
    { time: '20:00', temp: Math.round(temp * 0.86), rainfall: Math.round(rainfall * 0.5), wind: Math.round(wind * 0.75) },
    { time: '24:00', temp: Math.round(temp * 0.8), rainfall: Math.round(rainfall * 0.3), wind: Math.round(wind * 0.65) }
  ];

  // Dynamic live alerts
  const alerts = [];
  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    alerts.push({
      id: `live-alert-${Date.now()}`,
      title: `${riskLevel} Risk Advisory for Live Location`,
      severity: riskLevel === 'CRITICAL' ? 'Critical' : 'Warning',
      timestamp: 'Just now (Live GPS)',
      category: 'Real-time Meteorological Feed',
      message: `Live Open-Meteo telemetry reports ${temp}°C, ${wind} km/h wind gusts, and ${rainfall}mm rainfall at coordinates (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°). Air Quality is ${indianAqi.status} (${indianAqi.aqi} AQI - India CPCB).`,
      action: condition === 'Cyclone'
        ? 'Seek sturdy indoor shelter immediately. DO NOT use an umbrella outdoors in high gale winds.'
        : 'Monitor changes in weather, carry umbrella if outdoors, and follow regional disaster instructions.'
    });
  } else {
    alerts.push({
      id: `live-info-${Date.now()}`,
      title: 'Live Telemetry & Air Quality Synchronized',
      severity: 'Advisory',
      timestamp: 'Just now (Live GPS)',
      category: 'Open-Meteo ECMWF/GFS & CPCB AQI',
      message: `Connected to Open-Meteo API for coordinates (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°). PM2.5: ${indianAqi.pm25 ?? 'N/A'} µg/m³, PM10: ${indianAqi.pm10 ?? 'N/A'} µg/m³. CPCB AQI: ${indianAqi.aqi} (${indianAqi.status}).`,
      action: 'Check weather forecast regularly. Carry an umbrella in sunny, windy, or rainy conditions.'
    });
  }

  // Calculate composite risk score
  let riskScore = 15;
  if (riskLevel === 'CRITICAL') riskScore = Math.min(100, 85 + Math.round(wind * 0.1) + Math.round(rainfall * 0.1));
  else if (riskLevel === 'HIGH') riskScore = Math.min(84, 65 + Math.round(rainfall * 0.2) + Math.round(temp * 0.3));
  else if (riskLevel === 'MODERATE') riskScore = Math.min(64, 38 + Math.round(wind * 0.3) + Math.round(rainfall * 0.3));
  else riskScore = Math.max(10, Math.min(35, Math.round(temp * 0.5) + Math.round(wind * 0.3)));

  return {
    id: 'live-gps-scenario',
    name: 'Live GPS Weather',
    icon: wmoMeta.icon,
    condition: condition,
    temp: temp,
    tempFeelsLike: feelsLike,
    wind: windGusts,
    windGusts: windGusts,
    sustainedWind: sustainedWind,
    rainfall: rainfall,
    humidity: humidity,
    pressure: 1012,
    uvIndex: temp >= 32 ? 8 : 4,
    aqi: indianAqi.aqi,
    aqiStatus: indianAqi.status,
    aqiStandard: 'India CPCB Standard',
    pm25: indianAqi.pm25,
    pm10: indianAqi.pm10,
    description: `Live real-time weather from Open-Meteo at ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°. ${wmoMeta.description} Air Quality: ${indianAqi.status} (${indianAqi.aqi} AQI - India CPCB Standard).`,
    riskLevel: riskLevel,
    riskScore: riskScore,
    summary: `Live GPS risk tier calculated at ${riskLevel} level based on ambient temperature (${temp}°C), peak wind gusts (${windGusts} km/h), precipitation (${rainfall} mm), and CPCB AQI (${indianAqi.aqi}).`,
    hazards: hazards,
    historicalTrends: historicalTrends,
    alerts: alerts,
    isLive: true,
    gpsCoords: { latitude, longitude }
  };
}
