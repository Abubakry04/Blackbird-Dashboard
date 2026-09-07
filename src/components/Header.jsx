import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Settings, Bell, HelpCircle } from 'lucide-react'

// Blackbird SVG logo — a stylized bird / feather mark in gold
function BlackbirdLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="header-logo-icon">
      <rect width="34" height="34" rx="8" fill="#1a2035"/>
      <path
        d="M8 24 C10 18, 16 12, 26 10 C22 14, 18 16, 17 22"
        stroke="#d4a84b" strokeWidth="2" strokeLinecap="round" fill="none"
      />
      <path
        d="M17 22 C15 20, 12 22, 11 26 C13 24, 16 23, 17 22Z"
        fill="#d4a84b"
      />
      <circle cx="22" cy="12" r="1.5" fill="#d4a84b"/>
    </svg>
  )
}

export default function Header({ onAdminClick, onNotifClick }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/'

  const handleBack = () => {
    if (!isDashboard) {
      navigate('/dashboard')
    }
  }

  // Page titles map
  const pageTitles = {
    '/dashboard': 'Rebrandly Blackbird',
    '/': 'Rebrandly Blackbird',
    '/withdraw-bank': 'Withdraw to Bank',
    '/withdraw-btc': 'Withdraw to Bitcoin',
    '/activate': 'Account Activation',
    '/faq': 'Help & FAQ',
  }

  const title = pageTitles[location.pathname] || 'Rebrandly Blackbird'

  return (
    <header className="site-header">
      <div className="header-left">
        <button
          className="header-back-btn"
          onClick={handleBack}
          style={{ opacity: isDashboard ? 0.35 : 1, cursor: isDashboard ? 'default' : 'pointer' }}
          disabled={isDashboard}
          title={isDashboard ? 'Dashboard' : 'Back to Dashboard'}
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="header-logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <BlackbirdLogo />
          <span className="header-brand">{title}</span>
        </div>
      </div>

      <div className="header-right">
        {onNotifClick && (
          <button className="header-icon-btn" onClick={onNotifClick} title="Notifications" aria-label="Notifications">
            <Bell size={18} />
          </button>
        )}
        {onAdminClick && (
          <button className="header-icon-btn" onClick={onAdminClick} title="Admin Settings" aria-label="Admin Settings">
            <Settings size={18} />
          </button>
        )}
        <button
          className="header-faq-btn"
          onClick={() => navigate('/faq')}
          title="FAQ & Support"
          aria-label="FAQ & Support"
        >
          <HelpCircle size={15} style={{ display: 'inline', marginRight: '4px' }} />
          <span>FAQ</span>
        </button>
      </div>
    </header>
  )
}
