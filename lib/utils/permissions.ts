import { createClient } from '@/lib/supabase/server'
import { UserRole } from '@/types'

export async function getUserRole(): Promise<UserRole | null> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    return profile?.role as UserRole || null
  } catch (error) {
    console.error('Error getting user role:', error)
    return null
  }
}

export async function hasPermission(permission: string): Promise<boolean> {
  const role = await getUserRole()
  if (!role) return false
  
  // Super admin has all permissions
  if (role === 'super_admin') return true
  
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('role_permissions')
      .select('permission:permissions(name)')
      .eq('role', role)
    
    return data?.some((p: any) => p.permission.name === permission) || false
  } catch (error) {
    console.error('Error checking permission:', error)
    return false
  }
}

export function canAccessAdmin(role: UserRole | null): boolean {
  return ['super_admin', 'admin', 'editor'].includes(role || '')
}

export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}

export async function requireRole(requiredRole: UserRole | UserRole[]) {
  const role = await getUserRole()
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  
  if (!role || !roles.includes(role)) {
    throw new Error('Forbidden: Insufficient permissions')
  }
  
  return role
}
