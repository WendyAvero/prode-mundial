'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const links = [
  { href: '/dashboard', label: '🏠 Inicio' },
  { href: '/pronosticos', label: '🎯 Pronósticos' },
  { href: '/ranking', label: '📊 Ranking' },
  { href: '/partidos', label: '📅 Partidos' },
  { href: '/historial', label: '📋 Mi Historial' },
]

export default function Nav({ profile }: { profile: any }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  async function signOut() {
    await supabase.auth.signOut()
    toast.success('¡Hasta luego!')
    router.push('/login')
  }

  const initials = `${profile.nombre?.[0] || ''}${profile.apellido?.[0] || ''}`.toUpperCase()

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-800 border-b border-slate-700 z-40 flex items-center px-4 gap-3">
        <button onClick={() => setOpen(!open)} className="text-slate-400 hover:text-white text-xl">☰</button>
        <span className="font-bold text-white flex-1">🏆 Prode Mundial 2026</span>
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{initials}</div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-40">
        <div className="flex items-center justify-around py-2">
          {links.slice(0, 5).map(({ href, label }) => (
            <Link key={href} href={href} className={`flex flex-col items-center px-2 py-1 rounded-lg text-xs transition-colors ${pathname === href ? 'text-indigo-400' : 'text-slate-400'}`}>
              <span className="text-lg">{label.split(' ')[0]}</span>
              <span>{label.split(' ')[1]}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 w-64 bg-slate-800 border-r border-slate-700 z-30">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl">🏆</div>
          <div>
            <p className="font-bold text-white text-sm">Prode Mundial</p>
            <p className="text-xs text-slate-400">FIFA 2026</p>
          </div>
        </div>
        <div className="px-3 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{initials}</div>
            <div>
              <p className="text-sm font-semibold text-white">{profile.nombre} {profile.apellido}</p>
              <p className="text-xs text-indigo-400">🏆 {profile.puntos_total || 0} pts</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm ${pathname === href ? 'bg-indigo-600/20 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
              {label}
            </Link>
          ))}
          {profile.rol === 'admin' && (
            <Link href="/admin" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm mt-2 ${pathname.startsWith('/admin') ? 'bg-yellow-600/20 text-yellow-400 font-medium' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
              🛡️ Panel Admin
            </Link>
          )}
        </nav>
        <div className="px-3 pb-6 border-t border-slate-700 pt-3">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-colors text-sm">
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="relative w-64 bg-slate-800 flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-5 border-b border-slate-700">
              <span className="font-bold text-white">🏆 Prode Mundial 2026</span>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {links.map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm ${pathname === href ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="px-3 pb-6 border-t border-slate-700 pt-3">
              <button onClick={signOut} className="w-full text-left px-3 py-2.5 text-slate-400 hover:text-red-400 text-sm">🚪 Cerrar sesión</button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
