import React from 'react'
export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'

export default async function RankingPage() {
  let ranking: any[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('ranking_view').select('*')
    ranking = data || []
  } catch (e) {}

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">📊 Ranking General</h1>
        <p className="text-slate-400 text-sm mt-1">Actualizado en tiempo real</p>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        {ranking.length > 0 ? (
          <div className="divide-y divide-slate-700">
            {ranking.map((r: any) => (
              <div key={r.user_id} className="flex items-center gap-4 px-5 py-4">
                <span className="text-xl w-8 text-center">{medals[r.rank_position - 1] || `#${r.rank_position}`}</span>
                <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {r.nombre?.[0]}{r.apellido?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{r.nombre} {r.apellido}</p>
                  <p className="text-xs text-slate-500">{r.predictions_count} pronosticos</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-400">{r.total_points}</p>
                  <p className="text-xs text-slate-500">pts</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🏆</p>
            <p className="text-slate-400">Nadie en el ranking todavia</p>
          </div>
        )}
      </div>
    </div>
  )
}
