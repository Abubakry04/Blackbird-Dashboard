import { Shield, Lock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-badges">
        <div className="footer-badge">
          <Shield size={12} />
          <span>SSL Secured</span>
        </div>
        <div className="footer-badge">
          <Lock size={12} />
          <span>256-bit Encrypted</span>
        </div>
        <div className="footer-badge">
          <span className="footer-badge-dot"></span>
          <span>Live</span>
        </div>
      </div>
      <p className="footer-copy">
        © 2026 Rebrandly Blackbird. All rights reserved. Trusted Gift Card Redemption Platform.
      </p>
      <p className="footer-legal">
        Rebrandly Blackbird is a registered and legally compliant gift card exchange service operating worldwide.
      </p>
    </footer>
  )
}
