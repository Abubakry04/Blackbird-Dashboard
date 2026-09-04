import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import WithdrawBankPage from './pages/WithdrawBankPage'
import WithdrawBtcPage from './pages/WithdrawBtcPage'
import ActivatePage from './pages/ActivatePage'
import FaqPage from './pages/FaqPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/withdraw-bank" element={<WithdrawBankPage />} />
        <Route path="/withdraw-btc" element={<WithdrawBtcPage />} />
        <Route path="/activate" element={<ActivatePage />} />
        <Route path="/faq" element={<FaqPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
