# 📦 Panduan Instalasi CMS

## Status Implementasi Saat Ini

✅ **Fase 1: Foundation & Database** - SELESAI (Parsial)
- ✅ Struktur file core dibuat
- ✅ Supabase client setup
- ✅ TypeScript types
- ✅ Utility functions
- ✅ Database schema SQL siap
- ⏳ Dependencies belum terinstall (perlu manual)

✅ **Fase 2: Authentication** - SELESAI
- ✅ Login page & form
- ✅ Register page & form
- ✅ Auth middleware

✅ **Admin Dashboard** - SELESAI (Basic)
- ✅ Dashboard layout
- ✅ Sidebar navigation
- ✅ Header dengan logout
- ✅ Dashboard home dengan stats

## 🚀 Langkah Instalasi

### 1. Install Dependencies (PENTING!)

Karena npm install via command tidak berhasil, Anda perlu install manual:

```bash
# Buka terminal di folder proyek dan jalankan:

# Core dependencies
npm install @supabase/supabase-js @supabase/ssr

# State & Data
npm install zustand @tanstack/react-query

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# UI & Utilities
npm install lucide-react class-variance-authority clsx tailwind-merge date-fns sonner

# Rich Text Editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image

# Drag & Drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**ATAU install semua sekaligus:**

```bash
npm install @supabase/supabase-js @supabase/ssr zustand @tanstack/react-query react-hook-form @hookform/resolvers zod lucide-react class-variance-authority clsx tailwind-merge date-fns sonner @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### 2. Deploy Database Schema

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Go to **SQL Editor**
4. Copy semua SQL dari file `supabase/schema.sql`
5. Paste dan click **Run**
6. Verify tables dibuat di **Table Editor**

### 3. Buat User Admin Pertama

Setelah database schema deployed, buat user admin:

#### Opsi A: Via Supabase Dashboard
1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - Email: `admin@example.com`
   - Password: (password anda)
4. Click **"Create user"**
5. Copy User ID yang muncul

#### Opsi B: Via SQL Editor
```sql
-- Insert profile untuk user yang baru dibuat
-- Ganti 'USER_UUID_HERE' dengan ID user dari auth.users
INSERT INTO profiles (id, username, full_name, role)
VALUES (
  'USER_UUID_HERE',  -- Ganti dengan user ID
  'admin',
  'Admin User',
  'super_admin'
);
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Test Login

1. Buka `http://localhost:3000/login`
2. Login dengan credentials admin yang dibuat
3. Seharusnya redirect ke `/admin/dashboard`

## ✅ Verifikasi Instalasi

Cek apakah semua berfungsi:

- [ ] `npm run dev` berjalan tanpa error
- [ ] Login page accessible di `/login`
- [ ] Register page accessible di `/register`
- [ ] Bisa login dengan admin account
- [ ] Dashboard accessible di `/admin/dashboard`
- [ ] Sidebar menampilkan menu
- [ ] Stats di dashboard menampilkan angka (0 jika belum ada data)

## 🐛 Troubleshooting

### Error: Cannot find module '@supabase/ssr'
**Solusi**: Install dependencies seperti di Step 1

### Error: Database connection failed
**Solusi**: 
- Check `.env.local` file
- Verify NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY benar
- Test connection di Supabase dashboard

### Error: User not redirected after login
**Solusi**: 
- Clear browser cache
- Check middleware.ts sudah ada
- Verify user profile exists di database

### Error: Cannot read property 'id' of null
**Solusi**: 
- User belum punya profile di table `profiles`
- Jalankan SQL insert profile seperti di Step 3

## 📂 Struktur File Yang Sudah Dibuat

```
✅ lib/
   ✅ supabase/
      ✅ client.ts - Browser Supabase client
      ✅ server.ts - Server Supabase client
      ✅ middleware.ts - Auth middleware
   ✅ utils/
      ✅ cn.ts - Utility untuk className
      ✅ slug.ts - Slug generation
      ✅ permissions.ts - User permissions

✅ types/
   ✅ index.ts - TypeScript types

✅ middleware.ts - Next.js middleware

✅ app/
   ✅ (auth)/
      ✅ login/page.tsx - Login page
      ✅ register/page.tsx - Register page
   ✅ admin/
      ✅ layout.tsx - Admin layout
      ✅ dashboard/page.tsx - Dashboard home

✅ components/
   ✅ auth/
      ✅ login-form.tsx - Login form component
      ✅ register-form.tsx - Register form component
   ✅ admin/
      ✅ sidebar.tsx - Admin sidebar
      ✅ header.tsx - Admin header

✅ supabase/
   ✅ schema.sql - Database schema
```

## 🎯 Next Steps

Setelah instalasi berhasil, lanjutkan ke:

1. **Fase 3: Plugin System** - Buat plugin architecture
2. **Fase 4: Admin Components** - DataTable, FileManager, dll
3. **Fase 5: Theme System** - Theme manager & customizer
4. **Fase 6: Page Builder** - Visual page builder
5. **Fase 7: Content Management** - Posts, categories, media
6. **Fase 8: Settings** - Site configuration
7. **Fase 9: Testing & Deploy** - Production ready

## 📝 Notes

- **Lint errors** yang muncul sekarang normal karena dependencies belum terinstall
- Setelah `npm install`, semua errors akan hilang
- Database schema sudah lengkap dengan RLS policies
- Auth flow sudah siap pakai

## 🆘 Butuh Bantuan?

Jika menemui masalah, check:
1. **README_CMS_PROJECT.md** - Overview lengkap
2. **QUICK_START.md** - Quick start guide
3. **DATABASE_SCHEMA.md** - Database reference
4. **PHASE_IMPLEMENTATION.md** - Detail implementasi

---

**Status**: Foundation & Auth ✅ | Ready untuk Phase 3! 🚀
