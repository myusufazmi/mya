/**
 * Core Block Definitions
 * Registers all available blocks for the page builder
 */

import { BlockDefinition } from '../types'
import { 
  Type, 
  Image as ImageIcon, 
  Heading, 
  Square, 
  Minus,
  MousePointer,
  Layout,
  Grid3x3,
  CreditCard,
  Megaphone,
} from 'lucide-react'

// Import block components
import { HeroBlock } from '@/components/page-builder/blocks/hero-block'
import { TextBlock } from '@/components/page-builder/blocks/text-block'
import { HeadingBlock } from '@/components/page-builder/blocks/heading-block'
import { ImageBlock } from '@/components/page-builder/blocks/image-block'
import { ButtonBlock } from '@/components/page-builder/blocks/button-block'
import { SpacerBlock } from '@/components/page-builder/blocks/spacer-block'
import { DividerBlock } from '@/components/page-builder/blocks/divider-block'
import { CardsBlock } from '@/components/page-builder/blocks/cards-block'
import { GalleryBlock } from '@/components/page-builder/blocks/gallery-block'
import { CTABlock } from '@/components/page-builder/blocks/cta-block'

/**
 * Hero Block Definition
 */
export const heroBlockDefinition: BlockDefinition = {
  type: 'hero',
  label: 'Hero Section',
  category: 'layout',
  icon: <Layout className="h-5 w-5" />,
  description: 'Large hero section with background image or video',
  defaultContent: {
    title: 'Welcome to Our Website',
    subtitle: 'Subtitle here',
    description: 'This is a description of your hero section',
    backgroundType: 'gradient',
    gradient: {
      from: '#3B82F6',
      to: '#8B5CF6',
      direction: 'to-r',
    },
    minHeight: '500px',
    textAlign: 'center',
    buttons: [
      { text: 'Get Started', url: '#', style: 'primary' },
      { text: 'Learn More', url: '#', style: 'outline' },
    ],
    overlay: true,
    overlayOpacity: 0.3,
  },
  customizable: true,
  component: HeroBlock,
  settingsSchema: [
    { name: 'title', label: 'Title', type: 'text', defaultValue: 'Welcome' },
    { name: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: '' },
    { name: 'description', label: 'Description', type: 'textarea', defaultValue: '' },
    { 
      name: 'textAlign', 
      label: 'Text Alignment', 
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      defaultValue: 'center',
    },
    { name: 'minHeight', label: 'Min Height', type: 'text', defaultValue: '500px' },
  ],
}

/**
 * Text Block Definition
 */
export const textBlockDefinition: BlockDefinition = {
  type: 'text',
  label: 'Text',
  category: 'content',
  icon: <Type className="h-5 w-5" />,
  description: 'Rich text content block',
  defaultContent: {
    content: '<p>Enter your text here...</p>',
    textAlign: 'left',
  },
  customizable: true,
  component: TextBlock,
  settingsSchema: [
    { name: 'content', label: 'Content', type: 'textarea', defaultValue: '' },
    { 
      name: 'textAlign', 
      label: 'Alignment', 
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
        { value: 'justify', label: 'Justify' },
      ],
      defaultValue: 'left',
    },
  ],
}

/**
 * Heading Block Definition
 */
export const headingBlockDefinition: BlockDefinition = {
  type: 'heading',
  label: 'Heading',
  category: 'content',
  icon: <Heading className="h-5 w-5" />,
  description: 'Heading with different levels',
  defaultContent: {
    content: 'Your Heading Here',
    level: 2,
    textAlign: 'left',
  },
  customizable: true,
  component: HeadingBlock,
  settingsSchema: [
    { name: 'content', label: 'Heading Text', type: 'text', defaultValue: '' },
    { 
      name: 'level', 
      label: 'Heading Level', 
      type: 'select',
      options: [
        { value: 1, label: 'H1' },
        { value: 2, label: 'H2' },
        { value: 3, label: 'H3' },
        { value: 4, label: 'H4' },
        { value: 5, label: 'H5' },
        { value: 6, label: 'H6' },
      ],
      defaultValue: 2,
    },
  ],
}

/**
 * Image Block Definition
 */
export const imageBlockDefinition: BlockDefinition = {
  type: 'image',
  label: 'Image',
  category: 'media',
  icon: <ImageIcon className="h-5 w-5" />,
  description: 'Single image with caption',
  defaultContent: {
    src: 'https://via.placeholder.com/800x400',
    alt: 'Image',
    caption: '',
    alignment: 'center',
    width: '100%',
  },
  customizable: true,
  component: ImageBlock,
  settingsSchema: [
    { name: 'src', label: 'Image URL', type: 'image', defaultValue: '' },
    { name: 'alt', label: 'Alt Text', type: 'text', defaultValue: '' },
    { name: 'caption', label: 'Caption', type: 'text', defaultValue: '' },
    { 
      name: 'alignment', 
      label: 'Alignment', 
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      defaultValue: 'center',
    },
  ],
}

/**
 * Button Block Definition
 */
export const buttonBlockDefinition: BlockDefinition = {
  type: 'button',
  label: 'Button',
  category: 'content',
  icon: <MousePointer className="h-5 w-5" />,
  description: 'Call-to-action button',
  defaultContent: {
    text: 'Click Me',
    url: '#',
    variant: 'primary',
    size: 'md',
    alignment: 'left',
  },
  customizable: true,
  component: ButtonBlock,
  settingsSchema: [
    { name: 'text', label: 'Button Text', type: 'text', defaultValue: 'Click Me' },
    { name: 'url', label: 'URL', type: 'text', defaultValue: '#' },
    { 
      name: 'variant', 
      label: 'Style', 
      type: 'select',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'outline', label: 'Outline' },
      ],
      defaultValue: 'primary',
    },
    { 
      name: 'size', 
      label: 'Size', 
      type: 'select',
      options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ],
      defaultValue: 'md',
    },
  ],
}

/**
 * Spacer Block Definition
 */
export const spacerBlockDefinition: BlockDefinition = {
  type: 'spacer',
  label: 'Spacer',
  category: 'layout',
  icon: <Square className="h-5 w-5" />,
  description: 'Add vertical spacing',
  defaultContent: {
    height: '40px',
  },
  customizable: true,
  component: SpacerBlock,
  settingsSchema: [
    { 
      name: 'height', 
      label: 'Height', 
      type: 'text', 
      defaultValue: '40px',
      description: 'e.g., 40px, 2rem, 10%',
    },
  ],
}

/**
 * Divider Block Definition
 */
export const dividerBlockDefinition: BlockDefinition = {
  type: 'divider',
  label: 'Divider',
  category: 'layout',
  icon: <Minus className="h-5 w-5" />,
  description: 'Horizontal line separator',
  defaultContent: {
    style: 'solid',
    width: '100%',
    color: '#E5E7EB',
    spacing: 'md',
  },
  customizable: true,
  component: DividerBlock,
  settingsSchema: [
    { 
      name: 'style', 
      label: 'Style', 
      type: 'select',
      options: [
        { value: 'solid', label: 'Solid' },
        { value: 'dashed', label: 'Dashed' },
        { value: 'dotted', label: 'Dotted' },
      ],
      defaultValue: 'solid',
    },
    { name: 'color', label: 'Color', type: 'color', defaultValue: '#E5E7EB' },
  ],
}

/**
 * Cards Block Definition
 */
export const cardsBlockDefinition: BlockDefinition = {
  type: 'cards',
  label: 'Cards',
  category: 'content',
  icon: <CreditCard className="h-5 w-5" />,
  description: 'Grid of cards with image, title, and description',
  defaultContent: {
    columns: 3,
    gap: '1.5rem',
    cards: [
      {
        title: 'Card Title 1',
        description: 'Card description goes here.',
        image: 'https://via.placeholder.com/400x300',
        link: '#',
        buttonText: 'Learn More',
      },
      {
        title: 'Card Title 2',
        description: 'Card description goes here.',
        image: 'https://via.placeholder.com/400x300',
        link: '#',
        buttonText: 'Learn More',
      },
      {
        title: 'Card Title 3',
        description: 'Card description goes here.',
        image: 'https://via.placeholder.com/400x300',
        link: '#',
        buttonText: 'Learn More',
      },
    ],
  },
  customizable: true,
  component: CardsBlock,
}

/**
 * Gallery Block Definition
 */
export const galleryBlockDefinition: BlockDefinition = {
  type: 'gallery',
  label: 'Gallery',
  category: 'media',
  icon: <Grid3x3 className="h-5 w-5" />,
  description: 'Image gallery with lightbox',
  defaultContent: {
    columns: 3,
    gap: 'md',
    aspectRatio: 'square',
    lightbox: true,
    images: [
      { src: 'https://via.placeholder.com/400', alt: 'Image 1', caption: '' },
      { src: 'https://via.placeholder.com/400', alt: 'Image 2', caption: '' },
      { src: 'https://via.placeholder.com/400', alt: 'Image 3', caption: '' },
      { src: 'https://via.placeholder.com/400', alt: 'Image 4', caption: '' },
      { src: 'https://via.placeholder.com/400', alt: 'Image 5', caption: '' },
      { src: 'https://via.placeholder.com/400', alt: 'Image 6', caption: '' },
    ],
  },
  customizable: true,
  component: GalleryBlock,
}

/**
 * CTA Block Definition
 */
export const ctaBlockDefinition: BlockDefinition = {
  type: 'cta',
  label: 'Call to Action',
  category: 'content',
  icon: <Megaphone className="h-5 w-5" />,
  description: 'Prominent call-to-action section',
  defaultContent: {
    title: 'Ready to Get Started?',
    description: 'Join thousands of satisfied customers today',
    buttonText: 'Get Started',
    buttonUrl: '#',
    backgroundColor: '#F3F4F6',
    textColor: '#111827',
    buttonVariant: 'primary',
    alignment: 'center',
  },
  customizable: true,
  component: CTABlock,
  settingsSchema: [
    { name: 'title', label: 'Title', type: 'text', defaultValue: '' },
    { name: 'description', label: 'Description', type: 'textarea', defaultValue: '' },
    { name: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Get Started' },
    { name: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
    { name: 'backgroundColor', label: 'Background Color', type: 'color', defaultValue: '#F3F4F6' },
    { name: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#111827' },
  ],
}

/**
 * All block definitions
 */
export const coreBlocks: BlockDefinition[] = [
  heroBlockDefinition,
  textBlockDefinition,
  headingBlockDefinition,
  imageBlockDefinition,
  buttonBlockDefinition,
  cardsBlockDefinition,
  galleryBlockDefinition,
  ctaBlockDefinition,
  spacerBlockDefinition,
  dividerBlockDefinition,
]
