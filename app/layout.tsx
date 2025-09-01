// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export const metadata = {
  title: 'Air Lead',
  description: 'Sistema de leads para climatização',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageSwitcher />   {/* 👈 agora aparece em todas as páginas */}
        {children}
      </body>
    </html>
  )
}
