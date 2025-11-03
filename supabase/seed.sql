-- ============================================
-- SEED DATA - Next.js CMS Platform
-- ============================================
-- This file populates the database with sample data
-- Run after schema.sql for testing/demo purposes
-- ============================================

-- ============================================
-- CATEGORIES
-- ============================================

INSERT INTO categories (id, name, slug, description) VALUES
('c1111111-1111-1111-1111-111111111111', 'Technology', 'technology', 'Latest tech news, gadgets, and innovations'),
('c2222222-2222-2222-2222-222222222222', 'Business', 'business', 'Business insights, entrepreneurship, and finance'),
('c3333333-3333-3333-3333-333333333333', 'Lifestyle', 'lifestyle', 'Health, wellness, and lifestyle tips'),
('c4444444-4444-4444-4444-444444444444', 'Travel', 'travel', 'Travel guides and destination insights'),
('c5555555-5555-5555-5555-555555555555', 'Food', 'food', 'Recipes, restaurant reviews, and culinary adventures');

-- ============================================
-- TAGS
-- ============================================

INSERT INTO tags (id, name, slug) VALUES
('t1111111-1111-1111-1111-111111111111', 'AI', 'ai'),
('t2222222-2222-2222-2222-222222222222', 'Web Development', 'web-development'),
('t3333333-3333-3333-3333-333333333333', 'Mobile Apps', 'mobile-apps'),
('t4444444-4444-4444-4444-444444444444', 'Startup', 'startup'),
('t5555555-5555-5555-5555-555555555555', 'Marketing', 'marketing'),
('t6666666-6666-6666-6666-666666666666', 'Design', 'design'),
('t7777777-7777-7777-7777-777777777777', 'Productivity', 'productivity'),
('t8888888-8888-8888-8888-888888888888', 'Remote Work', 'remote-work'),
('t9999999-9999-9999-9999-999999999999', 'Tutorial', 'tutorial'),
('ta111111-1111-1111-1111-111111111111', 'News', 'news');

-- ============================================
-- SAMPLE POSTS
-- Note: Update author_id with your actual user UUID after registration
-- ============================================

-- Sample Post 1
INSERT INTO posts (
  id, 
  title, 
  slug, 
  content, 
  excerpt, 
  status, 
  category_id, 
  author_id,
  tags,
  seo_title,
  seo_description,
  published_at
) VALUES (
  'p1111111-1111-1111-1111-111111111111',
  'Getting Started with Next.js 16 and App Router',
  'getting-started-nextjs-16-app-router',
  '<h2>Introduction to Next.js 16</h2><p>Next.js 16 brings revolutionary changes to web development with the new App Router, React Server Components, and improved performance optimizations.</p><h3>Key Features</h3><ul><li>Server Components by default</li><li>Improved data fetching</li><li>Streaming and Suspense</li><li>Enhanced routing</li></ul><h3>Getting Started</h3><p>To create a new Next.js 16 project:</p><pre><code>npx create-next-app@latest my-app</code></pre><p>This will set up a new project with all the latest features enabled.</p>',
  'Learn how to get started with Next.js 16 and the new App Router. Discover the power of Server Components and streaming.',
  'published',
  'c1111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000', -- UPDATE THIS with your user ID
  ARRAY['t2222222-2222-2222-2222-222222222222', 't9999999-9999-9999-9999-999999999999'],
  'Next.js 16 Tutorial: Complete Guide to App Router',
  'Learn Next.js 16 with App Router, Server Components, and streaming. Complete tutorial for beginners.',
  NOW() - INTERVAL '7 days'
);

-- Sample Post 2
INSERT INTO posts (
  id, 
  title, 
  slug, 
  content, 
  excerpt, 
  status, 
  category_id, 
  author_id,
  tags,
  seo_title,
  seo_description,
  published_at
) VALUES (
  'p2222222-2222-2222-2222-222222222222',
  'Building a Modern CMS with Supabase and TypeScript',
  'building-modern-cms-supabase-typescript',
  '<h2>Why Build Your Own CMS?</h2><p>Content Management Systems are the backbone of modern websites. Building one with Supabase and TypeScript gives you full control and flexibility.</p><h3>Technology Stack</h3><ul><li>Next.js 16 - Frontend framework</li><li>Supabase - Backend and database</li><li>TypeScript - Type safety</li><li>Tailwind CSS - Styling</li></ul><h3>Key Features</h3><p>Our CMS includes:</p><ul><li>Rich text editor</li><li>Media library</li><li>User management</li><li>SEO optimization</li><li>Activity tracking</li></ul>',
  'Discover how to build a full-featured Content Management System using Supabase, TypeScript, and modern web technologies.',
  'published',
  'c1111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000', -- UPDATE THIS
  ARRAY['t2222222-2222-2222-2222-222222222222', 't9999999-9999-9999-9999-999999999999'],
  'Build a CMS with Supabase and TypeScript - Complete Guide',
  'Step-by-step guide to building a modern Content Management System with Supabase, Next.js, and TypeScript.',
  NOW() - INTERVAL '5 days'
);

-- Sample Post 3
INSERT INTO posts (
  id, 
  title, 
  slug, 
  content, 
  excerpt, 
  status, 
  category_id, 
  author_id,
  tags,
  published_at
) VALUES (
  'p3333333-3333-3333-3333-333333333333',
  '10 Productivity Tips for Remote Developers',
  '10-productivity-tips-remote-developers',
  '<h2>Mastering Remote Work</h2><p>Working remotely requires discipline and the right strategies. Here are 10 tips to boost your productivity.</p><h3>1. Create a Dedicated Workspace</h3><p>Set up a specific area for work to maintain boundaries between work and personal life.</p><h3>2. Stick to a Schedule</h3><p>Maintain consistent work hours to establish routine and predictability.</p><h3>3. Use Time Blocking</h3><p>Schedule specific blocks of time for different tasks to improve focus.</p>',
  'Maximize your productivity as a remote developer with these proven strategies and practical tips.',
  'published',
  'c2222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000', -- UPDATE THIS
  ARRAY['t7777777-7777-7777-7777-777777777777', 't8888888-8888-8888-8888-888888888888'],
  NOW() - INTERVAL '3 days'
);

-- Sample Post 4 (Draft)
INSERT INTO posts (
  id, 
  title, 
  slug, 
  content, 
  excerpt, 
  status, 
  category_id, 
  author_id,
  tags,
  published_at
) VALUES (
  'p4444444-4444-4444-4444-444444444444',
  'The Future of AI in Web Development',
  'future-ai-web-development',
  '<h2>AI is Transforming Development</h2><p>Artificial Intelligence is revolutionizing how we build websites and applications. From code generation to automated testing, AI tools are becoming indispensable.</p>',
  'Explore how AI is changing web development and what it means for developers.',
  'draft',
  'c1111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000', -- UPDATE THIS
  ARRAY['t1111111-1111-1111-1111-111111111111', 't2222222-2222-2222-2222-222222222222'],
  NULL
);

-- Sample Post 5
INSERT INTO posts (
  id, 
  title, 
  slug, 
  content, 
  excerpt, 
  status, 
  category_id, 
  author_id,
  tags,
  published_at
) VALUES (
  'p5555555-5555-5555-5555-555555555555',
  'Essential UI/UX Design Principles for 2024',
  'essential-ui-ux-design-principles-2024',
  '<h2>Modern Design Principles</h2><p>Great design is more important than ever. Here are the essential principles every designer should know in 2024.</p><h3>1. Simplicity</h3><p>Less is more. Clean, simple designs are easier to use and understand.</p><h3>2. Consistency</h3><p>Maintain consistent patterns throughout your design for better user experience.</p>',
  'Learn the essential UI/UX design principles that will make your products stand out in 2024.',
  'published',
  'c1111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000', -- UPDATE THIS
  ARRAY['t6666666-6666-6666-6666-666666666666'],
  NOW() - INTERVAL '1 day'
);

-- ============================================
-- SAMPLE PAGES
-- ============================================

INSERT INTO pages (
  id,
  title,
  slug,
  content,
  status,
  author_id,
  template,
  published_at
) VALUES 
(
  'pg111111-1111-1111-1111-111111111111',
  'About Us',
  'about',
  '{"blocks":[{"id":"block1","type":"hero","content":{"title":"About Our Company","subtitle":"We build amazing digital experiences"},"settings":{"backgroundColor":"#f3f4f6"}},{"id":"block2","type":"text","content":{"text":"<p>We are a team of passionate developers and designers creating innovative solutions for modern businesses.</p>"},"settings":{}}]}',
  'published',
  '00000000-0000-0000-0000-000000000000', -- UPDATE THIS
  'about',
  NOW() - INTERVAL '10 days'
),
(
  'pg222222-2222-2222-2222-222222222222',
  'Contact',
  'contact',
  '{"blocks":[{"id":"block1","type":"hero","content":{"title":"Get in Touch","subtitle":"We''d love to hear from you"},"settings":{}},{"id":"block2","type":"contact-form","content":{},"settings":{}}]}',
  'published',
  '00000000-0000-0000-0000-000000000000', -- UPDATE THIS
  'contact',
  NOW() - INTERVAL '10 days'
),
(
  'pg333333-3333-3333-3333-333333333333',
  'Privacy Policy',
  'privacy-policy',
  '{"blocks":[{"id":"block1","type":"text","content":{"text":"<h1>Privacy Policy</h1><p>Last updated: November 2024</p><h2>Information We Collect</h2><p>We collect information you provide directly to us...</p>"},"settings":{}}]}',
  'published',
  '00000000-0000-0000-0000-000000000000', -- UPDATE THIS
  'blank',
  NOW() - INTERVAL '10 days'
);

-- ============================================
-- SETTINGS
-- ============================================

INSERT INTO settings (key, value, category) VALUES
('site_name', '"My Awesome CMS"', 'general'),
('site_tagline', '"Building the future of content management"', 'general'),
('site_description', '"A modern, full-featured content management system built with Next.js and Supabase"', 'general'),
('site_url', '"https://example.com"', 'general'),
('admin_email', '"admin@example.com"', 'general'),

('seo_title', '"My Awesome CMS - Modern Content Management"', 'seo'),
('seo_description', '"Create and manage content with ease using our powerful CMS platform"', 'seo'),
('seo_keywords', '"cms, content management, nextjs, supabase"', 'seo'),

('posts_per_page', '"10"', 'advanced'),
('date_format', '"DD/MM/YYYY"', 'advanced'),
('time_format', '"24h"', 'advanced'),
('timezone', '"Asia/Jakarta"', 'advanced'),
('maintenance_mode', 'false', 'advanced');

-- ============================================
-- MENUS (if table exists)
-- ============================================

INSERT INTO menus (id, name, location, items) VALUES
('m1111111-1111-1111-1111-111111111111', 'Main Menu', 'header', '[
  {"label":"Home","url":"/","order":1},
  {"label":"Blog","url":"/blog","order":2},
  {"label":"About","url":"/about","order":3},
  {"label":"Contact","url":"/contact","order":4}
]');

-- ============================================
-- COMMENTS (Sample comments on posts)
-- ============================================

INSERT INTO comments (
  id,
  post_id,
  author_name,
  author_email,
  content,
  status,
  created_at
) VALUES
(
  'cm111111-1111-1111-1111-111111111111',
  'p1111111-1111-1111-1111-111111111111',
  'John Doe',
  'john@example.com',
  'Great article! Very helpful for understanding Next.js 16.',
  'approved',
  NOW() - INTERVAL '6 days'
),
(
  'cm222222-2222-2222-2222-222222222222',
  'p1111111-1111-1111-1111-111111111111',
  'Jane Smith',
  'jane@example.com',
  'Thanks for the tutorial. Looking forward to more content!',
  'approved',
  NOW() - INTERVAL '5 days'
),
(
  'cm333333-3333-3333-3333-333333333333',
  'p2222222-2222-2222-2222-222222222222',
  'Mike Johnson',
  'mike@example.com',
  'This is exactly what I was looking for. Building my own CMS now!',
  'approved',
  NOW() - INTERVAL '4 days'
);

-- ============================================
-- NOTES
-- ============================================

-- After running this seed file:
-- 1. Update all author_id fields with your actual user UUID
-- 2. You can find your user ID by running:
--    SELECT id FROM auth.users WHERE email = 'your-email@example.com';
-- 3. Then run:
--    UPDATE posts SET author_id = 'YOUR-UUID' WHERE author_id = '00000000-0000-0000-0000-000000000000';
--    UPDATE pages SET author_id = 'YOUR-UUID' WHERE author_id = '00000000-0000-0000-0000-000000000000';

-- To populate with your own user:
-- UPDATE posts SET author_id = (SELECT id FROM auth.users LIMIT 1) WHERE author_id = '00000000-0000-0000-0000-000000000000';
-- UPDATE pages SET author_id = (SELECT id FROM auth.users LIMIT 1) WHERE author_id = '00000000-0000-0000-0000-000000000000';

-- ============================================
-- END OF SEED DATA
-- ============================================

SELECT 'Seed data inserted successfully!' as message;
SELECT '⚠️  Remember to update author_id fields with your user UUID!' as reminder;
