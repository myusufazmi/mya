'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { 
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Undo, Redo, ImageIcon, Link as LinkIcon
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('bold') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('italic') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('strike') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('code') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Code"
        >
          <Code className="h-4 w-4" />
        </button>

        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('heading', { level: 3 }) ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>

        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('bulletList') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('orderedList') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('blockquote') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Media & Links */}
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Add Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('link') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[200px]" />

      {/* Character Count */}
      <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-600">
        {editor.storage.characterCount?.characters() || 0} characters
      </div>
    </div>
  )
}
