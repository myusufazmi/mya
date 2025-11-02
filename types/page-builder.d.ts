export type BlockType = 
  | 'hero'
  | 'text'
  | 'heading'
  | 'image'
  | 'button'
  | 'columns'
  | 'card'
  | 'list'
  | 'spacer'
  | 'divider'
  | 'video'
  | 'gallery'
  | 'form'
  | 'accordion'
  | 'tabs'
  | 'testimonial'
  | 'pricing'
  | 'cta'
  | 'html'

export interface BlockData {
  id: string
  type: BlockType
  content: any
  styles?: {
    padding?: string
    margin?: string
    backgroundColor?: string
    textAlign?: 'left' | 'center' | 'right'
    width?: string
    maxWidth?: string
  }
  settings?: {
    animation?: string
    visibility?: 'always' | 'desktop' | 'mobile'
    customClass?: string
  }
}

export interface PageBuilderData {
  blocks: BlockData[]
  settings: {
    layout?: 'full' | 'boxed'
    maxWidth?: string
    backgroundColor?: string
  }
}

export interface HeroBlockContent {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  backgroundType?: 'color' | 'image' | 'gradient'
  backgroundColor?: string
  gradient?: {
    from: string
    to: string
    direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b'
  }
  buttons?: {
    text: string
    url: string
    style: 'primary' | 'secondary' | 'outline'
  }[]
  textAlign?: 'left' | 'center' | 'right'
  overlay?: boolean
  overlayOpacity?: number
  minHeight?: string
}

export interface TextBlockContent {
  text: string
  fontSize?: string
  fontWeight?: string
  color?: string
  lineHeight?: string
}

export interface HeadingBlockContent {
  text: string
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  align?: 'left' | 'center' | 'right'
  color?: string
}

export interface ImageBlockContent {
  src: string
  alt: string
  caption?: string
  width?: string
  height?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  borderRadius?: string
  link?: string
}

export interface ButtonBlockContent {
  text: string
  url: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  target?: '_self' | '_blank'
}

export interface ColumnsBlockContent {
  columns: {
    id: string
    blocks: BlockData[]
    width?: string
  }[]
  gap?: string
  stackOnMobile?: boolean
}

export interface CardBlockContent {
  image?: string
  title: string
  description: string
  button?: {
    text: string
    url: string
  }
  imagePosition?: 'top' | 'left' | 'right'
}

export interface ListBlockContent {
  items: string[]
  type: 'bullet' | 'numbered' | 'check'
  icon?: string
  iconColor?: string
}

export interface SpacerBlockContent {
  height: string
}

export interface DividerBlockContent {
  style: 'solid' | 'dashed' | 'dotted'
  color?: string
  thickness?: string
  width?: string
}

export interface VideoBlockContent {
  url: string
  provider: 'youtube' | 'vimeo' | 'direct'
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
  aspectRatio?: '16/9' | '4/3' | '1/1'
}

export interface GalleryBlockContent {
  images: {
    src: string
    alt: string
    caption?: string
  }[]
  columns?: number
  gap?: string
  lightbox?: boolean
}

export interface AccordionBlockContent {
  items: {
    id: string
    title: string
    content: string
  }[]
  allowMultiple?: boolean
}

export interface TestimonialBlockContent {
  quote: string
  author: string
  role?: string
  image?: string
  rating?: number
}

export interface PricingBlockContent {
  title: string
  price: string
  period?: string
  features: string[]
  button?: {
    text: string
    url: string
  }
  highlighted?: boolean
  badge?: string
}

export interface CTABlockContent {
  title: string
  description?: string
  button: {
    text: string
    url: string
  }
  backgroundType?: 'color' | 'gradient' | 'image'
  backgroundColor?: string
  gradient?: {
    from: string
    to: string
  }
  backgroundImage?: string
}
