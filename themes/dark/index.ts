/**
 * Dark Theme
 * Modern dark theme with good contrast
 */

import { Theme } from '@/lib/theme/types'
import { defaultTheme } from '../default'

export const darkTheme: Theme = {
  metadata: {
    id: 'dark',
    name: 'Dark Theme',
    version: '1.0.0',
    author: 'CMS Team',
    description: 'Modern dark theme with excellent contrast and readability',
    tags: ['dark', 'modern', 'night'],
  },
  
  config: {
    ...defaultTheme.config,
    
    colors: {
      // Primary colors (Blue - adjusted for dark)
      primary: '#60A5FA',
      primaryHover: '#3B82F6',
      primaryLight: '#1E3A8A',
      primaryDark: '#93C5FD',
      
      // Secondary colors (Gray)
      secondary: '#9CA3AF',
      secondaryHover: '#D1D5DB',
      
      // Accent colors (Indigo)
      accent: '#818CF8',
      accentHover: '#6366F1',
      
      // Semantic colors (adjusted for dark)
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      info: '#60A5FA',
      
      // Text colors (inverted)
      textPrimary: '#F9FAFB',
      textSecondary: '#D1D5DB',
      textMuted: '#9CA3AF',
      
      // Background colors (dark)
      background: '#111827',
      backgroundAlt: '#1F2937',
      surface: '#1F2937',
      
      // Border colors (dark)
      border: '#374151',
      borderLight: '#4B5563',
      borderDark: '#1F2937',
    },
    
    customCSS: {
      global: `
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
  color-scheme: dark;
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

/* Scrollbar styling for dark theme */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: var(--theme-background);
}

::-webkit-scrollbar-thumb {
  background: var(--theme-border);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--theme-border-light);
}
      `.trim(),
    },
  },
}

export default darkTheme
