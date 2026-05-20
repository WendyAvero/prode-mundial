'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

function isPredictionOpen(matchDate: string) {
  return new Date(matchDate).getTime() - Date.now() > 30 * 60 * 1000
}

export default function PronosticosClient({ matches, predictions, userId }: any) {
  const supabase = createClient()
  const [preds, setPreds] = useState<Record<string, { home: string, away: string }>>(() => {
    const map: Record<string, { home: string, away: string }> = {}
    predictions.forEach((p: any) => {
      map[p.match_id] = { home: String(p.predicted_home), away: String(p.predicted_away) }
    })
    return map
  })
  const [saving, setSaving] = useState<string | null>(null)

  async function savePrediction(matchId: string) {
    const pred = preds[matchId]
    if (!pred || pred.home === '' || pred.away === '') { toast.error('Ingresá ambos scores'); return }
    setSaving(matchId)
    const { error } = await supabase.from('predictions').upsert({
      user_id: userId, match_id: matchId,
      predicted_home: parseInt(pred.home), predicted_away: parseInt(pred.away)
    }, { onConflict: 'user_id,match_id' })
    if (error) { toast.error('Error al guardar'); } else { toast.success('¡Pronóstico guardado! ✅') }
    setSaving(null)
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">⚽</p>
        <h2 className="text-xl font-semibold text-white mb-2">No hay partidos disponibles</h2>
        <p className="text-slate-400">Los partidos aparecerán aquí cuando el admin los cargue</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">🎯 Mis Pronósticos</h1>
        <p className="text-slate-400 text-sm mt-1">Cerrán 30 minutos antes de cada partido</p>
      </div>
      <div className="space-y-3">
        {matches.map((match: any) => {
          const open = isPredictionOpen(match.match_date)
          const pred = preds[match.id] || { home: '', away: '' }
          const hasPred = predictions.find((p: any) => p.match_id === match.id)
          return (
            <div key={match.id} className={`bg-slate-800 border rounded-2xl p-4 ${open ? 'border-slate-700' : 'border-slate-700/50 opacity-70'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500">{match.match_day}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${open ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {open ? '🟢 Abierto' : '🔴 Cerrado'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 text-right">
                  <p className="text-white font-semibold">{match.home_team?.name}</p>
                  <p className="text-2xl">{match.home_team?.flag_emoji}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number" min="0" max="20"
                    value={pred.home}
                    onChange={e => setPreds(p => ({ ...p, [match.id]: { ...pred, home: e.target.value } }))}
                    disabled={!open}
                    className="w-12 h-10 text-center bg-slate-700 border border-slate-600 rounded-lg text-white font-bold disabled:opacity-40"
                  />
                  <span className="text-slate-500 font-bold">-</span>
                  <input
                    type="number" min="0" max="20"
                    value={pred.away}
                    onChange={e => setPreds(p => ({ ...p, [match.id]: { ...pred, away: e.target.value } }))}
                    disabled={!open}
                    className="w-12 h-10 text-center bg-slate-700 border border-slate-600 rounded-lg text-white font-bold disabled:opacity-40"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{match.away_team?.name}</p>
                  <p className="text-2xl">{match.away_team?.flag_emoji}</p>
                </div>
              </div>
              {open && (
                <button
                  onClick={() => savePrediction(match.id)}
                  disabled={saving === match.id}
                  className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                >
                  {saving === match.id ? 'Guardando...' : hasPred ? '✏️ Actualizar pronóstico' : '💾 Guardar pronóstico'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
