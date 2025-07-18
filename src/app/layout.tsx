import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Natural State Sheds - Portable Buildings & Sheds in Arkansas',
  description: 'Find quality portable buildings, sheds, cabins, barns, and tiny houses throughout Arkansas. Local dealers serving all major cities with expert service and competitive prices.',
  keywords: 'sheds, portable buildings, Arkansas, cabins, barns, tiny houses, storage buildings, outdoor buildings',
  openGraph: {
    title: 'Natural State Sheds - Portable Buildings & Sheds in Arkansas',
    description: 'Find quality portable buildings, sheds, cabins, barns, and tiny houses throughout Arkansas.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-cream">
          {children}
        </div>
      </body>
    </html>
  )
}
