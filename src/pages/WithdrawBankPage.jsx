import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
    if (!form.accountNumber.trim()) errs.accountNumber = 'Required'
    if (!form.bankName) errs.bankName = 'Required'
    if (!form.accountHolder.trim()) errs.accountHolder = 'Required'
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
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Withdrawal Submitted</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Your withdrawal request has been received and is being processed. Please allow up to 30 minutes.
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
            <CreditCard size={28} color="var(--accent-gold)" />
          </div>

          {/* ── Withdrawal Form ── */}
          <div className="form-card">
            <div className="form-card-title">
              <CreditCard size={20} color="var(--accent-gold)" />
              Withdrawal Details
            </div>

            <div className="form-field">
              <label className="form-label">Account Number</label>
              <input
                type="text"
                className={`form-input ${errors.accountNumber ? 'error' : ''}`}
                placeholder="Enter account number"
                maxLength={10}
                value={form.accountNumber}
                onChange={set('accountNumber')}
              />
              {errors.accountNumber && <span style={{ color: '#ef4444', fontSize: '11px' }}>{errors.accountNumber}</span>}
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
              {errors.bankName && <span style={{ color: '#ef4444', fontSize: '11px' }}>{errors.bankName}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Name of Account Holder</label>
              <input
                type="text"
                className="form-input"
                placeholder="Full name on bank account"
                value={form.accountHolder}
                onChange={set('accountHolder')}
              />
              {errors.accountHolder && <span style={{ color: '#ef4444', fontSize: '11px' }}>{errors.accountHolder}</span>}
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

            <button className="btn-gold" onClick={handleSubmit}>
              Confirm Withdrawal
            </button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
