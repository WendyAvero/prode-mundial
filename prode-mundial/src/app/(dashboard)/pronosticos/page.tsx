import React from 'react'
export const dynamic = 'force-dynamic'

export default function PronosticosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">🎯 Mis Pronósticos</h1>
        <p className="text-slate-400 text-sm mt-1">Cierran 30 minutos antes de cada partido</p>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center py-12">
        <p className="text-4xl mb-3">⚽</p>
        <p className="text-white font-medium mb-2">Los pronósticos estarán disponibles pronto</p>
        <p className="text-slate-400 text-sm">Los partidos empiezan el 11 de junio de 2026</p>
      </div>
    </div>
  )
}
