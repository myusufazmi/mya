import { Plugin } from '@/types/plugin'

export const analyticsPlugin: Plugin = {
  metadata: {
    id: 'analytics',
    name: 'Analytics',
    version: '1.0.0',
    author: 'CMS Team',
    description: 'Track visitor statistics, page views, traffic sources, and user behavior analysis',
    category: 'utility',
    icon: 'TrendingUp',
    license: 'MIT',
  },

  settings: {
    trackingEnabled: true,
    anonymizeIp: true,
    cookieConsent: false,
    sessionTimeout: 30,
    googleAnalyticsId: '',
    excludeAdmins: true,
  },

  routes: [
    {
      path: '/admin/analytics/dashboard',
      component: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      icon: 'BarChart',
      adminOnly: true,
    },
    {
      path: '/admin/analytics/pages',
      component: 'page-analytics',
      title: 'Page Analytics',
      icon: 'FileText',
      adminOnly: true,
    },
    {
      path: '/admin/analytics/visitors',
      component: 'visitor-analytics',
      title: 'Visitors',
      icon: 'Users',
      adminOnly: true,
    },
    {
      path: '/admin/analytics/sources',
      component: 'traffic-sources',
      title: 'Traffic Sources',
      icon: 'Globe',
      adminOnly: true,
    },
  ],

  database: {
    tables: [
      {
        name: 'analytics_pageviews',
        schema: `
          CREATE TABLE analytics_pageviews (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            session_id VARCHAR(100) NOT NULL,
            user_id UUID REFERENCES profiles(id),
            page_path VARCHAR(500) NOT NULL,
            page_title VARCHAR(200),
            referrer VARCHAR(500),
            user_agent TEXT,
            ip_address VARCHAR(50),
            country VARCHAR(100),
            city VARCHAR(100),
            device_type VARCHAR(50),
            browser VARCHAR(100),
            os VARCHAR(100),
            screen_resolution VARCHAR(50),
            duration INTEGER,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'analytics_sessions',
        schema: `
          CREATE TABLE analytics_sessions (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            session_id VARCHAR(100) UNIQUE NOT NULL,
            user_id UUID REFERENCES profiles(id),
            landing_page VARCHAR(500),
            exit_page VARCHAR(500),
            referrer VARCHAR(500),
            utm_source VARCHAR(100),
            utm_medium VARCHAR(100),
            utm_campaign VARCHAR(100),
            pageview_count INTEGER DEFAULT 0,
            duration INTEGER,
            bounce BOOLEAN DEFAULT false,
            started_at TIMESTAMP DEFAULT NOW(),
            ended_at TIMESTAMP
          );
        `,
      },
      {
        name: 'analytics_events',
        schema: `
          CREATE TABLE analytics_events (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            session_id VARCHAR(100) NOT NULL,
            user_id UUID REFERENCES profiles(id),
            event_name VARCHAR(100) NOT NULL,
            event_category VARCHAR(100),
            event_label VARCHAR(200),
            event_value DECIMAL(10,2),
            metadata JSONB,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
    ],
  },

  async onActivate() {
    console.log('Analytics plugin activated')
    // Start tracking
    // Initialize analytics dashboard
  },

  async onDeactivate() {
    console.log('Analytics plugin deactivated')
    // Stop tracking
  },

  async onUninstall() {
    console.log('Analytics plugin uninstalled')
    // Archive analytics data
  },
}
