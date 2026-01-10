import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
