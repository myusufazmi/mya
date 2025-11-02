'use client'

import { usePageBuilder } from './page-builder-provider'
import { Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react'
import { HeadingSettings } from './settings/heading-settings'
import { TextSettings } from './settings/text-settings'
import { ButtonSettings } from './settings/button-settings'
import { ImageSettings } from './settings/image-settings'
import { HeroSettings } from './settings/hero-settings'

export function BlockSettings() {
  const { blocks, selectedBlockId, updateBlock, deleteBlock, moveBlock, selectBlock } = usePageBuilder()

  const selectedBlock = blocks.find(b => b.id === selectedBlockId)
  const selectedIndex = blocks.findIndex(b => b.id === selectedBlockId)

  if (!selectedBlock) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a block to edit its settings
        </p>
      </div>
    )
  }

  const handleDuplicate = () => {
    const newBlock = {
      ...selectedBlock,
      id: crypto.randomUUID(),
    }
    const newBlocks = [...blocks]
    newBlocks.splice(selectedIndex + 1, 0, newBlock)
    selectBlock(newBlock.id)
  }

  const handleDelete = () => {
    if (confirm('Delete this block?')) {
      deleteBlock(selectedBlock.id)
    }
  }

  const canMoveUp = selectedIndex > 0
  const canMoveDown = selectedIndex < blocks.length - 1

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
            {selectedBlock.type} Settings
          </h3>
          <button
            onClick={() => selectBlock(null)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Block Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => moveBlock(selectedIndex, selectedIndex - 1)}
            disabled={!canMoveUp}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-30"
            title="Move Up"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <button
            onClick={() => moveBlock(selectedIndex, selectedIndex + 1)}
            disabled={!canMoveDown}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-30"
            title="Move Down"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
          <button
            onClick={handleDuplicate}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Duplicate"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded ml-auto"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Block-specific settings */}
        {selectedBlock.type === 'heading' && (
          <HeadingSettings block={selectedBlock} updateBlock={updateBlock} />
        )}
        {selectedBlock.type === 'text' && (
          <TextSettings block={selectedBlock} updateBlock={updateBlock} />
        )}
        {selectedBlock.type === 'button' && (
          <ButtonSettings block={selectedBlock} updateBlock={updateBlock} />
        )}
        {selectedBlock.type === 'image' && (
          <ImageSettings block={selectedBlock} updateBlock={updateBlock} />
        )}
        {selectedBlock.type === 'hero' && (
          <HeroSettings block={selectedBlock} updateBlock={updateBlock} />
        )}

        {/* Common Styling */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
            Spacing
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Padding
              </label>
              <input
                type="text"
                value={selectedBlock.styles?.padding || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  styles: { ...selectedBlock.styles, padding: e.target.value }
                })}
                placeholder="e.g., 20px, 1rem"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Margin
              </label>
              <input
                type="text"
                value={selectedBlock.styles?.margin || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  styles: { ...selectedBlock.styles, margin: e.target.value }
                })}
                placeholder="e.g., 20px, 1rem"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Background */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
            Background
          </h4>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={selectedBlock.styles?.backgroundColor || '#ffffff'}
              onChange={(e) => updateBlock(selectedBlock.id, {
                styles: { ...selectedBlock.styles, backgroundColor: e.target.value }
              })}
              className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600"
            />
            <input
              type="text"
              value={selectedBlock.styles?.backgroundColor || ''}
              onChange={(e) => updateBlock(selectedBlock.id, {
                styles: { ...selectedBlock.styles, backgroundColor: e.target.value }
              })}
              placeholder="#ffffff"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Advanced */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
            Advanced
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Custom CSS Class
              </label>
              <input
                type="text"
                value={selectedBlock.settings?.customClass || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, customClass: e.target.value }
                })}
                placeholder="my-custom-class"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
