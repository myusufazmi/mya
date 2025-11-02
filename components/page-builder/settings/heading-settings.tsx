import { BlockData, HeadingBlockContent } from '@/types/page-builder'

interface HeadingSettingsProps {
  block: BlockData
  updateBlock: (id: string, updates: Partial<BlockData>) => void
}

export function HeadingSettings({ block, updateBlock }: HeadingSettingsProps) {
  const content = block.content as HeadingBlockContent

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Text
        </label>
        <input
          type="text"
          value={content.text}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, text: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Level
        </label>
        <select
          value={content.level}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, level: e.target.value as any }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Alignment
        </label>
        <select
          value={content.align || 'left'}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, align: e.target.value as any }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
    </div>
  )
}
