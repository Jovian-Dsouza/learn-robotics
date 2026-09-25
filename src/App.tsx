import { HashRouter, Route, Routes } from 'react-router-dom'
import { ProgressProvider } from './progress/ProgressProvider'
import { Shell } from './components/layout/Shell'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { MonthPage } from './pages/Month'
import { Directions } from './pages/Directions'
import { Portfolio } from './pages/Portfolio'
import { Outlook } from './pages/Outlook'
import { Resources } from './pages/Resources'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/month/:slug" element={<MonthPage />} />
            <Route path="/directions" element={<Directions />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/outlook" element={<Outlook />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Shell>
      </HashRouter>
    </ProgressProvider>
  )
}
