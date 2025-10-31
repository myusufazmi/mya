import Link from 'next/link'
import { Newspaper } from 'lucide-react'

export default function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Newspaper className="h-24 w-24 text-gray-400 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Not Found</h1>
      <p className="text-gray-600 mb-6">
        The post you&apos;re looking for doesn&apos;t exist or has been deleted.
      </p>
      <Link
        href="/admin/posts"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Posts
      </Link>
    </div>
  )
}
