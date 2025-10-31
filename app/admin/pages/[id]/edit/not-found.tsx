import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <FileQuestion className="h-24 w-24 text-gray-400 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you&apos;re looking for doesn&apos;t exist or has been deleted.
      </p>
      <Link
        href="/admin/pages"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Pages
      </Link>
    </div>
  )
}
