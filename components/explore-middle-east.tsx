import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { middleEastCountries, toSlug } from "@/lib/data"

export function ExploreMiddleEast() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Banner background */}
      <Image
        src="/images/middle-east-banner.jpg"
        alt="Middle East desert landscape"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/85" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Featured Region
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl text-balance">
            Explore the Middle East
          </h2>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Discover the enchanting blend of ancient heritage and modern luxury across
            the Middle East&apos;s most captivating destinations.
          </p>
        </div>

        {/* Country Cards Grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {middleEastCountries.map((country) => (
            <Link
              key={country.name}
              href={`/destinations/${toSlug(country.name)}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={country.image}
                alt={country.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent transition-all group-hover:from-accent/80" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-primary-foreground">
                  {country.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/destinations?region=middle-east"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
          >
            Explore Middle East Packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
