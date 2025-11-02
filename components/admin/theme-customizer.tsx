'use client'

import { useState } from 'react'
import { ThemeConfig } from '@/lib/theme/types'
import { Palette, Type, Layout, Zap, Code, RotateCcw } from 'lucide-react'

interface ThemeCustomizerProps {
  config: ThemeConfig
  onUpdate: (config: Partial<ThemeConfig>) => void
  onReset: () => void
}

export function ThemeCustomizer({ config, onUpdate, onReset }: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout' | 'advanced'>('colors')

  const tabs = [
    { id: 'colors' as const, label: 'Colors', icon: Palette },
    { id: 'typography' as const, label: 'Typography', icon: Type },
    { id: 'layout' as const, label: 'Layout', icon: Layout },
    { id: 'advanced' as const, label: 'Advanced', icon: Code },
  ]

  const handleColorChange = (key: keyof typeof config.colors, value: string) => {
    onUpdate({
      colors: {
        ...config.colors,
        [key]: value,
      },
    })
  }

  const handleTypographyChange = (key: keyof typeof config.typography, value: any) => {
    onUpdate({
      typography: {
        ...config.typography,
        [key]: value,
      },
    })
  }

  const handleLayoutChange = (key: keyof typeof config.layout, value: string) => {
    onUpdate({
      layout: {
        ...config.layout,
        [key]: value,
      },
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Primary Colors
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Primary"
                  value={config.colors.primary}
                  onChange={(value) => handleColorChange('primary', value)}
                />
                <ColorPicker
                  label="Primary Hover"
                  value={config.colors.primaryHover}
                  onChange={(value) => handleColorChange('primaryHover', value)}
                />
                <ColorPicker
                  label="Primary Light"
                  value={config.colors.primaryLight}
                  onChange={(value) => handleColorChange('primaryLight', value)}
                />
                <ColorPicker
                  label="Primary Dark"
                  value={config.colors.primaryDark}
                  onChange={(value) => handleColorChange('primaryDark', value)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Semantic Colors
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Success"
                  value={config.colors.success}
                  onChange={(value) => handleColorChange('success', value)}
                />
                <ColorPicker
                  label="Warning"
                  value={config.colors.warning}
                  onChange={(value) => handleColorChange('warning', value)}
                />
                <ColorPicker
                  label="Error"
                  value={config.colors.error}
                  onChange={(value) => handleColorChange('error', value)}
                />
                <ColorPicker
                  label="Info"
                  value={config.colors.info}
                  onChange={(value) => handleColorChange('info', value)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Text Colors
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Text Primary"
                  value={config.colors.textPrimary}
                  onChange={(value) => handleColorChange('textPrimary', value)}
                />
                <ColorPicker
                  label="Text Secondary"
                  value={config.colors.textSecondary}
                  onChange={(value) => handleColorChange('textSecondary', value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Font Families
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Body Font
                  </label>
                  <input
                    type="text"
                    value={config.typography.fontFamily}
                    onChange={(e) => onUpdate({ typography: { ...config.typography, fontFamily: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Heading Font
                  </label>
                  <input
                    type="text"
                    value={config.typography.headingFamily}
                    onChange={(e) => onUpdate({ typography: { ...config.typography, headingFamily: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layout Tab */}
        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Layout Dimensions
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Container Max Width
                  </label>
                  <input
                    type="text"
                    value={config.layout.containerMaxWidth}
                    onChange={(e) => handleLayoutChange('containerMaxWidth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 1280px"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sidebar Width
                  </label>
                  <input
                    type="text"
                    value={config.layout.sidebarWidth}
                    onChange={(e) => handleLayoutChange('sidebarWidth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 256px"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Header Height
                  </label>
                  <input
                    type="text"
                    value={config.layout.headerHeight}
                    onChange={(e) => handleLayoutChange('headerHeight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 64px"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Custom CSS
              </h3>
              <textarea
                value={config.customCSS?.global || ''}
                onChange={(e) => onUpdate({ customCSS: { ...config.customCSS, global: e.target.value } })}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                placeholder="/* Your custom CSS here */"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Add custom CSS to override or extend the theme styles
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset to Default</span>
        </button>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// Color Picker Component
function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white uppercase font-mono text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
