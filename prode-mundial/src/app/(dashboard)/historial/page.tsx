export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'

export default async function HistorialPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: predictions } = await supabase
    .from('predictions')
    .select('*, match:matches(*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*))')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const finished = predictions?.filter((p: any) => p.match?.status === 'finished') || []
  const totalPoints = finished.reduce((sum: number, p: any) => sum + (p.points_earned || 0), 0)
  const exact = finished.filter((p: any) => p.points_earned === 3).length
  const winner = finished.filter((p: any) => p.points_earned === 1).length

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">📋 Mi Historial</h1>
        <p className="text-slate-400 text-sm mt-1">Todos tus resultados</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-indigo-400">{totalPoints}</p>
          <p className="text-xs text-slate-400">Puntos totales</p>
        </div>
        <div className="bg-green-600/20 border border-green-500/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{exact}</p>
          <p className="text-xs text-slate-400">Exactos ⭐</p>
        </div>
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{winner}</p>
          <p className="text-xs text-slate-400">Ganador correcto</p>
        </div>
      </div>
      <div className="space-y-3">
        {finished.length > 0 ? finished.map((p: any) => (
          <div key={p.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">{p.match?.match_day}</span>
              <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                p.points_earned === 3 ? 'bg-green-500/20 text-green-400' :
                p.points_earned > 0 ? 'bg-blue-500/20 text-blue-400' :
                'bg-slate-700 text-slate-400'
              }`}>
                {p.points_earned === 3 ? '⭐ +3 pts' : p.points_earned > 0 ? `✓ +${p.points_earned} pt` : '✗ 0 pts'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex-1 text-right text-white">{p.match?.home_team?.name} {p.match?.home_team?.flag_emoji}</span>
              <div className="text-center">
                <p className="text-slate-400 text-xs">Real</p>
                <p className="text-white font-bold">{p.match?.home_score} - {p.match?.away_score}</p>
                <p className="text-slate-400 text-xs">Tu pronós.</p>
                <p className="text-slate-300">{p.predicted_home} - {p.predicted_away}</p>
              </div>
              <span className="flex-1 text-white">{p.match?.away_team?.flag_emoji} {p.match?.away_team?.name}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-slate-400">Tus resultados aparecerán cuando terminen los partidos</p>
          </div>
        )}
      </div>
    </div>
  )
}
