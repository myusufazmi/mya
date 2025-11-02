import { ThemeFormComponent } from '@/components/admin/theme-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewThemePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/themes"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Theme</h1>
          <p className="text-gray-600 mt-1">
            Create a custom theme for your site
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border shadow-sm">
        <ThemeFormComponent />
      </div>
    </div>
  )
}
