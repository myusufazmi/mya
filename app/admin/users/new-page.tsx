import { createClient } from '@/lib/supabase/server'
import { Users, UserCheck, Shield } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { DataTable, Column } from '@/components/admin/data-table'
import { EmptyState } from '@/components/admin/empty-state'
import { format } from 'date-fns'

interface Profile {
  id: string
  username: string
  full_name: string | null
  email: string | null
  role: string
  is_blocked: boolean | null
  created_at: string
}

export default async function UsersPageNew() {
  const supabase = await createClient()
  
  // Fetch all users with profiles
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  // Calculate stats
  const totalUsers = profiles?.length || 0
  const admins = profiles?.filter(p => p.role === 'admin' || p.role === 'super_admin').length || 0
  const editors = profiles?.filter(p => p.role === 'editor').length || 0
  const activeUsers = profiles?.filter(p => !p.is_blocked).length || 0

  if (error) {
    console.error('Error fetching users:', error)
  }

  // Define table columns
  const columns: Column<Profile>[] = [
    {
      key: 'username',
      label: 'User',
      sortable: true,
      render: (profile) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                {profile.full_name?.charAt(0).toUpperCase() || 
                 profile.username?.charAt(0).toUpperCase() || 
                 'U'}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {profile.full_name || profile.username}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              @{profile.username}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (profile) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {profile.email || '-'}
        </span>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (profile) => {
        const roleColors = {
          super_admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
          admin: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
          editor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          author: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        }
        const colorClass = roleColors[profile.role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {profile.role}
          </span>
        )
      },
    },
    {
      key: 'is_blocked',
      label: 'Status',
      sortable: true,
      render: (profile) => (
        profile.is_blocked ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Blocked
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
        )
      ),
    },
    {
      key: 'created_at',
      label: 'Joined',
      sortable: true,
      render: (profile) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {format(new Date(profile.created_at), 'MMM dd, yyyy')}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Users"
        description="Manage user accounts and permissions"
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Users' },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
              <p className="text-2xl font-bold text-purple-600">{admins}</p>
            </div>
            <Shield className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Editors</p>
              <p className="text-2xl font-bold text-green-600">{editors}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-blue-600">{activeUsers}</p>
            </div>
            <UserCheck className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        data={profiles || []}
        columns={columns}
        searchable
        searchPlaceholder="Search users..."
        emptyState={
          <EmptyState
            icon={Users}
            title="No users yet"
            description="Users will appear here after registration."
          />
        }
      />
    </div>
  )
}
