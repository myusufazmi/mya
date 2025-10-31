'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Eye, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface SubmissionActionsProps {
  submissionId: string
  isRead: boolean
}

export function SubmissionActions({ submissionId, isRead }: SubmissionActionsProps) {
  const router = useRouter()
  const [updating, setUpdating] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleMarkAsRead = async () => {
    setUpdating(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('contact_submissions')
      .update({ is_read: !isRead })
      .eq('id', submissionId)

    if (error) {
      console.error('Error updating submission:', error)
      alert('Failed to update submission')
    } else {
      router.refresh()
    }
    setUpdating(false)
  }

  const handleDelete = async () => {
    setUpdating(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', submissionId)

    if (error) {
      console.error('Error deleting submission:', error)
      alert('Failed to delete submission')
      setUpdating(false)
      return
    }

    router.refresh()
    setShowConfirm(false)
  }

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Delete Submission?
          </h3>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this contact submission? This action cannot be undone.
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
              onClick={handleDelete}
              disabled={updating}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {updating ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <button
        onClick={handleMarkAsRead}
        disabled={updating}
        className={`p-2 rounded-lg transition disabled:opacity-50 ${
          isRead 
            ? 'text-gray-600 hover:bg-gray-100' 
            : 'text-blue-600 hover:bg-blue-50'
        }`}
        title={isRead ? 'Mark as Unread' : 'Mark as Read'}
      >
        {isRead ? <Eye className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
      </button>
      <button
        onClick={() => setShowConfirm(true)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
