"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ItineraryItem {
  day: string
  title: string
  description: string
}

export function TourItinerary({ itinerary }: { itinerary: ItineraryItem[] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {itinerary.map((item, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                {item.day.replace("Day ", "")}
              </span>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.day}</span>
                <h4 className="font-semibold text-card-foreground">{item.title}</h4>
              </div>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform",
                openIndex === i && "rotate-180"
              )}
            />
          </button>
          {openIndex === i && (
            <div className="border-t border-border px-6 py-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
