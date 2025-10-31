import { createClient } from '@/lib/supabase/server'
import { Menu as MenuIcon, PlusCircle, Edit, Trash2, List } from 'lucide-react'
import Link from 'next/link'
import { DeleteMenuButton } from '@/components/admin/delete-menu-button'

export default async function MenusPage() {
  const supabase = await createClient()
  
  // Fetch all menus
  const { data: menus, error } = await supabase
    .from('menus')
    .select(`
      *,
      menu_items:menu_items(count)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching menus:', error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menus</h1>
          <p className="text-gray-600 mt-1">
            Manage your site navigation menus
          </p>
        </div>
        <Link
          href="/admin/menus/new"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle className="h-5 w-5" />
          <span>New Menu</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Menus</p>
              <p className="text-2xl font-bold text-gray-900">
                {menus?.length || 0}
              </p>
            </div>
            <MenuIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-green-600">
                {menus?.reduce((sum, m) => sum + (m.menu_items?.[0]?.count || 0), 0) || 0}
              </p>
            </div>
            <List className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Menus</p>
              <p className="text-2xl font-bold text-purple-600">
                {menus?.filter(m => !m.is_disabled).length || 0}
              </p>
            </div>
            <MenuIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Menus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus && menus.length > 0 ? (
          menus.map((menu) => (
            <div
              key={menu.id}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MenuIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {menu.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {menu.location}
                      </p>
                    </div>
                  </div>
                </div>

                {menu.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {menu.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Items:</span>
                      <span className="ml-1 font-semibold text-gray-900">
                        {menu.menu_items?.[0]?.count || 0}
                      </span>
                    </div>
                    <div>
                      {menu.is_disabled ? (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Disabled
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/menus/${menu.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit Menu"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteMenuButton menuId={menu.id} menuName={menu.name} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="bg-white rounded-lg border p-12 text-center">
              <MenuIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No menus yet
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first navigation menu.
              </p>
              <Link
                href="/admin/menus/new"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create Your First Menu</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
