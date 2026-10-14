// src/pages/ProjectInfo.jsx
import React from 'react';
import {
  Info,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  Umbrella,
  Code2,
  FileText
} from 'lucide-react';
import { HACKATHON_INFO } from '../data/mockData';

export default function ProjectInfo() {
  return (
    <div className="page-container info-page">
      {/* Hero Header */}
      <div className="info-hero-banner">
        <div className="info-hero-content">
          <div className="info-badge">
            <ShieldCheck size={16} className="text-teal-400" />
            <span>HACKATHON SPECIFICATION & PROJECT OVERVIEW</span>
          </div>
          <h2 className="info-title">ClimateShield AI</h2>
          <p className="info-tagline">“{HACKATHON_INFO.tagline}”</p>
          <p className="info-lead">
            An intelligent, simulated climate disaster awareness and early-action platform designed for
            demonstrating reactive risk mitigation, civil defense protocols, and contextual safety reminders.
          </p>
        </div>
      </div>

      {/* Persistent Disclaimer Highlight */}
      <div className="demo-rationale-card">
        <div className="rationale-icon-box">
          <AlertTriangle size={24} className="text-amber-500" />
        </div>
        <div className="rationale-text">
          <h4>Why ClimateShield AI Operates on Simulated Local Data</h4>
          <p>
            <strong>DEMO MODE:</strong> Weather data and predictions are simulated and may be inaccurate.
            This application is for educational and demonstration purposes only.
          </p>
          <p className="rationale-sub">
            Real disaster events cannot be artificially produced on demand to test software interfaces.
            By engineering a deterministic frontend simulation engine with predefined scenario matrices
            (Sunny, Windy, Rainy, Heavy Rain, Flood Risk, Heatwave, Cyclone), judges, developers, and responders
            can instantly test UI responsiveness, early alerts, and mandatory safety advisories without waiting
            for external satellite APIs or backend rate limits.
          </p>
        </div>
      </div>

      {/* Problem & Solution Grid */}
      <div className="info-grid-two">
        <div className="info-card">
          <div className="info-card-header">
            <div className="info-icon-box red-box">
              <AlertTriangle size={20} />
            </div>
            <h3>The Problem Statement</h3>
          </div>
          <p className="info-card-body">{HACKATHON_INFO.problemStatement}</p>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="info-icon-box teal-box">
              <ShieldCheck size={20} />
            </div>
            <h3>The ClimateShield AI Solution</h3>
          </div>
          <p className="info-card-body">{HACKATHON_INFO.solution}</p>
        </div>
      </div>

      {/* Mandatory Umbrella Logic Showcase */}
      <div className="umbrella-spec-card">
        <div className="spec-card-header">
          <div className="spec-icon-box">
            <Umbrella size={22} className="text-teal-600" />
          </div>
          <div>
            <h3>Mandatory Umbrella Reminder Protocol</h3>
            <p>Strict behavioral safety logic implemented per Hackathon requirements</p>
          </div>
        </div>

        <div className="spec-rules-grid">
          <div className="rule-box rule-allow">
            <div className="rule-title-row">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span>Sunny, Windy, & Rainy Conditions</span>
            </div>
            <p className="rule-content">
              Displays the exact directive:
              <br />
              <em>“☂️ Umbrella Reminder: Carry an umbrella whenever you go outside in sunny, windy, or rainy conditions.”</em>
            </p>
            <span className="rule-sub">Provides UV shade, rain barrier, and protection from airborne debris.</span>
          </div>

          <div className="rule-box rule-deny">
            <div className="rule-title-row">
              <AlertTriangle size={18} className="text-red-500" />
              <span>Cyclone & Severe Gale Wind Conditions</span>
            </div>
            <p className="rule-content">
              Replaces the reminder with an imperative warning:
              <br />
              <em>“⚠️ Cyclone / Severe Storm Warning: DO NOT use an umbrella! Extreme winds turn umbrellas into hazardous airborne projectiles.”</em>
            </p>
            <span className="rule-sub">Ensures user does not carry handheld canopies that catch gale forces.</span>
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="architecture-section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Technical Architecture & Stack</h3>
            <p className="section-subtitle">Zero-backend, frontend-only state management</p>
          </div>
          <span className="header-tag">Tech Stack</span>
        </div>

        <div className="arch-cards-grid">
          {HACKATHON_INFO.architecture.map((item, idx) => (
            <div key={idx} className="arch-card">
              <div className="arch-top">
                <Code2 size={16} className="text-teal-500" />
                <h4 className="arch-title">{item.title}</h4>
              </div>
              <p className="arch-detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
