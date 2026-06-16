import React, { useState } from 'react';
import { 
  ClipboardCheck, Award, AlertTriangle, ArrowRight, RotateCcw, 
  Printer, ArrowLeft, CheckCircle2, ShieldAlert
} from 'lucide-react';

const assessmentSteps = [
  {
    title: 'Performance & Vitals',
    description: 'Core Web Vitals measure page loading speed, visual stability, and interaction responsiveness.',
    questions: [
      { id: 'lcp', label: 'Largest Contentful Paint (Main image/content load time):', options: [
        { text: 'Under 2.5 seconds (Good)', score: 10 },
        { text: 'Between 2.5s and 4.0s (Needs Improvement)', score: 5 },
        { text: 'Over 4.0 seconds (Poor)', score: 1 }
      ]},
      { id: 'inp', label: 'Interaction Responsiveness (Latency upon clicks/actions):', options: [
        { text: 'Instantaneous response under 100ms (Good)', score: 10 },
        { text: 'Noticeable lag between 100ms and 300ms (Average)', score: 6 },
        { text: 'Frustrating delay above 300ms (Poor)', score: 2 }
      ]}
    ]
  },
  {
    title: 'Design System Integrity',
    description: 'Consistent branding, UI layout components, and typography avoid friction and developer bloat.',
    questions: [
      { id: 'custom_styles', label: 'Style replication and customized CSS files in production:', options: [
        { text: 'Fully unified component design system, zero custom CSS overrides (Optimized)', score: 10 },
        { text: 'Semi-standardized with minor custom tweaks or legacy code elements (Drifting)', score: 6 },
        { text: 'Ad-hoc styles, hardcoded colors and typography on almost every view (Fractured)', score: 2 }
      ]},
      { id: 'comp_duplication', label: 'Component sharing and reusability across platforms:', options: [
        { text: 'Single source of truth library with versioned shared components (High)', score: 10 },
        { text: 'Multiple button/input styles copy-pasted across repositories (Moderate)', score: 5 },
        { text: 'Every team rebuilds basic menus/modals from scratch (Low)', score: 1 }
      ]}
    ]
  },
  {
    title: 'Accessibility (A11y)',
    description: 'Ensuring screen readers, keyboard focus, and contrast values are optimized for all users.',
    questions: [
      { id: 'contrast', label: 'Color contrast of buttons, copy text and banners:', options: [
        { text: 'Passes Web Content Accessibility Guidelines (WCAG) AAA standards (Pass)', score: 10 },
        { text: 'Minor contrast failures on secondary links or metadata text (Warning)', score: 6 },
        { text: 'Illegible gray text, text overlays on photos without backing (Critical Fail)', score: 1 }
      ]},
      { id: 'navigation', label: 'Keyboard only navigation and focus outline visibility:', options: [
        { text: 'Smooth focus indicators, logical order, zero traps (Compliant)', score: 10 },
        { text: 'No focus indicators visible but pages can be tabbed through (Drifting)', score: 5 },
        { text: 'Tabs get locked, modal screens cannot be dismissed via keyboard (Unusable)', score: 1 }
      ]}
    ]
  },
  {
    title: 'Developer Velocity',
    description: 'Codebase complexity that slows feature deployment and blocks releases.',
    questions: [
      { id: 'deployment_speed', label: 'Time required to build, test and deploy a single line change:', options: [
        { text: 'Under 10 minutes, fully automated CI/CD pipeline (Fast)', score: 10 },
        { text: 'Between 10 minutes and 1 hour (Average)', score: 6 },
        { text: 'Over 1 hour, requires manual validation and release approvals (Slow)', score: 2 }
      ]},
      { id: 'dependency_health', label: 'Legacy library version blockers (Webpack/JQuery/Outdated versions):', options: [
        { text: 'Up-to-date modern bundlers, weekly dependency security updates (Clean)', score: 10 },
        { text: 'Afraid to upgrade modules due to potential breaking changes (Fragile)', score: 5 },
        { text: 'Locked to ancient framework versions that block modern React code (Blocked)', score: 1 }
      ]}
    ]
  }
];

export default function CalculatorView() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const handleSelectOption = (questionId, score) => {
    setAnswers({
      ...answers,
      [questionId]: score
    });
  };

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setAssessmentComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setAssessmentComplete(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Score Calculations
  const maxScore = assessmentSteps.length * 20; // 2 questions per step, 10 max points each = 20 points/step. Total = 80 max points
  const currentActualScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  
  // Convert score to experience debt index (100 is high debt, 0 is no debt)
  const experienceDebtIndex = Math.round(100 - (currentActualScore / 80) * 100);

  // Determine Grade & Recommendations
  const getGrade = (debt) => {
    if (debt >= 70) return { title: 'Obsidian Alert (Critical Debt)', desc: 'High friction, low conversion velocity, major revenue leakage.', color: 'var(--color-danger)' };
    if (debt >= 40) return { title: 'Slate Level (Moderate Debt)', desc: 'Noticeable user drop-offs, design consistency drift, slower deployments.', color: 'var(--color-warning)' };
    return { title: 'Pearl Grade (Optimized Experience)', desc: 'High velocity, compliant accessibility, stable layouts, optimized conversion.', color: 'var(--color-success)' };
  };

  const grade = getGrade(experienceDebtIndex);

  // Generate automated advice
  const getRecommendations = () => {
    const advice = [];
    const perfScore = (answers['lcp'] || 0) + (answers['inp'] || 0);
    const designScore = (answers['custom_styles'] || 0) + (answers['comp_duplication'] || 0);
    const a11yScore = (answers['contrast'] || 0) + (answers['navigation'] || 0);
    const devScore = (answers['deployment_speed'] || 0) + (answers['dependency_health'] || 0);

    if (perfScore < 15) {
      advice.push({ title: 'Optimize Core Web Vitals', desc: 'Prioritize compressing images, lazy-load offscreen resources, and replace render-blocking libraries (e.g. legacy jQuery) to fix LCP.' });
    }
    if (designScore < 15) {
      advice.push({ title: 'Audit Design System Consistency', desc: 'Audit codebase for hardcoded layouts and colors. Extract redundant UI components into a centralized, single-source-of-truth style guide.' });
    }
    if (a11yScore < 15) {
      advice.push({ title: 'Accessibility Compliance Sprint', desc: 'Fix color contrast issues on main buttons and run a QA test of forms using screen readers to guarantee tab outline visibility.' });
    }
    if (devScore < 15) {
      advice.push({ title: 'DevOps & Pipeline Modernization', desc: 'Modernize bundle configs and build systems. Setup automated checks on CI/CD pipelines to prevent large bundle regressions.' });
    }

    if (advice.length === 0) {
      advice.push({ title: 'Maintain Clean Architecture', desc: 'System is healthy. Establish monthly automated performance and accessibility tracking to prevent regression.' });
    }

    return advice;
  };

  const recommendations = getRecommendations();
  const step = assessmentSteps[currentStep];

  // Helper to check if current step is fully answered
  const isStepAnswered = () => {
    return step.questions.every(q => answers[q.id] !== undefined);
  };

  return (
    <div className="calculator-view">
      <div className="view-header">
        <div>
          <h2>Experience Debt Self-Audit</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Evaluate your frontend engineering and design practices to output a benchmark audit report.
          </p>
        </div>
      </div>

      {!assessmentComplete ? (
        /* Audit Wizard Card */
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Progress indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              STEP {currentStep + 1} OF {assessmentSteps.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {step.title}
            </span>
          </div>

          <div style={{ 
            height: '4px', 
            background: 'var(--border-color)', 
            borderRadius: '2px', 
            marginBottom: '32px',
            position: 'relative'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${((currentStep + 1) / assessmentSteps.length) * 100}%`, 
              background: 'var(--color-primary)', 
              borderRadius: '2px',
              transition: 'var(--transition-smooth)'
            }}/>
          </div>

          {/* Step content */}
          <div style={{ minHeight: '260px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{step.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>{step.description}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {step.questions.map((q) => (
                <div key={q.id}>
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 500, marginBottom: '12px' }}>
                    {q.label}
                  </label>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {q.options.map((option, idx) => {
                      const isSelected = answers[q.id] === option.score;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, option.score)}
                          style={{
                            textAlign: 'left',
                            padding: '16px',
                            background: isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(0,0,0,0.15)',
                            border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            transition: 'var(--transition-snappy)',
                            outline: 'none',
                            fontSize: '0.9rem'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{option.text}</span>
                            {isSelected && <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>✓ Selected</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '24px', 
            marginTop: '32px' 
          }}>
            <button 
              className="btn btn-secondary" 
              onClick={handlePrev} 
              disabled={currentStep === 0}
              style={{ opacity: currentStep === 0 ? 0.3 : 1 }}
            >
              <ArrowLeft size={16} /> Back
            </button>

            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={!isStepAnswered()}
              style={{ opacity: !isStepAnswered() ? 0.5 : 1 }}
            >
              {currentStep === assessmentSteps.length - 1 ? 'Calculate Score' : 'Next Category'} <ArrowRight size={16} />
            </button>
          </div>

        </div>
      ) : (
        /* Report View (Print Optimized) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Printable Report Header */}
          <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClipboardCheck style={{ color: 'var(--color-primary)' }} />
                Audit Report Complete
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                Results compiled based on frontend architectural configurations.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={handlePrint}>
                <Printer size={16} /> Print/PDF Report
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                <RotateCcw size={16} /> Re-Evaluate
              </button>
            </div>
          </div>

          {/* Score Summary Grid */}
          <div className="grid-cols-2">
            
            {/* Visual Dial Gauge */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Experience Debt Index
              </span>
              
              {/* Central Dial */}
              <div style={{ 
                width: '180px', 
                height: '180px', 
                borderRadius: '50%', 
                background: 'rgba(0,0,0,0.3)',
                border: '8px solid var(--border-color)',
                borderTopColor: grade.color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '24px',
                marginBottom: '24px',
                boxShadow: `0 0 30px ${grade.color}15`
              }}>
                <span style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {experienceDebtIndex}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Index (Max 100)</span>
              </div>

              <h4 style={{ color: grade.color, fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>{grade.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '280px' }}>{grade.desc}</p>
            </div>

            {/* Scores by Category Vector */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Friction Vectors</h3>
              
              {/* Category progress tracker */}
              {assessmentSteps.map((s, idx) => {
                // Calculate actual score of category questions
                const qIds = s.questions.map(q => q.id);
                const actual = qIds.reduce((sum, id) => sum + (answers[id] || 0), 0);
                const pct = Math.round((actual / 20) * 100);
                const debtPct = 100 - pct;

                let scoreColor = 'var(--color-success)';
                if (debtPct >= 60) scoreColor = 'var(--color-danger)';
                else if (debtPct >= 30) scoreColor = 'var(--color-warning)';

                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 500 }}>{s.title}</span>
                      <span style={{ fontWeight: 600, color: scoreColor }}>{debtPct}% Experience Debt</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${debtPct}%`, 
                        background: scoreColor, 
                        borderRadius: '4px',
                        boxShadow: `0 0 8px ${scoreColor}40`
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Action Remediation List */}
          <div className="glass-card" style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert style={{ color: 'var(--color-secondary)' }} />
              C-Suite Remediation Roadmap
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recommendations.map((rec, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    gap: '16px', 
                    padding: '16px', 
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: 'rgba(6, 182, 212, 0.15)', 
                    color: 'var(--color-secondary)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{rec.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{rec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
