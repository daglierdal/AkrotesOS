'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SummaryCards } from '@/components/SummaryCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Edit,
  FileText,
  DollarSign,
  Users,
  FolderKanban,
  ShoppingCart,
  Receipt,
  Calendar,
  MapPin,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface ProjectDetail {
  id: string;
  name: string;
  customer: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  stage: string;
  area: number;
  quotationAmount: number;
  procurement: { budget: number; spent: number; percentage: number };
  subcontractor: { budget: number; spent: number; percentage: number };
  profitLoss: { amount: number; percentage: number; isPositive: boolean };
  moduleStatus: { name: string; status: string }[];
  team: { name: string; role: string }[];
  disciplineSummary: { name: string; amount: number }[];
}

const mockProject: ProjectDetail = {
  id: "1",
  name: "MACFit Ankara Çankaya",
  customer: "MACFit",
  location: "Ankara, Çankaya",
  startDate: "2026-01-15",
  endDate: "2026-06-30",
  status: "Devam Ediyor",
  stage: "Uygulama",
  area: 850,
  quotationAmount: 375000,
  procurement: { budget: 185000, spent: 165000, percentage: 89.2 },
  subcontractor: { budget: 145000, spent: 120000, percentage: 82.8 },
  profitLoss: { amount: 33000, percentage: 8.8, isPositive: true },
  moduleStatus: [
    { name: "BOQ", status: "Tamamlandı" },
    { name: "Teklif", status: "Kabul Edildi" },
    { name: "Satınalma", status: "Sipariş Verildi" },
    { name: "Taşeron", status: "İş Başladı" },
  ],
  team: [
    { name: "Asiye", role: "Planlama" },
    { name: "Melike", role: "Satınalma" },
    { name: "Erhan", role: "Taşeron" },
    { name: "Buse", role: "Hakediş" },
  ],
  disciplineSummary: [
    { name: "İnşaat", amount: 200000 },
    { name: "Mekanik", amount: 80000 },
    { name: "Elektrik", amount: 60000 },
    { name: "Dekorasyon", amount: 35000 },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Tamamlandı':
    case 'Kabul Edildi':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'Sipariş Verildi':
    case 'İş Başladı':
    case 'Devam Ediyor':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'Aktif':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'İptal Edildi':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:
      return 'bg-[#222222] text-white';
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Planlama':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'Satınalma':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    case 'Taşeron':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'Hakediş':
      return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
    default:
      return 'bg-[#222222] text-white';
  }
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const [project] = useState<ProjectDetail>(mockProject);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const summaryCards = [
    {
      label: 'Teklif Tutarı',
      value: `₺${project.quotationAmount.toLocaleString('tr-TR')}`,
      icon: DollarSign,
      iconColor: 'bg-[#4F8CFF]/10 text-[#4F8CFF]',
    },
    {
      label: 'Satınalma',
      value: `₺${project.procurement.spent.toLocaleString('tr-TR')}`,
      subValue: `%${project.procurement.percentage} kullanıldı`,
      icon: ShoppingCart,
      iconColor: 'bg-orange-500/10 text-orange-400',
    },
    {
      label: 'Taşeron',
      value: `₺${project.subcontractor.spent.toLocaleString('tr-TR')}`,
      subValue: `%${project.subcontractor.percentage} kullanıldı`,
      icon: Users,
      iconColor: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'Kar/Zarar',
      value: `₺${project.profitLoss.amount.toLocaleString('tr-TR')}`,
      subValue: `%${project.profitLoss.percentage}`,
      icon: project.profitLoss.isPositive ? TrendingUp : TrendingDown,
      iconColor: project.profitLoss.isPositive
        ? 'bg-green-500/10 text-green-400'
        : 'bg-red-500/10 text-red-400',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#4F8CFF] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#888888]">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Yeniden Dene</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Custom Header */}
      <div className="bg-[#111111] border-b border-[#222222] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push('/dashboard/projects')}
              className="border-[#222222] bg-black text-white hover:bg-[#222222]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-[#888888]">{project.customer}</span>
                <span className="text-[#444444]">•</span>
                <div className="flex items-center gap-1 text-sm text-[#888888]">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            <Button className="bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-black">
              <Edit className="w-4 h-4 mr-2" />
              Düzenle
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Summary Cards */}
          <SummaryCards cards={summaryCards} columns={4} />

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-[#111111] border border-[#222222] p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-[#222222] data-[state=active]:text-white text-[#888888]"
              >
                Genel Bakış
              </TabsTrigger>
              <TabsTrigger
                value="boq"
                className="data-[state=active]:bg-[#222222] data-[state=active]:text-white text-[#888888]"
              >
                BOQ
              </TabsTrigger>
              <TabsTrigger
                value="procurement"
                className="data-[state=active]:bg-[#222222] data-[state=active]:text-white text-[#888888]"
              >
                Satınalma
              </TabsTrigger>
              <TabsTrigger
                value="subcontractor"
                className="data-[state=active]:bg-[#222222] data-[state=active]:text-white text-[#888888]"
              >
                Taşeron
              </TabsTrigger>
              <TabsTrigger
                value="invoicing"
                className="data-[state=active]:bg-[#222222] data-[state=active]:text-white text-[#888888]"
              >
                Hakediş
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Module Status */}
              <Card className="bg-[#111111] border-[#222222]">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Modül Durumları</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {project.moduleStatus.map((module) => (
                      <div
                        key={module.name}
                        className="p-4 rounded-lg bg-black border border-[#222222]"
                      >
                        <p className="text-sm text-[#888888]">{module.name}</p>
                        <Badge variant="outline" className={`mt-2 ${getStatusColor(module.status)}`}>
                          {module.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team & Discipline */}
              <div className="grid grid-cols-2 gap-6">
                {/* Team */}
                <Card className="bg-[#111111] border-[#222222]">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#4F8CFF]" />
                      Proje Ekibi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.team.map((member) => (
                        <div
                          key={member.name}
                          className="flex items-center justify-between p-3 rounded-lg bg-black border border-[#222222]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#4F8CFF]/10 flex items-center justify-center">
                              <span className="text-[#4F8CFF] font-semibold">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-white">{member.name}</span>
                          </div>
                          <Badge variant="outline" className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Discipline Summary */}
                <Card className="bg-[#111111] border-[#222222]">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <FolderKanban className="w-5 h-5 text-[#4F8CFF]" />
                      Disiplin Dağılımı
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.disciplineSummary.map((discipline) => (
                        <div
                          key={discipline.name}
                          className="flex items-center justify-between p-3 rounded-lg bg-black border border-[#222222]"
                        >
                          <span className="text-white">{discipline.name}</span>
                          <span className="font-medium text-[#4F8CFF]">
                            ₺{discipline.amount.toLocaleString('tr-TR')}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#222222] border border-[#333333]">
                        <span className="text-white font-medium">Toplam</span>
                        <span className="font-bold text-[#4F8CFF]">
                          ₺
                          {project.disciplineSummary
                            .reduce((sum, d) => sum + d.amount, 0)
                            .toLocaleString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Info */}
              <Card className="bg-[#111111] border-[#222222]">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Proje Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-[#888888] mb-1">Başlangıç Tarihi</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#4F8CFF]" />
                        <span className="text-white">
                          {new Date(project.startDate).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#888888] mb-1">Bitiş Tarihi</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#4F8CFF]" />
                        <span className="text-white">
                          {new Date(project.endDate).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#888888] mb-1">Alan</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#4F8CFF]" />
                        <span className="text-white">{project.area} m²</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#888888] mb-1">Aşama</p>
                      <Badge variant="outline" className={getStatusColor(project.stage)}>
                        {project.stage}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="boq" className="mt-6">
              <Card className="bg-[#111111] border-[#222222]">
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-[#888888] opacity-50" />
                  <p className="text-lg font-medium text-white">BOQ Detayları</p>
                  <p className="text-sm text-[#888888] mt-2">Bu sekme için içerik yakında eklenecek</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="procurement" className="mt-6">
              <Card className="bg-[#111111] border-[#222222]">
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-[#888888] opacity-50" />
                  <p className="text-lg font-medium text-white">Satınalma Detayları</p>
                  <p className="text-sm text-[#888888] mt-2">Bu sekme için içerik yakında eklenecek</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subcontractor" className="mt-6">
              <Card className="bg-[#111111] border-[#222222]">
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-[#888888] opacity-50" />
                  <p className="text-lg font-medium text-white">Taşeron Detayları</p>
                  <p className="text-sm text-[#888888] mt-2">Bu sekme için içerik yakında eklenecek</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoicing" className="mt-6">
              <Card className="bg-[#111111] border-[#222222]">
                <CardContent className="p-12 text-center">
                  <Receipt className="w-12 h-12 mx-auto mb-4 text-[#888888] opacity-50" />
                  <p className="text-lg font-medium text-white">Hakediş Detayları</p>
                  <p className="text-sm text-[#888888] mt-2">Bu sekme için içerik yakında eklenecek</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
