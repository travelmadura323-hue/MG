import type { Metadata } from "next"
import { Handshake, DollarSign, Headphones, Globe } from "lucide-react"
import { BookingForm } from "@/components/booking-form"

export const metadata: Metadata = {
  title: "Become a Sub Agent | Wanderlux Travel",
  description: "Partner with Wanderlux Travel and grow your travel business with our sub-agent program.",
}

const benefits = [
  { icon: DollarSign, title: "Competitive Commissions", description: "Earn attractive commissions on every booking made through our partnership program." },
  { icon: Globe, title: "Global Network", description: "Access our extensive portfolio of 500+ tour packages across 50+ destinations." },
  { icon: Headphones, title: "Dedicated Support", description: "Get a dedicated partner manager and 24/7 booking support for your clients." },
  { icon: Handshake, title: "Co-Branded Materials", description: "Receive marketing materials and co-branded content to grow your business." },
]

export default function SubAgentPage() {
  return (
    <div className="pt-28">
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Partnership</span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Become a Sub Agent</h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Join our global network of travel partners and unlock exclusive benefits to grow your business.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 text-center">
              <b.icon className="mx-auto h-10 w-10 text-accent" />
              <h3 className="mt-4 font-semibold text-card-foreground">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 mx-auto max-w-lg">
          <h2 className="text-center font-serif text-2xl font-bold text-foreground">Apply to Partner with Us</h2>
          <div className="mt-8">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
