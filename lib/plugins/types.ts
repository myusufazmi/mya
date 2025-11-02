/**
 * Plugin System Types
 * Defines all interfaces and types for the CMS plugin system
 */

export type PluginStatus = 'active' | 'inactive' | 'error';

export type PluginHookType =
  | 'before_save'
  | 'after_save'
  | 'before_render'
  | 'after_render'
  | 'before_delete'
  | 'after_delete'
  | 'on_activate'
  | 'on_deactivate';

/**
 * Plugin metadata and configuration
 */
export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  authorUrl?: string;
  pluginUrl?: string;
  icon?: string;
  tags?: string[];
  dependencies?: string[]; // Other plugin IDs this depends on
  minVersion?: string; // Minimum CMS version required
}

/**
 * Plugin settings schema
 */
export interface PluginSettings {
  [key: string]: any;
}

/**
 * Plugin hook callback function
 */
export type PluginHookCallback<T = any> = (
  data: T,
  context?: PluginHookContext
) => T | Promise<T>;

/**
 * Context passed to hook callbacks
 */
export interface PluginHookContext {
  pluginId: string;
  userId?: string;
  timestamp: Date;
  [key: string]: any;
}

/**
 * Hook registration
 */
export interface PluginHook {
  type: PluginHookType;
  callback: PluginHookCallback;
  priority?: number; // Lower number = higher priority (runs first)
}

/**
 * Admin menu item for plugin
 */
export interface PluginMenuItem {
  label: string;
  path: string;
  icon?: string;
  permission?: string;
  children?: PluginMenuItem[];
}

/**
 * Widget definition for plugin
 */
export interface PluginWidget {
  id: string;
  name: string;
  description?: string;
  component: React.ComponentType<any>;
  defaultSettings?: Record<string, any>;
}

/**
 * Block definition for page builder
 */
export interface PluginBlock {
  id: string;
  name: string;
  category: string;
  icon?: string;
  component: React.ComponentType<any>;
  defaultProps?: Record<string, any>;
  schema?: Record<string, any>; // JSON schema for props
}

/**
 * API endpoint definition
 */
export interface PluginApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  handler: (req: Request) => Promise<Response>;
  permission?: string;
}

/**
 * Complete plugin interface
 */
export interface Plugin {
  metadata: PluginMetadata;
  
  /**
   * Initialize plugin
   * Called when plugin is activated
   */
  initialize?: () => Promise<void> | void;
  
  /**
   * Cleanup plugin
   * Called when plugin is deactivated
   */
  cleanup?: () => Promise<void> | void;
  
  /**
   * Register hooks
   */
  hooks?: PluginHook[];
  
  /**
   * Admin menu items
   */
  menuItems?: PluginMenuItem[];
  
  /**
   * Widgets provided by plugin
   */
  widgets?: PluginWidget[];
  
  /**
   * Page builder blocks
   */
  blocks?: PluginBlock[];
  
  /**
   * API endpoints
   */
  apiEndpoints?: PluginApiEndpoint[];
  
  /**
   * Default settings
   */
  defaultSettings?: PluginSettings;
  
  /**
   * Settings panel component
   */
  settingsComponent?: React.ComponentType<{
    settings: PluginSettings;
    onSave: (settings: PluginSettings) => void;
  }>;
}

/**
 * Plugin instance (registered plugin)
 */
export interface PluginInstance {
  plugin: Plugin;
  status: PluginStatus;
  settings: PluginSettings;
  error?: string;
  installedAt: Date;
  updatedAt: Date;
}

/**
 * Plugin registry entry in database
 */
export interface PluginRegistryEntry {
  id: string;
  plugin_id: string;
  status: PluginStatus;
  settings: PluginSettings;
  version: string;
  installed_at: string;
  updated_at: string;
  error?: string;
}

/**
 * Plugin event types
 */
export type PluginEventType = 
  | 'plugin_activated'
  | 'plugin_deactivated'
  | 'plugin_installed'
  | 'plugin_uninstalled'
  | 'plugin_updated'
  | 'settings_changed';

/**
 * Plugin event
 */
export interface PluginEvent {
  type: PluginEventType;
  pluginId: string;
  data?: any;
  timestamp: Date;
}

/**
 * Plugin event listener
 */
export type PluginEventListener = (event: PluginEvent) => void | Promise<void>;
