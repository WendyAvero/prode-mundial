import React, { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const LOGO = 'https://jczmqsogwnfrqvcmcvrx.supabase.co/storage/v1/object/public/assets/Logo%20Tekhne%20png.png'

export default function RegistroPage() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email.trim().toLowerCase(),
      password: form.password,
      options: { data: { nombre: form.nombre.trim(), apellido: form.apellido.trim() } }
    })
    if (error) {
      setError('Error: ' + error.message)
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
          <p className="text-[#7697C9] text-sm mt-1">Crea tu cuenta y sumate al prode!</p>
        </div>
        <div className="bg-slate-800 border border-[#476697] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Crear cuenta</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#7697C9] mb-1.5">Nombre</label>
                <input type="text" value={form.nombre} onChange={e => update('nombre', e.target.value)} placeholder="Juan" required className="w-full px-4 py-3 rounded-xl border border-[#476697] bg-[#1D3665] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7697C9]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7697C9] mb-1.5">Apellido</label>
                <input type="text" value={form.apellido} onChange={e => update('apellido', e.target.value)} placeholder="Perez" required className="w-full px-4 py-3 rounded-xl border border-[#476697] bg-[#1D3665] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7697C9]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7697C9] mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="tu@tekhne.com.ar" required className="w-full px-4 py-3 rounded-xl border border-[#476697] bg-[#1D3665] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7697C9]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7697C9] mb-1.5">Contrasena</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Minimo 6 caracteres" required className="w-full px-4 py-3 rounded-xl border border-[#476697] bg-[#1D3665] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7697C9]" />
            </div>
            {error && <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all" style={{ background: 'linear-gradient(135deg, #476697 0%, #1D3665 100%)' }}>
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-400 mt-4">
            Ya tenes cuenta?{' '}
            <Link href="/login" className="text-[#7697C9] hover:text-white font-medium">Ingresa</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
