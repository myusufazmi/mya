import { ImageBlockContent } from '@/types/page-builder'

export function ImageBlock({ content }: { content: ImageBlockContent }) {
  const imgElement = (
    <img
      src={content.src}
      alt={content.alt}
      className="max-w-full h-auto"
      style={{
        width: content.width,
        height: content.height,
        objectFit: content.objectFit,
        borderRadius: content.borderRadius,
      }}
    />
  )

  return (
    <div>
      {content.link ? (
        <a href={content.link}>
          {imgElement}
        </a>
      ) : (
        imgElement
      )}
      {content.caption && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
          {content.caption}
        </p>
      )}
    </div>
  )
}
