'use client'

import { usePageBuilder } from './page-builder-provider'
import { BlockRenderer } from './blocks/block-renderer'
import { Plus } from 'lucide-react'

interface CanvasProps {
  deviceMode: 'desktop' | 'mobile'
  viewMode: 'edit' | 'preview'
}

export function Canvas({ deviceMode, viewMode }: CanvasProps) {
  const { blocks, selectedBlockId, selectBlock } = usePageBuilder()

  const canvasWidth = deviceMode === 'mobile' ? '375px' : '100%'

  return (
    <div className="p-8 min-h-full">
      <div
        className="mx-auto bg-white dark:bg-gray-800 min-h-full shadow-lg transition-all duration-300"
        style={{ width: canvasWidth, maxWidth: '1280px' }}
      >
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Start Building Your Page
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Select blocks from the left sidebar to add them to your page
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                onClick={() => viewMode === 'edit' && selectBlock(block.id)}
                className={`relative group transition ${
                  viewMode === 'edit' ? 'cursor-pointer' : ''
                } ${
                  selectedBlockId === block.id && viewMode === 'edit'
                    ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                    : ''
                } ${
                  viewMode === 'edit'
                    ? 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
                    : ''
                }`}
              >
                {viewMode === 'edit' && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-10">
                    {block.type}
                  </div>
                )}
                <BlockRenderer block={block} viewMode={viewMode} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
