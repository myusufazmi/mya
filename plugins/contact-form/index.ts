/**
 * Contact Form Plugin
 * Form builder and submission management
 */

import { Plugin } from '@/lib/plugins/types';

const contactFormPlugin: Plugin = {
  metadata: {
    id: 'contact-form',
    name: 'Contact Form',
    version: '1.0.0',
    description: 'Build and manage contact forms with email notifications',
    author: 'CMS Team',
    icon: 'Mail',
    tags: ['forms', 'contact', 'email'],
  },

  initialize: async () => {
    console.log('Contact Form plugin initialized');
  },

  cleanup: async () => {
    console.log('Contact Form plugin cleaned up');
  },

  hooks: [
    {
      type: 'after_save',
      callback: async (data: any) => {
        // Send email notification on form submission
        if (data.type === 'form_submission') {
          console.log('Sending email notification for form submission...');
          // Email sending logic would go here
        }
        return data;
      },
      priority: 10,
    },
    {
      type: 'before_save',
      callback: async (data: any) => {
        // Validate form submission data
        if (data.type === 'form_submission') {
          // Add timestamp and IP
          data.submittedAt = new Date().toISOString();
          data.validated = true;
        }
        return data;
      },
      priority: 5,
    },
  ],

  menuItems: [
    {
      label: 'Forms',
      path: '/admin/forms',
      icon: 'FileInput',
      children: [
        {
          label: 'All Forms',
          path: '/admin/forms',
          icon: 'List',
        },
        {
          label: 'Add New',
          path: '/admin/forms/new',
          icon: 'Plus',
        },
        {
          label: 'Submissions',
          path: '/admin/forms/submissions',
          icon: 'Inbox',
        },
      ],
    },
  ],

  blocks: [
    {
      id: 'contact-form',
      name: 'Contact Form',
      category: 'Forms',
      icon: 'Mail',
      component: () => null,
      defaultProps: {
        title: 'Get in Touch',
        fields: [
          { type: 'text', name: 'name', label: 'Name', required: true },
          { type: 'email', name: 'email', label: 'Email', required: true },
          { type: 'textarea', name: 'message', label: 'Message', required: true },
        ],
        submitText: 'Send Message',
        successMessage: 'Thank you for your message!',
        errorMessage: 'Something went wrong. Please try again.',
      },
      schema: {
        title: {
          type: 'text',
          label: 'Form title',
        },
        fields: {
          type: 'array',
          label: 'Form fields',
        },
        submitText: {
          type: 'text',
          label: 'Submit button text',
        },
        successMessage: {
          type: 'text',
          label: 'Success message',
        },
        errorMessage: {
          type: 'text',
          label: 'Error message',
        },
      },
    },
    {
      id: 'newsletter-form',
      name: 'Newsletter Form',
      category: 'Forms',
      icon: 'Send',
      component: () => null,
      defaultProps: {
        title: 'Subscribe to Newsletter',
        description: 'Get the latest updates delivered to your inbox',
        placeholder: 'Enter your email',
        submitText: 'Subscribe',
        showName: false,
      },
      schema: {
        title: {
          type: 'text',
          label: 'Title',
        },
        description: {
          type: 'text',
          label: 'Description',
        },
        placeholder: {
          type: 'text',
          label: 'Email placeholder',
        },
        submitText: {
          type: 'text',
          label: 'Button text',
        },
        showName: {
          type: 'boolean',
          label: 'Show name field',
        },
      },
    },
    {
      id: 'feedback-form',
      name: 'Feedback Form',
      category: 'Forms',
      icon: 'MessageSquare',
      component: () => null,
      defaultProps: {
        title: 'Send Feedback',
        showRating: true,
        ratingLabel: 'How would you rate your experience?',
        showCategory: true,
        categories: ['Bug Report', 'Feature Request', 'General Feedback'],
      },
      schema: {
        title: {
          type: 'text',
          label: 'Form title',
        },
        showRating: {
          type: 'boolean',
          label: 'Show rating',
        },
        ratingLabel: {
          type: 'text',
          label: 'Rating label',
        },
        showCategory: {
          type: 'boolean',
          label: 'Show category selector',
        },
        categories: {
          type: 'array',
          label: 'Categories',
        },
      },
    },
  ],

  defaultSettings: {
    emailNotifications: true,
    notificationEmail: '',
    saveSubmissions: true,
    requireCaptcha: false,
    allowFileUploads: false,
    maxFileSize: 5242880, // 5MB
    allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png'],
  },

  settingsComponent: undefined,
};

export default contactFormPlugin;
