import type { Metadata } from 'next'
import { Playfair_Display, Inter, Sora } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sora',
})

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
      <body className={`${playfair.variable} ${inter.variable} ${sora.variable} min-h-screen bg-black text-white font-sans`}>
        <Sidebar />
        <main className="lg:ml-64 pt-14 lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  )
}
