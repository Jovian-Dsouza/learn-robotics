import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Footer } from './Footer'
import { SaveErrorBanner } from './SaveErrorBanner'

export function Shell({ children }: { children: ReactNode }) {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <SaveErrorBanner />
      <main key={location.pathname} className="flex-1 animate-fade-up">
        {children}
      </main>
      <Footer />
    </div>
  )
}
