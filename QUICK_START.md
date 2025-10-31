# 🚀 Quick Start Guide - CMS Development

## Sebelum Mulai

### Prerequisites
- Node.js 18+ sudah terinstall
- Supabase account & project sudah dibuat
- Git untuk version control
- Code editor (VS Code recommended)

### Yang Sudah Ada
✅ Next.js 16 project initialized
✅ TailwindCSS configured  
✅ Supabase credentials di `.env.local`

## Langkah Cepat Memulai

### 1. Install Dependencies (10 menit)

```bash
# Core dependencies
npm install @supabase/supabase-js @supabase/ssr zustand @tanstack/react-query

# Form & validation
npm install react-hook-form @hookform/resolvers zod

# UI components
npm install lucide-react class-variance-authority clsx tailwind-merge date-fns sonner

# Rich text editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image

# Drag & drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Install shadcn/ui
npx shadcn@latest init
# Pilih options: TypeScript=yes, Style=Default, Color=Slate, CSS variables=yes

# Install shadcn components
npx shadcn@latest add button input label card dialog dropdown-menu table tabs badge avatar alert checkbox form select textarea switch separator tooltip popover command calendar
```

### 2. Setup Supabase Client (15 menit)

#### Create Files:

**`lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**`lib/supabase/server.ts`**
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
          } catch {}
        },
      },
    }
  )
}
```

**`lib/supabase/middleware.ts`**
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

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
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
```

**`middleware.ts`** (root folder)
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

### 3. Setup Database (20 menit)

#### 3.1 Copy Schema
Copy semua SQL dari `DATABASE_SCHEMA.md`

#### 3.2 Execute di Supabase
1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Go to **SQL Editor**
4. Paste SQL schema
5. Click **Run**
6. Verify tables dibuat (cek Table Editor)

#### 3.3 Generate Types
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref bmserspkraunbqknpfpy

# Generate TypeScript types
mkdir -p types
supabase gen types typescript --local > types/database.types.ts
```

### 4. Create Basic Types (10 menit)

**`types/index.ts`**
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

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'user'
export type PageStatus = 'draft' | 'published' | 'archived'
```

### 5. Create Login Page (15 menit)

**`app/(auth)/login/page.tsx`**
```typescript
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}
```

**`components/auth/login-form.tsx`**
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
    <form onSubmit={handleLogin} className="space-y-4">
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

### 6. Create Admin Dashboard (20 menit)

**`app/admin/layout.tsx`**
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
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
```

**`components/admin/sidebar.tsx`**
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
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">CMS Admin</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
```

**`components/admin/header.tsx`**
```typescript
'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="h-16 border-b bg-white px-8 flex items-center justify-between">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <Button variant="ghost" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </header>
  )
}
```

**`app/admin/dashboard/page.tsx`**
```typescript
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Pages</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
    </div>
  )
}
```

### 7. Add Toaster to Layout (5 menit)

**`app/layout.tsx`**
```typescript
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "CMS Admin",
  description: "Content Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
```

### 8. Run Development Server

```bash
npm run dev
```

Visit:
- `http://localhost:3000` - Home page
- `http://localhost:3000/login` - Login page
- `http://localhost:3000/admin/dashboard` - Admin (after login)

### 9. Create First Admin User

#### Via Supabase Dashboard:
1. Go to Authentication > Users
2. Click "Add user"
3. Enter email & password
4. Click "Create user"

#### Via SQL:
```sql
-- Get user ID from auth.users after signup
-- Then insert profile:
INSERT INTO profiles (id, username, full_name, role)
VALUES (
  'user-uuid-here',
  'admin',
  'Admin User',
  'super_admin'
);
```

## What's Next?

Setelah setup dasar selesai, lanjutkan ke:

1. **📚 Baca dokumen lengkap**:
   - `CMS_DEVELOPMENT_PLAN.md` - Overview lengkap
   - `DATABASE_SCHEMA.md` - Database detail
   - `PLUGIN_ARCHITECTURE.md` - Plugin system
   - `PHASE_IMPLEMENTATION.md` - Detail setiap fase

2. **🔨 Mulai development**:
   - Fase 3: Plugin System
   - Fase 4: Admin Components (DataTable, FileManager)
   - Fase 5: Theme System
   - Fase 6: Page Builder
   - Fase 7: Content Management
   - Fase 8: Settings
   - Fase 9: Testing

3. **✅ Checklist Progress**:
   - [ ] Foundation & Database ← **SELESAI SETELAH QUICK START**
   - [ ] Authentication ← **SELESAI SETELAH QUICK START**
   - [ ] Plugin System
   - [ ] Admin Dashboard Components
   - [ ] Theme Management
   - [ ] Page Builder
   - [ ] Content Management
   - [ ] Settings & Configuration
   - [ ] Testing & Documentation

## Troubleshooting

### Issue: Supabase connection error
**Solution**: Check `.env.local` file, pastikan URL dan key benar

### Issue: Middleware redirect loop
**Solution**: Check `middleware.ts`, pastikan public routes tidak di-protect

### Issue: TypeScript errors
**Solution**: 
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

### Issue: shadcn/ui components not found
**Solution**: 
```bash
npx shadcn@latest add [component-name]
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## Support

Jika ada pertanyaan atau issue, refer ke:
- Dokumentasi lengkap di folder project
- GitHub Issues (jika project di GitHub)
- Supabase Discord community

---

**Happy Coding! 🎉**
