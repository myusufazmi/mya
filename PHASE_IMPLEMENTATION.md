# 📋 Detail Implementasi Fase Demi Fase

## FASE 1: Foundation & Database (3-4 hari)

### Day 1: Setup Dependencies & Supabase Client

#### 1.1 Install Packages
```bash
# Core dependencies
npm install @supabase/supabase-js @supabase/ssr zustand @tanstack/react-query

# Form & Validation
npm install react-hook-form @hookform/resolvers zod

# UI & Components
npm install lucide-react class-variance-authority clsx tailwind-merge date-fns sonner

# Rich Text Editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image

# Drag & Drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

#### 1.2 Supabase Client Setup

**File: `lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**File: `lib/supabase/server.ts`**
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore in Server Components
          }
        },
      },
    }
  )
}
```

**File: `middleware.ts`**
```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

**File: `lib/supabase/middleware.ts`**
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
```

#### 1.3 Install shadcn/ui
```bash
npx shadcn@latest init

# Select options:
# TypeScript: yes
# Style: Default
# Base color: Slate
# CSS variables: yes

# Install components
npx shadcn@latest add button input label card dialog dropdown-menu
npx shadcn@latest add table tabs badge avatar alert checkbox
npx shadcn@latest add form select textarea switch separator
npx shadcn@latest add tooltip popover command calendar
```

### Day 2: Database Schema

#### 2.1 Create SQL File
Buat folder `supabase/` dan file `schema.sql`, copy semua SQL dari `DATABASE_SCHEMA.md`

#### 2.2 Execute di Supabase
1. Buka Supabase Dashboard
2. Go to SQL Editor
3. Paste dan execute schema.sql
4. Verify tables dibuat dengan benar

#### 2.3 Generate TypeScript Types
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref bmserspkraunbqknpfpy

# Generate types
supabase gen types typescript --local > types/database.types.ts
```

### Day 3-4: Core Utilities & Types

#### 3.1 TypeScript Types

**File: `types/index.ts`**
```typescript
import { Database } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Page = Database['public']['Tables']['pages']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Menu = Database['public']['Tables']['menus']['Row']
export type MenuItem = Database['public']['Tables']['menu_items']['Row']
export type Theme = Database['public']['Tables']['themes']['Row']
export type Plugin = Database['public']['Tables']['plugins']['Row']
export type Media = Database['public']['Tables']['media']['Row']

export type PageInsert = Database['public']['Tables']['pages']['Insert']
export type PageUpdate = Database['public']['Tables']['pages']['Update']

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'user'
export type PageStatus = 'draft' | 'published' | 'archived'
export type PostStatus = 'draft' | 'published' | 'archived'

export interface PageBlock {
  id: string
  type: string
  content: any
  settings?: BlockSettings
  children?: PageBlock[]
}

export interface BlockSettings {
  spacing?: {
    marginTop?: string
    marginBottom?: string
    paddingTop?: string
    paddingBottom?: string
  }
  background?: {
    color?: string
    image?: string
  }
  animation?: string
  customClass?: string
}
```

#### 3.2 Utility Functions

**File: `lib/utils/permissions.ts`**
```typescript
import { createClient } from '@/lib/supabase/server'
import { UserRole } from '@/types'

export async function getUserRole(): Promise<UserRole | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  return profile?.role as UserRole || null
}

export async function hasPermission(permission: string): Promise<boolean> {
  const role = await getUserRole()
  if (!role) return false
  
  const supabase = await createClient()
  const { data } = await supabase
    .from('role_permissions')
    .select('permission:permissions(name)')
    .eq('role', role)
  
  return data?.some((p: any) => p.permission.name === permission) || false
}

export function canAccessAdmin(role: UserRole | null): boolean {
  return ['super_admin', 'admin', 'editor'].includes(role || '')
}
```

**File: `lib/utils/slug.ts`**
```typescript
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function ensureUniqueSlug(
  slug: string,
  table: 'pages' | 'posts',
  excludeId?: string
): Promise<string> {
  const supabase = await createClient()
  let uniqueSlug = slug
  let counter = 1
  
  while (true) {
    let query = supabase
      .from(table)
      .select('id')
      .eq('slug', uniqueSlug)
    
    if (excludeId) {
      query = query.neq('id', excludeId)
    }
    
    const { data } = await query
    
    if (!data || data.length === 0) {
      return uniqueSlug
    }
    
    uniqueSlug = `${slug}-${counter}`
    counter++
  }
}
```

---

## FASE 2: Authentication (2-3 hari)

### Day 1: Auth Pages & Forms

#### 2.1 Login Page

**File: `app/(auth)/login/page.tsx`**
```typescript
import { LoginForm } from '@/components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
```

**File: `components/auth/login-form.tsx`**
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Login successful')
      router.push('/admin/dashboard')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}
```

#### 2.2 Register Page

**File: `app/(auth)/register/page.tsx`**
Similar struktur dengan login page

**File: `components/auth/register-form.tsx`**
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
  fullName: z.string().min(2),
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)

    const supabase = createClient()
    
    // Sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      toast.error(authError.message)
      setLoading(false)
      return
    }

    // Create profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username: data.username,
          full_name: data.fullName,
          role: 'user',
        })

      if (profileError) {
        toast.error(profileError.message)
      } else {
        toast.success('Registration successful')
        router.push('/login')
      }
    }

    setLoading(false)
  }

  // Render form...
}
```

### Day 2: Protected Routes & User Management

#### 2.3 Auth Middleware Enhancement

Sudah dibuat di fase 1, tambahkan role check

#### 2.4 User Management Admin

**File: `app/admin/users/page.tsx`**
```typescript
import { createClient } from '@/lib/supabase/server'
import { DataTable } from '@/components/admin/data-table'
import { columns } from './columns'

export default async function UsersPage() {
  const supabase = await createClient()
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Users</h1>
      <DataTable columns={columns} data={users || []} />
    </div>
  )
}
```

---

## FASE 3: Plugin System (4-5 hari)

### Implementasi sudah dijelaskan detail di `PLUGIN_ARCHITECTURE.md`

**Checklist:**
- [ ] `lib/plugins/types.ts` - Plugin interfaces
- [ ] `lib/plugins/plugin-manager.ts` - Core manager
- [ ] `lib/plugins/hooks.ts` - Hook system
- [ ] `lib/plugins/registry.ts` - Plugin registry
- [ ] `plugins/blog/` - Blog plugin
- [ ] `plugins/gallery/` - Gallery plugin
- [ ] `plugins/contact-form/` - Contact form plugin
- [ ] `app/admin/plugins/page.tsx` - Plugin admin UI

---

## FASE 4: Admin Dashboard (3-4 hari)

### Day 1: Dashboard Layout

**File: `app/admin/layout.tsx`**
```typescript
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
```

**File: `components/admin/sidebar.tsx`**
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Menu, 
  Palette, 
  Puzzle, 
  Settings,
  Users,
  Image
} from 'lucide-react'

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pages', label: 'Pages', icon: FileText },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/menus', label: 'Menus', icon: Menu },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/themes', label: 'Themes', icon: Palette },
  { href: '/admin/plugins', label: 'Plugins', icon: Puzzle },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">CMS Admin</h1>
      </div>
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              pathname === item.href
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
```

### Day 2-3: Dashboard Home & Components

**File: `app/admin/dashboard/page.tsx`**
```typescript
import { createClient } from '@/lib/supabase/server'
import { StatsCard } from '@/components/admin/stats-card'
import { RecentActivity } from '@/components/admin/recent-activity'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get statistics
  const [
    { count: pagesCount },
    { count: postsCount },
    { count: usersCount },
  ] = await Promise.all([
    supabase.from('pages').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Pages" value={pagesCount || 0} />
        <StatsCard label="Total Posts" value={postsCount || 0} />
        <StatsCard label="Total Users" value={usersCount || 0} />
      </div>

      <RecentActivity />
    </div>
  )
}
```

**File: `components/admin/data-table.tsx`**
```typescript
'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableProps<T> {
  columns: Array<{
    key: keyof T
    label: string
    render?: (value: any, row: T) => React.ReactNode
  }>
  data: T[]
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={String(column.key)}>
                {column.render 
                  ? column.render(row[column.key], row)
                  : String(row[column.key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

---

## FASE 5-9: Akan dilanjutkan...

Fase selanjutnya (Theme System, Page Builder, Content Management, Settings, Testing) akan dijelaskan dalam dokumen terpisah untuk masing-masing fase saat diperlukan.

## Prioritas Pengerjaan

1. ✅ Setup foundation (dependencies, Supabase, database)
2. ✅ Authentication system
3. ⏳ Plugin architecture
4. ⏳ Admin dashboard layout
5. ⏳ Theme system
6. ⏳ Page builder
7. ⏳ Content management
8. ⏳ Settings
9. ⏳ Testing & documentation

## Tips Pengerjaan

- **Commit sering** setiap fitur selesai
- **Test manual** setiap fitur yang dibuat
- **Dokumentasi** code dengan komentar yang jelas
- **Modular** - pisahkan logic ke utils/hooks
- **Type-safe** - gunakan TypeScript dengan strict mode
- **Error handling** - handle semua error dengan proper messages

---

**Ready to start?** Mulai dari Fase 1! 🚀
