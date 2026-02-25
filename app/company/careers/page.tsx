import type { Metadata } from "next"
import { MapPin, Briefcase, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | Wanderlux Travel",
  description: "Join our team and help create extraordinary travel experiences.",
}

const openings = [
  { title: "Senior Travel Consultant", location: "New York, NY", type: "Full-time", description: "Guide clients through their dream vacation planning with expert knowledge of global destinations." },
  { title: "Digital Marketing Manager", location: "Remote", type: "Full-time", description: "Lead our digital marketing efforts across social media, email, and paid campaigns." },
  { title: "MICE Event Coordinator", location: "Dubai, UAE", type: "Full-time", description: "Manage corporate events and conferences for our growing MICE division." },
  { title: "Content Writer", location: "Remote", type: "Part-time", description: "Create compelling travel guides, blog posts, and destination content." },
]

export default function CareersPage() {
  return (
    <div className="pt-28">
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Join Us</span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Careers</h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Be part of a team that creates unforgettable travel experiences for thousands of travelers worldwide.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-serif text-2xl font-bold text-foreground">Open Positions</h2>
        <div className="mt-8 flex flex-col gap-4">
          {openings.map((job) => (
            <div key={job.title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg">
              <h3 className="font-serif text-lg font-bold text-card-foreground">{job.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Briefcase className="h-3.5 w-3.5" />{job.type}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" />Posted recently</span>
              </div>
              <button className="mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
