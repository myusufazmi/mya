/**
 * Blog Plugin
 * Adds blog/post functionality to the CMS
 */

import { Plugin, PluginHook } from '@/lib/plugins/types';
import { BookOpen } from 'lucide-react';

const blogPlugin: Plugin = {
  metadata: {
    id: 'blog',
    name: 'Blog',
    version: '1.0.0',
    description: 'Complete blog system with posts, categories, and tags',
    author: 'CMS Team',
    icon: 'BookOpen',
    tags: ['content', 'blog', 'posts'],
  },

  initialize: async () => {
    console.log('Blog plugin initialized');
  },

  cleanup: async () => {
    console.log('Blog plugin cleaned up');
  },

  hooks: [
    {
      type: 'before_save',
      callback: async (data: any) => {
        // Auto-generate excerpt if not provided
        if (data.type === 'post' && !data.excerpt && data.content) {
          const plainText = data.content.replace(/<[^>]+>/g, '');
          data.excerpt = plainText.substring(0, 160) + '...';
        }
        return data;
      },
      priority: 5,
    },
    {
      type: 'after_save',
      callback: async (data: any) => {
        // Update post count for categories
        if (data.type === 'post') {
          console.log('Post saved, updating category counts...');
        }
        return data;
      },
      priority: 10,
    },
  ],

  menuItems: [
    {
      label: 'Posts',
      path: '/admin/posts',
      icon: 'FileText',
      children: [
        {
          label: 'All Posts',
          path: '/admin/posts',
          icon: 'List',
        },
        {
          label: 'Add New',
          path: '/admin/posts/new',
          icon: 'Plus',
        },
        {
          label: 'Categories',
          path: '/admin/posts/categories',
          icon: 'FolderOpen',
        },
        {
          label: 'Tags',
          path: '/admin/posts/tags',
          icon: 'Tag',
        },
      ],
    },
  ],

  blocks: [
    {
      id: 'blog-post-list',
      name: 'Blog Post List',
      category: 'Blog',
      icon: 'List',
      component: () => null, // Will be implemented later
      defaultProps: {
        postsPerPage: 10,
        showExcerpt: true,
        showAuthor: true,
        showDate: true,
        showCategories: true,
      },
      schema: {
        postsPerPage: {
          type: 'number',
          label: 'Posts per page',
          min: 1,
          max: 50,
        },
        showExcerpt: {
          type: 'boolean',
          label: 'Show excerpt',
        },
        showAuthor: {
          type: 'boolean',
          label: 'Show author',
        },
        showDate: {
          type: 'boolean',
          label: 'Show date',
        },
        showCategories: {
          type: 'boolean',
          label: 'Show categories',
        },
      },
    },
    {
      id: 'blog-recent-posts',
      name: 'Recent Posts',
      category: 'Blog',
      icon: 'Clock',
      component: () => null,
      defaultProps: {
        count: 5,
        showThumbnail: true,
      },
      schema: {
        count: {
          type: 'number',
          label: 'Number of posts',
          min: 1,
          max: 20,
        },
        showThumbnail: {
          type: 'boolean',
          label: 'Show thumbnail',
        },
      },
    },
    {
      id: 'blog-categories',
      name: 'Category List',
      category: 'Blog',
      icon: 'FolderOpen',
      component: () => null,
      defaultProps: {
        showCount: true,
      },
      schema: {
        showCount: {
          type: 'boolean',
          label: 'Show post count',
        },
      },
    },
  ],

  defaultSettings: {
    postsPerPage: 10,
    showAuthor: true,
    showDate: true,
    showCategories: true,
    allowComments: false,
    requireApproval: true,
    dateFormat: 'MMMM dd, yyyy',
  },

  settingsComponent: undefined, // Will be created in admin UI phase
};

export default blogPlugin;
