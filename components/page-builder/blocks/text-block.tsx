import { TextBlockContent } from '@/types/page-builder'

export function TextBlock({ content }: { content: TextBlockContent }) {
  return (
    <p 
      className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
      style={{
        fontSize: content.fontSize,
        fontWeight: content.fontWeight,
        color: content.color,
        lineHeight: content.lineHeight,
      }}
    >
      {content.text}
    </p>
  )
}
