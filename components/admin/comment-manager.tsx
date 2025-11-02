'use client'

import { useState } from 'react'
import { MessageSquare, Check, X, Trash2, Flag } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Comment {
  id: string
  content: string
  author_name: string
  author_email: string
  status: 'pending' | 'approved' | 'spam'
  created_at: string
  post?: {
    title: string
    slug: string
  }
}

interface CommentManagerProps {
  initialComments: Comment[]
  postId?: string
}

export function CommentManager({ initialComments, postId }: CommentManagerProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'spam'>('all')

  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(c => c.status === filter)

  const handleApprove = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('comments')
      .update({ status: 'approved' })
      .eq('id', id)

    if (error) {
      alert('Error approving comment: ' + error.message)
      return
    }

    setComments(comments.map(c => 
      c.id === id ? { ...c, status: 'approved' as const } : c
    ))
  }

  const handleMarkAsSpam = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('comments')
      .update({ status: 'spam' })
      .eq('id', id)

    if (error) {
      alert('Error marking as spam: ' + error.message)
      return
    }

    setComments(comments.map(c => 
      c.id === id ? { ...c, status: 'spam' as const } : c
    ))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this comment permanently?')) return

    const supabase = createClient()
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting comment: ' + error.message)
      return
    }

    setComments(comments.filter(c => c.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'spam':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header & Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Comments ({filteredComments.length})
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          {['all', 'pending', 'approved', 'spam'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== 'all' && (
                <span className="ml-1">
                  ({comments.filter(c => c.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {filteredComments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No comments in this category
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {comment.author_name}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                      {comment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comment.author_email}
                  </p>
                  {comment.post && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      On: <span className="text-blue-600 dark:text-blue-400">{comment.post.title}</span>
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>

              <div className="flex items-center space-x-2">
                {comment.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(comment.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                  >
                    <Check className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                )}
                {comment.status !== 'spam' && (
                  <button
                    onClick={() => handleMarkAsSpam(comment.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Spam</span>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
