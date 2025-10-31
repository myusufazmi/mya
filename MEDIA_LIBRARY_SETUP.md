# 📁 Media Library Setup Guide

## ⚠️ IMPORTANT: Setup Supabase Storage First!

Before using Media Library, you need to create a Storage bucket in Supabase.

---

## 🔧 Step-by-Step Setup

### 1. Create Storage Bucket

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Select your project

2. **Go to Storage**
   - Click "Storage" in left sidebar

3. **Create New Bucket**
   - Click "New bucket" button
   - **Name**: `media` (exactly this name!)
   - **Public bucket**: ✅ Check this! (Important!)
   - Click "Create bucket"

### 2. Set Storage Policies

After creating bucket, set policies:

1. **Click on "media" bucket**
2. **Go to "Policies" tab**
3. **Click "New Policy"**

#### Policy 1: Public Read Access
```sql
-- Allow public to view files
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'media');
```

#### Policy 2: Authenticated Upload
```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'media');
```

#### Policy 3: Users Can Delete Own Files
```sql
-- Allow users to delete their own uploads
CREATE POLICY "Users Delete Own" 
ON storage.objects FOR DELETE 
TO authenticated
USING (
  bucket_id = 'media' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**OR** use this simpler policy (less secure, but easier):

```sql
-- Allow authenticated users full access
CREATE POLICY "Authenticated Full Access" 
ON storage.objects FOR ALL 
TO authenticated
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');
```

---

## ✅ Verify Setup

### Test Upload

1. **Go to Media Library**
   ```
   http://localhost:3000/admin/media
   ```

2. **Upload Test File**
   - Drag & drop an image
   - Click "Upload Files"
   - Should see success message

3. **Check File**
   - File should appear in grid
   - Click to view details
   - Try copy URL
   - Try delete

### Troubleshooting

#### Error: "storage/bucket-not-found"
**Fix**: Create "media" bucket in Supabase Storage

#### Error: "storage/unauthorized"
**Fix**: Check storage policies are set correctly

#### Error: "Failed to upload"
**Fix**: 
- Check file size (max 10MB)
- Check file type is allowed
- Check network connection

---

## 📂 File Structure

Files uploaded to: `media/uploads/[timestamp]-[random].[ext]`

Example:
```
media/
└── uploads/
    ├── 1698765432-abc123.jpg
    ├── 1698765433-def456.png
    └── 1698765434-ghi789.pdf
```

---

## 🎯 Features

### Upload
- ✅ **Drag & drop** multiple files
- ✅ **Browse** file picker
- ✅ **Multiple files** at once
- ✅ **Progress tracking** per file
- ✅ **Success/error** indicators
- ✅ **Auto-refresh** after upload

### File Management
- ✅ **Grid view** with previews
- ✅ **Image preview** thumbnails
- ✅ **File icons** for non-images
- ✅ **File details** modal
- ✅ **Copy URL** to clipboard
- ✅ **Download** files
- ✅ **Delete** files
- ✅ **Open** in new tab

### Statistics
- ✅ **Total files** count
- ✅ **Images** count
- ✅ **Videos** count
- ✅ **Documents** count
- ✅ **Total size** calculated

### Supported Files
- **Images**: JPG, PNG, GIF, WebP, SVG
- **Videos**: MP4, WebM, MOV
- **Documents**: PDF, DOC, DOCX, TXT
- **Max size**: 10MB per file

---

## 🔒 Security

### Storage Policies
- ✅ **Public read** - Anyone can view files
- ✅ **Authenticated upload** - Only logged-in users can upload
- ✅ **User-owned delete** - Users can delete their own files
- ✅ **Database metadata** - Track who uploaded what

### RLS Policies (Already Set)
From `DATABASE_SCHEMA.md`:
- ✅ Public can view media
- ✅ Authenticated can upload
- ✅ Users can manage own media
- ✅ Admins can manage all media

---

## 💡 Usage Tips

### Organizing Files
- Use descriptive filenames
- Keep file sizes optimized
- Delete unused files regularly

### Best Practices
- **Images**: Optimize before upload (use TinyPNG, ImageOptim)
- **Videos**: Compress videos (use Handbrake, FFmpeg)
- **Documents**: Use PDF when possible
- **Naming**: Use clear, descriptive names

### Integration with Pages/Posts
```html
<!-- Copy URL from Media Library and use in content -->
<img src="https://your-project.supabase.co/storage/v1/object/public/media/uploads/filename.jpg" alt="Description">

<!-- Or for markdown -->
![Alt text](https://your-project.supabase.co/storage/v1/object/public/media/uploads/filename.jpg)
```

---

## 🎯 Next Enhancements

### Coming Soon:
- [ ] **Image editor** (crop, resize, filters)
- [ ] **Folders** organization
- [ ] **Search** files by name
- [ ] **Filter** by file type
- [ ] **Bulk delete** multiple files
- [ ] **Drag & drop** reorder
- [ ] **Tags** for files
- [ ] **Alt text** & **Caption** editor
- [ ] **Usage tracking** (where file is used)
- [ ] **Replace file** functionality

---

## 📊 Stats

**Files Created**: 3 files
- Media Library page: 1 file
- Upload component: 1 file  
- Grid component: 1 file

**Lines of Code**: ~800 lines

**Features**:
- ✅ Upload with drag & drop
- ✅ Multiple file support
- ✅ Progress tracking
- ✅ Grid view with previews
- ✅ File details modal
- ✅ Copy URL
- ✅ Download
- ✅ Delete
- ✅ Statistics dashboard

---

## ⚡ Quick Start

1. **Setup Storage** (see above)
2. **Go to Media Library**:
   ```
   http://localhost:3000/admin/media
   ```
3. **Upload Files**: Drag & drop or browse
4. **Manage**: Click files to view/delete
5. **Use in Content**: Copy URL and paste in pages/posts

---

## 🐛 Common Issues

### Files Not Appearing
- Refresh page manually
- Check browser console for errors
- Verify files uploaded to Supabase Storage

### Can't Delete Files
- Check you're the file owner (or admin)
- Verify storage policies are correct
- Check browser console for errors

### Upload Fails
- File too large (>10MB)
- File type not supported
- No internet connection
- Storage bucket doesn't exist

---

**Status**: ✅ COMPLETE & READY!  
**Last Updated**: 31 Oktober 2024, 13:45 WIB

🚀 **Start uploading at: http://localhost:3000/admin/media**

**REMEMBER**: Setup Storage bucket first! ⚠️
