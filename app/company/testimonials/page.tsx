import type { Metadata } from "next"
import { Star } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Testimonials | Madura Global",
  description: "Hear from our happy travelers about their Madura Global experiences.",
}

const testimonials = [
  { 
    name: "Mr. Anbil Mahesh",
    Designation:"Minister for Education - Government of Tamilnadu",
    rating: 5,
    image: "/images/testimonials/Anbil mahesh.jpg",
    text: "I extend my heartfelt thanks to the entire Madura Travel Service team for their professional assistance in organizing international trips for the students of Tamil Nadu's government schools, helping them realize their dreams. Traveling with the students made me feel like a young boy again, as I thoroughly enjoyed the beautifully planned tours to destinations like Singapore, Malaysia, Japan, South Korea, and more. Kudos to Madura Travel Service for their incredible efforts"
  },
  { 
    name: "Mr. Napoleon",
    Designation:"Cine Actor & Politician",
    rating:5,
    image: "/images/testimonials/nepolean.jpg",
    text: "Mr. Sriharan Balan and his exceptional team provided seamless service, taking on the monumental task of organizing my son’s wedding in Tokyo, Japan, in November 2024, with absolute ease. Every guest was treated like a VIP from start to finish, ensuring a memorable and stress-free experience for all involved."
  },
  { 
    name: "Mr. Kamal Haasan",
    Designation:"Cine Actor & Director",
    rating:5,
    image: "/images/testimonials/Kamalhasan.jpg",
    text:"Mr. V.K.T. Balan was more than just a travel consultant; he was a cherished friend and pillar of support throughout my decades-long journey in cinema, right from my early days. His guidance and expertise enriched numerous travel programs and shoots. I extend my heartfelt wishes for continued success and prosperity to his entire team."
  },
  { 
    name: "Mr. Venkatesh Bhat",
    Designation:"TCDC Fame & CEO,Accord Hotels",
    rating:5,
    image: "/images/testimonials/Venkatesh-Bhat.jpg",
    text:"My long-standing association with Madura Travel Service has made my global travels seamless and stress-free. Their expertise in handling visas ensures timely approvals without any delays, making them my trusted travel partner. Truly exceptional service every time!"
  },
  { 
    name: "Mrs. P. Susheela",
    Designation:"Legendary Singer",
    rating:5,
    image: "/images/testimonials/Susheela.jpg",
    text:"My journey with Madura Travel Service began when Mr. VKT Balan helped me obtain my first passport. Since then, he has been a constant support, helping me travel the world and share my voice globally. He is like a son to me, and Madura Travel Service feels like family."
  },
  { 
    name: "Mr. Sandy",
    Designation:"Dance Master",
    rating:5,
    image: "/images/testimonials/Sandy.jpg",
    text:"Mr. Sriharan Balan has been a tremendous support during my international shows. His professional team is always available 24/7, ensuring that my travel experiences are smooth and enjoyable. I truly appreciate their dedication and commitment to making every journey a seamless and positive experience"
  },


  // Add rest of your testimonials here with 'image' field...
]

export default function TestimonialsPage() {
  return (
    <div className="pt-28">
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Happy Travelers</span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Testimonials</h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Real stories from real travelers who experienced the Madura global difference.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-card p-6 relative"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* IMAGE + NAME + DESIGNATION */}
              <div className="mt-6 border-t border-border pt-4 flex items-center gap-4">
                <Image
                  src={t.image}
                  width={60}
                  height={60}
                  alt={t.name}
                  className="rounded-full object-cover shadow-md"
                />
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.Designation}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}