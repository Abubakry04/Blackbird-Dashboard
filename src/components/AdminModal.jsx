import { useState } from 'react'
import { Settings, X, Eye, EyeOff } from 'lucide-react'

export default function AdminModal({ onClose }) {
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [error, setError] = useState('')

  const handleAuth = () => {
    if (!code.trim()) {
      setError('Please enter the access code.')
      return
    }
    // In a real app, validate the code against an API
    setError('Invalid access code. Please try again.')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Settings size={20} color="var(--accent-gold)" />
            Admin Panel
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className="modal-subtitle">Enter admin access code to continue.</p>

        <div className="modal-input-wrap">
          <input
            type={showCode ? 'text' : 'password'}
            className="modal-input"
            placeholder="Access code"
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
          Authenticate
        </button>
      </div>
    </div>
  )
}
