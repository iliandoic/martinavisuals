import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Martina Visuals | Photography',
  description: 'Stunning photography by Martina capturing moments that matter.',
  keywords: ['photography', 'martina visuals', 'photographer', 'images', 'gallery'],
  openGraph: {
    title: 'Martina Visuals | Photography',
    description: 'Stunning photography by Martina capturing moments that matter.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <Sidebar />
        <main className="lg:ml-64 pt-14 lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  )
}
