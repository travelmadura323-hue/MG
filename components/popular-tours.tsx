import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { popularTours } from "@/lib/data"

export function PopularTours() {
  return (
    <section id="popular-tours" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Curated Experiences
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Popular Tours
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Handpicked tour packages to the world&apos;s most stunning destinations,
            designed for unforgettable experiences.
          </p>
        </div>

        {/* Tour Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularTours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
                    {tour.price}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {tour.location}
                </p>
                <h3 className="mt-2 font-serif text-xl font-bold text-card-foreground group-hover:text-accent transition-colors">
                  {tour.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {tour.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {tour.duration}
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All button */}
        <div className="mt-12 text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-accent px-8 py-3.5 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-accent-foreground"
          >
            View All Tours
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
