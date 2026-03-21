"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Users, ClipboardList, FileText, ShoppingCart, HardHat, Receipt, FileArchive } from "lucide-react";

const navItems = [
  { icon: FolderOpen, label: "Projeler", href: "/dashboard", active: true },
  { icon: Users, label: "Müşteriler", href: "/dashboard/customers", active: true },
  { icon: ClipboardList, label: "Keşif & BOQ", href: null, disabled: true },
  { icon: FileText, label: "Teklif", href: null, disabled: true },
  { icon: ShoppingCart, label: "Satınalma", href: null, disabled: true },
  { icon: HardHat, label: "Taşeron", href: null, disabled: true },
  { icon: Receipt, label: "Taşeron Cari", href: null, disabled: true },
  { icon: FileArchive, label: "Ödemeler", href: null, disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-black border-r border-zinc-800 flex flex-col h-screen">
      <div className="p-6">
        <h1 className="text-xl tracking-tight text-white">AkrotesOS</h1>
      </div>
      
      <nav className="flex-1 px-3">
        {navItems.map((item, index) => {
          const isActive = item.href && pathname === item.href;
          
          if (item.disabled) {
            return (
              <div
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg text-zinc-600 cursor-not-allowed"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={index}
              href={item.href!}
              className={`w-full flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800" />
          <div className="flex-1">
            <div className="text-sm text-white">Erdal Dağlı</div>
            <div className="text-xs text-zinc-500">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
