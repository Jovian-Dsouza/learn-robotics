import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Footer } from './Footer'
import { SaveErrorBanner } from './SaveErrorBanner'
import { CommandPalette } from '@/components/search/CommandPalette'
import { useCommandPalette } from '@/components/search/useCommandPalette'

export function Shell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const palette = useCommandPalette()

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav onOpenSearch={palette.onOpen} />
      <SaveErrorBanner />
      <main key={location.pathname} className="flex-1 animate-fade-up">
        {children}
      </main>
      <Footer />
      <CommandPalette open={palette.open} onClose={palette.onClose} />
    </div>
  )
}
