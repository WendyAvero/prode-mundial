export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const { data: matches } = await supabase.from('matches').select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)').eq('status', 'scheduled').order('match_date').limit(5)
  const { data: ranking } = await supabase.from('ranking_view').select('*').limit(5)
  const { data: myPredictions } = await supabase.from('predictions').select('*').eq('user_id', user!.id)
  const { data: myRank } = await supabase.from('ranking_view').select('*').eq('user_id', user!.id).single()

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">¡Hola, {profile?.nombre}! 👋</h1>
        <p className="text-slate-400 text-sm mt-1">Bienvenido al Prode Mundial FIFA 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-indigo-400">{profile?.puntos_total || 0}</p>
          <p className="text-xs text-slate-400 mt-1">Mis puntos</p>
        </div>
        <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">#{myRank?.rank_position || '-'}</p>
          <p className="text-xs text-slate-400 mt-1">Mi posición</p>
        </div>
        <div className="bg-green-600/20 border border-green-500/30 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">{myPredictions?.length || 0}</p>
          <p className="text-xs text-slate-400 mt-1">Pronósticos</p>
        </div>
        <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{matches?.length || 0}</p>
          <p className="text-xs text-slate-400 mt-1">Próx. partidos</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Próximos partidos */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">📅 Próximos partidos</h2>
          {matches && matches.length > 0 ? (
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

        {/* Top ranking */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">🏆 Top 5 Ranking</h2>
          {ranking && ranking.length > 0 ? (
            <div className="space-y-2">
              {ranking.map((r: any) => {
                const medals = ['🥇', '🥈', '🥉']
                return (
                  <div key={r.user_id} className={`flex items-center gap-3 rounded-xl p-3 ${r.user_id === user?.id ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-slate-700/50'}`}>
                    <span className="text-lg">{medals[r.rank_position - 1] || `#${r.rank_position}`}</span>
                    <span className="flex-1 text-sm text-white truncate">{r.nombre} {r.apellido}</span>
                    <span className="text-indigo-400 font-bold text-sm">{r.total_points} pts</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-slate-500 text-sm text-center py-4">Nadie en el ranking todavía</p>
          )}
        </div>
      </div>
    </div>
  )
}
