import Link from 'next/link'
import Image from 'next/image'
import { featuredPhotos } from '@/lib/images'

export default function HomePage() {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Capturing Moments
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            A visual journey through landscapes, portraits, and stories worth telling
          </p>
          <Link
            href="/gallery/"
            className="inline-block px-8 py-4 bg-white text-black font-medium rounded-none hover:bg-gray-200 transition-colors"
          >
            View Gallery
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A curated selection of my favorite captures from recent projects
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPhotos.map((photo, index) => (
              <Link
                key={index}
                href="/gallery/"
                className="group relative aspect-[4/3] overflow-hidden bg-gray-900"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                {photo.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-medium">{photo.title}</h3>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/gallery/"
              className="inline-block px-8 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              View All Photos
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Photographer</h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            With a passion for capturing the extraordinary in the ordinary, I specialize in
            landscape and portrait photography. Every image tells a story, and I&apos;m here to
            help tell yours.
          </p>
          <Link
            href="/about/"
            className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors"
          >
            Learn more about me &rarr;
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s Work Together</h2>
          <p className="text-lg text-gray-400 mb-8">
            Have a project in mind? I&apos;d love to hear from you.
          </p>
          <Link
            href="/contact/"
            className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
