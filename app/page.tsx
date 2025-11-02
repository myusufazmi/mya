import { HomeHero } from '@/components/public/home-hero'
import { ThemeShowcase } from '@/components/public/theme-showcase'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HomeHero />
      <ThemeShowcase />
    </div>
  )
}
