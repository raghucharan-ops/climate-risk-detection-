// src/pages/WeatherMonitoring.jsx
import React from 'react';
import {
  CloudSun,
  Eye,
  Compass,
  Gauge,
  Sun,
  Droplets,
  Wind,
  Layers,
  Activity,
  Radio,
  Clock,
  ShieldCheck
} from 'lucide-react';
import WeatherCardsGrid from '../components/WeatherCard';
import UmbrellaReminder from '../components/UmbrellaReminder';

export default function WeatherMonitoring({ scenario, selectedLocation }) {
  // Simulated hourly progression for next 8 intervals
  const hourlyData = [
    { time: 'Now', temp: scenario.temp, rain: scenario.rainfall, wind: scenario.wind, cond: scenario.condition },
    { time: '+1h', temp: scenario.temp + 1, rain: Math.max(0, scenario.rainfall - 2), wind: scenario.wind + 2, cond: scenario.condition },
    { time: '+2h', temp: scenario.temp, rain: scenario.rainfall, wind: scenario.wind + 5, cond: scenario.condition },
    { time: '+3h', temp: scenario.temp - 1, rain: Math.round(scenario.rainfall * 1.1), wind: scenario.wind + 3, cond: scenario.condition },
    { time: '+4h', temp: scenario.temp - 2, rain: Math.round(scenario.rainfall * 1.2), wind: scenario.wind + 1, cond: scenario.condition },
    { time: '+6h', temp: scenario.temp - 3, rain: Math.round(scenario.rainfall * 0.9), wind: Math.round(scenario.wind * 0.9), cond: scenario.condition },
    { time: '+8h', temp: scenario.temp - 4, rain: Math.round(scenario.rainfall * 0.7), wind: Math.round(scenario.wind * 0.8), cond: scenario.condition },
    { time: '+12h', temp: scenario.temp - 2, rain: Math.round(scenario.rainfall * 0.5), wind: Math.round(scenario.wind * 0.7), cond: scenario.condition }
  ];

  return (
    <div className="page-container weather-monitoring-page">
      {/* Top Umbrella Directives */}
      <UmbrellaReminder condition={scenario.condition} wind={scenario.wind} />

      {/* Primary Header */}
      <div className="monitoring-header-card">
        <div className="monitoring-station-meta">
          <div className="station-badge">
            <Radio size={14} className="icon-pulse text-emerald-400" />
            <span>METEOROLOGICAL TELEMETRY STATION #7</span>
          </div>
          <h2 className="station-name">
            {selectedLocation.name} Atmospheric Observatory
          </h2>
          <p className="station-location">
            Coordinates: {selectedLocation.coordinates} · Elevation: 42m ASL · Active Scenario: <strong>{scenario.name}</strong>
          </p>
        </div>

        <div className="station-quick-pill">
          <div className="pill-item">
            <span className="pill-title">Condition</span>
            <span className="pill-value">{scenario.condition}</span>
          </div>
          <div className="pill-item">
            <span className="pill-title">Thermal Index</span>
            <span className="pill-value">{scenario.temp}°C</span>
          </div>
          <div className="pill-item">
            <span className="pill-title">Barometer</span>
            <span className="pill-value">{scenario.pressure || 1012} hPa</span>
          </div>
        </div>
      </div>

      {/* Detailed Weather Cards */}
      <div className="monitoring-section">
        <h3 className="section-title">Surface Sensor Readings</h3>
        <p className="section-subtitle">Real-time parameters captured from simulated sensor grid</p>
        <WeatherCardsGrid scenario={scenario} />
      </div>

      {/* Hourly Forecast Sequence */}
      <div className="monitoring-section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Hourly Telemetry Forecast</h3>
            <p className="section-subtitle">Projected hourly variations based on current storm dynamics</p>
          </div>
          <span className="header-tag">12-Hour Outlook</span>
        </div>

        <div className="hourly-forecast-row">
          {hourlyData.map((hr, idx) => (
            <div key={idx} className={`hourly-card ${idx === 0 ? 'hourly-current' : ''}`}>
              <span className="hourly-time">{hr.time}</span>
              <div className="hourly-icon-wrap">
                <CloudSun size={24} className="hourly-weather-icon" />
              </div>
              <span className="hourly-temp">{hr.temp}°C</span>
              <div className="hourly-submetrics">
                <span className="submetric-rain" title="Precipitation">
                  <Droplets size={12} /> {hr.rain}mm
                </span>
                <span className="submetric-wind" title="Wind">
                  <Wind size={12} /> {hr.wind}kph
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atmospheric Indices & Simulated Radar */}
      <div className="monitoring-grid-two">
        {/* Air Quality & Environmental Composition */}
        <div className="sensor-detail-card">
          <div className="card-top-header">
            <div className="icon-badge">
              <Activity size={18} />
            </div>
            <div>
              <h4 className="detail-card-title">Air Quality (India CPCB Standard)</h4>
              <p className="detail-card-sub">Central Pollution Control Board 24-hr Breakpoint Standards</p>
            </div>
          </div>

          <div className="aqi-meter-box">
            <div className="aqi-score-display">
              <span className="aqi-large-number">{scenario.aqi || 45}</span>
              <span className="aqi-scale-unit">AQI</span>
            </div>
            <div className="aqi-status-text">
              <h5>{scenario.aqiStatus || 'Good'} (India CPCB)</h5>
              <p>
                {scenario.aqi > 200
                  ? 'Severe air quality degradation. Prolonged outdoor exposure causes respiratory distress.'
                  : scenario.aqi > 100
                  ? 'Moderate air quality. Sensitive individuals should minimize strenuous outdoor exertion.'
                  : scenario.aqi > 50
                  ? 'Satisfactory air quality. Minor breathing discomfort to sensitive groups.'
                  : 'Clean ambient air. Safe baseline operational parameters.'}
              </p>
            </div>
          </div>

          <div className="pollutants-grid">
            <div className="pollutant-item">
              <span className="pollutant-name">PM2.5 (Fine particulate)</span>
              <span className="pollutant-val">
                {scenario.pm25 !== undefined && scenario.pm25 !== null
                  ? `${scenario.pm25} µg/m³`
                  : `${Math.round((scenario.aqi || 45) * 0.45)} µg/m³`}
              </span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">PM10 (Coarse particulate)</span>
              <span className="pollutant-val">
                {scenario.pm10 !== undefined && scenario.pm10 !== null
                  ? `${scenario.pm10} µg/m³`
                  : `${Math.round((scenario.aqi || 45) * 0.8)} µg/m³`}
              </span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">Ground Ozone (O₃)</span>
              <span className="pollutant-val">{scenario.temp > 35 ? '68 ppb (Elevated)' : '32 ppb (Normal)'}</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">Dew Point</span>
              <span className="pollutant-val">{Math.round(scenario.temp - (100 - scenario.humidity) / 5)}°C</span>
            </div>
          </div>
        </div>

        {/* Simulated Doppler Radar / Satellite Visualizer */}
        <div className="sensor-detail-card">
          <div className="card-top-header">
            <div className="icon-badge">
              <Layers size={18} />
            </div>
            <div>
              <h4 className="detail-card-title">Simulated Doppler Radar & Storm Cells</h4>
              <p className="detail-card-sub">Visual representation of cloud density & precipitation bands</p>
            </div>
          </div>

          <div className="radar-visualizer-container">
            <div className="radar-circle-grid">
              <div className="radar-ring ring-1"></div>
              <div className="radar-ring ring-2"></div>
              <div className="radar-ring ring-3"></div>
              <div className="radar-crosshair-h"></div>
              <div className="radar-crosshair-v"></div>
              <div className="radar-sweep-beam"></div>

              {/* Storm cell mock blobs based on scenario */}
              {scenario.rainfall > 30 && (
                <div
                  className="radar-storm-blob"
                  style={{
                    backgroundColor: scenario.rainfall > 100 ? 'rgba(239, 68, 68, 0.65)' : 'rgba(14, 165, 233, 0.6)',
                    width: scenario.rainfall > 100 ? '140px' : '90px',
                    height: scenario.rainfall > 100 ? '140px' : '90px'
                  }}
                >
                  <span className="storm-tag">{scenario.condition} Front</span>
                </div>
              )}

              <div className="radar-center-dot" title="Observatory Location">
                <span className="center-ping"></span>
              </div>
            </div>

            <div className="radar-legend">
              <div className="legend-strip">
                <span className="legend-label">Clear</span>
                <div className="legend-gradient"></div>
                <span className="legend-label">Torrential</span>
              </div>
              <span className="radar-footnote">
                Simulated Doppler sweep at 100 km radius · Updated every 5 seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
