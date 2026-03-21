'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError((err as Error).message || 'Giriş başarısız')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md">
        <div className="bg-[#111111] border border-zinc-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-8 text-center">
            AkrotesOS
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#4F8CFF]"
                placeholder="admin@akrotes.com.tr"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#4F8CFF]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4F8CFF] hover:bg-[#3A7AE6] text-white font-medium rounded-lg py-2 transition disabled:opacity-50"
            >
              {loading ? 'Yükleniyor...' : 'Giriş Yap'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-zinc-500">
            Demo: admin@akrotes.com.tr / akrotes2026
          </p>
        </div>
      </div>
    </div>
  )
}
