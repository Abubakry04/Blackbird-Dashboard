import { useState } from 'react'
import { HelpCircle, ChevronDown, Send } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const FAQS = [
  {
    q: 'How can I contact Blackbird support on Telegram?',
    a: 'You can reach our official 24/7 customer support team on Telegram at @BlackbirdSupport or click the "Join Telegram Support" button on this page to chat directly with an agent.',
  },
  {
    q: 'Why is my withdrawal showing as pending?',
    a: 'Withdrawals typically take up to 30 minutes to process after your wallet is activated. If your withdrawal has been pending for more than 30 minutes, please contact support on Telegram. Note that unactivated wallets will not process any withdrawals.',
  },
  {
    q: 'I have forgotten the last 4 digits of my gift card code.',
    a: 'The last 4 digits of your gift card code are required to verify your identity during withdrawal. Please check the original email or packaging where your gift card was delivered. If you are unable to locate it, contact our Telegram support team.',
  },
  {
    q: 'How do I activate my Blackbird account?',
    a: 'To activate your account, click the "Activate" button on the dashboard. You will be guided through a 3-step process: review the activation fee (₦15,450 one-time), make the bank transfer, and submit your payment reference. Activation is instant after confirmation.',
  },
  {
    q: 'How long do I need to wait before my withdrawal reflects in my account?',
    a: 'Once your wallet is activated and a withdrawal is submitted, processing takes up to 30 minutes. Bank transfers may take an additional 1–5 business hours depending on your bank. Bitcoin withdrawals are usually confirmed on-chain within 30–60 minutes.',
  },
  {
    q: 'Trust Centre — Is Blackbird a legitimate platform?',
    a: 'Yes. Rebrandly Blackbird is a registered and legally compliant gift card exchange service operating worldwide. We use 256-bit SSL encryption to protect all transactions. Our platform has processed thousands of redemptions securely. All payments are verified before release.',
  },
  {
    q: 'My gift card code is showing as invalid. What should I do?',
    a: 'Please double-check the card code you entered — ensure there are no spaces or typos. If the card has already been redeemed or has expired, it will show as invalid. For further assistance, contact our support team on Telegram with a photo of your gift card.',
  },
  {
    q: 'What gift card brands does Blackbird accept?',
    a: 'Rebrandly Blackbird accepts a wide range of popular gift card brands including Amazon, iTunes, Google Play, Steam, Xbox, Razer Gold, Sephora, Walmart, and many more. Check the dashboard for a full list of accepted cards and current exchange rates.',
  },
]

function FaqItem({ num, question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setOpen(v => !v)}>
        <span className="faq-num">{String(num).padStart(2, '0')}</span>
        <span className="faq-question-text">{question}</span>
        <ChevronDown size={16} className={`faq-chevron ${open ? 'open' : ''}`} />
      </div>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <div className="faq-answer-content">{answer}</div>
      </div>
    </div>
  )
}

export default function FaqPage() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="content-area">
        <div className="content-col">

          {/* Help Centre Header */}
          <div className="faq-header" style={{ marginBottom: '12px' }}>
            <div className="faq-icon-wrap">
              <HelpCircle size={24} color="var(--accent-gold)" />
            </div>
            <div>
              <div className="faq-header-title">Help Centre</div>
              <div className="faq-header-sub">Find answers to common questions below or contact us directly on Telegram.</div>
            </div>
          </div>

          {/* Telegram Support Card */}
          <div className="telegram-support-card">
            <div className="telegram-info">
              <div className="telegram-icon-wrap">
                <Send size={22} color="#0088cc" />
              </div>
              <div>
                <div className="telegram-title">24/7 Telegram Support</div>
                <div className="telegram-sub">Need instant support with your account or withdrawals? Chat with our team on Telegram.</div>
              </div>
            </div>
            <a
              href="https://t.me/BlackbirdSupport"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-btn"
            >
              <Send size={15} />
              <span>Join Telegram Support</span>
            </a>
          </div>

          {/* FAQ Accordion */}
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} num={i + 1} question={faq.q} answer={faq.a} />
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

