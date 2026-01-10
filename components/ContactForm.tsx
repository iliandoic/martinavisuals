'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // Using Web3Forms - replace YOUR_ACCESS_KEY with your actual key
      // Get your free key at https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY', // Replace with your Web3Forms access key
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error(result.message || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-900/20 border border-green-500/30 p-8 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-gray-400 mb-6">
          Thank you for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-white underline underline-offset-4 hover:text-gray-300"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="bg-red-900/20 border border-red-500/30 p-4 text-red-400">
          {errorMessage || 'Failed to send message. Please try again.'}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-white/30 focus:outline-none transition-colors resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        I typically respond within 24-48 hours.
      </p>
    </form>
  )
}
