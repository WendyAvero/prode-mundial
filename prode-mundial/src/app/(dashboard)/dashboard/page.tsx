export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  let matches: any[] = []
  let profile: any = null

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      profile = p

      const { data: m } = await supabase
        .from('matches')
        .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)')
        .eq('status', 'scheduled')
        .order('match_date')
        .limit(5)
      matches = m || []
    }
  } catch (e) {
    console.error(e)
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Bienvenido{profile ? `, ${profile.nombre}` : ''}! ⚽
        </h1>
        <p className="text-slate-400 text-sm mt-1">Prode Mundial FIFA 2026</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-indigo-400">{profile?.puntos_total || 0}</p>
          <p className="text-xs text-slate-400 mt-1">Mis puntos</p>
        </div>
        <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">#-</p>
          <p className="text-xs text-slate-400 mt-1">Mi posición</p>
        </div>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">📅 Próximos partidos</h2>
        {matches.length > 0 ? (
          <div className="space-y-3">
            {matches.map((match: any) => (
              <div key={match.id} className="flex items-center justify-between bg-slate-700/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-sm">
                  <span>{match.home_team?.flag_emoji}</span>
                  <span className="text-white font-medium">{match.home_team?.code}</span>
                  <span className="text-slate-500 text-xs">vs</span>
                  <span className="text-white font-medium">{match.away_team?.code}</span>
                  <span>{match.away_team?.flag_emoji}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(match.match_date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-4">No hay partidos próximos</p>
        )}
      </div>
    </div>
  )
}
