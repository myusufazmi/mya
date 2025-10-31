import { createClient } from '@/lib/supabase/server'
import { MenuForm } from '@/components/admin/menu-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditMenuPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch menu with items
  const { data: menu, error } = await supabase
    .from('menus')
    .select(`
      *,
      menu_items(*)
    `)
    .eq('id', id)
    .single()

  if (error || !menu) {
    notFound()
  }

  // Sort menu items by order
  if (menu.menu_items) {
    menu.menu_items.sort((a: any, b: any) => a.order - b.order)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/menus"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Menu</h1>
          <p className="text-gray-600 mt-1">
            Update menu settings and items
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border shadow-sm">
        <MenuForm menuId={menu.id} initialData={menu} />
      </div>
    </div>
  )
}
