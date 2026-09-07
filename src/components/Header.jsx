import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Settings, Bell, HelpCircle, Gift } from 'lucide-react'

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
  const isLanding = location.pathname === '/'
  const isDashboard = location.pathname === '/dashboard'

  const handleBack = () => {
    if (isDashboard) {
      navigate('/')
    } else if (!isLanding) {
      navigate('/dashboard')
    }
  }

  const handleLogoClick = () => {
    if (isDashboard) {
      navigate('/')
    } else {
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
          style={{ opacity: isLanding ? 0.35 : 1, cursor: isLanding ? 'default' : 'pointer' }}
          disabled={isLanding}
          title={isDashboard ? 'Back to Landing Page' : 'Back to Dashboard'}
          aria-label={isDashboard ? 'Back to Landing Page' : 'Back to Dashboard'}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="header-logo" onClick={handleLogoClick} title="Rebrandly Blackbird Home" style={{ cursor: 'pointer' }}>
          <BlackbirdLogo />
          <span className="header-brand">{title}</span>
        </div>
      </div>

      <div className="header-right">
        <button
          className="header-faq-btn"
          onClick={() => navigate('/')}
          title="Redeem Gift Card / Landing"
          aria-label="Redeem Gift Card / Landing"
          style={{ background: 'rgba(212, 168, 75, 0.12)', color: 'var(--accent-gold)', borderColor: 'rgba(212, 168, 75, 0.3)' }}
        >
          <Gift size={14} style={{ display: 'inline', marginRight: '4px' }} />
          <span>Redeem Card</span>
        </button>
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
