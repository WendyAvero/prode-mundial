
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

export default function RegistroPage() {
  const router = useRouter()
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { nombre: form.nombre, apellido: form.apellido } }
    })
    if (error) { setError('Error al crear la cuenta. Intentá de nuevo.'); setLoading(false); return }
    toast.success('¡Cuenta creada! Ya podés ingresar ⚽')
    router.push('/dashboard')
    router.refresh()
  }

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="min-h-screen bg-gradient-field flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🏆</div>
          <h1 className="text-2xl font-bold text-white">Prode Mundial 2026</h1>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">Crear cuenta</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Nombre</label>
                <input type="text" value={form.nombre} onChange={e => update('nombre', e.target.value)} placeholder="Juan" required className="input-base" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Apellido</label>
                <input type="text" value={form.apellido} onChange={e => update('apellido', e.target.value)} placeholder="Pérez" required className="input-base" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="juan@empresa.com" required className="input-base" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Contraseña</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Mínimo 6 caracteres" required minLength={6} className="input-base" />
            </div>
            {error && <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-400 mt-4">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Ingresá</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
