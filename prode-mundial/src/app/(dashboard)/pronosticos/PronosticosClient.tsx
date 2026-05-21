'use client'
import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

function isPredictionOpen(matchDate: string) {
  return new Date(matchDate).getTime() - Date.now() > 30 * 60 * 1000
}

export default function PronosticosClient({ matches }: { matches: any[] }) {
  const supabase = createClient()
  const [preds, setPreds] = useState<Record<string, { home: string, away: string }>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [userId, setUserId] = useState('')
  const [existingPreds, setExistingPreds] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase.from('predictions').select('*').eq('user_id', user.id)
      if (data) {
        setExistingPreds(data)
        const map: Record<string, { home: string, away: string }> = {}
        data.forEach((p: any) => {
          map[p.match_id] = { home: String(p.predicted_home), away: String(p.predicted_away) }
        })
        setPreds(map)
      }
    }
    load()
  }, [])

  async function savePrediction(matchId: string) {
    const pred = preds[matchId]
    if (!pred || pred.home === '' || pred.away === '') return
    setSaving(matchId)
    await supabase.from('predictions').upsert({
      user_id: userId,
      match_id: matchId,
      predicted_home: parseInt(pred.home),
      predicted_away: parseInt(pred.away)
    }, { onConflict: 'user_id,match_id' })
    setSaving(null)
    setSaved(matchId)
    setTimeout(() => setSaved(null), 2000)
  }

  if (matches.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">🎯 Mis Pronósticos</h1>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">⚽</p>
          <p className="text-white font-medium mb-2">No hay partidos disponibles</p>
          <p className="text-slate-400 text-sm">Los partidos aparecerán pronto</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">🎯 Mis Pronósticos</h1>
        <p className="text-slate-400 text-sm mt-1">Cierran 30 minutos antes de cada partido</p>
      </div>
      <div className="space-y-3">
        {matches.map((match: any) => {
          const open = isPredictionOpen(match.match_date)
          const pred = preds[match.id] || { home: '', away: '' }
          const hasPred = existingPreds.find((p: any) => p.match_id === match.id)
          const isSaved = saved === match.id
          return (
            <div key={match.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500">{match.match_day}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${open ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {open ? '🟢 Abierto' : '🔴 Cerrado'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 text-right">
                  <p className="text-white font-semibold text-sm">{match.home_team?.name}</p>
                  <p className="text-2xl">{match.home_team?.flag_emoji}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number" min="0" max="20"
                    value={pred.home}
                    onChange={e => setPreds(p => ({ ...p, [match.id]: { ...pred, home: e.target.value } }))}
                    disabled={!open}
                    className="w-12 h-10 text-center bg-slate-700 border border-slate-600 rounded-lg text-white font-bold disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#7697C9]"
                  />
                  <span className="text-slate-500 font-bold">-</span>
                  <input
                    type="number" min="0" max="20"
                    value={pred.away}
                    onChange={e => setPreds(p => ({ ...p, [match.id]: { ...pred, away: e.target.value } }))}
                    disabled={!open}
                    className="w-12 h-10 text-center bg-slate-700 border border-slate-600 rounded-lg text-white font-bold disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#7697C9]"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{match.away_team?.name}</p>
                  <p className="text-2xl">{match.away_team?.flag_emoji}</p>
                </div>
              </div>
              {open && (
                <button
                  onClick={() => savePrediction(match.id)}
                  disabled={saving === match.id || pred.home === '' || pred.away === ''}
                  className="mt-3 w-full py-2 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                  style={{ background: isSaved ? '#16a34a' : 'linear-gradient(135deg, #476697 0%, #1D3665 100%)' }}
                >
                  {saving === match.id ? 'Guardando...' : isSaved ? '✅ Guardado!' : hasPred ? '✏️ Act
