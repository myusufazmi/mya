'use client'

import { useEffect, useState } from 'react'
import { useTheme } from './theme-provider'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { isDark, toggleDarkMode } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <button 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    )
  }
  
  return (
    <button
      onClick={toggleDarkMode}
      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  )
}
