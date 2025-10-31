# 🗄️ Database Schema - CMS System

## Overview
Schema database lengkap untuk CMS dengan support untuk pages, posts, themes, plugins, menus, dan media.

## 1. Users & Authentication

### profiles
Extends Supabase auth.users
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'user', -- 'super_admin', 'admin', 'editor', 'user'
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    )
  );
```

### permissions
```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(50) -- 'pages', 'posts', 'themes', 'plugins', 'users', 'settings'
);

-- Insert default permissions
INSERT INTO permissions (name, category, description) VALUES
  ('pages.create', 'pages', 'Create new pages'),
  ('pages.edit', 'pages', 'Edit pages'),
  ('pages.delete', 'pages', 'Delete pages'),
  ('pages.publish', 'pages', 'Publish pages'),
  ('posts.create', 'posts', 'Create new posts'),
  ('posts.edit', 'posts', 'Edit posts'),
  ('posts.delete', 'posts', 'Delete posts'),
  ('posts.publish', 'posts', 'Publish posts'),
  ('themes.manage', 'themes', 'Manage themes'),
  ('plugins.manage', 'plugins', 'Manage plugins'),
  ('users.manage', 'users', 'Manage users'),
  ('settings.manage', 'settings', 'Manage settings');
```

### role_permissions
```sql
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role VARCHAR(20) NOT NULL,
  permission_id UUID REFERENCES permissions(id),
  UNIQUE(role, permission_id)
);

-- Super admin has all permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'super_admin', id FROM permissions;

-- Admin has most permissions except user management
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions WHERE category != 'users';

-- Editor has content permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'editor', id FROM permissions WHERE category IN ('pages', 'posts');
```

## 2. Pages Management

### pages
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  content JSONB, -- Page builder blocks
  excerpt TEXT,
  featured_image TEXT,
  template VARCHAR(50) DEFAULT 'default',
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
  seo_title VARCHAR(200),
  seo_description TEXT,
  seo_keywords TEXT[],
  og_image TEXT,
  author_id UUID REFERENCES profiles(id),
  parent_id UUID REFERENCES pages(id),
  order_index INTEGER DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_pages_author ON pages(author_id);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view published pages" ON pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Editors can view own pages" ON pages
  FOR SELECT USING (
    author_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Editors can create pages" ON pages
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin'))
  );

CREATE POLICY "Editors can update own pages" ON pages
  FOR UPDATE USING (
    author_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Admins can delete pages" ON pages
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

### page_revisions
```sql
CREATE TABLE page_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  title VARCHAR(200),
  content JSONB,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_page_revisions_page ON page_revisions(page_id);
```

## 3. Menu System

### menus
```sql
CREATE TABLE menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  location VARCHAR(50), -- 'header', 'footer', 'sidebar'
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE menus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view menus" ON menus FOR SELECT USING (true);
CREATE POLICY "Admins can manage menus" ON menus
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

### menu_items
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES menu_items(id),
  title VARCHAR(100) NOT NULL,
  url TEXT,
  page_id UUID REFERENCES pages(id),
  target VARCHAR(20) DEFAULT '_self',
  icon VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  css_class VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_menu_items_menu ON menu_items(menu_id);
CREATE INDEX idx_menu_items_parent ON menu_items(parent_id);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view menu items" ON menu_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage menu items" ON menu_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

## 4. Content Management (Blog)

### posts
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  content JSONB,
  excerpt TEXT,
  featured_image TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  author_id UUID REFERENCES profiles(id),
  category_id UUID REFERENCES categories(id),
  seo_title VARCHAR(200),
  seo_description TEXT,
  seo_keywords TEXT[],
  og_image TEXT,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_author ON posts(author_id);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts" ON posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can manage own posts" ON posts
  FOR ALL USING (
    author_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

### categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Editors can manage categories" ON categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin'))
  );
```

### tags
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tags_slug ON tags(slug);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Editors can manage tags" ON tags
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin'))
  );
```

### post_tags
```sql
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_post ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag ON post_tags(tag_id);

ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view post tags" ON post_tags FOR SELECT USING (true);
CREATE POLICY "Authors can manage post tags" ON post_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_tags.post_id
      AND (posts.author_id = auth.uid() OR
           EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')))
    )
  );
```

## 5. Theme System

### themes
```sql
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  version VARCHAR(20),
  author VARCHAR(100),
  thumbnail TEXT,
  is_active BOOLEAN DEFAULT false,
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active theme" ON themes FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage themes" ON themes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

### theme_settings
```sql
CREATE TABLE theme_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  key VARCHAR(100) NOT NULL,
  value JSONB,
  type VARCHAR(50),
  UNIQUE(theme_id, key)
);

CREATE INDEX idx_theme_settings_theme ON theme_settings(theme_id);

ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active theme settings" ON theme_settings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM themes WHERE themes.id = theme_settings.theme_id AND themes.is_active = true)
  );

CREATE POLICY "Admins can manage theme settings" ON theme_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

## 6. Plugin System

### plugins
```sql
CREATE TABLE plugins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  version VARCHAR(20),
  author VARCHAR(100),
  icon TEXT,
  is_active BOOLEAN DEFAULT false,
  is_core BOOLEAN DEFAULT false,
  config JSONB,
  settings JSONB,
  dependencies TEXT[],
  hooks JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active plugins" ON plugins FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage plugins" ON plugins
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

### plugin_data
```sql
CREATE TABLE plugin_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plugin_id UUID REFERENCES plugins(id) ON DELETE CASCADE,
  key VARCHAR(100) NOT NULL,
  value JSONB,
  UNIQUE(plugin_id, key)
);

CREATE INDEX idx_plugin_data_plugin ON plugin_data(plugin_id);

ALTER TABLE plugin_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plugins can access own data" ON plugin_data
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

## 7. Media Library

### media
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255),
  mime_type VARCHAR(100),
  size BIGINT,
  width INTEGER,
  height INTEGER,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  caption TEXT,
  folder VARCHAR(100) DEFAULT 'uploads',
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX idx_media_folder ON media(folder);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view media" ON media FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload media" ON media
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "Users can manage own media" ON media
  FOR ALL USING (
    uploaded_by = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

## 8. Settings & Configuration

### site_settings
```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB,
  category VARCHAR(50),
  label VARCHAR(100),
  description TEXT,
  type VARCHAR(50),
  is_public BOOLEAN DEFAULT false,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value, category, label, type, is_public) VALUES
  ('site_title', '"My CMS"', 'general', 'Site Title', 'text', true),
  ('site_description', '"A powerful CMS"', 'general', 'Site Description', 'text', true),
  ('site_logo', 'null', 'general', 'Site Logo', 'image', true),
  ('site_favicon', 'null', 'general', 'Favicon', 'image', true),
  ('timezone', '"UTC"', 'general', 'Timezone', 'text', false),
  ('date_format', '"YYYY-MM-DD"', 'general', 'Date Format', 'text', false),
  ('posts_per_page', '10', 'general', 'Posts Per Page', 'number', true),
  ('maintenance_mode', 'false', 'advanced', 'Maintenance Mode', 'boolean', false);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view public settings" ON site_settings
  FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can manage settings" ON site_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

## 9. Activity Logs

### activity_logs
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action VARCHAR(50),
  entity_type VARCHAR(50),
  entity_id UUID,
  metadata JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view activity logs" ON activity_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
```

## Database Functions

### Update timestamp function
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_themes_updated_at BEFORE UPDATE ON themes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plugins_updated_at BEFORE UPDATE ON plugins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menus_updated_at BEFORE UPDATE ON menus
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Slug generation function
```sql
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
    ));
END;
$$ LANGUAGE plpgsql;
```

## Setup Script

Simpan semua SQL di atas ke file `supabase/schema.sql` dan jalankan di Supabase SQL Editor.
