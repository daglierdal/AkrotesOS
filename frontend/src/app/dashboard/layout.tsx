'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/projects', label: 'Projeler' },
  { href: '/dashboard/proposals', label: 'Teklifler' },
  { href: '/dashboard/procurement', label: 'Satınalma' },
  { href: '/dashboard/subcontractors', label: 'Taşeron' },
  { href: '/dashboard/invoicing', label: 'Hakediş' },
  { href: '/dashboard/reports', label: 'Saha Raporları' },
  { href: '/dashboard/settings', label: 'Ayarlar' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await api.logout()
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-[#111111] border-r border-[#222222] p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-8">AkrotesOS</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded-lg text-[#888888] hover:bg-[#222222] hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="border-b border-[#222222] bg-[#111111] px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition text-sm"
          >
            Çıkış
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
