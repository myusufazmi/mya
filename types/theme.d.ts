export interface ThemeSettings {
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    border: string
    success?: string
    warning?: string
    error?: string
    info?: string
  }
  typography: {
    fontFamily: string
    fontSizeBase: string
    fontSizeScale: number
    lineHeight: number
  }
  spacing: {
    unit: number
    section: string
    container: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export interface ThemeConfig {
  id: string
  name: string
  version: string
  author: string
  description?: string
  settings: ThemeSettings
  supports: ('light' | 'dark')[]
  styles?: string
}

export interface ThemeContextType {
  theme: ThemeConfig
  setTheme: (theme: ThemeConfig) => void
  isDark: boolean
  toggleDarkMode: () => void
}
