import { BlockData } from '@/types/page-builder'
import { HeadingBlock } from './heading-block'
import { TextBlock } from './text-block'
import { ButtonBlock } from './button-block'
import { ImageBlock } from './image-block'
import { HeroBlock } from './hero-block'
import { SpacerBlock } from './spacer-block'
import { DividerBlock } from './divider-block'

interface BlockRendererProps {
  block: BlockData
  viewMode: 'edit' | 'preview'
}

export function BlockRenderer({ block, viewMode }: BlockRendererProps) {
  const blockStyles = {
    padding: block.styles?.padding,
    margin: block.styles?.margin,
    backgroundColor: block.styles?.backgroundColor,
    textAlign: block.styles?.textAlign,
    width: block.styles?.width,
    maxWidth: block.styles?.maxWidth,
  }

  const className = block.settings?.customClass || ''

  const renderBlock = () => {
    switch (block.type) {
      case 'heading':
        return <HeadingBlock content={block.content} />
      case 'text':
        return <TextBlock content={block.content} />
      case 'button':
        return <ButtonBlock content={block.content} />
      case 'image':
        return <ImageBlock content={block.content} />
      case 'hero':
        return <HeroBlock content={block.content} />
      case 'spacer':
        return <SpacerBlock content={block.content} />
      case 'divider':
        return <DividerBlock content={block.content} />
      case 'list':
        return (
          <ul className="list-disc list-inside space-y-2">
            {block.content.items?.map((item: string, idx: number) => (
              <li key={idx} className="text-gray-700 dark:text-gray-300">{item}</li>
            ))}
          </ul>
        )
      case 'card':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {block.content.image && (
              <img src={block.content.image} alt="" className="w-full h-48 object-cover rounded-lg mb-4" />
            )}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {block.content.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {block.content.description}
            </p>
          </div>
        )
      case 'testimonial':
        return (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
              "{block.content.quote}"
            </p>
            <div className="flex items-center space-x-3">
              {block.content.image && (
                <img src={block.content.image} alt="" className="w-12 h-12 rounded-full" />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {block.content.author}
                </p>
                {block.content.role && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {block.content.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      case 'cta':
        return (
          <div
            className="rounded-lg p-12 text-center"
            style={{
              background: block.content.backgroundType === 'gradient'
                ? `linear-gradient(to right, ${block.content.gradient?.from}, ${block.content.gradient?.to})`
                : block.content.backgroundColor
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {block.content.title}
            </h2>
            {block.content.description && (
              <p className="text-xl text-white/90 mb-6">
                {block.content.description}
              </p>
            )}
            <a
              href={block.content.button?.url || '#'}
              className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              {block.content.button?.text || 'Get Started'}
            </a>
          </div>
        )
      default:
        return (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-center text-gray-500 dark:text-gray-400">
            Block type "{block.type}" not implemented
          </div>
        )
    }
  }

  return (
    <div style={blockStyles} className={className}>
      {renderBlock()}
    </div>
  )
}
