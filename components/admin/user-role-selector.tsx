'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface UserRoleSelectorProps {
  userId: string
  currentRole: string
}

export function UserRoleSelector({ userId, currentRole }: UserRoleSelectorProps) {
  const router = useRouter()
  const [role, setRole] = useState(currentRole)
  const [updating, setUpdating] = useState(false)

  const handleRoleChange = async (newRole: string) => {
    if (newRole === role) return

    setUpdating(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)

    if (error) {
      console.error('Error updating role:', error)
      alert('Failed to update role')
      setUpdating(false)
      return
    }

    setRole(newRole)
    setUpdating(false)
    router.refresh()
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'editor':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'author':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRoleLabel = (role: string) => {
    return role.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <select
      value={role}
      onChange={(e) => handleRoleChange(e.target.value)}
      disabled={updating}
      className={`text-xs font-semibold px-3 py-1 rounded-full border ${getRoleBadgeColor(role)} cursor-pointer hover:opacity-80 transition disabled:opacity-50`}
    >
      <option value="subscriber">Subscriber</option>
      <option value="author">Author</option>
      <option value="editor">Editor</option>
      <option value="admin">Admin</option>
      <option value="super_admin">Super Admin</option>
    </select>
  )
}
