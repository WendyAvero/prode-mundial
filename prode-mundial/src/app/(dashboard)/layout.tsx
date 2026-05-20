import React from 'react'
import Link from 'next/link'
export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-800 border-b border-slate-700 z-40 flex items-center px-4 gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">🏆</div>
        <span className="font-bold text-white flex-1">Prode Mundial 2026</span>
      </header>
      <aside className="hidden lg:flex flex-col fixed inset-y-0 w-64 bg-slate-800 border-r border-slate-700 z-30">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl">🏆</div>
          <div>
            <p className="font-bold text-white text-sm">Prode Mundial</p>
            <p className="text-xs text-slate-400">FIFA 2026</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white transition-colors text-sm">🏠 Inicio</Link>
          <Link href="/pronosticos" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white transition-colors text-sm">🎯 Pronosticos</Link>
          <Link href="/ranking" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white transition-colors text-sm">📊 Ranking</Link>
          <Link href="/partidos" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white transition-colors text-sm">📅 Partidos</Link>
          <Link href="/historial" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white transition-colors text-sm">📋 Mi Historial</Link>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-yellow-400 hover:bg-slate-700 transition-colors text-sm mt-4">🛡️ Panel Admin</Link>
        </nav>
        <div className="px-3 pb-6 border-t border-slate-700 pt-3">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors text-sm">🚪 Cerrar sesion</Link>
        </div>
      </aside>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-40">
        <div className="flex items-center justify-around py-2">
          <Link href="/dashboard" className="flex flex-col items-center px-3 py-1 text-slate-400 text-xs">🏠<span>Inicio</span></Link>
          <Link href="/pronosticos" className="flex flex-col items-center px-3 py-1 text-slate-400 text-xs">🎯<span>Pronos.</span></Link>
          <Link href="/ranking" className="flex flex-col items-center px-3 py-1 text-slate-400 text-xs">📊<span>Ranking</span></Link>
          <Link href="/partidos" className="flex flex-col items-center px-3 py-1 text-slate-400 text-xs">📅<span>Partidos</span></Link>
          <Link href="/admin" className="flex flex-col items-center px-3 py-1 text-yellow-400 text-xs">🛡️<span>Admin</span></Link>
        </div>
      </nav>
      <main className="lg:pl-64 pt-14 lg:pt-0 pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
