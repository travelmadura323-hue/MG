import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Media | Madura Global",
  description:
    "Latest news, press releases, and media coverage about Madura Global.",
}

const articles = [
  {
    title: "Madura Global Named Top Travel Agency 2025",
    date: "January 2026",
    image: "/images/tours/paris.jpg",
    excerpt:
      "Recognized by Travel + Leisure for exceptional service and curated travel experiences.",
  },
  {
    title: "Expanding to Southeast Asia Markets",
    date: "December 2025",
    image: "/images/tours/bali.jpg",
    excerpt:
      "Wanderlux announces new partnerships with premium resorts across Indonesia, Thailand, and Vietnam.",
  },
  {
    title: "Sustainable Tourism Initiative Launch",
    date: "November 2025",
    image: "/images/tours/switzerland.jpg",
    excerpt:
      "Our commitment to responsible travel with carbon-neutral tour packages.",
  },
  {
    title: "MICE Division Reaches Milestone",
    date: "October 2025",
    image: "/images/mice-hero.jpg",
    excerpt:
      "Corporate events division crosses 500 successful events worldwide.",
  },
]

const youtubeVideos = [
  "ffZYphMCC14",
  "75v5qpFK204",
  "LGNmQ1iYGIw",
  "02gXuRoKT7Q",
]

export default function MediaPage() {
  return (
    <div className="pt-28">

      {/* ---------------- HEADER ---------------- */}
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Press & News
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
            Media
          </h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Stay updated with our latest news, press releases, and industry
            recognition.
          </p>
        </div>
      </div>

      {/* ---------------- LIVE VIDEO ---------------- */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold font-serif mb-6 text-center">
          Live on YouTube
        </h2>

        <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/8_cnSln4qsE"
            title="YouTube Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* ---------------- YOUTUBE VIDEOS GRID ---------------- */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold font-serif mb-6 text-center">
          Video Gallery
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {youtubeVideos.map((id) => (
            <div
              key={id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="aspect-video w-full overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}