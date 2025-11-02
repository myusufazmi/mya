'use client'

import { Block, BlockSettings } from '@/lib/page-builder/types'
import { blockRegistry } from '@/lib/page-builder'
import { X, Trash2, Eye, EyeOff, Copy } from 'lucide-react'

interface SettingsPanelProps {
  block: Block | null
  onUpdate: (blockId: string, content: BlockSettings) => void
  onDelete: (blockId: string) => void
  onDuplicate: (blockId: string) => void
  onToggleVisibility: (blockId: string) => void
  onClose: () => void
}

export function SettingsPanel({
  block,
  onUpdate,
  onDelete,
  onDuplicate,
  onToggleVisibility,
  onClose,
}: SettingsPanelProps) {
  if (!block) {
    return (
      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <p>Select a block to edit</p>
      </div>
    )
  }

  const blockDef = blockRegistry.get(block.type)
  if (!blockDef) return null

  const handleChange = (key: string, value: any) => {
    onUpdate(block.id, {
      ...block.content,
      [key]: value,
    })
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Block Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            {blockDef.icon}
            <span>{blockDef.label}</span>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="flex-1 overflow-y-auto p-4">
        {blockDef.settingsSchema && blockDef.settingsSchema.length > 0 ? (
          <div className="space-y-4">
            {blockDef.settingsSchema.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {field.label}
                </label>
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={block.content[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    value={block.content[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                )}

                {field.type === 'number' && (
                  <input
                    type="number"
                    value={block.content[field.name] || 0}
                    onChange={(e) => handleChange(field.name, Number(e.target.value))}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                )}

                {field.type === 'color' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={block.content[field.name] || '#000000'}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={block.content[field.name] || '#000000'}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm uppercase font-mono"
                    />
                  </div>
                )}

                {field.type === 'select' && field.options && (
                  <select
                    value={block.content[field.name] || field.defaultValue}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === 'toggle' && (
                  <button
                    onClick={() => handleChange(field.name, !block.content[field.name])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      block.content[field.name]
                        ? 'bg-blue-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        block.content[field.name] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}

                {field.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {field.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            No settings available for this block
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button
          onClick={() => onToggleVisibility(block.id)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {block.visible ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span>Hide Block</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Show Block</span>
            </>
          )}
        </button>

        <button
          onClick={() => onDuplicate(block.id)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Copy className="h-4 w-4" />
          <span>Duplicate Block</span>
        </button>

        <button
          onClick={() => onDelete(block.id)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete Block</span>
        </button>
      </div>
    </div>
  )
}
