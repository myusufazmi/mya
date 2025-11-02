'use client'

import { useState } from 'react'
import { Search, Image as ImageIcon, Link as LinkIcon } from 'lucide-react'

interface SEOMetadataProps {
  value: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    ogTitle?: string
    ogDescription?: string
    canonical?: string
  }
  onChange: (value: any) => void
}

export function SEOMetadata({ value, onChange }: SEOMetadataProps) {
  const [keywords, setKeywords] = useState(value.keywords?.join(', ') || '')

  const handleChange = (field: string, fieldValue: any) => {
    onChange({
      ...value,
      [field]: fieldValue,
    })
  }

  const handleKeywordsBlur = () => {
    const keywordArray = keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k)
    handleChange('keywords', keywordArray)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 pb-4 border-b">
        <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          SEO Metadata
        </h3>
      </div>

      {/* SEO Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          SEO Title
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            (Recommended: 50-60 characters)
          </span>
        </label>
        <input
          type="text"
          value={value.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          maxLength={60}
          placeholder="Page title for search engines"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {(value.title || '').length} / 60 characters
        </p>
      </div>

      {/* Meta Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Meta Description
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            (Recommended: 150-160 characters)
          </span>
        </label>
        <textarea
          value={value.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          maxLength={160}
          rows={3}
          placeholder="Brief description for search results"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {(value.description || '').length} / 160 characters
        </p>
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Keywords
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            (Separate with commas)
          </span>
        </label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onBlur={handleKeywordsBlur}
          placeholder="keyword1, keyword2, keyword3"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {value.keywords && value.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {value.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Canonical URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
          <LinkIcon className="h-4 w-4 mr-1" />
          Canonical URL
        </label>
        <input
          type="url"
          value={value.canonical || ''}
          onChange={(e) => handleChange('canonical', e.target.value)}
          placeholder="https://example.com/page"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Specify the canonical URL if this is duplicate content
        </p>
      </div>

      {/* Open Graph */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Open Graph (Social Media)
        </h4>

        <div className="space-y-4">
          {/* OG Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              OG Title
            </label>
            <input
              type="text"
              value={value.ogTitle || ''}
              onChange={(e) => handleChange('ogTitle', e.target.value)}
              placeholder="Title for social media sharing"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* OG Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              OG Description
            </label>
            <textarea
              value={value.ogDescription || ''}
              onChange={(e) => handleChange('ogDescription', e.target.value)}
              rows={2}
              placeholder="Description for social media sharing"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* OG Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <ImageIcon className="h-4 w-4 mr-1" />
              OG Image URL
            </label>
            <input
              type="url"
              value={value.ogImage || ''}
              onChange={(e) => handleChange('ogImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {value.ogImage && (
              <div className="mt-2">
                <img
                  src={value.ogImage}
                  alt="OG Preview"
                  className="w-full max-w-md h-auto rounded-lg border border-gray-200 dark:border-gray-700"
                />
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Recommended size: 1200x630px
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Search Preview
        </h4>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
            {value.canonical || 'https://example.com/page'}
          </div>
          <div className="text-xl text-blue-800 dark:text-blue-300 font-medium mb-1">
            {value.title || 'Page Title'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {value.description || 'Page description will appear here...'}
          </div>
        </div>
      </div>
    </div>
  )
}
