"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";

interface BOQItem {
  name: string;
  unit: string;
  qty: number;
  material: number;
}

interface BOQGroup {
  seq: string;
  items: BOQItem[];
  expanded?: boolean;
}

const boq: BOQGroup[] = [
  { 
    seq: "01-YIKIM", 
    items: [
      { name: "Duvar yıkım", unit: "m²", qty: 120, material: 85 },
      { name: "Moloz kaldırma", unit: "m³", qty: 45, material: 80 }
    ],
    expanded: true
  },
  { 
    seq: "02-KABA İNŞAAT", 
    items: [
      { name: "Beton döküm", unit: "m³", qty: 12, material: 650 },
      { name: "Tuğla duvar", unit: "m²", qty: 85, material: 210 }
    ],
    expanded: true
  },
  { 
    seq: "03-ALÇIPAN", 
    items: [
      { name: "Tek yüz", unit: "m²", qty: 200, material: 155 },
      { name: "Çift yüz", unit: "m²", qty: 140, material: 195 }
    ],
    expanded: true
  },
  { 
    seq: "04-SIVA VE BOYA", 
    items: [
      { name: "Alçı sıva", unit: "m²", qty: 340, material: 100 },
      { name: "Boya badana", unit: "m²", qty: 680, material: 60 }
    ],
    expanded: true
  }
];

const total = 172550;

export function BOQDetail() {
  const [groups, setGroups] = useState<BOQGroup[]>(boq);

  const toggleGroup = (index: number) => {
    const newGroups = [...groups];
    newGroups[index].expanded = !newGroups[index].expanded;
    setGroups(newGroups);
  };

  const calculateGroupTotal = (items: BOQItem[]) => {
    return items.reduce((sum, item) => sum + (item.qty * item.material), 0);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-[#111111] border-[#222222]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-white">Poz Listesi (BOQ)</CardTitle>
              <p className="text-sm text-[#888888] mt-1">İnşaat Disiplini</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-[#888888]">Toplam Tutar</p>
                <p className="text-2xl font-bold text-[#4F8CFF]">
                  ₺{total.toLocaleString("tr-TR")}
                </p>
              </div>
              <Button className="bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Poz Ekle
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-[#222222] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-[#222222] hover:bg-transparent bg-[#1a1a1a]">
                  <TableHead className="text-[#888888] w-8"></TableHead>
                  <TableHead className="text-[#888888]">Poz No / Açıklama</TableHead>
                  <TableHead className="text-[#888888] w-20 text-center">Birim</TableHead>
                  <TableHead className="text-[#888888] w-24 text-right">Miktar</TableHead>
                  <TableHead className="text-[#888888] w-32 text-right">Birim Fiyat</TableHead>
                  <TableHead className="text-[#888888] w-32 text-right">Toplam</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group, groupIndex) => (
                  <>
                    {/* Group Header */}
                    <TableRow
                      key={group.seq}
                      className="border-[#222222] bg-[#0a0a0a] cursor-pointer hover:bg-[#151515]"
                      onClick={() => toggleGroup(groupIndex)}
                    >
                      <TableCell className="py-3">
                        {group.expanded ? (
                          <ChevronDown className="w-4 h-4 text-[#888888]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#888888]" />
                        )}
                      </TableCell>
                      <TableCell colSpan={4} className="py-3">
                        <span className="font-medium text-[#4F8CFF]">{group.seq}</span>
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <span className="font-medium text-white">
                          ₺{calculateGroupTotal(group.items).toLocaleString("tr-TR")}
                        </span>
                      </TableCell>
                    </TableRow>
                    
                    {/* Group Items */}
                    {group.expanded && group.items.map((item, itemIndex) => (
                      <TableRow
                        key={`${group.seq}-${itemIndex}`}
                        className="border-[#222222] hover:bg-[#1a1a1a]"
                      >
                        <TableCell></TableCell>
                        <TableCell>
                          <p className="text-white pl-4">{item.name}</p>
                        </TableCell>
                        <TableCell className="text-center text-[#888888]">{item.unit}</TableCell>
                        <TableCell className="text-right text-white">{item.qty}</TableCell>
                        <TableCell className="text-right text-[#888888]">
                          ₺{item.material.toLocaleString("tr-TR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-[#4F8CFF]">
                            ₺{(item.qty * item.material).toLocaleString("tr-TR")}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
                
                {/* Total Row */}
                <TableRow className="border-[#222222] bg-[#1a1a1a]">
                  <TableCell colSpan={5} className="text-right py-4">
                    <span className="font-medium text-white">GENEL TOPLAM</span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className="text-xl font-bold text-[#4F8CFF]">
                      ₺{total.toLocaleString("tr-TR")}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
