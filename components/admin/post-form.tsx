'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils/slug'
import { Save, Eye, ImageIcon, X } from 'lucide-react'
import { RichTextEditor } from './rich-text-editor'
import { TagManager } from './tag-manager'
import { SEOMetadata } from './seo-metadata'
import { MediaPickerModal } from './media-picker-modal'

interface PostFormProps {
  postId?: string
  initialData?: {
    title: string
    slug: string
    content: any
    excerpt?: string
    status: string
    category_id?: string
    featured_image_url?: string
    tags?: string[]
    seo_title?: string
    seo_description?: string
    seo_keywords?: string
    og_title?: string
    og_description?: string
    og_image?: string
    canonical_url?: string
    published_at?: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
}

export function PostForm({ postId, initialData }: PostFormProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [allTags, setAllTags] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    status: initialData?.status || 'draft',
    category_id: initialData?.category_id || '',
    featured_image_url: initialData?.featured_image_url || '',
  })
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || [])
  const [seoData, setSeoData] = useState({
    seo_title: initialData?.seo_title || '',
    seo_description: initialData?.seo_description || '',
    seo_keywords: initialData?.seo_keywords || '',
    og_title: initialData?.og_title || '',
    og_description: initialData?.og_description || '',
    og_image: initialData?.og_image || '',
    canonical_url: initialData?.canonical_url || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  // Fetch categories and tags
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name')
      if (categoriesData) {
        setCategories(categoriesData)
      }

      // Fetch tags
      const { data: tagsData } = await supabase
        .from('tags')
        .select('*')
        .order('name')
      if (tagsData) {
        setAllTags(tagsData)
      }
    }
    fetchData()
  }, [])

  // Auto-generate slug from title
  useEffect(() => {
    if (!postId && formData.title && !initialData?.slug) {
      const slug = generateSlug(formData.title)
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, postId, initialData?.slug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent, status?: string) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in')
      setLoading(false)
      return
    }

    const postData = {
      ...formData,
      ...seoData,
      category_id: formData.category_id || null,
      status: status || formData.status,
      author_id: user.id,
      tags: selectedTags,
      published_at: status === 'published' && !initialData ? new Date().toISOString() : initialData?.status === 'published' ? initialData.published_at : null,
    }

    let result
    if (postId) {
      // Update existing post
      result = await supabase
        .from('posts')
        .update(postData)
        .eq('id', postId)
    } else {
      // Create new post
      result = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single()
    }

    if (result.error) {
      setError(result.error.message)
      setLoading(false)
      return
    }

    // Success - redirect to posts list
    router.push('/admin/posts')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Post Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            URL Slug *
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="post-url-slug"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL: /blog/{formData.slug}
          </p>
        </div>
      </div>

      {/* Featured Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
        </label>
        {formData.featured_image_url ? (
          <div className="relative inline-block">
            <img
              src={formData.featured_image_url}
              alt="Featured"
              className="h-48 w-auto rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, featured_image_url: '' }))}
              className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowMediaPicker(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <ImageIcon className="h-4 w-4" />
            <span>Select Image</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content *
        </label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          placeholder="Start writing your post..."
        />
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Short description of the post for previews"
        />
      </div>

      {/* Category & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">No Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {categories.length === 0 && (
            <p className="text-xs text-gray-500 mt-1">
              No categories yet. Create one first!
            </p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tagId) => {
              const tag = allTags.find(t => t.id === tagId)
              return tag ? (
                <span
                  key={tagId}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  <span>{tag.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedTags(prev => prev.filter(id => id !== tagId))}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ) : null
            })}
          </div>
          <select
            value=""
            onChange={(e) => {
              const tagId = e.target.value
              if (tagId && !selectedTags.includes(tagId)) {
                setSelectedTags(prev => [...prev, tagId])
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Add a tag...</option>
            {allTags.filter(tag => !selectedTags.includes(tag.id)).map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO & Social Media</h3>
        <SEOMetadata 
          value={{
            title: seoData.seo_title,
            description: seoData.seo_description,
            keywords: seoData.seo_keywords?.split(',').map(k => k.trim()).filter(k => k),
            ogTitle: seoData.og_title,
            ogDescription: seoData.og_description,
            ogImage: seoData.og_image,
            canonical: seoData.canonical_url,
          }}
          onChange={(data) => setSeoData({
            seo_title: data.title || '',
            seo_description: data.description || '',
            seo_keywords: Array.isArray(data.keywords) ? data.keywords.join(', ') : '',
            og_title: data.ogTitle || '',
            og_description: data.ogDescription || '',
            og_image: data.ogImage || '',
            canonical_url: data.canonical || '',
          })}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>Save as Draft</span>
          </button>
          
          <button
            type="submit"
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Eye className="h-4 w-4" />
            <span>{loading ? 'Publishing...' : 'Publish'}</span>
          </button>
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(media) => {
          setFormData(prev => ({ ...prev, featured_image_url: media.file_path }))
        }}
        selectedId={formData.featured_image_url}
      />
    </form>
  )
}
