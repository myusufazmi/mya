import { createClient } from '@/lib/supabase/server'
import { Image as ImageIcon, Upload, FileText, Film, Music, File } from 'lucide-react'
import { MediaUpload } from '@/components/admin/media-upload'
import { MediaGrid } from '@/components/admin/media-grid'

export default async function MediaLibraryPage() {
  const supabase = await createClient()
  
  // Fetch all media
  const { data: mediaFiles, error } = await supabase
    .from('media')
    .select(`
      *,
      uploader:profiles(username, full_name)
    `)
    .order('created_at', { ascending: false })

  // Calculate stats
  const totalFiles = mediaFiles?.length || 0
  const totalSize = mediaFiles?.reduce((sum, file) => sum + (file.size || 0), 0) || 0
  const images = mediaFiles?.filter(f => f.mime_type?.startsWith('image/')) || []
  const videos = mediaFiles?.filter(f => f.mime_type?.startsWith('video/')) || []
  const documents = mediaFiles?.filter(f => 
    f.mime_type?.includes('pdf') || 
    f.mime_type?.includes('document') ||
    f.mime_type?.includes('text')
  ) || []

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  if (error) {
    console.error('Error fetching media:', error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">
            Upload and manage your media files
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
            </div>
            <File className="h-8 w-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Images</p>
              <p className="text-2xl font-bold text-blue-600">{images.length}</p>
            </div>
            <ImageIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-purple-600">{videos.length}</p>
            </div>
            <Film className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-green-600">{documents.length}</p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatSize(totalSize)}
              </p>
            </div>
            <Upload className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Upload Files
        </h2>
        <MediaUpload />
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            All Files ({totalFiles})
          </h2>
        </div>
        <div className="p-6">
          <MediaGrid mediaFiles={mediaFiles || []} />
        </div>
      </div>
    </div>
  )
}
