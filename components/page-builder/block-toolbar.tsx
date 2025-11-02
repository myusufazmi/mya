'use client'

import { useState } from 'react'
import { blockRegistry } from '@/lib/page-builder'
import { BlockCategory } from '@/lib/page-builder/types'
import { Plus, Search } from 'lucide-react'

interface BlockToolbarProps {
  onAddBlock: (blockType: string) => void
}

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<BlockCategory | 'all'>('all')

  const categories: Array<{ id: BlockCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'layout', label: 'Layout' },
    { id: 'content', label: 'Content' },
    { id: 'media', label: 'Media' },
    { id: 'form', label: 'Forms' },
  ]

  const allBlocks = blockRegistry.getAll()
  
  const filteredBlocks = allBlocks.filter(block => {
    const matchesCategory = activeCategory === 'all' || block.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Add Blocks
        </h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Blocks List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredBlocks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No blocks found
            </div>
          ) : (
            filteredBlocks.map((block) => (
              <button
                key={block.type}
                onClick={() => onAddBlock(block.type)}
                className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-left group"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 text-gray-600 dark:text-gray-400 group-hover:text-blue-600">
                    {block.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {block.label}
                      </h3>
                      <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    {block.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {block.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
