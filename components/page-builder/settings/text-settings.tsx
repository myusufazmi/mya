import { BlockData, TextBlockContent } from '@/types/page-builder'

interface TextSettingsProps {
  block: BlockData
  updateBlock: (id: string, updates: Partial<BlockData>) => void
}

export function TextSettings({ block, updateBlock }: TextSettingsProps) {
  const content = block.content as TextBlockContent

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Text Content
        </label>
        <textarea
          value={content.text}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, text: e.target.value }
          })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  )
}
