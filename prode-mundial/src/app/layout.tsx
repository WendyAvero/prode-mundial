import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Prode Mundial 2026',
  description: 'Prode interno del Mundial FIFA 2026',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
