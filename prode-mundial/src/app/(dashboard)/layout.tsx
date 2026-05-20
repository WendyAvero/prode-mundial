import React from 'react'
import Link from 'next/link'
export const dynamic = 'force-dynamic'

const LOGO = 'https://jczmqsogwnfrqvcmcvrx.supabase.co/storage/v1/object/public/assets/Logo%20Tekhne%20png.png'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#1D3665] border-b border-[#476697] z-40 flex items-center px-4 gap-3">
        <img src={LOGO} alt="Tekhne" className="h-8 w-auto" />
        <span className="font-bold text-white flex-1">Prode Mundial 2026</span>
      </header>
      <aside className="hidden lg:flex flex-col fixed inset-y-0 w-64 bg-[#1D3665] border-r border-[#476697] z-30">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#476697]">
          <img src={LOGO} alt="Tekhne" className="h-10 w-auto" />
          <div>
            <p className="font-bold text-white text-sm">Prode Mundial</p>
            <p className="text-xs text-[#7697C9]">FIFA 2026</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7697C9] hover:bg-[#476697] hover:text-white transition-colors text-sm">🏠 Inicio</Link>
          <Link href="/pronosticos" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7697C9] hover:bg-[#476697] hover:text-white transition-colors text-sm">🎯 Pronosticos</Link>
          <Link href="/ranking" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7697C9] hover:bg-[#476697] hover:text-white transition-colors text-sm">📊 Ranking</Link>
          <Link href="/partidos" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7697C9] hover:bg-[#476697] hover:text-white transition-colors text-sm">📅 Partidos</Link>
          <Link href="/historial" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7697C9] hover:bg-[#476697] hover:text-white transition-colors text-sm">📋 Mi Historial</Link>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-yellow-400 hover:bg-[#476697] transition-colors text-sm mt-4">🛡️ Panel Admin</Link>
        </nav>
        <div className="px-3 pb-6 border-t border-[#476697] pt-3">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7697C9] hover:text-red-400 hover:bg-[#476697] transition-colors text-sm">🚪 Cerrar sesion</Link>
        </div>
      </aside>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1D3665] border-t border-[#476697] z-40">
        <div className="flex items-center justify-around py-2">
          <Link href="/dashboard" className="flex flex-col items-center px-3 py-1 text-[#7697C9] text-xs">🏠<span>Inicio</span></Link>
          <Link href="/pronosticos" className="flex flex-col items-center px-3 py-1 text-[#7697C9] text-xs">🎯<span>Pronos.</span></Link>
          <Link href="/ranking" className="flex flex-col items-center px-3 py-1 text-[#7697C9] text-xs">📊<span>Ranking</span></Link>
          <Link href="/partidos" className="flex flex-col items-center px-3 py-1 text-[#7697C9] text-xs">📅<span>Partidos</span></Link>
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
