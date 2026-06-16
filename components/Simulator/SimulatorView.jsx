import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, Zap, EyeOff, Sliders, CheckCircle, Info, Sparkles, RefreshCw
} from 'lucide-react';

export default function SimulatorView() {
  // Simulator Controls
  const [clsEnabled, setClsEnabled] = useState(false);
  const [delayEnabled, setDelayEnabled] = useState(false);
  const [contrastEnabled, setContrastEnabled] = useState(false);
  const [trapEnabled, setTrapEnabled] = useState(false);

  // Interaction States
  const [adVisible, setAdVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [misclickTriggered, setMisclickTriggered] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Refs for tracking misclicks
  const checkoutBtnContainerRef = useRef(null);
  const adInjectedRef = useRef(false);

  // CLS Timer trigger
  useEffect(() => {
    let timer;
    if (clsEnabled) {
      // Simulate slow loading banner after 1.5 seconds
      timer = setTimeout(() => {
        setAdVisible(true);
        adInjectedRef.current = true;
      }, 1500);
    } else {
      setAdVisible(false);
      adInjectedRef.current = false;
      setMisclickTriggered(false);
    }
    return () => clearTimeout(timer);
  }, [clsEnabled]);

  // A11y focus trap listener
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!trapEnabled) return;
      
      // If pressing tab and keyboard trap is active, cycle focus only between card name and expiry
      if (e.key === 'Tab') {
        const active = document.activeElement;
        if (active !== input1Ref.current && active !== input2Ref.current) {
          e.preventDefault();
          input1Ref.current?.focus();
          setFeedbackMsg('⚠️ ACCESSIBILITY ERROR: Tab focus locked between Name and Card Number!');
        } else if (active === input2Ref.current && !e.shiftKey) {
          e.preventDefault();
          input1Ref.current?.focus();
          setFeedbackMsg('⚠️ ACCESSIBILITY ERROR: Tab focus looped! Keyboard users cannot reach checkout.');
        } else if (active === input1Ref.current && e.shiftKey) {
          e.preventDefault();
          input2Ref.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [trapEnabled]);

  // Reset Simulator
  const handleReset = () => {
    setClsEnabled(false);
    setDelayEnabled(false);
    setContrastEnabled(false);
    setTrapEnabled(false);
    setAdVisible(false);
    setCouponApplied(false);
    setCouponCode('');
    setMisclickTriggered(false);
    setCheckoutComplete(false);
    setFeedbackMsg('');
  };

  // Apply Coupon (Simulates heavy main-thread latency)
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    if (delayEnabled) {
      setIsApplying(true);
      setFeedbackMsg('⏳ Simulating main thread block (FID/INP delay)...');
      setTimeout(() => {
        setIsApplying(false);
        setCouponApplied(true);
        setFeedbackMsg('✅ Coupon Applied (After 1.8s delay)');
      }, 1800);
    } else {
      setCouponApplied(true);
      setFeedbackMsg('✅ Coupon Applied instantly!');
    }
  };

  // Complete Checkout
  const handleCheckout = () => {
    if (delayEnabled) {
      setIsCheckingOut(true);
      setFeedbackMsg('⏳ Processing order... Simulated browser lag: 2.0 seconds.');
      setTimeout(() => {
        setIsCheckingOut(false);
        setCheckoutComplete(true);
        setFeedbackMsg('🎉 Order Complete! (But customer experienced critical button lag)');
      }, 2000);
    } else {
      setCheckoutComplete(true);
      setFeedbackMsg('🎉 Order completed instantly!');
    }
  };

  // Track Layout Shift misclicks
  const handleContainerClick = (e) => {
    // If the ad is visible and they clicked where the button *was*
    if (clsEnabled && adVisible) {
      const adElement = document.getElementById('injected-ad-banner');
      if (adElement && adElement.contains(e.target)) {
        setMisclickTriggered(true);
        setFeedbackMsg('❌ MISCLICK! Screen shifted! The user clicked the ad instead of the checkout button.');
      }
    }
  };

  // Dynamic Metrics based on Toggles
  const getMetrics = () => {
    return {
      cls: clsEnabled ? '0.38 (Fails Audit - Heavy Shifts)' : '0.01 (Good - Stable)',
      clsColor: clsEnabled ? 'var(--color-danger)' : 'var(--color-success)',
      inp: delayEnabled ? '2000ms (Fails Audit - Severe Click Lag)' : '45ms (Good - Snappy)',
      inpColor: delayEnabled ? 'var(--color-danger)' : 'var(--color-success)',
      contrast: contrastEnabled ? '1.4:1 (Fails Legal Minimum)' : '7.2:1 (AAA Compliant - Legible)',
      contrastColor: contrastEnabled ? 'var(--color-danger)' : 'var(--color-success)',
      a11y: trapEnabled ? 'Keyboard Trap (Fails Accessibility)' : 'Compliant (Working)',
      a11yColor: trapEnabled ? 'var(--color-danger)' : 'var(--color-success)',
      cxGrade: (clsEnabled || delayEnabled || contrastEnabled || trapEnabled) ? 'D- (Unacceptable)' : 'A+ (Optimal)',
      cxColor: (clsEnabled || delayEnabled || contrastEnabled || trapEnabled) ? 'var(--color-danger)' : 'var(--color-success)'
    };
  };

  const metrics = getMetrics();

  return (
    <div className="simulator-view">
      <div className="view-header">
        <div>
          <h2>Interactive User Friction Sandbox</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Experience how frontend coding errors and lag break user trust and abandon conversion funnels.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={handleReset}>
          <RefreshCw size={14} /> Reset Sandbox
        </button>
      </div>

      {/* Simplified Welcome Banner */}
      <div className="welcome-banner">
        <span style={{ fontSize: '2rem' }}>🎮</span>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>How to Test the Sandbox</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
            Try typing promo code **SAVE20** and clicking **Complete Checkout** in the mock billing form on the right. Then, turn on the experience bugs on the left to experience firsthand why customers abandon our carts.
          </p>
        </div>
      </div>

      <div className="grid-cols-2" style={{ alignItems: 'start' }}>
        
        {/* Left Hand: Controls & Diagnostics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Controls Card */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} style={{ color: 'var(--color-primary)' }} />
              Friction Injector Toggles
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Turn on these common coding issues to inject them into the checkout form on the right:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* CLS Toggle */}
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px',
                background: clsEnabled ? 'rgba(239, 68, 68, 0.04)' : 'var(--bg-surface)',
                border: clsEnabled ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid var(--border-color)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'var(--transition-snappy)'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <AlertTriangle size={20} style={{ color: clsEnabled ? 'var(--color-danger)' : 'var(--text-muted)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 700, display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Screen Shifts (CLS)</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Injects an ad banner that shifts the buy button as you click.</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={clsEnabled} 
                  onChange={(e) => setClsEnabled(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
              </label>

              {/* Delay Toggle */}
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px',
                background: delayEnabled ? 'rgba(234, 179, 8, 0.04)' : 'var(--bg-surface)',
                border: delayEnabled ? '1px solid rgba(234, 179, 8, 0.2)' : '1px solid var(--border-color)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'var(--transition-snappy)'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Zap size={20} style={{ color: delayEnabled ? 'var(--color-warning)' : 'var(--text-muted)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 700, display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Button Click Delay (INP)</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Freezes the browser, adding a 2-second delay to clicks.</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={delayEnabled} 
                  onChange={(e) => setDelayEnabled(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
              </label>

              {/* Contrast Toggle */}
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px',
                background: contrastEnabled ? 'rgba(239, 68, 68, 0.04)' : 'var(--bg-surface)',
                border: contrastEnabled ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid var(--border-color)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'var(--transition-snappy)'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <EyeOff size={20} style={{ color: contrastEnabled ? 'var(--color-danger)' : 'var(--text-muted)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 700, display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Faded / Hard-to-Read Labels</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mutes contrast ratio to 1.4:1, making text hard to read.</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={contrastEnabled} 
                  onChange={(e) => setContrastEnabled(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
              </label>

              {/* A11y Focus trap Toggle */}
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px',
                background: trapEnabled ? 'rgba(239, 68, 68, 0.04)' : 'var(--bg-surface)',
                border: trapEnabled ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid var(--border-color)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'var(--transition-snappy)'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Info size={20} style={{ color: trapEnabled ? 'var(--color-danger)' : 'var(--text-muted)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 700, display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Keyboard Navigation Trap</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Locks 'Tab' key inside card inputs, blocking checkout access.</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={trapEnabled} 
                  onChange={(e) => setTrapEnabled(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
              </label>
            </div>
          </div>

          {/* Diagnostics Card */}
          <div className="glass-card" style={{ background: 'var(--bg-surface)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', fontWeight: 700 }}>Real-time Audit Diagnostics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Layout Stability (CLS):</span>
                <strong style={{ color: metrics.clsColor }}>{metrics.cls}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Click Response Lag (INP):</span>
                <strong style={{ color: metrics.inpColor }}>{metrics.inp}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>A11y Text Legibility:</span>
                <strong style={{ color: metrics.contrastColor }}>{metrics.contrast}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Keyboard Focus Access:</span>
                <strong style={{ color: metrics.a11yColor }}>{metrics.a11y}</strong>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '1rem', 
                borderTop: '1px solid var(--border-color)', 
                paddingTop: '12px', 
                marginTop: '6px' 
              }}>
                <span style={{ fontWeight: 700 }}>UX Customer Experience Grade:</span>
                <strong style={{ color: metrics.cxColor, fontSize: '1.2rem' }}>{metrics.cxGrade}</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Right Hand: Interactive Mock Page */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onClick={handleContainerClick}>
          
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '8px' }}>
            <Sparkles size={12} style={{ color: 'var(--color-primary)' }} /> Live Sandbox Checkout Environment
          </div>

          <div 
            className="glass-card" 
            style={{ 
              background: contrastEnabled ? '#ffffff' : 'var(--bg-card)', 
              color: contrastEnabled ? '#888888' : 'var(--text-primary)',
              borderColor: contrastEnabled ? '#e2e8f0' : 'var(--border-color)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              transition: 'all 0.4s ease',
              borderRadius: '24px',
              padding: '32px'
            }}
          >
            {/* Mock Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              borderBottom: contrastEnabled ? '1px solid #f1f5f9' : '1px solid var(--border-color)',
              paddingBottom: '16px',
              marginBottom: '24px'
            }}>
              <h4 style={{ color: contrastEnabled ? '#888888' : 'var(--text-primary)', fontSize: '1.25rem' }}>Secure Purchase Form</h4>
              <span style={{ fontSize: '0.8rem', color: contrastEnabled ? '#cccccc' : 'var(--text-muted)' }}>Order #10592</span>
            </div>

            {/* Cart Overview */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              background: contrastEnabled ? '#f8fafc' : 'rgba(0,0,0,0.15)', 
              padding: '16px', 
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: contrastEnabled ? '#888888' : 'var(--text-primary)' }}>CXO Pro Workspace Suite</strong>
                <span style={{ fontSize: '0.78rem', color: contrastEnabled ? '#cccccc' : 'var(--text-muted)' }}>Annual Team Plan Subscription</span>
              </div>
              <strong style={{ fontSize: '1.1rem', color: contrastEnabled ? '#666666' : 'var(--text-primary)' }}>
                {couponApplied ? '$119.20' : '$149.00'}
              </strong>
            </div>

            {/* Coupon Box */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              <input 
                type="text" 
                placeholder="Promo Code (SAVE20)" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="input-field"
                style={{ 
                  background: contrastEnabled ? '#ffffff' : 'rgba(0,0,0,0.1)', 
                  color: contrastEnabled ? '#bbbbbb' : 'var(--text-primary)',
                  borderColor: contrastEnabled ? '#e2e8f0' : 'var(--border-color)',
                  borderRadius: '99px',
                  paddingLeft: '20px'
                }}
              />
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleApplyCoupon}
                disabled={isApplying}
                style={{
                  background: contrastEnabled ? '#f8fafc' : 'var(--bg-surface)',
                  color: contrastEnabled ? '#bbbbbb' : 'var(--text-primary)',
                  borderColor: contrastEnabled ? '#e2e8f0' : 'var(--border-color)',
                  borderRadius: '99px'
                }}
              >
                {isApplying ? 'Applying...' : 'Apply'}
              </button>
            </div>

            {/* Checkout Billing Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: contrastEnabled ? '#dddddd' : 'var(--text-secondary)', marginBottom: '6px' }}>
                  Cardholder Name
                </label>
                <input 
                  ref={input1Ref}
                  type="text" 
                  placeholder="Jane Doe" 
                  className="input-field"
                  style={{ 
                    background: contrastEnabled ? '#ffffff' : 'rgba(0,0,0,0.1)', 
                    color: contrastEnabled ? '#bbbbbb' : 'var(--text-primary)',
                    borderColor: contrastEnabled ? '#e2e8f0' : 'var(--border-color)',
                    borderRadius: '12px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: contrastEnabled ? '#dddddd' : 'var(--text-secondary)', marginBottom: '6px' }}>
                  Card Number
                </label>
                <input 
                  ref={input2Ref}
                  type="text" 
                  placeholder="4111 2222 3333 4444" 
                  className="input-field"
                  style={{ 
                    background: contrastEnabled ? '#ffffff' : 'rgba(0,0,0,0.1)', 
                    color: contrastEnabled ? '#bbbbbb' : 'var(--text-primary)',
                    borderColor: contrastEnabled ? '#e2e8f0' : 'var(--border-color)',
                    borderRadius: '12px'
                  }}
                />
              </div>
            </div>

            {/* CLS AD INJECTION ELEMENT */}
            {adVisible && (
              <div 
                id="injected-ad-banner"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  color: '#fff',
                  padding: '18px',
                  borderRadius: '16px',
                  marginBottom: '24px',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 20px rgba(37,99,235,0.2)',
                  cursor: 'pointer',
                  animation: 'float 2.5s ease-in-out infinite'
                }}
              >
                ⚡ ADVERTISEMENT: Get Web Hosting 90% OFF! Click here! ⚡
              </div>
            )}

            {/* Complete Checkout Button */}
            <div ref={checkoutBtnContainerRef}>
              {checkoutComplete ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '16px', 
                  background: 'rgba(34, 197, 94, 0.08)', 
                  border: '1px solid var(--color-success)', 
                  borderRadius: '12px',
                  color: 'var(--color-success)',
                  fontWeight: 700
                }}>
                  ✓ Order Placed Successfully!
                </div>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-primary animate-float" 
                  style={{ width: '100%', padding: '16px', borderRadius: '99px', animationDuration: '6s' }}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Authorizing Payment...' : `Complete Checkout ($${couponApplied ? '119.20' : '149.00'})`}
                </button>
              )}
            </div>
          </div>

          {/* Feedback Console Output */}
          {feedbackMsg && (
            <div style={{ 
              background: misclickTriggered ? 'rgba(239, 68, 68, 0.04)' : 'rgba(37, 99, 235, 0.03)',
              borderLeft: misclickTriggered ? '4px solid var(--color-danger)' : '4px solid var(--color-primary)',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '0.85rem',
              color: misclickTriggered ? 'var(--color-danger)' : 'var(--text-primary)',
              fontFamily: 'monospace',
              lineHeight: '1.5',
              boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
            }}>
              {feedbackMsg}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
