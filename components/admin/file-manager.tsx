'use client'

import { useState, useRef, DragEvent } from 'react'
import { 
  Upload, 
  File, 
  Image as ImageIcon, 
  Video, 
  FileText,
  X,
  Download,
  Trash2,
  Eye,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface FileItem {
  id: string
  name: string
  url: string
  size: number
  type: string
  created_at: string
}

interface FileManagerProps {
  bucket?: string
  path?: string
  accept?: string
  maxSize?: number // in bytes
  onFileSelect?: (file: FileItem) => void
  allowMultiple?: boolean
}

export function FileManager({
  bucket = 'media',
  path = '',
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  onFileSelect,
  allowMultiple = false,
}: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get file icon
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return ImageIcon
    if (type.startsWith('video/')) return Video
    if (type.startsWith('text/') || type.includes('document')) return FileText
    return File
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  // Handle file upload
  const handleUpload = async (fileList: FileList) => {
    const supabase = createClient()
    setUploading(true)

    try {
      const uploadedFiles: FileItem[] = []

      for (const file of Array.from(fileList)) {
        // Check file size
        if (file.size > maxSize) {
          alert(`File ${file.name} is too large. Max size: ${formatFileSize(maxSize)}`)
          continue
        }

        // Generate unique filename
        const timestamp = Date.now()
        const fileName = `${timestamp}-${file.name}`
        const filePath = path ? `${path}/${fileName}` : fileName

        // Upload to Supabase
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file)

        if (error) {
          console.error('Upload error:', error)
          alert(`Failed to upload ${file.name}`)
          continue
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath)

        const fileItem: FileItem = {
          id: timestamp.toString(),
          name: file.name,
          url: urlData.publicUrl,
          size: file.size,
          type: file.type,
          created_at: new Date().toISOString(),
        }

        uploadedFiles.push(fileItem)
      }

      setFiles([...uploadedFiles, ...files])
      
      // Call onFileSelect if single file
      if (!allowMultiple && uploadedFiles.length > 0) {
        onFileSelect?.(uploadedFiles[0])
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload files')
    } finally {
      setUploading(false)
    }
  }

  // Handle drag events
  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files)
    }
  }

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files)
    }
  }

  // Handle delete
  const handleDelete = async (file: FileItem) => {
    if (!confirm(`Delete ${file.name}?`)) return

    const supabase = createClient()
    const filePath = path ? `${path}/${file.name}` : file.name

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      alert('Failed to delete file')
      return
    }

    setFiles(files.filter((f) => f.id !== file.id))
    if (selectedFile?.id === file.id) {
      setSelectedFile(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={allowMultiple}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Drag and drop files here, or{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              browse
            </button>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Max file size: {formatFileSize(maxSize)}
          </p>
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uploading...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* File Grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => {
            const Icon = getFileIcon(file.type)
            const isImage = file.type.startsWith('image/')

            return (
              <div
                key={file.id}
                className={`relative group bg-white dark:bg-gray-800 rounded-lg border-2 overflow-hidden cursor-pointer transition ${
                  selectedFile?.id === file.id
                    ? 'border-blue-500'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => {
                  setSelectedFile(file)
                  onFileSelect?.(file)
                }}
              >
                {/* Preview */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  {isImage ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon className="h-16 w-16 text-gray-400" />
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(file)
                    }}
                    className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
