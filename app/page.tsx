import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ServicesSection />
    </div>
  )
}
