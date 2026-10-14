// src/pages/DisasterRisk.jsx
import React from 'react';
import {
  ShieldAlert,
  Waves,
  Flame,
  Tornado,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import RiskBadge from '../components/RiskBadge';
import { getRiskColorConfig } from '../utils/simulator';

export default function DisasterRisk({ scenario, onNavigate }) {
  const riskConfig = getRiskColorConfig(scenario.riskLevel);

  const hazardDetails = [
    {
      id: 'flood',
      name: 'Hydrological & Flash Flood Risk',
      icon: Waves,
      level: scenario.hazards?.flood?.level || 'LOW',
      score: scenario.hazards?.flood?.score || 0,
      status: scenario.hazards?.flood?.status || 'No acute flood warning',
      color: '#0ea5e9',
      drivers: [
        { label: 'Current Rainfall', value: `${scenario.rainfall} mm` },
        { label: 'Runoff Coefficient', value: scenario.rainfall > 80 ? '0.88 (High)' : '0.24 (Normal)' },
        { label: 'River Crest Forecast', value: scenario.rainfall > 100 ? '+1.6m (Above Warning)' : 'Normal Bank' },
        { label: 'Drainage Saturation', value: `${Math.min(100, Math.round(scenario.rainfall * 0.7))}%` }
      ],
      recommendations: scenario.rainfall > 50
        ? 'Avoid all low-lying transit tunnels, avoid crossing flooded streets, prepare pumps for basements.'
        : 'Drainage infrastructure operating normally. Routine maintenance protocols.'
    },
    {
      id: 'heatwave',
      name: 'Severe Heatwave & Thermal Stress',
      icon: Flame,
      level: scenario.hazards?.heatwave?.level || 'LOW',
      score: scenario.hazards?.heatwave?.score || 0,
      status: scenario.hazards?.heatwave?.status || 'Normal seasonal comfort',
      color: '#f97316',
      drivers: [
        { label: 'Surface Temperature', value: `${scenario.temp}°C` },
        { label: 'Heat Index Feels Like', value: `${scenario.tempFeelsLike || scenario.temp}°C` },
        { label: 'Solar UV Index', value: `${scenario.uvIndex || 5} (0-12)` },
        { label: 'Wet Bulb Temperature', value: `${Math.round(scenario.temp * 0.7 + scenario.humidity * 0.1)}°C` }
      ],
      recommendations: scenario.temp >= 38
        ? 'Carry protective umbrella for shade, hydrate with electrolytes, restrict direct solar exposure.'
        : 'Thermal conditions within normal baseline. Safe for outdoor tasks.'
    },
    {
      id: 'cyclone',
      name: 'Tropical Cyclone & Gale Destabilization',
      icon: Tornado,
      level: scenario.hazards?.cyclone?.level || 'LOW',
      score: scenario.hazards?.cyclone?.score || 0,
      status: scenario.hazards?.cyclone?.status || 'Atmospheric pressure stable',
      color: '#ef4444',
      drivers: [
        { label: 'Sustained Wind Speed', value: `${scenario.wind} km/h` },
        { label: 'Barometric Core Pressure', value: `${scenario.pressure || 1012} hPa` },
        { label: 'Storm Surge Projection', value: scenario.wind > 100 ? '2.8m - 3.5m' : 'Normal Tide' },
        { label: 'Saffir-Simpson Equivalent', value: scenario.wind > 120 ? 'Category 2-3 Cyclone' : 'Non-cyclonic' }
      ],
      recommendations: scenario.wind >= 80
        ? 'STRICT WARNING: DO NOT USE UMBRELLAS. Retreat to reinforced interior safe-rooms and anchor shutters.'
        : 'No tropical depression or cyclonic rotation detected within 200 nautical miles.'
    }
  ];

  return (
    <div className="page-container disaster-risk-page">
      {/* Risk Engine Header Card */}
      <div className="risk-engine-hero" style={{ borderColor: riskConfig.color }}>
        <div className="risk-hero-main">
          <div className="risk-hero-badge-wrap">
            <span className="risk-hero-tag">CLIMATESHIELD AI ASSESSMENT ENGINE</span>
            <RiskBadge level={scenario.riskLevel} score={scenario.riskScore} size="lg" />
          </div>
          <h2 className="risk-hero-title">
            Aggregated Threat Level: <span style={{ color: riskConfig.color }}>{scenario.riskLevel} RISK</span>
          </h2>
          <p className="risk-hero-summary">{scenario.summary}</p>
          <div className="risk-meta-bar">
            <div className="meta-item">
              <span className="meta-label">Active Scenario</span>
              <span className="meta-value">{scenario.name}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Overall Risk Score</span>
              <span className="meta-value" style={{ color: riskConfig.color }}>
                {scenario.riskScore} / 100
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Response Protocol</span>
              <span className="meta-value">
                {scenario.riskLevel === 'CRITICAL'
                  ? 'Red Alert - Civil Defense Action'
                  : scenario.riskLevel === 'HIGH'
                  ? 'Orange Alert - High Preparedness'
                  : scenario.riskLevel === 'MODERATE'
                  ? 'Yellow Alert - Advisory Watch'
                  : 'Green Alert - Baseline Surveillance'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Specific Hazard Cards: Flood, Heatwave, Cyclone */}
      <div className="hazard-detailed-section">
        <h3 className="section-title">Hazard Vector Diagnostics</h3>
        <p className="section-subtitle">
          Independent risk modeling for hydrological, thermal, and meteorological vectors
        </p>

        <div className="hazard-detailed-grid">
          {hazardDetails.map((hazard) => {
            const Icon = hazard.icon;
            const hConfig = getRiskColorConfig(hazard.level);

            return (
              <div
                key={hazard.id}
                className="detailed-hazard-card"
                style={{ borderTopColor: hConfig.color }}
              >
                <div className="dh-header">
                  <div className="dh-icon-box" style={{ backgroundColor: `${hConfig.color}20`, color: hConfig.color }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="dh-name">{hazard.name}</h4>
                    <span className="dh-status">{hazard.status}</span>
                  </div>
                </div>

                <div className="dh-risk-row">
                  <span className="dh-risk-caption">Threat Probability</span>
                  <div className="dh-badge-wrap">
                    <RiskBadge level={hazard.level} score={hazard.score} size="sm" />
                  </div>
                </div>

                <div className="dh-meter-track">
                  <div
                    className="dh-meter-fill"
                    style={{
                      width: `${Math.min(100, Math.max(5, hazard.score))}%`,
                      backgroundColor: hConfig.color
                    }}
                  ></div>
                </div>

                <div className="dh-drivers-grid">
                  {hazard.drivers.map((drv, i) => (
                    <div key={i} className="driver-pill">
                      <span className="driver-label">{drv.label}</span>
                      <span className="driver-value">{drv.value}</span>
                    </div>
                  ))}
                </div>

                <div className="dh-action-box">
                  <span className="dh-action-title">Mitigation Directive:</span>
                  <p className="dh-action-text">{hazard.recommendations}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sector Impact Matrix */}
      <div className="impact-matrix-card">
        <div className="section-header">
          <div>
            <h3 className="section-title">Critical Infrastructure Vulnerability Matrix</h3>
            <p className="section-subtitle">Simulated impact propagation across metropolitan sectors</p>
          </div>
          <span className="header-tag">Simulated Matrix</span>
        </div>

        <div className="matrix-table-wrapper">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Sector</th>
                <th>Vulnerability</th>
                <th>Failure Probability</th>
                <th>Recommended Countermeasure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Public Transit & Roads</strong></td>
                <td>
                  <span className={`status-pill ${scenario.rainfall > 60 || scenario.wind > 90 ? 'pill-severe' : 'pill-safe'}`}>
                    {scenario.rainfall > 60 ? 'Waterlogging' : scenario.wind > 90 ? 'Gale Obstruction' : 'Operational'}
                  </span>
                </td>
                <td>{scenario.rainfall > 60 || scenario.wind > 90 ? '84%' : '12%'}</td>
                <td>{scenario.rainfall > 60 ? 'Close subway underpasses; redirect to bypass' : 'Maintain normal traffic cadence'}</td>
              </tr>
              <tr>
                <td><strong>Electrical Grid & Sub-stations</strong></td>
                <td>
                  <span className={`status-pill ${scenario.wind > 100 || scenario.temp > 42 ? 'pill-severe' : 'pill-safe'}`}>
                    {scenario.wind > 100 ? 'Line Collapse Risk' : scenario.temp > 42 ? 'Thermal Overload' : 'Stable'}
                  </span>
                </td>
                <td>{scenario.wind > 100 ? '92%' : scenario.temp > 42 ? '78%' : '8%'}</td>
                <td>{scenario.wind > 100 ? 'Preemptive grid de-energization in storm zone' : 'Normal load balancing'}</td>
              </tr>
              <tr>
                <td><strong>Human Outdoor Safety</strong></td>
                <td>
                  <span className={`status-pill ${scenario.riskLevel === 'CRITICAL' ? 'pill-severe' : scenario.riskLevel === 'HIGH' ? 'pill-moderate' : 'pill-safe'}`}>
                    {scenario.riskLevel} Risk
                  </span>
                </td>
                <td>{scenario.riskScore}%</td>
                <td>
                  {scenario.condition === 'Cyclone'
                    ? 'Strict indoor shelter. NEVER use umbrellas in gale winds!'
                    : 'Carry umbrella in sunny/windy/rainy conditions; stay hydrated.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
