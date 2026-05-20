export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'

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

        {/* Stats */}
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

        {/* Partid
