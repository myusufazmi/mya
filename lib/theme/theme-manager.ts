/**
 * Theme Manager
 * Core system for managing CMS themes
 */

import { createClient } from '@/lib/supabase/client'
import type {
  Theme,
  ThemeInstance,
  ThemeConfig,
  ThemeStatus,
  ThemeEvent,
  ThemeEventListener,
  ThemeEventType,
} from './types'

class ThemeManager {
  private static instance: ThemeManager
  private themes: Map<string, Theme> = new Map()
  private activeTheme: ThemeInstance | null = null
  private eventListeners: Map<ThemeEventType, Set<ThemeEventListener>> = new Map()
  private initialized = false

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager()
    }
    return ThemeManager.instance
  }

  /**
   * Initialize theme manager
   */
  async initialize(): Promise<void> {
    if (this.initialized) return

    try {
      const supabase = createClient()
      
      // Get active theme from database
      const { data: activeTheme, error } = await supabase
        .from('themes')
        .select('*')
        .eq('status', 'active')
        .single()

      if (error && error.code !== 'PGRST116') { // Ignore "no rows" error
        throw error
      }

      if (activeTheme) {
        this.activeTheme = activeTheme as ThemeInstance
        this.applyTheme(activeTheme.config)
      }

      this.initialized = true
      console.log('Theme Manager initialized')
    } catch (error) {
      console.error('Failed to initialize theme manager:', error)
      throw error
    }
  }

  /**
   * Register a theme
   */
  register(theme: Theme): void {
    const themeId = theme.metadata.id

    if (this.themes.has(themeId)) {
      console.warn(`Theme ${themeId} is already registered`)
      return
    }

    this.themes.set(themeId, theme)
    console.log(`Theme registered: ${theme.metadata.name} (${themeId})`)
  }

  /**
   * Get registered theme
   */
  getTheme(themeId: string): Theme | undefined {
    return this.themes.get(themeId)
  }

  /**
   * Get all registered themes
   */
  getAllThemes(): Theme[] {
    return Array.from(this.themes.values())
  }

  /**
   * Get active theme
   */
  getActiveTheme(): ThemeInstance | null {
    return this.activeTheme
  }

  /**
   * Install a theme
   */
  async install(themeId: string): Promise<void> {
    const theme = this.themes.get(themeId)
    if (!theme) {
      throw new Error(`Theme ${themeId} is not registered`)
    }

    const supabase = createClient()

    // Check if already installed
    const { data: existing } = await supabase
      .from('themes')
      .select('id')
      .eq('theme_id', themeId)
      .single()

    if (existing) {
      throw new Error(`Theme ${themeId} is already installed`)
    }

    // Install theme
    const { error } = await supabase
      .from('themes')
      .insert({
        theme_id: themeId,
        name: theme.metadata.name,
        status: 'inactive',
        config: theme.config,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (error) throw error

    await this.emitEvent({
      type: 'theme_installed',
      themeId,
      timestamp: new Date(),
    })

    console.log(`Theme ${themeId} installed successfully`)
  }

  /**
   * Uninstall a theme
   */
  async uninstall(themeId: string): Promise<void> {
    // Can't uninstall active theme
    if (this.activeTheme?.theme_id === themeId) {
      throw new Error('Cannot uninstall active theme')
    }

    const supabase = createClient()

    const { error } = await supabase
      .from('themes')
      .delete()
      .eq('theme_id', themeId)

    if (error) throw error

    await this.emitEvent({
      type: 'theme_uninstalled',
      themeId,
      timestamp: new Date(),
    })

    console.log(`Theme ${themeId} uninstalled successfully`)
  }

  /**
   * Activate a theme
   */
  async activate(themeId: string): Promise<void> {
    const supabase = createClient()

    // Get theme from database
    const { data: theme, error: fetchError } = await supabase
      .from('themes')
      .select('*')
      .eq('theme_id', themeId)
      .single()

    if (fetchError) throw fetchError
    if (!theme) throw new Error(`Theme ${themeId} not found`)

    // Deactivate current active theme
    if (this.activeTheme) {
      await supabase
        .from('themes')
        .update({ status: 'inactive', updated_at: new Date().toISOString() })
        .eq('id', this.activeTheme.id)
    }

    // Activate new theme
    const { error: updateError } = await supabase
      .from('themes')
      .update({ status: 'active', updated_at: new Date().toISOString() })
      .eq('id', theme.id)

    if (updateError) throw updateError

    // Apply theme
    this.activeTheme = theme as ThemeInstance
    this.applyTheme(theme.config)

    await this.emitEvent({
      type: 'theme_activated',
      themeId,
      timestamp: new Date(),
    })

    console.log(`Theme ${themeId} activated successfully`)
  }

  /**
   * Customize active theme
   */
  async customize(customizations: Partial<ThemeConfig>): Promise<void> {
    if (!this.activeTheme) {
      throw new Error('No active theme')
    }

    const supabase = createClient()

    // Merge customizations with existing config
    const updatedConfig = this.mergeConfig(
      this.activeTheme.config,
      customizations
    )

    // Update database
    const { error } = await supabase
      .from('themes')
      .update({
        config: updatedConfig,
        customizations,
        updated_at: new Date().toISOString(),
      })
      .eq('id', this.activeTheme.id)

    if (error) throw error

    // Update local state
    this.activeTheme.config = updatedConfig
    this.activeTheme.customizations = customizations

    // Apply updated theme
    this.applyTheme(updatedConfig)

    await this.emitEvent({
      type: 'theme_customized',
      themeId: this.activeTheme.theme_id,
      data: customizations,
      timestamp: new Date(),
    })

    console.log('Theme customized successfully')
  }

  /**
   * Reset theme to defaults
   */
  async reset(themeId: string): Promise<void> {
    const theme = this.themes.get(themeId)
    if (!theme) {
      throw new Error(`Theme ${themeId} is not registered`)
    }

    const supabase = createClient()

    const { error } = await supabase
      .from('themes')
      .update({
        config: theme.config,
        customizations: null,
        updated_at: new Date().toISOString(),
      })
      .eq('theme_id', themeId)

    if (error) throw error

    // If this is the active theme, reapply
    if (this.activeTheme?.theme_id === themeId) {
      this.activeTheme.config = theme.config
      this.activeTheme.customizations = undefined
      this.applyTheme(theme.config)
    }

    await this.emitEvent({
      type: 'theme_reset',
      themeId,
      timestamp: new Date(),
    })

    console.log(`Theme ${themeId} reset to defaults`)
  }

  /**
   * Apply theme to document
   */
  private applyTheme(config: ThemeConfig): void {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Apply colors
    Object.entries(config.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${this.camelToKebab(key)}`, value)
    })

    // Apply typography
    root.style.setProperty('--theme-font-family', config.typography.fontFamily)
    root.style.setProperty('--theme-heading-family', config.typography.headingFamily)

    // Apply spacing, shadows, etc.
    // Additional CSS variables can be added here

    console.log('Theme applied to document')
  }

  /**
   * Merge theme configurations
   */
  private mergeConfig(
    base: ThemeConfig,
    customizations: Partial<ThemeConfig>
  ): ThemeConfig {
    return {
      ...base,
      colors: { ...base.colors, ...customizations.colors },
      typography: { ...base.typography, ...customizations.typography },
      spacing: { ...base.spacing, ...customizations.spacing },
      borderRadius: { ...base.borderRadius, ...customizations.borderRadius },
      shadows: { ...base.shadows, ...customizations.shadows },
      breakpoints: { ...base.breakpoints, ...customizations.breakpoints },
      layout: { ...base.layout, ...customizations.layout },
      animation: { ...base.animation, ...customizations.animation },
      customCSS: { ...base.customCSS, ...customizations.customCSS },
    }
  }

  /**
   * Convert camelCase to kebab-case
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  }

  /**
   * Generate CSS from theme config
   */
  generateCSS(config: ThemeConfig): string {
    let css = ':root {\n'

    // Colors
    Object.entries(config.colors).forEach(([key, value]) => {
      css += `  --theme-${this.camelToKebab(key)}: ${value};\n`
    })

    // Typography
    css += `  --theme-font-family: ${config.typography.fontFamily};\n`
    css += `  --theme-heading-family: ${config.typography.headingFamily};\n`

    css += '}\n'

    // Custom CSS
    if (config.customCSS?.global) {
      css += '\n' + config.customCSS.global
    }

    return css
  }

  /**
   * Add event listener
   */
  addEventListener(type: ThemeEventType, listener: ThemeEventListener): void {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, new Set())
    }
    this.eventListeners.get(type)!.add(listener)
  }

  /**
   * Remove event listener
   */
  removeEventListener(type: ThemeEventType, listener: ThemeEventListener): void {
    const listeners = this.eventListeners.get(type)
    if (listeners) {
      listeners.delete(listener)
    }
  }

  /**
   * Emit theme event
   */
  private async emitEvent(event: ThemeEvent): Promise<void> {
    const listeners = this.eventListeners.get(event.type)
    if (!listeners) return

    for (const listener of listeners) {
      try {
        await listener(event)
      } catch (error) {
        console.error(`Error in event listener for ${event.type}:`, error)
      }
    }
  }
}

// Export singleton instance
export const themeManager = ThemeManager.getInstance()
