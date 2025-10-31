'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Save, PlusCircle, Trash2, MoveUp, MoveDown, ExternalLink } from 'lucide-react'

interface MenuItem {
  id?: string
  title: string
  url: string
  target: string
  order: number
  parent_id?: string | null
}

interface MenuFormProps {
  menuId?: string
  initialData?: {
    name: string
    location: string
    description?: string
    is_disabled?: boolean
    menu_items?: MenuItem[]
  }
}

export function MenuForm({ menuId, initialData }: MenuFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || 'header',
    description: initialData?.description || '',
    is_disabled: initialData?.is_disabled || false,
  })
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialData?.menu_items || [])
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch available pages
  useEffect(() => {
    const fetchPages = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('pages')
        .select('id, title, slug')
        .eq('status', 'published')
        .order('title')
      
      if (data) {
        setPages(data)
      }
    }
    fetchPages()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const addMenuItem = () => {
    setMenuItems(prev => [...prev, {
      title: '',
      url: '',
      target: '_self',
      order: prev.length,
    }])
  }

  const updateMenuItem = (index: number, field: string, value: string | number) => {
    setMenuItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ))
  }

  const removeMenuItem = (index: number) => {
    setMenuItems(prev => prev.filter((_, i) => i !== index))
  }

  const moveMenuItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === menuItems.length - 1) return

    const newItems = [...menuItems]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    ;[newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]]
    
    // Update order
    newItems.forEach((item, i) => {
      item.order = i
    })
    
    setMenuItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    try {
      let currentMenuId = menuId

      if (menuId) {
        // Update menu
        const { error: updateError } = await supabase
          .from('menus')
          .update(formData)
          .eq('id', menuId)

        if (updateError) throw updateError

        // Delete existing menu items
        await supabase
          .from('menu_items')
          .delete()
          .eq('menu_id', menuId)
      } else {
        // Create new menu
        const { data: newMenu, error: createError } = await supabase
          .from('menus')
          .insert([formData])
          .select()
          .single()

        if (createError) throw createError
        currentMenuId = newMenu.id
      }

      // Insert menu items
      if (menuItems.length > 0 && currentMenuId) {
        const itemsToInsert = menuItems.map((item, index) => ({
          menu_id: currentMenuId,
          title: item.title,
          url: item.url,
          target: item.target,
          order: index,
          parent_id: item.parent_id || null,
        }))

        const { error: itemsError } = await supabase
          .from('menu_items')
          .insert(itemsToInsert)

        if (itemsError) throw itemsError
      }

      router.push('/admin/menus')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to save menu')
      setLoading(false)
    }
  }

  const handlePageSelect = (index: number, pageSlug: string) => {
    updateMenuItem(index, 'url', `/${pageSlug}`)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Menu Settings */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Menu Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Menu Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Main Menu"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="header">Header</option>
              <option value="footer">Footer</option>
              <option value="sidebar">Sidebar</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Optional description for this menu"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_disabled"
            name="is_disabled"
            checked={formData.is_disabled}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="is_disabled" className="ml-2 block text-sm text-gray-700">
            Disable this menu
          </label>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-6 border-t pt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Menu Items</h2>
          <button
            type="button"
            onClick={addMenuItem}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Item</span>
          </button>
        </div>

        {menuItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-600 mb-4">No menu items yet</p>
            <button
              type="button"
              onClick={addMenuItem}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add First Item</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  {/* Title */}
                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateMenuItem(index, 'title', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Home"
                    />
                  </div>

                  {/* URL */}
                  <div className="md:col-span-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      URL *
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => updateMenuItem(index, 'url', e.target.value)}
                        required
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="/about"
                      />
                      <select
                        value=""
                        onChange={(e) => handlePageSelect(index, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">Quick Select</option>
                        {pages.map((page) => (
                          <option key={page.id} value={page.slug}>
                            {page.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Target */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Target
                    </label>
                    <select
                      value={item.target}
                      onChange={(e) => updateMenuItem(index, 'target', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="_self">Same Window</option>
                      <option value="_blank">New Tab</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-3 flex items-end space-x-1">
                    <button
                      type="button"
                      onClick={() => moveMenuItem(index, 'up')}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:bg-white rounded transition disabled:opacity-30"
                      title="Move Up"
                    >
                      <MoveUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveMenuItem(index, 'down')}
                      disabled={index === menuItems.length - 1}
                      className="p-2 text-gray-600 hover:bg-white rounded transition disabled:opacity-30"
                      title="Move Down"
                    >
                      <MoveDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMenuItem(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-6 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          <span>{loading ? 'Saving...' : 'Save Menu'}</span>
        </button>
      </div>
    </form>
  )
}
