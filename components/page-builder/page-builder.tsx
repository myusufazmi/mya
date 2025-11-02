'use client'

import { useState } from 'react'
import { usePageBuilder } from './page-builder-provider'
import { BlockLibrary } from './block-library'
import { Canvas } from './canvas'
import { BlockSettings } from './block-settings'
import { Eye, Code, Save, Download, Upload, Smartphone, Monitor } from 'lucide-react'

export function PageBuilder() {
  const { blocks, getPageData } = usePageBuilder()
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop')
  const [showCode, setShowCode] = useState(false)

  const handleSave = () => {
    const pageData = getPageData()
    console.log('Saving page data:', pageData)
    // TODO: Save to database
    alert('Page saved! (Implementation needed)')
  }

  const handleExport = () => {
    const pageData = getPageData()
    const dataStr = JSON.stringify(pageData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'page-builder-data.json'
    link.click()
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        // TODO: Load data
        console.log('Imported data:', data)
        alert('Import successful!')
      } catch (error) {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Page Builder
          </h2>
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                viewMode === 'edit'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded text-sm font-medium flex items-center space-x-1 transition ${
                viewMode === 'preview'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Device Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-2 rounded transition ${
                deviceMode === 'desktop'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-2 rounded transition ${
                deviceMode === 'mobile'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Actions */}
          <button
            onClick={() => setShowCode(!showCode)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            title="View Code"
          >
            <Code className="h-5 w-5" />
          </button>

          <label className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
            <Upload className="h-5 w-5" />
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExport}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            title="Export"
          >
            <Download className="h-5 w-5" />
          </button>

          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Save className="h-5 w-5" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Block Library Sidebar */}
        {viewMode === 'edit' && (
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <BlockLibrary />
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto">
          <Canvas deviceMode={deviceMode} viewMode={viewMode} />
        </div>

        {/* Block Settings Sidebar */}
        {viewMode === 'edit' && (
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            <BlockSettings />
          </div>
        )}
      </div>

      {/* Code View Modal */}
      {showCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Page Data (JSON)
              </h3>
              <button
                onClick={() => setShowCode(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <pre className="text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto">
                {JSON.stringify(getPageData(), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
