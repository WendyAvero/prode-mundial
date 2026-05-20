'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const LOGO = 'https://jczmqsogwnfrqvcmcvrx.supabase.co/storage/v1/object/public/assets/Logo%20Tekhne%20png.png'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email o contrasena incorrectos')
      setLoading(false)
      return
    }
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1D3665 0%, #0d1f3c 100%)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={LOGO} alt="Tekhne" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Prode Mundial 2026</h1>
          <p className="text-[#7697C9] text-sm mt-1">Demostra que sabes de futbol!</p>
        </div>
        <div className="bg-slate-800 border border-[#476697] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Ingresa a tu cuenta</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#7697C9] mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@tekhne.com.ar" required className="w-full px-4 py-3 rounded-xl border border-[#476697] bg-[#1D3665] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7697C9]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7697C9] mb-1.5">Contrasena</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full px-4 py-3 rounded-xl border border-[#476697] bg-[#1D3665] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7697C9]" />
            </div>
            {error && <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
            <div className="text-right">
              <Link href="/recuperar" className="text-sm text-[#7697C9] hover:text-white">Olvidaste tu contrasena?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all" style={{ background: 'linear-gradient(135deg, #476697 0%, #1D3665 100%)' }}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-400 mt-4">
            No tenes cuenta?{' '}
            <Link href="/registro" className="text-[#7697C9] hover:text-white font-medium">Registrate</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
