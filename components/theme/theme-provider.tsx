'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeConfig, ThemeContextType } from '@/types/theme'

const defaultTheme: ThemeConfig = {
  id: 'default',
  name: 'Default Theme',
  version: '1.0.0',
  author: 'Your Company',
  supports: ['light', 'dark'],
  settings: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#1f2937',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSizeBase: '16px',
      fontSizeScale: 1.125,
      lineHeight: 1.5
    },
    spacing: {
      unit: 1,
      section: '2rem',
      container: '1.5rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    }
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ 
  children,
  theme: initialTheme = defaultTheme 
}: { 
  children: ReactNode
  theme?: ThemeConfig 
}) {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme)
  const [isDark, setIsDark] = useState(false)
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setTheme(parsedTheme)
      } catch (e) {
        console.error('Failed to parse saved theme', e)
      }
    }
    
    if (savedDarkMode) {
      setIsDark(savedDarkMode === 'true')
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
    }
  }, [])
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])
  
  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', String(isDark))
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])
  
  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }
  
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isDark, 
      toggleDarkMode 
    }}>
      <div 
        className={`min-h-screen transition-colors duration-200 ${
          isDark ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
        }`}
        style={{
          '--color-primary': theme.settings.colors.primary,
          '--color-secondary': theme.settings.colors.secondary,
          '--color-background': theme.settings.colors.background,
          '--color-surface': theme.settings.colors.surface,
          '--color-text': theme.settings.colors.text,
          '--color-border': theme.settings.colors.border,
          '--color-success': theme.settings.colors.success,
          '--color-warning': theme.settings.colors.warning,
          '--color-error': theme.settings.colors.error,
          '--color-info': theme.settings.colors.info,
          '--font-sans': theme.settings.typography.fontFamily,
          '--border-radius-sm': theme.settings.borderRadius.sm,
          '--border-radius-md': theme.settings.borderRadius.md,
          '--border-radius-lg': theme.settings.borderRadius.lg,
          '--border-radius-full': theme.settings.borderRadius.full,
          '--shadow-sm': theme.settings.shadows.sm,
          '--shadow-md': theme.settings.shadows.md,
          '--shadow-lg': theme.settings.shadows.lg,
          '--shadow-xl': theme.settings.shadows.xl,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
