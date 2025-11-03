import { ActivityLogs } from '@/components/admin/activity-logs'
import { Activity } from 'lucide-react'

export default function LogsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-1">
            Track all system activities and user actions
          </p>
        </div>
        <Activity className="h-8 w-8 text-gray-400" />
      </div>

      {/* Activity Logs Component */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <ActivityLogs limit={100} showFilters={true} />
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">About Activity Logs</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Logs are automatically created for all CRUD operations</li>
          <li>• Filter by action type (create, update, delete) or entity type</li>
          <li>• Each log includes user info, timestamp, and IP address</li>
          <li>• Logs are stored for audit and security purposes</li>
        </ul>
      </div>
    </div>
  )
}
