import { HeadingBlockContent } from '@/types/page-builder'

export function HeadingBlock({ content }: { content: HeadingBlockContent }) {
  const Tag = content.level
  const alignClass = content.align === 'center' ? 'text-center' : content.align === 'right' ? 'text-right' : 'text-left'
  
  const sizeClasses = {
    h1: 'text-5xl',
    h2: 'text-4xl',
    h3: 'text-3xl',
    h4: 'text-2xl',
    h5: 'text-xl',
    h6: 'text-lg',
  }

  return (
    <Tag 
      className={`font-bold text-gray-900 dark:text-white ${sizeClasses[content.level]} ${alignClass}`}
      style={{ color: content.color }}
    >
      {content.text}
    </Tag>
  )
}
