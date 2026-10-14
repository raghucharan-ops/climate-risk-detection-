// src/pages/Dashboard.jsx
import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  MapPin,
  Loader2,
  Radio,
  X
} from 'lucide-react';
import WeatherCardsGrid from '../components/WeatherCard';
import UmbrellaReminder from '../components/UmbrellaReminder';
import RiskBadge from '../components/RiskBadge';
import HazardOverviewGrid from '../components/HazardCard';
import TrendsChart from '../components/TrendsChart';
import DemoAlert from '../components/DemoAlert';
import SeismicMonitor from '../components/SeismicMonitor';
import { SCENARIOS } from '../utils/simulator';
import { getRiskColorConfig } from '../utils/simulator';

export default function Dashboard({
  scenario,
  onSelectScenario,
  onNavigate,
  selectedLocation,
  onUseRealLocation,
  isGeoLoading,
  geoError,
  geoSuccess
}) {
  const riskConfig = getRiskColorConfig(scenario.riskLevel);

  return (
    <div className="page-container dashboard-page">
      {/* Geolocation Feedback Toasts */}
      {geoError && (
        <div className="geo-toast geo-toast-error">
          <AlertTriangle size={18} className="text-rose-500 flex-shrink-0" />
          <div className="geo-toast-text">
            <strong>Location Error:</strong> {geoError}
          </div>
        </div>
      )}

      {geoSuccess && (
        <div className="geo-toast geo-toast-success">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <div className="geo-toast-text">
            <strong>Live Sync Success:</strong> {geoSuccess}
          </div>
        </div>
      )}

      {/* Quick Scenario Switcher Bar with '📍 Use My Real Location' Button */}
      <section className="quick-simulator-bar">
        <div className="quick-simulator-label">
          <Sliders size={16} className="text-teal-500" />
          <span>Instant Disaster Scenario Switcher:</span>
        </div>

        <div className="quick-buttons-row">
          {/* 📍 Use My Real Location Button (Requested Feature) */}
          <button
            className={`real-location-btn ${isGeoLoading ? 'btn-loading' : ''} ${selectedLocation.isLive ? 'active-live-btn' : ''}`}
            onClick={onUseRealLocation}
            disabled={isGeoLoading}
            title="Fetch live weather for your exact GPS coordinates using Open-Meteo API"
          >
            {isGeoLoading ? (
              <>
                <Loader2 size={15} className="spin-icon" />
                <span>Locating GPS...</span>
              </>
            ) : (
              <>
                <MapPin size={15} className={`pin-icon ${selectedLocation.isLive ? 'pin-live' : ''}`} />
                <span>📍 Use My Real Location</span>
              </>
            )}
            {selectedLocation.isLive && (
              <span className="live-status-dot" title="Live Telemetry Active"></span>
            )}
          </button>

          <div className="quick-bar-divider" />

          {/* Predefined Scenario Buttons */}
          {SCENARIOS.map((sc) => {
            const isActive = !selectedLocation.isLive && scenario.id === sc.id;
            return (
              <button
                key={sc.id}
                className={`quick-scenario-btn ${isActive ? 'active-quick-btn' : ''}`}
                onClick={() => onSelectScenario(sc)}
              >
                <span className="btn-sc-name">{sc.name}</span>
                <span className={`btn-risk-tag tag-${sc.riskLevel.toLowerCase()}`}>
                  {sc.riskLevel}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Mandatory Umbrella Reminder Banner (Requirement #5) */}
      <section className="dashboard-section umbrella-section">
        <UmbrellaReminder condition={scenario.condition} wind={scenario.wind} />
      </section>

      {/* Overall Risk & Scenario Overview Banner */}
      <section className="overview-hero-card" style={{ borderLeftColor: riskConfig.color }}>
        <div className="overview-hero-content">
          <div className="hero-top-row">
            <div className="hero-status-heading">
              {/* Location Label - Displays 'Live GPS Location' when activated */}
              <span className={`location-pill ${selectedLocation.isLive ? 'live-gps-pill' : ''}`}>
                {selectedLocation.isLive ? (
                  <>
                    <Radio size={12} className="live-pulse-icon" />
                    <strong>Live GPS Location</strong> · {selectedLocation.region}
                  </>
                ) : (
                  <>📍 {selectedLocation.name} · {selectedLocation.region}</>
                )}
              </span>
              <h2 className="hero-scenario-title">
                {selectedLocation.isLive ? 'Live Real-Time Weather' : `${scenario.name} Scenario Active`}
              </h2>
            </div>
            <div className="hero-risk-meta">
              <RiskBadge level={scenario.riskLevel} score={scenario.riskScore} size="lg" />
            </div>
          </div>

          <p className="hero-description">{scenario.description}</p>

          <div className="hero-metrics-summary">
            <div className="summary-pill">
              <span className="pill-caption">Condition</span>
              <span className="pill-val">{scenario.condition}</span>
            </div>
            <div className="summary-pill">
              <span className="pill-caption">Ambient Temp</span>
              <span className="pill-val">{scenario.temp}°C</span>
            </div>
            <div className="summary-pill">
              <span className="pill-caption">Precipitation</span>
              <span className="pill-val">{scenario.rainfall} mm</span>
            </div>
            <div className="summary-pill">
              <span className="pill-caption">Peak Gusts</span>
              <span className="pill-val">{scenario.wind} km/h</span>
            </div>
            <div className="summary-pill">
              <span className="pill-caption">Disaster Threat</span>
              <span className="pill-val" style={{ color: riskConfig.color, fontWeight: '700' }}>
                {scenario.riskLevel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Weather Telemetry Cards */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h3 className="section-title">
              {selectedLocation.isLive ? 'Live GPS Weather Telemetry (Open-Meteo)' : 'Atmospheric & Meteorological Telemetry'}
            </h3>
            <p className="section-subtitle">
              {selectedLocation.isLive
                ? `Real-time localized satellite data at ${selectedLocation.coordinates}`
                : 'Real-time simulated telemetry sensors across the district'}
            </p>
          </div>
          <button className="section-link-btn" onClick={() => onNavigate('weather')}>
            Detailed Sensors <ArrowRight size={14} />
          </button>
        </div>
        <WeatherCardsGrid scenario={scenario} />
      </section>

      {/* Seismic & Earthquake Monitor (USGS Live Integration) */}
      <section className="dashboard-section">
        <SeismicMonitor selectedLocation={selectedLocation} />
      </section>

      {/* Hazard Monitoring Cards (Flood, Heatwave, Cyclone) */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Multi-Hazard Disaster Surveillance</h3>
            <p className="section-subtitle">Categorical threat vectors evaluated by ClimateShield predictive model</p>
          </div>
          <button className="section-link-btn" onClick={() => onNavigate('risk')}>
            Full Risk Matrix <ArrowRight size={14} />
          </button>
        </div>
        <HazardOverviewGrid hazards={scenario.hazards} />
      </section>

      {/* Interactive Trends Chart (Recharts) */}
      <section className="dashboard-section">
        <TrendsChart
          trends={scenario.historicalTrends || []}
          scenarioName={selectedLocation.isLive ? 'Live GPS Telemetry' : scenario.name}
        />
      </section>

      {/* Alerts and Action Directives */}
      <section className="dashboard-section two-column-section">
        <div className="col-left">
          <div className="section-header">
            <div>
              <h3 className="section-title">Active Emergency Directives</h3>
              <p className="section-subtitle">
                {selectedLocation.isLive ? 'Localized advisories based on real-time readings' : 'Simulated alerts generated for the current scenario'}
              </p>
            </div>
            <button className="section-link-btn" onClick={() => onNavigate('alerts')}>
              All Alerts ({scenario.alerts?.length || 0}) <ArrowRight size={14} />
            </button>
          </div>

          {scenario.alerts && scenario.alerts.length > 0 ? (
            <div className="alerts-stack-compact">
              {scenario.alerts.slice(0, 2).map((alt) => (
                <DemoAlert key={alt.id} alert={alt} />
              ))}
            </div>
          ) : (
            <div className="clean-status-card">
              <CheckCircle2 size={32} className="text-emerald-500" />
              <h4>No Active Disaster Broadcasts</h4>
              <p>Baseline parameters remain safe. Normal public advisory in effect.</p>
            </div>
          )}
        </div>

        <div className="col-right">
          <div className="section-header">
            <div>
              <h3 className="section-title">Preparedness Quick Actions</h3>
              <p className="section-subtitle">Immediate safety checklist recommendations</p>
            </div>
            <button className="section-link-btn" onClick={() => onNavigate('safety')}>
              Full Checklist <ArrowRight size={14} />
            </button>
          </div>

          <div className="quick-safety-card">
            <h4 className="safety-prompt-title">
              Recommended Safety Directives for {selectedLocation.isLive ? 'Live Location' : scenario.name}:
            </h4>
            <ul className="quick-safety-list">
              {scenario.riskLevel === 'CRITICAL' ? (
                <>
                  <li className="critical-point">
                    🚨 <strong>Evacuate low-elevation or coastal zones</strong> immediately if directed by sirens.
                  </li>
                  <li className="critical-point">
                    🚫 <strong>DO NOT use an umbrella</strong> outdoors in gale winds or cyclones.
                  </li>
                  <li>
                    🎒 Grab your <strong>72-Hour Emergency Go-Bag</strong> and seal identity papers in waterproof pouches.
                  </li>
                  <li>
                    ⚡ Disconnect primary electrical circuit breakers to prevent short circuits and fires.
                  </li>
                </>
              ) : scenario.riskLevel === 'HIGH' ? (
                <>
                  <li>
                    💧 Ensure family members drink <strong>3+ liters of water</strong> or avoid flooded underpasses.
                  </li>
                  <li>
                    ☂️ <strong>Carry an umbrella</strong> for UV shade (heatwave) or rain downpour.
                  </li>
                  <li>
                    📻 Keep emergency radio or mobile alerts turned on for sudden escalation.
                  </li>
                  <li>
                    🚗 Refrain from non-essential vehicular travel through waterlogged roads.
                  </li>
                </>
              ) : (
                <>
                  <li>
                    ☂️ <strong>Carry an umbrella</strong> when stepping out in sunny, windy, or rainy conditions.
                  </li>
                  <li>
                    🎒 Periodically inspect your household 72-Hour Emergency Go-Bag supplies.
                  </li>
                  <li>
                    🌤️ Stay informed with daily ClimateShield AI forecasts.
                  </li>
                </>
              )}
            </ul>

            <button
              className="action-pill-button"
              onClick={() => onNavigate('safety')}
            >
              Open Interactive Safety Checklist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
