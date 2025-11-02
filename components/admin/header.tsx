'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function AdminHeader() {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 px-6 flex items-center justify-between shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <Link
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
