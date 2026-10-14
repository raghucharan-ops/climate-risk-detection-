// src/components/Sidebar.jsx
import React from 'react';
import {
  LayoutDashboard,
  CloudSun,
  ShieldAlert,
  BellRing,
  Sliders,
  LifeBuoy,
  Info,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { getRiskColorConfig } from '../utils/simulator';

export default function Sidebar({
  currentPage,
  onNavigate,
  activeScenario,
  isMobileOpen,
  setIsMobileOpen
}) {
  const navItems = [
    { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard },
    { id: 'weather', label: 'Weather Monitoring', icon: CloudSun },
    { id: 'risk', label: 'Disaster Risk Assessment', icon: ShieldAlert },
    { id: 'alerts', label: 'Alerts & Directives', icon: BellRing, badge: activeScenario.alerts?.length || null },
    { id: 'simulator', label: 'Weather Simulator', icon: Sliders, highlight: true },
    { id: 'safety', label: 'Safety & Checklists', icon: LifeBuoy },
    { id: 'info', label: 'Project Info & Specs', icon: Info }
  ];

  const riskConfig = getRiskColorConfig(activeScenario.riskLevel);

  return (
    <>
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`app-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo-wrap">
            <ShieldCheck size={28} className="brand-icon" />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">ClimateShield AI</span>
            <span className="brand-tagline">Understand. Prepare. Protect.</span>
          </div>
        </div>

        <div className="sidebar-scenario-widget">
          <div className="widget-header">
            <span className="widget-label">ACTIVE SCENARIO</span>
            <span className="widget-dot"></span>
          </div>
          <div className="widget-body">
            <span className="widget-scenario-name">{activeScenario.name}</span>
            <div
              className="widget-risk-pill"
              style={{
                backgroundColor: riskConfig.badgeBg,
                color: riskConfig.textColor,
                borderColor: riskConfig.badgeBorder
              }}
            >
              <span className="pill-dot" style={{ backgroundColor: riskConfig.color }}></span>
              {activeScenario.riskLevel} RISK
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group-title">NAVIGATION MODULES</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'nav-item-active' : ''} ${item.highlight ? 'nav-item-highlight' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  if (setIsMobileOpen) setIsMobileOpen(false);
                }}
              >
                <div className="nav-item-left">
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </div>
                {item.badge !== null && item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
                {isActive && <ChevronRight size={16} className="nav-active-arrow" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-disclaimer-box">
            <span className="footer-title">ClimateShield AI v2.4</span>
            <p className="footer-desc">
              Hackathon Demonstration Engine.
              <br />
              All data simulated locally.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
