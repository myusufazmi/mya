# 🎨 Theme System - Complete Guide

## ✅ Sistem Yang Sudah Tersedia

Complete theme management system dengan live customizer, dark mode support, dan theme switching.

---

## 🎯 Fitur Lengkap

### **Theme Management** (`/admin/themes`)
- ✅ View all installed themes
- ✅ Create new themes
- ✅ Edit existing themes
- ✅ Activate/deactivate themes
- ✅ Theme preview with gradient
- ✅ Statistics dashboard
- ✅ Version tracking

### **Theme Customizer** (`/admin/themes/customize`)
- ✅ **Colors Tab** - Customize color palette
  - Primary, secondary colors
  - Background & surface colors
  - Text & border colors
  - Success, warning, error, info colors
  - Color picker & hex input
  - Live preview
  
- ✅ **Typography Tab** - Font configuration
  - Font family selection
  - Base font size
  - Font size scale
  - Line height
  - Live typography preview
  
- ✅ **Spacing Tab** - Layout measurements
  - Base spacing unit
  - Section spacing
  - Container padding
  - Responsive values
  
- ✅ **Effects Tab** - Visual effects
  - Border radius (sm, md, lg, full)
  - Slider & number input
  - Visual preview

### **Theme Features**
- ✅ Dark mode support
- ✅ Light mode support
- ✅ CSS variables integration
- ✅ Local storage persistence
- ✅ System preference detection
- ✅ Theme toggle component
- ✅ Real-time theme switching
- ✅ Database storage

---

## 🚀 Cara Menggunakan

### 1. View Themes

**Akses halaman themes:**
```
http://localhost:3000/admin/themes
```

**Informasi yang ditampilkan:**
- Total themes installed
- Active theme count
- Available themes
- Theme cards dengan:
  - Preview gradient
  - Theme name & description
  - Version & author
  - Active badge
  - Actions (Activate/Customize/Edit)

### 2. Create New Theme

**Steps:**
1. Click "Add Theme" button
2. Fill basic information:
   - Theme Name (required)
   - Description
   - Version (default: 1.0.0)
   - Author name
3. Customize color palette:
   - Select colors dengan color picker
   - Or input hex code manual
4. Preview theme gradient
5. Click "Create Theme"

**Example:**
```
Name: Professional Blue
Description: Clean and professional theme with blue accents
Version: 1.0.0
Author: Your Company

Colors:
- Primary: #2563eb
- Secondary: #7c3aed
- Background: #ffffff
- Surface: #f8fafc
```

### 3. Activate Theme

**Option 1: From Themes List**
1. Find theme card
2. Click "Activate" button
3. Theme activated instantly
4. Page refreshes

**Option 2: Direct URL**
```
/admin/themes/{theme-id}/activate
```

**What happens:**
- All other themes set to inactive
- Selected theme set to active
- `active_theme` setting updated
- Redirects to themes page

### 4. Customize Active Theme

**Access Customizer:**
```
http://localhost:3000/admin/themes/customize
```

**Customize Colors:**
1. Click "Colors" tab
2. Use color pickers or hex inputs
3. See live preview below
4. Click "Save Changes"

**Customize Typography:**
1. Click "Typography" tab
2. Set font family (e.g., "Poppins, sans-serif")
3. Adjust base font size (12-24px)
4. Set font size scale (1.0-2.0)
5. Configure line height (1.0-2.5)
6. Preview dengan sample text

**Customize Spacing:**
1. Click "Spacing" tab
2. Set base unit (0.5-2 rem)
3. Configure section spacing (1-8 rem)
4. Set container padding (0.5-4 rem)

**Customize Effects:**
1. Click "Effects" tab
2. Adjust border radius dengan slider
   - Small: 0-2 rem
   - Medium: 0-2 rem
   - Large: 0-2 rem
   - Full: 9999 rem (rounded-full)
3. See visual preview

**Save Changes:**
- Click "Save Changes" button
- Settings saved to database
- Page refreshes with new theme

**Reset to Default:**
- Click "Reset" button
- Confirms action
- Reverts to default values

### 5. Dark Mode Toggle

**Theme Provider Features:**
- Automatic system preference detection
- Manual toggle support
- LocalStorage persistence
- CSS class toggle on `<html>` element

**Using ThemeToggle Component:**
```tsx
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  )
}
```

**Manual Toggle:**
```tsx
'use client'
import { useTheme } from '@/components/theme/theme-provider'

export function MyComponent() {
  const { isDark, toggleDarkMode } = useTheme()
  
  return (
    <button onClick={toggleDarkMode}>
      {isDark ? 'Light' : 'Dark'} Mode
    </button>
  )
}
```

---

## 📁 File Structure

```
app/
├── admin/themes/
│   ├── page.tsx                    # Themes list
│   ├── new/page.tsx                # Create theme
│   ├── customize/page.tsx          # Theme customizer
│   └── [id]/
│       ├── edit/page.tsx           # Edit theme
│       └── activate/page.tsx       # Activate theme

components/
├── theme/
│   ├── theme-provider.tsx          # Context provider
│   └── theme-toggle.tsx            # Dark mode toggle
└── admin/
    └── theme-form.tsx              # Theme form component

types/
└── theme.d.ts                      # TypeScript definitions

supabase/
└── schema.sql                      # Database schema (themes table)
```

---

## 🗃️ Database Schema

### **themes Table**
```sql
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,        -- Slug (my-theme)
  display_name VARCHAR(100) NOT NULL,       -- Display name
  description TEXT,                          -- Description
  version VARCHAR(20),                       -- Version (1.0.0)
  author VARCHAR(100),                       -- Author name
  thumbnail TEXT,                            -- Preview image URL
  is_active BOOLEAN DEFAULT false,           -- Active status
  config JSONB,                              -- Theme configuration
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **theme_settings Table**
```sql
CREATE TABLE theme_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  key VARCHAR(100) NOT NULL,
  value JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **settings Table** (for active theme)
```sql
INSERT INTO settings (key, value, category) VALUES
('active_theme', 'theme-uuid', 'appearance');

INSERT INTO settings (key, value, category) VALUES
('theme_customization', '{"colors": {...}, "typography": {...}}', 'appearance');
```

---

## 🎨 Theme Configuration Format

### **config JSONB Structure**
```json
{
  "id": "my-theme",
  "name": "My Theme",
  "version": "1.0.0",
  "author": "Your Name",
  "supports": ["light", "dark"],
  "settings": {
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#8b5cf6",
      "background": "#ffffff",
      "surface": "#f9fafb",
      "text": "#1f2937",
      "border": "#e5e7eb",
      "success": "#10b981",
      "warning": "#f59e0b",
      "error": "#ef4444",
      "info": "#3b82f6"
    },
    "typography": {
      "fontFamily": "Inter, sans-serif",
      "fontSizeBase": "16px",
      "fontSizeScale": 1.125,
      "lineHeight": 1.5
    },
    "spacing": {
      "unit": 1,
      "section": "2rem",
      "container": "1.5rem"
    },
    "borderRadius": {
      "sm": "0.25rem",
      "md": "0.5rem",
      "lg": "0.75rem",
      "full": "9999px"
    },
    "shadows": {
      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)"
    }
  }
}
```

---

## 💻 Usage in Code

### **1. Using Theme Context**

```tsx
'use client'
import { useTheme } from '@/components/theme/theme-provider'

export function MyComponent() {
  const { theme, isDark, toggleDarkMode } = useTheme()
  
  return (
    <div style={{ color: theme.settings.colors.primary }}>
      <p>Current theme: {theme.name}</p>
      <p>Dark mode: {isDark ? 'On' : 'Off'}</p>
      <button onClick={toggleDarkMode}>Toggle</button>
    </div>
  )
}
```

### **2. Using CSS Variables**

Theme Provider automatically sets CSS variables:

```css
/* Available CSS variables */
--color-primary: #3b82f6;
--color-secondary: #8b5cf6;
--color-background: #ffffff;
--color-surface: #f9fafb;
--color-text: #1f2937;
--color-border: #e5e7eb;

/* Use in CSS */
.my-button {
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--border-radius-md);
}
```

### **3. Using Tailwind Classes**

Combine dengan Tailwind dark mode:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1>Responsive to dark mode</h1>
</div>
```

---

## 🔄 Theme Switching Flow

```
1. User clicks "Activate" on theme card
   ↓
2. Navigate to /admin/themes/{id}/activate
   ↓
3. Server action:
   - Deactivate all themes (is_active = false)
   - Activate selected theme (is_active = true)
   - Update active_theme setting
   ↓
4. Redirect to /admin/themes
   ↓
5. Page shows activated theme with "Active" badge
```

---

## 🌙 Dark Mode Implementation

### **Auto-Detection**
```typescript
// In ThemeProvider useEffect
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
setIsDark(prefersDark)
```

### **LocalStorage Persistence**
```typescript
// Save preference
localStorage.setItem('darkMode', String(isDark))

// Load on mount
const savedDarkMode = localStorage.getItem('darkMode')
setIsDark(savedDarkMode === 'true')
```

### **CSS Class Toggle**
```typescript
document.documentElement.classList.toggle('dark', isDark)
```

---

## 🎯 Best Practices

### **Theme Design**
1. **Maintain consistency** - Use consistent spacing
2. **Accessibility** - Ensure sufficient color contrast
3. **Test both modes** - Verify light & dark themes
4. **Use semantic colors** - primary, secondary, success, etc.
5. **Mobile-first** - Ensure responsive design

### **Color Selection**
1. **Primary color** - Brand identity
2. **Secondary color** - Complements primary
3. **Background** - Main page background
4. **Surface** - Cards, panels
5. **Text** - Readable against background
6. **Border** - Subtle separation

### **Typography**
1. **Readable fonts** - Choose web-safe fonts
2. **Appropriate sizes** - 16px base recommended
3. **Line height** - 1.5 for body text
4. **Font scale** - Use modular scale (1.125, 1.2)

### **Spacing**
1. **Base unit** - 1rem (16px) standard
2. **Consistent spacing** - Use multiples of base
3. **Section spacing** - Adequate breathing room
4. **Container padding** - Responsive padding

---

## 🐛 Troubleshooting

### **Theme Not Activating**
**Issue**: Click activate but nothing happens  
**Fix**:
- Check database connection
- Verify RLS policies
- Check browser console for errors
- Ensure theme ID is valid

### **Dark Mode Not Persisting**
**Issue**: Dark mode resets on page reload  
**Fix**:
- Check localStorage availability
- Verify ThemeProvider wraps app
- Check for JavaScript errors

### **Colors Not Applying**
**Issue**: Custom colors not showing  
**Fix**:
- Verify CSS variables are set
- Check ThemeProvider is working
- Inspect element to see computed styles
- Clear browser cache

### **Customizer Changes Not Saving**
**Issue**: Changes lost after reload  
**Fix**:
- Click "Save Changes" button
- Check database permissions
- Verify settings table exists
- Check network tab for API errors

---

## 📊 Statistics

**Files Created**: 10 files
- Admin pages: 5 files
- Components: 3 files
- Types: 1 file
- Documentation: 1 file

**Lines of Code**: ~1,200 lines

**Features**:
- ✅ Theme management CRUD
- ✅ Live customizer (4 tabs)
- ✅ Dark mode support
- ✅ Theme switching
- ✅ LocalStorage persistence
- ✅ CSS variables
- ✅ Database integration
- ✅ TypeScript types

---

## 🎯 Common Tasks

### Create a Custom Theme
```
1. Go to /admin/themes
2. Click "Add Theme"
3. Enter theme details
4. Customize colors
5. Preview gradient
6. Click "Create Theme"
7. Activate new theme
```

### Switch Between Themes
```
1. Go to /admin/themes
2. Find desired theme
3. Click "Activate"
4. Theme applied instantly
```

### Customize Current Theme
```
1. Go to /admin/themes/customize
2. Choose tab (Colors/Typography/Spacing/Effects)
3. Make adjustments
4. See live preview
5. Click "Save Changes"
```

### Toggle Dark Mode
```
1. Find theme toggle button (moon/sun icon)
2. Click to toggle
3. Preference saved automatically
4. Works across all pages
```

---

## 🚀 Next Enhancements

### Planned Features:
- [ ] **Theme templates** - Pre-built themes
- [ ] **Import/Export** - Share themes
- [ ] **Theme marketplace** - Download themes
- [ ] **Child themes** - Extend parent themes
- [ ] **Custom CSS** - Add custom styles
- [ ] **Font upload** - Custom web fonts
- [ ] **More color schemes** - Predefined palettes
- [ ] **Theme preview mode** - Test before activating
- [ ] **Version history** - Rollback changes
- [ ] **Backup/Restore** - Save theme configs

---

## 🎉 Testing Checklist

- [ ] **Access** /admin/themes
- [ ] **View** all themes in grid
- [ ] **Create** new theme
- [ ] **Edit** existing theme
- [ ] **Activate** theme (see badge)
- [ ] **Customize** - Colors tab
- [ ] **Customize** - Typography tab
- [ ] **Customize** - Spacing tab
- [ ] **Customize** - Effects tab
- [ ] **Save** customizations
- [ ] **Reset** to defaults
- [ ] **Toggle** dark mode
- [ ] **Reload** page (persistence check)
- [ ] **Test** on mobile
- [ ] **Check** CSS variables

---

## 🎨 Example Themes

### **Professional Blue**
```json
{
  "colors": {
    "primary": "#2563eb",
    "secondary": "#7c3aed",
    "background": "#ffffff",
    "surface": "#f8fafc"
  }
}
```

### **Forest Green**
```json
{
  "colors": {
    "primary": "#059669",
    "secondary": "#14b8a6",
    "background": "#ffffff",
    "surface": "#f0fdf4"
  }
}
```

### **Sunset Orange**
```json
{
  "colors": {
    "primary": "#f97316",
    "secondary": "#ec4899",
    "background": "#ffffff",
    "surface": "#fff7ed"
  }
}
```

---

**Status**: ✅ **COMPLETE & READY!**  
**Last Updated**: 31 Oktober 2024, 14:40 WIB

🎨 **Themes**: http://localhost:3000/admin/themes  
⚙️ **Customize**: http://localhost:3000/admin/themes/customize

**Enjoy your beautiful, customizable themes!** 🎉
