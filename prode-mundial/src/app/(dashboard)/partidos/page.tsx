import React from 'react'
export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'

function TeamFlag({ team }: { team: any }) {
  if (!team) return null
  const isUrl = team.flag_emoji?.startsWith('http')
  return isUrl
    ? <img src={team.flag_emoji} alt={team.name} className="w-8 h-5 object-cover rounded-sm inline-block" />
    : <span className="text-xl">{team.flag_emoji}</span>
}

export default async function PartidosPage() {
  let matches: any[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('matches')
      .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*), phase:phases(*)')
      .order('match_date')
    matches = data || []
  } catch (e) {}

  const groups = matches.reduce((acc: any, match: any) => {
    const key = match.match_day
    if (!acc[key]) acc[key] = []
    acc[key].push(match)
    return acc
  }, {})

  const tz = 'America/Argentina/Buenos_Aires'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">📅 Todos los Partidos</h1>
        <p className="text-slate-400 text-sm mt-1">Horarios en Argentina (GMT-3)</p>
      </div>
      {Object.keys(groups).length > 0 ? (
        Object.entries(groups).map(([day, dayMatches]: any) => (
          <div key={day}>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{day}</h2>
            <div className="space-y-2">
              {dayMatches.map((match: any) => (
                <div key={match.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-right flex items-center justify-end gap-2">
                      <span className="text-white font-medium text-sm">{match.home_team?.name}</span>
                      <TeamFlag team={match.home_team} />
                    </div>
                    <div className="text-center min-w-[80px]">
                      {match.status === 'finished' ? (
                        <span className="text-white font-bold">{match.home_score} - {match.away_score}</span>
                      ) : (
                        <span className="text-slate-500 text-sm font-medium">
                          {new Date(match.match_date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', timeZone: tz })} hs
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <TeamFlag team={match.away_team} />
                      <span className="text-white font-medium text-sm">{match.away_team?.name}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-2">
                    {new Date(match.match_date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: tz })}
                    {match.venue && ` · ${match.venue}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-slate-400">No hay partidos cargados</p>
        </div>
      )}
    </div>
  )
}
