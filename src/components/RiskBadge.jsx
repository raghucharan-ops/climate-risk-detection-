// src/components/RiskBadge.jsx
import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, ShieldX } from 'lucide-react';
import { getRiskColorConfig } from '../utils/simulator';

export default function RiskBadge({ level = 'LOW', score = null, size = 'md', showIcon = true }) {
  const config = getRiskColorConfig(level);

  const getIcon = () => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL':
        return <ShieldX size={size === 'lg' ? 20 : size === 'sm' ? 14 : 16} />;
      case 'HIGH':
        return <ShieldAlert size={size === 'lg' ? 20 : size === 'sm' ? 14 : 16} />;
      case 'MODERATE':
        return <AlertTriangle size={size === 'lg' ? 20 : size === 'sm' ? 14 : 16} />;
      case 'LOW':
      default:
        return <ShieldCheck size={size === 'lg' ? 20 : size === 'sm' ? 14 : 16} />;
    }
  };

  return (
    <div
      className={`risk-badge risk-${level.toLowerCase()} size-${size}`}
      style={{
        borderColor: config.badgeBorder,
        backgroundColor: config.badgeBg,
        color: config.textColor
      }}
    >
      <span className="risk-dot" style={{ backgroundColor: config.color }}></span>
      {showIcon && <span className="risk-badge-icon">{getIcon()}</span>}
      <span className="risk-label">{level} RISK</span>
      {score !== null && score !== undefined && (
        <span className="risk-score-pill" style={{ backgroundColor: config.color }}>
          {score}/100
        </span>
      )}
    </div>
  );
}
