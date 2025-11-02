import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Puzzle, Download, BookOpen, Image, Mail } from 'lucide-react'
import { PluginCard } from '@/components/admin/plugin-card'
import { pluginRegistry } from '@/lib/plugins/registry'
import { getCorePlugins } from '@/plugins'

export default async function PluginsPage() {
  const supabase = await createClient()
  
  // Fetch installed plugins from database
  const { data: installedPlugins, error } = await supabase
    .from('plugins')
    .select('*')
    .order('installed_at', { ascending: false })

  // Get available plugins from registry
  const corePlugins = getCorePlugins()
  
  const stats = {
    total: installedPlugins?.length || 0,
    active: installedPlugins?.filter(p => p.status === 'active').length || 0,
    inactive: installedPlugins?.filter(p => p.status === 'inactive').length || 0,
  }

  // Filter out installed plugins from available list
  const installedIds = new Set(installedPlugins?.map(p => p.plugin_id) || [])
  const availablePlugins = corePlugins.filter(plugin => !installedIds.has(plugin.metadata.id))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Plugins</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Extend your CMS with powerful plugins
          </p>
        </div>
        <Link
          href="/admin/plugins/marketplace"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Download className="h-5 w-5" />
          <span>Browse Marketplace</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Plugins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <Puzzle className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.inactive}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Installed Plugins */}
      {installedPlugins && installedPlugins.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Installed Plugins
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installedPlugins.map((plugin) => (
              <PluginCard key={plugin.id} plugin={plugin} installed />
            ))}
          </div>
        </div>
      )}

      {/* Available Plugins */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Available Core Plugins
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availablePlugins.map((plugin) => {
            const Icon = plugin.metadata.icon === 'BookOpen' ? BookOpen : 
                        plugin.metadata.icon === 'Image' ? Image : Mail
            const tags = plugin.metadata.tags || []
            
            return (
              <div
                key={plugin.metadata.id}
                className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition"
              >
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  {tags.length > 0 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
                      {tags[0]}
                    </span>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {plugin.metadata.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plugin.metadata.description}
                </p>

                {/* Tags */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {tags.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        +{tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Version & Author */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
                  <span>v{plugin.metadata.version}</span>
                  <span>{plugin.metadata.author}</span>
                </div>

                {/* Install Button */}
                <Link
                  href={`/admin/plugins/install/${plugin.metadata.id}`}
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Install Plugin
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Empty State */}
      {(!installedPlugins || installedPlugins.length === 0) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Puzzle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No plugins installed yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Install your first plugin to extend CMS functionality
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {availablePlugins.length} core plugins available
          </div>
        </div>
      )}
    </div>
  )
}
