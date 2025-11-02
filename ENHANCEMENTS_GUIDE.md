# 🚀 Optional Enhancements - Complete Guide

## ✅ Implemented Enhancements

Complete guide untuk semua optional enhancements yang sudah diimplementasikan.

---

## 📝 **1. Rich Text Editor (Tiptap)** ✅ IMPLEMENTED

### **Location:**
```
components/editor/rich-text-editor.tsx
```

### **Features:**
- ✅ Full WYSIWYG editor
- ✅ Text formatting (Bold, Italic, Strike, Code)
- ✅ Headings (H1-H6)
- ✅ Lists (Bullet, Numbered)
- ✅ Blockquotes
- ✅ Images & Links
- ✅ Undo/Redo
- ✅ Character count
- ✅ Dark mode support

### **Usage:**

```tsx
'use client'

import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { useState } from 'react'

export function MyComponent() {
  const [content, setContent] = useState('<p>Initial content</p>')

  return (
    <RichTextEditor
      content={content}
      onChange={setContent}
      placeholder="Start typing..."
    />
  )
}
```

### **Integration Examples:**

**In Post Form:**
```tsx
// app/admin/posts/[id]/edit/page.tsx
<RichTextEditor
  content={post.content}
  onChange={(html) => setPost({ ...post, content: html })}
/>
```

**In Page Builder:**
```tsx
// Add as a new block type
{
  type: 'richtext',
  name: 'Rich Text',
  icon: Type,
  defaultContent: {
    html: '<p>Start writing...</p>'
  }
}
```

### **Toolbar Features:**

- **Text**: Bold, Italic, Strikethrough, Code
- **Headings**: H1, H2, H3
- **Lists**: Bullet, Numbered, Blockquote
- **Media**: Image insert, Link insert
- **Actions**: Undo, Redo

---

## 📧 **2. Email Notifications** ✅ IMPLEMENTED

### **Location:**
```
lib/email/send-email.ts
```

### **Setup:**

**1. Install Resend:**
```bash
npm install resend
```

**2. Add Environment Variable:**
```env
# .env.local
RESEND_API_KEY=re_your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**3. Get API Key:**
- Sign up at https://resend.com
- Create API key
- Add to .env.local

### **Available Templates:**

**Welcome Email:**
```typescript
import { sendEmail, emailTemplates } from '@/lib/email/send-email'

const { html, subject } = emailTemplates.welcome('John Doe')
await sendEmail({
  to: 'user@example.com',
  subject,
  html
})
```

**Contact Notification:**
```typescript
const { html, subject } = emailTemplates.contactNotification(
  'John Doe',
  'john@example.com',
  'Question',
  'Hello, I have a question...'
)

await sendEmail({
  to: 'admin@example.com',
  subject,
  html
})
```

**Password Reset:**
```typescript
const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset?token=xxx`
const { html, subject } = emailTemplates.passwordReset(resetLink)

await sendEmail({
  to: 'user@example.com',
  subject,
  html
})
```

**Post Published:**
```typescript
const { html, subject } = emailTemplates.postPublished(
  'My Blog Post',
  'https://example.com/blog/my-post'
)

await sendEmail({
  to: 'subscribers@example.com',
  subject,
  html
})
```

### **Custom Email:**

```typescript
await sendEmail({
  to: 'user@example.com',
  subject: 'Custom Subject',
  html: `
    <div>
      <h1>Hello!</h1>
      <p>This is a custom email.</p>
    </div>
  `,
  from: 'noreply@yourdomain.com' // optional
})
```

### **Integration Points:**

**Contact Form (app/api/contact/route.ts):**
```typescript
// After saving contact submission
const { html, subject } = emailTemplates.contactNotification(
  formData.name,
  formData.email,
  formData.subject,
  formData.message
)

await sendEmail({
  to: 'admin@example.com',
  subject,
  html
})
```

**User Registration:**
```typescript
// After successful registration
const { html, subject } = emailTemplates.welcome(user.name)
await sendEmail({ to: user.email, subject, html })
```

---

## 📊 **3. Analytics Dashboard** ✅ IMPLEMENTED

### **Location:**
```
app/admin/analytics/page.tsx
```

### **Access:**
```
http://localhost:3000/admin/analytics
```

### **Features:**

**Main Stats (5 Cards):**
- Total Views
- Total Pages
- Total Posts
- Total Users
- Media Files

**Top Content (2 Tables):**
- Top 5 Pages by views
- Top 5 Posts by views

**Recent Activity:**
- Pages created (30 days)
- Posts published (30 days)
- Users registered (30 days)

### **Data Sources:**

```typescript
// Fetches from Supabase
const pages = await supabase.from('pages').select('*')
const posts = await supabase.from('posts').select('*')
const users = await supabase.from('profiles').select('*')
const media = await supabase.from('media').select('*')
```

### **Future Enhancements:**

**Charts (Recommended: Recharts):**
```bash
npm install recharts
```

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

<LineChart data={viewsData}>
  <Line type="monotone" dataKey="views" stroke="#3b82f6" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
</LineChart>
```

**Real-time Stats:**
```typescript
// Using Supabase Realtime
const channel = supabase
  .channel('analytics')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'pages' },
    (payload) => {
      // Update stats
    }
  )
  .subscribe()
```

---

## 🖼️ **4. Image Optimization** ⭐ GUIDE

### **Option A: Next.js Image Component**

**Replace <img> with Next.js Image:**

```tsx
import Image from 'next/image'

// Before
<img src="/photo.jpg" alt="Photo" />

// After
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
/>
```

**Benefits:**
- Automatic WebP/AVIF conversion
- Lazy loading
- Responsive images
- Size optimization

**Configuration (next.config.ts):**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-supabase-project.supabase.co',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}

export default nextConfig
```

### **Option B: Sharp (Server-side)**

**Install:**
```bash
npm install sharp
```

**Create Image Optimizer:**

```typescript
// lib/image-optimizer.ts
import sharp from 'sharp'

export async function optimizeImage(buffer: Buffer) {
  return sharp(buffer)
    .resize(1920, 1080, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 85 })
    .toBuffer()
}

// Usage in upload
const optimized = await optimizeImage(fileBuffer)
```

### **Option C: Cloudinary Integration**

**Install:**
```bash
npm install cloudinary
```

**Setup:**
```typescript
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload & optimize
const result = await cloudinary.uploader.upload(file, {
  transformation: [
    { width: 1920, crop: 'limit' },
    { quality: 'auto' },
    { fetch_format: 'auto' }
  ]
})
```

---

## 🎨 **5. Drag & Drop Page Builder** ⭐ GUIDE

### **Using @dnd-kit (Already Installed!)**

**Package already in dependencies:**
```json
"@dnd-kit/core": "^6.3.1",
"@dnd-kit/sortable": "^10.0.0",
"@dnd-kit/utilities": "^3.2.2"
```

### **Implementation Guide:**

**1. Update Page Builder Provider:**

```tsx
// components/page-builder/page-builder-provider.tsx
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export function PageBuilderProvider({ children }) {
  const [blocks, setBlocks] = useState([])
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      setBlocks((blocks) => {
        const oldIndex = blocks.findIndex((b) => b.id === active.id)
        const newIndex = blocks.findIndex((b) => b.id === over.id)
        
        return arrayMove(blocks, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
```

**2. Make Blocks Draggable:**

```tsx
// components/page-builder/canvas.tsx
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function DraggableBlock({ block }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <BlockRenderer block={block} />
    </div>
  )
}
```

**3. Drag Handle:**

```tsx
import { GripVertical } from 'lucide-react'

<div className="flex items-center">
  <div {...listeners} className="cursor-grab active:cursor-grabbing p-2">
    <GripVertical className="h-4 w-4 text-gray-400" />
  </div>
  <BlockRenderer block={block} />
</div>
```

---

## 📋 **Implementation Summary**

### **✅ Completed:**

1. **Rich Text Editor**
   - Full Tiptap integration
   - 10+ formatting options
   - Ready to use

2. **Email Notifications**
   - Send email function
   - 4 pre-built templates
   - Resend.com integration

3. **Analytics Dashboard**
   - Stats overview
   - Top content tables
   - Recent activity

### **⭐ Guides Provided:**

4. **Image Optimization**
   - 3 implementation options
   - Next.js Image
   - Sharp
   - Cloudinary

5. **Drag & Drop**
   - @dnd-kit setup
   - Sortable blocks
   - Drag handles

---

## 🚀 **Quick Start**

### **Rich Text Editor:**
```tsx
import { RichTextEditor } from '@/components/editor/rich-text-editor'

<RichTextEditor content={content} onChange={setContent} />
```

### **Email:**
```typescript
import { sendEmail, emailTemplates } from '@/lib/email/send-email'

await sendEmail({
  to: 'user@example.com',
  ...emailTemplates.welcome('User Name')
})
```

### **Analytics:**
```
Visit: http://localhost:3000/admin/analytics
```

---

## 🎯 **Next Steps**

1. **Test Rich Text Editor** in posts/pages
2. **Setup Resend** API key for emails
3. **View Analytics** dashboard
4. **Implement Image Optimization** (choose option)
5. **Add Drag & Drop** to page builder

---

**Status**: ✅ **3/5 IMPLEMENTED, 2/5 GUIDES**  
**Last Updated**: 31 Oktober 2024, 17:00 WIB

**Your CMS just got even more powerful!** 🎉
