# 📚 User Guide - Next.js CMS Platform

**Version**: 1.0  
**Last Updated**: November 3, 2024

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Content Management](#content-management)
4. [Media Library](#media-library)
5. [Page Builder](#page-builder)
6. [Settings](#settings)
7. [User Management](#user-management)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Logging In

1. Navigate to `https://yoursite.com/login`
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to the admin dashboard

### First Time Setup

After logging in for the first time:

1. **Update Site Settings**
   - Go to Settings → General
   - Set your site name and tagline
   - Add your admin email

2. **Configure SEO**
   - Go to Settings → SEO
   - Add default meta title and description
   - Configure Google Analytics (optional)

3. **Create Categories**
   - Go to Posts → Categories
   - Create at least one category
   - Add description and slug

4. **Create Your First Post**
   - Go to Posts → New Post
   - Start writing!

---

## 📊 Dashboard Overview

The dashboard provides a quick overview of your site:

### Metrics Cards
- **Total Posts** - Number of published posts
- **Total Pages** - Number of published pages
- **Total Users** - Registered users count
- **Total Media** - Uploaded media files

### Recent Activity
- Latest posts created/updated
- Recent user registrations
- System activities

### Quick Actions
- Create new post
- Create new page
- Upload media
- Manage users

---

## ✍️ Content Management

### Creating a Post

1. **Navigate to Posts**
   - Click "Posts" in sidebar
   - Click "New Post" button

2. **Fill in Post Details**
   ```
   Title: Your post title
   Slug: auto-generated (editable)
   ```

3. **Select Featured Image**
   - Click "Select Image" button
   - Choose from media library or upload new
   - Image appears as preview

4. **Write Content**
   - Use the rich text editor toolbar
   - Format text (bold, italic, headings)
   - Add lists, links, and images
   - Add code blocks and quotes

5. **Add Metadata**
   - Select category from dropdown
   - Add tags (select multiple)
   - Write excerpt (optional)

6. **Configure SEO**
   - Scroll to SEO section
   - Add SEO title (60 chars recommended)
   - Add SEO description (160 chars)
   - Add keywords
   - Set Open Graph data

7. **Publish or Save**
   - Click "Save as Draft" to save without publishing
   - Click "Publish" to make live immediately

### Rich Text Editor Features

#### Text Formatting
- **Bold** - Ctrl/Cmd + B
- **Italic** - Ctrl/Cmd + I
- **Strikethrough** - Ctrl/Cmd + Shift + S
- **Code** - Ctrl/Cmd + E

#### Headings
- **H1** - Large heading
- **H2** - Medium heading
- **H3** - Small heading

#### Lists
- **Bullet List** - Unordered list
- **Numbered List** - Ordered list

#### Advanced
- **Link** - Add hyperlinks
- **Image** - Insert images
- **Blockquote** - Quote blocks
- **Code Block** - Code snippets
- **Undo/Redo** - Ctrl/Cmd + Z

### Managing Posts

#### Viewing All Posts
- Navigate to Posts
- See list with status, category, date
- Filter by status or category
- Search by title

#### Editing a Post
1. Click post title or "Edit" button
2. Make your changes
3. Click "Save as Draft" or "Publish"

#### Deleting a Post
1. Click "Delete" button next to post
2. Confirm deletion
3. Post moved to trash (if enabled)

### Categories

#### Creating a Category
1. Go to Posts → Categories
2. Click "New Category"
3. Fill in:
   - Name (e.g., "Technology")
   - Slug (auto-generated)
   - Description (optional)
4. Click "Create"

#### Managing Categories
- View all categories in list
- Edit category details
- Delete unused categories
- Categories with posts cannot be deleted

### Tags

#### Adding Tags
Tags are added directly in the post editor:
1. Scroll to "Tags" section
2. Select from dropdown or type new tag
3. Tags appear as blue pills
4. Click X to remove tag

#### Managing Tags
1. Go to Posts → Tags
2. View all tags with post count
3. Edit tag name
4. Merge similar tags
5. Delete unused tags

---

## 🖼️ Media Library

### Uploading Media

#### Single Upload
1. Go to Media
2. Click "Upload" button
3. Select file(s) from computer
4. Wait for upload to complete
5. Files appear in grid

#### Bulk Upload
1. Select multiple files (Ctrl/Cmd + Click)
2. All files upload simultaneously
3. Progress indicator shows status

### Managing Media

#### Viewing Media
- **Grid View** - Thumbnail grid (default)
- **List View** - Detailed list with metadata

#### Editing Media
1. Click on media item
2. Edit details:
   - Title
   - Alt text (for SEO)
   - Description
   - Caption
3. Click "Update"

#### Deleting Media
1. Select media item(s)
2. Click "Delete" button
3. Confirm deletion
4. Files removed from storage

#### Searching Media
- Use search bar at top
- Filter by type (image, video, document)
- Sort by date, name, size

### Using Media in Content

When editing a post:
1. Click "Select Image" for featured image
2. Or click image icon in editor
3. Media picker modal opens
4. Select from library or upload new
5. Image inserted automatically

---

## 🎨 Page Builder

### Creating a Page with Builder

1. **Start New Page**
   - Go to Pages → New Page
   - Click "Use Page Builder"

2. **Choose Template** (optional)
   - Select from 5 templates:
     - Blank
     - Landing Page
     - About Page
     - Services Page
     - Contact Page

3. **Add Blocks**
   - Click "+ Add Block" button
   - Choose block type:
     - Hero
     - Text
     - Image
     - Gallery
     - Features
     - CTA
     - FAQ
     - Team
     - Testimonials
     - Contact Form

4. **Customize Block**
   - Click block to select
   - Settings panel opens on right
   - Modify content, colors, spacing
   - See changes in real-time

5. **Arrange Blocks**
   - Drag handle to reorder
   - Move blocks up/down
   - Delete unwanted blocks

6. **Publish Page**
   - Click "Publish" when ready
   - Page goes live immediately

### Block Types

#### Hero Block
- Large header section
- Background image/color
- Title, subtitle, CTA button
- **Use for**: Homepage, landing pages

#### Text Block
- Rich text content
- Multiple columns support
- Typography controls
- **Use for**: Article content, descriptions

#### Image Block
- Single image display
- Caption support
- Alignment options
- **Use for**: Featured images, photos

#### Gallery Block
- Multiple images in grid
- Lightbox popup
- Column controls
- **Use for**: Photo galleries, portfolios

#### Features Block
- Icon + text cards
- Grid layout
- Customizable colors
- **Use for**: Service listings, features

#### CTA Block
- Call-to-action section
- Button with link
- Background styles
- **Use for**: Lead generation, conversions

#### FAQ Block
- Accordion questions
- Expandable answers
- SEO-friendly markup
- **Use for**: Help pages, Q&A

#### Team Block
- Team member cards
- Photo, name, role, bio
- Social links
- **Use for**: About page, team showcase

#### Testimonials Block
- Customer reviews
- Star ratings
- Avatar support
- **Use for**: Social proof, reviews

#### Contact Form Block
- Built-in form
- Email delivery
- Custom fields
- **Use for**: Contact pages

---

## ⚙️ Settings

### General Settings

#### Site Information
- **Site Name** - Your website name
- **Site Tagline** - Brief description
- **Site Description** - Full description
- **Site URL** - Your domain
- **Admin Email** - Contact email

**Best Practice**: Keep tagline under 60 characters

### SEO Settings

#### Default Meta Tags
- **SEO Title** - Default page title (60 chars)
- **SEO Description** - Default description (160 chars)
- **Keywords** - Comma-separated keywords

#### Analytics
- **Google Analytics ID** - Format: G-XXXXXXXXXX
- **Google Site Verification** - Verification code

**Tip**: Each post can override these defaults

### Social Media

Add your social media profiles:
- Facebook
- Twitter/X
- Instagram
- LinkedIn
- YouTube

**Format**: Full URL (e.g., https://facebook.com/yourpage)

### Advanced Settings

#### Display
- **Posts Per Page** - Pagination limit (1-100)
- **Date Format** - DD/MM/YYYY or MM/DD/YYYY
- **Time Format** - 12h or 24h
- **Timezone** - WIB, WITA, WIT, UTC

#### Maintenance Mode
- Toggle to show maintenance page
- Admins can still access
- Customize message (optional)

---

## 👥 User Management

### User Roles

#### Super Admin
- Full system access
- Can manage everything
- Delete any content
- Manage users

#### Admin
- Create/edit/delete content
- Upload media
- Manage categories/tags
- Cannot manage users

#### Editor
- Create/edit content
- Upload media
- Cannot delete
- Cannot access settings

#### Author
- Create own content
- Edit own content
- Upload media
- Cannot delete others' content

### Managing Users

#### Creating a User
1. Go to Users → New User
2. Fill in details:
   - Email
   - Username
   - Full Name
   - Role
3. Send invitation email
4. User sets password on first login

#### Editing Users
1. Go to Users
2. Click user to edit
3. Update details
4. Change role if needed
5. Save changes

#### Deleting Users
1. Select user
2. Click "Delete"
3. Choose option:
   - Delete all user content
   - Reassign to another user
4. Confirm deletion

---

## 🔍 Troubleshooting

### Common Issues

#### Can't Log In
**Problem**: Invalid credentials error

**Solutions**:
1. Check email/password spelling
2. Use "Forgot Password" link
3. Clear browser cache
4. Try incognito mode
5. Contact admin if still blocked

#### Image Upload Fails
**Problem**: Upload error or timeout

**Solutions**:
1. Check file size (max 5MB recommended)
2. Check file format (JPG, PNG, GIF, WebP)
3. Check internet connection
4. Try different browser
5. Compress image before upload

#### Rich Editor Not Loading
**Problem**: Editor shows blank or doesn't load

**Solutions**:
1. Refresh the page (Ctrl/Cmd + R)
2. Clear browser cache
3. Disable browser extensions
4. Try different browser
5. Check JavaScript is enabled

#### Page Builder Not Saving
**Problem**: Changes don't persist

**Solutions**:
1. Check internet connection
2. Don't navigate away during save
3. Check browser console for errors
4. Try saving individual blocks first
5. Export backup before major changes

#### Slow Performance
**Problem**: Admin panel is slow

**Solutions**:
1. Clear browser cache
2. Close unused tabs
3. Optimize large images before upload
4. Check internet speed
5. Use latest browser version

### Getting Help

#### Documentation
- Read this user guide
- Check developer docs
- Review Phase completion docs

#### Support
- Email: admin@yoursite.com
- Check activity logs for errors
- Export error details

#### Reporting Bugs
When reporting issues, include:
1. What you were trying to do
2. What happened instead
3. Browser and version
4. Screenshot if possible
5. Error message (if any)

---

## 💡 Tips & Best Practices

### Content Creation

1. **Write Quality Content**
   - Use headings to structure
   - Break text into paragraphs
   - Add images to illustrate
   - Link to related content

2. **SEO Optimization**
   - Use keywords naturally
   - Write compelling titles
   - Add alt text to images
   - Set meta descriptions

3. **Image Best Practices**
   - Optimize before upload (compress)
   - Use descriptive file names
   - Add alt text for accessibility
   - Recommended: 1200x630px for featured

4. **Content Organization**
   - Use categories consistently
   - Add relevant tags
   - Write clear URLs/slugs
   - Schedule posts strategically

### Performance

1. **Keep Media Optimized**
   - Compress images before upload
   - Use appropriate formats (WebP best)
   - Delete unused media regularly

2. **Regular Cleanup**
   - Archive old drafts
   - Remove unused categories/tags
   - Clear activity logs periodically

### Security

1. **Strong Passwords**
   - Use 12+ characters
   - Mix letters, numbers, symbols
   - Don't reuse passwords
   - Change regularly

2. **User Management**
   - Give minimum required role
   - Remove inactive users
   - Review user list monthly

3. **Backups**
   - Export content regularly
   - Save media backups
   - Document settings

---

## 📱 Keyboard Shortcuts

### Editor Shortcuts
- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + K` - Add link
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Ctrl/Cmd + S` - Save draft

### Navigation
- `Ctrl/Cmd + /` - Search
- `Esc` - Close modal
- `Tab` - Next field
- `Shift + Tab` - Previous field

---

## 🎓 Video Tutorials

Coming soon:
- Getting started walkthrough
- Creating your first post
- Using the page builder
- SEO optimization guide
- Media library management

---

## 📞 Support & Resources

### Documentation
- [Developer Guide](DEVELOPER_GUIDE.md)
- [API Documentation](API_DOCS.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)

### Community
- GitHub Issues
- Discussion Forum
- Discord Server (coming soon)

---

**Need more help?** Contact your administrator or check the developer documentation for technical details.

**Version**: 1.0 | **Last Updated**: November 3, 2024
