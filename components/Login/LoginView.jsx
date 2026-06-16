import React, { useState } from 'react';
import { Mail, KeyRound, LogIn, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const DUMMY_EMAIL = 'admin@cxo.ux';
  const DUMMY_PASSWORD = 'cxo-admin-2026';

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      if (email.trim().toLowerCase() === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Check the Demo Account card below for access.');
      }
    }, 1000);
  };

  const handleAutofillAndLogin = () => {
    setError('');
    setEmail(DUMMY_EMAIL);
    setPassword(DUMMY_PASSWORD);
    setIsLoading(true);

    // Auto-fill & auto-submit simulation
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="login-view-container">
      {/* Background concentric rings (style from App.css / index.css) */}
      <div className="concentric-rings" style={{ bottom: '-400px', opacity: 0.5 }}></div>
      <div className="concentric-rings-glow" style={{ bottom: '-450px', opacity: 0.45 }}></div>

      <div className="login-card">
        {/* Logo and Brand */}
        <div className="login-logo-container">
          <div className="login-logo">
            <div style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              width: '12px',
              height: '32px',
              borderRadius: '5px',
              marginRight: '2px'
            }} />
            <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>CXO<span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>UX</span></span>
          </div>
          <p className="login-subtitle">Executive Experience & Audit Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="login-form-group">
            <label className="login-label" htmlFor="email-input">
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="email-input"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '44px', borderRadius: '12px' }}
                disabled={isLoading}
              />
              <Mail 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-muted)' 
                }} 
              />
            </div>
          </div>

          <div className="login-form-group">
            <label className="login-label" htmlFor="password-input">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password-input"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '44px', borderRadius: '12px' }}
                disabled={isLoading}
              />
              <KeyRound 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-muted)' 
                }} 
              />
            </div>
          </div>

          {/* Validation Feedback Message */}
          {error && (
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              padding: '12px',
              borderRadius: '10px',
              color: 'var(--color-danger)',
              fontSize: '0.82rem',
              lineHeight: '1.4'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ 
              width: '100%', 
              padding: '14px', 
              borderRadius: '99px', 
              marginTop: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner" style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Authenticating...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In to Platform
              </>
            )}
          </button>
        </form>

        {/* Divider line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flexGrow: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Demo Credentials</span>
          <div style={{ flexGrow: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        {/* Dummy Account card */}
        <div className="demo-creds-card">
          <div className="demo-creds-title">
            <Sparkles size={16} style={{ color: 'var(--color-secondary)' }} />
            <span>Authorized Demo Account Details</span>
          </div>
          
          <div className="demo-creds-row">
            <span className="demo-creds-label">Username:</span>
            <span className="demo-creds-value">{DUMMY_EMAIL}</span>
          </div>
          
          <div className="demo-creds-row" style={{ marginTop: '2px' }}>
            <span className="demo-creds-label">Password:</span>
            <span className="demo-creds-value">{DUMMY_PASSWORD}</span>
          </div>

          <button
            type="button"
            className="btn-autofill"
            onClick={handleAutofillAndLogin}
            disabled={isLoading}
          >
            <Sparkles size={14} />
            Auto-fill & Log In Now
          </button>
        </div>
      </div>

      {/* Embedded CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
