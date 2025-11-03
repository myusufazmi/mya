# 💻 Developer Guide - Next.js CMS Platform

**Version**: 1.0  
**Last Updated**: November 3, 2024

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Setup Development Environment](#setup-development-environment)
3. [Project Structure](#project-structure)
4. [Core Concepts](#core-concepts)
5. [Database Schema](#database-schema)
6. [API Routes](#api-routes)
7. [Plugin Development](#plugin-development)
8. [Theme Development](#theme-development)
9. [Component Library](#component-library)
10. [Testing](#testing)
11. [Contributing](#contributing)

---

## 🏗️ Architecture Overview

### Tech Stack

```
Frontend:
├── Next.js 16 (App Router)
├── React 19
├── TypeScript 5
├── Tailwind CSS 4
├── Tiptap (Rich Text Editor)
└── Lucide Icons

Backend:
├── Supabase (PostgreSQL)
├── Supabase Auth
├── Supabase Storage
└── Server Components

State Management:
├── Zustand (Global State)
└── React Context (Theme)

Forms & Validation:
├── React Hook Form
└── Zod
```

### Architecture Pattern

**Server-First Architecture**:
- Server Components for data fetching
- Client Components for interactivity
- API routes for mutations
- Real-time subscriptions (optional)

**File Structure**:
```
app/                    # Next.js App Router
├── (auth)/            # Auth routes (parallel route)
├── admin/             # Admin panel (protected)
└── api/               # API routes

components/            # React components
├── admin/             # Admin-specific components
├── page-builder/      # Page builder components
└── ui/                # Reusable UI components

lib/                   # Core libraries
├── supabase/          # Supabase clients
├── plugins/           # Plugin system
├── theme/             # Theme system
└── utils/             # Utilities
```

---

## 🛠️ Setup Development Environment

### Prerequisites

```bash
# Required
Node.js >= 18.0.0
npm >= 9.0.0

# Recommended
VS Code with extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript
```

### Installation

1. **Clone Repository**
```bash
git clone <repository-url>
cd meeting-room-simulation
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Variables**

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Database Setup**

```bash
# Run migrations in Supabase Dashboard
# SQL Editor → Execute supabase/schema.sql
```

5. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

### Development Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier (when configured)

# Testing (when implemented)
npm test            # Run unit tests
npm run test:e2e    # Run E2E tests
```

---

## 📁 Project Structure

### Detailed Structure

```
meeting-room-simulation/
│
├── app/                                # Next.js App Router
│   ├── (auth)/                        # Auth group
│   │   ├── login/page.tsx             # Login page
│   │   ├── register/page.tsx          # Register page
│   │   └── layout.tsx                 # Auth layout
│   │
│   ├── admin/                         # Admin panel
│   │   ├── dashboard/page.tsx         # Dashboard
│   │   ├── posts/                     # Post management
│   │   │   ├── page.tsx               # Posts list
│   │   │   ├── new/page.tsx           # New post
│   │   │   └── [id]/edit/page.tsx     # Edit post
│   │   ├── pages/                     # Page management
│   │   ├── media/page.tsx             # Media library
│   │   ├── users/page.tsx             # User management
│   │   ├── settings/page.tsx          # Settings
│   │   ├── logs/page.tsx              # Activity logs
│   │   └── layout.tsx                 # Admin layout
│   │
│   ├── api/                           # API routes
│   │   └── auth/                      # Auth endpoints
│   │
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Homepage
│   └── globals.css                    # Global styles
│
├── components/                        # React components
│   ├── admin/                         # Admin components
│   │   ├── rich-text-editor.tsx       # Tiptap editor
│   │   ├── media-picker-modal.tsx     # Media picker
│   │   ├── settings-form.tsx          # Settings form
│   │   ├── activity-logs.tsx          # Activity logs
│   │   ├── post-form.tsx              # Post form
│   │   ├── tag-manager.tsx            # Tag manager
│   │   ├── seo-metadata.tsx           # SEO component
│   │   └── comment-manager.tsx        # Comment manager
│   │
│   ├── page-builder/                  # Page builder
│   │   ├── blocks/                    # Block components
│   │   │   ├── hero-block.tsx
│   │   │   ├── text-block.tsx
│   │   │   └── ...
│   │   ├── page-builder.tsx           # Main builder
│   │   ├── block-toolbar.tsx          # Toolbar
│   │   └── settings-panel.tsx         # Settings
│   │
│   └── ui/                            # Reusable UI
│       ├── button.tsx
│       ├── input.tsx
│       └── ...
│
├── lib/                               # Core libraries
│   ├── supabase/                      # Supabase
│   │   ├── client.ts                  # Client-side client
│   │   ├── server.ts                  # Server-side client
│   │   └── middleware.ts              # Auth middleware
│   │
│   ├── plugins/                       # Plugin system
│   │   ├── plugin-manager.ts          # Plugin manager
│   │   ├── hook-system.ts             # Hook system
│   │   └── types.ts                   # Plugin types
│   │
│   ├── theme/                         # Theme system
│   │   ├── theme-manager.ts           # Theme manager
│   │   ├── theme-registry.ts          # Theme registry
│   │   └── types.ts                   # Theme types
│   │
│   ├── page-builder/                  # Page builder logic
│   │   ├── block-registry.ts          # Block registry
│   │   ├── templates.ts               # Templates
│   │   └── types.ts                   # Builder types
│   │
│   └── utils/                         # Utilities
│       ├── slug.ts                    # Slug generator
│       ├── date.ts                    # Date helpers
│       └── validation.ts              # Validators
│
├── plugins/                           # Core plugins
│   ├── blog/
│   │   ├── index.ts
│   │   └── components/
│   ├── gallery/
│   └── contact-form/
│
├── themes/                            # Themes
│   ├── default/
│   │   ├── index.ts
│   │   └── config.ts
│   └── dark/
│
├── supabase/                          # Database
│   └── schema.sql                     # Schema
│
├── docs/                              # Documentation
│   ├── USER_GUIDE.md
│   ├── DEVELOPER_GUIDE.md
│   └── API_DOCS.md
│
├── middleware.ts                      # Next.js middleware
├── next.config.ts                     # Next.js config
├── tailwind.config.ts                 # Tailwind config
├── tsconfig.json                      # TypeScript config
└── package.json                       # Dependencies
```

---

## 🧠 Core Concepts

### Server vs Client Components

**Server Components** (default):
```typescript
// app/admin/posts/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function PostsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('posts').select('*')
  
  return <PostsList posts={posts} />
}
```

**Client Components** (interactive):
```typescript
'use client'

import { useState } from 'react'

export function PostForm() {
  const [title, setTitle] = useState('')
  // ... interactive logic
}
```

### Data Fetching Patterns

**Server-side Fetch**:
```typescript
// In Server Component
const supabase = await createClient()
const { data } = await supabase.from('posts').select('*')
```

**Client-side Fetch**:
```typescript
// In Client Component
const supabase = createClient()
const { data } = await supabase.from('posts').select('*')
```

**Real-time Subscription**:
```typescript
useEffect(() => {
  const channel = supabase
    .channel('posts')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'posts'
    }, (payload) => {
      console.log('Change received!', payload)
    })
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

### Authentication Flow

```typescript
// middleware.ts - Route protection
export async function middleware(request: NextRequest) {
  const supabase = createServerClient(...)
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

### Type Safety

**Database Types**:
```typescript
// lib/supabase/types.ts (auto-generated)
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

// Usage
type Post = Tables<'posts'>
```

**Component Props**:
```typescript
interface PostFormProps {
  postId?: string
  initialData?: Post
  onSave?: (post: Post) => void
}
```

---

## 🗄️ Database Schema

### Core Tables

#### posts
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  status TEXT DEFAULT 'draft',
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES profiles(id),
  featured_image_url TEXT,
  tags TEXT[],
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'author',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### media
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### settings
```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  category TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### activity_logs
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Row Level Security (RLS)

**Enable RLS**:
```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

**Policies**:
```sql
-- Allow authenticated users to read published posts
CREATE POLICY "Public posts are viewable by everyone"
  ON posts FOR SELECT
  USING (status = 'published');

-- Allow authors to update their own posts
CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id);
```

---

## 🔌 API Routes

### Creating API Routes

**Example: Upload endpoint**
```typescript
// app/api/upload/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Handle upload
  const formData = await request.formData()
  const file = formData.get('file') as File
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('media')
    .upload(`${user.id}/${file.name}`, file)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}
```

### API Conventions

**Success Response**:
```typescript
return NextResponse.json({
  data: result,
  message: 'Success'
})
```

**Error Response**:
```typescript
return NextResponse.json({
  error: 'Error message',
  details: errorDetails
}, { status: 400 })
```

---

## 🔌 Plugin Development

### Plugin Structure

```typescript
// plugins/my-plugin/index.ts
import { Plugin } from '@/lib/plugins/types'

export const myPlugin: Plugin = {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  description: 'Plugin description',
  
  initialize: async (context) => {
    console.log('Plugin initialized')
  },
  
  hooks: {
    'post:create': async (post) => {
      // Do something when post is created
      console.log('Post created:', post.title)
    },
    
    'admin:menu': (items) => {
      // Add menu item
      return [
        ...items,
        {
          label: 'My Plugin',
          href: '/admin/my-plugin',
          icon: 'Plugin'
        }
      ]
    }
  },
  
  routes: [
    {
      path: '/admin/my-plugin',
      component: () => import('./components/PluginPage')
    }
  ]
}
```

### Registering Plugin

```typescript
// lib/plugins/plugin-manager.ts
import { myPlugin } from '@/plugins/my-plugin'

pluginManager.register(myPlugin)
```

### Available Hooks

```typescript
type PluginHooks = {
  // Content hooks
  'post:create': (post: Post) => void
  'post:update': (post: Post) => void
  'post:delete': (postId: string) => void
  
  // UI hooks
  'admin:menu': (items: MenuItem[]) => MenuItem[]
  'editor:toolbar': (buttons: Button[]) => Button[]
  
  // System hooks
  'app:init': () => void
  'user:login': (user: User) => void
}
```

---

## 🎨 Theme Development

### Theme Structure

```typescript
// themes/my-theme/index.ts
import { Theme } from '@/lib/theme/types'

export const myTheme: Theme = {
  id: 'my-theme',
  name: 'My Theme',
  version: '1.0.0',
  
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937',
    // ... more colors
  },
  
  typography: {
    fontFamily: 'Inter, sans-serif',
    headingFontFamily: 'Poppins, sans-serif',
    fontSize: {
      base: '16px',
      h1: '2.5rem',
      h2: '2rem',
      // ... more sizes
    }
  },
  
  spacing: {
    unit: 4,
    section: 64,
    container: 1200
  },
  
  components: {
    button: {
      borderRadius: '0.5rem',
      padding: '0.75rem 1.5rem'
    }
  }
}
```

### Registering Theme

```typescript
// lib/theme/theme-registry.ts
import { myTheme } from '@/themes/my-theme'

themeRegistry.register(myTheme)
```

### Using Theme

```typescript
'use client'

import { useTheme } from '@/lib/theme/use-theme'

export function MyComponent() {
  const theme = useTheme()
  
  return (
    <div style={{ 
      color: theme.colors.primary,
      fontFamily: theme.typography.fontFamily
    }}>
      Themed content
    </div>
  )
}
```

---

## 🧩 Component Library

### Admin Components

#### RichTextEditor
```typescript
import { RichTextEditor } from '@/components/admin/rich-text-editor'

<RichTextEditor
  content={content}
  onChange={setContent}
  placeholder="Start writing..."
/>
```

#### MediaPickerModal
```typescript
import { MediaPickerModal } from '@/components/admin/media-picker-modal'

<MediaPickerModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSelect={(media) => console.log(media)}
  selectedId={selectedMediaId}
/>
```

#### SEOMetadata
```typescript
import { SEOMetadata } from '@/components/admin/seo-metadata'

<SEOMetadata
  value={seoData}
  onChange={setSeoData}
/>
```

### Page Builder Components

#### Block Component Pattern
```typescript
import { Block } from '@/lib/page-builder/types'

export interface HeroBlockProps extends Block {
  content: {
    title: string
    subtitle: string
    buttonText: string
    buttonLink: string
    backgroundImage?: string
  }
}

export function HeroBlock({ content, settings }: HeroBlockProps) {
  return (
    <div className="hero-block" style={{
      backgroundColor: settings?.backgroundColor,
      padding: settings?.padding
    }}>
      <h1>{content.title}</h1>
      <p>{content.subtitle}</p>
      <a href={content.buttonLink}>{content.buttonText}</a>
    </div>
  )
}
```

---

## 🧪 Testing

### Unit Tests (Example)

```typescript
// __tests__/lib/utils/slug.test.ts
import { generateSlug } from '@/lib/utils/slug'

describe('generateSlug', () => {
  it('converts title to slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
  })
  
  it('removes special characters', () => {
    expect(generateSlug('Hello @World!')).toBe('hello-world')
  })
  
  it('handles unicode characters', () => {
    expect(generateSlug('Café résumé')).toBe('cafe-resume')
  })
})
```

### Integration Tests (Example)

```typescript
// __tests__/api/posts.test.ts
import { POST } from '@/app/api/posts/route'

describe('/api/posts', () => {
  it('creates a post', async () => {
    const request = new Request('http://localhost:3000/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Post',
        content: 'Test content'
      })
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.title).toBe('Test Post')
  })
})
```

### E2E Tests (Example with Playwright)

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('user can log in', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password')
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL('/admin/dashboard')
})
```

---

## 🤝 Contributing

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# ... code ...

# 3. Commit changes
git add .
git commit -m "feat: add my feature"

# 4. Push branch
git push origin feature/my-feature

# 5. Create Pull Request
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

### Code Style

**TypeScript**:
- Use strict mode
- Avoid `any` type
- Export types/interfaces

**React**:
- Functional components
- Hooks over classes
- Props destructuring

**Naming**:
- PascalCase for components
- camelCase for variables/functions
- UPPER_CASE for constants

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Testing
How to test the changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added
```

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tiptap Docs](https://tiptap.dev/docs)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Supabase Studio](https://supabase.com/docs/guides/platform)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## 🐛 Debugging

### Common Issues

**Supabase Connection**:
```typescript
// Check connection
const { data, error } = await supabase.from('posts').select('count')
console.log('Connected:', !error)
```

**Auth Issues**:
```typescript
// Debug auth state
const { data: { session } } = await supabase.auth.getSession()
console.log('Session:', session)
```

**Type Errors**:
```bash
# Regenerate types
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

---

**Need help?** Check [USER_GUIDE.md](USER_GUIDE.md) or [API_DOCS.md](API_DOCS.md)

**Version**: 1.0 | **Last Updated**: November 3, 2024
