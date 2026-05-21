import React from 'react'
export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'

function TeamFlag({ team }: { team: any }) {
  if (!team) return null
  const isUrl = team.flag_emoji?.startsWith('http')
  return isUrl
    ? <img src={team.flag_emoji} alt={team.name} className="w-6 h-4 object-cover rounded-sm inline-block" />
    : <span>{team.flag_emoji}</span>
}

export default async function AdminPage() {
  let users: any[] = []
  let matches: any[] = []

  try {
    const supabase = await createClient()
    const { data: u } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    const { data: m } = await supabase.from('matches').select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)').order('match_date')
    users = u || []
    matches = m || []
  } catch (e) {}

  const pending = matches.filter(m => m.status !== 'finished')
  const finished = matches.filter(m => m.status === 'finished')

  return (
    <div className="min-h-screen bg-slate-900 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">🛡️ Panel Administrador</h1>
          <p className="text-slate-400 text-sm">Prode Mundial FIFA 2026</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{users.filter(u => u.rol === 'user').length}</p>
            <p className="text-xs text-slate-400">Usuarios</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{matches.length}</p>
            <p className="text-xs text-slate-400">Partidos</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{finished.length}</p>
            <p className="text-xs text-slate-400">Finalizados</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-indigo-400">{pending.length}</p>
            <p className="text-xs text-slate-400">Pendientes</p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">📅 Cargar Resultados</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {pending.map((match: any) => (
              <div key={match.id} className="flex items-center gap-3 bg-slate-700/50 rounded-xl px-4 py-3">
                <div className="flex-1 flex items-center gap-2 text-sm">
                  <TeamFlag team={match.home_team} />
                  <span className="text-white">{match.home_team?.name}</span>
                  <span className="text-slate-500">vs</span>
                  <span className="text-white">{match.away_team?.name}</span>
                  <TeamFlag team={match.away_team} />
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(match.match_date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                </span>
                <a href={`/admin/resultado/${match.id}`} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                  Cargar resultado
                </a>
              </div>
            ))}
            {pending.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-4">No hay partidos pendientes</p>
            )}
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">👥 Usuarios registrados</h2>
          <div className="space-y-2">
            {users.filter(u => u.rol === 'user').map((u: any) => (
              <div key={u.id} className="flex items-center gap-3 bg-slate-700/50 rounded-xl px-4 py-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {u.nombre?.[0]}{u.apellido?.[0]}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{u.nombre} {u.apellido}</p>
                  <p className="text-slate-400 text-xs">{u.email}</p>
                </div>
                <span className="text-indigo-400 font-bold text-sm">{u.puntos_total} pts</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${u.activo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {u.activo ? 'Activo' : 'Bloqueado'}
                </span>
              </div>
            ))}
            {users.filter(u => u.rol === 'user').length === 0 && (
              <p className="text-slate-500 text-sm text-center py-4">No hay usuarios todavia</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
