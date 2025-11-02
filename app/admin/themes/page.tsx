import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Palette, Plus, Download, Upload, Eye } from 'lucide-react'

export default async function ThemesPage() {
  const supabase = await createClient()
  
  // Fetch installed themes from database
  const { data: themes, error } = await supabase
    .from('themes')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch active theme
  const { data: activeThemeSetting } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'active_theme')
    .single()

  const activeThemeId = activeThemeSetting?.value || 'default'

  const stats = {
    total: themes?.length || 0,
    active: themes?.filter(t => t.id === activeThemeId).length || 0,
    available: themes?.filter(t => t.id !== activeThemeId).length || 0,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Themes</h1>
          <p className="text-gray-600 mt-1">
            Manage and customize your site's appearance
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/themes/customize"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            <Palette className="h-5 w-5" />
            <span>Customize</span>
          </Link>
          <Link
            href="/admin/themes/new"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-5 w-5" />
            <span>Add Theme</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Themes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Palette className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Theme</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-600">{stats.available}</p>
            </div>
            <Download className="h-8 w-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes && themes.length > 0 ? (
          themes.map((theme) => {
            const isActive = theme.id === activeThemeId
            const themeConfig = typeof theme.config === 'string' 
              ? JSON.parse(theme.config) 
              : theme.config

            return (
              <div
                key={theme.id}
                className={`bg-white rounded-lg border-2 overflow-hidden transition ${
                  isActive 
                    ? 'border-green-500 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {/* Theme Preview */}
                <div 
                  className="h-40 relative"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig?.settings?.colors?.primary || '#3b82f6'} 0%, ${themeConfig?.settings?.colors?.secondary || '#8b5cf6'} 100%)`
                  }}
                >
                  {isActive && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Active
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{theme.name}</h3>
                  </div>
                </div>

                {/* Theme Info */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {theme.description || 'No description available'}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>v{themeConfig?.version || '1.0.0'}</span>
                    <span>{themeConfig?.author || 'Unknown'}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {!isActive ? (
                      <Link
                        href={`/admin/themes/${theme.id}/activate`}
                        className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                      >
                        Activate
                      </Link>
                    ) : (
                      <Link
                        href="/admin/themes/customize"
                        className="flex-1 text-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                      >
                        Customize
                      </Link>
                    )}
                    <Link
                      href={`/admin/themes/${theme.id}/edit`}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full bg-white rounded-lg border p-12 text-center">
            <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No themes found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first theme
            </p>
            <Link
              href="/admin/themes/new"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5" />
              <span>Add Theme</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
