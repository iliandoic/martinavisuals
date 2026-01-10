import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Martina Visuals',
  description: 'Get in touch for photography inquiries, collaborations, or just to say hello.',
}

export default function ContactPage() {
  return (
    <div className="page-transition min-h-screen bg-black">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Other Ways to Connect</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Email</h3>
              <a href="mailto:hello@martina.com" className="text-gray-400 hover:text-white transition-colors">
                hello@martina.com
              </a>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Instagram</h3>
              <a href="https://instagram.com/martina" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                @martina
              </a>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-gray-400">
                Available Worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-6">
              <h3 className="font-semibold mb-2">What types of photography do you offer?</h3>
              <p className="text-gray-400">I specialize in landscape, portrait, and commercial photography. I&apos;m also available for travel and editorial assignments.</p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <h3 className="font-semibold mb-2">What are your rates?</h3>
              <p className="text-gray-400">Rates vary depending on the project scope, location, and deliverables. Contact me with your project details for a custom quote.</p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <h3 className="font-semibold mb-2">How far in advance should I book?</h3>
              <p className="text-gray-400">I recommend booking at least 2-4 weeks in advance, though I can sometimes accommodate last-minute requests depending on availability.</p>
            </div>
            <div className="pb-6">
              <h3 className="font-semibold mb-2">Do you sell prints?</h3>
              <p className="text-gray-400">Yes! Fine art prints are available in various sizes. Check the gallery and contact me for print inquiries.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
