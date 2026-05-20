
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await supabase.auth.resetPasswordForEmail(email)
    setSent(true)
    toast.success('Te enviamos un email para recuperar tu contraseña')
  }

  return (
    <div className="min-h-screen bg-gradient-field flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🔐</div>
          <h1 className="text-2xl font-bold text-white">Recuperar contraseña</h1>
        </div>
        <div className="card">
          {sent ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-3">📧</p>
              <p className="text-white font-medium mb-2">¡Email enviado!</p>
              <p className="text-slate-400 text-sm mb-4">Revisá tu bandeja de entrada</p>
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 text-sm">Volver al login</Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <p className="text-slate-400 text-sm mb-4">Te enviamos un link para recuperar tu contraseña.</p>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@empresa.com" required className="input-base" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Enviando...' : 'Enviar link'}
              </button>
              <p className="text-center">
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 text-sm">Volver al login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
