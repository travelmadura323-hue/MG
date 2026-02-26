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

  const toggleMobileExpanded = (key: string) => {
    setMobileExpanded(mobileExpanded === key ? null : key)
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
          <div className={cn("flex items-center gap-4", scrolled ? "text-muted-foreground" : "text-primary/80")}>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" />+61 434 500 743</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">guru@maduraglobal.com</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={cn("flex items-center gap-2 cursor-pointer", scrolled ? "text-muted-foreground" : "text-primary/80")}>
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
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={120}
            height={60}
            className="object-contain h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Company Dropdown */}
          <div className="relative" onMouseEnter={() => handleMouseEnter("company")} onMouseLeave={handleMouseLeave}>
            <button className={cn("flex items-center gap-1 px-4 py-2 text-sm font-medium", scrolled ? "text-foreground" : "text-primary/90")}>
              Company <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "company" && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-56 rounded-xl border bg-card p-2 shadow-xl">
                  {companyLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="block px-4 py-2 text-sm hover:bg-secondary rounded-lg">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Destinations Mega Menu */}
          <div className="relative" onMouseEnter={() => handleMouseEnter("destinations")} onMouseLeave={handleMouseLeave}>
            <button className={cn("flex items-center gap-1 px-4 py-2 text-sm font-medium", scrolled ? "text-foreground" : "text-primary/90")}>
              Destinations <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "destinations" && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[800px]">
                <div className="rounded-xl border bg-card p-6 shadow-2xl grid grid-cols-4 gap-6">
                  {Object.entries(destinations).map(([region, places]) => (
                    <div key={region}>
                      <h4 className="mb-2 text-xs font-bold uppercase text-accent">{region}</h4>
                      <div className="flex flex-col gap-1">
                        {places.slice(0, 5).map(place => (
                          <Link key={place} href={`/destinations/${toSlug(place)}`} className="text-sm hover:text-accent">
                            {place}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/mice" className="px-4 py-2 text-sm font-medium">MICE</Link>
          <Link href="/contact" className="px-4 py-2 text-sm font-medium">Contact Us</Link>
          <button onClick={() => openEnquiry()} className="ml-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
            Enquire Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Content */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t p-6 absolute w-full left-0">
          <button 
            className="flex w-full items-center justify-between py-3" 
            onClick={() => toggleMobileExpanded("destinations")}
          >
            Destinations <ChevronRight className={cn("transition-transform", mobileExpanded === "destinations" && "rotate-90")} />
          </button>
          
          {mobileExpanded === "destinations" && (
            <div className="pl-4 pb-4">
              {Object.entries(destinations).map(([region, places]) => (
                <div key={region} className="mt-2">
                  <p className="text-xs font-bold text-accent">{region}</p>
                  {places.map(place => (
                    <Link key={place} href={`/destinations/${toSlug(place)}`} className="block py-1 text-sm text-muted-foreground">
                      {place}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
          
          <Link href="/mice" className="block py-3 border-t">MICE</Link>
          <Link href="/contact" className="block py-3 border-t">Contact Us</Link>
        </div>
      )}
    </header>
  )
}