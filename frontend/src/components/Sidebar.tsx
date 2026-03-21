'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  ShoppingCart, 
  Users, 
  Receipt, 
  ClipboardList, 
  Settings 
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projeler', icon: FolderKanban },
  { href: '/dashboard/proposals', label: 'Teklifler', icon: FileText },
  { href: '/dashboard/procurement', label: 'Satınalma', icon: ShoppingCart },
  { href: '/dashboard/subcontractors', label: 'Taşeron', icon: Users },
  { href: '/dashboard/invoicing', label: 'Hakediş', icon: Receipt },
  { href: '/dashboard/reports', label: 'Saha Raporları', icon: ClipboardList },
  { href: '/dashboard/settings', label: 'Ayarlar', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#111111] border-r border-[#222222] flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[#222222]">
        <h1 className="text-xl font-bold text-white">AkrotesOS</h1>
        <p className="text-xs text-[#888888] mt-1">İnşaat & Tasarım</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/30'
                  : 'text-[#888888] hover:bg-[#222222] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#222222]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center">
            <span className="text-[#4F8CFF] font-semibold text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-xs text-[#888888] truncate">admin@akrotes.com.tr</p>
          </div>
        </div>
      </div>
    </div>
  );
}
