// Basic types for CMS
// Note: Generate full database types using: supabase gen types typescript --local > types/database.types.ts

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'user'
export type PageStatus = 'draft' | 'published' | 'archived'
export type PostStatus = 'draft' | 'published' | 'archived'

export interface Profile {
  id: string
  username: string
  full_name?: string
  avatar_url?: string
  role: UserRole
  bio?: string
  created_at: string
  updated_at: string
}

export interface Page {
  id: string
  title: string
  slug: string
  content: PageBlock[]
  excerpt?: string
  featured_image?: string
  template: string
  status: PageStatus
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  og_image?: string
  author_id: string
  parent_id?: string
  order_index: number
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: any
  excerpt?: string
  featured_image?: string
  status: PostStatus
  author_id: string
  category_id?: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  og_image?: string
  views: number
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parent_id?: string
  order_index: number
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Menu {
  id: string
  name: string
  location: string
  description?: string
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  menu_id: string
  parent_id?: string
  title: string
  url?: string
  page_id?: string
  target: string
  icon?: string
  order_index: number
  css_class?: string
  is_active: boolean
  created_at: string
}

export interface Theme {
  id: string
  name: string
  display_name: string
  description?: string
  version: string
  author: string
  thumbnail?: string
  is_active: boolean
  config: any
  created_at: string
  updated_at: string
}

export interface Plugin {
  id: string
  name: string
  display_name: string
  description?: string
  version: string
  author: string
  icon?: string
  is_active: boolean
  is_core: boolean
  config: any
  settings: any
  dependencies?: string[]
  hooks: any
  created_at: string
  updated_at: string
}

export interface Media {
  id: string
  filename: string
  original_filename: string
  mime_type: string
  size: number
  width?: number
  height?: number
  url: string
  thumbnail_url?: string
  alt_text?: string
  caption?: string
  folder: string
  uploaded_by: string
  created_at: string
}

// Page Builder Types
export interface PageBlock {
  id: string
  type: string
  content: any
  settings?: BlockSettings
  children?: PageBlock[]
}

export interface BlockSettings {
  spacing?: {
    marginTop?: string
    marginBottom?: string
    paddingTop?: string
    paddingBottom?: string
  }
  background?: {
    color?: string
    image?: string
  }
  animation?: string
  customClass?: string
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

// Form Types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  username: string
  fullName: string
}
