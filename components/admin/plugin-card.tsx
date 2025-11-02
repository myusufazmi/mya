'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Settings, Power, Trash2, GraduationCap, ShoppingCart, TrendingUp, Puzzle } from 'lucide-react'

interface PluginCardProps {
  plugin: any
  installed?: boolean
}

export function PluginCard({ plugin, installed = false }: PluginCardProps) {
  const router = useRouter()
  const [updating, setUpdating] = useState(false)

  const handleToggleActive = async () => {
    setUpdating(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('plugins')
      .update({ is_active: !plugin.is_active })
      .eq('id', plugin.id)

    if (error) {
      console.error('Error toggling plugin:', error)
      alert('Failed to toggle plugin')
    } else {
      router.refresh()
    }
    setUpdating(false)
  }

  const handleUninstall = async () => {
    if (!confirm(`Uninstall ${plugin.name}? This action cannot be undone.`)) {
      return
    }

    setUpdating(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('plugins')
      .delete()
      .eq('id', plugin.id)

    if (error) {
      console.error('Error uninstalling plugin:', error)
      alert('Failed to uninstall plugin')
      setUpdating(false)
      return
    }

    router.refresh()
  }

  const getIcon = (category: string) => {
    switch (category) {
      case 'school':
        return <GraduationCap className="h-6 w-6 text-blue-600" />
      case 'ecommerce':
        return <ShoppingCart className="h-6 w-6 text-blue-600" />
      case 'utility':
        return <TrendingUp className="h-6 w-6 text-blue-600" />
      default:
        return <Puzzle className="h-6 w-6 text-blue-600" />
    }
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border-2 p-6 transition ${
        plugin.is_active
          ? 'border-green-300 dark:border-green-700'
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          {getIcon(plugin.category)}
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded-full capitalize ${
              plugin.is_active
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            {plugin.is_active ? 'Active' : 'Inactive'}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
            {plugin.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {plugin.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {plugin.description}
      </p>

      {/* Version */}
      <div className="text-xs text-gray-500 dark:text-gray-500 mb-4">
        Version {plugin.version}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleToggleActive}
          disabled={updating}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition disabled:opacity-50 ${
            plugin.is_active
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <Power className="h-4 w-4" />
          <span>{plugin.is_active ? 'Deactivate' : 'Activate'}</span>
        </button>
        
        <Link
          href={`/admin/plugins/${plugin.plugin_id}/settings`}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          title="Settings"
        >
          <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </Link>
        
        <button
          onClick={handleUninstall}
          disabled={updating}
          className="p-2 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
          title="Uninstall"
        >
          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
        </button>
      </div>
    </div>
  )
}
