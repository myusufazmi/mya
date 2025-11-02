import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ActivateThemePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Deactivate all themes
  await supabase
    .from('themes')
    .update({ is_active: false })
    .neq('id', '00000000-0000-0000-0000-000000000000') // Update all

  // Activate selected theme
  const { error } = await supabase
    .from('themes')
    .update({ is_active: true })
    .eq('id', params.id)

  if (error) {
    console.error('Error activating theme:', error)
  }

  // Update active_theme setting
  await supabase
    .from('settings')
    .upsert({
      key: 'active_theme',
      value: params.id,
      category: 'appearance'
    })

  redirect('/admin/themes')
}
