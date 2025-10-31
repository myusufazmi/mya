'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Image as ImageIcon, FileText, Film, File, Trash2, Copy, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface MediaFile {
  id: string
  filename: string
  original_filename: string
  mime_type: string
  size: number
  url: string
  thumbnail_url?: string
  alt_text?: string
  caption?: string
  folder: string
  uploaded_by: string
  created_at: string
  uploader?: {
    username: string
    full_name?: string
  }
}

interface MediaGridProps {
  mediaFiles: MediaFile[]
}

export function MediaGrid({ mediaFiles }: MediaGridProps) {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [deleting, setDeleting] = useState(false)

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="h-6 w-6" />
    if (mimeType.startsWith('video/')) return <Film className="h-6 w-6" />
    if (mimeType.includes('pdf') || mimeType.includes('document')) return <FileText className="h-6 w-6" />
    return <File className="h-6 w-6" />
  }

  const isImage = (mimeType: string) => mimeType.startsWith('image/')

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('URL copied to clipboard!')
  }

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Delete "${file.original_filename}"?`)) return

    setDeleting(true)
    const supabase = createClient()

    // Delete from storage
    const filePath = `${file.folder}/${file.filename}`
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([filePath])

    if (storageError) {
      console.error('Error deleting from storage:', storageError)
      alert('Failed to delete file from storage')
      setDeleting(false)
      return
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('media')
      .delete()
      .eq('id', file.id)

    if (dbError) {
      console.error('Error deleting from database:', dbError)
      alert('Failed to delete file metadata')
      setDeleting(false)
      return
    }

    setDeleting(false)
    setSelectedFile(null)
    router.refresh()
  }

  if (mediaFiles.length === 0) {
    return (
      <div className="text-center py-12">
        <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No files yet
        </h3>
        <p className="text-gray-500">
          Upload your first file to get started.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mediaFiles.map((file) => (
          <div
            key={file.id}
            onClick={() => setSelectedFile(file)}
            className="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 cursor-pointer transition"
          >
            {/* Preview */}
            <div className="aspect-square flex items-center justify-center bg-gray-100">
              {isImage(file.mime_type) ? (
                <Image
                  src={file.url}
                  alt={file.alt_text || file.original_filename}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">
                  {getFileIcon(file.mime_type)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.original_filename}
              </p>
              <p className="text-xs text-gray-500">
                {formatSize(file.size)}
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    copyUrl(file.url)
                  }}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition"
                  title="Copy URL"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* File Details Modal */}
      {selectedFile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview */}
            <div className="bg-gray-900 p-8 flex items-center justify-center min-h-[300px]">
              {isImage(selectedFile.mime_type) ? (
                <Image
                  src={selectedFile.url}
                  alt={selectedFile.alt_text || selectedFile.original_filename}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[500px] object-contain"
                />
              ) : (
                <div className="text-white text-center">
                  {getFileIcon(selectedFile.mime_type)}
                  <p className="mt-4 text-lg">{selectedFile.original_filename}</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  File Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Filename</p>
                    <p className="font-medium text-gray-900">{selectedFile.original_filename}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Size</p>
                    <p className="font-medium text-gray-900">{formatSize(selectedFile.size)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-medium text-gray-900">{selectedFile.mime_type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Uploaded</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedFile.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">URL</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="text"
                        value={selectedFile.url}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                      />
                      <button
                        onClick={() => copyUrl(selectedFile.url)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <div className="flex space-x-3">
                  <a
                    href={selectedFile.url}
                    download
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleDelete(selectedFile)}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>{deleting ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
