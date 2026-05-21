'use client'
import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ResultadoPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const [match, setMatch] = useState<any>(null)
  const [homeScore, setHomeScore] = useState('')
  const [awayScore, setAwayScore] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('matches')
        .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)')
        .eq('id', params.id)
        .single()
      setMatch(data)
      if (data?.home_score !== null) setHomeScore(String(data.home_score))
      if (data?.away_score !== null) setAwayScore(String(data.away_score))
    }
    load()
  }, [])

  async function saveResult() {
    if (homeScore === '' || awayScore === '') return
    setLoading(true)
    await supabase.from('matches').update({
      home_score: parseInt(homeScore),
      away_score: parseInt(awayScore),
      status: 'finished'
    }).eq('id', params.id)
    setSaved(true)
    setLoading(false)
    setTimeout(() => window.location.href = '/admin', 1500)
  }

  if (!match) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-slate-400">Cargando...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-xl font-bold text-white mb-2 text-center">Cargar Resultado</h1>
        <p className="text-slate-400 text-sm text-center mb-8">{match.match_day}</p>
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 text-center">
            {match.home_team?.flag_emoji?.startsWith('http')
              ? <img src={match.home_team.flag_emoji} alt={match.home_team.name} className="w-12 h-8 object-cover rounded mx-auto mb-2" />
              : <span className="text-4xl">{match.home_team?.flag_emoji}</span>
            }
            <p className="text-white font-semibold text-sm mt-1">{match.home_team?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number" min="0" max="20"
              value={homeScore}
              onChange={e => setHomeScore(e.target.value)}
              className="w-16 h-16 text-center bg-slate-700 border-2 border-[#476697] rounded-xl text-white text-2xl font-bold focus:outline-none focus:border-[#7697C9]"
              placeholder="0"
            />
            <span className="text-slate-400 text-2xl font-bold">-</span>
            <input
              type="number" min="0" max="20"
              value={awayScore}
              onChange={e => setAwayScore(e.target.value)}
              className="w-16 h-16 text-center bg-slate-700 border-2 border-[#476697] rounded-xl text-white text-2xl font-bold focus:outline-none focus:border-[#7697C9]"
              placeholder="0"
            />
          </div>
          <div className="flex-1 text-center">
            {match.away_team?.flag_emoji?.startsWith('http')
              ? <img src={match.away_team.flag_emoji} alt={match.away_team.name} className="w-12 h-8 object-cover rounded mx-auto mb-2" />
              : <span className="text-4xl">{match.away_team?.flag_emoji}</span>
            }
            <p className="text-white font-semibold text-sm mt-1">{match.away_team?.name}</p>
          </div>
        </div>
        <button
          onClick={saveResult}
          disabled={loading || homeScore === '' || awayScore === ''}
          className="w-full py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-50"
          style={{ background: saved ? '#16a34a' : 'linear-gradient(135deg, #476697 0%, #1D3665 100%)' }}
        >
          {loading ? 'Guardando...' : saved ? '✅ Guardado! Volviendo...' : 'Guardar resultado'}
        </button>
        <button
          onClick={() => window.location.href = '/admin'}
          className="w-full py-3 rounded-xl text-slate-400 hover:text-white text-sm mt-2 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
