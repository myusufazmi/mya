import { createClient } from '@/lib/supabase/server'
import { TrendingUp, Users, Eye, FileText, Calendar } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Fetch analytics data
  const [pages, posts, users, media] = await Promise.all([
    supabase.from('pages').select('id, created_at, views').order('created_at', { ascending: false }),
    supabase.from('posts').select('id, created_at, views').order('created_at', { ascending: false }),
    supabase.from('profiles').select('id, created_at').order('created_at', { ascending: false }),
    supabase.from('media').select('id, created_at').order('created_at', { ascending: false }),
  ])

  // Calculate stats
  const stats = {
    totalPages: pages.data?.length || 0,
    totalPosts: posts.data?.length || 0,
    totalUsers: users.data?.length || 0,
    totalMedia: media.data?.length || 0,
    totalViews: (pages.data?.reduce((sum, p) => sum + (p.views || 0), 0) || 0) +
                (posts.data?.reduce((sum, p) => sum + (p.views || 0), 0) || 0),
  }

  // Recent activity (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentPages = pages.data?.filter(p => new Date(p.created_at) > thirtyDaysAgo).length || 0
  const recentPosts = posts.data?.filter(p => new Date(p.created_at) > thirtyDaysAgo).length || 0
  const recentUsers = users.data?.filter(u => new Date(u.created_at) > thirtyDaysAgo).length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of your site's performance
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalViews.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-4">
            ↑ All time
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Pages</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalPages}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            +{recentPages} this month
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalPosts}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            +{recentPosts} this month
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalUsers}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            +{recentUsers} this month
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Media Files</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalMedia}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            In library
          </p>
        </div>
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Pages
            </h2>
          </div>
          <div className="p-6">
            {pages.data && pages.data.length > 0 ? (
              <div className="space-y-4">
                {pages.data.slice(0, 5).map((page, idx) => (
                  <div key={page.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                        #{idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Page {page.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(page.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {page.views || 0} views
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No pages yet
              </p>
            )}
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Posts
            </h2>
          </div>
          <div className="p-6">
            {posts.data && posts.data.length > 0 ? (
              <div className="space-y-4">
                {posts.data.slice(0, 5).map((post, idx) => (
                  <div key={post.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                        #{idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Post {post.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {post.views || 0} views
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No posts yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{recentPages} pages</span> created in the last 30 days
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{recentPosts} posts</span> published in the last 30 days
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{recentUsers} users</span> registered in the last 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
