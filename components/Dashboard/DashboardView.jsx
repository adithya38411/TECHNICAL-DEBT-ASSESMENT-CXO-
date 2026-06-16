import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';
import { 
  Layers, Zap, AlertTriangle, DollarSign, Users, Award, 
  ArrowUpRight, ArrowDownRight, Info, HelpCircle
} from 'lucide-react';

const trendData = [
  { month: 'Jan', debtIndex: 42, nps: 76, loadTime: 1.8 },
  { month: 'Feb', debtIndex: 48, nps: 72, loadTime: 2.1 },
  { month: 'Mar', debtIndex: 55, nps: 68, loadTime: 2.6 },
  { month: 'Apr', debtIndex: 68, nps: 61, loadTime: 3.4 },
  { month: 'May', debtIndex: 72, nps: 55, loadTime: 4.1 },
  { month: 'Jun', debtIndex: 61, nps: 64, loadTime: 2.9 }
];

const categoryData = [
  { name: 'Usability Friction (Confusing Forms)', value: 35, color: 'var(--color-primary)' },
  { name: 'Loading Lag (Core Web Vitals)', value: 25, color: 'var(--color-secondary)' },
  { name: 'Accessibility Obstacles', value: 22, color: 'var(--color-accent)' },
  { name: 'Visual Layout Drift', value: 18, color: 'var(--color-warning)' }
];

export default function DashboardView() {
  // Revenue Leakage Slider States
  const [traffic, setTraffic] = useState(500000);
  const [conversion, setConversion] = useState(2.5);
  const [orderValue, setOrderValue] = useState(85);
  const [delay, setDelay] = useState(2.2); // seconds of load delay

  // Google rule of thumb: ~2.4% drop in conversion per 1 second of delay
  const baselineConversion = conversion;
  const currentConversion = Math.max(0.1, conversion * Math.pow(0.976, delay));
  const lostConversions = (traffic * (baselineConversion - currentConversion)) / 100;
  const annualLeakage = lostConversions * orderValue * 12;

  // Format helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="dashboard-view">
      
      {/* View Header */}
      <div className="view-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2>Executive Business & CX Console</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Linking underlying engineering systems health with customer satisfaction and financial ARR performance.
          </p>
        </div>
      </div>

      {/* Simplified Welcome Banner */}
      <div className="welcome-banner">
        <span style={{ fontSize: '2rem' }}>🎯</span>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Plain-English CX Overview</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
            This workspace translates core website coding errors (like sluggish button clicks or shifting screens) directly into user drop-offs and lost corporate sales. Fix technical debt to recover customer conversion rates.
          </p>
        </div>
      </div>

      {/* Plain English Glossary */}
      <div className="info-glossary-card">
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.92rem', fontWeight: 700 }}>
          <Info size={16} style={{ color: 'var(--color-primary)' }} />
          Plain-English Glossary: What do these technical metrics mean?
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>• Screen Layout Drift (CLS):</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>When web elements move around as the page loads, leading customers to accidentally click the wrong link or ad.</span>
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>• Click Lag (INP/FID):</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>The delay between clicking a button (like "Buy Now") and the site actually responding. Lag makes customers double-pay or leave.</span>
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>• Web Vitals Speed:</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Google’s metrics measuring loading speeds. If loading exceeds 2.5 seconds, customers abandon search funnels quickly.</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-cols-4" style={{ marginBottom: '32px' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} title="Overall usability obstacles weight. Target is 0.">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>UX Friction Score</span>
            <span style={{ padding: '6px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary)' }}>
              <Layers size={18} />
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '2.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>61/100</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginTop: '6px' }}>
              <span style={{ color: 'var(--color-danger)', display: 'inline-flex', alignItems: 'center', fontWeight: 600 }}>
                <ArrowUpRight size={14} style={{ marginRight: '2px' }} /> +19% worse
              </span>
              <span style={{ color: 'var(--text-muted)' }}>since Q1 baseline</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Measures customer struggle. Lower is better.
            </p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} title="Net Promoter Score. Measures customer loyalty.">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>Customer Loyalty (NPS)</span>
            <span style={{ padding: '6px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--color-secondary)' }}>
              <Users size={18} />
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '2.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>+64</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginTop: '6px' }}>
              <span style={{ color: 'var(--color-danger)', display: 'inline-flex', alignItems: 'center', fontWeight: 600 }}>
                <ArrowDownRight size={14} style={{ marginRight: '2px' }} /> -12 points
              </span>
              <span style={{ color: 'var(--text-muted)' }}>due to system lag</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Overall user recommendation rating.
            </p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} title="Average load speeds. Target is under 2.5 seconds.">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>Avg Page Loading Speed</span>
            <span style={{ padding: '6px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', color: 'var(--color-warning)' }}>
              <Zap size={18} />
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '2.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>2.9s</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginTop: '6px' }}>
              <span style={{ color: 'var(--color-warning)', display: 'inline-flex', alignItems: 'center', fontWeight: 600 }}>
                <ArrowUpRight size={14} style={{ marginRight: '2px' }} /> +0.8s slow
              </span>
              <span style={{ color: 'var(--text-muted)' }}>above Google limit</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Mobile customers abandon slow pages.
            </p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid rgba(239, 68, 68, 0.25)', boxShadow: '0 8px 32px rgba(239, 68, 68, 0.08)' }} title="Estimated annual sales lost.">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>Projected Lost Sales (ARR)</span>
            <span style={{ padding: '6px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}>
              <DollarSign size={18} />
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '2.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-danger)' }}>
              {formatCurrency(annualLeakage)}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginTop: '6px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Annualized</span>
              <span style={{ color: 'var(--text-muted)' }}>based on checkouts</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--color-danger)', opacity: 0.9, marginTop: '8px' }}>
              Revenue lost due to page errors.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Split: Charts & Interactive Calculator */}
      <div className="grid-cols-2" style={{ marginBottom: '32px' }}>
        
        {/* Chart Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', minHeight: '420px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} style={{ color: 'var(--color-primary)' }} />
            UX Friction Index vs. Loyalty (6 Months)
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            Compare how customer recommendation score (NPS) falls as UI issues (UX Friction Score) multiply.
          </p>
          <div style={{ flexGrow: 1, width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px',
                    color: 'var(--text-primary)'
                  }} 
                />
                <Legend verticalAlign="top" height={36} />
                <Area name="UX Friction Score (Lower is better)" type="monotone" dataKey="debtIndex" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorDebt)" />
                <Area name="Net Promoter Score (Higher is better)" type="monotone" dataKey="nps" stroke="var(--color-secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorNps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leakage Calculator Widget */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={18} style={{ color: 'var(--color-secondary)' }} />
            Revenue Impact & Sales Leakage Simulator
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
            Adjust the sliders below to see how page response delays and checkout issues directly block conversions and cost you monthly sales.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                <span>Monthly Website Visitors</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{traffic.toLocaleString()} visitors</span>
              </div>
              <input 
                type="range" 
                min="50000" 
                max="2000000" 
                step="50000"
                value={traffic} 
                onChange={(e) => setTraffic(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                <span>Baseline Conversion Rate (Target Purchase %)</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{conversion}%</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="10.0" 
                step="0.1"
                value={conversion} 
                onChange={(e) => setConversion(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                  <span>Avg Order Value</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>${orderValue}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="5"
                  value={orderValue} 
                  onChange={(e) => setOrderValue(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                  <span>Mobile Lag (Seconds)</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{delay}s delay</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="6.0" 
                  step="0.1"
                  value={delay} 
                  onChange={(e) => setDelay(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-danger)' }}
                />
              </div>
            </div>

            {/* Calculations Result */}
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.04)', 
              border: '1px solid rgba(239, 68, 68, 0.12)',
              borderRadius: '16px', 
              padding: '20px',
              marginTop: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Conversion Drop Penalty:</span>
                <span style={{ color: 'var(--color-danger)', fontWeight: 700 }}>
                  -{((baselineConversion - currentConversion)).toFixed(2)}% drop
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Estimated Lost Sales:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{Math.round(lostConversions).toLocaleString()} transactions / mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 800, borderTop: '1px dashed var(--border-color)', paddingTop: '10px', marginTop: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Annualized Revenue Leak:
                  <Info size={14} style={{ color: 'var(--text-muted)' }} title="Calculated as: Monthly Lost Sales * Average Order Value * 12" />
                </span>
                <span style={{ color: 'var(--color-danger)' }}>
                  {formatCurrency(annualLeakage)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Breakdown and Insights */}
      <div className="grid-cols-2">
        {/* Category Breakdown bar chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Friction Weight Breakdown</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            Understand which technical coding categories represent the largest share of our user experience blockers.
          </p>
          <div style={{ flexGrow: 1, width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} width={150} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px'
                  }}
                  formatter={(value) => [`${value}% of total issues`, 'Impact Weight']}
                />
                <Bar dataKey="value" radius={[0, 99, 99, 0]}>
                  {
                    categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smart Executive Insights */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Executive Priorities & Strategic Action Items</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div style={{ display: 'flex', gap: '14px', padding: '16px', background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.12)', borderRadius: '16px' }}>
              <AlertTriangle size={24} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Priority 1: Checkout Form Jumping (CLS shift)</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  A late-loading advertisement banner pushes the checkout button down. This causes users to click the wrong items. Fixing this layout issue immediately recovers up to <strong>$140,000/year</strong> in cart abandons.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', padding: '16px', background: 'rgba(234, 179, 8, 0.04)', border: '1px solid rgba(234, 179, 8, 0.12)', borderRadius: '16px' }}>
              <Info size={24} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Priority 2: Standardize Code Theme Tokens (28% Divergence)</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  28% of frontend buttons and fields bypass standard styling templates, causing color contrast issues and violating compliance standards. Enforcing templates fixes this.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', padding: '16px', background: 'rgba(34, 197, 94, 0.04)', border: '1px solid rgba(34, 197, 94, 0.12)', borderRadius: '16px' }}>
              <Award size={24} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Developer Shipping Speed Potential</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  Standardizing CSS and removing legacy page frameworks increases weekly developer shipment rates by up to <strong>35%</strong>, accelerating future features.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
