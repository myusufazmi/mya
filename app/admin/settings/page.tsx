import { createClient } from '@/lib/supabase/server'
import { SettingsForm } from '@/components/admin/settings-form'
import { Settings as SettingsIcon } from 'lucide-react'

export default async function SettingsPage() {
  const supabase = await createClient()
  
  // Fetch all settings
  const { data: settings } = await supabase
    .from('settings')
    .select('*')
    .order('key')

  // Convert to key-value object
  const settingsObj = settings?.reduce((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {} as Record<string, any>) || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure your site settings and preferences
          </p>
        </div>
        <SettingsIcon className="h-8 w-8 text-gray-400" />
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-lg border shadow-sm">
        <SettingsForm initialSettings={settingsObj} />
      </div>
    </div>
  )
}
