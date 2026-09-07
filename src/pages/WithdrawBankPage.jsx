import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, CheckCircle2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminModal from '../components/AdminModal'
import NotificationsPanel from '../components/NotificationsPanel'

const NIGERIAN_BANKS = [
  'Access Bank', 'Citibank Nigeria', 'Ecobank Nigeria', 'Fidelity Bank',
  'First Bank of Nigeria', 'First City Monument Bank (FCMB)', 'Globus Bank',
  'Guaranty Trust Bank (GTBank)', 'Heritage Bank', 'Keystone Bank',
  'Optimus Bank', 'Polaris Bank', 'Providus Bank', 'Stanbic IBTC Bank',
  'Standard Chartered Bank', 'Sterling Bank', 'SunTrust Bank', 'Titan Trust Bank',
  'Union Bank of Nigeria', 'United Bank for Africa (UBA)', 'Unity Bank',
  'Wema Bank', 'Zenith Bank', 'Kuda Bank', 'Opay', 'Palmpay', 'Moniepoint',
]

export default function WithdrawBankPage() {
  const navigate = useNavigate()
  const [showAdmin, setShowAdmin] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [form, setForm] = useState({
    accountNumber: '',
    bankName: '',
    accountHolder: '',
    amount: '',
    lastFour: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.accountNumber.trim()) errs.accountNumber = 'Account number is required'
    if (!form.bankName) errs.bankName = 'Please select a bank'
    if (!form.accountHolder.trim()) errs.accountHolder = 'Account holder name is required'
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
            <CreditCard size={28} color="var(--accent-gold)" />
          </div>

          {submitted ? (
            <div className="form-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <CheckCircle2 size={54} color="var(--accent-green)" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Withdrawal Submitted
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
                Your bank withdrawal request has been received and is being processed. Please allow up to 30 minutes.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="btn-gold" onClick={() => navigate('/dashboard')}>
                  Return to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setForm({ accountNumber: '', bankName: '', accountHolder: '', amount: '', lastFour: '' }) }}
                  style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '10px', fontSize: '13px', cursor: 'pointer' }}
                >
                  Make Another Withdrawal
                </button>
              </div>
            </div>
          ) : (
            /* ── Withdrawal Form ── */
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="form-card-title">
                <CreditCard size={20} color="var(--accent-gold)" />
                Withdrawal Details
              </div>

              <div className="form-field">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  className={`form-input ${errors.accountNumber ? 'error' : ''}`}
                  placeholder="Enter 10-digit account number"
                  maxLength={10}
                  value={form.accountNumber}
                  onChange={set('accountNumber')}
                />
                {errors.accountNumber && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.accountNumber}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Name of Bank</label>
                <select
                  className={`form-select ${errors.bankName ? 'error' : ''}`}
                  value={form.bankName}
                  onChange={set('bankName')}
                >
                  <option value="">Select your bank</option>
                  {NIGERIAN_BANKS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.bankName && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.bankName}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Name of Account Holder</label>
                <input
                  type="text"
                  className={`form-input ${errors.accountHolder ? 'error' : ''}`}
                  placeholder="Full name on bank account"
                  value={form.accountHolder}
                  onChange={set('accountHolder')}
                />
                {errors.accountHolder && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.accountHolder}</span>}
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

              <button type="submit" className="btn-gold">
                Confirm Withdrawal
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
