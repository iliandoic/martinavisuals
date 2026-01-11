import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About / Contact | Martina Visuals',
  description: 'Learn more about Martina and get in touch for photography inquiries.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Profile Image */}
          <div className="relative aspect-[3/4] bg-neutral-900">
            <Image
              src="/images/about.jpg"
              alt="Martina"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-medium mb-6">About</h1>
              <div className="space-y-4 text-neutral-400 text-sm leading-relaxed">
                <p>
                  I'm a photographer based in Sofia/Stara Zagora, dedicated to capturing
                  your best moments in life!
                </p>
                <p>
                  With over a decade of experience, I've worked with clients ranging
                  from independent artists to major publications. My approach combines
                  technical precision with an intuitive understanding of my subjects.
                </p>
                <p>
                  Available for commissions, editorial work, and select personal projects
                  worldwide.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Contact</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <a
                    href="mailto:martinavisuals1@gmail.com"
                    className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    martinavisuals1@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="https://instagram.com/martinavisuals_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @martinavisuals_
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
