import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Providers from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Test Vibes - Productos',
  description: 'Catálogo de productos con Fluent UI',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
