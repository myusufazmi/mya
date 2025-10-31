# 🍔 Menu Builder - Navigation Guide

## ✅ Fitur Yang Sudah Tersedia

Complete menu management system untuk navigation site.

---

## 🎯 Fitur Lengkap

### **Menu Management** (`/admin/menus`)
- ✅ View all menus dalam grid cards
- ✅ Statistics (Total Menus, Items, Active)
- ✅ Menu locations (Header, Footer, Sidebar, Mobile)
- ✅ Create new menu
- ✅ Edit existing menu
- ✅ Delete menu
- ✅ Enable/disable menu
- ✅ Empty state dengan CTA

### **Menu Items**
- ✅ Add unlimited items per menu
- ✅ Set title & URL
- ✅ Quick select from published pages
- ✅ Custom links (external/internal)
- ✅ **Target** (Same Window / New Tab)
- ✅ **Reorder items** (Move Up/Down)
- ✅ Remove items
- ✅ Order tracking

---

## 🚀 Cara Menggunakan

### Create New Menu

1. **Go to Menus Page**
   ```
   http://localhost:3000/admin/menus
   ```

2. **Click "New Menu"**

3. **Fill Menu Settings:**
   - **Menu Name**: "Main Navigation" (required)
   - **Location**: Header (required)
   - **Description**: "Primary site navigation" (optional)
   - **Disabled**: ☐ Unchecked

4. **Add Menu Items:**
   - Click "+ Add Item"
   - **Title**: "Home"
   - **URL**: "/" (atau quick select)
   - **Target**: Same Window
   - Repeat untuk semua items

5. **Reorder Items:**
   - Use ↑ Up / ↓ Down buttons
   - Arrange in desired order

6. **Save Menu** ✅

### Edit Existing Menu

1. **From Menus list**, click **Edit** icon
2. **Update settings** atau menu items
3. **Add/Remove/Reorder** items as needed
4. **Save changes**

### Delete Menu

1. **Click Delete** icon
2. **Confirm deletion**
3. **Menu & items deleted** (cascade)

---

## 📁 File Structure

```
app/admin/menus/
├── page.tsx                   # Menus list
├── new/
│   └── page.tsx              # Create new menu
└── [id]/edit/
    └── page.tsx              # Edit menu

components/admin/
├── menu-form.tsx             # Menu form dengan items
└── delete-menu-button.tsx    # Delete button
```

---

## 🎨 Features Detail

### Menu Locations

**Header**
- Main navigation bar
- Top of page
- Most visible

**Footer**
- Bottom navigation
- Secondary links
- Legal, contact, etc

**Sidebar**
- Side navigation
- Additional links
- Category menus

**Mobile**
- Hamburger menu
- Mobile-specific
- Optimized for small screens

### Menu Items

**Title**
- Display text
- What users see
- E.g., "About Us"

**URL**
- Link destination
- Internal: `/about`
- External: `https://example.com`
- Anchor: `/page#section`

**Quick Select**
- Dropdown dengan published pages
- Auto-fill URL
- Faster setup

**Target**
- **Same Window** (_self) - Normal link
- **New Tab** (_blank) - Opens new tab

**Order**
- Ascending (0, 1, 2...)
- Determines display sequence
- Use Up/Down buttons

---

## 📊 Statistics

**Files Created**: 5 files
- Menus page: 1 file
- New menu: 1 file
- Edit menu: 1 file
- Menu form: 1 file
- Delete button: 1 file

**Lines of Code**: ~750 lines

**Features**:
- ✅ Full CRUD menus
- ✅ Menu items management
- ✅ 4 locations
- ✅ Reorder items
- ✅ Quick page select
- ✅ Target options
- ✅ Enable/disable
- ✅ Statistics dashboard

---

## 💡 Best Practices

### Menu Structure

**Keep It Simple:**
- 5-7 main items ideal
- Max 10 items for header
- More items → dropdown submenu

**Clear Labels:**
- Short & descriptive
- "About" not "About Our Company That Does..."
- Action-oriented

**Logical Order:**
- Most important first
- Home usually first
- Contact/Cart last

### URL Best Practices

**Internal Links:**
```
/              → Home
/about         → About page
/blog          → Blog index
/contact       → Contact page
```

**External Links:**
```
https://facebook.com/yourpage
https://twitter.com/yourhandle
```

**Anchors:**
```
/about#team    → About page, team section
/#services     → Home page, services section
```

### Common Menus

**Header Menu:**
```
Home         →  /
About        →  /about
Services     →  /services
Blog         →  /blog
Contact      →  /contact
```

**Footer Menu:**
```
Privacy Policy    →  /privacy
Terms of Service  →  /terms
Sitemap          →  /sitemap
Contact Us       →  /contact
```

---

## 🔒 Security

### Access Control
- ✅ **Only Admins** can create/edit menus
- ✅ **RLS policies** protect data
- ✅ **Validation** on save
- ✅ **SQL injection** prevented

### URL Validation
- Validate URLs before save
- Check for malicious content
- Sanitize user input
- Allow only safe protocols (http/https)

---

## 🎯 Common Tasks

### Create Header Menu
```
1. Menus → New Menu
2. Name: "Main Navigation"
3. Location: Header
4. Add Items:
   - Home (/)
   - About (/about)
   - Blog (/blog)
   - Contact (/contact)
5. Save Menu ✅
```

### Add External Link
```
1. Edit Menu
2. Add Item
3. Title: "Twitter"
4. URL: "https://twitter.com/yourhandle"
5. Target: New Tab
6. Save ✅
```

### Reorder Menu Items
```
1. Edit Menu
2. Use ↑ ↓ buttons on items
3. Arrange in desired order
4. Save Menu ✅
```

### Disable Menu Temporarily
```
1. Edit Menu
2. ✅ Check "Disable this menu"
3. Save → Menu hidden from site
4. Uncheck later to re-enable
```

---

## 🐛 Troubleshooting

### Menu Not Showing on Site
**Issue**: Saved menu but not visible  
**Fix**:
- Check "Disabled" is unchecked
- Integrate menu in theme (coming soon)
- Menu saved ≠ auto-displayed
- Need theme integration

### Items Not Saving
**Issue**: Added items but not persisted  
**Fix**:
- Check all required fields filled
- Title and URL are required
- Save menu after adding items
- Check console for errors

### Order Not Correct
**Issue**: Items display in wrong order  
**Fix**:
- Use ↑ ↓ buttons to reorder
- Order field auto-updated
- Save menu after reordering
- Refresh page to verify

---

## 🎯 Integration Examples

### Fetch Menu in Code

```typescript
// Get menu by location
const { data: menu } = await supabase
  .from('menus')
  .select(`
    *,
    menu_items(*)
  `)
  .eq('location', 'header')
  .eq('is_disabled', false)
  .single()

// Sort items by order
if (menu?.menu_items) {
  menu.menu_items.sort((a, b) => a.order - b.order)
}
```

### Display Menu in Frontend

```tsx
// In a component
function Navigation({ menu }) {
  return (
    <nav>
      <ul>
        {menu.menu_items.map((item) => (
          <li key={item.id}>
            <a 
              href={item.url} 
              target={item.target}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

### Multiple Menus

```typescript
// Get all active menus
const { data: menus } = await supabase
  .from('menus')
  .select(`
    *,
    menu_items(*)
  `)
  .eq('is_disabled', false)

// Group by location
const headerMenu = menus.find(m => m.location === 'header')
const footerMenu = menus.find(m => m.location === 'footer')
```

---

## 🎯 Next Enhancements

### Coming Soon:
- [ ] **Drag & drop** reordering
- [ ] **Nested menus** (submenus/dropdowns)
- [ ] **Icons** per menu item
- [ ] **CSS classes** custom per item
- [ ] **Conditional display** (logged in only)
- [ ] **Mega menus** (multi-column)
- [ ] **Menu templates** (presets)
- [ ] **Import/Export** menus
- [ ] **Menu preview** before save
- [ ] **Analytics** (click tracking)

---

## 🎉 Testing Checklist

- [ ] **Access** /admin/menus page
- [ ] **View stats** - Accurate counts
- [ ] **Create menu** - Fill all fields
- [ ] **Add items** - Multiple items
- [ ] **Quick select** - Pick from pages
- [ ] **Reorder** - Move up/down works
- [ ] **Remove item** - Delete works
- [ ] **Target** - Both options work
- [ ] **Save menu** - Persists correctly
- [ ] **Edit menu** - Load & update works
- [ ] **Delete menu** - Confirm & remove
- [ ] **Disable** - Toggle works

---

## 📈 Usage Statistics

**Typical Menu Sizes:**
- Header: 5-7 items
- Footer: 8-15 items
- Sidebar: 10-20 items
- Mobile: 5-10 items

**Best Performance:**
- < 15 items per menu
- < 50 total menu items site-wide
- Minimal nesting (future)

---

**Status**: ✅ COMPLETE & READY!  
**Last Updated**: 31 Oktober 2024, 14:20 WIB

🚀 **Start building menus at: http://localhost:3000/admin/menus**

**Note**: Menus are saved in database. To display on site, integrate in theme template (coming in theme system).
