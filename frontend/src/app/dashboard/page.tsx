'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [user] = useState<{ name: string } | null>(null)

  useEffect(() => {
    // API me() çağrısı burada yapılacak
  }, [])

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-2">Hoşgeldiniz</h1>
      <p className="text-[#888888] mb-8">
        {user?.name || 'Yükleniyor...'}
      </p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Projeler', value: '12' },
          { label: 'Teklifler', value: '8' },
          { label: 'Siparişler', value: '24' },
          { label: 'Hakediş', value: '6' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111111] border border-[#222222] rounded-lg p-6"
          >
            <p className="text-[#888888] text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
