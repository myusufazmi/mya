'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Save, Upload } from 'lucide-react'

interface ThemeFormProps {
  initialData?: {
    id?: string
    name?: string
    description?: string
    version?: string
    author?: string
    config?: any
  }
}

export function ThemeFormComponent({ initialData }: ThemeFormProps = {}) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    version: initialData?.version || '1.0.0',
    author: initialData?.author || '',
  })

  const [themeConfig, setThemeConfig] = useState(
    initialData?.config || {
      settings: {
        colors: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          background: '#ffffff',
          surface: '#f9fafb',
          text: '#1f2937',
          border: '#e5e7eb',
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSizeBase: '16px',
        },
      },
      supports: ['light', 'dark'],
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const supabase = createClient()

    try {
      const themeData = {
        name: formData.name.toLowerCase().replace(/\s+/g, '-'),
        display_name: formData.name,
        description: formData.description,
        version: formData.version,
        author: formData.author,
        config: themeConfig,
        is_active: false,
      }

      if (initialData?.id) {
        // Update existing theme
        const { error } = await supabase
          .from('themes')
          .update(themeData)
          .eq('id', initialData.id)

        if (error) throw error

        alert('Theme updated successfully!')
      } else {
        // Create new theme
        const { error } = await supabase
          .from('themes')
          .insert([themeData])

        if (error) throw error

        alert('Theme created successfully!')
      }

      router.push('/admin/themes')
      router.refresh()
    } catch (error: any) {
      console.error('Error saving theme:', error)
      alert(error.message || 'Failed to save theme')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Theme Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="My Awesome Theme"
          />
          <p className="mt-1 text-sm text-gray-500">
            This will be displayed to users
          </p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="A brief description of your theme..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-2">
              Version *
            </label>
            <input
              type="text"
              id="version"
              name="version"
              value={formData.version}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1.0.0"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Name"
            />
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Color Palette</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(themeConfig.settings.colors).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={value as string}
                  onChange={(e) => {
                    setThemeConfig((prev: any) => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        colors: {
                          ...prev.settings.colors,
                          [key]: e.target.value,
                        },
                      },
                    }))
                  }}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) => {
                    setThemeConfig((prev: any) => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        colors: {
                          ...prev.settings.colors,
                          [key]: e.target.value,
                        },
                      },
                    }))
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
        <div 
          className="h-32 rounded-lg flex items-center justify-center text-white text-xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${themeConfig.settings.colors.primary} 0%, ${themeConfig.settings.colors.secondary} 100%)`
          }}
        >
          {formData.name || 'Theme Preview'}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          <span>{saving ? 'Saving...' : initialData?.id ? 'Update Theme' : 'Create Theme'}</span>
        </button>
      </div>
    </form>
  )
}
