'use client'

import { useTheme } from '@/components/theme/theme-provider'
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export function ThemeShowcase() {
  const { theme } = useTheme()

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Theme Preview
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Lihat tema Anda dalam aksi - semua elemen UI dengan theme colors
          </p>
        </div>

        {/* Color Palette */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Color Palette
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(theme.settings.colors).map(([key, value]) => (
              <div key={key} className="group cursor-pointer">
                <div
                  className="h-24 rounded-lg shadow-md border-2 border-white dark:border-gray-700 mb-2 transition transform group-hover:scale-105"
                  style={{ backgroundColor: value }}
                />
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Buttons
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition"
              style={{ backgroundColor: theme.settings.colors.primary }}
            >
              Primary Button
            </button>
            <button
              className="px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition"
              style={{ backgroundColor: theme.settings.colors.secondary }}
            >
              Secondary Button
            </button>
            <button
              className="px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition border-2"
              style={{ 
                borderColor: theme.settings.colors.primary,
                color: theme.settings.colors.primary 
              }}
            >
              Outline Button
            </button>
            <button
              className="px-6 py-3 rounded-lg text-gray-700 dark:text-gray-300 font-semibold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Gray Button
            </button>
          </div>
        </div>

        {/* Alert Messages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Alert Messages
          </h3>
          <div className="space-y-4">
            <div
              className="flex items-start space-x-3 p-4 rounded-lg border-l-4"
              style={{ 
                backgroundColor: theme.settings.colors.success + '20',
                borderColor: theme.settings.colors.success 
              }}
            >
              <CheckCircle 
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: theme.settings.colors.success }}
              />
              <div>
                <h4 
                  className="font-semibold mb-1"
                  style={{ color: theme.settings.colors.success }}
                >
                  Success!
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your changes have been saved successfully.
                </p>
              </div>
            </div>

            <div
              className="flex items-start space-x-3 p-4 rounded-lg border-l-4"
              style={{ 
                backgroundColor: theme.settings.colors.info + '20',
                borderColor: theme.settings.colors.info 
              }}
            >
              <Info 
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: theme.settings.colors.info }}
              />
              <div>
                <h4 
                  className="font-semibold mb-1"
                  style={{ color: theme.settings.colors.info }}
                >
                  Information
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This is an informational message with useful details.
                </p>
              </div>
            </div>

            <div
              className="flex items-start space-x-3 p-4 rounded-lg border-l-4"
              style={{ 
                backgroundColor: theme.settings.colors.warning + '20',
                borderColor: theme.settings.colors.warning 
              }}
            >
              <AlertTriangle 
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: theme.settings.colors.warning }}
              />
              <div>
                <h4 
                  className="font-semibold mb-1"
                  style={{ color: theme.settings.colors.warning }}
                >
                  Warning
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Please review your changes before proceeding.
                </p>
              </div>
            </div>

            <div
              className="flex items-start space-x-3 p-4 rounded-lg border-l-4"
              style={{ 
                backgroundColor: theme.settings.colors.error + '20',
                borderColor: theme.settings.colors.error 
              }}
            >
              <AlertCircle 
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: theme.settings.colors.error }}
              />
              <div>
                <h4 
                  className="font-semibold mb-1"
                  style={{ color: theme.settings.colors.error }}
                >
                  Error
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Something went wrong. Please try again.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="p-6 rounded-lg shadow-md"
              style={{ backgroundColor: theme.settings.colors.surface }}
            >
              <div
                className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: theme.settings.colors.primary }}
              >
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Card Title
              </h4>
              <p 
                className="text-sm"
                style={{ color: theme.settings.colors.text }}
              >
                This is a card component with theme surface color and text styling.
              </p>
            </div>

            <div 
              className="p-6 rounded-lg shadow-md"
              style={{ backgroundColor: theme.settings.colors.surface }}
            >
              <div
                className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: theme.settings.colors.secondary }}
              >
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Another Card
              </h4>
              <p 
                className="text-sm"
                style={{ color: theme.settings.colors.text }}
              >
                Cards automatically adapt to light and dark mode with smooth transitions.
              </p>
            </div>

            <div 
              className="p-6 rounded-lg shadow-md border-2"
              style={{ 
                backgroundColor: theme.settings.colors.surface,
                borderColor: theme.settings.colors.primary 
              }}
            >
              <div
                className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: theme.settings.colors.primary + '20',
                  color: theme.settings.colors.primary 
                }}
              >
                <span className="text-xl font-bold">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Highlighted Card
              </h4>
              <p 
                className="text-sm"
                style={{ color: theme.settings.colors.text }}
              >
                This card features a colored border using the primary theme color.
              </p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Typography
          </h3>
          <div 
            className="p-8 rounded-lg"
            style={{ 
              backgroundColor: theme.settings.colors.surface,
              fontFamily: theme.settings.typography.fontFamily 
            }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Heading 1 - Large Title
            </h1>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Heading 2 - Section Title
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Heading 3 - Subsection
            </h3>
            <p 
              className="text-base mb-4"
              style={{ 
                color: theme.settings.colors.text,
                lineHeight: theme.settings.typography.lineHeight 
              }}
            >
              This is a paragraph of body text. The typography settings include font family, 
              base size, scale, and line height. All of these can be customized in the theme 
              customizer to match your brand identity.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Small text for captions, meta information, and secondary content.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div 
            className="inline-block p-12 rounded-2xl shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${theme.settings.colors.primary}, ${theme.settings.colors.secondary})`
            }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Customize?
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-md">
              Buka theme customizer untuk mengubah colors, typography, spacing, dan effects
            </p>
            <a
              href="/admin/themes/customize"
              className="inline-block px-8 py-4 bg-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
              style={{ color: theme.settings.colors.primary }}
            >
              Open Theme Customizer
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
