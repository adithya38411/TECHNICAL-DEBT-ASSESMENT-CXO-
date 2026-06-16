import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Calendar, Users, Clock, AlertTriangle, Layers, ChevronRight 
} from 'lucide-react';

const teamScorecardData = [
  { team: 'Growth & Funnel Team', activeDebt: 4, velocity: 85, complianceGrade: 'B', color: 'var(--color-primary)' },
  { team: 'Checkout & Payments Team', activeDebt: 7, velocity: 40, complianceGrade: 'D', color: 'var(--color-danger)' },
  { team: 'User Interface Core Team', activeDebt: 3, velocity: 92, complianceGrade: 'A', color: 'var(--color-success)' },
  { team: 'Data & Analytics Team', activeDebt: 2, velocity: 70, complianceGrade: 'B', color: 'var(--color-secondary)' }
];

const roadmapTasks = [
  { id: 1, name: 'Checkout Page Shift Resolution', phase: 'Release v2.3 (Performance)', start: '5%', width: '40%', color: 'var(--color-danger)', progress: '65%' },
  { id: 2, name: 'ADA Form Labeling Refactor', phase: 'Release v2.4 (A11y Compliance)', start: '35%', width: '35%', color: 'var(--color-primary)', progress: '10%' },
  { id: 3, name: 'Centralized UI Variables Standards', phase: 'Release v2.5 (Design System)', start: '60%', width: '30%', color: 'var(--color-secondary)', progress: '0%' },
  { id: 4, name: 'Payment Buy Button Click Optimization', phase: 'Release v2.3 (Performance)', start: '15%', width: '50%', color: 'var(--color-danger)', progress: '40%' }
];

export default function RoadmapTeamsView() {
  const [tasks, setTasks] = useState(roadmapTasks);

  return (
    <div className="roadmap-teams-view">
      <div className="view-header">
        <div>
          <h2>Remediation Timeline & Department Scorecards</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Coordinate technical bug fixes with upcoming product releases and track team engineering speeds.
          </p>
        </div>
      </div>

      {/* Simplified Welcome Banner */}
      <div className="welcome-banner">
        <span style={{ fontSize: '2rem' }}>📅</span>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Coordinating the Fixes</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
            This roadmap aligns our developer schedules with release targets so we don't delay ongoing marketing campaigns. Department scorecards track active visual bugs in backlog folders, ensuring engineering team accountability.
          </p>
        </div>
      </div>

      {/* Gantt Timeline Card */}
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} style={{ color: 'var(--color-secondary)' }} />
          Release Alignment Schedule (Q3 - Q4)
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
          Gantt chart timeline linking critical experience bug fixes directly to scheduled product updates:
        </p>

        <div className="gantt-container">
          <div className="gantt-header">
            <span style={{ fontWeight: 700 }}>REMEDIATION PROJECT</span>
            <div className="gantt-months-grid">
              <span>July</span>
              <span>August</span>
              <span>September</span>
              <span>October</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            {tasks.map(t => (
              <div key={t.id} className="gantt-row">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="gantt-task-name">{t.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.phase}</span>
                </div>
                <div className="gantt-bar-container">
                  <div 
                    className="gantt-bar"
                    style={{
                      left: t.start,
                      width: t.width,
                      background: `linear-gradient(90deg, ${t.color} 0%, rgba(255,255,255,0.05) 100%)`,
                      borderLeft: `4px solid ${t.color}`,
                      boxShadow: `0 0 10px ${t.color}15`
                    }}
                  >
                    <span style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)', fontSize: '0.72rem' }}>Progress: {t.progress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split: Department Scorecard Table & Recharts Bar Chart */}
      <div className="grid-cols-2">
        
        {/* Scorecard Table */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} style={{ color: 'var(--color-primary)' }} />
            Department Accountability Scorecard
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>
            Backlog ownership and weekly code shipment speeds grouped by internal team:
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <th style={{ padding: '8px 0', color: 'var(--text-muted)', fontWeight: 600 }}>TEAM SQUAD</th>
                <th style={{ padding: '8px 0', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 600 }}>ACTIVE BUGS</th>
                <th style={{ padding: '8px 0', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 600 }}>DEV SPEED</th>
                <th style={{ padding: '8px 0', color: 'var(--text-muted)', textAlign: 'right', fontWeight: 600 }}>COMPLIANCE RATING</th>
              </tr>
            </thead>
            <tbody>
              {teamScorecardData.map((t, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '12px 0', fontWeight: 700, color: 'var(--text-primary)' }}>{t.team}</td>
                  <td style={{ padding: '12px 0', textAlign: 'center' }}>
                    <span className="badge" style={{ background: t.activeDebt > 5 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0,0,0,0.03)', color: t.activeDebt > 5 ? 'var(--color-danger)' : 'var(--text-primary)' }}>
                      {t.activeDebt} active
                    </span>
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700 }}>{t.velocity}%</span>
                      <div style={{ width: '40px', height: '6px', background: 'rgba(0,0,0,0.1)', borderRadius: '3px' }}>
                        <div style={{ width: `${t.velocity}%`, height: '100%', background: t.velocity > 70 ? 'var(--color-success)' : 'var(--color-warning)', borderRadius: '3px' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 800, color: t.complianceGrade === 'A' ? 'var(--color-success)' : t.complianceGrade === 'B' ? 'var(--color-primary)' : 'var(--color-danger)' }}>
                    Grade {t.complianceGrade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visualized backlogs chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Technical Bug Distribution</h3>
          
          <div style={{ flexGrow: 1, width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamScorecardData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="team" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px'
                  }}
                  formatter={(value) => [`${value} active bugs`, 'Backlog Size']}
                />
                <Bar dataKey="activeDebt" radius={[99, 99, 0, 0]}>
                  {
                    teamScorecardData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
