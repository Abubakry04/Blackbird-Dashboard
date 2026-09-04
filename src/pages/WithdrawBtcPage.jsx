import { useState } from 'react'
import { Bitcoin, AlertTriangle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function WithdrawBtcPage() {
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
    if (!form.walletAddress.trim()) errs.walletAddress = 'Required'
    if (!form.amount.trim()) errs.amount = 'Required'
    if (!form.lastFour.trim()) errs.lastFour = 'Required'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="content-area">
          <div className="content-col">
            <div className="form-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>₿</div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-btc)' }}>
                BTC Withdrawal Submitted
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Your Bitcoin withdrawal request has been received. Please allow up to 30 minutes for processing.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <Header />
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

          {/* ── Bitcoin Withdrawal Form ── */}
          <div className="form-card">
            <div className="form-card-title" style={{ color: 'var(--accent-btc)' }}>
              <Bitcoin size={20} color="var(--accent-btc)" />
              Bitcoin Withdrawal
            </div>

            <div className="form-field">
              <label className="form-label">BTC Wallet Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your BTC wallet address"
                value={form.walletAddress}
                onChange={set('walletAddress')}
              />
              {errors.walletAddress && <span style={{ color: '#ef4444', fontSize: '11px' }}>{errors.walletAddress}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Amount to Withdraw (USD)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Max: $0.00"
                min="0"
                value={form.amount}
                onChange={set('amount')}
              />
              {errors.amount && <span style={{ color: '#ef4444', fontSize: '11px' }}>{errors.amount}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Last 4 Digits of Gift Card Code</label>
              <input
                type="text"
                className="form-input code-input"
                placeholder="E.G.  GXR3"
                maxLength={4}
                value={form.lastFour}
                onChange={set('lastFour')}
              />
              {errors.lastFour && <span style={{ color: '#ef4444', fontSize: '11px' }}>{errors.lastFour}</span>}
            </div>

            {/* Warning banner */}
            <div className="warning-banner">
              <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: '1px', color: 'var(--accent-btc)' }} />
              Ensure your BTC wallet address is correct. Bitcoin transactions are irreversible.
            </div>

            <button className="btn-btc" onClick={handleSubmit}>
              <Bitcoin size={18} />
              Confirm BTC Withdrawal
            </button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
