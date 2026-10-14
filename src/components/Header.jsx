// src/components/Header.jsx
import React, { useState } from 'react';
import {
  Menu,
  Sliders,
  MapPin,
  RefreshCw,
  Clock,
  Radio,
  Loader2,
  Info
} from 'lucide-react';
import { SCENARIO_KEYS, getScenario } from '../utils/simulator';
import { LOCATIONS } from '../data/mockData';
import RiskBadge from './RiskBadge';

export default function Header({
  currentPage,
  activeScenario,
  onSelectScenario,
  selectedLocation,
  setSelectedLocation,
  onToggleMobileMenu,
  onNavigate,
  onUseRealLocation,
  isGeoLoading
}) {
  const [showSourceTooltip, setShowSourceTooltip] = useState(false);

  const pageTitles = {
    dashboard: 'Operational Command Dashboard',
    weather: 'Simulated Weather Telemetry',
    risk: 'Disaster Risk & Hazard Assessment',
    alerts: 'Simulated Emergency Directives',
    simulator: 'Scenario Simulation Engine',
    safety: 'Preparedness Protocols & Go-Bag',
    info: 'Hackathon Mission & Project Specs'
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <Menu size={22} />
        </button>

        <div className="header-titles">
          <div className="header-breadcrumb">
            <span>ClimateShield AI</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{pageTitles[currentPage] || 'Dashboard'}</span>
          </div>
          <h1 className="header-page-title">{pageTitles[currentPage] || 'Dashboard'}</h1>
        </div>
      </div>

      <div className="header-right">
        {/* Location Selector (Supports Live GPS Location) */}
        <div className={`header-selector-pill ${selectedLocation.isLive ? 'pill-live-active' : ''}`}>
          <MapPin size={15} className={`selector-icon ${selectedLocation.isLive ? 'icon-live-gps' : ''}`} />
          <select
            value={selectedLocation.id}
            onChange={(e) => {
              if (e.target.value === 'live-gps') {
                if (onUseRealLocation) onUseRealLocation();
              } else {
                const loc = LOCATIONS.find((l) => l.id === e.target.value);
                if (loc) setSelectedLocation(loc);
              }
            }}
            className="header-select"
          >
            {selectedLocation.isLive && (
              <option value="live-gps">
                📍 Live GPS Location ({selectedLocation.region})
              </option>
            )}
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.region})
              </option>
            ))}
          </select>
        </div>

        {/* Quick Scenario Switcher with Data Source Transparency Tooltip */}
        <div className="header-scenario-dropdown">
          <Radio size={14} className="live-pulse-icon" />
          <span className="dropdown-label">
            {selectedLocation.isLive ? 'Mode:' : 'Preset:'}
          </span>
          <select
            value={selectedLocation.isLive ? 'live' : activeScenario.id}
            onChange={(e) => {
              if (e.target.value === 'live') {
                if (onUseRealLocation) onUseRealLocation();
              } else {
                const found = getScenario(e.target.value);
                onSelectScenario(found);
              }
            }}
            className="header-select scenario-select"
          >
            {selectedLocation.isLive && (
              <option value="live">
                📡 Live Open-Meteo Feed
              </option>
            )}
            {SCENARIO_KEYS.map((key) => {
              const sc = getScenario(key);
              return (
                <option key={sc.id} value={sc.id}>
                  {sc.name} ({sc.riskLevel} Risk)
                </option>
              );
            })}
          </select>

          {/* Data Source Transparency Info Icon (Requirement #2) */}
          <div className="data-source-container">
            <button
              type="button"
              className={`data-source-btn ${showSourceTooltip ? 'btn-tooltip-active' : ''}`}
              onClick={() => setShowSourceTooltip((prev) => !prev)}
              onMouseEnter={() => setShowSourceTooltip(true)}
              onMouseLeave={() => setShowSourceTooltip(false)}
              aria-label="Data source transparency note"
              title="Click to view model & data source disclosure"
            >
              <Info size={14} className="data-source-info-icon" />
            </button>

            {showSourceTooltip && (
              <div
                className="data-source-tooltip"
                onMouseEnter={() => setShowSourceTooltip(true)}
                onMouseLeave={() => setShowSourceTooltip(false)}
              >
                <div className="tooltip-notch"></div>
                <div className="tooltip-title-row">
                  <Info size={13} className="text-sky-400" />
                  <strong>Data Source & Model Note</strong>
                </div>
                <p className="tooltip-text">
                  Data provided by open-source global models (ECMWF/GFS). Minor variations (1-3°C) from commercial apps are normal due to differences in grid resolution and proprietary ground sensor networks.
                </p>
              </div>
            )}
          </div>
        </div>

        <RiskBadge level={activeScenario.riskLevel} score={activeScenario.riskScore} size="sm" />

        <button
          className="header-action-btn"
          onClick={() => onNavigate('simulator')}
          title="Open Weather Simulator"
        >
          <Sliders size={16} />
          <span className="btn-text-responsive">Simulate</span>
        </button>
      </div>
    </header>
  );
}
