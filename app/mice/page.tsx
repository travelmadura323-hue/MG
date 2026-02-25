import type { Metadata } from "next"
import Image from "next/image"
import { Building2, Users, Award, Globe, Calendar, Briefcase } from "lucide-react"
import { BookingForm } from "@/components/booking-form"

export const metadata: Metadata = {
  title: "MICE | Wanderlux Travel",
  description: "Meetings, Incentives, Conferences & Exhibitions. Premium corporate travel and event management solutions.",
}

const services = [
  { icon: Building2, title: "Meetings", description: "Boardroom-ready venues with state-of-the-art technology at premier destinations worldwide." },
  { icon: Award, title: "Incentives", description: "Reward your team with exclusive experiences that inspire and motivate peak performance." },
  { icon: Users, title: "Conferences", description: "Large-scale event planning and logistics for conferences hosting 50 to 5,000+ delegates." },
  { icon: Globe, title: "Exhibitions", description: "End-to-end exhibition management including booth design, logistics, and on-site coordination." },
  { icon: Calendar, title: "Event Planning", description: "Bespoke corporate events from gala dinners to team-building retreats in stunning locations." },
  { icon: Briefcase, title: "Corporate Travel", description: "Streamlined business travel management with negotiated rates and 24/7 support." },
]

export default function MicePage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src="/images/mice-hero.jpg" alt="Corporate conference" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/50 to-primary/30" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="mx-auto max-w-7xl px-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Corporate Solutions</span>
            <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
              MICE Services
            </h1>
            <p className="mt-2 max-w-xl text-primary-foreground/80">
              Meetings, Incentives, Conferences & Exhibitions. Let us orchestrate your next corporate event.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <service.icon className="h-10 w-10 text-accent" />
              <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="mt-20">
          <h2 className="text-center font-serif text-3xl font-bold text-foreground">Our Events Gallery</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {["/images/mice-hero.jpg", "/images/tours/dubai.jpg", "/images/tours/paris.jpg", "/images/tours/switzerland.jpg", "/images/tours/bali.jpg", "/images/tours/maldives.jpg"].map((src, i) => (
              <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={src} alt="Corporate event" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-primary/20 transition-colors group-hover:bg-primary/40" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA + Form */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Get Started</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Let&apos;s Plan Your Next Corporate Event
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Whether you&apos;re planning a boardroom meeting for 10 or a conference for 5,000, our dedicated MICE team brings decades of experience in creating flawless corporate events across the globe. From venue selection to logistics, we handle every detail so you can focus on what matters most.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {["Dedicated event manager assigned to your project", "Global network of premium venues and hotels", "Complete end-to-end logistics management", "Post-event reporting and feedback analysis"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  )
}
