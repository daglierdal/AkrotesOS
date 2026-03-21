"use client";

import { Sidebar } from "@/components/Sidebar";
import { Search, Plus } from "lucide-react";

const customers = [
  {
    name: "MACFit",
    contact: "Ahmet Yılmaz",
    phone: "0532 444 55 66",
    projectCount: 5,
    active: 3,
    completed: 1,
    cancelled: 1,
    revenue: "2.450.000",
  },
  {
    name: "Yargıcı",
    contact: "Selin Demir",
    phone: "0533 222 33 44",
    projectCount: 3,
    active: 1,
    completed: 2,
    cancelled: 0,
    revenue: "1.180.000",
  },
  {
    name: "Koton",
    contact: "Murat Kaya",
    phone: "0535 111 22 33",
    projectCount: 2,
    active: 1,
    completed: 0,
    cancelled: 1,
    revenue: "890.000",
  },
];

export default function CustomersPage() {
  const totalCustomers = customers.length;
  const totalActiveProjects = customers.reduce((sum, c) => sum + c.active, 0);
  const totalRevenue = customers.reduce((sum, c) => sum + parseFloat(c.revenue.replace(/\./g, "")), 0);

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl text-white">Müşteriler</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Müşteri ara..."
                  className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#4F8CFF] text-white rounded-lg hover:bg-[#6BA3FF] transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">Yeni Müşteri</span>
              </button>
            </div>
          </div>

          {/* Summary Bar */}
          <div className="bg-[#111111] rounded-lg px-6 py-4 mb-6">
            <div className="flex items-center gap-8 text-sm">
              <span className="text-zinc-400">
                Toplam Müşteri: <span className="text-white ml-1">{totalCustomers}</span>
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">
                Toplam Aktif Proje: <span className="text-white ml-1">{totalActiveProjects}</span>
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">
                Toplam Ciro: <span className="text-white ml-1">{totalRevenue.toLocaleString('tr-TR')} ₺</span>
              </span>
            </div>
          </div>

          {/* Customer Cards Grid */}
          <div className="grid grid-cols-3 gap-6">
            {customers.map((customer, index) => (
              <div
                key={index}
                className="bg-[#111111] rounded-lg p-6 hover:shadow-[0_0_20px_rgba(79,140,255,0.3)] transition-shadow cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl text-white">{customer.name}</h3>
                  <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs">
                    {customer.projectCount} Proje
                  </span>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
                  <span>{customer.contact}</span>
                  <span>•</span>
                  <span>{customer.phone}</span>
                </div>

                {/* Metrics Row */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">Aktif:</span>
                    <span className="text-[#4F8CFF]">{customer.active}</span>
                  </div>
                  <span className="text-zinc-700">|</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">Tamamlanan:</span>
                    <span className="text-green-500">{customer.completed}</span>
                  </div>
                  <span className="text-zinc-700">|</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">İptal:</span>
                    <span className="text-red-500">{customer.cancelled}</span>
                  </div>
                </div>

                {/* Revenue */}
                <div className="pt-4 border-t border-zinc-800">
                  <div className="text-2xl text-[#4F8CFF]">
                    Toplam Ciro: {customer.revenue} ₺
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
