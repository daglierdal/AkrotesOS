"use client";

import { FolderOpen } from "lucide-react";

const cards = [
  { label: "Toplam Proje", count: "7", color: "gray" },
  { label: "Aktif", count: "5", color: "gray" },
  { label: "Tamamlanan", count: "1", color: "gray" },
  { label: "İptal", count: "1", color: "gray" },
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
          <div className="text-3xl mb-1 text-white">{card.count}</div>
          <div className="text-sm text-zinc-400">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
