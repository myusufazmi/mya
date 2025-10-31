# 🔌 Plugin Architecture - CMS System

## Overview
Sistem plugin yang modular dan extensible untuk menambahkan fitur-fitur baru ke CMS tanpa mengubah core code.

## Konsep Dasar

### Plugin Lifecycle
1. **Installation** - Plugin ditambahkan ke system
2. **Activation** - Plugin diaktifkan
3. **Execution** - Plugin berjalan dan hook dieksekusi
4. **Deactivation** - Plugin dinonaktifkan
5. **Uninstallation** - Plugin dihapus dari system

### Plugin Types
- **Core Plugins** - Plugin bawaan yang tidak bisa dihapus (blog, gallery)
- **Custom Plugins** - Plugin buatan user atau third-party

## Struktur Plugin

### Folder Structure
```
plugins/
├── example-plugin/
│   ├── index.ts              # Plugin definition & export
│   ├── plugin.config.ts      # Plugin configuration
│   ├── components/           # React components
│   │   ├── widget.tsx
│   │   └── settings-panel.tsx
│   ├── hooks/                # Custom React hooks
│   │   └── use-plugin-data.ts
│   ├── admin/                # Admin panel pages
│   │   └── dashboard.tsx
│   ├── api/                  # API handlers
│   │   └── handler.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── styles/               # Plugin styles
│   │   └── styles.css
│   ├── public/               # Public assets
│   │   └── icon.svg
│   └── README.md             # Plugin documentation
```

## Core Types

### Plugin Interface
```typescript
// lib/plugins/types.ts

export interface Plugin {
  // Basic info
  name: string;                    // Unique identifier (kebab-case)
  displayName: string;             // Display name
  version: string;                 // Semantic version
  description: string;             // Description
  author: string;                  // Author name
  icon?: string;                   // Icon URL or component
  
  // Dependencies
  dependencies?: string[];         // Required plugin names
  requires?: {                     // Minimum versions
    nextjs?: string;
    react?: string;
  };
  
  // Lifecycle hooks
  onInstall?: () => Promise<void>;
  onActivate?: () => Promise<void>;
  onDeactivate?: () => Promise<void>;
  onUninstall?: () => Promise<void>;
  
  // Plugin hooks
  hooks?: {
    [hookName: string]: HookCallback;
  };
  
  // Settings
  settingsSchema?: SettingsSchema;
  defaultSettings?: Record<string, any>;
  
  // Admin routes
  adminRoutes?: PluginRoute[];
  
  // Components
  components?: {
    [key: string]: React.ComponentType<any>;
  };
  
  // Widgets (for page builder)
  widgets?: PluginWidget[];
  
  // Menu items (for admin sidebar)
  menuItems?: PluginMenuItem[];
}

export type HookCallback = (data: any, context: HookContext) => any | Promise<any>;

export interface HookContext {
  user?: User;
  plugin: Plugin;
  [key: string]: any;
}

export interface PluginRoute {
  path: string;
  component: React.ComponentType;
  label: string;
  icon?: string;
}

export interface PluginWidget {
  name: string;
  displayName: string;
  category: string;
  icon?: string;
  component: React.ComponentType<WidgetProps>;
  settingsComponent?: React.ComponentType<WidgetSettingsProps>;
  defaultProps?: Record<string, any>;
}

export interface PluginMenuItem {
  label: string;
  href: string;
  icon?: string;
  position?: number;
  permission?: string;
}

export interface SettingsSchema {
  [key: string]: SettingField;
}

export interface SettingField {
  type: 'text' | 'number' | 'boolean' | 'select' | 'textarea' | 'json' | 'color' | 'image';
  label: string;
  description?: string;
  default?: any;
  required?: boolean;
  options?: Array<{ label: string; value: any }>;
  validation?: (value: any) => boolean | string;
}
```

## Plugin Manager

### Core Implementation
```typescript
// lib/plugins/plugin-manager.ts

import { Plugin, HookCallback } from './types';

class PluginManager {
  private static instance: PluginManager;
  private plugins: Map<string, Plugin> = new Map();
  private hooks: Map<string, Array<{ plugin: string; callback: HookCallback; priority: number }>> = new Map();
  
  private constructor() {}
  
  static getInstance(): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager();
    }
    return PluginManager.instance;
  }
  
  /**
   * Register a plugin
   */
  registerPlugin(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin ${plugin.name} already registered`);
    }
    
    // Check dependencies
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        if (!this.plugins.has(dep)) {
          throw new Error(`Plugin ${plugin.name} requires ${dep}`);
        }
      }
    }
    
    this.plugins.set(plugin.name, plugin);
    
    // Register hooks
    if (plugin.hooks) {
      Object.entries(plugin.hooks).forEach(([hookName, callback]) => {
        this.registerHook(hookName, plugin.name, callback);
      });
    }
    
    console.log(`Plugin ${plugin.name} registered`);
  }
  
  /**
   * Activate a plugin
   */
  async activatePlugin(name: string): Promise<void> {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      throw new Error(`Plugin ${name} not found`);
    }
    
    if (plugin.onActivate) {
      await plugin.onActivate();
    }
    
    // Update database
    await this.updatePluginStatus(name, true);
    
    console.log(`Plugin ${name} activated`);
  }
  
  /**
   * Deactivate a plugin
   */
  async deactivatePlugin(name: string): Promise<void> {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      throw new Error(`Plugin ${name} not found`);
    }
    
    if (plugin.onDeactivate) {
      await plugin.onDeactivate();
    }
    
    // Update database
    await this.updatePluginStatus(name, false);
    
    console.log(`Plugin ${name} deactivated`);
  }
  
  /**
   * Register a hook
   */
  registerHook(hookName: string, pluginName: string, callback: HookCallback, priority: number = 10): void {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }
    
    const hooks = this.hooks.get(hookName)!;
    hooks.push({ plugin: pluginName, callback, priority });
    
    // Sort by priority (lower number = higher priority)
    hooks.sort((a, b) => a.priority - b.priority);
  }
  
  /**
   * Execute a hook
   */
  async executeHook(hookName: string, data: any, context?: any): Promise<any> {
    const hooks = this.hooks.get(hookName);
    if (!hooks || hooks.length === 0) {
      return data;
    }
    
    let result = data;
    
    for (const { plugin, callback } of hooks) {
      const pluginInstance = this.plugins.get(plugin);
      if (!pluginInstance) continue;
      
      const hookContext = {
        ...context,
        plugin: pluginInstance,
      };
      
      try {
        result = await callback(result, hookContext);
      } catch (error) {
        console.error(`Error executing hook ${hookName} in plugin ${plugin}:`, error);
      }
    }
    
    return result;
  }
  
  /**
   * Get plugin by name
   */
  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }
  
  /**
   * Get all plugins
   */
  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }
  
  /**
   * Get active plugins
   */
  async getActivePlugins(): Promise<Plugin[]> {
    const activePluginNames = await this.getActivePluginNames();
    return activePluginNames
      .map(name => this.plugins.get(name))
      .filter((p): p is Plugin => p !== undefined);
  }
  
  private async updatePluginStatus(name: string, isActive: boolean): Promise<void> {
    // Update in database via Supabase
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    
    await supabase
      .from('plugins')
      .update({ is_active: isActive })
      .eq('name', name);
  }
  
  private async getActivePluginNames(): Promise<string[]> {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    
    const { data } = await supabase
      .from('plugins')
      .select('name')
      .eq('is_active', true);
    
    return data?.map(p => p.name) || [];
  }
}

export const pluginManager = PluginManager.getInstance();
```

## Available Hooks

### Content Hooks
- `before_page_save` - Before saving a page
- `after_page_save` - After saving a page
- `before_page_render` - Before rendering a page
- `after_page_render` - After rendering a page
- `before_post_save` - Before saving a post
- `after_post_save` - After saving a post
- `before_post_render` - Before rendering a post
- `after_post_render` - After rendering a post

### Admin Hooks
- `admin_menu` - Modify admin menu
- `admin_dashboard_widgets` - Add dashboard widgets
- `admin_header` - Modify admin header

### Theme Hooks
- `theme_settings` - Add theme settings
- `before_theme_render` - Before theme renders
- `after_theme_render` - After theme renders

### Media Hooks
- `before_media_upload` - Before uploading media
- `after_media_upload` - After uploading media
- `media_url_filter` - Filter media URLs

### User Hooks
- `user_login` - After user login
- `user_logout` - After user logout
- `user_register` - After user registration

## Example Plugins

### 1. Blog Plugin
```typescript
// plugins/blog/index.ts

import { Plugin } from '@/lib/plugins/types';
import BlogWidget from './components/blog-widget';
import BlogSettings from './admin/settings';
import PostsPage from './admin/posts';

export const blogPlugin: Plugin = {
  name: 'blog',
  displayName: 'Blog',
  version: '1.0.0',
  description: 'Full-featured blog with posts, categories, and tags',
  author: 'CMS Team',
  icon: 'FileText',
  
  // Core plugin cannot be deactivated
  
  onActivate: async () => {
    console.log('Blog plugin activated');
  },
  
  hooks: {
    'admin_menu': (menu) => {
      menu.push({
        label: 'Posts',
        href: '/admin/posts',
        icon: 'FileText',
        position: 2,
      });
      return menu;
    },
    
    'admin_dashboard_widgets': (widgets) => {
      widgets.push({
        id: 'recent-posts',
        component: BlogWidget,
      });
      return widgets;
    },
    
    'after_post_save': async (post, context) => {
      // Clear cache, send notifications, etc.
      console.log('Post saved:', post.title);
      return post;
    },
  },
  
  adminRoutes: [
    {
      path: '/admin/posts',
      component: PostsPage,
      label: 'Posts',
      icon: 'FileText',
    },
    {
      path: '/admin/blog/settings',
      component: BlogSettings,
      label: 'Blog Settings',
    },
  ],
  
  widgets: [
    {
      name: 'blog-posts',
      displayName: 'Blog Posts',
      category: 'content',
      icon: 'FileText',
      component: BlogWidget,
      defaultProps: {
        limit: 5,
        showExcerpt: true,
      },
    },
  ],
  
  settingsSchema: {
    postsPerPage: {
      type: 'number',
      label: 'Posts Per Page',
      default: 10,
      required: true,
    },
    enableComments: {
      type: 'boolean',
      label: 'Enable Comments',
      default: true,
    },
    commentModeration: {
      type: 'boolean',
      label: 'Moderate Comments',
      default: true,
    },
  },
};
```

### 2. Contact Form Plugin
```typescript
// plugins/contact-form/index.ts

import { Plugin } from '@/lib/plugins/types';
import ContactFormWidget from './components/contact-form-widget';
import SubmissionsPage from './admin/submissions';

export const contactFormPlugin: Plugin = {
  name: 'contact-form',
  displayName: 'Contact Form',
  version: '1.0.0',
  description: 'Add contact forms to your pages',
  author: 'CMS Team',
  icon: 'Mail',
  
  onInstall: async () => {
    // Create submissions table
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    
    // SQL to create table
    // (This would be handled by migrations in production)
  },
  
  hooks: {
    'admin_menu': (menu) => {
      menu.push({
        label: 'Form Submissions',
        href: '/admin/submissions',
        icon: 'Mail',
        position: 10,
      });
      return menu;
    },
  },
  
  adminRoutes: [
    {
      path: '/admin/submissions',
      component: SubmissionsPage,
      label: 'Submissions',
      icon: 'Mail',
    },
  ],
  
  widgets: [
    {
      name: 'contact-form',
      displayName: 'Contact Form',
      category: 'forms',
      icon: 'Mail',
      component: ContactFormWidget,
      defaultProps: {
        fields: ['name', 'email', 'message'],
        submitButtonText: 'Send',
      },
    },
  ],
  
  settingsSchema: {
    recipientEmail: {
      type: 'text',
      label: 'Recipient Email',
      description: 'Email to receive form submissions',
      required: true,
    },
    enableRecaptcha: {
      type: 'boolean',
      label: 'Enable reCAPTCHA',
      default: false,
    },
    recaptchaSiteKey: {
      type: 'text',
      label: 'reCAPTCHA Site Key',
    },
  },
};
```

### 3. Gallery Plugin
```typescript
// plugins/gallery/index.ts

import { Plugin } from '@/lib/plugins/types';
import GalleryWidget from './components/gallery-widget';
import GallerySettings from './admin/settings';

export const galleryPlugin: Plugin = {
  name: 'gallery',
  displayName: 'Gallery',
  version: '1.0.0',
  description: 'Image gallery with lightbox',
  author: 'CMS Team',
  icon: 'Image',
  
  widgets: [
    {
      name: 'image-gallery',
      displayName: 'Image Gallery',
      category: 'media',
      icon: 'Image',
      component: GalleryWidget,
      defaultProps: {
        columns: 3,
        gap: 4,
        lightbox: true,
      },
    },
  ],
  
  hooks: {
    'after_media_upload': async (media, context) => {
      // Generate thumbnails
      console.log('Media uploaded:', media.filename);
      return media;
    },
  },
  
  adminRoutes: [
    {
      path: '/admin/gallery/settings',
      component: GallerySettings,
      label: 'Gallery Settings',
    },
  ],
  
  settingsSchema: {
    defaultColumns: {
      type: 'number',
      label: 'Default Columns',
      default: 3,
    },
    lightboxEnabled: {
      type: 'boolean',
      label: 'Enable Lightbox',
      default: true,
    },
    thumbnailSize: {
      type: 'select',
      label: 'Thumbnail Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      default: 'medium',
    },
  },
};
```

## Plugin Registration

### Load All Plugins
```typescript
// lib/plugins/registry.ts

import { pluginManager } from './plugin-manager';
import { blogPlugin } from '@/plugins/blog';
import { galleryPlugin } from '@/plugins/gallery';
import { contactFormPlugin } from '@/plugins/contact-form';

export async function initializePlugins() {
  // Register core plugins
  pluginManager.registerPlugin(blogPlugin);
  pluginManager.registerPlugin(galleryPlugin);
  pluginManager.registerPlugin(contactFormPlugin);
  
  // Load custom plugins from database
  const customPlugins = await loadCustomPlugins();
  customPlugins.forEach(plugin => {
    pluginManager.registerPlugin(plugin);
  });
  
  console.log('All plugins initialized');
}

async function loadCustomPlugins() {
  // Load from database or file system
  return [];
}
```

### Initialize in App
```typescript
// app/layout.tsx

import { initializePlugins } from '@/lib/plugins/registry';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await initializePlugins();
  
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Plugin Context & Hooks

### Use Plugin Hook
```typescript
// components/page-builder/block-renderer.tsx

import { pluginManager } from '@/lib/plugins/plugin-manager';

export async function renderPage(page: Page) {
  // Execute before_page_render hook
  const modifiedPage = await pluginManager.executeHook('before_page_render', page);
  
  // Render blocks
  const rendered = renderBlocks(modifiedPage.content);
  
  // Execute after_page_render hook
  const finalOutput = await pluginManager.executeHook('after_page_render', rendered);
  
  return finalOutput;
}
```

## Plugin Development Guide

### Creating a New Plugin

1. **Create folder structure**
```bash
mkdir -p plugins/my-plugin/{components,admin,hooks,api,types}
```

2. **Define plugin in index.ts**
```typescript
export const myPlugin: Plugin = {
  name: 'my-plugin',
  displayName: 'My Plugin',
  // ... rest of config
};
```

3. **Register plugin**
```typescript
// lib/plugins/registry.ts
import { myPlugin } from '@/plugins/my-plugin';
pluginManager.registerPlugin(myPlugin);
```

4. **Add to database**
```sql
INSERT INTO plugins (name, display_name, description, version, author, is_core)
VALUES ('my-plugin', 'My Plugin', 'Description', '1.0.0', 'Author', false);
```

### Best Practices

1. **Always handle errors** in hook callbacks
2. **Use TypeScript** for type safety
3. **Document your plugin** with README.md
4. **Version your plugin** using semantic versioning
5. **Test thoroughly** before deployment
6. **Minimize dependencies** to reduce conflicts
7. **Use async/await** for database operations
8. **Clean up** on deactivation/uninstallation

## Plugin API Reference

Dokumentasi lengkap API ada di `/docs/plugin-api.md`
