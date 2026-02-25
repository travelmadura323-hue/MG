"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight, Globe, Phone } from "lucide-react"
import { destinations, categories, toSlug } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useEnquiry } from "@/components/enquiry-modal"
 import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"



const companyLinks = [
  { name: "Our Story", href: "/company/our-story" },
  { name: "Careers", href: "/company/careers" },
  { name: "Media", href: "/company/media" },
  { name: "Testimonials", href: "/company/testimonials" },
  { name: "Become a Sub Agent", href: "/company/sub-agent" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { openEnquiry } = useEnquiry()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 250)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div className={cn(
        "border-b transition-all duration-300 overflow-hidden",
        scrolled ? "max-h-0 border-transparent" : "max-h-12 border-primary-foreground/10"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
          <div className={cn("flex items-center gap-4", scrolled ? "text-muted-foreground" : "text-primary-foreground/80")}>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" />+61 434 500 743</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">guru@maduraglobal.com</span>
          </div>

          {/* <div className={cn("flex items-center gap-2", scrolled ? "text-muted-foreground" : "text-primary-foreground/80")}>
            <Globe className="h-3 w-3" />
            <span>EN</span>
          </div> */}
           <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <div
      className={cn(
        "flex items-center gap-2 cursor-pointer",
        scrolled
          ? "text-muted-foreground"
          : "text-primary-foreground/80"
      )}
    >
      <Globe className="h-4 w-4" />
      <span>EN</span>
    </div>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end">
    <DropdownMenuItem>English</DropdownMenuItem>
    <DropdownMenuItem>Arabic</DropdownMenuItem>
    <DropdownMenuItem>Hindi</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
          
        </div>
      </div>    
      
 

{/* Main nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Madura Travel Service Logo"
              width={120}
              height={120}
              className="object-contain h-16 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Company */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("company")}
            onMouseLeave={handleMouseLeave}
          >
            <button className={cn(
              "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-primary-foreground/90 hover:text-primary-foreground"
            )}>
              Company <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                activeDropdown === "company"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="w-56 rounded-xl border border-border bg-card p-2 shadow-xl">
                {companyLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("categories")}
            onMouseLeave={handleMouseLeave}
          >
            <button className={cn(
              "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-primary-foreground/90 hover:text-primary-foreground"
            )}>
              Categories <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                activeDropdown === "categories"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="w-56 rounded-xl border border-border bg-card p-2 shadow-xl">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="block rounded-lg px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Destinations Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("destinations")}
            onMouseLeave={handleMouseLeave}
          >
            <button className={cn(
              "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-primary-foreground/90 hover:text-primary-foreground"
            )}>
              Destinations <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div
              className={cn(
                "fixed left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200",
                activeDropdown === "destinations"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
              style={{ width: "min(90vw, 1100px)" }}
            >
              <div className="rounded-xl border border-border bg-card p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {Object.entries(destinations).map(([region, places]) => (
                    <div key={region}>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                        {region}
                      </h4>
                      <div className="flex flex-col gap-0.5">
                        {places.slice(0, 8).map((place) => (
                          <Link
                            key={place}
                            href={`/destinations/${toSlug(place)}`}
                            className="rounded-md px-2 py-1 text-sm text-foreground transition-colors hover:bg-secondary hover:text-accent"
                          >
                            {place}
                          </Link>
                        ))}
                        {places.length > 8 && (
                          <Link
                            href={`/destinations?region=${toSlug(region)}`}
                            className="mt-1 px-2 text-xs font-medium text-accent hover:underline"
                          >
                            +{places.length - 8} more
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/mice"
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-primary-foreground/90 hover:text-primary-foreground"
            )}
          >
            MICE
          </Link>

          <Link
            href="/contact"
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              scrolled
                ? "text-black hover:bg-secondary"
                : "text-primary-foreground/90 hover:text-primary-foreground"
            )}
          >
            Contact Us
          </Link>

          <button
            onClick={() => openEnquiry()}
            className="ml-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110"
          >
            Enquire Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("lg:hidden rounded-lg p-2", scrolled ? "text-foreground" : "text-primary-foreground")}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="max-h-[80vh] overflow-y-auto px-6 py-4">
            {/* Company */}
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "company" ? null : "company")}
              className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground"
            >
              Company
              <ChevronRight className={cn("h-4 w-4 transition-transform", mobileExpanded === "company" && "rotate-90")} />
            </button>
            {mobileExpanded === "company" && (
              <div className="pb-2 pl-4">
                {companyLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Categories */}
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "categories" ? null : "categories")}
              className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground"
            >
              Categories
              <ChevronRight className={cn("h-4 w-4 transition-transform", mobileExpanded === "categories" && "rotate-90")} />
            </button>
            {mobileExpanded === "categories" && (
              <div className="pb-2 pl-4">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/categories/${cat.slug}`} className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Destinations */}
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "destinations" ? null : "destinations")}
              className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground"
            >
              Destinations
              <ChevronRight className={cn("h-4 w-4 transition-transform", mobileExpanded === "destinations" && "rotate-90")} />
            </button>
            {mobileExpanded === "destinations" && (
              <div className="pb-2 pl-4">
                {Object.entries(destinations).map(([region, places]) => (
                  <div key={region} className="mb-3">
                    <p className="py-1 text-xs font-semibold uppercase tracking-wider text-accent">{region}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {places.map((place) => (
                        <Link key={place} href={`/destinations/${toSlug(place)}`} className="py-1 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                          {place}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link href="/mice" className="block py-3 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
              MICE
            </Link>
            <Link href="/contact" className="block py-3 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false)
                openEnquiry()
              }}
              className="mt-4 block w-full rounded-xl bg-accent py-3 text-center text-sm font-semibold text-accent-foreground"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
