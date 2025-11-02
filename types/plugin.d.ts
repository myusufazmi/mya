export interface PluginMetadata {
  id: string
  name: string
  version: string
  author: string
  description: string
  category: 'school' | 'ecommerce' | 'content' | 'utility' | 'integration'
  icon?: string
  homepage?: string
  repository?: string
  license?: string
  requires?: string[] // Required plugins
  screenshots?: string[]
}

export interface PluginSettings {
  [key: string]: any
}

export interface PluginRoute {
  path: string
  component: string
  title: string
  icon?: string
  adminOnly?: boolean
}

export interface PluginHook {
  name: string
  callback: (...args: any[]) => any | Promise<any>
  priority?: number
}

export interface PluginDatabase {
  tables: {
    name: string
    schema: string
  }[]
}

export interface Plugin {
  metadata: PluginMetadata
  settings?: PluginSettings
  routes?: PluginRoute[]
  hooks?: PluginHook[]
  database?: PluginDatabase
  onActivate?: () => void | Promise<void>
  onDeactivate?: () => void | Promise<void>
  onUninstall?: () => void | Promise<void>
}

export interface InstalledPlugin {
  id: string
  plugin_id: string
  name: string
  version: string
  category: string
  description: string
  is_active: boolean
  settings: PluginSettings
  installed_at: string
  updated_at: string
}

export interface PluginConfig {
  enabled: string[] // Active plugin IDs
  settings: {
    [pluginId: string]: PluginSettings
  }
}
