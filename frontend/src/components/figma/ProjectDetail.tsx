"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, FileText, Calendar, DollarSign, Users } from "lucide-react";

interface ProjectDetailProps {
  projectId?: string;
  onBack?: () => void;
}

const mockProject = {
  id: "1",
  name: "Zara İstanbul",
  customer: "Inditex",
  status: "active" as const,
  progress: 75,
  budget: 2500000,
  spent: 1875000,
  startDate: "2025-01-15",
  endDate: "2025-06-30",
  location: "İstanbul, Nişantaşı",
  area: 850,
  manager: "Ahmet Yılmaz",
  description: "Zara mağazası için kapsamlı iç mimari ve inşaat projesi. Modern tasarım anlayışı ile premium perakende deneyimi.",
};

const summaryData = [
  { label: "Toplam Bütçe", value: `₺${mockProject.budget.toLocaleString("tr-TR")}`, icon: DollarSign },
  { label: "Harcanan", value: `₺${mockProject.spent.toLocaleString("tr-TR")}`, icon: DollarSign },
  { label: "Kalan", value: `₺${(mockProject.budget - mockProject.spent).toLocaleString("tr-TR")}`, icon: DollarSign },
  { label: "Alan", value: `${mockProject.area} m²`, icon: FileText },
  { label: "Başlangıç", value: mockProject.startDate, icon: Calendar },
  { label: "Bitiş", value: mockProject.endDate, icon: Calendar },
];

export function ProjectDetail({ onBack }: ProjectDetailProps) {
  const progressPercent = Math.round((mockProject.spent / mockProject.budget) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="border-[#222222] bg-[#111111] text-white hover:bg-[#222222]"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{mockProject.name}</h1>
          <p className="text-[#888888]">{mockProject.customer} • {mockProject.location}</p>
        </div>
        <Button className="bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-black">
          <Edit className="w-4 h-4 mr-2" />
          Düzenle
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {summaryData.slice(0, 3).map((item) => (
          <Card key={item.label} className="bg-[#111111] border-[#222222]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-[#4F8CFF]" />
                <p className="text-sm text-[#888888]">{item.label}</p>
              </div>
              <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[#111111] border-[#222222]">
        <CardHeader>
          <CardTitle className="text-lg text-white">İlerleme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#888888]">Bütçe Kullanımı</span>
            <span className="text-sm font-medium text-white">%{progressPercent}</span>
          </div>
          <div className="w-full h-2 bg-[#222222] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F8CFF] rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-[#888888]">Proje İlerlemesi</span>
            <span className="text-sm font-medium text-white">%{mockProject.progress}</span>
          </div>
          <div className="w-full h-2 bg-[#222222] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${mockProject.progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#111111] border border-[#222222]">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#4F8CFF] data-[state=active]:text-black">
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-[#4F8CFF] data-[state=active]:text-black">
            Ekip
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-[#4F8CFF] data-[state=active]:text-black">
            Dokümanlar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card className="bg-[#111111] border-[#222222]">
            <CardHeader>
              <CardTitle className="text-lg text-white">Proje Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#888888] leading-relaxed">{mockProject.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {summaryData.slice(3).map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#000000]">
                      <item.icon className="w-4 h-4 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#888888]">{item.label}</p>
                      <p className="text-sm font-medium text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card className="bg-[#111111] border-[#222222]">
            <CardHeader>
              <CardTitle className="text-lg text-white">Proje Ekibi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#000000]">
                <div className="w-10 h-10 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#4F8CFF]" />
                </div>
                <div>
                  <p className="font-medium text-white">{mockProject.manager}</p>
                  <p className="text-sm text-[#888888]">Proje Müdürü</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card className="bg-[#111111] border-[#222222]">
            <CardHeader>
              <CardTitle className="text-lg text-white">Dokümanlar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#888888]">Henüz doküman eklenmemiş.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
