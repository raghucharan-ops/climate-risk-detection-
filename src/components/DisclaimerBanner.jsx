// src/components/DisclaimerBanner.jsx
import React from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="demo-disclaimer-bar">
      <div className="demo-disclaimer-content">
        <span className="demo-tag">
          <Sparkles size={14} className="icon-pulse" />
          SIMULATION ENVIRONMENT
        </span>
        <div className="demo-text">
          <AlertCircle size={15} className="demo-icon" />
          <span>
            <strong>DEMO MODE:</strong> Weather data and predictions are simulated and may be inaccurate. This application is for educational and demonstration purposes only.
          </span>
        </div>
      </div>
    </div>
  );
}
