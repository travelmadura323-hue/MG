import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, Users, MapPin, User, Check, X, ArrowRight } from "lucide-react"
import { popularTours } from "@/lib/data"
import { BookingForm } from "@/components/booking-form"
import { TourItinerary } from "@/components/tour-itinerary"

export function generateStaticParams() {
  return popularTours.map((tour) => ({ slug: tour.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tour = popularTours.find((t) => t.slug === slug)
  if (!tour) return { title: "Tour Not Found" }
  return {
    title: `${tour.title} | Wanderlux Travel`,
    description: tour.description,
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tour = popularTours.find((t) => t.slug === slug)

  if (!tour) notFound()

  const relatedTours = popularTours.filter((t) => t.slug !== slug).slice(0, 3)

  return (
    <div className="pt-28">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="mx-auto max-w-7xl px-6">
            <span className="inline-block rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
              {tour.location}
            </span>
            <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
              {tour.title}
            </h1>
            <p className="mt-2 max-w-xl text-primary-foreground/80">{tour.description}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Clock, label: "Duration", value: tour.duration },
                { icon: Users, label: "Travelers", value: tour.travelers },
                { icon: User, label: "Min Age", value: `${tour.minAge}+` },
                { icon: MapPin, label: "Starting Place", value: tour.startingPlace },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center"
                >
                  <feature.icon className="h-6 w-6 text-accent" />
                  <span className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {feature.label}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-card-foreground">{feature.value}</span>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-foreground">Overview</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{tour.overview}</p>
            </div>

            {/* Tour Plan Accordion */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-foreground">Tour Plan</h2>
              <div className="mt-4">
                <TourItinerary itinerary={tour.itinerary} />
              </div>
            </div>

            {/* Included / Excluded */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-bold text-card-foreground">Included</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {tour.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-bold text-card-foreground">Excluded</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {tour.excluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Map */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-foreground">Destination Map</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title={`Map of ${tour.location}`}
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(tour.location)}`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="mb-6 rounded-2xl border border-border bg-card p-6 text-center">
                <span className="text-sm text-muted-foreground">Starting from</span>
                <div className="mt-1 font-serif text-4xl font-bold text-accent">{tour.price}</div>
                <span className="text-sm text-muted-foreground">per person</span>
              </div>
              <BookingForm tourTitle={tour.title} />
            </div>
          </div>
        </div>

        {/* Related Tours */}
        <div className="mt-20">
          <h2 className="font-serif text-2xl font-bold text-foreground">Related Tours</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {relatedTours.map((related) => (
              <Link
                key={related.slug}
                href={`/tours/${related.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
                      {related.price}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-card-foreground group-hover:text-accent transition-colors">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
