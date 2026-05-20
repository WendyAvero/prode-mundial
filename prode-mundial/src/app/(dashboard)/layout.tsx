export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')
    return (
      <div className="min-h-screen bg-slate-900">
        <main className="min-h-screen pb-20">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    )
  } catch {
    redirect('/login')
  }
}
