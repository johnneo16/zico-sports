import { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, Phone, HelpCircle } from 'lucide-react';
import Logo from './Logo';
import './AdminLogin.css';

const ADMIN_HASH = 'JeetKZics@2026';

/**
 * Admin login gate — password required before accessing admin panel.
 */
export default function AdminLogin({ onSuccess, onBack }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_HASH) {
      sessionStorage.setItem('zico_admin', 'true');
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (showForgot) {
    return (
      <div className="admin-login">
        <div className="admin-login__card animate-scale-in">
          <button className="admin-login__back" onClick={() => setShowForgot(false)}>
            <ArrowLeft size={16} /> Back to login
          </button>

          <div className="admin-login__forgot">
            <HelpCircle size={40} className="admin-login__forgot-icon" />
            <h2 className="admin-login__forgot-title">Forgot Password?</h2>
            <p className="admin-login__forgot-text">
              Contact the store owner to reset your admin password.
            </p>
            <div className="admin-login__forgot-contact">
              <Phone size={16} />
              <div>
                <div className="admin-login__forgot-label">CALL OR WHATSAPP</div>
                <div className="admin-login__forgot-number">+91 7987461287</div>
              </div>
            </div>
            <p className="admin-login__forgot-hint">
              Only authorized personnel can access the admin panel.
              Contact the store owner for credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card animate-scale-in">
        <Logo size={70} className="admin-login__logo" />
        <h2 className="admin-login__title">Admin Access</h2>
        <p className="admin-login__subtitle">
          Enter your password to manage products and settings.
        </p>

        <form onSubmit={handleLogin} className="admin-login__form">
          <div className="admin-login__field">
            <Lock size={16} className="admin-login__field-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="admin-login__input"
              autoFocus
            />
            <button
              type="button"
              className="admin-login__toggle-pw"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="admin-login__error">{error}</div>
          )}

          <button type="submit" className="admin-login__submit">
            <Lock size={14} />
            ACCESS ADMIN PANEL
          </button>
        </form>

        <button className="admin-login__forgot-link" onClick={() => setShowForgot(true)}>
          Forgot password?
        </button>

        <button className="admin-login__back-store" onClick={onBack}>
          <ArrowLeft size={14} /> Back to Store
        </button>
      </div>
    </div>
  );
}
