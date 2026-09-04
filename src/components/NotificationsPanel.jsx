import { Bell } from 'lucide-react'

export default function NotificationsPanel({ onClose }) {
  return (
    <>
      {/* Click outside to close */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 199 }}
        onClick={onClose}
      />
      <div className="notif-panel">
        <div className="notif-header">
          <Bell size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-gold)' }} />
          Notifications
        </div>
        <div className="notif-empty">
          No new notifications.
        </div>
      </div>
    </>
  )
}
