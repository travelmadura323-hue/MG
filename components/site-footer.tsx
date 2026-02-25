import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"
import { destinations, categories, toSlug } from "@/lib/data"



const quickLinks = [
  { name: "Our Story", href: "/company/our-story" },
  { name: "MICE", href: "/mice" },
  { name: "Contact Us", href: "/contact" },
  { name: "Careers", href: "/company/careers" },
  { name: "Testimonials", href: "/company/testimonials" },
]

const featuredDestinations = Object.values(destinations).flat().slice(0, 10)

const socialLinks = [
  {
    icon: Facebook,
    url: "https://www.facebook.com/maduratravel/",
    label: "Facebook",
  },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/company/madura-travel-service-p-ltd/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/maduratravelaus?igsh=MXYwaHc1YWZydmh3Zw%3D%3D",
    label: "Instagram",
  },
  
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold">Stay Inspired</h3>
            <p className="mt-1 text-sm text-primary-foreground/70">
              Subscribe to our newsletter for exclusive travel deals and destination guides.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-serif text-sm font-bold text-accent-foreground">
                W
              </div>
              <span className="font-serif text-lg font-bold">Madura Global</span>
            </div>
<p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
  Madura Global is a premium travel agency offering curated tour packages to the
  world's most breathtaking destinations. We create unforgettable journeys
  tailored to your dreams.
</p>
<div className="mt-6 flex gap-3">
  {socialLinks.map((item, i) => {
    const Icon = item.icon
    return (
      <a
        key={i}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label={item.label}
      >
        <Icon className="h-4 w-4" />
      </a>
    )
  })}
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Destinations</h4>
            <div className="flex flex-col gap-2.5">
              {featuredDestinations.map((dest) => (
                <Link
                  key={dest}
                  href={`/destinations/${toSlug(dest)}`}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {dest}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories + Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Categories</h4>
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>1-11 Rosa Crescent Castle Hill 2154 NSW,Australia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+61 434 500 743</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>guru@maduraglobal.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Madura Global. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-primary-foreground">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
