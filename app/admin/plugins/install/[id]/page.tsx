import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCorePlugins } from '@/plugins'

export default async function InstallPluginPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const corePlugins = getCorePlugins()
  const plugin = corePlugins.find(p => p.metadata.id === id)

  if (!plugin) {
    redirect('/admin/plugins')
  }

  const supabase = await createClient()

  // Check if already installed
  const { data: existing } = await supabase
    .from('plugins')
    .select('id')
    .eq('plugin_id', id)
    .single()

  if (existing) {
    redirect('/admin/plugins')
  }

  // Install plugin
  const { error } = await supabase
    .from('plugins')
    .insert([
      {
        plugin_id: id,
        status: 'inactive',
        settings: plugin.defaultSettings || {},
        version: plugin.metadata.version,
        installed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

  if (error) {
    console.error('Error installing plugin:', error)
  }

  // Run initialize if exists
  if (plugin.initialize) {
    try {
      await plugin.initialize()
    } catch (err) {
      console.error('Error running plugin initialize:', err)
    }
  }

  redirect('/admin/plugins')
}
