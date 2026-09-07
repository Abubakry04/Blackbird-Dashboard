import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CreditCard, Shield, CheckCircle2, Lock, Award, Globe, Star, ArrowRight, Gift
} from 'lucide-react'
import Footer from '../components/Footer'

// Blackbird Logo with gold circle border and LIVE badge attached
function LandingLogo() {
  return (
    <div className="landing-logo-wrapper">
      <div className="landing-logo-circle">
        <svg width="44" height="44" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 24 C10 18, 16 12, 26 10 C22 14, 18 16, 17 22"
            stroke="#e0c068" strokeWidth="2.2" strokeLinecap="round" fill="none"
          />
          <path
            d="M17 22 C15 20, 12 22, 11 26 C13 24, 16 23, 17 22Z"
            fill="#e0c068"
          />
          <circle cx="22" cy="12" r="1.5" fill="#e0c068"/>
        </svg>
      </div>
      <div className="landing-live-badge">
        <span className="live-dot"></span>
        <span>LIVE</span>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [cardCode, setCardCode] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [redeemError, setRedeemError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRedeem = (e) => {
    e.preventDefault()
    if (!cardCode.trim()) {
      setRedeemError('Please enter your gift card code')
      return
    }
    setRedeemError('')
    setIsSubmitting(true)

    // Simulate redemption check and transition to dashboard
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="page-wrapper landing-bg">
      <main className="content-area landing-content">
        <div className="content-col landing-col">

          {/* Hero Section */}
          <div className="landing-hero">
            <LandingLogo />

            <h1 className="landing-title">
              Rebrandly <span className="gold-text">Blackbird</span>
            </h1>

            <p className="landing-subtitle">
              Your globally trusted gift card redemption platform. Fast, secure, and reliable.
            </p>

            {/* Pill Badges */}
            <div className="landing-pills">
              <div className="landing-pill">
                <Shield size={13} className="pill-icon" />
                <span>SSL Secured</span>
              </div>
              <div className="landing-pill">
                <Shield size={13} className="pill-icon" />
                <span>Verified</span>
              </div>
              <div className="landing-pill">
                <Shield size={13} className="pill-icon" />
                <span>Worldwide</span>
              </div>
              <div className="landing-pill">
                <Shield size={13} className="pill-icon" />
                <span>Instant</span>
              </div>
            </div>
          </div>

          {/* Redeem Gift Card Container */}
          <form className="landing-card" onSubmit={handleRedeem}>
            <div className="landing-card-header">
              <CreditCard size={20} color="var(--accent-gold)" />
              <h2>Redeem Gift Card</h2>
            </div>

            <div className="form-field">
              <label className="form-label uppercase-label">GIFT CARD CODE</label>
              <input
                type="text"
                className={`form-input landing-input ${redeemError ? 'error' : ''}`}
                placeholder="Enter your gift card code"
                value={cardCode}
                onChange={e => { setCardCode(e.target.value); setRedeemError('') }}
              />
              {redeemError && <span className="input-error-msg">{redeemError}</span>}
            </div>

            <div className="form-field">
              <label className="form-label uppercase-label">SELECT CURRENCY</label>
              <select
                className="form-select landing-select"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                <option value="USD">$ USD — United States</option>
                <option value="EUR">€ EUR — Euro</option>
                <option value="GBP">£ GBP — United Kingdom</option>
                <option value="CAD">$ CAD — Canada</option>
                <option value="AUD">$ AUD — Australia</option>
              </select>
            </div>

            <button type="submit" className="btn-gold landing-cta-btn" disabled={isSubmitting}>
              <Gift size={18} />
              <span>{isSubmitting ? 'Validating Card...' : 'Redeem Gift Card'}</span>
            </button>
          </form>

          {/* Proceed To Dashboard Secondary Button */}
          <button
            type="button"
            className="landing-secondary-btn"
            onClick={() => navigate('/dashboard')}
          >
            <span>Proceed To Dashboard</span>
            <ArrowRight size={18} />
          </button>

          {/* User ID */}
          <div className="landing-user-id">
            User ID: <span>#39067</span>
          </div>

          {/* TRUSTED & VERIFIED Grid Section */}
          <div className="landing-features-section">
            <div className="landing-features-header">
              TRUSTED &amp; VERIFIED
            </div>

            <div className="landing-features-grid">
              {/* Card 1 */}
              <div className="feature-grid-card">
                <div className="feature-icon-wrap">
                  <Shield size={22} color="var(--accent-gold)" />
                </div>
                <div className="feature-card-title">SSL Secured</div>
                <div className="feature-card-sub">256-bit encryption</div>
              </div>

              {/* Card 2 */}
              <div className="feature-grid-card">
                <div className="feature-icon-wrap">
                  <CheckCircle2 size={22} color="var(--accent-gold)" />
                </div>
                <div className="feature-card-title">Verified Platform</div>
                <div className="feature-card-sub">Globally certified</div>
              </div>

              {/* Card 3 */}
              <div className="feature-grid-card">
                <div className="feature-icon-wrap">
                  <Lock size={22} color="var(--accent-gold)" />
                </div>
                <div className="feature-card-title">Secure Payments</div>
                <div className="feature-card-sub">Bank-grade security</div>
              </div>

              {/* Card 4 */}
              <div className="feature-grid-card">
                <div className="feature-icon-wrap">
                  <Award size={22} color="var(--accent-gold)" />
                </div>
                <div className="feature-card-title">100% Trusted</div>
                <div className="feature-card-sub">Since 2019</div>
              </div>

              {/* Card 5 */}
              <div className="feature-grid-card">
                <div className="feature-icon-wrap">
                  <Globe size={22} color="var(--accent-gold)" />
                </div>
                <div className="feature-card-title">Worldwide</div>
                <div className="feature-card-sub">190+ countries</div>
              </div>

              {/* Card 6 */}
              <div className="feature-grid-card">
                <div className="feature-icon-wrap">
                  <Star size={22} color="var(--accent-gold)" />
                </div>
                <div className="feature-card-title">Top Rated</div>
                <div className="feature-card-sub">4.9/5 stars</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
