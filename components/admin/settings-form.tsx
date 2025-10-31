'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  Globe, 
  Search, 
  Share2, 
  Shield,
  Save,
  CheckCircle
} from 'lucide-react'

interface SettingsFormProps {
  initialSettings: Record<string, any>
}

type TabType = 'general' | 'seo' | 'social' | 'advanced'

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('general')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  
  const [settings, setSettings] = useState({
    // General
    site_name: initialSettings.site_name || '',
    site_tagline: initialSettings.site_tagline || '',
    site_description: initialSettings.site_description || '',
    site_url: initialSettings.site_url || '',
    admin_email: initialSettings.admin_email || '',
    
    // SEO
    seo_title: initialSettings.seo_title || '',
    seo_description: initialSettings.seo_description || '',
    seo_keywords: initialSettings.seo_keywords || '',
    google_analytics_id: initialSettings.google_analytics_id || '',
    google_site_verification: initialSettings.google_site_verification || '',
    
    // Social
    facebook_url: initialSettings.facebook_url || '',
    twitter_url: initialSettings.twitter_url || '',
    instagram_url: initialSettings.instagram_url || '',
    linkedin_url: initialSettings.linkedin_url || '',
    youtube_url: initialSettings.youtube_url || '',
    
    // Advanced
    posts_per_page: initialSettings.posts_per_page || '10',
    date_format: initialSettings.date_format || 'DD/MM/YYYY',
    time_format: initialSettings.time_format || '24h',
    timezone: initialSettings.timezone || 'Asia/Jakarta',
    maintenance_mode: initialSettings.maintenance_mode || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

    const supabase = createClient()

    // Update each setting
    try {
      for (const [key, value] of Object.entries(settings)) {
        const { error: upsertError } = await supabase
          .from('settings')
          .upsert({
            key,
            value,
            category: getCategoryForKey(key),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'key'
          })

        if (upsertError) throw upsertError
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const getCategoryForKey = (key: string): string => {
    if (key.startsWith('seo_') || key.includes('google_')) return 'seo'
    if (key.includes('_url') && key !== 'site_url') return 'social'
    if (['posts_per_page', 'date_format', 'time_format', 'timezone', 'maintenance_mode'].includes(key)) return 'advanced'
    return 'general'
  }

  const tabs = [
    { id: 'general' as TabType, label: 'General', icon: Globe },
    { id: 'seo' as TabType, label: 'SEO', icon: Search },
    { id: 'social' as TabType, label: 'Social Media', icon: Share2 },
    { id: 'advanced' as TabType, label: 'Advanced', icon: Shield },
  ]

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Settings saved successfully!
        </div>
      )}

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="site_name" className="block text-sm font-medium text-gray-700 mb-2">
              Site Name *
            </label>
            <input
              type="text"
              id="site_name"
              name="site_name"
              value={settings.site_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="My Awesome Site"
            />
          </div>

          <div>
            <label htmlFor="site_tagline" className="block text-sm font-medium text-gray-700 mb-2">
              Site Tagline
            </label>
            <input
              type="text"
              id="site_tagline"
              name="site_tagline"
              value={settings.site_tagline}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Just another CMS site"
            />
          </div>

          <div>
            <label htmlFor="site_description" className="block text-sm font-medium text-gray-700 mb-2">
              Site Description
            </label>
            <textarea
              id="site_description"
              name="site_description"
              value={settings.site_description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="A brief description of your site..."
            />
          </div>

          <div>
            <label htmlFor="site_url" className="block text-sm font-medium text-gray-700 mb-2">
              Site URL
            </label>
            <input
              type="url"
              id="site_url"
              name="site_url"
              value={settings.site_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label htmlFor="admin_email" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              id="admin_email"
              name="admin_email"
              value={settings.admin_email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@example.com"
            />
          </div>
        </div>
      )}

      {/* SEO Settings */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="seo_title" className="block text-sm font-medium text-gray-700 mb-2">
              Default SEO Title
            </label>
            <input
              type="text"
              id="seo_title"
              name="seo_title"
              value={settings.seo_title}
              onChange={handleChange}
              maxLength={60}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Default title for search engines"
            />
            <p className="text-xs text-gray-500 mt-1">
              {settings.seo_title.length}/60 characters
            </p>
          </div>

          <div>
            <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700 mb-2">
              Default SEO Description
            </label>
            <textarea
              id="seo_description"
              name="seo_description"
              value={settings.seo_description}
              onChange={handleChange}
              maxLength={160}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Default meta description for search engines"
            />
            <p className="text-xs text-gray-500 mt-1">
              {settings.seo_description.length}/160 characters
            </p>
          </div>

          <div>
            <label htmlFor="seo_keywords" className="block text-sm font-medium text-gray-700 mb-2">
              Default Keywords
            </label>
            <input
              type="text"
              id="seo_keywords"
              name="seo_keywords"
              value={settings.seo_keywords}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-gray-500 mt-1">
              Comma-separated keywords
            </p>
          </div>

          <div>
            <label htmlFor="google_analytics_id" className="block text-sm font-medium text-gray-700 mb-2">
              Google Analytics ID
            </label>
            <input
              type="text"
              id="google_analytics_id"
              name="google_analytics_id"
              value={settings.google_analytics_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
            />
          </div>

          <div>
            <label htmlFor="google_site_verification" className="block text-sm font-medium text-gray-700 mb-2">
              Google Site Verification
            </label>
            <input
              type="text"
              id="google_site_verification"
              name="google_site_verification"
              value={settings.google_site_verification}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Verification code"
            />
          </div>
        </div>
      )}

      {/* Social Media Settings */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="facebook_url" className="block text-sm font-medium text-gray-700 mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              id="facebook_url"
              name="facebook_url"
              value={settings.facebook_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://facebook.com/yourpage"
            />
          </div>

          <div>
            <label htmlFor="twitter_url" className="block text-sm font-medium text-gray-700 mb-2">
              Twitter/X URL
            </label>
            <input
              type="url"
              id="twitter_url"
              name="twitter_url"
              value={settings.twitter_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://twitter.com/yourhandle"
            />
          </div>

          <div>
            <label htmlFor="instagram_url" className="block text-sm font-medium text-gray-700 mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              id="instagram_url"
              name="instagram_url"
              value={settings.instagram_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>

          <div>
            <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedin_url"
              name="linkedin_url"
              value={settings.linkedin_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>

          <div>
            <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700 mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              id="youtube_url"
              name="youtube_url"
              value={settings.youtube_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://youtube.com/@yourchannel"
            />
          </div>
        </div>
      )}

      {/* Advanced Settings */}
      {activeTab === 'advanced' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="posts_per_page" className="block text-sm font-medium text-gray-700 mb-2">
              Posts Per Page
            </label>
            <input
              type="number"
              id="posts_per_page"
              name="posts_per_page"
              value={settings.posts_per_page}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="date_format" className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select
              id="date_format"
              name="date_format"
              value={settings.date_format}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="DD MMM YYYY">DD MMM YYYY</option>
            </select>
          </div>

          <div>
            <label htmlFor="time_format" className="block text-sm font-medium text-gray-700 mb-2">
              Time Format
            </label>
            <select
              id="time_format"
              name="time_format"
              value={settings.time_format}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">24 Hour (18:30)</option>
              <option value="12h">12 Hour (6:30 PM)</option>
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Asia/Jakarta">WIB - Jakarta (UTC+7)</option>
              <option value="Asia/Makassar">WITA - Makassar (UTC+8)</option>
              <option value="Asia/Jayapura">WIT - Jayapura (UTC+9)</option>
              <option value="UTC">UTC (UTC+0)</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="maintenance_mode"
              name="maintenance_mode"
              checked={settings.maintenance_mode}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="maintenance_mode" className="ml-2 block text-sm text-gray-700">
              Enable Maintenance Mode
            </label>
          </div>
          {settings.maintenance_mode && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
              ⚠️ Site will show maintenance page to visitors. Admins can still access.
            </div>
          )}
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Changes are saved to the database.
        </p>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>
    </form>
  )
}
