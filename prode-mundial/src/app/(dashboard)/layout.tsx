export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/dashboard/Nav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (!profile) redirect('/login')
    return (
      <div className="min-h-screen bg-slate-900">
        <Nav profile={profile} />
        <main className="lg:pl-64 pt-14 lg:pt-0 pb-20 lg:pb-0">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    )
  } catch (e) {
    redirect('/login')
  }
}
