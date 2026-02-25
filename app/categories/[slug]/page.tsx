import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { categories, popularTours } from "@/lib/data"

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) return { title: "Category Not Found" }
  return {
    title: `${category.name} | Wanderlux Travel`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  return (
    <div className="pt-28">
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Category</span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">{category.name}</h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">{category.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-serif text-2xl font-bold text-foreground">Related Packages</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularTours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={tour.image} alt={tour.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">{tour.price}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">{tour.location}</p>
                <h3 className="mt-2 font-serif text-xl font-bold text-card-foreground group-hover:text-accent transition-colors">{tour.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{tour.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{tour.duration}</div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-accent">View Details <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
