import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Map, Layers, Activity, MessageSquare, DollarSign, Scale, Calendar, FileText 
} from 'lucide-react';

// Component Imports
import DashboardView from './components/Dashboard/DashboardView';
import JourneyHeatmapView from './components/Journey/JourneyHeatmapView';
import InventoryView from './components/Inventory/InventoryView';
import SimulatorView from './components/Simulator/SimulatorView';
import CustomerVoiceView from './components/CustomerVoice/CustomerVoiceView';
import RoiCalculatorView from './components/RoiCalculator/RoiCalculatorView';
import ComplianceRiskView from './components/Risk/ComplianceRiskView';
import RoadmapTeamsView from './components/Roadmap/RoadmapTeamsView';
import ExecutiveExportView from './components/Export/ExecutiveExportView';
import LoginView from './components/Login/LoginView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('cxo_logged_in') === 'true';
  });

  if (!isLoggedIn) {
    return (
      <LoginView 
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          localStorage.setItem('cxo_logged_in', 'true');
        }} 
      />
    );
  }


  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'journey':
        return <JourneyHeatmapView />;
      case 'inventory':
        return <InventoryView />;
      case 'simulator':
        return <SimulatorView />;
      case 'voc':
        return <CustomerVoiceView />;
      case 'roi':
        return <RoiCalculatorView />;
      case 'risk':
        return <ComplianceRiskView />;
      case 'roadmap':
        return <RoadmapTeamsView />;
      case 'export':
        return <ExecutiveExportView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      {/* Background concentric rings (style from image reference) */}
      <div className="concentric-rings"></div>
      <div className="concentric-rings-glow"></div>
      
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            width: '10px',
            height: '24px',
            borderRadius: '4px',
            marginRight: '2px'
          }} />
          <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>CXO<span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>UX</span></span>
        </div>

        <ul className="nav-links">
          <li 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <TrendingUp size={18} />
            <span>CX Dashboard</span>
          </li>

          <li 
            className={`nav-item ${activeTab === 'journey' ? 'active' : ''}`}
            onClick={() => setActiveTab('journey')}
          >
            <Map size={18} />
            <span>Journey Heatmap</span>
          </li>
          
          <li 
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Layers size={18} />
            <span>Tech Debt Backlog</span>
          </li>

          <li 
            className={`nav-item ${activeTab === 'simulator' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulator')}
          >
            <Activity size={18} />
            <span>Friction Simulator</span>
          </li>

          <li 
            className={`nav-item ${activeTab === 'voc' ? 'active' : ''}`}
            onClick={() => setActiveTab('voc')}
          >
            <MessageSquare size={18} />
            <span>Customer Voice</span>
          </li>

          <li 
            className={`nav-item ${activeTab === 'roi' ? 'active' : ''}`}
            onClick={() => setActiveTab('roi')}
          >
            <DollarSign size={18} />
            <span>ROI Calculator</span>
          </li>

          <li 
            className={`nav-item ${activeTab === 'risk' ? 'active' : ''}`}
            onClick={() => setActiveTab('risk')}
          >
            <Scale size={18} />
            <span>Risk & Compliance</span>
          </li>

          <li 
            className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <Calendar size={18} />
            <span>Roadmap & Teams</span>
          </li>

          <li 
            className={`nav-item ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            <FileText size={18} />
            <span>Executive Export</span>
          </li>
        </ul>

        {/* Sidebar Footer Controls */}
        <div style={{ 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '16px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>CXO UX Suite</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>C-Suite Console v1.5.0</span>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem('cxo_logged_in');
            }}
            className="btn btn-secondary"
            style={{ 
              width: '100%', 
              fontSize: '0.8rem', 
              padding: '8px 12px', 
              borderRadius: '99px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel Viewport */}
      <main className="main-content">
        
        {/* Dynamic Inner Viewport */}
        {renderActiveView()}

      </main>

    </div>
  );
}
