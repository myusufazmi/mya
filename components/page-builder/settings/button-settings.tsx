import { BlockData, ButtonBlockContent } from '@/types/page-builder'

interface ButtonSettingsProps {
  block: BlockData
  updateBlock: (id: string, updates: Partial<BlockData>) => void
}

export function ButtonSettings({ block, updateBlock }: ButtonSettingsProps) {
  const content = block.content as ButtonBlockContent

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Button Text
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
          URL
        </label>
        <input
          type="text"
          value={content.url}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, url: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Style
        </label>
        <select
          value={content.variant}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, variant: e.target.value as any }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
          <option value="ghost">Ghost</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Size
        </label>
        <select
          value={content.size}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, size: e.target.value as any }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
    </div>
  )
}
