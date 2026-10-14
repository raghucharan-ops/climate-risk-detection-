// src/components/WeatherCard.jsx
import React from 'react';
import {
  Thermometer,
  Wind,
  CloudRain,
  Droplets,
  Gauge,
  Sun,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export function MetricCard({
  title,
  value,
  unit = '',
  subtitle,
  icon: Icon,
  variant = 'blue',
  trend = null,
  highlight = false
}) {
  return (
    <div className={`metric-card card-${variant} ${highlight ? 'card-highlighted' : ''}`}>
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        <div className={`metric-icon-box box-${variant}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="metric-body">
        <div className="metric-value-row">
          <span className="metric-value">{value}</span>
          {unit && <span className="metric-unit">{unit}</span>}
        </div>
        {subtitle && <p className="metric-subtitle">{subtitle}</p>}
      </div>
      {trend && (
        <div className={`metric-trend ${trend.direction === 'up' ? 'trend-up' : 'trend-down'}`}>
          {trend.direction === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{trend.text}</span>
        </div>
      )}
    </div>
  );
}

export default function WeatherCardsGrid({ scenario }) {
  if (!scenario) return null;

  return (
    <div className="weather-grid">
      <MetricCard
        title="Temperature"
        value={scenario.temp}
        unit="°C"
        subtitle={`Feels like ${scenario.tempFeelsLike || scenario.temp}°C`}
        icon={Thermometer}
        variant={scenario.temp >= 35 ? 'red' : scenario.temp <= 20 ? 'blue' : 'teal'}
        trend={{ direction: scenario.temp > 28 ? 'up' : 'down', text: 'Diurnal trend' }}
      />

      <MetricCard
        title="Peak Wind Gusts"
        value={scenario.windGusts !== undefined && scenario.windGusts !== null ? scenario.windGusts : scenario.wind}
        unit="km/h"
        subtitle={
          (scenario.windGusts ?? scenario.wind) >= 100
            ? 'Extreme Gale Force'
            : (scenario.windGusts ?? scenario.wind) >= 45
            ? 'Strong Peak Gusts'
            : 'Light Breeze'
        }
        icon={Wind}
        variant={(scenario.windGusts ?? scenario.wind) >= 90 ? 'red' : (scenario.windGusts ?? scenario.wind) >= 40 ? 'orange' : 'teal'}
        trend={{
          direction: (scenario.windGusts ?? scenario.wind) > 30 ? 'up' : 'down',
          text: scenario.sustainedWind ? `Sustained: ${scenario.sustainedWind} km/h` : 'Anemometer peak gust'
        }}
      />

      <MetricCard
        title="Precipitation"
        value={scenario.rainfall}
        unit="mm"
        subtitle={scenario.rainfall > 100 ? 'Torrents / Flash Flood' : scenario.rainfall > 20 ? 'Moderate Rain' : 'Dry / Nil'}
        icon={CloudRain}
        variant={scenario.rainfall >= 80 ? 'red' : scenario.rainfall >= 15 ? 'blue' : 'teal'}
        trend={{ direction: scenario.rainfall > 0 ? 'up' : 'down', text: 'Gauge accumulation' }}
      />

      <MetricCard
        title="Relative Humidity"
        value={scenario.humidity}
        unit="%"
        subtitle={scenario.humidity > 80 ? 'High Moisture Saturation' : 'Comfortable Zone'}
        icon={Droplets}
        variant="teal"
      />

      <MetricCard
        title="Atmospheric Pressure"
        value={scenario.pressure || 1012}
        unit="hPa"
        subtitle={scenario.pressure < 980 ? 'Extreme Low Pressure Core' : 'Normal Barometric'}
        icon={Gauge}
        variant={scenario.pressure < 990 ? 'red' : 'blue'}
      />

      <MetricCard
        title="Solar UV Index"
        value={scenario.uvIndex !== undefined ? scenario.uvIndex : 5}
        unit="UV"
        subtitle={scenario.uvIndex >= 8 ? 'Very High Radiation' : scenario.uvIndex <= 2 ? 'Low Exposure' : 'Moderate'}
        icon={Sun}
        variant={scenario.uvIndex >= 8 ? 'orange' : 'teal'}
      />

      <MetricCard
        title="AQI (India CPCB Standard)"
        value={scenario.aqi || 45}
        unit="AQI"
        subtitle={
          scenario.pm25 !== undefined && scenario.pm25 !== null
            ? `${scenario.aqiStatus || 'Good'} · PM2.5: ${scenario.pm25} µg/m³`
            : `${scenario.aqiStatus || 'Good'} (CPCB Scale)`
        }
        icon={Activity}
        variant={scenario.aqi > 200 ? 'red' : scenario.aqi > 100 ? 'orange' : 'blue'}
      />
    </div>
  );
}
