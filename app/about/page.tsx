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
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800"
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
                  Martina is a photographer based in [City], specializing in portraits
                  and documentary photography. Her work explores the intersection of
                  light, emotion, and human connection.
                </p>
                <p>
                  With over a decade of experience, she has worked with clients ranging
                  from independent artists to major publications. Her approach combines
                  technical precision with an intuitive understanding of her subjects.
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
                    href="mailto:hello@martinavisuals.com"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    hello@martinavisuals.com
                  </a>
                </p>
                <p>
                  <a
                    href="https://instagram.com/martinavisuals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    @martinavisuals
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Selected Clients</h2>
              <p className="text-neutral-500 text-sm">
                Vogue, The New York Times, Nike, Apple, Condé Nast
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
