/**
 * Core Plugins Registry
 * Automatically registers all core plugins
 */

import { pluginRegistry } from '@/lib/plugins/registry';
import blogPlugin from './blog';
import galleryPlugin from './gallery';
import contactFormPlugin from './contact-form';

/**
 * Register all core plugins
 */
export function registerCorePlugins(): void {
  try {
    pluginRegistry.add(blogPlugin);
    pluginRegistry.add(galleryPlugin);
    pluginRegistry.add(contactFormPlugin);
    
    console.log('Core plugins registered successfully');
  } catch (error) {
    console.error('Failed to register core plugins:', error);
  }
}

/**
 * Get all core plugins
 */
export function getCorePlugins() {
  return [blogPlugin, galleryPlugin, contactFormPlugin];
}

// Export individual plugins
export { blogPlugin, galleryPlugin, contactFormPlugin };
