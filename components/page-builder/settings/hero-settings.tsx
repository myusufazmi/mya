import { BlockData, HeroBlockContent } from '@/types/page-builder'

interface HeroSettingsProps {
  block: BlockData
  updateBlock: (id: string, updates: Partial<BlockData>) => void
}

export function HeroSettings({ block, updateBlock }: HeroSettingsProps) {
  const content = block.content as HeroBlockContent

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, title: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Subtitle
        </label>
        <input
          type="text"
          value={content.subtitle || ''}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, subtitle: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={content.description || ''}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, description: e.target.value }
          })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Text Alignment
        </label>
        <select
          value={content.textAlign || 'center'}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, textAlign: e.target.value as any }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Min Height
        </label>
        <input
          type="text"
          value={content.minHeight || '500px'}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, minHeight: e.target.value }
          })}
          placeholder="500px"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  )
}
