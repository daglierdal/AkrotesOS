"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const tabs = [
  { value: "ozet", label: "Özet" },
  { value: "ekip", label: "Ekip" },
  { value: "boq", label: "BOQ" },
  { value: "teklif", label: "Teklif" },
  { value: "satinalma", label: "Satınalma" },
  { value: "taseron", label: "Taşeron" },
  { value: "hakedis", label: "Hakediş" },
  { value: "dokumanlar", label: "Dokümanlar" },
];

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectId = params.id;
  const [activeTab, setActiveTab] = useState("ozet");

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      <main className="flex-1 overflow-y-auto p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white cursor-pointer">Projeler</Link>
          <ChevronRight className="w-4 h-4 text-zinc-600" />
          <span className="text-white">MACFit Ankara Çankaya</span>
        </div>

        {/* Project Header Card */}
        <div className="bg-[#111111] rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[28px] text-white">MACFit Ankara Çankaya</h1>
                <span className="px-3 py-1 rounded-full text-xs bg-[#4F8CFF] text-white">
                  Devam Ediyor
                </span>
              </div>
              <div className="text-sm text-zinc-400">
                MACFit • Keşif • Ankara/Çankaya • 850 m²
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-zinc-400 mb-1">Bitiş</div>
                <div className="text-white">1 Haziran 2026</div>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#27272a"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#4F8CFF"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.35)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white">35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.value
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "ozet" && (
          <>
            {/* Summary Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div className="bg-[#111111] rounded-lg p-6">
                <div className="text-xs text-zinc-400 mb-2">Teklif Tutarı</div>
                <div className="text-2xl text-white">375.000 ₺</div>
              </div>
              <div className="bg-[#111111] rounded-lg p-6">
                <div className="text-xs text-zinc-400 mb-2">Satınalma</div>
                <div className="text-2xl text-white">185.000 ₺</div>
                <div className="text-xs text-zinc-400 mt-1">%49.3 harcanmış</div>
              </div>
              <div className="bg-[#111111] rounded-lg p-6">
                <div className="text-xs text-zinc-400 mb-2">Taşeron</div>
                <div className="text-2xl text-white">145.000 ₺</div>
                <div className="text-xs text-zinc-400 mt-1">%38.7 harcanmış</div>
              </div>
              <div className="bg-[#111111] rounded-lg p-6">
                <div className="text-xs text-zinc-400 mb-2">Kâr/Zarar</div>
                <div className="text-2xl text-green-500">+33.000 ₺</div>
                <div className="text-xs text-green-500 mt-1">%8.8</div>
              </div>
            </div>

            {/* Module Status & Team */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Module Status */}
              <div className="bg-[#111111] rounded-lg p-6">
                <h3 className="text-white mb-4">Modül Durumları</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-zinc-400">BOQ</span>
                    </div>
                    <span className="text-sm text-white">Tamamlandı</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-zinc-400">Teklif</span>
                    </div>
                    <span className="text-sm text-white">Kabul Edildi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="text-sm text-zinc-400">Satınalma</span>
                    </div>
                    <span className="text-sm text-white">Sipariş Verildi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#4F8CFF]" />
                      <span className="text-sm text-zinc-400">Taşeron</span>
                    </div>
                    <span className="text-sm text-white">İş Başladı</span>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="bg-[#111111] rounded-lg p-6">
                <h3 className="text-white mb-4">Ekip</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-700" />
                    <div>
                      <div className="text-sm text-white">Asiye</div>
                      <div className="text-xs text-zinc-400">Planlama</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-700" />
                    <div>
                      <div className="text-sm text-white">Melike</div>
                      <div className="text-xs text-zinc-400">Satınalma</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-700" />
                    <div>
                      <div className="text-sm text-white">Erhan</div>
                      <div className="text-xs text-zinc-400">Taşeron</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-700" />
                    <div>
                      <div className="text-sm text-white">Buse</div>
                      <div className="text-xs text-zinc-400">Hakediş</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discipline Budget Table */}
            <div className="bg-[#111111] rounded-lg overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h3 className="text-white">Disiplin İcmal Tablosu</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-black">
                    <th className="text-left px-6 py-4 text-sm text-zinc-400">Disiplin</th>
                    <th className="text-left px-6 py-4 text-sm text-zinc-400">Malzeme Toplam</th>
                    <th className="text-left px-6 py-4 text-sm text-zinc-400">İşçilik Toplam</th>
                    <th className="text-left px-6 py-4 text-sm text-zinc-400">Genel Toplam</th>
                    <th className="text-left px-6 py-4 text-sm text-zinc-400">Oran</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800">
                    <td className="px-6 py-4 text-sm text-white">İnşaat</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">120.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">80.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-white">200.000 ₺</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#4F8CFF] rounded-full" style={{ width: "53%" }} />
                        </div>
                        <span className="text-sm text-zinc-300 w-12">%53</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="px-6 py-4 text-sm text-white">Mekanik</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">50.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">30.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-white">80.000 ₺</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#4F8CFF] rounded-full" style={{ width: "21%" }} />
                        </div>
                        <span className="text-sm text-zinc-300 w-12">%21</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="px-6 py-4 text-sm text-white">Elektrik</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">35.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">25.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-white">60.000 ₺</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#4F8CFF] rounded-full" style={{ width: "16%" }} />
                        </div>
                        <span className="text-sm text-zinc-300 w-12">%16</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="px-6 py-4 text-sm text-white">Dekorasyon</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">20.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">15.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-white">35.000 ₺</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#4F8CFF] rounded-full" style={{ width: "9%" }} />
                        </div>
                        <span className="text-sm text-zinc-300 w-12">%9</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-zinc-900">
                    <td className="px-6 py-4 text-sm text-white">TOPLAM</td>
                    <td className="px-6 py-4 text-sm text-white">225.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-white">150.000 ₺</td>
                    <td className="px-6 py-4 text-sm text-white">375.000 ₺</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#4F8CFF] rounded-full" style={{ width: "100%" }} />
                        </div>
                        <span className="text-sm text-white w-12">%100</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab !== "ozet" && (
          <div className="bg-[#111111] rounded-lg p-8 text-center">
            <p className="text-zinc-400">{tabs.find(t => t.value === activeTab)?.label} içeriği yakında...</p>
          </div>
        )}
      </main>
    </div>
  );
}
