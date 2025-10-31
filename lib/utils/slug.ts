export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function ensureUniqueSlug(
  slug: string,
  table: 'pages' | 'posts',
  excludeId?: string
): Promise<string> {
  // This will be implemented after Supabase client is ready
  // For now, return the slug as-is
  return slug
}
