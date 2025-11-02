import { SpacerBlockContent } from '@/types/page-builder'

export function SpacerBlock({ content }: { content: SpacerBlockContent }) {
  return <div style={{ height: content.height }} />
}
