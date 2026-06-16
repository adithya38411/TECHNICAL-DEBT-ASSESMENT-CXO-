import React, { useState } from 'react';
import { 
  MessageSquare, User, Tag, HelpCircle, ArrowUpRight, Search, 
  MessageCircle, Star, AlertTriangle, AlertCircle
} from 'lucide-react';

const knownDebtList = [
  { id: 1, name: 'Checkout Page Screen Shifts (CLS)', count: 48 },
  { id: 2, name: 'Missing Checkout Field Labels (Accessibility)', count: 32 },
  { id: 3, name: 'Homepage Carousel Loading Lag', count: 18 },
  { id: 4, name: 'Non-Standard Typography on Products', count: 4 },
  { id: 5, name: 'Invisible Focus Outlines on Menu Links', count: 12 },
  { id: 7, name: 'Payment Buy Button Click Response Lag (INP)', count: 29 }
];

const initialCustomerFeedback = [
  { 
    id: 101, 
    source: 'NPS Customer Review', 
    user: 'David K.', 
    comment: 'The checkout button moved right as I clicked, and I accidentally purchased a sponsored web hosting package. Fix this alignment issue!',
    rating: 'Detractor',
    linkedDebtId: 1
  },
  { 
    id: 102, 
    source: 'Support Ticket #82940', 
    user: 'Sarah M.', 
    comment: 'I am trying to fill out the credit card expiration field using my screen reader but it just reads "input text box" with no directions. I cannot checkout.',
    rating: 'Critical Issue',
    linkedDebtId: 2
  },
  { 
    id: 103, 
    source: 'App Store Review', 
    user: 'Alex P.', 
    comment: 'Extremely slow loading speeds on the homepage slider. The screen goes white for several seconds before loading images.',
    rating: 2,
    linkedDebtId: 3
  },
  { 
    id: 104, 
    source: 'Support Ticket #83102', 
    user: 'Robert T.', 
    comment: 'I hit purchase and the screen locked. I did not get any receipt, so I clicked it twice and got billed twice! Please refund my second purchase.',
    rating: 'Critical Issue',
    linkedDebtId: 7
  },
  { 
    id: 105, 
    source: 'NPS Customer Review', 
    user: 'Elena R.', 
    comment: 'Contrast on the checkout button is terrible. The white text on light cyan background is completely unreadable in daylight.',
    rating: 'Passive',
    linkedDebtId: null
  },
  { 
    id: 106, 
    source: 'App Store Review', 
    user: 'James L.', 
    comment: 'Tabbing through the checkout form using my keyboard skips the credit card validation button entirely. I have to click it manually.',
    rating: 3,
    linkedDebtId: 5
  }
];

export default function CustomerVoiceView() {
  const [feedbacks, setFeedbacks] = useState(initialCustomerFeedback);
  const [debts, setDebts] = useState(knownDebtList);
  const [search, setSearch] = useState('');

  // Handle linking a feedback to a debt
  const handleLinkDebt = (feedbackId, debtId) => {
    // 1. Update feedback list
    const updatedFeedbacks = feedbacks.map(item => {
      if (item.id === feedbackId) {
        return { ...item, linkedDebtId: debtId ? Number(debtId) : null };
      }
      return item;
    });
    setFeedbacks(updatedFeedbacks);

    // 2. Recalculate debt counts based on references
    const newDebts = debts.map(d => {
      const count = updatedFeedbacks.filter(f => f.linkedDebtId === d.id).length;
      // Multiply count by 8 to simulate full volume scaled from sample size
      return { ...d, count: count * 8 }; 
    });
    setDebts(newDebts);
  };

  const filteredFeedbacks = feedbacks.filter(f => 
    f.comment.toLowerCase().includes(search.toLowerCase()) ||
    f.user.toLowerCase().includes(search.toLowerCase()) ||
    f.source.toLowerCase().includes(search.toLowerCase())
  );

  // Stats calculation
  const totalComplaintsLinked = debts.reduce((sum, d) => sum + d.count, 0);
  const estSupportCost = totalComplaintsLinked * 15; // Assume $15 cost per support ticket handle time

  return (
    <div className="customer-voice-view">
      <div className="view-header">
        <div>
          <h2>Voice of Customer & Support Linkage</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Map support tickets and user reviews directly to outstanding site bugs, quantifying support costs.
          </p>
        </div>
      </div>

      {/* Simplified Welcome Banner */}
      <div className="welcome-banner">
        <span style={{ fontSize: '2rem' }}>💬</span>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Customer Support Linkage</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
            This panel helps connect customer complaints directly to specific code errors. By tagging user reviews to outstanding bugs, we can estimate how much customer service overhead each bug is driving.
          </p>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid-cols-3" style={{ marginBottom: '32px' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Traced Customer Tickets</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>{totalComplaintsLinked} tickets</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Linked to outstanding visual/loading bugs.
          </p>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Estimated Support Costs</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-danger)' }}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(estSupportCost)}/mo
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Based on average ticket handling fee ($15/ticket).
          </p>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Largest Ticket Driver</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warning)', marginTop: '6px' }}>
            Checkout Shifts (CLS)
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Traced to 31% of customer complaints.
          </p>
        </div>
      </div>

      {/* Main Grid: Linked Issues vs Inbox */}
      <div className="grid-cols-2" style={{ alignItems: 'start' }}>
        
        {/* Left Hand: Traceability Breakdown */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} style={{ color: 'var(--color-primary)' }} />
            Bugs Linked to Support Overhead
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '10px' }}>
            Monthly customer support costs generated by outstanding backlog files:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {debts.map(d => (
              <div 
                key={d.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '14px 18px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  fontSize: '0.9rem'
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Support cost: <strong>${d.count * 15}/mo</strong></span>
                  <span className="badge badge-danger" style={{ minWidth: '40px', textAlign: 'center' }}>
                    {d.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hand: Ticket Inbox & Linker */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} style={{ color: 'var(--color-secondary)' }} />
              Customer Feedback Triage Feed
            </h3>
            <div style={{ position: 'relative', width: '200px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search comments..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field"
                style={{ padding: '6px 10px 6px 30px', fontSize: '0.8rem', borderRadius: '99px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
            {filteredFeedbacks.map(f => (
              <div 
                key={f.id} 
                style={{ 
                  padding: '16px', 
                  background: 'rgba(0,0,0,0.02)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={14} />
                    {f.source}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>User: <strong>{f.user}</strong></span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  "{f.comment}"
                </p>

                {/* Linking Actions Bar */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderTop: '1px dashed var(--border-color)', 
                  paddingTop: '10px',
                  fontSize: '0.8rem',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <Tag size={12} /> Link to outstanding bug:
                  </span>
                  
                  <select
                    value={f.linkedDebtId || ''}
                    onChange={(e) => handleLinkDebt(f.id, e.target.value)}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '0.75rem',
                      maxWidth: '220px',
                      fontWeight: 600
                    }}
                  >
                    <option value="">-- Unassigned Feedback --</option>
                    {debts.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
