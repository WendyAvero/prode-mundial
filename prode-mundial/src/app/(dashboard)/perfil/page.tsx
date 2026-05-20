export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const { data: myRank } = await supabase.from('ranking_view').select('*').eq('user_id', user!.id).single()

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <h1 className="text-2xl font-bold text-white">👤 Mi Perfil</h1>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
          {profile?.nombre?.[0]}{profile?.apellido?.[0]}
        </div>
        <h2 className="text-xl font-bold text-white">{profile?.nombre} {profile?.apellido}</h2>
        <p className="text-slate-400 text-sm">{profile?.email}</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-indigo-600/20 rounded-xl p-4">
            <p className="text-2xl font-bold text-indigo-400">{profile?.puntos_total || 0}</p>
            <p className="text-xs text-slate-400">Puntos totales</p>
          </div>
          <div className="bg-yellow-600/20 rounded-xl p-4">
            <p className="text-2xl font-bold text-yellow-400">#{myRank?.rank_position || '-'}</p>
            <p className="text-xs text-slate-400">Posición</p>
          </div>
        </div>
      </div>
    </div>
  )
}
