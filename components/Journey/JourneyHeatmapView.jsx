import React, { useState } from 'react';
import { 
  GitCommit, AlertTriangle, AlertCircle, CheckCircle, ArrowRight, TrendingDown, Users, HelpCircle 
} from 'lucide-react';

const funnelSteps = [
  { 
    id: 'discovery', 
    name: 'Discovery', 
    status: 'healthy', 
    score: 88, 
    dropoff: '4%', 
    debtItems: ['Slight tracking script slowdown'],
    vocExcerpt: 'Ads load fine, no issues finding the site.',
    icon: '🔍',
    plainExplain: 'Customers search for our brand and arrive at our links. Fast loading ensures they do not bounce immediately.'
  },
  { 
    id: 'landing', 
    name: 'Landing Page', 
    status: 'major', 
    score: 65, 
    dropoff: '22%', 
    debtItems: ['Main header image loads very slowly (4.2s delay)', 'Old, unused code files block initial display'],
    vocExcerpt: 'Takes forever to load on my phone, almost left.',
    icon: '🏠',
    plainExplain: 'The first page customers view. Slow load speeds and screen jumps here cause 22% of potential buyers to leave.'
  },
  { 
    id: 'search', 
    name: 'Search & Browse', 
    status: 'healthy', 
    score: 91, 
    dropoff: '8%', 
    debtItems: [],
    vocExcerpt: 'Search filters are very easy to use.',
    icon: '🔎',
    plainExplain: 'Customers browse catalog lists. Fast filters and clean visual alignment encourage buying interest.'
  },
  { 
    id: 'product', 
    name: 'Product Details', 
    status: 'major', 
    score: 74, 
    dropoff: '15%', 
    debtItems: ['Fonts and colors deviate from standard design guides', 'Redundant loading of multiple image display widgets'],
    vocExcerpt: 'The text sizing looks weird and elements shift.',
    icon: '📦',
    plainExplain: 'Detailed specifications. Inconsistent fonts and broken images make the store look unprofessional, causing hesitation.'
  },
  { 
    id: 'checkout', 
    name: 'Checkout Page', 
    status: 'critical', 
    score: 38, 
    dropoff: '39%', 
    debtItems: ['Page content shifts during load (causes accidental clicks)', 'Missing invisible labels for sight-assisted readers'],
    vocExcerpt: 'I misclicked and went to an ad page, super annoying.',
    icon: '🛒',
    plainExplain: 'Where users enter order information. Major shifts force users to click unintended links, breaking checkout flows.'
  },
  { 
    id: 'payment', 
    name: 'Payment Purchase', 
    status: 'critical', 
    score: 42, 
    dropoff: '12%', 
    debtItems: ['Sluggish buy button click response (INP lag)', 'Low-contrast text on buy button (hard to read)'],
    vocExcerpt: 'Nothing happened when I clicked buy, so I clicked twice.',
    icon: '💳',
    plainExplain: 'Finalizing payment. Click response lag makes customers click twice (submitting duplicate charges) or abandon due to fear of security bugs.'
  },
  { 
    id: 'confirmation', 
    name: 'Confirmation', 
    status: 'healthy', 
    score: 95, 
    dropoff: '0%', 
    debtItems: [],
    vocExcerpt: 'Receipt and tracking number showed up instantly.',
    icon: '🎉',
    plainExplain: 'Receipt display. Fast verification builds repeat trust.'
  }
];

export default function JourneyHeatmapView() {
  const [selectedStep, setSelectedStep] = useState(funnelSteps[4]); // Checkout selected by default

  return (
    <div className="journey-heatmap-view">
      <div className="view-header">
        <div>
          <h2>Customer Journey Struggle Heatmap</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Trace user progression from landing to final checkout, highlighting where active technical bugs cause user friction.
          </p>
        </div>
      </div>

      {/* Simplified Welcome Banner */}
      <div className="welcome-banner">
        <span style={{ fontSize: '2rem' }}>🗺️</span>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Understanding the Funnel Heatmap</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
            Click on any funnel step below to inspect how technical problems lead to user drop-offs. Steps in **red** represent critical bottlenecks where visual bugs are actively causing high drop-off rates and lost sales.
          </p>
        </div>
      </div>

      {/* Visual Journey Path Map */}
      <div className="glass-card" style={{ marginBottom: '32px', overflow: 'hidden' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Visual Customer Funnel & Experience Stages</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
          Select a node below to overlay audit metrics, drop-offs, and matching user feedback:
        </p>

        <div className="journey-container">
          {funnelSteps.map((step) => {
            const isSelected = selectedStep.id === step.id;
            return (
              <div key={step.id} className="journey-node-item">
                <button 
                  onClick={() => setSelectedStep(step)}
                  className={`journey-circle ${step.status} ${isSelected ? 'active-node' : ''}`}
                  style={{
                    outline: 'none',
                    borderWidth: isSelected ? '4px' : '3px',
                    borderColor: isSelected ? 'var(--color-primary)' : ''
                  }}
                  title={step.name}
                >
                  <span style={{ fontSize: '1.4rem' }}>{step.icon}</span>
                </button>
                
                <span className="journey-label" style={{ color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)' }}>
                  {step.name}
                </span>
                
                <span className="journey-metric">
                  Drop-off: <strong style={{ color: step.status === 'healthy' ? 'var(--color-success)' : step.status === 'major' ? 'var(--color-warning)' : 'var(--color-danger)' }}>{step.dropoff}</strong>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Detail Grid */}
      <div className="grid-cols-2">
        {/* Step Analysis */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{selectedStep.icon}</span> {selectedStep.name} Analysis
            </h3>
            <span className={`badge ${selectedStep.status === 'healthy' ? 'badge-success' : selectedStep.status === 'major' ? 'badge-warning' : 'badge-danger'}`}>
              Health: {selectedStep.score}/100
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', background: 'rgba(37,99,235,0.02)', padding: '12px 16px', borderRadius: '12px', borderLeft: '3px solid var(--color-primary)' }}>
            <strong>Stage Goal:</strong> {selectedStep.plainExplain}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <Users size={16} /> Customers Leaving (Drop-off)
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: selectedStep.status === 'healthy' ? 'var(--color-success)' : selectedStep.status === 'major' ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                {selectedStep.dropoff}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>of preceding visitors leave here</span>
            </div>

            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <TrendingDown size={16} /> Est. Monthly Sales Lost
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-danger)' }}>
                {selectedStep.status === 'healthy' ? '$0' : selectedStep.status === 'major' ? '$24,500/mo' : '$118,000/mo'}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated recovery potential</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>Active Usability & Technical Debts</h4>
            {selectedStep.debtItems.length === 0 ? (
              <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.05)', border: '1px dashed rgba(34, 197, 94, 0.2)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--color-success)' }}>
                ✓ No unresolved technical issues identified at this stage.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedStep.debtItems.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '12px 16px', 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px',
                    fontSize: '0.85rem'
                  }}>
                    <AlertCircle size={16} style={{ color: selectedStep.status === 'major' ? 'var(--color-warning)' : 'var(--color-danger)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Real-time Voice of Customer Link */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Linked Customer Voice Comments</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Real-time user feedback tags directly identify this step. Here is what customers are saying in support tickets & app reviews:
            </p>

            <div style={{ 
              background: 'rgba(0,0,0,0.02)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '12px', 
              padding: '24px',
              marginTop: '20px',
              fontStyle: 'italic',
              position: 'relative',
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              lineHeight: '1.6'
            }}>
              "{selectedStep.vocExcerpt}"
              <div style={{ 
                marginTop: '16px', 
                fontSize: '0.78rem', 
                color: 'var(--text-muted)', 
                display: 'flex', 
                justifyContent: 'space-between',
                fontStyle: 'normal',
                fontWeight: 600
              }}>
                <span>Verified Customer Ticket Review</span>
                <span style={{ color: selectedStep.status === 'healthy' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  Rating: {selectedStep.status === 'healthy' ? '★ 5.0' : selectedStep.status === 'major' ? '★ 3.0' : '★ 1.0'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(37, 99, 235, 0.04)', 
            border: '1px solid rgba(37, 99, 235, 0.12)', 
            padding: '16px 20px', 
            borderRadius: '12px',
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <HelpCircle size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <strong>Heatmap Rule:</strong> High drop-off values are strongly linked to slow button actions or visual shifts. Select other stages to trace customer struggles across our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
