'use client'
import { ThemeProvider }       from './ThemeProvider'
import { GoogleAuthProvider }  from './GoogleAuthProvider'
import { StoreProvider }       from './StoreProvider'
import { HydrationGuard }      from './HydrationGuard'
import { ToastProvider }       from './ToastProvider'
import AutoScrollToTop         from '@/components/common/AutoScrollToTop'
import InstallPWAButton        from '@/components/common/InstallPWAButton'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GoogleAuthProvider>
      <ThemeProvider>
        <StoreProvider>
          <AutoScrollToTop />
          <InstallPWAButton />
          <ToastProvider />
          <HydrationGuard>
            {children}
          </HydrationGuard>
        </StoreProvider>
      </ThemeProvider>
    </GoogleAuthProvider>
  )
}
