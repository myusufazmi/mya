import { createClient } from '@/lib/supabase/server'
import { FileText, Newspaper, Users, Image } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get statistics
  const [
    { count: pagesCount },
    { count: postsCount },
    { count: usersCount },
    { count: mediaCount },
  ] = await Promise.all([
    supabase.from('pages').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('media').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      label: 'Total Pages',
      value: pagesCount || 0,
      icon: FileText,
      color: 'blue',
    },
    {
      label: 'Total Posts',
      value: postsCount || 0,
      icon: Newspaper,
      color: 'green',
    },
    {
      label: 'Total Users',
      value: usersCount || 0,
      icon: Users,
      color: 'purple',
    },
    {
      label: 'Media Files',
      value: mediaCount || 0,
      icon: Image,
      color: 'orange',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here&apos;s an overview of your CMS.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/admin/pages/new"
              className="block p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition text-center text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              + Create New Page
            </a>
            <a
              href="/admin/posts/new"
              className="block p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition text-center text-sm font-medium text-gray-600 hover:text-green-600"
            >
              + Create New Post
            </a>
            <a
              href="/admin/media"
              className="block p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition text-center text-sm font-medium text-gray-600 hover:text-purple-600"
            >
              + Upload Media
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Getting Started
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Create your first page</p>
                <p className="text-xs text-gray-500">Use the page builder to design your content</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-green-600">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Customize your theme</p>
                <p className="text-xs text-gray-500">Choose colors, fonts, and layouts</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-purple-600">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Install plugins</p>
                <p className="text-xs text-gray-500">Extend functionality with plugins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
