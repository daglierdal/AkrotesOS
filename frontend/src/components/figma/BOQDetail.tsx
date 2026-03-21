"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sparkles, Save, Plus, Trash2, Calculator } from "lucide-react";

interface BOQItem {
  id: string;
  code: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
}

const mockBOQItems: BOQItem[] = [
  { id: "1", code: "01.01.001", description: "Duvar yıkımı ve temizlik", unit: "m²", quantity: 150, unitPrice: 150, total: 22500, category: "Yıkım" },
  { id: "2", code: "01.02.001", description: "Elektrik tesisatı yenileme", unit: "m", quantity: 200, unitPrice: 450, total: 90000, category: "Elektrik" },
  { id: "3", code: "01.03.001", description: "Alçıpan duvar", unit: "m²", quantity: 120, unitPrice: 850, total: 102000, category: "İnşaat" },
  { id: "4", code: "01.04.001", description: "Laminat parke", unit: "m²", quantity: 200, unitPrice: 1200, total: 240000, category: "Zemin" },
  { id: "5", code: "01.05.001", description: "LED aydınlatma", unit: "adet", quantity: 45, unitPrice: 2500, total: 112500, category: "Aydınlatma" },
];

interface AIRecommendation {
  id: string;
  type: "suggestion" | "warning" | "optimization";
  message: string;
  itemCode?: string;
}

const mockAIRecommendations: AIRecommendation[] = [
  { id: "1", type: "optimization", message: "Elektrik tesisatı birim fiyatı piyasa ortalamasının %15 üzerinde. Alternatif tedarikçi önerisi: ABC Elektrik", itemCode: "01.02.001" },
  { id: "2", type: "suggestion", message: "Laminat parke için toplu alım indirimi uygulanabilir. 200m² için %8 indirim talep edilebilir.", itemCode: "01.04.001" },
  { id: "3", type: "warning", message: "Duvar yıkımı miktarı önceki projelerden %40 düşük. Kontrol edilmesi önerilir.", itemCode: "01.01.001" },
];

export function BOQDetail() {
  const [items, setItems] = useState<BOQItem[]>(mockBOQItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<BOQItem>>({});
  const [aiPanelOpen, setAiPanelOpen] = useState(true);

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  const handleEdit = (item: BOQItem) => {
    setEditingId(item.id);
    setEditValues({ ...item });
  };

  const handleSave = () => {
    if (editingId && editValues) {
      setItems(items.map(item => {
        if (item.id === editingId) {
          const updated = { ...item, ...editValues };
          updated.total = updated.quantity * updated.unitPrice;
          return updated;
        }
        return item;
      }));
      setEditingId(null);
      setEditValues({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getAITypeColor = (type: string) => {
    switch (type) {
      case "optimization": return "bg-[#4F8CFF]/20 text-[#4F8CFF] border-[#4F8CFF]/30";
      case "suggestion": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-[#222222] text-white";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-[#111111] border-[#222222]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-white">Poz Listesi (BOQ)</CardTitle>
              <p className="text-sm text-[#888888] mt-1">Zara İstanbul - Revize 2</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-[#888888]">Toplam Tutar</p>
                <p className="text-2xl font-bold text-[#4F8CFF]">
                  ₺{totalAmount.toLocaleString("tr-TR")}
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
                <TableRow className="border-[#222222] hover:bg-transparent">
                  <TableHead className="text-[#888888] w-24">Kod</TableHead>
                  <TableHead className="text-[#888888]">Açıklama</TableHead>
                  <TableHead className="text-[#888888] w-20">Birim</TableHead>
                  <TableHead className="text-[#888888] w-24 text-right">Miktar</TableHead>
                  <TableHead className="text-[#888888] w-32 text-right">Birim Fiyat</TableHead>
                  <TableHead className="text-[#888888] w-32 text-right">Toplam</TableHead>
                  <TableHead className="text-[#888888] w-20 text-center">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-[#222222] hover:bg-[#1a1a1a]"
                  >
                    <TableCell className="font-mono text-sm text-[#888888]">
                      {item.code}
                    </TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <Input
                          value={editValues.description || ""}
                          onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                          className="bg-[#000000] border-[#222222] text-white h-8"
                        />
                      ) : (
                        <div>
                          <p className="text-white">{item.description}</p>
                          <Badge variant="outline" className="mt-1 text-xs bg-[#222222] text-[#888888] border-[#333333]">
                            {item.category}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-[#888888]">{item.unit}</TableCell>
                    <TableCell className="text-right">
                      {editingId === item.id ? (
                        <Input
                          type="number"
                          value={editValues.quantity || 0}
                          onChange={(e) => setEditValues({ ...editValues, quantity: parseFloat(e.target.value) })}
                          className="bg-[#000000] border-[#222222] text-white h-8 text-right"
                        />
                      ) : (
                        <span className="text-white">{item.quantity}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === item.id ? (
                        <Input
                          type="number"
                          value={editValues.unitPrice || 0}
                          onChange={(e) => setEditValues({ ...editValues, unitPrice: parseFloat(e.target.value) })}
                          className="bg-[#000000] border-[#222222] text-white h-8 text-right"
                        />
                      ) : (
                        <span className="text-white">₺{item.unitPrice.toLocaleString("tr-TR")}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-[#4F8CFF] font-medium">
                        ₺{item.total.toLocaleString("tr-TR")}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {editingId === item.id ? (
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleSave}
                            className="h-7 w-7 text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleCancel}
                            className="h-7 w-7 text-[#888888] hover:text-white hover:bg-[#222222]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(item)}
                            className="h-7 w-7 text-[#4F8CFF] hover:text-[#4F8CFF]/80 hover:bg-[#4F8CFF]/10"
                          >
                            <Calculator className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* AI Panel */}
      <Card className={`bg-[#111111] border-[#222222] transition-all duration-300 ${aiPanelOpen ? '' : 'opacity-75'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#4F8CFF]" />
              <CardTitle className="text-lg text-white">AI Önerileri</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAiPanelOpen(!aiPanelOpen)}
              className="text-[#888888] hover:text-white"
            >
              {aiPanelOpen ? "Kapat" : "Aç"}
            </Button>
          </div>
        </CardHeader>
        {aiPanelOpen && (
          <CardContent>
            <div className="space-y-3">
              {mockAIRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-lg bg-[#000000] border border-[#222222] hover:border-[#4F8CFF]/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className={getAITypeColor(rec.type)}>
                      {rec.type === "optimization" && "Optimizasyon"}
                      {rec.type === "suggestion" && "Öneri"}
                      {rec.type === "warning" && "Uyarı"}
                    </Badge>
                    {rec.itemCode && (
                      <span className="text-xs font-mono text-[#888888]">{rec.itemCode}</span>
                    )}
                  </div>
                  <p className="text-sm text-[#888888] mt-2">{rec.message}</p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#4F8CFF]/50 text-[#4F8CFF] hover:bg-[#4F8CFF]/10"
                    >
                      Uygula
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-[#888888] hover:text-white"
                    >
                      Görmezden Gel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
