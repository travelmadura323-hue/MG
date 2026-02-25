import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Media | Wanderlux Travel",
  description: "Latest news, press releases, and media coverage about Wanderlux Travel.",
}

const articles = [
  { title: "Wanderlux Named Top Travel Agency 2025", date: "January 2026", image: "/images/tours/paris.jpg", excerpt: "Recognized by Travel + Leisure for exceptional service and curated travel experiences." },
  { title: "Expanding to Southeast Asia Markets", date: "December 2025", image: "/images/tours/bali.jpg", excerpt: "Wanderlux announces new partnerships with premium resorts across Indonesia, Thailand, and Vietnam." },
  { title: "Sustainable Tourism Initiative Launch", date: "November 2025", image: "/images/tours/switzerland.jpg", excerpt: "Our commitment to responsible travel with carbon-neutral tour packages." },
  { title: "MICE Division Reaches Milestone", date: "October 2025", image: "/images/mice-hero.jpg", excerpt: "Corporate events division crosses 500 successful events worldwide." },
]

export default function MediaPage() {
  return (
    <div className="pt-28">
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Press & News</span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Media</h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Stay updated with our latest news, press releases, and industry recognition.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.title} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-accent">{article.date}</span>
                <h3 className="mt-2 font-serif text-xl font-bold text-card-foreground">{article.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
