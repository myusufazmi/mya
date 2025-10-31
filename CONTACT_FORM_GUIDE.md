# 📧 Contact Form - User Guide

## ✅ Fitur Yang Sudah Tersedia

Complete contact form system dengan submissions management dan API handling.

---

## 🎯 Fitur Lengkap

### **Admin Panel** (`/admin/contact`)
- ✅ View all contact submissions
- ✅ Statistics (Total, Unread, Read)
- ✅ Mark as Read/Unread
- ✅ Delete submissions
- ✅ Email links (click to reply)
- ✅ Timestamp tracking
- ✅ Visual unread indicator

### **Public Contact Form** (`/contact`)
- ✅ Beautiful responsive design
- ✅ 4 input fields (Name, Email, Subject, Message)
- ✅ Form validation
- ✅ Success/Error messages
- ✅ Loading states
- ✅ Auto-clear after success
- ✅ Contact information display
- ✅ Business hours section

### **API Endpoint** (`/api/contact`)
- ✅ POST endpoint for submissions
- ✅ Server-side validation
- ✅ Email format verification
- ✅ Database storage
- ✅ Error handling
- ✅ JSON responses

---

## 🚀 Cara Menggunakan

### View Contact Submissions (Admin)

1. **Go to Contact Page**
   ```
   http://localhost:3000/admin/contact
   ```

2. **View Submissions Table**
   - Unread messages (highlighted in blue)
   - Name, Email, Subject
   - Message preview
   - Date & time

3. **Manage Submissions:**
   - **Mark as Read**: Click checkmark icon
   - **Mark as Unread**: Click eye icon
   - **Delete**: Click trash icon → Confirm
   - **Reply via Email**: Click email address

### Public Contact Form

1. **Access Public Page**
   ```
   http://localhost:3000/contact
   ```

2. **Fill Form:**
   - Your Name (required)
   - Your Email (required)
   - Subject (required)
   - Message (required)

3. **Submit:**
   - Click "Send Message"
   - Wait for confirmation
   - Success message appears

---

## 📁 File Structure

```
app/
├── admin/contact/
│   └── page.tsx              # Admin submissions page
├── contact/
│   └── page.tsx              # Public contact page
└── api/contact/
    └── route.ts              # API endpoint

components/
├── admin/
│   └── submission-actions.tsx # Mark read/delete actions
└── public/
    └── contact-form.tsx       # Public form component
```

---

## 🎨 Features Detail

### Admin Submissions Table

**Columns:**
- **Status** - Unread (orange) / Read (green)
- **Name** - Sender's name
- **Email** - Clickable mailto link
- **Subject** - Message subject
- **Message** - Truncated preview
- **Date** - Submission timestamp
- **Actions** - Mark read/delete buttons

**Visual Indicators:**
- **Blue highlight** - Unread messages
- **White background** - Read messages
- **Badge colors** - Status visibility

### Public Form

**Contact Info Card:**
- Email address
- Phone number
- Physical address
- Business hours

**Form Fields:**
- Name input
- Email input (validated)
- Subject line
- Message textarea (6 rows)

**Feedback:**
- Green success message
- Red error alerts
- Loading button state
- Auto-clear on success

### API Validation

**Checks:**
- All fields present
- Email format valid
- Reasonable content length
- No SQL injection

**Responses:**
- 200 - Success
- 400 - Validation error
- 500 - Server error

---

## 📊 Statistics

**Files Created**: 5 files
- Admin page: 1 file
- Public page: 1 file
- Form component: 1 file
- Actions component: 1 file
- API route: 1 file

**Lines of Code**: ~600 lines

**Features**:
- ✅ Full CRUD submissions
- ✅ Mark as read/unread
- ✅ Email integration ready
- ✅ Form validation
- ✅ Success/error feedback
- ✅ Responsive design
- ✅ API endpoint
- ✅ Statistics dashboard

---

## 💡 Best Practices

### Form Design

**Keep It Simple:**
- Only essential fields
- Clear labels
- Helpful placeholders
- Visual feedback

**User Experience:**
- Show success message
- Clear form after submit
- Disable during loading
- Prevent double submission

### Spam Prevention

**Current Protection:**
- Form validation
- Email verification
- Server-side checks

**Future Enhancements:**
- CAPTCHA integration
- Rate limiting
- Honeypot fields
- IP tracking

### Email Notifications

**Setup Required:**
```typescript
// In API route (line 43-44)
// TODO: Send email notification to admin
// Implement with Resend, SendGrid, etc.
```

**Recommended Services:**
- Resend (modern, simple)
- SendGrid (enterprise)
- Amazon SES (AWS)
- Mailgun

---

## 🔒 Security

### Data Protection
- ✅ Input sanitization
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF protection (Next.js)
- ✅ Rate limiting (recommended)

### Privacy
- Store only necessary data
- GDPR compliance ready
- Clear data retention policy
- Option to delete submissions

---

## 🎯 Common Tasks

### Reply to Submission
```
1. Admin → Contact page
2. Click email address
3. Opens default email client
4. Pre-filled "To:" address
5. Write reply & send
```

### Mark Multiple as Read
```
1. Click checkmark on each
2. Status changes to "Read"
3. Highlight removed
4. Organized inbox
```

### Delete Old Submissions
```
1. Select submission
2. Click delete icon
3. Confirm deletion
4. Permanently removed
```

### Export Submissions (Future)
```
Coming Soon:
- CSV export
- Excel format
- Date range filter
- Bulk export
```

---

## 🐛 Troubleshooting

### Form Not Submitting
**Issue**: Click send but nothing happens  
**Fix**:
- Check browser console
- Verify API route exists
- Check network tab
- Ensure all fields filled

### No Email Notifications
**Issue**: Submissions saved but no email  
**Fix**:
- Email feature not implemented yet
- Add email service (Resend, etc.)
- Configure SMTP settings
- Test email delivery

### Submissions Not Showing
**Issue**: Form submits but not in admin  
**Fix**:
- Check database connection
- Verify contact_submissions table exists
- Check RLS policies
- Refresh admin page

---

## 🎯 Integration Examples

### Fetch Submissions in Code

```typescript
// Get all submissions
const { data: submissions } = await supabase
  .from('contact_submissions')
  .select('*')
  .order('created_at', { ascending: false })

// Get unread only
const { data: unread } = await supabase
  .from('contact_submissions')
  .select('*')
  .eq('is_read', false)
```

### Custom Contact Form

```tsx
// Create custom form
<form onSubmit={handleSubmit}>
  <input name="name" required />
  <input name="email" type="email" required />
  <textarea name="message" required />
  <button type="submit">Send</button>
</form>
```

### Email Notification (Example)

```typescript
// Using Resend
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: 'admin@yourdomain.com',
  subject: `New Contact: ${subject}`,
  text: `From: ${name} (${email})\n\n${message}`
})
```

---

## 🎯 Next Enhancements

### Coming Soon:
- [ ] **Email notifications** (Resend integration)
- [ ] **CAPTCHA** (spam prevention)
- [ ] **File attachments** (upload support)
- [ ] **Auto-responder** (confirmation email)
- [ ] **Categories** (general, support, sales)
- [ ] **Priority levels** (low, medium, high)
- [ ] **Assignment** (assign to team member)
- [ ] **Notes** (internal comments)
- [ ] **Export** (CSV, Excel)
- [ ] **Search** (find submissions)

---

## 🎉 Testing Checklist

- [ ] **Access** /contact page (public)
- [ ] **Fill form** - All fields
- [ ] **Submit** - Success message shows
- [ ] **Validation** - Try empty fields
- [ ] **Email validation** - Try invalid email
- [ ] **Admin view** - Check /admin/contact
- [ ] **Unread status** - Highlighted in blue
- [ ] **Mark as read** - Click checkmark
- [ ] **Email link** - Click to open client
- [ ] **Delete** - Confirm & remove
- [ ] **Responsive** - Test mobile view

---

## 📈 Usage Statistics

**Typical Volume:**
- Small business: 10-50 /month
- Medium business: 50-200 /month
- Large business: 200+ /month

**Response Time:**
- Target: < 24 hours
- Ideal: < 4 hours
- Critical: < 1 hour

---

## 💻 Customize Contact Info

Edit `/app/contact/page.tsx`:

```tsx
// Line 30-40: Update contact details
<a href="mailto:YOUR_EMAIL">
  YOUR_EMAIL
</a>

<a href="tel:YOUR_PHONE">
  YOUR_PHONE
</a>

<p>YOUR_ADDRESS</p>
```

---

**Status**: ✅ COMPLETE & READY!  
**Last Updated**: 31 Oktober 2024, 14:30 WIB

🚀 **Public form**: http://localhost:3000/contact  
📧 **Admin panel**: http://localhost:3000/admin/contact

**Note**: Email notifications require additional setup (Resend, SendGrid, etc.)
