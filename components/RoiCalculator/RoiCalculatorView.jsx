import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  DollarSign, TrendingUp, ShieldAlert, Award, Clock, ArrowUpRight, ArrowDownRight, Info 
} from 'lucide-react';

export default function RoiCalculatorView() {
  // Calculator States
  const [devRate, setDevRate] = useState(85); // Hourly developer rate
  const [devEffort, setDevEffort] = useState(120); // Hours to resolve total backlog
  const [monthlyConversions, setMonthlyConversions] = useState(4500);
  const [clv, setClv] = useState(420); // Customer Lifetime Value
  const [leakageRate, setLeakageRate] = useState(3.2); // Conversion penalty % (from CX delay)

  // Calculations
  const costToFix = devRate * devEffort;
  
  // Cost of Inaction (monthly lost conversions * CLV)
  const lostConversionsCount = monthlyConversions * (leakageRate / 100);
  const monthlyLostRevenue = lostConversionsCount * (clv * 0.25); // Assume immediate transaction value is ~25% of full CLV
  const annualCOI = monthlyLostRevenue * 12;

  // Investment Metrics
  const netRoi = annualCOI - costToFix;
  const roiPercentage = costToFix > 0 ? Math.round((netRoi / costToFix) * 100) : 0;
  const paybackMonths = monthlyLostRevenue > 0 ? (costToFix / monthlyLostRevenue).toFixed(1) : 0;

  // Chart Data: Projection of Cumulative Loss vs Recovery
  const chartData = Array.from({ length: 12 }, (_, idx) => {
    const month = idx + 1;
    // Without fixes: steady accumulation of monthly leakage
    const cumulativeCOI = monthlyLostRevenue * month;
    // With fixes: initial developer investment cost, then flatlined loss (revenue recovered)
    const cumulativeWithFix = costToFix + (0 * month); 
    const netRecovered = cumulativeCOI - cumulativeWithFix;

    return {
      month: `Month ${month}`,
      'Cumulative Loss (Doing Nothing)': Math.round(cumulativeCOI),
      'Resolution Investment Cost': Math.round(cumulativeWithFix),
      'Net Capital Recovered': Math.round(Math.max(0, netRecovered))
    };
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="roi-calculator-view">
      <div className="view-header">
        <div>
          <h2>ROI & Cost of Inaction Calculator</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Calculate the exact business return of paying developers to fix user experience bugs on our site.
          </p>
        </div>
      </div>

      {/* Simplified Welcome Banner */}
      <div className="welcome-banner">
        <span style={{ fontSize: '2rem' }}>💰</span>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Why calculate the Cost of Inaction?</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
            Technical bugs can seem minor to non-developers. This calculator helps justify budget allocations by showing exactly how much money we lose every month by **not** fixing code glitches, compared to the minor one-time cost of hiring engineering hours.
          </p>
        </div>
      </div>

      {/* Grid: Inputs vs KPIs */}
      <div className="grid-cols-2" style={{ marginBottom: '32px', alignItems: 'stretch' }}>
        
        {/* Left Side: Inputs */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Developer Cost & Business Variables</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Developer Hourly Rate</span>
                <strong style={{ color: 'var(--color-primary)' }}>${devRate}/hr</strong>
              </div>
              <input 
                type="range" 
                min="40" 
                max="250" 
                step="5"
                value={devRate} 
                onChange={(e) => setDevRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Developer Work Hours</span>
                <strong style={{ color: 'var(--color-primary)' }}>{devEffort} hrs</strong>
              </div>
              <input 
                type="range" 
                min="20" 
                max="600" 
                step="10"
                value={devEffort} 
                onChange={(e) => setDevEffort(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Total Monthly Orders</span>
                <strong style={{ color: 'var(--color-primary)' }}>{monthlyConversions.toLocaleString()}</strong>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="20000" 
                step="500"
                value={monthlyConversions} 
                onChange={(e) => setMonthlyConversions(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Customer Lifetime Value (LTV)</span>
                <strong style={{ color: 'var(--color-primary)' }}>${clv}</strong>
              </div>
              <input 
                type="range" 
                min="50" 
                max="2000" 
                step="50"
                value={clv} 
                onChange={(e) => setClv(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>Conversion Drop Penalty (From Lag/Bugs)</span>
              <strong style={{ color: 'var(--color-danger)' }}>{leakageRate}% penalty</strong>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="15.0" 
              step="0.5"
              value={leakageRate} 
              onChange={(e) => setLeakageRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-danger)' }}
            />
          </div>

        </div>

        {/* Right Side: KPIs */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Projected Financial Outcomes</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flexGrow: 1 }}>
            
            <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.12)', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Annual Cost of Inaction</span>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-danger)', marginTop: '4px' }}>{formatCurrency(annualCOI)}</h4>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Revenue lost if we do nothing.</span>
            </div>

            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>One-Time Cost to Fix</span>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{formatCurrency(costToFix)}</h4>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Budget needed for developer hours.</span>
            </div>

            <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.04)', border: '1px solid rgba(34, 197, 94, 0.12)', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Projected Year 1 Profit</span>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
                  {formatCurrency(netRoi)}
                </h4>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-success)', fontWeight: 700 }}>+{roiPercentage}% Return on cost</span>
            </div>

            <div style={{ padding: '16px', background: 'rgba(6, 182, 212, 0.04)', border: '1px solid rgba(6, 182, 212, 0.12)', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Investment Payback Time</span>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-secondary)', marginTop: '4px' }}>{paybackMonths} months</h4>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Months of recovered sales to break even.</span>
            </div>

          </div>
        </div>

      </div>

      {/* 12-Month Cumulative Chart */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} style={{ color: 'var(--color-secondary)' }} />
          12-Month Cumulative Investment Analysis
        </h3>
        
        <div style={{ flexGrow: 1, width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} formatter={(v) => `$${v.toLocaleString()}`} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-surface)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '12px',
                  color: 'var(--text-primary)'
                }} 
              />
              <Legend verticalAlign="top" height={36} />
              <Line name="Cumulative Lost Revenue (Doing Nothing)" type="monotone" dataKey="Cumulative Loss (Doing Nothing)" stroke="var(--color-danger)" strokeWidth={3} dot={false} />
              <Line name="One-time Developer Budget Required" type="monotone" dataKey="Resolution Investment Cost" stroke="var(--text-muted)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line name="Net Capital Recovered (After paying devs)" type="monotone" dataKey="Net Capital Recovered" stroke="var(--color-success)" strokeWidth={3} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
