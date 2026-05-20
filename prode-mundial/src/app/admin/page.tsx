export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile || profile.rol !== 'admin') redirect('/dashboard')

  const { data: metrics } = await supabase.from('admin_metrics').select('*').single()
  const { data: users } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
  const { data: matches } = await supabase.from('matches').select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)').order('match_date')
  const { data: rules } = await supabase.from('scoring_rules').select('*').single()

  return (
    <div className="min-h-screen bg-slate-900 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">🛡️ Panel Administrador</h1>
            <p className="text-slate-400 text-sm">Prode Mundial FIFA 2026</p>
          </div>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">← Volver</Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Usuarios', value: metrics?.total_users || 0, icon: '👥' },
            { label: 'Pronósticos', value: metrics?.total_predictions || 0, icon: '🎯' },
            { label: 'Partidos jugados', value: metrics?.matches_finished || 0, icon: '✅' },
            { label: 'Participación', value: `${metrics?.participation_rate || 0}%`, icon: '📊' },
          ].map(m => (
            <div key={m.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center">
              <p className="text-2xl mb-1">{m.icon}</p>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p className="text-xs text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Scoring rules */}
        <AdminRules rules={rules} supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!} supabaseKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!} />

        {/* Matches */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">📅 Partidos — Cargar Resultados</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {matches?.filter((m: any) => m.status !== 'finished').map((match: any) => (
              <MatchResult key={match.id} match={match} />
            ))}
            {(!matches || matches.filter((m: any) => m.status !== 'finished').length === 0) && (
              <p className="text-slate-500 text-sm text-center py-4">No hay partidos pendientes</p>
            )}
          </div>
        </div>

        {/* Users */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">👥 Usuarios</h2>
          <div className="space-y-2">
            {users?.filter((u: any) => u.rol === 'user').map((u: any) => (
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
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminRules({ rules }: any) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <h2 className="font-semibold text-white mb-4">⚙️ Reglas de Puntaje</h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Resultado exacto', value: rules?.exact_result || 3, emoji: '⭐' },
          { label: 'Ganador correcto', value: rules?.correct_winner || 1, emoji: '✅' },
          { label: 'Empate correcto', value: rules?.correct_draw || 1, emoji: '🤝' },
        ].map(r => (
          <div key={r.label} className="bg-slate-700/50 rounded-xl p-4 text-center">
            <p className="text-2xl mb-1">{r.emoji}</p>
            <p className="text-2xl font-bold text-indigo-400">+{r.value}</p>
            <p className="text-xs text-slate-400">{r.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchResult({ match }: { match: any }) {
  return (
    <div className="flex items-center gap-3 bg-slate-700/50 rounded-xl px-4 py-3">
      <div className="flex-1 flex items-center gap-2 text-sm">
        <span>{match.home_team?.flag_emoji}</span>
        <span className="text-white">{match.home_team?.code}</span>
        <span className="text-slate-500">vs</span>
        <span className="text-white">{match.away_team?.code}</span>
        <span>{match.away_team?.flag_emoji}</span>
      </div>
      <span className="text-xs text-slate-400">
        {new Date(match.match_date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
      </span>
      <Link href={`/admin/resultado/${match.id}`} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors">
        Cargar resultado
      </Link>
    </div>
  )
}
