"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-travel.jpg"
        alt="Beautiful tropical beach destination"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <div
          className={`transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-2 text-sm font-medium tracking-wide text-[#cc1715] backdrop-blur-sm">
            Your Journey Begins Here
          </span>
        </div>

        <h1
          className={`mt-8 font-serif text-5xl font-bold leading-tight tracking-tight text-[#cc1715] md:text-7xl transition-all duration-1000 delay-200 text-balance ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Discover the World's Most{" "}
          <span className="text-accent">Extraordinary</span>{" "}
          Destinations
        </h1>

        <p
          className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#191975]/80 md:text-xl transition-all duration-1000 delay-400 text-pretty
            style={{ fontFamily: "Arial, sans-serif" }}
             ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Curated luxury travel experiences to breathtaking destinations worldwide.
          Let us craft your perfect journey with personalized itineraries and exceptional service.
        </p>

        <div
          className={`mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-1000 delay-500 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Link
            href="#popular-tours"
            className="flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
          >
            Explore Destinations
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/20"
          >
            <Play className="h-4 w-4" />
            Book Now
          </Link>
        </div>

        {/* Stats row */}
        <div
          className={`mt-16 grid grid-cols-3 gap-6 transition-all duration-1000 delay-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {[
            { number: "200K+", label: "Tour Packages" },
            { number: "28K+", label: "Destinations" },
            { number: "4M+", label: "Happy Travelers" },
            { number: "40+", label: "Years of Excellence" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl font-bold text-accent md:text-4xl">{stat.number}</div>
              <div className="mt-1 text-xs tracking-wider text-primary-foreground/60 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary-foreground/30 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-primary-foreground/60" />
        </div>
      </div>
    </section>
  )
}
