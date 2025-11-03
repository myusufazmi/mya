# ✅ Testing Checklist - Next.js CMS Platform

**Version**: 1.0  
**Last Updated**: November 3, 2024

---

## 📋 Overview

Use this checklist to ensure all CMS features are working correctly before going live or after major updates.

**Recommended**: Test in order, as some tests depend on previous steps.

---

## 🔐 Authentication Testing

### User Registration
- [ ] Navigate to `/register`
- [ ] Enter valid email and password
- [ ] Submit form
- [ ] Check for confirmation email
- [ ] Verify account created in Supabase
- [ ] Confirm redirect to dashboard or login

### User Login
- [ ] Navigate to `/login`
- [ ] Enter registered credentials
- [ ] Submit form
- [ ] Verify redirect to `/admin/dashboard`
- [ ] Check session is active
- [ ] Verify user info displayed in header

### Password Reset
- [ ] Click "Forgot Password" link
- [ ] Enter registered email
- [ ] Submit request
- [ ] Check for reset email
- [ ] Click reset link in email
- [ ] Set new password
- [ ] Verify login with new password

### Logout
- [ ] Click logout button/link
- [ ] Verify redirect to login page
- [ ] Confirm session cleared
- [ ] Try accessing `/admin/dashboard` (should redirect)

---

## 📊 Dashboard Testing

### Dashboard Display
- [ ] Navigate to `/admin/dashboard`
- [ ] Verify metrics cards show correct counts:
  - [ ] Total Posts
  - [ ] Total Pages
  - [ ] Total Users
  - [ ] Total Media
- [ ] Check recent activity list loads
- [ ] Verify quick action buttons work
- [ ] Test responsive design (mobile/tablet/desktop)

---

## ✍️ Content Management Testing

### Create Post
- [ ] Navigate to `/admin/posts`
- [ ] Click "New Post" button
- [ ] Fill in title (auto-generates slug)
- [ ] Write content using rich text editor
- [ ] Test editor toolbar buttons:
  - [ ] Bold, Italic, Strikethrough
  - [ ] Headings (H1, H2, H3)
  - [ ] Bullet list, Numbered list
  - [ ] Blockquote, Code block
  - [ ] Insert link
  - [ ] Insert image
  - [ ] Undo/Redo
- [ ] Select featured image
- [ ] Choose category
- [ ] Add tags (multiple)
- [ ] Write excerpt
- [ ] Fill SEO fields
- [ ] Save as draft
- [ ] Verify post appears in posts list as "Draft"

### Edit Post
- [ ] Click post from list
- [ ] Modify title
- [ ] Update content
- [ ] Change featured image
- [ ] Update tags
- [ ] Update SEO fields
- [ ] Save changes
- [ ] Verify updates reflected

### Publish Post
- [ ] Open draft post
- [ ] Click "Publish" button
- [ ] Verify status changes to "Published"
- [ ] Check published_at timestamp set
- [ ] Verify post appears on frontend (if implemented)

### Delete Post
- [ ] Select post to delete
- [ ] Click delete button
- [ ] Confirm deletion
- [ ] Verify post removed from list
- [ ] Check database (should be deleted)

### Category Management
- [ ] Navigate to Categories
- [ ] Create new category:
  - [ ] Enter name
  - [ ] Verify slug auto-generated
  - [ ] Add description
  - [ ] Save
- [ ] Edit category
- [ ] Delete unused category
- [ ] Try deleting category with posts (should prevent)

### Tag Management
- [ ] View all tags
- [ ] Create new tag
- [ ] Edit tag name
- [ ] Delete unused tag
- [ ] Verify tag counts are correct

---

## 🖼️ Media Library Testing

### Upload Media
- [ ] Navigate to `/admin/media`
- [ ] Click "Upload" button
- [ ] Select single image
- [ ] Verify upload progress
- [ ] Confirm image appears in grid
- [ ] Test bulk upload (multiple files)
- [ ] Verify all files uploaded

### Media Management
- [ ] Click on media item
- [ ] Edit title/alt text
- [ ] Save changes
- [ ] Search for specific media
- [ ] Filter by type
- [ ] Sort by date/name/size
- [ ] Delete media item
- [ ] Verify removed from storage

### Media Picker
- [ ] In post editor, click "Select Image"
- [ ] Modal opens with media grid
- [ ] Select image
- [ ] Verify image inserted
- [ ] Test upload from picker
- [ ] Close modal without selecting

---

## 🎨 Page Builder Testing

### Create Page with Builder
- [ ] Navigate to `/admin/pages`
- [ ] Click "New Page"
- [ ] Choose template or start blank
- [ ] Add Hero block:
  - [ ] Set title, subtitle
  - [ ] Add button
  - [ ] Change background color
- [ ] Add Text block:
  - [ ] Write content
  - [ ] Format text
- [ ] Add Image block:
  - [ ] Select image
  - [ ] Set alignment
- [ ] Add Gallery block:
  - [ ] Select multiple images
  - [ ] Adjust columns
- [ ] Add Features block:
  - [ ] Add feature items
  - [ ] Change icons
- [ ] Add CTA block:
  - [ ] Set button text/link
  - [ ] Style background
- [ ] Add Contact Form block
- [ ] Test drag & drop reordering
- [ ] Publish page
- [ ] View on frontend

### Edit Existing Page
- [ ] Open published page
- [ ] Modify blocks
- [ ] Add new blocks
- [ ] Delete blocks
- [ ] Save changes
- [ ] Verify updates on frontend

---

## ⚙️ Settings Testing

### General Settings
- [ ] Navigate to `/admin/settings`
- [ ] Update site name
- [ ] Update site tagline
- [ ] Update description
- [ ] Set site URL
- [ ] Set admin email
- [ ] Click "Save Settings"
- [ ] Verify success message
- [ ] Refresh page, confirm saved

### SEO Settings
- [ ] Switch to SEO tab
- [ ] Set default SEO title
- [ ] Set default description
- [ ] Add keywords
- [ ] Add Google Analytics ID
- [ ] Add site verification code
- [ ] Save settings
- [ ] Verify saved

### Social Media Settings
- [ ] Switch to Social tab
- [ ] Add Facebook URL
- [ ] Add Twitter URL
- [ ] Add Instagram URL
- [ ] Add LinkedIn URL
- [ ] Add YouTube URL
- [ ] Save settings
- [ ] Verify URLs are valid

### Advanced Settings
- [ ] Switch to Advanced tab
- [ ] Set posts per page (1-100)
- [ ] Change date format
- [ ] Change time format
- [ ] Change timezone
- [ ] Toggle maintenance mode ON
- [ ] Save settings
- [ ] Open new incognito window
- [ ] Verify maintenance page shows
- [ ] Toggle maintenance mode OFF
- [ ] Verify site accessible again

---

## 👥 User Management Testing

### Create User
- [ ] Navigate to `/admin/users`
- [ ] Click "New User"
- [ ] Enter email, username, name
- [ ] Select role (Author/Editor/Admin)
- [ ] Send invitation
- [ ] Check invitation email received
- [ ] User completes registration
- [ ] Verify user appears in list

### Edit User
- [ ] Click on user
- [ ] Update name
- [ ] Change role
- [ ] Save changes
- [ ] Verify updates

### User Roles
Test permissions for each role:

#### Author
- [ ] Can create own posts
- [ ] Can edit own posts
- [ ] Cannot edit others' posts
- [ ] Cannot delete others' posts
- [ ] Cannot access settings
- [ ] Cannot manage users

#### Editor
- [ ] Can create posts
- [ ] Can edit any post
- [ ] Can publish posts
- [ ] Cannot delete posts
- [ ] Cannot access settings
- [ ] Cannot manage users

#### Admin
- [ ] Can create/edit/delete all content
- [ ] Can manage categories/tags
- [ ] Can upload media
- [ ] Can access settings
- [ ] Cannot manage users (unless super admin)

#### Super Admin
- [ ] Full system access
- [ ] Can manage users
- [ ] Can change user roles
- [ ] Can delete users
- [ ] Can access all features

### Delete User
- [ ] Select user to delete
- [ ] Click delete button
- [ ] Choose reassignment option
- [ ] Confirm deletion
- [ ] Verify user removed
- [ ] Check content reassigned correctly

---

## 📝 Activity Logs Testing

### View Logs
- [ ] Navigate to `/admin/logs`
- [ ] Verify logs display
- [ ] Check log entries show:
  - [ ] User who performed action
  - [ ] Action type (create/update/delete)
  - [ ] Entity type
  - [ ] Timestamp
  - [ ] IP address (if tracked)

### Filter Logs
- [ ] Filter by action type:
  - [ ] Create
  - [ ] Update
  - [ ] Delete
- [ ] Filter by entity type:
  - [ ] Posts
  - [ ] Pages
  - [ ] Users
  - [ ] Media
  - [ ] Settings
- [ ] Clear filters
- [ ] Refresh logs

### Log Accuracy
- [ ] Create a post
- [ ] Check log entry created
- [ ] Edit the post
- [ ] Check log entry created
- [ ] Delete the post
- [ ] Check log entry created
- [ ] Verify all details accurate

---

## 🔌 Plugin System Testing

### Plugin Loading
- [ ] Check plugins are registered
- [ ] Verify plugin hooks execute
- [ ] Test plugin menu items appear
- [ ] Verify plugin routes work

### Core Plugins
Test each core plugin:

#### Blog Plugin
- [ ] Posts display on blog page
- [ ] Categories filter works
- [ ] Tags filter works
- [ ] Pagination works
- [ ] Single post view loads

#### Gallery Plugin
- [ ] Gallery displays images
- [ ] Lightbox opens on click
- [ ] Navigation between images
- [ ] Close lightbox

#### Contact Form Plugin
- [ ] Form displays correctly
- [ ] Fill in all fields
- [ ] Submit form
- [ ] Verify submission saved
- [ ] Check email sent (if configured)

---

## 🎨 Theme System Testing

### Theme Switching
- [ ] Access theme selector (if available)
- [ ] Switch to different theme
- [ ] Verify colors changed
- [ ] Check typography updated
- [ ] Confirm spacing adjusted
- [ ] Test on different pages

### Theme Customization
- [ ] Open theme customizer
- [ ] Change primary color
- [ ] Change secondary color
- [ ] Update font family
- [ ] Adjust spacing
- [ ] Save changes
- [ ] Verify applied across site

### Dark Mode
- [ ] Toggle dark mode
- [ ] Check all pages render correctly
- [ ] Verify contrast is adequate
- [ ] Test interactive elements
- [ ] Toggle back to light mode

---

## 🚀 Performance Testing

### Page Load Speed
- [ ] Test homepage load time (< 3s ideal)
- [ ] Test admin dashboard load (< 2s)
- [ ] Test post editor load (< 2s)
- [ ] Test media library (< 3s)
- [ ] Use Chrome DevTools Lighthouse

### Image Optimization
- [ ] Check images are optimized
- [ ] Verify lazy loading works
- [ ] Test Next.js Image component
- [ ] Check responsive images

### Database Performance
- [ ] Test with 100+ posts
- [ ] Check query performance
- [ ] Verify pagination works
- [ ] Test search functionality
- [ ] Check no N+1 queries

---

## 📱 Responsive Testing

Test on different screen sizes:

### Mobile (320px - 480px)
- [ ] Login page
- [ ] Dashboard
- [ ] Post editor
- [ ] Media library
- [ ] Settings
- [ ] Frontend pages

### Tablet (768px - 1024px)
- [ ] All admin pages
- [ ] Navigation works
- [ ] Touch interactions
- [ ] Modals display correctly

### Desktop (1920px+)
- [ ] Layout not stretched
- [ ] Content centered
- [ ] No horizontal scroll
- [ ] All features accessible

---

## 🔐 Security Testing

### Authentication
- [ ] Cannot access admin without login
- [ ] Session expires appropriately
- [ ] CSRF protection works
- [ ] Password requirements enforced
- [ ] SQL injection prevented
- [ ] XSS attacks prevented

### Authorization
- [ ] Users can only edit own content (Authors)
- [ ] Editors cannot access settings
- [ ] Non-admins cannot manage users
- [ ] API endpoints protected
- [ ] Row Level Security enforced

### Data Validation
- [ ] Required fields validated
- [ ] Email format validated
- [ ] URL format validated
- [ ] File type restrictions work
- [ ] File size limits enforced

---

## 🌐 SEO Testing

### Meta Tags
- [ ] Check `<title>` tag on pages
- [ ] Verify `<meta description>` present
- [ ] Check `<meta keywords>` (if used)
- [ ] Test Open Graph tags
- [ ] Test Twitter Card tags
- [ ] Verify canonical URLs

### Structured Data
- [ ] Check schema.org markup
- [ ] Validate with Google Rich Results Test
- [ ] Verify article schema on posts
- [ ] Check breadcrumb schema

### Sitemap & Robots
- [ ] Generate sitemap.xml
- [ ] Check robots.txt
- [ ] Verify URLs in sitemap
- [ ] Test sitemap with Google Search Console

---

## 🧪 Browser Testing

Test on different browsers:

### Chrome
- [ ] All features work
- [ ] UI renders correctly
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] UI renders correctly
- [ ] No console errors

### Safari
- [ ] All features work
- [ ] UI renders correctly
- [ ] No console errors

### Edge
- [ ] All features work
- [ ] UI renders correctly
- [ ] No console errors

---

## 📧 Email Testing

### Email Sending
- [ ] Registration confirmation
- [ ] Password reset
- [ ] User invitation
- [ ] Comment notification (if enabled)
- [ ] Contact form submission

### Email Content
- [ ] Correct recipient
- [ ] Proper formatting
- [ ] Links work
- [ ] Images display
- [ ] Mobile-friendly

---

## 🔄 Backup & Recovery Testing

### Database Backup
- [ ] Create manual backup
- [ ] Verify backup file created
- [ ] Test restore from backup
- [ ] Verify data integrity

### Media Backup
- [ ] Export media files
- [ ] Verify all files included
- [ ] Test restore
- [ ] Check file paths correct

---

## 🐛 Error Handling Testing

### 404 Pages
- [ ] Visit non-existent URL
- [ ] Verify custom 404 page
- [ ] Check return to home link

### 500 Errors
- [ ] Trigger server error (carefully!)
- [ ] Verify error page
- [ ] Check error logged

### Form Errors
- [ ] Submit form with missing fields
- [ ] Verify error messages
- [ ] Check field highlighting
- [ ] Confirm helpful messages

### Network Errors
- [ ] Disconnect internet
- [ ] Try to save post
- [ ] Verify offline message
- [ ] Reconnect and retry

---

## ✅ Final Checks

### Pre-Launch
- [ ] All tests passed
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] SEO optimized
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Security reviewed
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Documentation complete

### Post-Launch
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Review user feedback
- [ ] Monitor performance
- [ ] Check uptime
- [ ] Review activity logs
- [ ] Update documentation

---

## 📊 Test Results Template

```markdown
## Test Session: [Date]
**Tester**: [Name]
**Environment**: [Development/Staging/Production]
**Browser**: [Browser + Version]

### Results
- Total Tests: X
- Passed: X
- Failed: X
- Skipped: X

### Failed Tests
1. [Test Name] - [Reason] - [Priority: High/Medium/Low]
2. ...

### Notes
- [Any observations]
- [Performance issues]
- [Suggestions]

### Next Steps
- [ ] Fix critical bugs
- [ ] Retest failed tests
- [ ] Document issues
```

---

## 🎉 Completion

When all tests pass:
- [ ] Mark Phase 9 as complete
- [ ] Update documentation
- [ ] Create release notes
- [ ] Deploy to production
- [ ] Celebrate! 🎊

---

**Version**: 1.0 | **Last Updated**: November 3, 2024
