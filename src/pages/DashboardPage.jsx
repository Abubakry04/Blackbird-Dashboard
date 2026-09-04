import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, Settings, CreditCard, Bitcoin, MessageCircle, Zap,
  ChevronDown, Gift, Clock, ChevronRight
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminModal from '../components/AdminModal'
import NotificationsPanel from '../components/NotificationsPanel'

// ── Collapsible Section ──────────────────────────────────────────────────────
function Collapsible({ icon, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="collapsible">
      <div className="collapsible-header" onClick={() => setOpen(v => !v)}>
        <div className="collapsible-title">
          {icon}
          {title}
        </div>
        <ChevronDown size={16} className={`collapsible-chevron ${open ? 'open' : ''}`} />
      </div>
      <div className={`collapsible-body ${open ? 'open' : ''}`}>
        <div className="collapsible-content">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Dashboard Page ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate()
  const [showAdmin, setShowAdmin] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [message, setMessage] = useState('')
  const [msgSent, setMsgSent] = useState(false)

  const handleSendMessage = () => {
    if (!message.trim()) return
    setMsgSent(true)
    setMessage('')
    setTimeout(() => setMsgSent(false), 3000)
  }

  return (
    <div className="page-wrapper" style={{ position: 'relative' }}>
      <Header
        onAdminClick={() => setShowAdmin(true)}
        onNotifClick={() => setShowNotif(v => !v)}
      />

      {/* Notifications panel */}
      {showNotif && (
        <NotificationsPanel onClose={() => setShowNotif(false)} />
      )}

      <main className="content-area">
        <div className="content-col">

          {/* ── Balance Card ── */}
          <div className="balance-card">
            <div className="balance-card-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span className="balance-label">Total Balance</span>
                  <span className="balance-badge inactive">
                    <span className="dot"></span>
                    Inactive
                  </span>
                </div>
              </div>
              <div className="balance-actions">
                <button className="balance-icon-btn" onClick={() => setShowNotif(v => !v)}>
                  <Bell size={16} />
                </button>
                <button className="balance-icon-btn" onClick={() => setShowAdmin(true)}>
                  <Settings size={16} />
                </button>
              </div>
            </div>

            <div className="balance-amount">
              <span className="currency-sign">$</span>0.00
            </div>
            <div className="balance-currency">USD · US Dollar</div>

            <div className="balance-stats">
              <div>
                <div className="balance-stat-label">User ID</div>
                <div className="balance-stat-value">#91074</div>
              </div>
              <div>
                <div className="balance-stat-label">Transactions</div>
                <div className="balance-stat-value">0</div>
              </div>
              <div>
                <div className="balance-stat-label">Cards Redeemed</div>
                <div className="balance-stat-value">0</div>
              </div>
            </div>
          </div>

          {/* ── Action Buttons Grid ── */}
          <div className="action-grid">
            <button
              className="action-btn bank"
              onClick={() => navigate('/withdraw-bank')}
            >
              <CreditCard size={24} />
              <span className="action-btn-label">Withdraw to Bank</span>
            </button>

            <button
              className="action-btn btc"
              onClick={() => navigate('/withdraw-btc')}
            >
              <Bitcoin size={24} />
              <span className="action-btn-label">Withdraw to BTC</span>
            </button>

            <button
              className="action-btn support"
              onClick={() => navigate('/faq')}
            >
              <MessageCircle size={24} />
              <span className="action-btn-label">Contact Support</span>
            </button>

            <button
              className="action-btn activate"
              onClick={() => navigate('/activate')}
            >
              <Zap size={24} />
              <span className="action-btn-label">Activate</span>
            </button>
          </div>

          {/* ── Send Message to Support ── */}
          <Collapsible
            icon={<MessageCircle size={16} />}
            title="Send Message to Support"
          >
            {msgSent ? (
              <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--accent-green)', fontWeight: 600 }}>
                ✓ Message sent! We'll respond shortly.
              </div>
            ) : (
              <>
                <textarea
                  className="support-textarea"
                  placeholder="Type your message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
                <button className="btn-gold" onClick={handleSendMessage}>
                  Send Message
                </button>
              </>
            )}
          </Collapsible>

          {/* ── Transaction History ── */}
          <Collapsible
            icon={<Clock size={16} />}
            title="Transaction History"
            defaultOpen={true}
          >
            <div className="tx-empty">
              <Gift size={40} className="tx-empty-icon" />
              <div className="tx-empty-text">No transactions yet.</div>
              <div className="tx-empty-sub">Redeem a gift card to get started.</div>
            </div>
          </Collapsible>

          {/* ── FAQ Link ── */}
          <div
            className="collapsible"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/faq')}
          >
            <div className="collapsible-header">
              <div className="collapsible-title">
                <MessageCircle size={16} />
                Frequently Asked Questions
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Admin Modal */}
      {showAdmin && <AdminModal onClose={() => setShowAdmin(false)} />}
    </div>
  )
}
