/**
 * Page Templates
 * Pre-built page templates for quick page creation
 */

import { PageTemplate } from './types'

/**
 * Landing Page Template
 */
export const landingPageTemplate: PageTemplate = {
  id: 'landing-page',
  name: 'Landing Page',
  description: 'Modern landing page with hero, features, and CTA',
  category: 'marketing',
  thumbnail: '/templates/landing-page.jpg',
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      order: 0,
      visible: true,
      content: {
        title: 'Build Amazing Websites',
        subtitle: 'Welcome',
        description: 'Create beautiful, responsive websites with our powerful page builder',
        backgroundType: 'gradient',
        gradient: {
          from: '#3B82F6',
          to: '#8B5CF6',
          direction: 'to-r',
        },
        minHeight: '600px',
        textAlign: 'center',
        buttons: [
          { text: 'Get Started', url: '#', style: 'primary' },
          { text: 'Learn More', url: '#', style: 'outline' },
        ],
        overlay: true,
        overlayOpacity: 0.3,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cards-1',
      type: 'cards',
      order: 1,
      visible: true,
      content: {
        columns: 3,
        gap: '2rem',
        cards: [
          {
            title: 'Fast Performance',
            description: 'Lightning-fast load times for better user experience',
            image: 'https://via.placeholder.com/400x300',
            link: '#',
            buttonText: 'Learn More',
          },
          {
            title: 'Responsive Design',
            description: 'Works perfectly on all devices and screen sizes',
            image: 'https://via.placeholder.com/400x300',
            link: '#',
            buttonText: 'Learn More',
          },
          {
            title: 'Easy to Use',
            description: 'Intuitive drag & drop interface for everyone',
            image: 'https://via.placeholder.com/400x300',
            link: '#',
            buttonText: 'Learn More',
          },
        ],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cta-1',
      type: 'cta',
      order: 2,
      visible: true,
      content: {
        title: 'Ready to Get Started?',
        description: 'Join thousands of satisfied customers today',
        buttonText: 'Sign Up Now',
        buttonUrl: '/signup',
        backgroundColor: '#3B82F6',
        textColor: '#FFFFFF',
        buttonVariant: 'outline',
        alignment: 'center',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}

/**
 * About Page Template
 */
export const aboutPageTemplate: PageTemplate = {
  id: 'about-page',
  name: 'About Page',
  description: 'Professional about page with team and values',
  category: 'company',
  thumbnail: '/templates/about-page.jpg',
  blocks: [
    {
      id: 'heading-1',
      type: 'heading',
      order: 0,
      visible: true,
      content: {
        content: 'About Us',
        level: 1,
        textAlign: 'center',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'text-1',
      type: 'text',
      order: 1,
      visible: true,
      content: {
        content: '<p>We are a team of passionate individuals dedicated to creating amazing products.</p>',
        textAlign: 'center',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cards-1',
      type: 'cards',
      order: 2,
      visible: true,
      content: {
        columns: 4,
        gap: '1.5rem',
        cards: [
          {
            title: 'John Doe',
            description: 'CEO & Founder',
            image: 'https://via.placeholder.com/300',
          },
          {
            title: 'Jane Smith',
            description: 'Chief Technology Officer',
            image: 'https://via.placeholder.com/300',
          },
          {
            title: 'Bob Johnson',
            description: 'Head of Design',
            image: 'https://via.placeholder.com/300',
          },
          {
            title: 'Alice Williams',
            description: 'Marketing Director',
            image: 'https://via.placeholder.com/300',
          },
        ],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}

/**
 * Portfolio Template
 */
export const portfolioTemplate: PageTemplate = {
  id: 'portfolio',
  name: 'Portfolio',
  description: 'Showcase your work with a beautiful gallery',
  category: 'portfolio',
  thumbnail: '/templates/portfolio.jpg',
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      order: 0,
      visible: true,
      content: {
        title: 'My Portfolio',
        subtitle: 'Creative Designer',
        description: 'Showcasing my best work',
        backgroundImage: 'https://via.placeholder.com/1920x1080',
        minHeight: '400px',
        textAlign: 'center',
        overlay: true,
        overlayOpacity: 0.5,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'gallery-1',
      type: 'gallery',
      order: 1,
      visible: true,
      content: {
        columns: 3,
        gap: 'md',
        aspectRatio: 'square',
        lightbox: true,
        images: [
          { src: 'https://via.placeholder.com/600', alt: 'Project 1', caption: 'Project 1' },
          { src: 'https://via.placeholder.com/600', alt: 'Project 2', caption: 'Project 2' },
          { src: 'https://via.placeholder.com/600', alt: 'Project 3', caption: 'Project 3' },
          { src: 'https://via.placeholder.com/600', alt: 'Project 4', caption: 'Project 4' },
          { src: 'https://via.placeholder.com/600', alt: 'Project 5', caption: 'Project 5' },
          { src: 'https://via.placeholder.com/600', alt: 'Project 6', caption: 'Project 6' },
        ],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}

/**
 * Blog Post Template
 */
export const blogPostTemplate: PageTemplate = {
  id: 'blog-post',
  name: 'Blog Post',
  description: 'Clean blog post layout',
  category: 'blog',
  thumbnail: '/templates/blog-post.jpg',
  blocks: [
    {
      id: 'heading-1',
      type: 'heading',
      order: 0,
      visible: true,
      content: {
        content: 'Blog Post Title',
        level: 1,
        textAlign: 'left',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'image-1',
      type: 'image',
      order: 1,
      visible: true,
      content: {
        src: 'https://via.placeholder.com/1200x600',
        alt: 'Featured Image',
        caption: 'Featured image for this post',
        alignment: 'center',
        width: '100%',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'text-1',
      type: 'text',
      order: 2,
      visible: true,
      content: {
        content: '<p>Your blog post content goes here...</p>',
        textAlign: 'left',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}

/**
 * Blank Template
 */
export const blankTemplate: PageTemplate = {
  id: 'blank',
  name: 'Blank Page',
  description: 'Start with a completely blank canvas',
  category: 'basic',
  thumbnail: '/templates/blank.jpg',
  blocks: [],
}

/**
 * All templates
 */
export const pageTemplates: PageTemplate[] = [
  blankTemplate,
  landingPageTemplate,
  aboutPageTemplate,
  portfolioTemplate,
  blogPostTemplate,
]

/**
 * Get template by ID
 */
export function getTemplateById(id: string): PageTemplate | undefined {
  return pageTemplates.find(template => template.id === id)
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): PageTemplate[] {
  return pageTemplates.filter(template => template.category === category)
}
