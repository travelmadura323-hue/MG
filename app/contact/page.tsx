import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Madura Global",
  description: "Get in touch with our travel experts. We're here to help plan your perfect journey.",
}

const contactInfo = [
  { icon: MapPin, title: "Our Office", details: ["1-11 Rosa Crescent Castle Hill 2154 NSW,Australia"] },
  { icon: Phone, title: "Phone", details: ["+61 434 500 743"] },
  { icon: Mail, title: "Email", details: ["guru@maduraglobal.com"] },
  // { icon: Clock, title: "Business Hours", details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"] },
]

export default function ContactPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Get in Touch</span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Have a question or ready to plan your next adventure? Our travel experts are
            here to help create your perfect journey.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Contact Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info) => (
            <div key={info.title} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                <info.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold text-card-foreground">{info.title}</h3>
              {info.details.map((detail) => (
                <p key={detail} className="mt-1 text-sm text-muted-foreground">{detail}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <ContactForm />
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Office location"
              src="https://maps.app.goo.gl/8NuYXXXNLuQ2m96X6"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 480 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
