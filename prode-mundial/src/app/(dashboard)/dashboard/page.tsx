export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">Bienvenido al Prode Mundial 2026! ⚽</h1>
        <p className="text-slate-400 text-sm mt-1">El torneo empieza pronto</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-indigo-400">0</p>
          <p className="text-xs text-slate-400 mt-1">Mis puntos</p>
        </div>
        <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">#-</p>
          <p className="text-xs text-slate-400 mt-1">Mi posición</p>
        </div>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Partidos proximos</h2>
        <p className="text-slate-500 text-sm text-center py-4">Los partidos apareceran pronto</p>
      </div>
    </div>
  )
}
