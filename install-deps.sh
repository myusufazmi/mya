#!/bin/bash

echo "========================================"
echo "Installing CMS Dependencies..."
echo "========================================"
echo ""

echo "[1/5] Installing Supabase packages..."
npm install @supabase/supabase-js @supabase/ssr

echo ""
echo "[2/5] Installing state management..."
npm install zustand @tanstack/react-query

echo ""
echo "[3/5] Installing form packages..."
npm install react-hook-form @hookform/resolvers zod

echo ""
echo "[4/5] Installing UI utilities..."
npm install lucide-react class-variance-authority clsx tailwind-merge date-fns sonner

echo ""
echo "[5/5] Installing editor and DnD..."
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

echo ""
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Deploy database schema (check INSTALLATION_GUIDE.md)"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000/login"
echo ""
