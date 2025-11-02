'use client'

import Link from 'next/link'
import { ArrowRight, Palette, Zap, Shield, Layout } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useTheme } from '@/components/theme/theme-provider'

export function HomeHero() {
  const { theme } = useTheme()
  
  return (
    <div className="relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${theme.settings.colors.primary}, ${theme.settings.colors.secondary})` }}
              >
                <Layout className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                CMS Pro
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 rounded-lg text-white transition"
                style={{ backgroundColor: theme.settings.colors.primary }}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            background: `radial-gradient(circle at top right, ${theme.settings.colors.secondary}, transparent 50%),
                         radial-gradient(circle at bottom left, ${theme.settings.colors.primary}, transparent 50%)`
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 mb-8">
              <Zap 
                className="h-4 w-4" 
                style={{ color: theme.settings.colors.primary }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Next.js 16 + Supabase + TypeScript
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Professional CMS
              <br />
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.settings.colors.primary}, ${theme.settings.colors.secondary})`
                }}
              >
                Built for Speed
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Complete content management system dengan theme customization, 
              user management, media library, dan banyak lagi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admin/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
                style={{ backgroundColor: theme.settings.colors.primary }}
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                href="/admin/themes"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg border-2 font-semibold transition hover:bg-gray-50 dark:hover:bg-gray-800"
                style={{ 
                  borderColor: theme.settings.colors.primary,
                  color: theme.settings.colors.primary 
                }}
              >
                <Palette className="h-5 w-5" />
                <span>Customize Theme</span>
              </Link>
            </div>

            {/* Features */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: theme.settings.colors.primary + '20' }}
                >
                  <Palette 
                    className="h-6 w-6"
                    style={{ color: theme.settings.colors.primary }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Theme Customization
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Customize colors, typography, spacing, dan effects dengan live preview
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: theme.settings.colors.secondary + '20' }}
                >
                  <Zap 
                    className="h-6 w-6"
                    style={{ color: theme.settings.colors.secondary }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Built dengan Next.js 16 dan React 19 untuk performance maksimal
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: theme.settings.colors.success + '20' }}
                >
                  <Shield 
                    className="h-6 w-6"
                    style={{ color: theme.settings.colors.success }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Secure & Scalable
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Row Level Security dengan Supabase untuk keamanan maksimal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
