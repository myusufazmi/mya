'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'
import { 
  Activity, 
  Filter,
  RefreshCcw,
  User,
  FileText,
  Settings,
  Image,
  Trash2
} from 'lucide-react'

interface ActivityLog {
  id: string
  user_id: string
  action: string
  entity_type: string
  entity_id?: string
  details?: any
  ip_address?: string
  user_agent?: string
  created_at: string
  profiles?: {
    username: string
    full_name: string
  }
}

interface ActivityLogsProps {
  limit?: number
  showFilters?: boolean
}

export function ActivityLogs({ limit = 50, showFilters = true }: ActivityLogsProps) {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [entityFilter, setEntityFilter] = useState<string>('all')

  useEffect(() => {
    fetchLogs()
  }, [filter, entityFilter, limit])

  const fetchLogs = async () => {
    setLoading(true)
    const supabase = createClient()

    let query = supabase
      .from('activity_logs')
      .select('*, profiles:user_id(username, full_name)')
      .order('created_at', { ascending: false })
      .limit(limit)

    // Apply filters
    if (filter !== 'all') {
      query = query.eq('action', filter)
    }
    if (entityFilter !== 'all') {
      query = query.eq('entity_type', entityFilter)
    }

    const { data, error } = await query

    if (!error && data) {
      setLogs(data)
    }
    setLoading(false)
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <FileText className="h-4 w-4 text-green-600" />
      case 'update':
        return <Settings className="h-4 w-4 text-blue-600" />
      case 'delete':
        return <Trash2 className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800'
      case 'update':
        return 'bg-blue-100 text-blue-800'
      case 'delete':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'post':
      case 'page':
        return <FileText className="h-4 w-4" />
      case 'user':
        return <User className="h-4 w-4" />
      case 'media':
        return <Image className="h-4 w-4" />
      case 'settings':
        return <Settings className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Header & Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Activity Logs</h3>
        </div>
        
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
          title="Refresh"
        >
          <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3">
          {/* Action Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>

          {/* Entity Filter */}
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="post">Posts</option>
            <option value="page">Pages</option>
            <option value="user">Users</option>
            <option value="media">Media</option>
            <option value="settings">Settings</option>
          </select>
        </div>
      )}

      {/* Logs List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          <RefreshCcw className="h-8 w-8 mx-auto animate-spin mb-2" />
          Loading activity logs...
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No activity logs found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition"
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getActionIcon(log.action)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {/* Action Badge */}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>

                  {/* Entity Type */}
                  <span className="inline-flex items-center space-x-1 text-xs text-gray-600">
                    {getEntityIcon(log.entity_type)}
                    <span>{log.entity_type}</span>
                  </span>

                  {/* User */}
                  {log.profiles && (
                    <span className="text-xs text-gray-500">
                      by <span className="font-medium">{log.profiles.username}</span>
                    </span>
                  )}
                </div>

                {/* Details */}
                {log.details && (
                  <p className="text-sm text-gray-700 mb-1">
                    {typeof log.details === 'string' 
                      ? log.details 
                      : JSON.stringify(log.details).substring(0, 100)}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>{formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}</span>
                  {log.ip_address && (
                    <span>IP: {log.ip_address}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && logs.length >= limit && (
        <div className="text-center pt-4">
          <button
            onClick={() => {/* Implement pagination */}}
            className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
