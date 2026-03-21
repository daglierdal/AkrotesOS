'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface SummaryCard {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface SummaryCardsProps {
  cards: SummaryCard[];
  columns?: 2 | 3 | 4;
}

export function SummaryCards({ cards, columns = 4 }: SummaryCardsProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className="bg-[#111111] border-[#222222] hover:border-[#333333] transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-[#888888] mb-1">{card.label}</p>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                  {card.subValue && (
                    <p className="text-xs text-[#888888] mt-1">{card.subValue}</p>
                  )}
                  {card.trend && (
                    <div className="flex items-center gap-1 mt-2">
                      <span
                        className={`text-xs font-medium ${
                          card.trend.isPositive ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {card.trend.isPositive ? '+' : '-'}{card.trend.value}%
                      </span>
                      <span className="text-xs text-[#888888]">vs geçen ay</span>
                    </div>
                  )}
                </div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    card.iconColor || 'bg-[#4F8CFF]/10'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      card.iconColor ? '' : 'text-[#4F8CFF]'
                    }`}
                    style={card.iconColor ? { color: card.iconColor } : undefined}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
