// Email service using Resend (recommended) or SendGrid
// Install: npm install resend

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
}

export async function sendEmail(options: EmailOptions) {
  // Check if Resend API key is configured
  const apiKey = process.env.RESEND_API_KEY
  
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured. Email not sent.')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from || 'noreply@yourdomain.com',
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email')
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

// Pre-built email templates
export const emailTemplates = {
  // Welcome email
  welcome: (name: string) => ({
    subject: 'Welcome to Our Platform!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for joining us. We're excited to have you on board.</p>
        <p>Get started by exploring our features:</p>
        <ul>
          <li>Create your first page</li>
          <li>Customize your theme</li>
          <li>Upload media files</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
          Get Started
        </a>
      </div>
    `,
  }),

  // Contact form notification
  contactNotification: (name: string, email: string, subject: string, message: string) => ({
    subject: `New Contact: ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; background: #f3f4f6; border-radius: 6px;">
          ${message}
        </div>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/contact" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
          View in Dashboard
        </a>
      </div>
    `,
  }),

  // Password reset
  passwordReset: (resetLink: string) => ({
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
          Reset Password
        </a>
        <p style="margin-top: 20px; color: #6b7280;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  }),

  // New post published
  postPublished: (title: string, url: string) => ({
    subject: `New Post Published: ${title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Post Published!</h2>
        <h3>${title}</h3>
        <p>A new blog post has been published on your site.</p>
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
          Read Post
        </a>
      </div>
    `,
  }),
}
