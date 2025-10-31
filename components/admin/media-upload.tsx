'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react'

export function MediaUpload() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: 'uploading' | 'success' | 'error'}>({})
  const [error, setError] = useState('')

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    
    // Validate file sizes
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    const invalidFiles: string[] = []
    const validFiles: File[] = []
    
    droppedFiles.forEach(file => {
      if (file.size > maxSize) {
        invalidFiles.push(file.name)
      } else {
        validFiles.push(file)
      }
    })
    
    if (invalidFiles.length > 0) {
      setError(`File terlalu besar (max 10MB): ${invalidFiles.join(', ')}`)
      setTimeout(() => setError(''), 5000)
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      
      // Validate file sizes
      const maxSize = 10 * 1024 * 1024 // 10MB in bytes
      const invalidFiles: string[] = []
      const validFiles: File[] = []
      
      selectedFiles.forEach(file => {
        if (file.size > maxSize) {
          invalidFiles.push(file.name)
        } else {
          validFiles.push(file)
        }
      })
      
      if (invalidFiles.length > 0) {
        setError(`File terlalu besar (max 10MB): ${invalidFiles.join(', ')}`)
        setTimeout(() => setError(''), 5000)
      }
      
      if (validFiles.length > 0) {
        setFiles(prev => [...prev, ...validFiles])
      }
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in')
      setUploading(false)
      return
    }

    // Upload each file
    for (const file of files) {
      try {
        setUploadStatus(prev => ({ ...prev, [file.name]: 'uploading' }))

        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `uploads/${fileName}`

        const { error: uploadError, data } = await supabase.storage
          .from('media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }))
          setError(`Failed to upload ${file.name}: ${uploadError.message}`)
          continue
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('media')
          .insert({
            filename: fileName,
            original_filename: file.name,
            mime_type: file.type,
            size: file.size,
            url: publicUrl,
            folder: 'uploads',
            uploaded_by: user.id,
          })

        if (dbError) {
          console.error('Database error:', dbError)
          setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }))
        } else {
          setUploadStatus(prev => ({ ...prev, [file.name]: 'success' }))
        }
      } catch (err) {
        console.error('Error uploading file:', err)
        setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }))
      }
    }

    setUploading(false)
    
    // Refresh after successful uploads
    setTimeout(() => {
      setFiles([])
      setUploadStatus({})
      router.refresh()
    }, 2000)
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer"
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to browse
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Support: Images, Videos, Documents (Max 10MB per file)
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition"
        >
          Browse Files
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              Selected Files ({files.length})
            </h4>
            <button
              onClick={() => setFiles([])}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {uploadStatus[file.name] === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                  {uploadStatus[file.name] === 'error' && (
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                  {uploadStatus[file.name] === 'uploading' && (
                    <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {!uploadStatus[file.name] && (
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-red-600 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            <Upload className="h-5 w-5" />
            <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
