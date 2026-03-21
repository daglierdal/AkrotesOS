'use client';

import { useState } from 'react';
import { Search, Filter, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAddClick?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
}

export function TopBar({
  title,
  subtitle,
  showSearch = true,
  showFilters = true,
  showAddButton = false,
  addButtonLabel = 'Yeni Ekle',
  onAddClick,
  onSearch,
  onFilter,
}: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="bg-[#111111] border-b border-[#222222] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Title */}
        <div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-sm text-[#888888] mt-0.5">{subtitle}</p>}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
              <Input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-64 pl-10 bg-black border-[#222222] text-white placeholder:text-[#888888] focus:border-[#4F8CFF] focus:ring-[#4F8CFF]/20"
              />
            </div>
          )}

          {/* Filter Button */}
          {showFilters && (
            <Button
              variant="outline"
              size="icon"
              onClick={onFilter}
              className="border-[#222222] bg-black text-[#888888] hover:bg-[#222222] hover:text-white"
            >
              <Filter className="w-4 h-4" />
            </Button>
          )}

          {/* Notifications */}
          <Button
            variant="outline"
            size="icon"
            className="border-[#222222] bg-black text-[#888888] hover:bg-[#222222] hover:text-white relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
              3
            </span>
          </Button>

          {/* Add Button */}
          {showAddButton && (
            <Button
              onClick={onAddClick}
              className="bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-black font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              {addButtonLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
