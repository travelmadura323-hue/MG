"use client"

import { useState } from "react"
import { Send } from "lucide-react"

/**
 * ContactForm component for collecting user messages and inquiries.
 * 
 * Displays a contact form with fields for name, email, phone, and message.
 * Upon submission, shows a success message confirming the message was sent.
 * 
 * @component
 * @returns {JSX.Element} A contact form component with submission handling and success state display.
 * 
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 * 
 * @remarks
 * - Form validation requires name, email, and message fields
 * - Phone field is optional
 * - Upon submission, displays a success message indicating a 24-hour response time
 * - Uses Tailwind CSS for styling with custom design system tokens (border, card, accent colors)
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <Send className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">Message Sent!</h3>
        <p className="mt-2 text-sm text-muted-foreground">Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <h3 className="font-serif text-2xl font-bold text-card-foreground">Send Us a Message</h3>
      <p className="mt-1 text-sm text-muted-foreground">We&apos;d love to hear from you.</p>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="mt-6 flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-card-foreground">Name</label>
            <input id="name" type="text" required placeholder="Your name"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
          <div>
            <label htmlFor="cemail" className="mb-1.5 block text-sm font-medium text-card-foreground">Email</label>
            <input id="cemail" type="email" required placeholder="your@email.com"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
        </div>
        <div>
          <label htmlFor="cphone" className="mb-1.5 block text-sm font-medium text-card-foreground">Phone</label>
          <input id="cphone" type="tel" placeholder="+1 (555) 123-4567"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-card-foreground">Message</label>
          <textarea id="message" rows={5} required placeholder="Tell us about your travel plans..."
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
        </div>
        <button type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Send className="h-4 w-4" /> Send Message
        </button>
      </form>
    </div>
  )
}
