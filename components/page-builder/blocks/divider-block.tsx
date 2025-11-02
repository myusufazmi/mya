import { DividerBlockContent } from '@/types/page-builder'

export function DividerBlock({ content }: { content: DividerBlockContent }) {
  return (
    <hr
      style={{
        borderStyle: content.style,
        borderColor: content.color,
        borderWidth: content.thickness,
        width: content.width,
        margin: '0 auto',
      }}
    />
  )
}
