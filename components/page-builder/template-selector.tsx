'use client'

import { useState } from 'react'
import { PageTemplate } from '@/lib/page-builder/types'
import { pageTemplates } from '@/lib/page-builder/templates'
import { Check, FileText } from 'lucide-react'

interface TemplateSelectorProps {
  onSelect: (template: PageTemplate) => void
  onClose: () => void
}

export function TemplateSelector({ onSelect, onClose }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'basic', label: 'Basic' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'company', label: 'Company' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
  ]

  const filteredTemplates = selectedCategory === 'all'
    ? pageTemplates
    : pageTemplates.filter(t => t.category === selectedCategory)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Choose a Template
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelect(template)}
                className="group text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-lg transition"
              >
                {/* Preview */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                  {template.thumbnail ? (
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        {template.blocks.length} blocks
                      </p>
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <div className="text-center text-white">
                      <Check className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">Use This Template</p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {template.description}
                  </p>
                  {template.isPremium && (
                    <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                      Premium
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No templates found in this category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
