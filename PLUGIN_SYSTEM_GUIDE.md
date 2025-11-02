# 🔌 Plugin System - Complete Guide

## ✅ Sistem Yang Sudah Tersedia

Complete modular plugin architecture untuk extend CMS functionality dengan berbagai use cases.

---

## 🎯 Fitur Lengkap

### **Plugin Management** (`/admin/plugins`)
- ✅ View all installed plugins
- ✅ Install new plugins
- ✅ Activate/Deactivate plugins
- ✅ Uninstall plugins
- ✅ Plugin settings configuration
- ✅ Statistics dashboard

### **Sample Plugins Included**

#### **1. School Management** 🏫
**Untuk Website Sekolah**

**Features:**
- ✅ Class Management (Kelas)
- ✅ Student Management (Siswa)
- ✅ Teacher Management (Guru)
- ✅ Subject Management (Mata Pelajaran)
- ✅ Schedule Management (Jadwal Pelajaran)
- ✅ Attendance Tracking (Absensi)
- ✅ Grading System (Nilai)

**Database Tables** (7 tables):
- `school_classes` - Data kelas
- `school_students` - Data siswa
- `school_teachers` - Data guru
- `school_subjects` - Mata pelajaran
- `school_schedule` - Jadwal pelajaran
- `school_attendance` - Absensi
- `school_grades` - Nilai

**Use Case:**
- SD, SMP, SMA
- Madrasah
- Sekolah Kejuruan
- Lembaga Kursus

#### **2. E-commerce** 🛒
**Untuk Online Store**

**Features:**
- ✅ Product Management
- ✅ Product Categories
- ✅ Shopping Cart
- ✅ Order Management
- ✅ Customer Management
- ✅ Payment Integration (Midtrans, Xendit)
- ✅ Shipping Management
- ✅ Product Reviews
- ✅ Inventory Tracking

**Database Tables** (8 tables):
- `shop_products` - Produk
- `shop_product_categories` - Kategori produk
- `shop_customers` - Customer
- `shop_orders` - Pesanan
- `shop_order_items` - Detail pesanan
- `shop_payments` - Pembayaran
- `shop_cart` - Keranjang belanja
- `shop_reviews` - Review produk

**Use Case:**
- Toko Online
- Marketplace
- Digital Products
- Subscription Services

#### **3. Analytics** 📊
**Untuk Tracking & Statistics**

**Features:**
- ✅ Page View Tracking
- ✅ Visitor Analytics
- ✅ Traffic Sources
- ✅ Event Tracking
- ✅ Session Management
- ✅ UTM Parameter Tracking
- ✅ Device & Browser Stats

**Database Tables** (3 tables):
- `analytics_pageviews` - Page views
- `analytics_sessions` - User sessions
- `analytics_events` - Custom events

**Use Case:**
- Semua jenis website
- Marketing analytics
- User behavior analysis

---

## 🚀 Cara Menggunakan

### 1. View Plugins

**Access Plugin Manager:**
```
http://localhost:3000/admin/plugins
```

**Informasi yang ditampilkan:**
- Total plugins installed
- Active plugins count
- Inactive plugins count
- Plugin cards dengan status
- Available plugins (not installed)

### 2. Install Plugin

**Steps:**
1. Go to `/admin/plugins`
2. Scroll ke "Available Plugins"
3. Pilih plugin (School, E-commerce, Analytics)
4. Click "Install Plugin"
5. Plugin akan ter-install (status: Inactive)

**What happens:**
- Plugin metadata disimpan ke database
- Settings default di-create
- Status = Inactive (belum aktif)

### 3. Activate Plugin

**Steps:**
1. Find installed plugin card
2. Click "Activate" button
3. Plugin status → Active
4. Database tables created (if any)
5. Routes registered
6. `onActivate()` hook executed

**After Activation:**
- Plugin features available
- Admin menu updated (if routes defined)
- Database tables ready
- Settings accessible

### 4. Configure Plugin

**Steps:**
1. Click Settings icon on plugin card
2. Navigate to `/admin/plugins/{plugin-id}/settings`
3. Configure plugin options
4. Save changes

**Example Settings:**

**School Plugin:**
```json
{
  "schoolName": "SMA Negeri 1",
  "schoolAddress": "Jl. Pendidikan No. 123",
  "academicYear": "2024/2025",
  "enableAttendance": true,
  "enableGrading": true,
  "maxStudentsPerClass": 40
}
```

**E-commerce Plugin:**
```json
{
  "storeName": "Toko Online",
  "currency": "IDR",
  "taxRate": 11,
  "paymentGateways": {
    "midtrans": {
      "enabled": true,
      "serverKey": "your-key",
      "clientKey": "your-key"
    }
  }
}
```

### 5. Deactivate Plugin

**Steps:**
1. Find active plugin card
2. Click "Deactivate" button
3. Plugin status → Inactive
4. `onDeactivate()` hook executed

**What happens:**
- Plugin features disabled
- Routes removed from menu
- Data tetap tersimpan
- Can be re-activated anytime

### 6. Uninstall Plugin

**Steps:**
1. Find plugin card
2. Click trash icon
3. Confirm uninstall
4. `onUninstall()` hook executed
5. Plugin removed from database

**Warning:**
- This action cannot be undone
- Plugin data may be deleted
- Backup data first if needed

---

## 📁 File Structure

```
plugins/
├── school-management/
│   ├── index.ts                # Plugin definition
│   ├── components/             # React components
│   ├── routes/                 # Page routes
│   └── utils/                  # Utilities
├── ecommerce/
│   ├── index.ts
│   ├── components/
│   └── api/                    # API routes
├── analytics/
│   └── index.ts
└── README.md

app/admin/plugins/
├── page.tsx                    # Plugin manager
├── install/[id]/page.tsx       # Install handler
└── [id]/settings/page.tsx      # Plugin settings

components/admin/
└── plugin-card.tsx             # Plugin card component

types/
└── plugin.d.ts                 # TypeScript definitions
```

---

## 🗃️ Database Schema

### **plugins Table**
```sql
CREATE TABLE plugins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plugin_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  version VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT false,
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `plugin_id` - Unique plugin identifier
- `name` - Display name
- `version` - Plugin version
- `category` - school, ecommerce, utility, etc.
- `is_active` - Activation status
- `settings` - Plugin configuration (JSON)

---

## 💻 Creating Custom Plugin

### **Plugin Structure:**

```typescript
import { Plugin } from '@/types/plugin'

export const myPlugin: Plugin = {
  metadata: {
    id: 'my-plugin',
    name: 'My Plugin',
    version: '1.0.0',
    author: 'Your Name',
    description: 'Plugin description',
    category: 'utility',
    icon: 'Puzzle',
    license: 'MIT',
  },

  settings: {
    // Default settings
    enabled: true,
    apiKey: '',
  },

  routes: [
    {
      path: '/admin/my-plugin',
      component: 'my-component',
      title: 'My Plugin',
      icon: 'Puzzle',
      adminOnly: true,
    },
  ],

  database: {
    tables: [
      {
        name: 'my_table',
        schema: `
          CREATE TABLE my_table (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
    ],
  },

  async onActivate() {
    console.log('Plugin activated')
    // Initialize plugin
  },

  async onDeactivate() {
    console.log('Plugin deactivated')
  },

  async onUninstall() {
    console.log('Plugin uninstalled')
    // Cleanup
  },
}
```

### **Register Plugin:**

Add to `/app/admin/plugins/install/[id]/page.tsx`:

```typescript
import { myPlugin } from '@/plugins/my-plugin'

const availablePlugins: Record<string, any> = {
  'my-plugin': myPlugin,
  // ... other plugins
}
```

---

## 🎯 Plugin Categories

### **School** 🏫
Untuk website pendidikan
- School Management
- LMS (Learning Management System)
- Library Management
- Exam Management

### **E-commerce** 🛒
Untuk toko online
- E-commerce
- Inventory Management
- POS (Point of Sale)
- Affiliate System

### **Content** 📰
Untuk content management
- Gallery
- Portfolio
- Events
- Newsletter

### **Utility** 🔧
Tools & utilities
- Analytics
- SEO Tools
- Backup & Export
- Cache Management

### **Integration** 🔗
Third-party integrations
- Social Media
- Email Marketing
- Payment Gateways
- Cloud Storage

---

## 📊 Plugin Lifecycle

```
1. AVAILABLE
   - Plugin defined in code
   - Not in database
   - Can be installed
   ↓
2. INSTALL
   - User clicks "Install"
   - Metadata saved to DB
   - Status: Inactive
   - Settings created
   ↓
3. ACTIVATE
   - User clicks "Activate"
   - Status: Active
   - Database tables created
   - Routes registered
   - onActivate() executed
   ↓
4. ACTIVE
   - Plugin fully functional
   - Features available
   - Can access settings
   ↓
5. DEACTIVATE
   - User clicks "Deactivate"
   - Status: Inactive
   - Routes removed
   - on Deactivate() executed
   - Data preserved
   ↓
6. UNINSTALL
   - User clicks trash icon
   - onUninstall() executed
   - Removed from DB
   - (Optional) Tables dropped
```

---

## 🔒 Security Best Practices

### **1. Validation**
```typescript
// Validate plugin settings
if (!settings.apiKey || settings.apiKey.length < 10) {
  throw new Error('Invalid API key')
}
```

### **2. Permissions**
```typescript
// Check user permissions
const { data: user } = await supabase.auth.getUser()
if (user.role !== 'admin') {
  throw new Error('Unauthorized')
}
```

### **3. Data Sanitization**
```typescript
// Sanitize user input
const safeName = sanitize(formData.name)
```

### **4. Database Security**
- Use RLS policies
- Validate foreign keys
- Prevent SQL injection

---

## 🎯 Common Use Cases

### **Use Case 1: School Website**

**Plugins Needed:**
1. ✅ School Management (Kelas, Siswa, Guru)
2. ✅ Analytics (Track engagement)
3. ⭐ Newsletter (Parent communication)
4. ⭐ Events (School events)

**Setup:**
```
1. Install School Management plugin
2. Configure school info in settings
3. Add classes & subjects
4. Import student data
5. Create teacher accounts
6. Setup class schedules
```

### **Use Case 2: E-commerce Store**

**Plugins Needed:**
1. ✅ E-commerce (Products, Orders)
2. ✅ Analytics (Sales tracking)
3. ⭐ Newsletter (Customer marketing)
4. ⭐ Reviews (Product feedback)

**Setup:**
```
1. Install E-commerce plugin
2. Configure payment gateway (Midtrans)
3. Setup shipping options
4. Add product categories
5. Import products
6. Test checkout flow
```

### **Use Case 3: News Portal**

**Plugins Needed:**
1. ✅ Blog (Already built-in)
2. ✅ Analytics (Reader stats)
3. ⭐ Newsletter (Subscriber list)
4. ⭐ Comments (Reader engagement)

---

## 🐛 Troubleshooting

### **Plugin Won't Install**
**Issue**: Click install but nothing happens  
**Fix**:
- Check browser console for errors
- Verify database connection
- Check RLS policies on plugins table
- Ensure plugin_id is unique

### **Database Tables Not Created**
**Issue**: Plugin active but tables missing  
**Fix**:
- Check onActivate() execution
- Run SQL manually in Supabase
- Check for SQL syntax errors
- Verify database permissions

### **Plugin Settings Not Saving**
**Issue**: Changes don't persist  
**Fix**:
- Check JSONB format
- Verify update query
- Check browser network tab
- Validate settings schema

---

## 📈 Statistics

**Files Created**: 10+ files
- Plugin definitions: 3 files
- Admin pages: 2 files
- Components: 1 file
- Types: 1 file
- Documentation: 1 file

**Database Tables**: 18 tables total
- School plugin: 7 tables
- E-commerce plugin: 8 tables
- Analytics plugin: 3 tables

**Features**:
- ✅ Plugin management CRUD
- ✅ Activate/Deactivate system
- ✅ Settings configuration
- ✅ 3 sample plugins (School, E-commerce, Analytics)
- ✅ Modular architecture
- ✅ Hook system
- ✅ Database migrations

---

## 🎉 Next Steps

### **Create More Plugins:**
- Gallery Plugin
- Event Management
- Newsletter System
- Forum/Community
- Job Board
- Real Estate Listings

### **Enhance Existing:**
- School: Add exam module
- E-commerce: Add coupons/discounts
- Analytics: Add custom reports

### **Advanced Features:**
- Plugin marketplace
- Version updates
- Auto-updates
- Plugin dependencies
- Plugin hooks/filters
- API integration

---

**Status**: ✅ **COMPLETE & READY!**  
**Last Updated**: 31 Oktober 2024, 15:00 WIB

🔌 **Plugin Manager**: http://localhost:3000/admin/plugins

**Mulai extend CMS Anda dengan plugins!** 🚀
