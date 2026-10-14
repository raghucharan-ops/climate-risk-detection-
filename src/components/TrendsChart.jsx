// src/components/TrendsChart.jsx
import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp, CloudRain, Thermometer, Wind } from 'lucide-react';

export default function TrendsChart({ trends = [], scenarioName = '' }) {
  const [metricView, setMetricView] = useState('both'); // 'both' | 'temp' | 'rainfall' | 'wind'

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-chart-tooltip">
          <p className="tooltip-time">Time: {label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="tooltip-item" style={{ color: entry.color }}>
              <span className="tooltip-bullet" style={{ backgroundColor: entry.color }}></span>
              <span className="tooltip-name">{entry.name}:</span>
              <span className="tooltip-val">
                {entry.value} {entry.name === 'Rainfall' ? 'mm' : entry.name === 'Wind' ? 'km/h' : '°C'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="trends-chart-card">
      <div className="trends-chart-header">
        <div className="trends-title-group">
          <div className="chart-icon-box">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="trends-title">24-Hour Diurnal Trend Simulation</h3>
            <p className="trends-subtitle">
              Simulated progression curve for <strong>{scenarioName}</strong>
            </p>
          </div>
        </div>

        <div className="trends-filter-buttons">
          <button
            className={`filter-btn ${metricView === 'both' ? 'active' : ''}`}
            onClick={() => setMetricView('both')}
          >
            Combined
          </button>
          <button
            className={`filter-btn ${metricView === 'temp' ? 'active' : ''}`}
            onClick={() => setMetricView('temp')}
          >
            <Thermometer size={14} /> Temp
          </button>
          <button
            className={`filter-btn ${metricView === 'rainfall' ? 'active' : ''}`}
            onClick={() => setMetricView('rainfall')}
          >
            <CloudRain size={14} /> Rainfall
          </button>
          <button
            className={`filter-btn ${metricView === 'wind' ? 'active' : ''}`}
            onClick={() => setMetricView('wind')}
          >
            <Wind size={14} /> Wind
          </button>
        </div>
      </div>

      <div className="trends-chart-container" style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trends} margin={{ top: 15, right: 25, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '15px' }}
              iconType="circle"
            />

            {(metricView === 'both' || metricView === 'temp') && (
              <Area
                type="monotone"
                dataKey="temp"
                name="Temperature"
                stroke="#f97316"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
            )}

            {(metricView === 'both' || metricView === 'rainfall') && (
              <Area
                type="monotone"
                dataKey="rainfall"
                name="Rainfall"
                stroke="#0ea5e9"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#rainGradient)"
              />
            )}

            {(metricView === 'both' || metricView === 'wind') && (
              <Area
                type="monotone"
                dataKey="wind"
                name="Wind"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                strokeDasharray={metricView === 'both' ? '4 4' : undefined}
                fillOpacity={1}
                fill="url(#windGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="trends-chart-footer">
        <span className="trend-footer-note">
          * Dynamic timeline reflecting simulation profile for {scenarioName}. Switch scenarios to project different curves.
        </span>
      </div>
    </div>
  );
}
