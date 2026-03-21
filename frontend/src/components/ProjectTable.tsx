"use client";

import Link from "next/link";

const projects = [
  {
    id: 1,
    name: "MACFit Gankaya",
    location: "Ankara/Çankaya",
    amount: "850",
    date: "1 Haz 2026",
    progress: 35,
    status: "Devam Ediyor",
    statusType: "active",
  },
  {
    id: 2,
    name: "MACFit Bursa Nilüfer",
    location: "Bursa/Nilüfer",
    amount: "950",
    date: "1 Eyl 2026",
    progress: 0,
    status: "İstanbul/Kadıköy",
    statusType: "location",
  },
  {
    id: 3,
    name: "MACFit Bursa Nilüfer",
    location: "Bursa/Nilüfer",
    amount: "950",
    date: "1 Eyl 2026",
    progress: 0,
    status: "Aktif",
    statusType: "subtle",
  },
  {
    id: 4,
    name: "Yargıcı Nişantaşı",
    location: "İstanbul/Nişantaşı",
    amount: "320",
    date: "20 May 2026",
    progress: 60,
    status: "Devam Ediyor",
    statusType: "active",
  },
  {
    id: 5,
    name: "Koton Ankara Kızılay",
    location: "Ankara/Kızılay",
    amount: "450",
    date: "15 Ağu 2026",
    progress: 0,
    status: "Aktif",
    statusType: "subtle",
  },
];

export function ProjectTable() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800 bg-black">
            <th className="text-left px-6 py-4 text-sm text-zinc-400">Proje Adı</th>
            <th className="text-left px-6 py-4 text-sm text-zinc-400">Müşteri</th>
            <th className="text-left px-6 py-4 text-sm text-zinc-400">Tip</th>
            <th className="text-left px-6 py-4 text-sm text-zinc-400">m²</th>
            <th className="text-left px-6 py-4 text-sm text-zinc-400">Bitiş Tarihi</th>
            <th className="text-left px-6 py-4 text-sm text-zinc-400">İlerleme</th>
            <th className="text-left px-6 py-4 text-sm text-zinc-400">Durum</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr 
              key={project.id} 
              className="border-b border-zinc-800 hover:bg-zinc-800 cursor-pointer"
            >
              <td className="px-6 py-4">
                <Link href={`/dashboard/projects/${project.id}`} className="text-sm text-white hover:text-[#4F8CFF]">
                  {project.name}
                </Link>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-zinc-400">{project.location}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-zinc-400">MACFit | Keşif</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-white">{project.amount}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-zinc-400">{project.date}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="text-sm text-zinc-400 w-10 text-right">
                    {project.progress}%
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs ${
                    project.statusType === "active"
                      ? "bg-white text-black"
                      : project.statusType === "subtle"
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                  }`}
                >
                  {project.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
