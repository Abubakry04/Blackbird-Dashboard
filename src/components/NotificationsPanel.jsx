import { useState } from 'react'
import { Bell, X, CheckCheck, Info } from 'lucide-react'

const INITIAL_NOTIFS = [
  { id: 1, title: 'Welcome to Blackbird', msg: 'Your account #91074 is created. Activate your wallet to start withdrawals.', time: 'Just now', unread: true },
  { id: 2, title: 'Telegram Support Live', msg: 'Need instant help? Connect with @Blackbird978 on Telegram 24/7.', time: '2h ago', unread: true }
]

export default function NotificationsPanel({ onClose }) {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS)

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const clearAll = () => {
    setNotifs([])
  }

  return (
    <>
      {/* Click outside backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 199 }}
        onClick={onClose}
      />
      <div className="notif-panel">
        <div className="notif-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={16} color="var(--accent-gold)" />
            <span>Notifications</span>
            {notifs.some(n => n.unread) && (
              <span className="notif-badge-count">{notifs.filter(n => n.unread).length}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {notifs.length > 0 && (
              <button className="notif-action-btn" onClick={markAllRead} title="Mark all as read">
                <CheckCheck size={14} />
              </button>
            )}
            <button className="notif-action-btn" onClick={onClose} title="Close">
              <X size={16} />
            </button>
          </div>
        </div>

        {notifs.length === 0 ? (
          <div className="notif-empty">
            <Bell size={24} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
            <div>No new notifications.</div>
          </div>
        ) : (
          <div className="notif-list">
            {notifs.map(n => (
              <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                <Info size={16} className="notif-item-icon" />
                <div style={{ flex: 1 }}>
                  <div className="notif-item-title">{n.title}</div>
                  <div className="notif-item-msg">{n.msg}</div>
                  <div className="notif-item-time">{n.time}</div>
                </div>
              </div>
            ))}
            <div className="notif-footer">
              <button className="notif-clear-btn" onClick={clearAll}>Clear All</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
