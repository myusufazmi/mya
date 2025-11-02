/**
 * Plugin Registry
 * Central registry for all available plugins
 */

import type { Plugin } from './types';

class PluginRegistry {
  private static instance: PluginRegistry;
  private availablePlugins: Map<string, Plugin> = new Map();

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): PluginRegistry {
    if (!PluginRegistry.instance) {
      PluginRegistry.instance = new PluginRegistry();
    }
    return PluginRegistry.instance;
  }

  /**
   * Add plugin to registry
   */
  add(plugin: Plugin): void {
    const pluginId = plugin.metadata.id;
    
    if (this.availablePlugins.has(pluginId)) {
      console.warn(`Plugin ${pluginId} is already in registry, updating...`);
    }

    this.availablePlugins.set(pluginId, plugin);
    console.log(`Plugin added to registry: ${plugin.metadata.name} (${pluginId})`);
  }

  /**
   * Remove plugin from registry
   */
  remove(pluginId: string): void {
    this.availablePlugins.delete(pluginId);
    console.log(`Plugin removed from registry: ${pluginId}`);
  }

  /**
   * Get plugin from registry
   */
  get(pluginId: string): Plugin | undefined {
    return this.availablePlugins.get(pluginId);
  }

  /**
   * Check if plugin exists in registry
   */
  has(pluginId: string): boolean {
    return this.availablePlugins.has(pluginId);
  }

  /**
   * Get all available plugins
   */
  getAll(): Plugin[] {
    return Array.from(this.availablePlugins.values());
  }

  /**
   * Get plugins by tag
   */
  getByTag(tag: string): Plugin[] {
    return Array.from(this.availablePlugins.values()).filter(
      (plugin) => plugin.metadata.tags?.includes(tag)
    );
  }

  /**
   * Search plugins by keyword
   */
  search(keyword: string): Plugin[] {
    const lowercaseKeyword = keyword.toLowerCase();
    
    return Array.from(this.availablePlugins.values()).filter((plugin) => {
      const metadata = plugin.metadata;
      return (
        metadata.name.toLowerCase().includes(lowercaseKeyword) ||
        metadata.description.toLowerCase().includes(lowercaseKeyword) ||
        metadata.tags?.some((tag) => tag.toLowerCase().includes(lowercaseKeyword))
      );
    });
  }

  /**
   * Get plugin count
   */
  count(): number {
    return this.availablePlugins.size;
  }

  /**
   * Clear registry
   */
  clear(): void {
    this.availablePlugins.clear();
  }

  /**
   * Validate plugin
   * Check if plugin meets minimum requirements
   */
  validate(plugin: Plugin): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required metadata
    if (!plugin.metadata.id) {
      errors.push('Plugin ID is required');
    }
    if (!plugin.metadata.name) {
      errors.push('Plugin name is required');
    }
    if (!plugin.metadata.version) {
      errors.push('Plugin version is required');
    }
    if (!plugin.metadata.author) {
      errors.push('Plugin author is required');
    }

    // ID format validation (alphanumeric, dash, underscore only)
    if (plugin.metadata.id && !/^[a-z0-9-_]+$/.test(plugin.metadata.id)) {
      errors.push('Plugin ID must contain only lowercase letters, numbers, dashes, and underscores');
    }

    // Version format validation (semver)
    if (plugin.metadata.version && !/^\d+\.\d+\.\d+/.test(plugin.metadata.version)) {
      errors.push('Plugin version must follow semantic versioning (e.g., 1.0.0)');
    }

    // Check for duplicate IDs
    if (this.availablePlugins.has(plugin.metadata.id)) {
      const existing = this.availablePlugins.get(plugin.metadata.id);
      if (existing !== plugin) {
        errors.push(`Plugin with ID "${plugin.metadata.id}" already exists`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const pluginRegistry = PluginRegistry.getInstance();

/**
 * Helper function to register a plugin
 */
export function registerPlugin(plugin: Plugin): void {
  const validation = pluginRegistry.validate(plugin);
  
  if (!validation.valid) {
    throw new Error(`Invalid plugin: ${validation.errors.join(', ')}`);
  }

  pluginRegistry.add(plugin);
}

/**
 * Helper function to get available plugins
 */
export function getAvailablePlugins(): Plugin[] {
  return pluginRegistry.getAll();
}

/**
 * Helper function to search plugins
 */
export function searchPlugins(keyword: string): Plugin[] {
  return pluginRegistry.search(keyword);
}
