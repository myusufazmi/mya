/**
 * Page Builder Types
 * Type definitions for the visual page builder system
 */

import { ReactNode } from 'react'

/**
 * Block category
 */
export type BlockCategory = 
  | 'layout'
  | 'content'
  | 'media'
  | 'form'
  | 'social'
  | 'commerce'
  | 'custom'

/**
 * Alignment options
 */
export type Alignment = 'left' | 'center' | 'right' | 'justify'

/**
 * Vertical alignment
 */
export type VerticalAlignment = 'top' | 'middle' | 'bottom'

/**
 * Spacing size
 */
export type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Animation type
 */
export type AnimationType = 
  | 'none'
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'bounce'

/**
 * Base block properties
 */
export interface BaseBlockProps {
  id: string
  type: string
  order: number
  visible: boolean
  animation?: AnimationType
  customClass?: string
  customCSS?: string
}

/**
 * Block settings for customization
 */
export interface BlockSettings {
  [key: string]: any
}

/**
 * Block data structure
 */
export interface Block {
  id: string
  type: string
  content: BlockSettings
  order: number
  visible: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Block definition for registration
 */
export interface BlockDefinition {
  type: string
  label: string
  category: BlockCategory
  icon: ReactNode
  description?: string
  preview?: string
  defaultContent: BlockSettings
  customizable: boolean
  component: React.ComponentType<any>
  settingsSchema?: BlockSettingField[]
}

/**
 * Block setting field types
 */
export type BlockSettingFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'color'
  | 'select'
  | 'toggle'
  | 'slider'
  | 'image'
  | 'alignment'
  | 'spacing'
  | 'font'

/**
 * Block setting field definition
 */
export interface BlockSettingField {
  name: string
  label: string
  type: BlockSettingFieldType
  defaultValue?: any
  placeholder?: string
  description?: string
  options?: { value: string | number; label: string }[]
  min?: number
  max?: number
  step?: number
  group?: string
}

/**
 * Hero block content
 */
export interface HeroBlockContent {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  backgroundVideo?: string
  backgroundColor?: string
  overlayOpacity?: number
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  alignment?: Alignment
  verticalAlignment?: VerticalAlignment
  buttons?: Array<{
    text: string
    url: string
    variant: 'primary' | 'secondary' | 'outline'
  }>
}

/**
 * Text block content
 */
export interface TextBlockContent {
  content: string
  alignment?: Alignment
  fontSize?: SpacingSize
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  textColor?: string
  backgroundColor?: string
  padding?: SpacingSize
}

/**
 * Image block content
 */
export interface ImageBlockContent {
  src: string
  alt: string
  caption?: string
  width?: string
  height?: string
  alignment?: Alignment
  rounded?: boolean
  shadow?: boolean
  link?: string
}

/**
 * Gallery block content
 */
export interface GalleryBlockContent {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  columns?: 2 | 3 | 4 | 5
  gap?: SpacingSize
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
  lightbox?: boolean
}

/**
 * Card block content
 */
export interface CardBlockContent {
  title: string
  description: string
  image?: string
  imagePosition?: 'top' | 'bottom' | 'left' | 'right'
  link?: string
  buttonText?: string
  variant?: 'default' | 'bordered' | 'elevated'
}

/**
 * CTA block content
 */
export interface CTABlockContent {
  title: string
  description?: string
  buttonText: string
  buttonUrl: string
  backgroundColor?: string
  textColor?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline'
  alignment?: Alignment
}

/**
 * Form block content
 */
export interface FormBlockContent {
  title?: string
  description?: string
  fields: Array<{
    name: string
    label: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'
    required: boolean
    placeholder?: string
    options?: string[]
  }>
  submitText?: string
  successMessage?: string
  emailTo?: string
}

/**
 * Columns block content
 */
export interface ColumnsBlockContent {
  columns: number
  gap?: SpacingSize
  verticalAlign?: VerticalAlignment
  blocks: Block[][]
}

/**
 * Spacer block content
 */
export interface SpacerBlockContent {
  height?: SpacingSize
}

/**
 * Divider block content
 */
export interface DividerBlockContent {
  style?: 'solid' | 'dashed' | 'dotted'
  width?: string
  color?: string
  spacing?: SpacingSize
}

/**
 * Page template
 */
export interface PageTemplate {
  id: string
  name: string
  description: string
  thumbnail?: string
  category: string
  blocks: Block[]
  isPremium?: boolean
}

/**
 * Page builder state
 */
export interface PageBuilderState {
  blocks: Block[]
  selectedBlockId: string | null
  isDragging: boolean
  history: Block[][]
  historyIndex: number
  isSaving: boolean
}

/**
 * Page builder actions
 */
export type PageBuilderAction =
  | { type: 'ADD_BLOCK'; payload: Block }
  | { type: 'UPDATE_BLOCK'; payload: { id: string; content: BlockSettings } }
  | { type: 'DELETE_BLOCK'; payload: string }
  | { type: 'REORDER_BLOCKS'; payload: Block[] }
  | { type: 'SELECT_BLOCK'; payload: string | null }
  | { type: 'DUPLICATE_BLOCK'; payload: string }
  | { type: 'TOGGLE_VISIBILITY'; payload: string }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_BLOCKS'; payload: Block[] }
  | { type: 'CLEAR_ALL' }

/**
 * Drag and drop types
 */
export interface DragItem {
  type: 'block' | 'new-block'
  blockType?: string
  blockId?: string
  index?: number
}

/**
 * Drop result
 */
export interface DropResult {
  index: number
}
