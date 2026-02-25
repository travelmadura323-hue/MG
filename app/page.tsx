import { HeroSection } from "@/components/hero-section"
import { PopularTours } from "@/components/popular-tours"
import { TrendingTours } from "@/components/trending-tours"
import { ExploreMiddleEast } from "@/components/explore-middle-east"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularTours />
      <TrendingTours />
      <ExploreMiddleEast />
    </>
  )
}
