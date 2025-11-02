/**
 * Theme System Types
 * Defines all interfaces for the CMS theme system
 */

export type ThemeStatus = 'active' | 'inactive';

/**
 * Color palette for theme
 */
export interface ThemeColors {
  // Primary colors
  primary: string
  primaryHover: string
  primaryLight: string
  primaryDark: string
  
  // Secondary colors
  secondary: string
  secondaryHover: string
  
  // Accent colors
  accent: string
  accentHover: string
  
  // Semantic colors
  success: string
  warning: string
  error: string
  info: string
  
  // Text colors
  textPrimary: string
  textSecondary: string
  textMuted: string
  
  // Background colors
  background: string
  backgroundAlt: string
  surface: string
  
  // Border colors
  border: string
  borderLight: string
  borderDark: string
}

/**
 * Typography settings
 */
export interface ThemeTypography {
  // Font families
  fontFamily: string
  headingFamily: string
  monoFamily: string
  
  // Font sizes
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
  }
  
  // Font weights
  fontWeight: {
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  
  // Line heights
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
  
  // Letter spacing
  letterSpacing: {
    tight: string
    normal: string
    wide: string
  }
}

/**
 * Spacing system
 */
export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

/**
 * Border radius settings
 */
export interface ThemeBorderRadius {
  none: string
  sm: string
  base: string
  md: string
  lg: string
  xl: string
  full: string
}

/**
 * Shadow settings
 */
export interface ThemeShadows {
  sm: string
  base: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
  none: string
}

/**
 * Breakpoints for responsive design
 */
export interface ThemeBreakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

/**
 * Layout settings
 */
export interface ThemeLayout {
  containerMaxWidth: string
  contentMaxWidth: string
  sidebarWidth: string
  headerHeight: string
  footerHeight: string
}

/**
 * Animation settings
 */
export interface ThemeAnimation {
  duration: {
    fast: string
    base: string
    slow: string
  }
  easing: {
    linear: string
    easeIn: string
    easeOut: string
    easeInOut: string
  }
}

/**
 * Custom CSS for advanced customization
 */
export interface ThemeCustomCSS {
  global?: string
  header?: string
  footer?: string
  sidebar?: string
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  colors: ThemeColors
  typography: ThemeTypography
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  shadows: ThemeShadows
  breakpoints: ThemeBreakpoints
  layout: ThemeLayout
  animation: ThemeAnimation
  customCSS?: ThemeCustomCSS
}

/**
 * Theme metadata
 */
export interface ThemeMetadata {
  id: string
  name: string
  version: string
  author: string
  description: string
  thumbnail?: string
  tags?: string[]
  parent?: string // Parent theme ID for child themes
}

/**
 * Complete theme definition
 */
export interface Theme {
  metadata: ThemeMetadata
  config: ThemeConfig
}

/**
 * Theme instance (saved in database)
 */
export interface ThemeInstance {
  id: string
  theme_id: string
  name: string
  status: ThemeStatus
  config: ThemeConfig
  customizations?: Partial<ThemeConfig>
  created_at: string
  updated_at: string
}

/**
 * Theme customization options for UI
 */
export interface ThemeCustomizationSection {
  id: string
  label: string
  description?: string
  fields: ThemeCustomizationField[]
}

export type ThemeCustomizationFieldType = 
  | 'color'
  | 'text'
  | 'number'
  | 'select'
  | 'toggle'
  | 'slider'
  | 'textarea'
  | 'font'

export interface ThemeCustomizationField {
  id: string
  label: string
  type: ThemeCustomizationFieldType
  value: any
  defaultValue: any
  description?: string
  options?: { value: string; label: string }[]
  min?: number
  max?: number
  step?: number
  unit?: string
  path: string // Path in ThemeConfig object (e.g., 'colors.primary')
}

/**
 * Theme preset
 */
export interface ThemePreset {
  id: string
  name: string
  description: string
  config: Partial<ThemeConfig>
}

/**
 * Theme event types
 */
export type ThemeEventType =
  | 'theme_activated'
  | 'theme_deactivated'
  | 'theme_installed'
  | 'theme_uninstalled'
  | 'theme_customized'
  | 'theme_reset'

/**
 * Theme event
 */
export interface ThemeEvent {
  type: ThemeEventType
  themeId: string
  data?: any
  timestamp: Date
}

/**
 * Theme event listener
 */
export type ThemeEventListener = (event: ThemeEvent) => void | Promise<void>
