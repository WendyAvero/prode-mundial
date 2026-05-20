'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

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
    <div className="min-h-screen bg-gradient-field flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🏆</div>
          <h1 className="text-2xl font-bold text-white">Prode Mundial 2026</h1>
          <p className="text-slate-400 text-sm mt-1">Demostra que sabes de futbol!</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">Ingresa a tu cuenta</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@empresa.com" required className="input-base" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Contrasena</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="..." required className="input-base" />
            </div>
            {error && <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-400 mt-4">
            No tenes cuenta?{' '}
            <Link href="/registro" className="text-indigo-400 hover:text-indigo-300 font-medium">Registrate</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
