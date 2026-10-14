// src/components/UmbrellaReminder.jsx
import React from 'react';
import { Umbrella, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { checkUmbrellaStatus } from '../utils/simulator';

export default function UmbrellaReminder({ condition, wind = 0 }) {
  const statusInfo = checkUmbrellaStatus(condition, wind);

  if (statusInfo.status === 'MANDATORY_REMINDER') {
    return (
      <div className="umbrella-banner banner-mandatory">
        <div className="umbrella-banner-glow"></div>
        <div className="umbrella-banner-content">
          <div className="umbrella-icon-wrapper">
            <Umbrella size={28} className="umbrella-main-icon" />
          </div>
          <div className="umbrella-text-block">
            <div className="umbrella-header-row">
              <span className="umbrella-tag">SAFETY DIRECTIVE</span>
              <span className="umbrella-condition-indicator">Active for {condition} Weather</span>
            </div>
            {/* EXACT SPECIFICATION REQUIREMENT */}
            <p className="umbrella-exact-text">
              ☂️ Umbrella Reminder: Carry an umbrella whenever you go outside in sunny, windy, or rainy conditions.
            </p>
            <p className="umbrella-subtext">
              Deflects intense solar UV rays in sunny conditions, provides rain barrier in showers, and shields against windborne dust.
            </p>
          </div>
        </div>
        <div className="umbrella-status-chip chip-recommended">
          <CheckCircle2 size={16} />
          <span>Recommended</span>
        </div>
      </div>
    );
  }

  if (statusInfo.status === 'UNSAFE') {
    return (
      <div className="umbrella-banner banner-danger">
        <div className="umbrella-banner-glow-danger"></div>
        <div className="umbrella-banner-content">
          <div className="umbrella-icon-wrapper danger-icon-wrapper">
            <AlertOctagon size={28} className="danger-main-icon" />
          </div>
          <div className="umbrella-text-block">
            <div className="umbrella-header-row">
              <span className="umbrella-tag-danger">CRITICAL HAZARD WARNING</span>
              <span className="umbrella-condition-indicator-danger">Active for {condition}</span>
            </div>
            <p className="umbrella-exact-text danger-text">
              ⚠️ Cyclone / Severe Storm Warning: DO NOT use an umbrella! Extreme winds will instantly invert or shred umbrellas, turning rib spokes into lethal projectiles while offering zero protection. Seek solid indoor shelter immediately.
            </p>
            <p className="umbrella-subtext danger-subtext">
              Wind speeds ({wind} km/h) surpass safe handheld canopy thresholds. Keep both hands free for balance or physical bracing.
            </p>
          </div>
        </div>
        <div className="umbrella-status-chip chip-prohibited">
          <AlertOctagon size={16} />
          <span>DO NOT USE</span>
        </div>
      </div>
    );
  }

  return null;
}
