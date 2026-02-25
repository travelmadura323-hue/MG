"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, Send, Search, ChevronDown } from "lucide-react"

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+1", country: "USA / Canada" },
  { code: "+44", country: "United Kingdom" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "Singapore" },
  { code: "+60", country: "Malaysia" },
  { code: "+66", country: "Thailand" },
  { code: "+81", country: "Japan" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+975", country: "Bhutan" },
  { code: "+977", country: "Nepal" },
  { code: "+7", country: "Kazakhstan / Russia" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+974", country: "Qatar" },
  { code: "+968", country: "Oman" },
  { code: "+965", country: "Kuwait" },
  { code: "+27", country: "South Africa" },
  { code: "+20", country: "Egypt" },
  { code: "+52", country: "Mexico" },
  { code: "+998", country: "Uzbekistan" },
  { code: "+994", country: "Azerbaijan" },
]

interface EnquiryModalProps {
  open: boolean
  onClose: () => void
  tourTitle?: string
}

function CountryCodeDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filtered = countryCodes.filter(
    (cc) =>
      cc.country.toLowerCase().includes(search.toLowerCase()) ||
      cc.code.includes(search)
  )

  const selected = countryCodes.find((cc) => cc.code === value)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-[46px] w-[130px] items-center justify-between gap-1 rounded-xl border border-input bg-background px-3 text-sm text-foreground transition-colors hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
      >
        <span className="truncate">
          {selected ? `${selected.code} ${selected.country.split(" ")[0]}` : value}
        </span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-border bg-card shadow-xl">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">No results</p>
            ) : (
              filtered.map((cc) => (
                <button
                  key={cc.code + cc.country}
                  type="button"
                  onClick={() => {
                    onChange(cc.code)
                    setOpen(false)
                    setSearch("")
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-secondary ${
                    value === cc.code ? "bg-secondary font-medium text-accent" : "text-foreground"
                  }`}
                >
                  <span>{cc.country}</span>
                  <span className="text-muted-foreground">{cc.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function EnquiryModal({ open, onClose, tourTitle }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [countryCode, setCountryCode] = useState("+91")
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    setSubmitted(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose()
    }
    if (open) window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, handleClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry form"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm animate-in fade-in duration-300" />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="p-8 text-center md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <Send className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-card-foreground">
              Enquiry Sent!
            </h3>
            <p className="mt-2 text-muted-foreground">
              Thank you for your interest. Our travel expert will get back to you
              within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <h3 className="font-serif text-2xl font-bold text-card-foreground">
              {tourTitle ? `Enquire About: ${tourTitle}` : "Enquire Now"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details below and our travel experts will craft the
              perfect itinerary for you.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="mt-6 flex flex-col gap-4"
            >
              {/* Two columns on desktop */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="mb-1.5 block text-sm font-medium text-card-foreground"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="mb-1.5 block text-sm font-medium text-card-foreground"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              {/* Phone with Country Code */}
              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="mb-1.5 block text-sm font-medium text-card-foreground"
                >
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-2">
                  <CountryCodeDropdown
                    value={countryCode}
                    onChange={setCountryCode}
                  />
                  <input
                    id="enquiry-phone"
                    type="tel"
                    required
                    placeholder="98765 43210"
                    className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              {/* Date of Travel */}
              <div>
                <label
                  htmlFor="enquiry-date"
                  className="mb-1.5 block text-sm font-medium text-card-foreground"
                >
                  Date of Travel <span className="text-destructive">*</span>
                </label>
                <input
                  id="enquiry-date"
                  type="date"
                  required
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="enquiry-message"
                  className="mb-1.5 block text-sm font-medium text-card-foreground"
                >
                  Your Message
                </label>
                <textarea
                  id="enquiry-message"
                  rows={3}
                  placeholder="Tell us about your dream trip..."
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110"
              >
                <Send className="h-4 w-4" />
                Enquire Now
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

// Global context to manage enquiry modal state across components
import { createContext, useContext } from "react"

interface EnquiryContextType {
  openEnquiry: (tourTitle?: string) => void
}

export const EnquiryContext = createContext<EnquiryContextType>({
  openEnquiry: () => {},
})

export function useEnquiry() {
  return useContext(EnquiryContext)
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [tourTitle, setTourTitle] = useState<string | undefined>()

  const openEnquiry = useCallback((title?: string) => {
    setTourTitle(title)
    setOpen(true)
  }, [])

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
        tourTitle={tourTitle}
      />
    </EnquiryContext.Provider>
  )
}
