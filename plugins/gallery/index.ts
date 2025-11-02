/**
 * Gallery Plugin
 * Image gallery and lightbox functionality
 */

import { Plugin } from '@/lib/plugins/types';

const galleryPlugin: Plugin = {
  metadata: {
    id: 'gallery',
    name: 'Gallery',
    version: '1.0.0',
    description: 'Image galleries with lightbox and slideshow support',
    author: 'CMS Team',
    icon: 'Image',
    tags: ['media', 'gallery', 'images'],
  },

  initialize: async () => {
    console.log('Gallery plugin initialized');
  },

  cleanup: async () => {
    console.log('Gallery plugin cleaned up');
  },

  hooks: [
    {
      type: 'after_save',
      callback: async (data: any) => {
        // Generate thumbnails for gallery images
        if (data.type === 'gallery' && data.images) {
          console.log('Processing gallery images...');
          // Thumbnail generation would happen here
        }
        return data;
      },
      priority: 10,
    },
  ],

  menuItems: [
    {
      label: 'Galleries',
      path: '/admin/galleries',
      icon: 'Image',
      children: [
        {
          label: 'All Galleries',
          path: '/admin/galleries',
          icon: 'Grid',
        },
        {
          label: 'Add New',
          path: '/admin/galleries/new',
          icon: 'Plus',
        },
      ],
    },
  ],

  blocks: [
    {
      id: 'gallery-grid',
      name: 'Image Gallery Grid',
      category: 'Gallery',
      icon: 'Grid',
      component: () => null,
      defaultProps: {
        columns: 3,
        gap: 16,
        showCaptions: true,
        enableLightbox: true,
        aspectRatio: 'square',
      },
      schema: {
        columns: {
          type: 'number',
          label: 'Columns',
          min: 1,
          max: 6,
        },
        gap: {
          type: 'number',
          label: 'Gap (px)',
          min: 0,
          max: 64,
        },
        showCaptions: {
          type: 'boolean',
          label: 'Show captions',
        },
        enableLightbox: {
          type: 'boolean',
          label: 'Enable lightbox',
        },
        aspectRatio: {
          type: 'select',
          label: 'Aspect ratio',
          options: [
            { value: 'square', label: 'Square (1:1)' },
            { value: 'landscape', label: 'Landscape (16:9)' },
            { value: 'portrait', label: 'Portrait (3:4)' },
            { value: 'auto', label: 'Auto' },
          ],
        },
      },
    },
    {
      id: 'gallery-masonry',
      name: 'Masonry Gallery',
      category: 'Gallery',
      icon: 'LayoutGrid',
      component: () => null,
      defaultProps: {
        columns: 3,
        gap: 16,
        enableLightbox: true,
      },
      schema: {
        columns: {
          type: 'number',
          label: 'Columns',
          min: 2,
          max: 5,
        },
        gap: {
          type: 'number',
          label: 'Gap (px)',
        },
        enableLightbox: {
          type: 'boolean',
          label: 'Enable lightbox',
        },
      },
    },
    {
      id: 'gallery-slideshow',
      name: 'Image Slideshow',
      category: 'Gallery',
      icon: 'PlayCircle',
      component: () => null,
      defaultProps: {
        autoPlay: true,
        interval: 5000,
        showArrows: true,
        showDots: true,
        transition: 'fade',
      },
      schema: {
        autoPlay: {
          type: 'boolean',
          label: 'Auto play',
        },
        interval: {
          type: 'number',
          label: 'Interval (ms)',
          min: 1000,
          max: 10000,
        },
        showArrows: {
          type: 'boolean',
          label: 'Show arrows',
        },
        showDots: {
          type: 'boolean',
          label: 'Show dots',
        },
        transition: {
          type: 'select',
          label: 'Transition',
          options: [
            { value: 'fade', label: 'Fade' },
            { value: 'slide', label: 'Slide' },
            { value: 'zoom', label: 'Zoom' },
          ],
        },
      },
    },
  ],

  defaultSettings: {
    defaultColumns: 3,
    defaultGap: 16,
    thumbnailSize: 'medium',
    enableLightbox: true,
    lightboxTheme: 'dark',
    lazyLoad: true,
  },

  settingsComponent: undefined,
};

export default galleryPlugin;
