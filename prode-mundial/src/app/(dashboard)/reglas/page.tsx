import React from 'react'
export const dynamic = 'force-dynamic'

export default function ReglasPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">📋 Reglas del Prode</h1>
        <p className="text-slate-400 text-sm mt-1">Todo lo que necesitás saber para participar</p>
      </div>

      {/* Sistema de puntos */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">⭐ Sistema de Puntos</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
            <span className="text-2xl">🎯</span>
            <div className="flex-1">
              <p className="text-white font-semibold">Resultado exacto</p>
              <p className="text-slate-400 text-sm">Acertás el marcador exacto del partido</p>
            </div>
            <span className="text-green-400 font-bold text-xl">+3 pts</span>
          </div>
          <div className="flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <p className="text-white font-semibold">Ganador correcto</p>
              <p className="text-slate-400 text-sm">Acertás quién gana pero no el marcador exacto</p>
            </div>
            <span className="text-blue-400 font-bold text-xl">+1 pt</span>
          </div>
          <div className="flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
            <span className="text-2xl">🤝</span>
            <div className="flex-1">
              <p className="text-white font-semibold">Empate correcto</p>
              <p className="text-slate-400 text-sm">Acertás que el partido termina empatado</p>
            </div>
            <span className="text-blue-400 font-bold text-xl">+1 pt</span>
          </div>
          <div className="flex items-center gap-4 bg-slate-700/50 rounded-xl px-4 py-3">
            <span className="text-2xl">❌</span>
            <div className="flex-1">
              <p className="text-white font-semibold">Sin acierto</p>
              <p className="text-slate-400 text-sm">El pronóstico no coincide con el resultado</p>
            </div>
            <span className="text-slate-400 font-bold text-xl">0 pts</span>
          </div>
        </div>
      </div>

      {/* Fechas límite */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">⏰ Fechas Límite</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-white font-semibold">Cierre de pronósticos</p>
              <p className="text-slate-400 text-sm">Los pronósticos cierran <span className="text-yellow-400 font-medium">30 minutos antes</span> del inicio de cada partido. Pasado ese tiempo no podés modificar tu pronóstico.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-700/50 rounded-xl px-4 py-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-white font-semibold">Inicio del torneo</p>
              <p className="text-slate-400 text-sm">El primer partido es el <span className="text-white font-medium">jueves 11 de junio de 2026</span> — México vs Sudáfrica a las 16:00 hs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-700/50 rounded-xl px-4 py-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-white font-semibold">Final del torneo</p>
              <p className="text-slate-400 text-sm">La final se juega el <span className="text-white font-medium">domingo 19 de julio de 2026</span> a las 16:00 hs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consejos */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">💡 Consejos</h2>
        <div className="space-y-2 text-sm text-slate-400">
          <p>⚽ Podés cargar pronósticos para todos los partidos de una vez.</p>
          <p>✏️ Podés editar tus pronósticos hasta 30 minutos antes de cada partido.</p>
          <p>📊 El ranking se actualiza automáticamente después de cada resultado.</p>
          <p>🎯 Vale la pena arriesgar por el resultado exacto — ¡son 3 puntos!</p>
        </div>
      </div>
    </div>
  )
}
