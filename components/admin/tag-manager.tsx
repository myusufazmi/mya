'use client'

import { useState } from 'react'
import { Plus, X, Tag as TagIcon, Edit2, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Tag {
  id: string
  name: string
  slug: string
  count?: number
}

interface TagManagerProps {
  initialTags: Tag[]
}

export function TagManager({ initialTags }: TagManagerProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newTagName, setNewTagName] = useState('')
  const [editTagName, setEditTagName] = useState('')

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleAdd = async () => {
    if (!newTagName.trim()) return

    const supabase = createClient()
    const slug = generateSlug(newTagName)

    const { data, error } = await supabase
      .from('tags')
      .insert([{ name: newTagName, slug }])
      .select()
      .single()

    if (error) {
      alert('Error creating tag: ' + error.message)
      return
    }

    if (data) {
      setTags([...tags, data])
      setNewTagName('')
      setIsAdding(false)
    }
  }

  const handleEdit = async (id: string) => {
    if (!editTagName.trim()) return

    const supabase = createClient()
    const slug = generateSlug(editTagName)

    const { error } = await supabase
      .from('tags')
      .update({ name: editTagName, slug })
      .eq('id', id)

    if (error) {
      alert('Error updating tag: ' + error.message)
      return
    }

    setTags(tags.map(tag => 
      tag.id === id ? { ...tag, name: editTagName, slug } : tag
    ))
    setEditingId(null)
    setEditTagName('')
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete tag "${name}"?`)) return

    const supabase = createClient()
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting tag: ' + error.message)
      return
    }

    setTags(tags.filter(tag => tag.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tags
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage post tags
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add Tag</span>
        </button>
      </div>

      {/* Add New Tag */}
      {isAdding && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Tag name..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              autoFocus
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAdding(false)
                setNewTagName('')
              }}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tags List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg group hover:shadow-sm transition"
          >
            {editingId === tag.id ? (
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={editTagName}
                  onChange={(e) => setEditTagName(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleEdit(tag.id)}
                  autoFocus
                />
                <button
                  onClick={() => handleEdit(tag.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null)
                    setEditTagName('')
                  }}
                  className="text-gray-600 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2 flex-1">
                  <TagIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {tag.name}
                  </span>
                  {tag.count !== undefined && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({tag.count})
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => {
                      setEditingId(tag.id)
                      setEditTagName(tag.name)
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id, tag.name)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {tags.length === 0 && !isAdding && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <TagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No tags yet</p>
          <button
            onClick={() => setIsAdding(true)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first tag
          </button>
        </div>
      )}
    </div>
  )
}
