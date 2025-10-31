import { createClient } from '@/lib/supabase/server'
import { ArrowLeft, FolderOpen, PlusCircle, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { CategoryForm } from '@/components/admin/category-form'
import { DeleteCategoryButton } from '@/components/admin/delete-category-button'

export default async function CategoriesPage() {
  const supabase = await createClient()
  
  // Fetch all categories
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/posts"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-1">
              Organize your blog posts with categories
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Category
            </h2>
            <CategoryForm />
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                All Categories ({categories?.length || 0})
              </h2>
            </div>
            
            {categories && categories.length > 0 ? (
              <div className="divide-y">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <FolderOpen className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          /{category.slug}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DeleteCategoryButton 
                        categoryId={category.id} 
                        categoryName={category.name} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No categories yet
                </h3>
                <p className="text-gray-500">
                  Create your first category to organize posts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
