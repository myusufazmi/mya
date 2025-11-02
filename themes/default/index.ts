/**
 * Default Theme
 * Clean, modern theme for the CMS
 */

import { Theme } from '@/lib/theme/types'

export const defaultTheme: Theme = {
  metadata: {
    id: 'default',
    name: 'Default Theme',
    version: '1.0.0',
    author: 'CMS Team',
    description: 'Clean and modern default theme with professional design',
    tags: ['default', 'modern', 'clean'],
  },
  
  config: {
    colors: {
      // Primary colors (Blue)
      primary: '#3B82F6',
      primaryHover: '#2563EB',
      primaryLight: '#DBEAFE',
      primaryDark: '#1E40AF',
      
      // Secondary colors (Gray)
      secondary: '#6B7280',
      secondaryHover: '#4B5563',
      
      // Accent colors (Indigo)
      accent: '#6366F1',
      accentHover: '#4F46E5',
      
      // Semantic colors
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
      
      // Text colors
      textPrimary: '#111827',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',
      
      // Background colors
      background: '#FFFFFF',
      backgroundAlt: '#F9FAFB',
      surface: '#FFFFFF',
      
      // Border colors
      border: '#E5E7EB',
      borderLight: '#F3F4F6',
      borderDark: '#D1D5DB',
    },
    
    typography: {
      // Font families
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      headingFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      monoFamily: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      
      // Font sizes
      fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
      },
      
      // Font weights
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      
      // Line heights
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
      
      // Letter spacing
      letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
      },
    },
    
    spacing: {
      xs: '0.25rem',   // 4px
      sm: '0.5rem',    // 8px
      md: '1rem',      // 16px
      lg: '1.5rem',    // 24px
      xl: '2rem',      // 32px
      '2xl': '3rem',   // 48px
      '3xl': '4rem',   // 64px
      '4xl': '6rem',   // 96px
    },
    
    borderRadius: {
      none: '0',
      sm: '0.125rem',   // 2px
      base: '0.25rem',  // 4px
      md: '0.375rem',   // 6px
      lg: '0.5rem',     // 8px
      xl: '0.75rem',    // 12px
      full: '9999px',
    },
    
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    layout: {
      containerMaxWidth: '1280px',
      contentMaxWidth: '1024px',
      sidebarWidth: '256px',
      headerHeight: '64px',
      footerHeight: '80px',
    },
    
    animation: {
      duration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      easing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    
    customCSS: {
      global: `
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus visible styles */
*:focus-visible {
  outline: 2px solid var(--theme-primary);
  outline-offset: 2px;
}

/* Selection color */
::selection {
  background-color: var(--theme-primary-light);
  color: var(--theme-primary-dark);
}
      `.trim(),
    },
  },
}

export default defaultTheme
