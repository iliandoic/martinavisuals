import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Martina Visuals',
  description: 'Learn more about Martina, a passionate photographer specializing in landscapes and portraits.',
}

export default function AboutPage() {
  return (
    <div className="page-transition min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800"
                alt="Martina - Photographer"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Bio */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Hi, I&apos;m Martina</h1>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I&apos;m a passionate photographer with a love for capturing the beauty in
                  everyday moments. Whether it&apos;s the golden light of a sunset over mountain
                  peaks or the genuine emotion in a portrait session, I strive to create images
                  that tell compelling stories.
                </p>
                <p>
                  My journey in photography began over a decade ago when I first picked up my
                  father&apos;s old film camera. Since then, I&apos;ve traveled to countless
                  locations, worked with amazing clients, and never stopped learning and growing
                  as an artist.
                </p>
                <p>
                  Based in [Your City], I&apos;m available for projects worldwide. I specialize
                  in landscape photography, portrait sessions, and commercial work.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact/"
                  className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">My Philosophy</h2>
          <blockquote className="text-2xl md:text-3xl text-gray-300 font-light italic leading-relaxed">
            &ldquo;Photography is the story I fail to put into words.&rdquo;
          </blockquote>
          <p className="mt-8 text-gray-400 max-w-2xl mx-auto">
            I believe every photograph should evoke emotion and transport the viewer to that
            exact moment in time. My goal is to create timeless images that you&apos;ll treasure
            for years to come.
          </p>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">My Gear</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Cameras</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Sony A7R V</li>
                <li>Sony A7 IV (backup)</li>
                <li>DJI Mavic 3 Pro (drone)</li>
              </ul>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Lenses</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Sony 24-70mm f/2.8 GM II</li>
                <li>Sony 70-200mm f/2.8 GM II</li>
                <li>Sony 14mm f/1.8 GM</li>
                <li>Sony 85mm f/1.4 GM</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Landscape</h3>
              <p className="text-gray-400">Fine art prints and commissioned landscape photography for homes and offices.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Portraits</h3>
              <p className="text-gray-400">Professional headshots, personal branding, and creative portrait sessions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Commercial</h3>
              <p className="text-gray-400">Brand photography, product shots, and commercial campaigns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Beautiful?</h2>
          <p className="text-gray-400 mb-8">
            Let&apos;s discuss your vision and bring it to life.
          </p>
          <Link
            href="/contact/"
            className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  )
}
