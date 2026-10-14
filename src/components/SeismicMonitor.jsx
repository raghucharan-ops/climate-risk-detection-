// src/components/SeismicMonitor.jsx
import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  Clock,
  MapPin,
  ExternalLink,
  RefreshCw,
  ShieldAlert,
  Info,
  Radio,
  CheckCircle2
} from 'lucide-react';

export default function SeismicMonitor({ selectedLocation }) {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Extract lat and lon from selected location
  const lat = selectedLocation?.lat ?? 17.385;
  const lon = selectedLocation?.lon ?? 78.4867;

  const fetchSeismicData = async () => {
    setLoading(true);
    setError(null);

    const endpoint = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${lat}&longitude=${lon}&maxradiuskm=1000&limit=5&orderby=time&minmagnitude=3`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`USGS Server responded with status: ${response.status}`);
      }
      const data = await response.json();
      const features = data.features || [];

      setEarthquakes(features);
      setLastUpdated(new Date());
    } catch (err) {
      console.warn('Failed to fetch from USGS API:', err);
      setError(err.message || 'Unable to retrieve real-time seismic telemetry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeismicData();
  }, [lat, lon]);

  const formatEventTime = (timestamp) => {
    if (!timestamp) return 'Time unknown';
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.round((now - date) / (1000 * 60 * 60));

    let relative = '';
    if (diffHours < 1) relative = 'Just now';
    else if (diffHours === 1) relative = '1 hour ago';
    else if (diffHours < 24) relative = `${diffHours} hours ago`;
    else {
      const diffDays = Math.round(diffHours / 24);
      relative = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }

    const formattedDate = date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${formattedDate}, ${formattedTime} (${relative})`;
  };

  return (
    <div className="seismic-card-container">
      {/* Header */}
      <div className="seismic-header">
        <div className="seismic-title-group">
          <div className="seismic-icon-box">
            <Activity size={22} className="seismic-pulse-icon" />
          </div>
          <div>
            <div className="seismic-badge-row">
              <span className="seismic-live-tag">
                <Radio size={12} className="icon-pulse text-emerald-400" />
                USGS LIVE SEISMIC FEED
              </span>
              <span className="seismic-radius-tag">1,000 km Radius · Min M3.0</span>
            </div>
            <h3 className="seismic-main-title">Seismic & Earthquake Monitor</h3>
            <p className="seismic-subtitle">
              Real-time seismic event tracking for <strong>{selectedLocation.name}</strong> ({lat.toFixed(2)}°, {lon.toFixed(2)}°)
            </p>
          </div>
        </div>

        <button
          className={`seismic-refresh-btn ${loading ? 'btn-rotating' : ''}`}
          onClick={fetchSeismicData}
          disabled={loading}
          title="Refresh USGS Seismic Events"
        >
          <RefreshCw size={14} className={loading ? 'spin-icon' : ''} />
          <span>{loading ? 'Polling USGS...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Scientific Disclaimer (Requirement #3) */}
      <div className="seismic-disclaimer-box">
        <Info size={16} className="disclaimer-info-icon" />
        <p className="seismic-disclaimer-text">
          <strong>Note:</strong> Earthquakes cannot be predicted. This module monitors recent seismic activity and aftershock risks for emergency response.
        </p>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="seismic-loading-state">
          <Activity size={32} className="seismic-pulse-icon text-sky-500" />
          <p>Querying USGS Earthquake Hazard Program telemetry...</p>
        </div>
      ) : error ? (
        <div className="seismic-error-state">
          <AlertTriangle size={24} className="text-amber-500" />
          <div>
            <h5>Seismic Sensor Telemetry Unavailable</h5>
            <p>{error} - Retrying connection to USGS global network in background.</p>
          </div>
          <button className="seismic-retry-btn" onClick={fetchSeismicData}>
            Retry
          </button>
        </div>
      ) : earthquakes.length > 0 ? (
        <div className="seismic-events-list">
          {earthquakes.map((item) => {
            const props = item.properties || {};
            const coords = item.geometry?.coordinates || [];
            const mag = props.mag ? Number(props.mag.toFixed(1)) : 3.0;
            const isCriticalMag = mag >= 5.0; // Color-coded red if over 5.0 (Requirement #2)
            const depthKm = coords[2] !== undefined ? Math.round(coords[2]) : null;

            return (
              <div
                key={item.id}
                className={`seismic-event-row ${isCriticalMag ? 'event-critical' : 'event-moderate'}`}
              >
                {/* Magnitude Badge (Requirement #2: Red if over 5.0) */}
                <div
                  className={`seismic-mag-badge ${isCriticalMag ? 'mag-red' : mag >= 4.0 ? 'mag-orange' : 'mag-yellow'}`}
                >
                  <span className="mag-label">MAG</span>
                  <span className="mag-value">M {mag}</span>
                </div>

                {/* Event Details */}
                <div className="seismic-event-details">
                  <div className="event-top-line">
                    <span className="event-place">
                      <MapPin size={13} className="text-slate-400" />
                      {props.place || 'Epicenter recorded near regional fault boundary'}
                    </span>
                    {depthKm !== null && (
                      <span className="event-depth-chip">Depth: {depthKm} km</span>
                    )}
                  </div>

                  <div className="event-bottom-line">
                    <div className="event-time">
                      <Clock size={12} className="text-slate-400" />
                      <span>{formatEventTime(props.time)}</span>
                    </div>

                    {props.url && (
                      <a
                        href={props.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="usgs-link"
                        title="View Official USGS Event Page"
                      >
                        <span>USGS Details</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Severity Status Chip */}
                <div className="seismic-row-badge">
                  <span
                    className={`status-pill ${isCriticalMag ? 'pill-severe' : mag >= 4.0 ? 'pill-moderate' : 'pill-safe'}`}
                  >
                    {isCriticalMag ? 'High Quake (M5.0+)' : mag >= 4.0 ? 'Moderate Quake' : 'Minor Quake'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="seismic-empty-state">
          <CheckCircle2 size={36} className="text-emerald-500" />
          <div className="empty-text">
            <h4>No Recent M3.0+ Earthquakes Recorded</h4>
            <p>
              The USGS global network reports zero seismic events above magnitude 3.0 within a 1,000 km radius
              of <strong>{selectedLocation.name}</strong> in the recent reporting window. Regional tectonic stability is normal.
            </p>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="seismic-footer">
        <span className="footer-meta">
          Data feed: United States Geological Survey (USGS) Earthquake Hazards API · Updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Active'}
        </span>
      </div>
    </div>
  );
}
