/**
 * Plugin Hook System
 * Allows plugins to hook into various CMS events
 */

import { pluginManager } from './plugin-manager';
import type { PluginHookType, PluginHookCallback, PluginHookContext } from './types';

interface RegisteredHook {
  pluginId: string;
  callback: PluginHookCallback;
  priority: number;
}

class HookSystem {
  private static instance: HookSystem;
  private hooks: Map<PluginHookType, RegisteredHook[]> = new Map();

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): HookSystem {
    if (!HookSystem.instance) {
      HookSystem.instance = new HookSystem();
    }
    return HookSystem.instance;
  }

  /**
   * Register a hook
   */
  register(
    pluginId: string,
    type: PluginHookType,
    callback: PluginHookCallback,
    priority: number = 10
  ): void {
    if (!this.hooks.has(type)) {
      this.hooks.set(type, []);
    }

    const hooks = this.hooks.get(type)!;
    hooks.push({ pluginId, callback, priority });

    // Sort by priority (lower number = higher priority)
    hooks.sort((a, b) => a.priority - b.priority);

    console.log(`Hook registered: ${type} by ${pluginId} (priority: ${priority})`);
  }

  /**
   * Unregister all hooks for a plugin
   */
  unregister(pluginId: string): void {
    for (const [type, hooks] of this.hooks.entries()) {
      const filtered = hooks.filter((hook) => hook.pluginId !== pluginId);
      this.hooks.set(type, filtered);
    }
    console.log(`All hooks unregistered for plugin: ${pluginId}`);
  }

  /**
   * Execute hooks of a specific type
   * Passes data through each hook in priority order
   */
  async execute<T = any>(
    type: PluginHookType,
    data: T,
    context?: Partial<PluginHookContext>
  ): Promise<T> {
    const hooks = this.hooks.get(type);
    if (!hooks || hooks.length === 0) {
      return data;
    }

    let result = data;

    for (const hook of hooks) {
      // Check if plugin is still active
      if (!pluginManager.isActive(hook.pluginId)) {
        continue;
      }

      try {
        const fullContext: PluginHookContext = {
          pluginId: hook.pluginId,
          timestamp: new Date(),
          ...context,
        };

        result = await hook.callback(result, fullContext);
      } catch (error) {
        console.error(
          `Error executing hook ${type} from plugin ${hook.pluginId}:`,
          error
        );
        // Continue with other hooks even if one fails
      }
    }

    return result;
  }

  /**
   * Check if any hooks are registered for a type
   */
  hasHooks(type: PluginHookType): boolean {
    const hooks = this.hooks.get(type);
    return hooks !== undefined && hooks.length > 0;
  }

  /**
   * Get count of registered hooks for a type
   */
  getHookCount(type: PluginHookType): number {
    const hooks = this.hooks.get(type);
    return hooks?.length || 0;
  }

  /**
   * Get all registered hook types
   */
  getRegisteredTypes(): PluginHookType[] {
    return Array.from(this.hooks.keys());
  }

  /**
   * Clear all hooks (useful for testing)
   */
  clearAll(): void {
    this.hooks.clear();
  }
}

// Export singleton instance
export const hookSystem = HookSystem.getInstance();

/**
 * Convenience functions for common hooks
 */

export async function executeBeforeSave<T>(data: T, userId?: string): Promise<T> {
  return hookSystem.execute('before_save', data, { userId });
}

export async function executeAfterSave<T>(data: T, userId?: string): Promise<T> {
  return hookSystem.execute('after_save', data, { userId });
}

export async function executeBeforeRender<T>(data: T): Promise<T> {
  return hookSystem.execute('before_render', data);
}

export async function executeAfterRender<T>(data: T): Promise<T> {
  return hookSystem.execute('after_render', data);
}

export async function executeBeforeDelete<T>(data: T, userId?: string): Promise<T> {
  return hookSystem.execute('before_delete', data, { userId });
}

export async function executeAfterDelete<T>(data: T, userId?: string): Promise<T> {
  return hookSystem.execute('after_delete', data, { userId });
}

/**
 * Register plugin hooks
 * Called when a plugin is activated
 */
export function registerPluginHooks(pluginId: string): void {
  const plugin = pluginManager.getPlugin(pluginId);
  if (!plugin || !plugin.plugin.hooks) return;

  for (const hook of plugin.plugin.hooks) {
    hookSystem.register(
      pluginId,
      hook.type,
      hook.callback,
      hook.priority || 10
    );
  }
}

/**
 * Unregister plugin hooks
 * Called when a plugin is deactivated
 */
export function unregisterPluginHooks(pluginId: string): void {
  hookSystem.unregister(pluginId);
}
