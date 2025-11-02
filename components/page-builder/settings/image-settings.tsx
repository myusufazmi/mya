import { BlockData, ImageBlockContent } from '@/types/page-builder'

interface ImageSettingsProps {
  block: BlockData
  updateBlock: (id: string, updates: Partial<BlockData>) => void
}

export function ImageSettings({ block, updateBlock }: ImageSettingsProps) {
  const content = block.content as ImageBlockContent

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Image URL
        </label>
        <input
          type="text"
          value={content.src}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, src: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Alt Text
        </label>
        <input
          type="text"
          value={content.alt}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, alt: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Object Fit
        </label>
        <select
          value={content.objectFit || 'cover'}
          onChange={(e) => updateBlock(block.id, {
            content: { ...content, objectFit: e.target.value as any }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
  )
}
