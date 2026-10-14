// src/App.jsx
import React, { useState } from 'react';
import DisclaimerBanner from './components/DisclaimerBanner';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import WeatherMonitoring from './pages/WeatherMonitoring';
import DisasterRisk from './pages/DisasterRisk';
import Alerts from './pages/Alerts';
import Simulator from './pages/Simulator';
import Safety from './pages/Safety';
import ProjectInfo from './pages/ProjectInfo';
import { SCENARIO_PRESETS, LOCATIONS } from './data/mockData';
import { buildLiveScenario } from './utils/liveWeather';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeScenario, setActiveScenario] = useState(SCENARIO_PRESETS.SUNNY);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Live Geolocation state
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [geoSuccess, setGeoSuccess] = useState(null);

  const handleSelectScenario = (sc) => {
    setActiveScenario(sc);
    // If switching to a predefined scenario, restore standard location if was on GPS
    if (selectedLocation.isLive && !sc.isLive) {
      setSelectedLocation(LOCATIONS[0]);
    }
  };

  /**
   * Fetch live coordinates and query Open-Meteo free API
   */
  const handleUseRealLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser environment.');
      return;
    }

    setIsGeoLoading(true);
    setGeoError(null);
    setGeoSuccess(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // 1. Weather API query (including peak wind gusts wind_gusts_10m)
          const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_gusts_10m,weather_code`;
          // 2. Air Quality API query (PM2.5 & PM10 for Indian CPCB standard)
          const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5`;

          const [weatherRes, aqRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(airQualityUrl).catch((err) => {
              console.warn('Air quality fetch warning:', err);
              return null;
            })
          ]);
          
          if (!weatherRes.ok) {
            throw new Error(`Open-Meteo API returned status ${weatherRes.status}`);
          }

          const weatherData = await weatherRes.json();
          const aqData = aqRes && aqRes.ok ? await aqRes.json() : null;

          const liveScenario = buildLiveScenario(weatherData, aqData, latitude, longitude);

          // Change Location label to 'Live GPS Location'
          const gpsLocation = {
            id: 'live-gps',
            name: 'Live GPS Location',
            region: `${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E`,
            coordinates: `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`,
            lat: latitude,
            lon: longitude,
            isLive: true
          };

          setSelectedLocation(gpsLocation);
          setActiveScenario(liveScenario);
          setGeoSuccess(
            `Live GPS telemetry loaded (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). CPCB AQI: ${liveScenario.aqi} (${liveScenario.aqiStatus}) · Threat Level: ${liveScenario.riskLevel} RISK.`
          );

          // Clear success banner after 6 seconds
          setTimeout(() => setGeoSuccess(null), 6000);
        } catch (err) {
          console.error('Error fetching live weather & AQI:', err);
          setGeoError(`Unable to fetch live weather: ${err.message}`);
          setTimeout(() => setGeoError(null), 8000);
        } finally {
          setIsGeoLoading(false);
        }
      },
      (error) => {
        setIsGeoLoading(false);
        let errorMsg = 'Could not access your location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission was denied. Please allow location access in your browser to view live localized weather.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Location information is temporarily unavailable.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Location request timed out. Please click again to retry.';
        }
        setGeoError(errorMsg);
        setTimeout(() => setGeoError(null), 8000);
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            scenario={activeScenario}
            onSelectScenario={handleSelectScenario}
            onNavigate={setCurrentPage}
            selectedLocation={selectedLocation}
            onUseRealLocation={handleUseRealLocation}
            isGeoLoading={isGeoLoading}
            geoError={geoError}
            geoSuccess={geoSuccess}
          />
        );
      case 'weather':
        return (
          <WeatherMonitoring
            scenario={activeScenario}
            selectedLocation={selectedLocation}
          />
        );
      case 'risk':
        return (
          <DisasterRisk
            scenario={activeScenario}
            onNavigate={setCurrentPage}
          />
        );
      case 'alerts':
        return (
          <Alerts
            scenario={activeScenario}
            onNavigate={setCurrentPage}
          />
        );
      case 'simulator':
        return (
          <Simulator
            activeScenario={activeScenario}
            onSelectScenario={handleSelectScenario}
            onNavigate={setCurrentPage}
            onUseRealLocation={handleUseRealLocation}
            isGeoLoading={isGeoLoading}
          />
        );
      case 'safety':
        return (
          <Safety
            scenario={activeScenario}
          />
        );
      case 'info':
        return (
          <ProjectInfo />
        );
      default:
        return (
          <Dashboard
            scenario={activeScenario}
            onSelectScenario={handleSelectScenario}
            onNavigate={setCurrentPage}
            selectedLocation={selectedLocation}
            onUseRealLocation={handleUseRealLocation}
            isGeoLoading={isGeoLoading}
            geoError={geoError}
            geoSuccess={geoSuccess}
          />
        );
    }
  };

  return (
    <div className="app-root">
      {/* Persistent Disclaimer Banner (Requirement #1 & #3) */}
      <DisclaimerBanner />

      <div className="app-layout">
        {/* Navigation Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          activeScenario={activeScenario}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Area */}
        <div className="app-main-viewport">
          <Header
            currentPage={currentPage}
            activeScenario={activeScenario}
            onSelectScenario={handleSelectScenario}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            onToggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)}
            onNavigate={setCurrentPage}
            onUseRealLocation={handleUseRealLocation}
            isGeoLoading={isGeoLoading}
          />

          <main className="app-main-content">
            {renderActivePage()}
          </main>

          <footer className="app-global-footer">
            <div className="footer-content">
              <p className="footer-line-1">
                <strong>ClimateShield AI</strong> — Understand Risk. Prepare Early. Stay Safer.
              </p>
              <p className="footer-line-2">
                DEMO MODE: Weather data and predictions are simulated and may be inaccurate. This application is for educational and demonstration purposes only.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
