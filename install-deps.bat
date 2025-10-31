@echo off
echo ========================================
echo Installing CMS Dependencies...
echo ========================================
echo.

echo [1/5] Installing Supabase packages...
call npm install @supabase/supabase-js @supabase/ssr

echo.
echo [2/5] Installing state management...
call npm install zustand @tanstack/react-query

echo.
echo [3/5] Installing form packages...
call npm install react-hook-form @hookform/resolvers zod

echo.
echo [4/5] Installing UI utilities...
call npm install lucide-react class-variance-authority clsx tailwind-merge date-fns sonner

echo.
echo [5/5] Installing editor and DnD...
call npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image
call npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

echo.
echo ========================================
echo Installation Complete! 
echo ========================================
echo.
echo Next steps:
echo 1. Deploy database schema (check INSTALLATION_GUIDE.md)
echo 2. Run: npm run dev
echo 3. Visit: http://localhost:3000/login
echo.
pause
