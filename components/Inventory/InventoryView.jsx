import React, { useState } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LabelList, ReferenceLine, Cell
} from 'recharts';
import { 
  Plus, Search, Filter, Check, Trash2, Settings, AlertOctagon, HelpCircle, Info
} from 'lucide-react';

const initialDebtItems = [
  { id: 1, name: 'Checkout Page Screen Shifts (CLS)', category: 'Performance', impact: 9, effort: 3, severity: 'Critical', desc: 'Advertising banner loads dynamically, pushing the buy button down and causing users to misclick.', status: 'Active' },
  { id: 2, name: 'Missing Checkout Field Labels (Screen Readers)', category: 'Accessibility', impact: 8, effort: 2, severity: 'Critical', desc: 'Screen readers read raw input codes instead of helpful labels, failing compliance audits.', status: 'Active' },
  { id: 3, name: 'Homepage Carousel Loading Lag', category: 'Performance', impact: 6, effort: 4, severity: 'Major', desc: 'Old script blocks main page loading for 400ms on mobile devices during initial load.', status: 'Active' },
  { id: 4, name: 'Non-Standard Typography Styles on Products', category: 'Design System', impact: 4, effort: 1, severity: 'Minor', desc: 'Dozens of hardcoded fonts that bypass standard UI library styling guidelines.', status: 'Active' },
  { id: 5, name: 'Invisible Focus Outlines on Menu Links', category: 'Accessibility', impact: 7, effort: 3, severity: 'Major', desc: 'Keyboard-only navigators cannot see where their focus is on the page, failing ADA guidelines.', status: 'Active' },
  { id: 6, name: 'Duplicate Framework Stylesheet Bloat', category: 'Design System', impact: 3, effort: 7, severity: 'Minor', desc: 'Three separate style folders are loaded, increasing page loading sizes by 350KB.', status: 'Active' },
  { id: 7, name: 'Payment Buy Button Click Response Lag (INP)', category: 'Performance', impact: 9, effort: 8, severity: 'Critical', desc: 'No validation loading indicator, causing users to double-click and submit multiple charges.', status: 'Active' },
];

export default function InventoryView() {
  const [items, setItems] = useState(initialDebtItems);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [sevFilter, setSevFilter] = useState('All');
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Performance');
  const [newImpact, setNewImpact] = useState(5);
  const [newEffort, setNewEffort] = useState(5);
  const [newSeverity, setNewSeverity] = useState('Major');
  const [newDesc, setNewDesc] = useState('');

  // Handle Add Item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newName) return;
    const newItem = {
      id: Date.now(),
      name: newName,
      category: newCategory,
      impact: Number(newImpact),
      effort: Number(newEffort),
      severity: newSeverity,
      desc: newDesc || 'No description provided.',
      status: 'Active'
    };
    setItems([newItem, ...items]);
    setIsModalOpen(false);
    // Reset Form
    setNewName('');
    setNewDesc('');
    setNewImpact(5);
    setNewEffort(5);
    setNewSeverity('Major');
  };

  // Toggle Resolve Status
  const handleToggleResolve = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Active' ? 'Resolved' : 'Active' };
      }
      return item;
    }));
  };

  // Delete Item
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  // Filter items
  const activeItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === 'All' || item.category === catFilter;
    const matchesSev = sevFilter === 'All' || item.severity === sevFilter;
    return matchesSearch && matchesCat && matchesSev;
  });

  // Data for prioritization matrix (only show active ones)
  const matrixData = items
    .filter(item => item.status === 'Active')
    .map(item => ({
      x: item.effort,
      y: item.impact,
      id: item.id,
      name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
      fullName: item.name,
      severity: item.severity
    }));

  const handleMatrixClick = (e) => {
    if (e && e.payload) {
      setSelectedItemId(e.payload.id);
      const element = document.getElementById(`debt-item-${e.payload.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Custom tooltips for Matrix
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ 
          background: 'var(--bg-surface)', 
          border: '1px solid var(--border-color)', 
          padding: '16px', 
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '260px'
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{data.fullName}</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Customer Impact: <strong style={{ color: 'var(--color-primary)' }}>{data.y}/10</strong> | 
            Developer Effort: <strong style={{ color: 'var(--color-secondary)' }}>{data.x}/10</strong>
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', borderTop: '1px dashed var(--border-color)', paddingTop: '6px' }}>
            Quadrant: <strong style={{ color: 'var(--color-primary)' }}>
              {data.y >= 5 && data.x <= 5 ? 'Quick Win (Fix First)' : 
               data.y >= 5 && data.x > 5 ? 'Strategic Project' :
               data.y < 5 && data.x <= 5 ? 'Fill-in (Low Priority)' : 'Complex/Low Value'}
            </strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="inventory-view" style={{ position: 'relative' }}>
      <div className="view-header">
        <div>
          <h2>Technical & Experience Backlog</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Prioritize resolving structural visual bugs by balancing customer impact against engineering resources.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> File Debt Audit Item
        </button>
      </div>

      {/* Simplified Welcome Banner */}
      <div className="welcome-banner">
        <span style={{ fontSize: '2rem' }}>📊</span>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Executive Prioritization Matrix</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
            Rather than looking at code complexity alone, the matrix maps **Customer Conversion Gain** against **Engineering Effort**. Click any bubble on the grid to jump to its description and details in the list below.
          </p>
        </div>
      </div>

      {/* Grid: Matrix Chart & Summary */}
      <div className="grid-cols-2" style={{ marginBottom: '32px' }}>
        
        {/* Scatter Chart (Priority Matrix) */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Prioritization Map</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '20px' }}>
            Top-left bubbles represent high-gain, low-effort wins. Fix these first.
          </p>
          <div style={{ flexGrow: 1, width: '100%', height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Developer Effort" 
                  domain={[0, 10]} 
                  stroke="var(--text-muted)" 
                  fontSize={12}
                  tickCount={11}
                  label={{ value: 'Developer Effort (Easy ➔ Complex)', position: 'insideBottom', offset: -10, fill: 'var(--text-muted)', fontSize: 12 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Customer Impact" 
                  domain={[0, 10]} 
                  stroke="var(--text-muted)" 
                  fontSize={12}
                  tickCount={11}
                  label={{ value: 'Conversion Gain (Low ➔ High)', angle: -90, position: 'insideLeft', offset: 0, fill: 'var(--text-muted)', fontSize: 12 }}
                />
                <ZAxis type="number" range={[150, 450]} />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Quadrant References */}
                <ReferenceLine x={5} stroke="rgba(0,0,0,0.1)" strokeWidth={1.5} />
                <ReferenceLine y={5} stroke="rgba(0,0,0,0.1)" strokeWidth={1.5} />
                
                <Scatter 
                  name="Debt Items" 
                  data={matrixData} 
                  fill="var(--color-primary)" 
                  onClick={handleMatrixClick}
                  cursor="pointer"
                >
                  {
                    matrixData.map((entry, index) => {
                      let color = 'var(--color-primary)';
                      if (entry.severity === 'Critical') color = 'var(--color-danger)';
                      else if (entry.severity === 'Major') color = 'var(--color-warning)';
                      
                      const isSelected = selectedItemId === entry.id;
                      
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={color} 
                          stroke={isSelected ? 'var(--text-primary)' : 'transparent'}
                          strokeWidth={isSelected ? 3 : 0}
                        />
                      );
                    })
                  }
                  <LabelList dataKey="name" position="top" style={{ fill: 'var(--text-secondary)', fontSize: 10, pointerEvents: 'none', fontWeight: 600 }} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <span>Top-Left: <strong style={{ color: 'var(--color-primary)' }}>Quick Wins</strong></span>
            <span>Top-Right: <strong style={{ color: 'var(--color-accent)' }}>Strategic Bets</strong></span>
            <span>Bottom-Left: <strong style={{ color: 'var(--text-secondary)' }}>Fill-ins</strong></span>
            <span>Bottom-Right: <strong style={{ color: 'var(--color-warning)' }}>Deprioritize</strong></span>
          </div>
        </div>

        {/* Matrix Explainer Guide */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Debt Prioritization Framework</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Unlike technical dashboards looking strictly at code lines, we weigh customer friction against engineering hours.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-danger)', marginTop: '6px' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Critical Severity (Red)</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Directly causes immediate checkout drop-offs or blocks legal accessibility standards (impacts sales volume heavily).</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-warning)', marginTop: '6px' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Major Severity (Amber)</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Slows down page loading and button click speed, frustrating mobile users or making inputs hard to read.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', marginTop: '6px' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Minor Severity (Indigo)</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Small design guideline deviations, minor visual quirks, or redundant styling files.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(37, 99, 235, 0.04)', 
            border: '1px solid rgba(37, 99, 235, 0.12)', 
            padding: '16px', 
            borderRadius: '12px',
            marginTop: '16px'
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700 }}>Prioritization Tip:</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
              Resolving **Quick Wins** first can recover up to 1.8% of lost conversions in just a few developer work days, generating quick ROI.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Backlog List */}
      <div className="glass-card">
        {/* Filters and Search toolbar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '16px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1, maxWidth: '400px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search backlog items..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '44px', borderRadius: '99px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={14} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Category:</span>
              <select 
                value={catFilter} 
                onChange={(e) => setCatFilter(e.target.value)}
                style={{ 
                  background: 'var(--bg-surface)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-primary)',
                  padding: '8px 12px',
                  borderRadius: '99px',
                  outline: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <option value="All">All Categories</option>
                <option value="Performance">Performance</option>
                <option value="Accessibility">Accessibility</option>
                <option value="Design System">Design System</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Severity:</span>
              <select 
                value={sevFilter} 
                onChange={(e) => setSevFilter(e.target.value)}
                style={{ 
                  background: 'var(--bg-surface)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-primary)',
                  padding: '8px 12px',
                  borderRadius: '99px',
                  outline: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Backlog Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>RESOLVE</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>AUDIT BACKLOG ITEM</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>CATEGORY</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>SEVERITY</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'center' }}>IMPACT / EFFORT</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {activeItems.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No matching technical debt items found.
                  </td>
                </tr>
              ) : (
                activeItems.map((item) => {
                  const isSelected = selectedItemId === item.id;
                  const isResolved = item.status === 'Resolved';
                  
                  let badgeClass = 'badge-primary';
                  if (item.severity === 'Critical') badgeClass = 'badge-danger';
                  else if (item.severity === 'Major') badgeClass = 'badge-warning';
                  else badgeClass = 'badge-success';

                  return (
                    <tr 
                      key={item.id} 
                      id={`debt-item-${item.id}`}
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        background: isSelected ? 'rgba(37, 99, 235, 0.04)' : 'transparent',
                        transition: 'var(--transition-snappy)',
                        opacity: isResolved ? 0.5 : 1
                      }}
                    >
                      <td style={{ padding: '16px 8px' }}>
                        <button 
                          onClick={() => handleToggleResolve(item.id)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: isResolved ? '1px solid var(--color-success)' : '1px solid var(--border-color)',
                            background: isResolved ? 'var(--color-success)' : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            transition: 'var(--transition-snappy)'
                          }}
                        >
                          {isResolved && <Check size={14} />}
                        </button>
                      </td>
                      <td style={{ padding: '16px 8px', maxWidth: '350px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {item.name}
                          {isResolved && <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', background: 'rgba(34,197,94,0.1)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>RESOLVED</span>}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{item.desc}</div>
                      </td>
                      <td style={{ padding: '16px 8px', verticalAlign: 'middle' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.category}</span>
                      </td>
                      <td style={{ padding: '16px 8px', verticalAlign: 'middle' }}>
                        <span className={`badge ${badgeClass}`}>{item.severity}</span>
                      </td>
                      <td style={{ padding: '16px 8px', verticalAlign: 'middle', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                          <span style={{ color: 'var(--color-danger)' }} title="Customer Conversion Gain">{item.impact}</span>
                          <span style={{ color: 'var(--text-muted)' }}> / </span>
                          <span style={{ color: 'var(--color-primary)' }} title="Developer Resource Effort">{item.effort}</span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>Impact / Effort</span>
                      </td>
                      <td style={{ padding: '16px 8px', verticalAlign: 'middle', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '99px' }}
                            onClick={() => setSelectedItemId(isSelected ? null : item.id)}
                          >
                            {isSelected ? 'Deselect' : 'Pin Map'}
                          </button>
                          <button 
                            style={{ 
                              background: 'transparent', 
                              border: 'none', 
                              color: 'var(--color-danger)', 
                              cursor: 'pointer',
                              padding: '6px',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            onClick={() => handleDeleteItem(item.id)}
                            title="Delete Item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-surface)', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={20} style={{ color: 'var(--color-primary)' }} />
              File Debt Backlog Item
            </h3>
            
            <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Backlog Item Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Broken screen reader outline on product page" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="input-field"
                  style={{ borderRadius: '12px' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Category</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ 
                      width: '100%', 
                      background: 'var(--bg-surface)', 
                      border: '1px solid var(--border-color)', 
                      color: 'var(--text-primary)',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      outline: 'none',
                      fontWeight: 600
                    }}
                  >
                    <option value="Performance">Performance</option>
                    <option value="Accessibility">Accessibility</option>
                    <option value="Design System">Design System</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Severity</label>
                  <select 
                    value={newSeverity} 
                    onChange={(e) => setNewSeverity(e.target.value)}
                    style={{ 
                      width: '100%', 
                      background: 'var(--bg-surface)', 
                      border: '1px solid var(--border-color)', 
                      color: 'var(--text-primary)',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      outline: 'none',
                      fontWeight: 600
                    }}
                  >
                    <option value="Critical">Critical (Saves Loss)</option>
                    <option value="Major">Major (Slows Site)</option>
                    <option value="Minor">Minor (Cosmetic)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span>Conversion Gain</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{newImpact}/10</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={newImpact} 
                    onChange={(e) => setNewImpact(e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span>Developer Effort</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{newEffort}/10</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={newEffort} 
                    onChange={(e) => setNewEffort(e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Description / Technical Context</label>
                <textarea 
                  rows="3" 
                  placeholder="Detail how this affects customer checkout and what code changes are needed..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="input-field"
                  style={{ resize: 'vertical', borderRadius: '12px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" style={{ borderRadius: '99px' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ borderRadius: '99px' }}>Save Backlog</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
