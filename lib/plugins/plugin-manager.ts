/**
 * Plugin Manager
 * Core system for managing CMS plugins
 */

import { createClient } from '@/lib/supabase/client';
import type {
  Plugin,
  PluginInstance,
  PluginSettings,
  PluginStatus,
  PluginEvent,
  PluginEventListener,
  PluginEventType,
} from './types';

class PluginManager {
  private static instance: PluginManager;
  private plugins: Map<string, PluginInstance> = new Map();
  private eventListeners: Map<PluginEventType, Set<PluginEventListener>> = new Map();
  private initialized = false;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager();
    }
    return PluginManager.instance;
  }

  /**
   * Initialize plugin manager
   * Loads all plugins from database
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const supabase = createClient();
      const { data: pluginEntries, error } = await supabase
        .from('plugins')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;

      // Load active plugins
      // Note: In production, plugins would be dynamically imported
      // For now, we'll register them manually
      console.log('Plugin Manager initialized with', pluginEntries?.length || 0, 'active plugins');
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize plugin manager:', error);
      throw error;
    }
  }

  /**
   * Register a plugin
   */
  async register(plugin: Plugin): Promise<void> {
    const pluginId = plugin.metadata.id;

    // Check if already registered
    if (this.plugins.has(pluginId)) {
      console.warn(`Plugin ${pluginId} is already registered`);
      return;
    }

    // Check dependencies
    if (plugin.metadata.dependencies) {
      for (const depId of plugin.metadata.dependencies) {
        const dep = this.plugins.get(depId);
        if (!dep || dep.status !== 'active') {
          throw new Error(`Plugin ${pluginId} depends on ${depId} which is not active`);
        }
      }
    }

    // Create plugin instance
    const instance: PluginInstance = {
      plugin,
      status: 'inactive',
      settings: plugin.defaultSettings || {},
      installedAt: new Date(),
      updatedAt: new Date(),
    };

    this.plugins.set(pluginId, instance);

    // Save to database
    const supabase = createClient();
    const { error } = await supabase.from('plugins').upsert({
      plugin_id: pluginId,
      status: 'inactive',
      settings: instance.settings,
      version: plugin.metadata.version,
      installed_at: instance.installedAt.toISOString(),
      updated_at: instance.updatedAt.toISOString(),
    });

    if (error) {
      this.plugins.delete(pluginId);
      throw error;
    }

    await this.emitEvent({
      type: 'plugin_installed',
      pluginId,
      timestamp: new Date(),
    });
  }

  /**
   * Unregister a plugin
   */
  async unregister(pluginId: string): Promise<void> {
    const instance = this.plugins.get(pluginId);
    if (!instance) {
      throw new Error(`Plugin ${pluginId} is not registered`);
    }

    // Deactivate first if active
    if (instance.status === 'active') {
      await this.deactivate(pluginId);
    }

    // Remove from memory
    this.plugins.delete(pluginId);

    // Remove from database
    const supabase = createClient();
    const { error } = await supabase
      .from('plugins')
      .delete()
      .eq('plugin_id', pluginId);

    if (error) throw error;

    await this.emitEvent({
      type: 'plugin_uninstalled',
      pluginId,
      timestamp: new Date(),
    });
  }

  /**
   * Activate a plugin
   */
  async activate(pluginId: string): Promise<void> {
    const instance = this.plugins.get(pluginId);
    if (!instance) {
      throw new Error(`Plugin ${pluginId} is not registered`);
    }

    if (instance.status === 'active') {
      console.warn(`Plugin ${pluginId} is already active`);
      return;
    }

    try {
      // Call plugin's initialize method
      if (instance.plugin.initialize) {
        await instance.plugin.initialize();
      }

      instance.status = 'active';
      instance.updatedAt = new Date();

      // Update database
      const supabase = createClient();
      const { error } = await supabase
        .from('plugins')
        .update({
          status: 'active',
          updated_at: instance.updatedAt.toISOString(),
        })
        .eq('plugin_id', pluginId);

      if (error) throw error;

      await this.emitEvent({
        type: 'plugin_activated',
        pluginId,
        timestamp: new Date(),
      });

      console.log(`Plugin ${pluginId} activated successfully`);
    } catch (error) {
      instance.status = 'error';
      instance.error = error instanceof Error ? error.message : 'Unknown error';
      
      // Update database with error
      const supabase = createClient();
      await supabase
        .from('plugins')
        .update({
          status: 'error',
          error: instance.error,
          updated_at: new Date().toISOString(),
        })
        .eq('plugin_id', pluginId);

      throw error;
    }
  }

  /**
   * Deactivate a plugin
   */
  async deactivate(pluginId: string): Promise<void> {
    const instance = this.plugins.get(pluginId);
    if (!instance) {
      throw new Error(`Plugin ${pluginId} is not registered`);
    }

    if (instance.status === 'inactive') {
      console.warn(`Plugin ${pluginId} is already inactive`);
      return;
    }

    try {
      // Call plugin's cleanup method
      if (instance.plugin.cleanup) {
        await instance.plugin.cleanup();
      }

      instance.status = 'inactive';
      instance.updatedAt = new Date();
      instance.error = undefined;

      // Update database
      const supabase = createClient();
      const { error } = await supabase
        .from('plugins')
        .update({
          status: 'inactive',
          error: null,
          updated_at: instance.updatedAt.toISOString(),
        })
        .eq('plugin_id', pluginId);

      if (error) throw error;

      await this.emitEvent({
        type: 'plugin_deactivated',
        pluginId,
        timestamp: new Date(),
      });

      console.log(`Plugin ${pluginId} deactivated successfully`);
    } catch (error) {
      console.error(`Failed to deactivate plugin ${pluginId}:`, error);
      throw error;
    }
  }

  /**
   * Update plugin settings
   */
  async updateSettings(pluginId: string, settings: PluginSettings): Promise<void> {
    const instance = this.plugins.get(pluginId);
    if (!instance) {
      throw new Error(`Plugin ${pluginId} is not registered`);
    }

    instance.settings = { ...instance.settings, ...settings };
    instance.updatedAt = new Date();

    // Update database
    const supabase = createClient();
    const { error } = await supabase
      .from('plugins')
      .update({
        settings: instance.settings,
        updated_at: instance.updatedAt.toISOString(),
      })
      .eq('plugin_id', pluginId);

    if (error) throw error;

    await this.emitEvent({
      type: 'settings_changed',
      pluginId,
      data: settings,
      timestamp: new Date(),
    });
  }

  /**
   * Get plugin instance
   */
  getPlugin(pluginId: string): PluginInstance | undefined {
    return this.plugins.get(pluginId);
  }

  /**
   * Get all plugins
   */
  getAllPlugins(): PluginInstance[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Get active plugins
   */
  getActivePlugins(): PluginInstance[] {
    return Array.from(this.plugins.values()).filter(
      (instance) => instance.status === 'active'
    );
  }

  /**
   * Check if plugin is active
   */
  isActive(pluginId: string): boolean {
    const instance = this.plugins.get(pluginId);
    return instance?.status === 'active' || false;
  }

  /**
   * Get plugin settings
   */
  getSettings(pluginId: string): PluginSettings {
    const instance = this.plugins.get(pluginId);
    return instance?.settings || {};
  }

  /**
   * Add event listener
   */
  addEventListener(type: PluginEventType, listener: PluginEventListener): void {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, new Set());
    }
    this.eventListeners.get(type)!.add(listener);
  }

  /**
   * Remove event listener
   */
  removeEventListener(type: PluginEventType, listener: PluginEventListener): void {
    const listeners = this.eventListeners.get(type);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  /**
   * Emit plugin event
   */
  private async emitEvent(event: PluginEvent): Promise<void> {
    const listeners = this.eventListeners.get(event.type);
    if (!listeners) return;

    for (const listener of listeners) {
      try {
        await listener(event);
      } catch (error) {
        console.error(`Error in event listener for ${event.type}:`, error);
      }
    }
  }

  /**
   * Get all menu items from active plugins
   */
  getPluginMenuItems() {
    const menuItems: any[] = [];
    
    for (const instance of this.plugins.values()) {
      if (instance.status === 'active' && instance.plugin.menuItems) {
        menuItems.push(...instance.plugin.menuItems);
      }
    }
    
    return menuItems;
  }

  /**
   * Get all widgets from active plugins
   */
  getPluginWidgets() {
    const widgets: any[] = [];
    
    for (const instance of this.plugins.values()) {
      if (instance.status === 'active' && instance.plugin.widgets) {
        widgets.push(...instance.plugin.widgets);
      }
    }
    
    return widgets;
  }

  /**
   * Get all blocks from active plugins
   */
  getPluginBlocks() {
    const blocks: any[] = [];
    
    for (const instance of this.plugins.values()) {
      if (instance.status === 'active' && instance.plugin.blocks) {
        blocks.push(...instance.plugin.blocks);
      }
    }
    
    return blocks;
  }
}

// Export singleton instance
export const pluginManager = PluginManager.getInstance();
