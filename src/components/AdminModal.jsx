import { useState } from 'react'
import { Settings, X, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react'

export default function AdminModal({ onClose }) {
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [error, setError] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Demo Admin Settings State
  const [adminConfig, setAdminConfig] = useState({
    walletStatus: 'Inactive',
    balanceUSD: '0.00',
    activationFee: '85',
  })

  const handleAuth = () => {
    if (!code.trim()) {
      setError('Please enter access code.')
      return
    }
    // Accept code '1234' or 'admin' or any demo code
    if (code.trim().toLowerCase() === '1234' || code.trim().toLowerCase() === 'admin' || code.trim().length >= 4) {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Invalid access code. Try code "1234" or "admin"')
    }
  }

  const handleSaveConfig = () => {
    setSavedSuccess(true)
    setTimeout(() => {
      setSavedSuccess(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Settings size={20} color="var(--accent-gold)" />
            <span>Admin Control Panel</span>
          </div>
          <button className="modal-close" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        {!authenticated ? (
          <>
            <p className="modal-subtitle">Enter admin access code to manage dashboard settings.</p>

            <div className="modal-input-wrap">
              <input
                type={showCode ? 'text' : 'password'}
                className="modal-input"
                placeholder="Access code (e.g. 1234 or admin)"
                value={code}
                onChange={e => { setCode(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleAuth()}
                autoFocus
              />
              <button
                className="modal-eye-btn"
                onClick={() => setShowCode(v => !v)}
                type="button"
              >
                {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p style={{ fontSize: '12px', color: '#ef4444', marginBottom: '12px', marginTop: '-4px' }}>
                {error}
              </p>
            )}

            <button className="btn-gold" onClick={handleAuth}>
              <ShieldCheck size={18} />
              Authenticate
            </button>
          </>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: 600, fontSize: '13px', marginBottom: '16px' }}>
              <ShieldCheck size={16} />
              <span>Admin Access Granted</span>
            </div>

            {savedSuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--accent-green)', fontWeight: 700 }}>
                <Check size={32} style={{ margin: '0 auto 8px', display: 'block' }} />
                Settings Saved Successfully!
              </div>
            ) : (
              <>
                <div className="form-field">
                  <label className="form-label">Wallet Status</label>
                  <select
                    className="form-select"
                    value={adminConfig.walletStatus}
                    onChange={e => setAdminConfig(c => ({ ...c, walletStatus: e.target.value }))}
                  >
                    <option value="Inactive">Inactive (Requires Fee)</option>
                    <option value="Active">Active (Withdrawals Enabled)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Total Balance ($ USD)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={adminConfig.balanceUSD}
                    onChange={e => setAdminConfig(c => ({ ...c, balanceUSD: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Activation Fee ($ USD)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={adminConfig.activationFee}
                    onChange={e => setAdminConfig(c => ({ ...c, activationFee: e.target.value }))}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button className="btn-gold" onClick={handleSaveConfig} style={{ flex: 1 }}>
                    Save Changes
                  </button>
                  <button
                    onClick={onClose}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'var(--text-primary)',
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-lg)',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
