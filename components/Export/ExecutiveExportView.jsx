import React from 'react';
import { 
  Printer, TrendingDown, ShieldAlert, Award, FileText, Download, Briefcase 
} from 'lucide-react';

export default function ExecutiveExportView() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="executive-export-view">
      {/* Alert / CTA to print */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <FileText size={24} style={{ color: 'var(--color-secondary)' }} />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Board-Ready Executive Presentation Slide</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
              One-click compilation formatted for sharing with the C-suite and board members.
            </p>
          </div>
        </div>
        <button className="btn btn-primary" style={{ borderRadius: '99px' }} onClick={handlePrint}>
          <Printer size={16} /> Print Slide / Save PDF
        </button>
      </div>

      {/* Slide Deck Container */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '40px', 
          background: 'var(--bg-surface)', 
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Slide Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border-color)', paddingBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              CXO UX Board Presentation Slide
            </span>
            <h2 style={{ fontSize: '2rem', marginTop: '6px', color: 'var(--text-primary)', fontWeight: 800 }}>UX Friction Audit & Sales Recovery Strategy</h2>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>Date: June 2026</div>
            <div>Prepared for: CXO & Board of Directors</div>
          </div>
        </div>

        {/* Executive Summary Pitch */}
        <div style={{ padding: '20px', background: 'rgba(37, 99, 235, 0.03)', borderLeft: '4px solid var(--color-primary)', borderRadius: '12px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>Executive Pitch Overview</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Unresolved frontend technical issues in the Checkout and Payment funnels currently block customer progression, resulting in an estimated **3.2% purchase conversion penalty** and **$312,000 in projected annual sales leakage**. We request a one-time resolution budget of **$10,200** to fix page shifts (CLS) and ADA compliance, recovering this investment within **1.5 months** from launch.
          </p>
        </div>

        {/* 3-Column Metrics Grid */}
        <div className="grid-cols-3" style={{ gap: '16px' }}>
          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>UX Friction Score</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-danger)', marginTop: '4px' }}>61 / 100</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>Target threshold: &lt; 30 (Good)</span>
          </div>

          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sales Leakage Cost</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-danger)', marginTop: '4px' }}>$312,000 /yr</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>Friction drop-offs at checkout</span>
          </div>

          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>ADA Legal Risk</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-warning)', marginTop: '4px' }}>2 Active Violations</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>ADA Title III & data consent exposure</span>
          </div>
        </div>

        {/* Detailed Roadmaps & Audits */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'start' }}>
          
          {/* Ask and Budget Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Q3-Q4 Resolution Budget Ask</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '6px 0', color: 'var(--text-muted)', fontWeight: 600 }}>REFACTORING PROJECT</th>
                  <th style={{ padding: '6px 0', color: 'var(--text-muted)', fontWeight: 600 }}>TEAM OWNER</th>
                  <th style={{ padding: '6px 0', color: 'var(--text-muted)', fontWeight: 600 }}>DEV HOURS</th>
                  <th style={{ padding: '6px 0', color: 'var(--text-muted)', textAlign: 'right', fontWeight: 600 }}>EST. COST</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 0', fontWeight: 700 }}>Fix Checkout Screen Shifts (CLS)</td>
                  <td>Growth & User Acquisition</td>
                  <td>40 hrs</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>$3,400</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 0', fontWeight: 700 }}>WCAG Accessibility Sprints</td>
                  <td>Checkout & Payments</td>
                  <td>50 hrs</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>$4,250</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 0', fontWeight: 700 }}>Standardize UI Style Files</td>
                  <td>User Interface Core</td>
                  <td>30 hrs</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>$2,550</td>
                </tr>
                <tr style={{ fontWeight: 800, borderTop: '2px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 0' }} colSpan={2}>Aggregate Funding Request</td>
                  <td>120 hrs</td>
                  <td style={{ textAlign: 'right', color: 'var(--color-primary)' }}>$10,200</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Strategic Milestones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Expected Business Outcomes</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>✓ Immediate Benefit</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>Recover conversion leaks on checkout button shifts.</p>
              </div>
              <div style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>✓ Legal Mitigation</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>Eliminate ADA compliance lawsuits on checkout paths.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Slide Footer */}
        <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>© CXO UX Tech Audit Suite 2026</span>
          <span style={{ fontWeight: 700 }}>Confidential - Board Presentation Template</span>
        </div>

      </div>
    </div>
  );
}
