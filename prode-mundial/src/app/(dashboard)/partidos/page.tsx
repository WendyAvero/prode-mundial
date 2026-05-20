export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'

export default async function PartidosPage() {
  const supabase = await createClient()
  const { data: phases } = await supabase.from('phases').select('*').order('order')
  const { data: matches } = await supabase
    .from('matches')
    .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*), phase:phases(*)')
    .order('match_date')

  const matchesByPhase = phases?.map(phase => ({
    ...phase,
    matches: matches?.filter(m => m.phase_id === phase.id) || []
  }))

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">📅 Todos los Partidos</h1>
        <p className="text-slate-400 text-sm mt-1">Fixture completo del Mundial 2026</p>
      </div>
      {matchesByPhase?.map(phase => (
        phase.matches.length > 0 && (
          <div key={phase.id}>
            <h2 className="text-lg font-semibold text-white mb-3">{phase.name}</h2>
            <div className="space-y-2">
              {phase.matches.map((match: any) => (
                <div key={match.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500">{match.match_day}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      match.status === 'finished' ? 'bg-slate-600 text-slate-300' :
                      match.status === 'live' ? 'bg-red-500/20 text-red-400' :
                      'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {match.status === 'finished' ? 'Finalizado' : match.status === 'live' ? '🔴 En vivo' : '⏳ Próximo'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-right">
                      <span className="text-white font-medium">{match.home_team?.name}</span>
                      <span className="ml-2 text-xl">{match.home_team?.flag_emoji}</span>
                    </div>
                    <div className="text-center min-w-[60px]">
                      {match.status === 'finished' ? (
                        <span className="text-white font-bold text-lg">{match.home_score} - {match.away_score}</span>
                      ) : (
                        <span className="text-slate-500 text-sm">
                          {new Date(match.match_date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-xl">{match.away_team?.flag_emoji}</span>
                      <span className="ml-2 text-white font-medium">{match.away_team?.name}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-2">
                    {new Date(match.match_date).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    {match.venue && ` · ${match.venue}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
      {(!matches || matches.length === 0) && (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-slate-400">No hay partidos cargados todavía</p>
        </div>
      )}
    </div>
  )
}
