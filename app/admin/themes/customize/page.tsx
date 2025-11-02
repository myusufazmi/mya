'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, RotateCcw, Palette, Type, Layout, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ThemeCustomizePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'effects'>('colors')
  
  const [themeSettings, setThemeSettings] = useState({
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#1f2937',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSizeBase: '16',
      fontSizeScale: '1.125',
      lineHeight: '1.5'
    },
    spacing: {
      unit: '1',
      section: '2',
      container: '1.5'
    },
    borderRadius: {
      sm: '0.25',
      md: '0.5',
      lg: '0.75',
      full: '9999'
    }
  })

  const updateColor = (key: string, value: string) => {
    setThemeSettings(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value
      }
    }))
  }

  const updateTypography = (key: string, value: string) => {
    setThemeSettings(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value
      }
    }))
  }

  const updateSpacing = (key: string, value: string) => {
    setThemeSettings(prev => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        [key]: value
      }
    }))
  }

  const updateBorderRadius = (key: string, value: string) => {
    setThemeSettings(prev => ({
      ...prev,
      borderRadius: {
        ...prev.borderRadius,
        [key]: value
      }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()

    try {
      // Save theme settings to database
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'theme_customization',
          value: JSON.stringify(themeSettings),
          category: 'appearance'
        })

      if (error) throw error

      alert('Theme settings saved successfully!')
      router.refresh()
    } catch (error) {
      console.error('Error saving theme:', error)
      alert('Failed to save theme settings')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm('Reset all customizations to default?')) {
      setThemeSettings({
        colors: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          background: '#ffffff',
          surface: '#f9fafb',
          text: '#1f2937',
          border: '#e5e7eb',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6'
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSizeBase: '16',
          fontSizeScale: '1.125',
          lineHeight: '1.5'
        },
        spacing: {
          unit: '1',
          section: '2',
          container: '1.5'
        },
        borderRadius: {
          sm: '0.25',
          md: '0.5',
          lg: '0.75',
          full: '9999'
        }
      })
    }
  }

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Layout },
    { id: 'effects', label: 'Effects', icon: Sparkles },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/themes"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Theme Customizer</h1>
            <p className="text-gray-600 mt-1">
              Customize your site's appearance
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="col-span-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="col-span-3 bg-white rounded-lg border p-6">
          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Color Scheme</h2>
                <p className="text-gray-600 mb-6">
                  Customize the color palette for your site
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {Object.entries(themeSettings.colors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => updateColor(key, e.target.value)}
                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateColor(key, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Preview */}
              <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(themeSettings.colors).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div
                        className="w-16 h-16 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: value }}
                      />
                      <p className="text-xs text-gray-600 mt-1 capitalize">
                        {key}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Typography</h2>
                <p className="text-gray-600 mb-6">
                  Configure fonts and text styles
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <input
                    type="text"
                    value={themeSettings.typography.fontFamily}
                    onChange={(e) => updateTypography('fontFamily', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Inter, sans-serif"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Font Size (px)
                  </label>
                  <input
                    type="number"
                    value={themeSettings.typography.fontSizeBase}
                    onChange={(e) => updateTypography('fontSizeBase', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="12"
                    max="24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size Scale
                  </label>
                  <input
                    type="number"
                    value={themeSettings.typography.fontSizeScale}
                    onChange={(e) => updateTypography('fontSizeScale', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.05"
                    min="1"
                    max="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Line Height
                  </label>
                  <input
                    type="number"
                    value={themeSettings.typography.lineHeight}
                    onChange={(e) => updateTypography('lineHeight', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.1"
                    min="1"
                    max="2.5"
                  />
                </div>
              </div>

              {/* Typography Preview */}
              <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
                <div 
                  style={{ 
                    fontFamily: themeSettings.typography.fontFamily,
                    fontSize: `${themeSettings.typography.fontSizeBase}px`,
                    lineHeight: themeSettings.typography.lineHeight
                  }}
                >
                  <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
                  <h2 className="text-3xl font-bold mb-2">Heading 2</h2>
                  <h3 className="text-2xl font-bold mb-2">Heading 3</h3>
                  <p className="text-base mb-2">
                    This is a paragraph of text to preview the typography settings.
                    The quick brown fox jumps over the lazy dog.
                  </p>
                  <p className="text-sm text-gray-600">
                    Small text example for captions and meta information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Spacing Tab */}
          {activeTab === 'spacing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Spacing</h2>
                <p className="text-gray-600 mb-6">
                  Control spacing and layout measurements
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Unit (rem)
                  </label>
                  <input
                    type="number"
                    value={themeSettings.spacing.unit}
                    onChange={(e) => updateSpacing('unit', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.25"
                    min="0.5"
                    max="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Spacing (rem)
                  </label>
                  <input
                    type="number"
                    value={themeSettings.spacing.section}
                    onChange={(e) => updateSpacing('section', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.5"
                    min="1"
                    max="8"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Container Padding (rem)
                  </label>
                  <input
                    type="number"
                    value={themeSettings.spacing.container}
                    onChange={(e) => updateSpacing('container', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.25"
                    min="0.5"
                    max="4"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Effects Tab */}
          {activeTab === 'effects' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Effects</h2>
                <p className="text-gray-600 mb-6">
                  Configure border radius and visual effects
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Border Radius</h3>
                
                {Object.entries(themeSettings.borderRadius).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key === 'sm' ? 'Small' : key === 'md' ? 'Medium' : key === 'lg' ? 'Large' : 'Full'}
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        value={value}
                        onChange={(e) => updateBorderRadius(key, e.target.value)}
                        className="flex-1"
                        min="0"
                        max={key === 'full' ? '9999' : '2'}
                        step={key === 'full' ? '1' : '0.05'}
                      />
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateBorderRadius(key, e.target.value)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="0.05"
                      />
                      <span className="text-sm text-gray-600">rem</span>
                    </div>
                  </div>
                ))}

                {/* Border Radius Preview */}
                <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(themeSettings.borderRadius).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div
                          className="w-24 h-24 bg-blue-500"
                          style={{ borderRadius: `${value}rem` }}
                        />
                        <p className="text-xs text-gray-600 mt-2 capitalize">
                          {key} ({value}rem)
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
