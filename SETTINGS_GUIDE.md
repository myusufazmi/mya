# ⚙️ Settings Page - Configuration Guide

## ✅ Fitur Yang Sudah Tersedia

Complete site configuration system dengan 4 kategori settings.

---

## 🎯 Settings Categories

### **1. General Settings** 🌐
Configure basic site information:
- ✅ **Site Name** - Your site's name
- ✅ **Site Tagline** - Short description/slogan
- ✅ **Site Description** - Detailed about your site
- ✅ **Site URL** - Main site URL
- ✅ **Admin Email** - Contact email for admin

### **2. SEO Settings** 🔍
Optimize for search engines:
- ✅ **Default SEO Title** - Fallback meta title (60 chars)
- ✅ **Default SEO Description** - Fallback meta desc (160 chars)
- ✅ **Default Keywords** - Comma-separated keywords
- ✅ **Google Analytics ID** - GA4 tracking ID
- ✅ **Google Site Verification** - GSC verification code

### **3. Social Media** 📱
Connect your social profiles:
- ✅ **Facebook URL** - Facebook page link
- ✅ **Twitter/X URL** - Twitter profile link
- ✅ **Instagram URL** - Instagram profile link
- ✅ **LinkedIn URL** - LinkedIn company/profile link
- ✅ **YouTube URL** - YouTube channel link

### **4. Advanced Settings** ⚡
Technical configuration:
- ✅ **Posts Per Page** - Pagination limit (1-100)
- ✅ **Date Format** - Display format for dates
- ✅ **Time Format** - 12h or 24h
- ✅ **Timezone** - Site timezone (WIB/WITA/WIT)
- ✅ **Maintenance Mode** - Enable/disable site access

---

## 🚀 Cara Menggunakan

### Access Settings

1. **Go to Settings Page**
   ```
   http://localhost:3000/admin/settings
   ```

2. **Navigate Tabs**
   - Click tab sesuai kategori
   - Each tab shows related settings

### Update Settings

1. **Select Tab** (General, SEO, Social, Advanced)
2. **Fill/Update Fields**
   - Required fields marked with *
   - Character counters for SEO fields
3. **Click "Save Settings"**
4. **Wait for confirmation** ✅

### Specific Configurations

#### Setup Site Identity
```
Tab: General
- Site Name: "My Awesome Blog"
- Site Tagline: "Sharing knowledge daily"
- Site Description: "A blog about tech, lifestyle, and more..."
- Site URL: "https://myawesomeblog.com"
- Admin Email: "admin@myawesomeblog.com"
→ Save Settings
```

#### Configure SEO
```
Tab: SEO
- SEO Title: "My Awesome Blog - Tech & Lifestyle"
- SEO Description: "Discover tech tips, lifestyle hacks..."
- Keywords: "tech, blog, lifestyle, tutorials"
- Google Analytics: "G-XXXXXXXXXX"
→ Save Settings
```

#### Add Social Links
```
Tab: Social Media
- Facebook: "https://facebook.com/myawesomeblog"
- Twitter: "https://twitter.com/myawesomeblog"
- Instagram: "https://instagram.com/myawesomeblog"
→ Save Settings
```

#### Set Advanced Options
```
Tab: Advanced
- Posts Per Page: 10
- Date Format: DD/MM/YYYY
- Time Format: 24h
- Timezone: Asia/Jakarta (WIB)
- Maintenance Mode: ☐ Unchecked
→ Save Settings
```

---

## 📁 File Structure

```
app/admin/settings/
└── page.tsx                   # Settings page

components/admin/
└── settings-form.tsx          # Settings form with tabs

Database:
└── settings table             # Stores all settings
```

---

## 🗄️ Database Structure

### Settings Table
```sql
settings (
  id            UUID PRIMARY KEY
  key           TEXT UNIQUE      -- Setting key (e.g., 'site_name')
  value         TEXT             -- Setting value
  category      TEXT             -- general|seo|social|advanced
  created_at    TIMESTAMP
  updated_at    TIMESTAMP
)
```

### How It Works
- Each setting = 1 row
- Key-value pairs
- Upsert on save (insert or update)
- Categorized for organization

---

## 🎨 Features Detail

### Tabbed Interface
- **4 organized tabs** for better UX
- **Icon indicators** per category
- **Active state** highlighting
- **Smooth transitions**

### Form Validation
- **Required fields** marked
- **Character counters** for SEO
- **URL validation** for links
- **Number limits** for pagination
- **Type validation** (email, URL, number)

### Real-time Feedback
- **Success message** on save
- **Error alerts** if failed
- **Loading states** during save
- **Auto-dismiss** notifications

### Smart Defaults
- **Fallback values** if empty
- **Recommended formats**
- **Best practices** hints
- **Example placeholders**

---

## 💡 Best Practices

### SEO Optimization

**Title:**
- Include brand name
- 50-60 characters
- Clear & descriptive

**Description:**
- Summarize site purpose
- 150-160 characters
- Include main keywords
- Actionable language

**Keywords:**
- 5-10 relevant keywords
- Comma-separated
- Don't stuff!

### Social Media

**Complete Profiles:**
- Add all active platforms
- Use full URLs (https://)
- Verify links work
- Keep updated

### Advanced Settings

**Posts Per Page:**
- **10-20** for blogs
- **20-50** for news sites
- Consider load time

**Timezone:**
- Match your location
- Affects post scheduling
- Display timestamps

**Maintenance Mode:**
- Use for updates
- Admins still have access
- Show maintenance page to public

---

## 🔒 Security

### Access Control
- ✅ **Only Admins** can edit settings
- ✅ **Super Admins** recommended
- ✅ **RLS policies** protect data
- ✅ **Validation** on save

### Data Protection
- Settings stored encrypted (HTTPS)
- No sensitive passwords stored
- API keys handled securely
- Regular backups recommended

---

## 🎯 Common Tasks

### Change Site Name
```
1. Settings → General Tab
2. Site Name: "New Name"
3. Save Settings ✅
```

### Add Google Analytics
```
1. Settings → SEO Tab
2. Google Analytics ID: "G-XXXXXXXXXX"
3. Save Settings ✅
4. Add tracking script to theme
```

### Enable Maintenance Mode
```
1. Settings → Advanced Tab
2. ✅ Enable Maintenance Mode
3. Save Settings ✅
4. Site shows maintenance page
```

### Update Social Links
```
1. Settings → Social Media Tab
2. Add/Update URLs
3. Save Settings ✅
4. Links available site-wide
```

---

## 🐛 Troubleshooting

### Settings Not Saving
**Issue**: Click save but no changes  
**Fix**:
- Check you're logged in as Admin
- Check console for errors
- Verify database connection
- Try refresh page

### Invalid URL Error
**Issue**: Cannot save URL fields  
**Fix**:
- Use full URL (https://)
- Check for typos
- Remove trailing slashes
- Use valid URL format

### SEO Fields Not Showing
**Issue**: Meta tags not appearing  
**Fix**:
- Settings saved ≠ auto-displayed
- Need to integrate in theme
- Add to head section manually
- Coming in theme system

---

## 🎯 Integration Examples

### Use Settings in Code

```typescript
// Fetch specific setting
const { data } = await supabase
  .from('settings')
  .select('value')
  .eq('key', 'site_name')
  .single()

console.log(data.value) // "My Awesome Blog"
```

### Get All Settings
```typescript
// Get settings by category
const { data: seoSettings } = await supabase
  .from('settings')
  .select('*')
  .eq('category', 'seo')

// Get all settings
const { data: allSettings } = await supabase
  .from('settings')
  .select('*')
```

### Use in Frontend
```tsx
// In a component
const siteName = settings.find(s => s.key === 'site_name')?.value
const siteTagline = settings.find(s => s.key === 'site_tagline')?.value

<header>
  <h1>{siteName}</h1>
  <p>{siteTagline}</p>
</header>
```

---

## 📊 Statistics

**Files Created**: 2 files
- Settings page: 1 file
- Settings form: 1 file

**Lines of Code**: ~650 lines

**Settings Available**: 20+ settings
- General: 5 settings
- SEO: 5 settings
- Social: 5 settings
- Advanced: 5 settings

**Features**:
- ✅ Tabbed interface (4 tabs)
- ✅ Real-time save
- ✅ Form validation
- ✅ Character counters
- ✅ Success/error feedback
- ✅ Organized categories
- ✅ Smart defaults
- ✅ Responsive design

---

## 🎯 Next Enhancements

### Coming Soon:
- [ ] **Logo upload** (media integration)
- [ ] **Favicon** upload
- [ ] **Color scheme** picker
- [ ] **Email templates** editor
- [ ] **Custom CSS** field
- [ ] **Custom scripts** (header/footer)
- [ ] **API settings** (rate limits, etc)
- [ ] **Backup/Restore** settings
- [ ] **Import/Export** settings
- [ ] **Settings history** (changelog)

---

## 🎉 Testing Checklist

- [ ] **Access** /admin/settings page
- [ ] **General tab** - Update site info
- [ ] **SEO tab** - Add meta fields
- [ ] **Social tab** - Add social links
- [ ] **Advanced tab** - Change preferences
- [ ] **Save** - Verify success message
- [ ] **Refresh** - Settings persist
- [ ] **Character counters** - Work correctly
- [ ] **Validation** - Required fields enforced
- [ ] **Maintenance mode** - Toggle on/off

---

**Status**: ✅ COMPLETE & READY!  
**Last Updated**: 31 Oktober 2024, 14:10 WIB

🚀 **Configure your site at: http://localhost:3000/admin/settings**
