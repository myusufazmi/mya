# 🚀 Deployment Guide - Next.js CMS Platform

**Version**: 1.0  
**Last Updated**: November 3, 2024

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Supabase Setup](#supabase-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Custom Domain](#custom-domain)
6. [Environment Variables](#environment-variables)
7. [Database Migration](#database-migration)
8. [Post-Deployment](#post-deployment)
9. [Maintenance](#maintenance)
10. [Troubleshooting](#troubleshooting)

---

## 📖 Overview

This guide covers deploying the Next.js CMS to production using:
- **Supabase** for database and storage
- **Vercel** for hosting (recommended)
- Custom domain configuration

**Estimated Time**: 30-45 minutes

---

## ✅ Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account
- [ ] Supabase account (free tier OK)
- [ ] Vercel account (free tier OK)
- [ ] Domain name (optional, but recommended)
- [ ] All code committed to Git

---

## 🗄️ Supabase Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new organization (if needed)
4. Click "New Project"
5. Fill in details:
   ```
   Name: your-cms-production
   Database Password: [generate strong password]
   Region: [closest to your users]
   Pricing Plan: Free (or Pro if needed)
   ```
6. Click "Create new project"
7. Wait 2-3 minutes for provisioning

### Step 2: Run Database Migration

1. **Open SQL Editor** in Supabase Dashboard
2. **Load Schema File**:
   - Copy content from `supabase/schema.sql`
   - Paste into SQL Editor
   - Click "Run"
3. **Verify Tables Created**:
   - Go to Table Editor
   - Should see: posts, categories, pages, media, settings, profiles, activity_logs

### Step 3: Configure Storage

1. **Go to Storage** in Supabase Dashboard
2. **Create Bucket**:
   ```
   Name: media
   Public: Yes
   File size limit: 10MB
   ```
3. **Set Storage Policies**:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Allow public read access
CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Allow users to delete own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media' AND owner = auth.uid());
```

### Step 4: Enable Authentication

1. **Go to Authentication** → Settings
2. **Enable Providers**:
   - Email (already enabled)
   - Optional: Google, GitHub, etc.

3. **Configure Email Templates** (optional):
   - Go to Email Templates
   - Customize confirmation and reset emails
   - Add your branding

4. **Set Site URL**:
   ```
   Site URL: https://yourdomain.com
   Redirect URLs: 
   - https://yourdomain.com/auth/callback
   - http://localhost:3000/auth/callback (for dev)
   ```

### Step 5: Get API Keys

1. **Go to Settings** → API
2. **Copy**:
   - Project URL
   - Project API Keys (anon/public)
3. **Save these** - you'll need them for Vercel

---

## ▲ Vercel Deployment

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/your-cms.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important**: 
- Use production Supabase keys
- Add to all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Visit deployment URL: `https://your-project.vercel.app`

### Step 5: Test Deployment

1. **Visit site** - Should load
2. **Try login** - Should redirect to login page
3. **Check admin** - Should show unauthorized (not logged in yet)
4. **Test registration** - Create account

---

## 🌐 Custom Domain

### Step 1: Add Domain to Vercel

1. Go to Project Settings → Domains
2. Add your domain:
   ```
   yourdomain.com
   www.yourdomain.com
   ```
3. Vercel provides DNS records

### Step 2: Configure DNS

At your domain registrar (GoDaddy, Namecheap, etc.):

**For root domain** (yourdomain.com):
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Wait 24-48 hours** for DNS propagation (usually faster)

### Step 3: Enable HTTPS

1. Vercel auto-provisions SSL certificate
2. Wait a few minutes
3. Certificate should show "Valid"
4. HTTPS is now enabled!

### Step 4: Update Supabase URLs

In Supabase Dashboard → Authentication → Settings:
```
Site URL: https://yourdomain.com
Redirect URLs: 
- https://yourdomain.com/auth/callback
- https://www.yourdomain.com/auth/callback
```

---

## 🔐 Environment Variables

### Required Variables

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Site URL (Required)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional Variables

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_COMMENTS=true
NEXT_PUBLIC_ENABLE_MAINTENANCE=false

# Email (if using custom SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=xxxxx
```

### Security Best Practices

1. **Never commit `.env.local`** to Git
2. **Use different keys** for dev/staging/prod
3. **Rotate keys** periodically
4. **Use Vercel secrets** for sensitive data:
   ```bash
   vercel secrets add my-secret-name secret-value
   ```

---

## 🔄 Database Migration

### Initial Setup

Already done in Supabase Setup! But for reference:

```sql
-- Run in Supabase SQL Editor
-- Execute supabase/schema.sql
```

### Future Migrations

Create migration files:

```sql
-- migrations/002_add_views_column.sql
ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0;
```

Run in Supabase SQL Editor or use CLI:

```bash
# Using Supabase CLI
supabase migration up
```

### Backup Before Migrations

```bash
# Backup database
supabase db dump -f backup.sql

# Restore if needed
supabase db reset --db-url postgres://...
```

---

## ✅ Post-Deployment

### Step 1: Create Admin User

1. **Register First User**:
   - Go to https://yourdomain.com/register
   - Sign up with email

2. **Promote to Super Admin**:
   ```sql
   -- Run in Supabase SQL Editor
   UPDATE profiles 
   SET role = 'super_admin'
   WHERE username = 'your-username';
   ```

3. **Verify**:
   - Log in
   - Should see full admin panel

### Step 2: Configure Settings

1. Go to Settings → General
   - Set site name
   - Add tagline
   - Set admin email

2. Go to Settings → SEO
   - Add meta title/description
   - Add Google Analytics ID
   - Add site verification

3. Go to Settings → Social
   - Add social media URLs

### Step 3: Create Initial Content

1. **Create Categories**:
   - Technology
   - Business
   - Lifestyle
   - (Add yours)

2. **Create Sample Post**:
   - Title: "Welcome to Our Site"
   - Add content
   - Set featured image
   - Publish

3. **Create Pages**:
   - About
   - Contact
   - Privacy Policy
   - Terms of Service

### Step 4: Test Everything

- [ ] Post creation/editing
- [ ] Media upload
- [ ] Page builder
- [ ] User registration
- [ ] Password reset
- [ ] Comments (if enabled)
- [ ] Contact form
- [ ] SEO meta tags
- [ ] Social sharing

---

## 🔧 Maintenance

### Regular Tasks

**Weekly**:
- Check error logs in Vercel
- Review activity logs
- Check disk usage in Supabase
- Review user activity

**Monthly**:
- Update dependencies:
  ```bash
  npm update
  npm audit fix
  ```
- Review and archive old posts
- Clean up unused media
- Backup database

**Quarterly**:
- Security audit
- Performance review
- Update documentation
- Review analytics

### Monitoring

**Vercel Analytics**:
- Go to Project → Analytics
- Monitor:
  - Page views
  - Response times
  - Error rates
  - Geographic distribution

**Supabase Logs**:
- Go to Project → Logs
- Monitor:
  - Database queries
  - Auth events
  - Storage usage
  - API requests

### Backups

**Database Backup**:
```bash
# Manual backup
supabase db dump -f backup-$(date +%Y%m%d).sql

# Automated (set up cron job)
0 2 * * * supabase db dump -f /backups/db-$(date +%Y%m%d).sql
```

**Media Backup**:
```bash
# Download from Supabase Storage
supabase storage download media --all
```

---

## 🐛 Troubleshooting

### Deployment Fails

**Error**: "Build failed"

**Solutions**:
1. Check build logs in Vercel
2. Test build locally:
   ```bash
   npm run build
   ```
3. Fix TypeScript errors
4. Update dependencies
5. Clear build cache:
   ```bash
   rm -rf .next node_modules
   npm install
   ```

### Database Connection Issues

**Error**: "Could not connect to database"

**Solutions**:
1. Check Supabase status
2. Verify environment variables
3. Check RLS policies
4. Verify API keys are correct
5. Check network/firewall

### Authentication Not Working

**Error**: "Auth error" or redirects fail

**Solutions**:
1. Check Supabase Auth settings
2. Verify redirect URLs include production URL
3. Check site URL is set correctly
4. Clear browser cache/cookies
5. Test in incognito mode

### Images Not Loading

**Error**: Images show broken

**Solutions**:
1. Check Supabase Storage bucket is public
2. Verify storage policies
3. Check file paths in database
4. Verify CORS settings
5. Check file was actually uploaded

### Slow Performance

**Issue**: Site loads slowly

**Solutions**:
1. Enable Vercel Analytics
2. Check image sizes (compress large files)
3. Review database queries (add indexes)
4. Enable caching:
   ```typescript
   // In Server Component
   export const revalidate = 3600 // 1 hour
   ```
5. Use CDN for static assets
6. Optimize database queries

### Email Not Sending

**Error**: Verification emails not received

**Solutions**:
1. Check Supabase email settings
2. Verify SMTP configuration (if custom)
3. Check spam folder
4. Verify email templates
5. Check rate limits

---

## 📊 Performance Optimization

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/media/image.jpg"
  width={1200}
  height={630}
  alt="Description"
  loading="lazy"
  quality={85}
/>
```

### Database Indexing

```sql
-- Add indexes for common queries
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published_at DESC);
```

### Caching Strategy

```typescript
// Static pages (revalidate every hour)
export const revalidate = 3600

// Dynamic pages (revalidate on demand)
export const dynamic = 'force-dynamic'

// API routes (cache for 5 minutes)
export const GET = cache(async () => {
  // ... fetch data
}, {
  revalidate: 300
})
```

---

## 🔐 Security Checklist

Post-deployment security:

- [ ] Enable RLS on all tables
- [ ] Set strong database password
- [ ] Enable 2FA on Supabase/Vercel accounts
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (auto with Vercel)
- [ ] Set up Content Security Policy
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Regular security updates
- [ ] Monitor for suspicious activity

---

## 📞 Support

### Get Help

**Documentation**:
- [USER_GUIDE.md](USER_GUIDE.md)
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
- [API_DOCS.md](API_DOCS.md)

**Community**:
- GitHub Issues
- Discord (if available)
- Stack Overflow

**Professional Support**:
- Contact your administrator
- Hire a developer

---

## 🎉 Congratulations!

Your CMS is now deployed and running in production! 🚀

**Next steps**:
1. Share your site with users
2. Create amazing content
3. Monitor performance
4. Gather feedback
5. Keep improving

---

**Version**: 1.0 | **Last Updated**: November 3, 2024
