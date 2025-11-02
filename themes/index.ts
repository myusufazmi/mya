/**
 * Theme Registry
 * Registers all available themes
 */

import { themeManager } from '@/lib/theme/theme-manager'
import defaultTheme from './default'
import darkTheme from './dark'

/**
 * Register all themes
 */
export function registerThemes(): void {
  try {
    themeManager.register(defaultTheme)
    themeManager.register(darkTheme)
    
    console.log('All themes registered successfully')
  } catch (error) {
    console.error('Failed to register themes:', error)
  }
}

/**
 * Get all available themes
 */
export function getAvailableThemes() {
  return [defaultTheme, darkTheme]
}

// Export individual themes
export { defaultTheme, darkTheme }
