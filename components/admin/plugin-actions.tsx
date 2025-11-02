'use client'

import { useState } from 'react'
import { Power, Trash2, Settings, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface PluginActionsProps {
  pluginId: string
  status: 'active' | 'inactive' | 'error'
  onSuccess?: () => void
}

export function PluginActions({ pluginId, status, onSuccess }: PluginActionsProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleToggle = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const newStatus = status === 'active' ? 'inactive' : 'active'
      
      const { error } = await supabase
        .from('plugins')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('plugin_id', pluginId)

      if (error) throw error

      onSuccess?.()
      router.refresh()
    } catch (error) {
      console.error('Failed to toggle plugin:', error)
      alert('Failed to update plugin status')
    } finally {
      setLoading(false)
    }
  }

  const handleUninstall = async () => {
    if (!confirm('Are you sure you want to uninstall this plugin?')) {
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('plugins')
        .delete()
        .eq('plugin_id', pluginId)

      if (error) throw error

      onSuccess?.()
      router.refresh()
    } catch (error) {
      console.error('Failed to uninstall plugin:', error)
      alert('Failed to uninstall plugin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          status === 'active'
            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Power className="h-4 w-4" />
        )}
        {status === 'active' ? 'Deactivate' : 'Activate'}
      </button>

      <button
        onClick={() => router.push(`/admin/plugins/${pluginId}/settings`)}
        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        title="Settings"
      >
        <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      <button
        onClick={handleUninstall}
        disabled={loading}
        className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
        title="Uninstall"
      >
        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
      </button>
    </div>
  )
}
