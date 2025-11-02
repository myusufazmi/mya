'use client'

import { usePageBuilder } from './page-builder-provider'
import { BlockData, BlockType } from '@/types/page-builder'
import { 
  Type, Heading, Image, MousePointer, Columns, CreditCard, List, 
  Minus, Video, Grid, ChevronDown, Layout, 
  Star, DollarSign, Megaphone, Code
} from 'lucide-react'

interface BlockTemplate {
  type: BlockType
  name: string
  icon: any
  category: 'basic' | 'layout' | 'media' | 'content' | 'advanced'
  defaultContent: any
}

const blockTemplates: BlockTemplate[] = [
  // Basic
  {
    type: 'heading',
    name: 'Heading',
    icon: Heading,
    category: 'basic',
    defaultContent: {
      text: 'New Heading',
      level: 'h2',
      align: 'left'
    }
  },
  {
    type: 'text',
    name: 'Text',
    icon: Type,
    category: 'basic',
    defaultContent: {
      text: 'Add your text here...'
    }
  },
  {
    type: 'button',
    name: 'Button',
    icon: MousePointer,
    category: 'basic',
    defaultContent: {
      text: 'Click Me',
      url: '#',
      variant: 'primary',
      size: 'md'
    }
  },
  {
    type: 'spacer',
    name: 'Spacer',
    icon: Minus,
    category: 'basic',
    defaultContent: {
      height: '40px'
    }
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: Minus,
    category: 'basic',
    defaultContent: {
      style: 'solid',
      width: '100%'
    }
  },

  // Layout
  {
    type: 'hero',
    name: 'Hero Section',
    icon: Layout,
    category: 'layout',
    defaultContent: {
      title: 'Hero Title',
      subtitle: 'Hero Subtitle',
      description: 'Hero description goes here',
      backgroundType: 'gradient',
      gradient: {
        from: '#3b82f6',
        to: '#8b5cf6',
        direction: 'to-r'
      },
      textAlign: 'center',
      minHeight: '500px'
    }
  },
  {
    type: 'columns',
    name: 'Columns',
    icon: Columns,
    category: 'layout',
    defaultContent: {
      columns: [
        { id: crypto.randomUUID(), blocks: [], width: '50%' },
        { id: crypto.randomUUID(), blocks: [], width: '50%' }
      ],
      gap: '20px',
      stackOnMobile: true
    }
  },
  {
    type: 'card',
    name: 'Card',
    icon: CreditCard,
    category: 'layout',
    defaultContent: {
      title: 'Card Title',
      description: 'Card description',
      imagePosition: 'top'
    }
  },

  // Media
  {
    type: 'image',
    name: 'Image',
    icon: Image,
    category: 'media',
    defaultContent: {
      src: 'https://via.placeholder.com/800x400',
      alt: 'Placeholder image',
      objectFit: 'cover'
    }
  },
  {
    type: 'video',
    name: 'Video',
    icon: Video,
    category: 'media',
    defaultContent: {
      url: '',
      provider: 'youtube',
      aspectRatio: '16/9'
    }
  },
  {
    type: 'gallery',
    name: 'Gallery',
    icon: Grid,
    category: 'media',
    defaultContent: {
      images: [],
      columns: 3,
      gap: '16px'
    }
  },

  // Content
  {
    type: 'list',
    name: 'List',
    icon: List,
    category: 'content',
    defaultContent: {
      items: ['Item 1', 'Item 2', 'Item 3'],
      type: 'bullet'
    }
  },
  {
    type: 'accordion',
    name: 'Accordion',
    icon: ChevronDown,
    category: 'content',
    defaultContent: {
      items: [
        { id: '1', title: 'Question 1', content: 'Answer 1' },
        { id: '2', title: 'Question 2', content: 'Answer 2' }
      ]
    }
  },
  {
    type: 'testimonial',
    name: 'Testimonial',
    icon: Star,
    category: 'content',
    defaultContent: {
      quote: 'This is an amazing product!',
      author: 'John Doe',
      role: 'CEO at Company'
    }
  },
  {
    type: 'pricing',
    name: 'Pricing',
    icon: DollarSign,
    category: 'content',
    defaultContent: {
      title: 'Basic Plan',
      price: '$29',
      period: '/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    }
  },
  {
    type: 'cta',
    name: 'Call to Action',
    icon: Megaphone,
    category: 'content',
    defaultContent: {
      title: 'Ready to Get Started?',
      description: 'Join thousands of satisfied customers',
      button: {
        text: 'Get Started',
        url: '#'
      },
      backgroundType: 'gradient',
      gradient: {
        from: '#3b82f6',
        to: '#8b5cf6'
      }
    }
  },

  // Advanced
  {
    type: 'html',
    name: 'Custom HTML',
    icon: Code,
    category: 'advanced',
    defaultContent: {
      html: '<div>Custom HTML content</div>'
    }
  }
]

export function BlockLibrary() {
  const { addBlock } = usePageBuilder()

  const categories = [
    { id: 'basic', name: 'Basic', icon: Type },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'media', name: 'Media', icon: Image },
    { id: 'content', name: 'Content', icon: CreditCard },
    { id: 'advanced', name: 'Advanced', icon: Code },
  ]

  const handleAddBlock = (template: BlockTemplate) => {
    const newBlock: BlockData = {
      id: crypto.randomUUID(),
      type: template.type,
      content: template.defaultContent,
      styles: {},
      settings: {}
    }
    addBlock(newBlock)
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Add Blocks
        </h3>
      </div>

      {categories.map(category => {
        const categoryBlocks = blockTemplates.filter(b => b.category === category.id)
        if (categoryBlocks.length === 0) return null

        return (
          <div key={category.id}>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {category.name}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {categoryBlocks.map(template => {
                const Icon = template.icon
                return (
                  <button
                    key={template.type}
                    onClick={() => handleAddBlock(template)}
                    className="flex flex-col items-center justify-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition group"
                  >
                    <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2" />
                    <span className="text-xs text-gray-700 dark:text-gray-300 text-center">
                      {template.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
