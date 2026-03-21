"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-black border-b border-zinc-800 px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-white">Projeler</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 w-64"
            />
          </div>
          <button className="p-2 border border-zinc-800 rounded-lg hover:bg-zinc-900 text-white">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <select className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700">
          <option>Tüm Müşteriler</option>
        </select>
        <select className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700">
          <option>Tüm Tipler (Keşif / İhale)</option>
        </select>
        <select className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700">
          <option>Tüm Durumlar</option>
        </select>
      </div>
    </div>
  );
}
