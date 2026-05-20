'use client'
import { useState } from 'react'
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

    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim().toLowerCase(),
      password: form.password,
      options: {
        data: {
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
        }
      }
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
      <div className
