"use client"

import { useState } from "react"
import { CalendarDays, Users, Send } from "lucide-react"

const countryCodes = [
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
  { code: "+91", label: "IN" },
  { code: "+971", label: "AE" },
  { code: "+61", label: "AU" },
  { code: "+49", label: "DE" },
  { code: "+33", label: "FR" },
  { code: "+81", label: "JP" },
  { code: "+86", label: "CN" },
  { code: "+65", label: "SG" },
]

export function BookingForm({ tourTitle }: { tourTitle?: string }) {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <Send className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">Enquiry Sent!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for your interest. Our travel expert will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
      <h3 className="font-serif text-xl font-bold text-card-foreground">
        {tourTitle ? "Book This Tour" : "Plan Your Trip"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Fill in the details and we&apos;ll get back to you.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
        className="mt-6 flex flex-col gap-4"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-card-foreground">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-card-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-card-foreground">
            Phone Number
          </label>
          <div className="flex gap-2">
            <select
              className="w-24 rounded-xl border border-input bg-background px-3 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
              defaultValue="+1"
            >
              {countryCodes.map((cc) => (
                <option key={cc.code} value={cc.code}>
                  {cc.label} {cc.code}
                </option>
              ))}
            </select>
            <input
              id="phone"
              type="tel"
              required
              placeholder="(555) 123-4567"
              className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        {/* Travel Date */}
        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-card-foreground">
            <CalendarDays className="mr-1 inline h-4 w-4" />
            Travel Date
          </label>
          <input
            id="date"
            type="date"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="adults" className="mb-1.5 block text-sm font-medium text-card-foreground">
              <Users className="mr-1 inline h-4 w-4" />
              Adults
            </label>
            <input
              id="adults"
              type="number"
              min="1"
              defaultValue="2"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div>
            <label htmlFor="children" className="mb-1.5 block text-sm font-medium text-card-foreground">
              Children
            </label>
            <input
              id="children"
              type="number"
              min="0"
              defaultValue="0"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110"
        >
          <Send className="h-4 w-4" />
          Book Now
        </button>
      </form>
    </div>
  )
}
