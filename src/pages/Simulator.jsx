import React, { useState } from 'react';
import {
  Sliders,
  Sun,
  Wind,
  CloudRain,
  CloudLightning,
  Waves,
  Flame,
  Tornado,
  Play,
  RotateCcw,
  Zap,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Loader2
} from 'lucide-react';
import {
  SCENARIOS,
  createCustomScenario,
  calculateRiskLevel,
  getRiskColorConfig
} from '../utils/simulator';
import RiskBadge from '../components/RiskBadge';
import UmbrellaReminder from '../components/UmbrellaReminder';

export default function Simulator({
  activeScenario,
  onSelectScenario,
  onNavigate,
  onUseRealLocation,
  isGeoLoading
}) {
  // Local state for custom slider controls
  const [customTemp, setCustomTemp] = useState(activeScenario.temp);
  const [customWind, setCustomWind] = useState(activeScenario.wind);
  const [customRain, setCustomRain] = useState(activeScenario.rainfall);
  const [customHumidity, setCustomHumidity] = useState(activeScenario.humidity);

  // Dynamic preview of custom sliders
  const dynamicRiskLevel = calculateRiskLevel(customTemp, customWind, customRain);
  const dynamicRiskConfig = getRiskColorConfig(dynamicRiskLevel);

  const getScenarioIcon = (iconName) => {
    switch (iconName) {
      case 'Sun':
        return Sun;
      case 'Wind':
        return Wind;
      case 'CloudRain':
        return CloudRain;
      case 'CloudLightning':
        return CloudLightning;
      case 'Waves':
        return Waves;
      case 'Flame':
        return Flame;
      case 'Tornado':
        return Tornado;
      default:
        return Sun;
    }
  };

  const handleApplyCustom = () => {
    const custom = createCustomScenario(activeScenario, {
      temp: customTemp,
      wind: customWind,
      rainfall: customRain,
      humidity: customHumidity
    });
    onSelectScenario(custom);
  };

  const handleResetSliders = () => {
    setCustomTemp(activeScenario.temp);
    setCustomWind(activeScenario.wind);
    setCustomRain(activeScenario.rainfall);
    setCustomHumidity(activeScenario.humidity);
  };

  return (
    <div className="page-container simulator-page">
      {/* Simulator Hero Intro */}
      <div className="simulator-hero">
        <div className="simulator-hero-text">
          <div className="simulator-tag">
            <Zap size={14} className="text-amber-400" />
            <span>DISASTER SCENARIO INJECTION ENGINE</span>
          </div>
          <h2 className="simulator-title">Simulated Weather & Disaster Playground</h2>
          <p className="simulator-subtitle">
            Switch between predefined climate anomalies or manipulate atmospheric variables to observe
            live risk reassessment and safety directives across ClimateShield AI.
          </p>
        </div>
      </div>

      {/* Umbrella Directive Preview */}
      <div className="sim-umbrella-preview">
        <UmbrellaReminder
          condition={activeScenario.condition}
          wind={activeScenario.wind}
        />
      </div>

      {/* Section 1: Predefined Scenarios (Requirement #6) */}
      <div className="sim-section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Predefined Disaster Scenarios</h3>
            <p className="section-subtitle">
              Select any scenario below to instantly update the entire application state
            </p>
          </div>
          <div className="sim-header-actions">
            <button
              className={`real-location-btn ${isGeoLoading ? 'btn-loading' : ''}`}
              onClick={onUseRealLocation}
              disabled={isGeoLoading}
              title="Query Open-Meteo for your device's live coordinates"
            >
              {isGeoLoading ? (
                <>
                  <Loader2 size={14} className="spin-icon" />
                  <span>Fetching GPS...</span>
                </>
              ) : (
                <>
                  <MapPin size={14} className="text-rose-500" />
                  <span>📍 Use My Real Location</span>
                </>
              )}
            </button>
            <span className="header-tag">7 Standard Scenarios</span>
          </div>
        </div>

        <div className="scenarios-cards-grid">
          {SCENARIOS.map((sc) => {
            const Icon = getScenarioIcon(sc.icon);
            const isSelected = activeScenario.id === sc.id;
            const rConfig = getRiskColorConfig(sc.riskLevel);

            return (
              <div
                key={sc.id}
                className={`scenario-card ${isSelected ? 'scenario-card-active' : ''}`}
                style={{
                  borderTopColor: rConfig.color
                }}
              >
                {isSelected && (
                  <div className="active-glow-badge">
                    <CheckCircle2 size={13} /> ACTIVE IN APP
                  </div>
                )}

                <div className="sc-card-top">
                  <div
                    className="sc-icon-wrap"
                    style={{
                      backgroundColor: `${rConfig.color}20`,
                      color: rConfig.color
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <RiskBadge level={sc.riskLevel} size="sm" />
                </div>

                <h4 className="sc-card-name">{sc.name}</h4>
                <p className="sc-card-desc">{sc.description}</p>

                <div className="sc-quick-metrics">
                  <div className="sc-metric-item">
                    <span className="m-label">Temp</span>
                    <span className="m-val">{sc.temp}°C</span>
                  </div>
                  <div className="sc-metric-item">
                    <span className="m-label">Wind</span>
                    <span className="m-val">{sc.wind} km/h</span>
                  </div>
                  <div className="sc-metric-item">
                    <span className="m-label">Rain</span>
                    <span className="m-val">{sc.rainfall} mm</span>
                  </div>
                </div>

                <button
                  className={`sc-activate-btn ${isSelected ? 'btn-active' : ''}`}
                  onClick={() => {
                    onSelectScenario(sc);
                    setCustomTemp(sc.temp);
                    setCustomWind(sc.wind);
                    setCustomRain(sc.rainfall);
                    setCustomHumidity(sc.humidity);
                  }}
                >
                  <Play size={14} />
                  <span>{isSelected ? 'Scenario Active' : 'Activate Scenario'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Custom Parameter Fine-Tuning Lab */}
      <div className="sim-section custom-tuning-section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Atmospheric Variable Tuner (Fine-Control)</h3>
            <p className="section-subtitle">
              Adjust individual parameters to trigger threshold crossings and watch the risk tier dynamically recalculate
            </p>
          </div>
          <button className="reset-sliders-btn" onClick={handleResetSliders}>
            <RotateCcw size={14} /> Reset to Active
          </button>
        </div>

        <div className="tuning-grid">
          <div className="sliders-panel">
            {/* Temperature Slider */}
            <div className="slider-control-group">
              <div className="slider-header">
                <span className="slider-name">Ambient Temperature:</span>
                <span className="slider-value-display">{customTemp} °C</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={customTemp}
                onChange={(e) => setCustomTemp(Number(e.target.value))}
                className="sim-slider temp-slider"
              />
              <div className="slider-ticks">
                <span>5°C (Chilly)</span>
                <span>25°C (Mild)</span>
                <span>38°C (Heatwave alert)</span>
                <span>50°C (Extreme)</span>
              </div>
            </div>

            {/* Wind Speed Slider */}
            <div className="slider-control-group">
              <div className="slider-header">
                <span className="slider-name">Sustained Wind Speed:</span>
                <span className="slider-value-display">{customWind} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="160"
                value={customWind}
                onChange={(e) => setCustomWind(Number(e.target.value))}
                className="sim-slider wind-slider"
              />
              <div className="slider-ticks">
                <span>0 (Calm)</span>
                <span>40 (Breezy)</span>
                <span>80 (Gale)</span>
                <span>120+ (Cyclone / Unsafe Umbrella)</span>
              </div>
            </div>

            {/* Rainfall Slider */}
            <div className="slider-control-group">
              <div className="slider-header">
                <span className="slider-name">Hourly Rainfall Accumulation:</span>
                <span className="slider-value-display">{customRain} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={customRain}
                onChange={(e) => setCustomRain(Number(e.target.value))}
                className="sim-slider rain-slider"
              />
              <div className="slider-ticks">
                <span>0 mm (Dry)</span>
                <span>30 mm (Rainy)</span>
                <span>80 mm (Heavy Rain)</span>
                <span>150+ mm (Flash Flood)</span>
              </div>
            </div>

            {/* Humidity Slider */}
            <div className="slider-control-group">
              <div className="slider-header">
                <span className="slider-name">Relative Humidity:</span>
                <span className="slider-value-display">{customHumidity} %</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={customHumidity}
                onChange={(e) => setCustomHumidity(Number(e.target.value))}
                className="sim-slider humidity-slider"
              />
              <div className="slider-ticks">
                <span>10% (Arid)</span>
                <span>50% (Comfortable)</span>
                <span>85% (High Moisture)</span>
                <span>100% (Saturated)</span>
              </div>
            </div>
          </div>

          {/* Dynamic Evaluation Card */}
          <div className="slider-result-panel" style={{ borderLeftColor: dynamicRiskConfig.color }}>
            <h4 className="result-panel-title">Real-Time Risk Calculation</h4>
            <div className="result-risk-badge">
              <RiskBadge level={dynamicRiskLevel} size="lg" />
            </div>

            <p className="result-risk-explanation">
              Based on {customTemp}°C, {customWind} km/h wind, and {customRain} mm rain,
              ClimateShield AI assigns a <strong>{dynamicRiskLevel} RISK</strong> evaluation.
            </p>

            <div className="result-conditions-list">
              <div className="cond-item">
                <span>Umbrella Feasibility:</span>
                <strong>
                  {customWind >= 75
                    ? '🚫 PROHIBITED / UNSAFE'
                    : '☂️ CARRY UMBRELLA'}
                </strong>
              </div>
              <div className="cond-item">
                <span>Hydrological Inundation:</span>
                <strong>{customRain >= 120 ? 'Critical Runoff' : customRain >= 50 ? 'Moderate Puddling' : 'Low Drainage Risk'}</strong>
              </div>
              <div className="cond-item">
                <span>Thermal Heat Index:</span>
                <strong>{customTemp >= 40 ? 'Severe Hyperthermia Hazard' : 'Safe Thermal Range'}</strong>
              </div>
            </div>

            <button
              className="apply-custom-btn"
              onClick={handleApplyCustom}
            >
              <Zap size={16} />
              <span>Apply Custom Parameters to Entire App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
