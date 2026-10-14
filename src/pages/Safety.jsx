// src/pages/Safety.jsx
import React, { useState } from 'react';
import {
  LifeBuoy,
  Briefcase,
  Waves,
  Tornado,
  Flame,
  CheckSquare,
  Square,
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  Umbrella,
  Award
} from 'lucide-react';
import { SAFETY_CHECKLISTS, EMERGENCY_CONTACTS } from '../data/mockData';

export default function Safety({ scenario }) {
  // Track checked state of checklist items
  const [checkedItems, setCheckedItems] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const toggleCheck = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Briefcase':
        return Briefcase;
      case 'Waves':
        return Waves;
      case 'Tornado':
        return Tornado;
      case 'Flame':
        return Flame;
      default:
        return LifeBuoy;
    }
  };

  const currentChecklist = SAFETY_CHECKLISTS[activeTab] || SAFETY_CHECKLISTS[0];
  const totalItems = currentChecklist.items.length;
  const completedCount = currentChecklist.items.filter((it) => checkedItems[it.id]).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="page-container safety-page">
      {/* Safety Header */}
      <div className="safety-hero-banner">
        <div className="safety-hero-text">
          <div className="safety-badge">
            <LifeBuoy size={14} className="text-teal-400" />
            <span>DISASTER READINESS & CIVIL DEFENSE PROTOCOLS</span>
          </div>
          <h2 className="safety-title">Actionable Emergency Preparedness Checklists</h2>
          <p className="safety-subtitle">
            Proactive mitigation plans, interactive 72-hour survival kit verification, and verified emergency assistance hotlines.
          </p>
        </div>
      </div>

      {/* Umbrella Safety Callout Card */}
      <div className="umbrella-safety-guideline-card">
        <div className="guideline-icon">
          <Umbrella size={24} className="text-teal-500" />
        </div>
        <div className="guideline-body">
          <h4 className="guideline-title">Core Umbrella Safety Principles</h4>
          <p className="guideline-text">
            <strong>In Sunny, Windy, or Rainy conditions:</strong> Carry an umbrella! It reduces UV exposure and prevents soaking in monsoonal downpours.
            <br />
            <strong>In Cyclones or Severe Gale Winds (wind &gt; 70 km/h):</strong> NEVER use an umbrella! Wind can snap metal stretchers into sharp projectiles and wrench joints.
          </p>
        </div>
      </div>

      {/* Interactive Checklists Section */}
      <div className="checklist-container-card">
        {/* Category Tabs */}
        <div className="checklist-tabs-row">
          {SAFETY_CHECKLISTS.map((chk, index) => {
            const Icon = getCategoryIcon(chk.icon);
            const isTabActive = activeTab === index;
            const catDone = chk.items.filter((it) => checkedItems[it.id]).length;

            return (
              <button
                key={index}
                className={`checklist-tab-btn ${isTabActive ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <Icon size={16} />
                <span>{chk.category}</span>
                <span className="tab-count-pill">
                  {catDone}/{chk.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Checklist Content */}
        <div className="checklist-details-panel">
          <div className="checklist-panel-header">
            <div>
              <h3 className="checklist-title">{currentChecklist.category}</h3>
              <p className="checklist-desc">{currentChecklist.description}</p>
            </div>

            <div className="checklist-progress-box">
              <div className="progress-labels">
                <span className="progress-caption">Readiness Score</span>
                <span className="progress-percent">{progressPercent}%</span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="checklist-items-stack">
            {currentChecklist.items.map((item) => {
              const isChecked = !!checkedItems[item.id];

              return (
                <div
                  key={item.id}
                  className={`checklist-item-row ${isChecked ? 'item-checked' : ''} ${item.critical ? 'item-critical' : ''}`}
                  onClick={() => toggleCheck(item.id)}
                >
                  <div className="item-checkbox-col">
                    {isChecked ? (
                      <CheckSquare size={20} className="check-icon-done" />
                    ) : (
                      <Square size={20} className="check-icon-empty" />
                    )}
                  </div>
                  <div className="item-text-col">
                    <span className="item-text">{item.text}</span>
                    {item.critical && (
                      <span className="critical-tag">MANDATORY ESSENTIAL</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {progressPercent === 100 && (
            <div className="checklist-completion-banner">
              <Award size={22} className="text-amber-500" />
              <div>
                <h5>Protocol Readiness Complete!</h5>
                <p>All safety directives and emergency items have been physically verified.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contacts Directory */}
      <div className="emergency-contacts-section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Emergency Response Helpline Directory</h3>
            <p className="section-subtitle">Simulated emergency dispatch and disaster response channels</p>
          </div>
          <span className="header-tag">Toll-Free 24/7</span>
        </div>

        <div className="contacts-grid">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <div key={idx} className="contact-card">
              <div className="contact-top">
                <span className="contact-service-name">{contact.service}</span>
                <span className="contact-badge">{contact.badge}</span>
              </div>
              <div className="contact-phone-row">
                <PhoneCall size={18} className="text-teal-600" />
                <span className="contact-number">{contact.phone}</span>
              </div>
              <button
                className="contact-mock-call-btn"
                onClick={() => alert(`Simulated Dial: Connecting to ${contact.service} (${contact.phone}). This is a simulated demo action.`)}
              >
                Simulate Call
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
