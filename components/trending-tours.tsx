"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { trendingTours } from "@/lib/data"

export function TrendingTours() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll)
    checkScroll()
    return () => el.removeEventListener("scroll", checkScroll)
  }, [])

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: 320, behavior: "smooth" })
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    })
  }

  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Hot Right Now
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-secondary-foreground md:text-5xl">
              Trending Tours
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-30"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-30"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {trendingTours.map((tour, i) => (
            <div
              key={i}
              className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
                    <MapPin className="h-3 w-3" />
                    {tour.location}
                  </div>
                  <h3 className="mt-1 font-serif text-lg font-bold text-primary-foreground">
                    {tour.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-accent">{tour.price}</span>
                    <button className="rounded-lg bg-primary-foreground/20 px-3 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                      Quick Enquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
