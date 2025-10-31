# 🚀 Quick Install - CMS Dependencies

## Cara Tercepat

### Windows (Command Prompt / PowerShell)
Klik dua kali file ini:
```
install-deps.bat
```

**ATAU** jalankan di terminal:
```cmd
install-deps.bat
```

### Mac / Linux (Terminal)
```bash
chmod +x install-deps.sh
./install-deps.sh
```

---

## Cara Manual (Copy-Paste)

Jika script tidak jalan, copy paste command ini ke terminal:

### All-in-One (Recommended)
```bash
npm install @supabase/supabase-js @supabase/ssr zustand @tanstack/react-query react-hook-form @hookform/resolvers zod lucide-react class-variance-authority clsx tailwind-merge date-fns sonner @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Step-by-Step (Jika All-in-One gagal)
```bash
# 1. Supabase
npm install @supabase/supabase-js @supabase/ssr

# 2. State Management
npm install zustand @tanstack/react-query

# 3. Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# 4. UI & Utilities
npm install lucide-react class-variance-authority clsx tailwind-merge date-fns sonner

# 5. Rich Text Editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image

# 6. Drag & Drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

## Packages Yang Akan Diinstall

| Package | Versi | Kegunaan |
|---------|-------|----------|
| @supabase/supabase-js | Latest | Supabase client |
| @supabase/ssr | Latest | Supabase SSR helpers |
| zustand | Latest | State management |
| @tanstack/react-query | Latest | Data fetching & caching |
| react-hook-form | Latest | Form handling |
| @hookform/resolvers | Latest | Form validation |
| zod | Latest | Schema validation |
| lucide-react | Latest | Icon library |
| class-variance-authority | Latest | Variant styles |
| clsx | Latest | Conditional classes |
| tailwind-merge | Latest | Merge Tailwind classes |
| date-fns | Latest | Date utilities |
| sonner | Latest | Toast notifications |
| @tiptap/react | Latest | Rich text editor |
| @tiptap/starter-kit | Latest | Tiptap extensions |
| @tiptap/extension-link | Latest | Link support |
| @tiptap/extension-image | Latest | Image support |
| @dnd-kit/core | Latest | Drag & drop core |
| @dnd-kit/sortable | Latest | Sortable lists |
| @dnd-kit/utilities | Latest | DnD utilities |

**Total**: 20 packages

---

## Verifikasi Install

Setelah install selesai, jalankan:

```bash
npm list @supabase/supabase-js
```

Jika muncul versi number, berarti berhasil!

---

## Troubleshooting

### Error: EACCES (Permission denied)
**Windows:**
```cmd
# Run as Administrator
```

**Mac/Linux:**
```bash
sudo npm install ...
```

### Error: Network timeout
```bash
# Increase timeout
npm install --timeout=60000 ...
```

### Error: Cannot find package
```bash
# Clear cache
npm cache clean --force
npm install
```

### Error: Peer dependencies
```bash
# Install dengan legacy peer deps
npm install --legacy-peer-deps @supabase/supabase-js @supabase/ssr ...
```

---

## After Installation

### 1. Check Lint Errors
Buka VSCode, semua error `Cannot find module` harus hilang!

### 2. Deploy Database
Lihat: `INSTALLATION_GUIDE.md` Section 2

### 3. Run Dev Server
```bash
npm run dev
```

### 4. Test Login
Visit: http://localhost:3000/login

---

## Need Help?

Check dokumentasi:
- `START_HERE.md` - Overview
- `INSTALLATION_GUIDE.md` - Full guide
- `PROGRESS.md` - Status & troubleshooting

---

**Estimasi waktu**: 5-10 menit (tergantung koneksi internet)
