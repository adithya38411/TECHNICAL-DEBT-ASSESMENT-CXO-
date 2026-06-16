import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, Scale, AlertTriangle, Info, HelpCircle, AlertCircle 
} from 'lucide-react';

const initialRisks = [
  { 
    id: 1, 
    area: 'Accessibility', 
    standard: 'ADA Title III Accessibility', 
    item: 'Missing form text-labels & focus states on checkout inputs, blocking screen readers.', 
    exposure: 'High (80% risk)', 
    fine: 55000, 
    riskLevel: 'Critical',
    mitigation: 'Implement proper ARIA elements and keyboard focus handlers in the upcoming sprint.',
    status: 'Active'
  },
  { 
    id: 2, 
    area: 'Data Privacy', 
    standard: 'GDPR / CCPA Regulations', 
    item: 'Third-party tracking cookies active before user provides explicit cookie consent.', 
    exposure: 'Medium (40% risk)', 
    fine: 120000, 
    riskLevel: 'Critical',
    mitigation: 'Refactor cookie consent banner to restrict loading scripts until action is taken.',
    status: 'Remediating'
  },
  { 
    id: 3, 
    area: 'Security', 
    standard: 'PCI-DSS Card Security', 
    item: 'Vulnerable npm packages and old SSL configuration in checkout payment gateways.', 
    exposure: 'Low (15% risk)', 
    fine: 250000, 
    riskLevel: 'Major',
    mitigation: 'Run audit updates on build packages and enforce TLS 1.3 across all subdomains.',
    status: 'Active'
  },
  { 
    id: 4, 
    area: 'Accessibility', 
    standard: 'Color Contrast Laws', 
    item: 'Color contrast ratio below 4.5:1 on main navigation controls (faded text).', 
    exposure: 'High (70% risk)', 
    fine: 25000, 
    riskLevel: 'Major',
    mitigation: 'Adjust primary text color HSL values to guarantee 4.5:1 ratio against backgrounds.',
    status: 'Active'
  }
];

export default function ComplianceRiskView() {
  const [risks, setRisks] = useState(initialRisks);
  const [selectedRiskId, setSelectedRiskId] = useState(null);

  // Toggle risk status as remediated
  const handleToggleResolve = (id) => {
    setRisks(risks.map(r => {
      if (r.id === id) {
        return { 
          ...r, 
          status: r.status === 'Resolved' ? 'Active' : 'Resolved',
          exposure: r.status === 'Resolved' ? 'High (80%)' : 'None (0%)',
          fine: r.status === 'Resolved' ? 50000 : 0
        };
      }
      return r;
    }));
  };

  const activeRisks = risks.filter(r => r.status !== 'Resolved');
  const totalFines = activeRisks.reduce((sum, r) => sum + r.fine, 0);

  return (
    <div className="compliance-risk-view">
      <div className="view-header">
        <div>
          <h2>Compliance & Legal Risk Register</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Audit legal, regulatory, and security exposures caused by unresolved website bugs and code errors.
          </p>
        </div>
      </div>

      {/* Simplified Welcome Banner */}
      <div className="welcome-banner">
        <span style={{ fontSize: '2rem' }}>⚖️</span>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Why Compliance Matters in Code</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
            Unresolved visual bugs and outdated libraries don't just hurt conversion rates—they also violate legal standards like the **ADA Title III** (accessibility for disabled users), **PCI-DSS** (credit card privacy), and **GDPR/CCPA** (user tracking data consent). This register maps our active fine liability.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid-cols-3" style={{ marginBottom: '32px' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Active Legal Fines</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-warning)' }}>{activeRisks.length} Unresolved</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Requires immediate developer fix priority.
          </p>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Total Legal Liability Exposure</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-danger)' }}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalFines)}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Estimated maximum regulatory fine liability.
          </p>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Compliance Grade</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-danger)' }}>Grade F (Failing)</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Non-compliant with ADA and PCI standards.
          </p>
        </div>
      </div>

      {/* Grid: Register Table & Detail card */}
      <div className="grid-cols-2" style={{ alignItems: 'start' }}>
        
        {/* Risk Table */}
        <div className="glass-card" style={{ overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} style={{ color: 'var(--color-primary)' }} />
            Regulatory Risk Registry Table
          </h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '10px 6px', color: 'var(--text-muted)', fontWeight: 600 }}>AREA</th>
                <th style={{ padding: '10px 6px', color: 'var(--text-muted)', fontWeight: 600 }}>LEGAL REGULATION</th>
                <th style={{ padding: '10px 6px', color: 'var(--text-muted)', fontWeight: 600 }}>EXPOSURE</th>
                <th style={{ padding: '10px 6px', color: 'var(--text-muted)', textAlign: 'right', fontWeight: 600 }}>MAX POTENTIAL FINE</th>
              </tr>
            </thead>
            <tbody>
              {risks.map(r => {
                const isSelected = selectedRiskId === r.id;
                const isResolved = r.status === 'Resolved';
                
                let badgeClass = 'badge-primary';
                if (r.riskLevel === 'Critical') badgeClass = 'badge-danger';
                else if (r.riskLevel === 'Major') badgeClass = 'badge-warning';

                return (
                  <tr 
                    key={r.id} 
                    onClick={() => setSelectedRiskId(isSelected ? null : r.id)}
                    style={{ 
                      borderBottom: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(37,99,235,0.04)' : 'transparent',
                      opacity: isResolved ? 0.45 : 1,
                      transition: 'var(--transition-snappy)'
                    }}
                  >
                    <td style={{ padding: '14px 6px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.area}</span>
                    </td>
                    <td style={{ padding: '14px 6px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.standard}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{r.item.substring(0, 30)}...</div>
                    </td>
                    <td style={{ padding: '14px 6px' }}>
                      <span className={`badge ${badgeClass}`}>{r.exposure}</span>
                    </td>
                    <td style={{ padding: '14px 6px', textAlign: 'right', fontWeight: 700, color: isResolved ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {isResolved ? 'Resolved' : `$${r.fine.toLocaleString()}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Risk Mitigation Card */}
        <div className="glass-card" style={{ minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {selectedRiskId ? (
            (() => {
              const risk = risks.find(r => r.id === selectedRiskId);
              const isResolved = risk.status === 'Resolved';
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                      <ShieldAlert size={18} />
                      {risk.area} Risk Audit Details
                    </h4>
                    <span className={`badge ${risk.riskLevel === 'Critical' ? 'badge-danger' : 'badge-warning'}`}>
                      {risk.riskLevel} Severity
                    </span>
                  </div>

                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>Identified Code Defect</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>{risk.item}</p>
                  </div>

                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>Proposed Remediation Path</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>{risk.mitigation}</p>
                  </div>

                  <div style={{ 
                    background: 'rgba(0,0,0,0.02)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px', 
                    padding: '12px 16px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>Exposure Probability: <strong>{risk.exposure}</strong></span>
                    <span>Max Fine: <strong style={{ color: 'var(--color-danger)' }}>${risk.fine.toLocaleString()}</strong></span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button 
                      className={`btn ${isResolved ? 'btn-secondary' : 'btn-primary'}`} 
                      style={{ borderRadius: '99px' }}
                      onClick={() => handleToggleResolve(risk.id)}
                    >
                      {isResolved ? 'Re-open Audit' : 'Mitigate & Mark Resolved'}
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: 'var(--text-muted)', textAlign: 'center', padding: '40px 20px' }}>
              <AlertCircle size={40} style={{ marginBottom: '16px', color: 'var(--text-muted)' }} />
              <h4 style={{ fontWeight: 700 }}>No Risk Item Selected</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '6px', maxWidth: '300px', lineHeight: '1.4' }}>
                Select a row in the regulatory risk registry table on the left to inspect detailed compliance exposure, maximum potential fines, and mitigation plans.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
