import { createClient } from '@/lib/supabase/server'
import { ThemeFormComponent } from '@/components/admin/theme-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditThemePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Fetch theme data
  const { data: theme, error } = await supabase
    .from('themes')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !theme) {
    notFound()
  }

  const themeData = {
    id: theme.id,
    name: theme.display_name,
    description: theme.description,
    version: theme.version,
    author: theme.author,
    config: theme.config,
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Theme</h1>
          <p className="text-gray-600 mt-1">
            Update theme settings and configuration
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border shadow-sm">
        <ThemeFormComponent initialData={themeData} />
      </div>
    </div>
  )
}
