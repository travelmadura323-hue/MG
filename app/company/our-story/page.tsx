import type { Metadata } from "next"
import Image from "next/image"
import { Award, Globe, Users, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Story | Madura Global",
  description: "Learn about Madura Global's journey from a small travel desk to a premium global travel agency.",
}

const stats = [
  { icon: Globe, value: "28K+", label: "Total Destinations" },
  { icon: Users, value: "4M+", label: "Happy Travelers" },
  { icon: Award, value: "40+", label: "Years of Excellence" },
  { icon: Heart, value: "200K+", label: "Satisfaction Rate" },
]

export default function OurStoryPage() {
  return (
    <div className="pt-28">
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">About Us</span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Our Story</h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            From a passion for travel to a premium global travel agency, discover the journey that shaped Madura Global.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground">A Journey of Passion and Purpose</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Founded in 1986, Madura Global began as a small travel desk with a bold vision: to make extraordinary travel experiences accessible to everyone. What started with a team of three passionate travel enthusiasts has grown into a premium travel agency with offices across the globe.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Over the years, we have crafted thousands of bespoke itineraries, taking our travelers to the most breathtaking corners of the world. Our commitment to personalized service, attention to detail, and creating lasting memories has made us a trusted name in the travel industry.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Today, Madura Global continues to push boundaries, exploring new destinations, forging partnerships with the finest hotels and airlines, and constantly innovating to deliver unparalleled travel experiences.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/tours/bali.jpg" alt="Our team on a tour" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-8 text-center">
              <stat.icon className="mx-auto h-8 w-8 text-accent" />
              <div className="mt-3 font-serif text-3xl font-bold text-card-foreground">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
