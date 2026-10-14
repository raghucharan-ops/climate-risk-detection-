// src/components/HazardCard.jsx
import React from 'react';
import { Waves, Flame, Tornado, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getRiskColorConfig } from '../utils/simulator';

export function SingleHazardCard({ type, hazardData }) {
  const meta = {
    flood: {
      title: 'Inundation & Flood Risk',
      icon: Waves,
      defaultColor: '#0ea5e9'
    },
    heatwave: {
      title: 'Heatwave & Thermal Stress',
      icon: Flame,
      defaultColor: '#f97316'
    },
    cyclone: {
      title: 'Cyclonic Storm & High Gale',
      icon: Tornado,
      defaultColor: '#8b5cf6'
    }
  }[type] || {
    title: 'Environmental Hazard',
    icon: AlertCircle,
    defaultColor: '#0ea5e9'
  };

  const Icon = meta.icon;
  const level = hazardData?.level || 'LOW';
  const score = hazardData?.score || 0;
  const status = hazardData?.status || 'Monitoring active baseline';
  const config = getRiskColorConfig(level);

  return (
    <div className="hazard-card">
      <div className="hazard-card-top">
        <div className="hazard-title-wrap">
          <div className="hazard-icon-box" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
            <Icon size={20} />
          </div>
          <div>
            <h4 className="hazard-card-title">{meta.title}</h4>
            <span className="hazard-status-line">{status}</span>
          </div>
        </div>
        <span
          className="hazard-badge"
          style={{
            backgroundColor: config.badgeBg,
            borderColor: config.badgeBorder,
            color: config.textColor
          }}
        >
          {level}
        </span>
      </div>

      <div className="hazard-meter-section">
        <div className="meter-labels">
          <span className="meter-caption">Threat Probability Index</span>
          <span className="meter-value" style={{ color: config.color }}>{score}%</span>
        </div>
        <div className="meter-track">
          <div
            className="meter-fill"
            style={{
              width: `${Math.min(100, Math.max(5, score))}%`,
              backgroundColor: config.color
            }}
          ></div>
        </div>
      </div>

      <div className="hazard-footer">
        <div className="hazard-indicator">
          {level === 'LOW' ? (
            <CheckCircle2 size={14} className="text-emerald-500" />
          ) : (
            <AlertCircle size={14} style={{ color: config.color }} />
          )}
          <span>
            {level === 'CRITICAL'
              ? 'Urgent mitigation measures recommended'
              : level === 'HIGH'
              ? 'Heightened readiness protocol'
              : level === 'MODERATE'
              ? 'Vigilant monitoring in place'
              : 'Safe operational status'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HazardOverviewGrid({ hazards }) {
  if (!hazards) return null;

  return (
    <div className="hazard-grid">
      <SingleHazardCard type="flood" hazardData={hazards.flood} />
      <SingleHazardCard type="heatwave" hazardData={hazards.heatwave} />
      <SingleHazardCard type="cyclone" hazardData={hazards.cyclone} />
    </div>
  );
}
