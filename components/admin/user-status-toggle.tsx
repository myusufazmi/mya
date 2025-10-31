'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, Unlock } from 'lucide-react'

interface UserStatusToggleProps {
  userId: string
  isBlocked: boolean
}

export function UserStatusToggle({ userId, isBlocked }: UserStatusToggleProps) {
  const router = useRouter()
  const [blocked, setBlocked] = useState(isBlocked)
  const [updating, setUpdating] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleToggle = async () => {
    setUpdating(true)
    const supabase = createClient()

    const newStatus = !blocked

    const { error } = await supabase
      .from('profiles')
      .update({ is_blocked: newStatus })
      .eq('id', userId)

    if (error) {
      console.error('Error updating status:', error)
      alert('Failed to update user status')
      setUpdating(false)
      return
    }

    setBlocked(newStatus)
    setUpdating(false)
    setShowConfirm(false)
    router.refresh()
  }

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {blocked ? 'Unblock User?' : 'Block User?'}
          </h3>
          <p className="text-gray-600 mb-4">
            {blocked 
              ? 'This user will be able to access the system again.'
              : 'This user will be blocked from accessing the system.'}
          </p>
          <div className="flex space-x-3 justify-end">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              onClick={handleToggle}
              disabled={updating}
              className={`px-4 py-2 text-white rounded-lg transition disabled:opacity-50 ${
                blocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {updating ? 'Updating...' : blocked ? 'Unblock' : 'Block'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      disabled={updating}
      className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition disabled:opacity-50 ${
        blocked
          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
          : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
      }`}
    >
      {blocked ? (
        <>
          <Lock className="h-4 w-4 mr-1" />
          Blocked
        </>
      ) : (
        <>
          <Unlock className="h-4 w-4 mr-1" />
          Active
        </>
      )}
    </button>
  )
}
