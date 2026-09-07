import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bitcoin, AlertTriangle, CheckCircle2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminModal from '../components/AdminModal'
import NotificationsPanel from '../components/NotificationsPanel'

export default function WithdrawBtcPage() {
  const navigate = useNavigate()
  const [showAdmin, setShowAdmin] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [form, setForm] = useState({
    walletAddress: '',
    amount: '',
    lastFour: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.walletAddress.trim()) errs.walletAddress = 'BTC wallet address is required'
    if (!form.amount.trim()) errs.amount = 'Amount is required'
    if (!form.lastFour.trim()) errs.lastFour = 'Last 4 digits are required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <div className="page-wrapper" style={{ position: 'relative' }}>
      <Header
        onAdminClick={() => setShowAdmin(true)}
        onNotifClick={() => setShowNotif(v => !v)}
      />

      {showNotif && <NotificationsPanel onClose={() => setShowNotif(false)} />}

      <main className="content-area">
        <div className="content-col">

          {/* ── Available Balance ── */}
          <div className="avail-balance-card">
            <div className="avail-balance-inner">
              <div className="avail-balance-label">Available Balance</div>
              <div className="avail-balance-amount">$0.00</div>
            </div>
            <Bitcoin size={28} color="var(--accent-btc)" />
          </div>

          {submitted ? (
            <div className="form-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <CheckCircle2 size={54} color="var(--accent-btc)" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-btc)' }}>
                BTC Withdrawal Submitted
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
                Your Bitcoin withdrawal request has been received. Please allow up to 30 minutes for processing.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="btn-btc" onClick={() => navigate('/dashboard')}>
                  Return to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setForm({ walletAddress: '', amount: '', lastFour: '' }) }}
                  style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '10px', fontSize: '13px', cursor: 'pointer' }}
                >
                  Make Another Withdrawal
                </button>
              </div>
            </div>
          ) : (
            /* ── Bitcoin Withdrawal Form ── */
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="form-card-title" style={{ color: 'var(--accent-btc)' }}>
                <Bitcoin size={20} color="var(--accent-btc)" />
                Bitcoin Withdrawal
              </div>

              <div className="form-field">
                <label className="form-label">BTC Wallet Address</label>
                <input
                  type="text"
                  className={`form-input ${errors.walletAddress ? 'error' : ''}`}
                  placeholder="Enter your BTC wallet address"
                  value={form.walletAddress}
                  onChange={set('walletAddress')}
                />
                {errors.walletAddress && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.walletAddress}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Amount to Withdraw (USD)</label>
                <input
                  type="number"
                  className={`form-input ${errors.amount ? 'error' : ''}`}
                  placeholder="e.g. 50.00"
                  min="0"
                  value={form.amount}
                  onChange={set('amount')}
                />
                {errors.amount && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.amount}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Last 4 Digits of Gift Card Code</label>
                <input
                  type="text"
                  className={`form-input code-input ${errors.lastFour ? 'error' : ''}`}
                  placeholder="E.G. GXR3"
                  maxLength={4}
                  value={form.lastFour}
                  onChange={set('lastFour')}
                />
                {errors.lastFour && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.lastFour}</span>}
              </div>

              {/* Warning banner */}
              <div className="warning-banner">
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '1px', color: 'var(--accent-btc)' }} />
                <span>Ensure your BTC wallet address is correct. Bitcoin transactions are irreversible.</span>
              </div>

              <button type="submit" className="btn-btc">
                <Bitcoin size={18} />
                Confirm BTC Withdrawal
              </button>
            </form>
          )}

        </div>
      </main>
      <Footer />

      {showAdmin && <AdminModal onClose={() => setShowAdmin(false)} />}
    </div>
  )
}
