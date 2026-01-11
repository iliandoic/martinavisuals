import type { Metadata } from 'next'
import { Playfair_Display, Inter, DM_Sans, Cinzel } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import ScrollProgress from '@/components/ScrollProgress'
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

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'Martina Visuals | Photography',
  description: 'Stunning photography by Martina capturing moments that matter.',
  keywords: ['photography', 'martina visuals', 'photographer', 'images', 'gallery'],
  metadataBase: new URL('https://martinavisuals.com'),
  openGraph: {
    title: 'Martina Visuals | Photography',
    description: 'Stunning photography by Martina capturing moments that matter.',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${dmSans.variable} ${cinzel.variable} min-h-screen bg-black text-white font-sans`}>
        <ScrollProgress />
        <Sidebar />
        <main className="lg:ml-64 pt-14 lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  )
}
