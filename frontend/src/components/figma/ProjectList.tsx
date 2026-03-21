"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from "lucide-react";

interface Project {
  id: string;
  name: string;
  customer: string;
  stage: string;
  status: string;
  area: number;
  date: string;
  progress: number;
}

const projects: Project[] = [
  { id: "1", name: "MACFit Ankara Çankaya", customer: "MACFit", stage: "Keşif", status: "Devam Ediyor", area: 850, date: "1 Haz 2026", progress: 35 },
  { id: "2", name: "MACFit İstanbul Kadıköy", customer: "MACFit", stage: "İhale", status: "Devam Ediyor", area: 1200, date: "15 Tem 2026", progress: 15 },
  { id: "3", name: "MACFit Bursa Nilüfer", customer: "MACFit", stage: "Keşif", status: "Aktif", area: 950, date: "1 Eyl 2026", progress: 0 },
  { id: "4", name: "Yargıcı Nişantaşı", customer: "Yargıcı", stage: "İhale", status: "Devam Ediyor", area: 320, date: "20 May 2026", progress: 60 },
  { id: "5", name: "Koton Ankara Kızılay", customer: "Koton", stage: "Keşif", status: "Aktif", area: 450, date: "15 Ağu 2026", progress: 0 },
  { id: "6", name: "Yargıcı Bağdat Caddesi", customer: "Yargıcı", stage: "Keşif", status: "Tamamlandı", area: 280, date: "10 Şub 2026", progress: 100 },
  { id: "7", name: "Koton Forum İstanbul", customer: "Koton", stage: "İhale", status: "İptal Edildi", area: 600, date: "-", progress: 0 }
];

const summary = { total: 7, active: 5, completed: 1, cancelled: 1 };

const getStatusColor = (status: string) => {
  switch (status) {
    case "Devam Ediyor": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Aktif": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Tamamlandı": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "İptal Edildi": return "bg-red-500/20 text-red-400 border-red-500/30";
    default: return "bg-[#222222] text-white";
  }
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Keşif": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "İhale": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default: return "bg-[#222222] text-white";
  }
};

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#888888]">Toplam Proje</p>
            <p className="text-2xl font-bold text-white">{summary.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#888888]">Aktif</p>
            <p className="text-2xl font-bold text-green-400">{summary.active}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#888888]">Tamamlandı</p>
            <p className="text-2xl font-bold text-emerald-400">{summary.completed}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#888888]">İptal</p>
            <p className="text-2xl font-bold text-red-400">{summary.cancelled}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#111111] border-[#222222]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-white">Projeler</CardTitle>
            <Button className="bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-black">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Proje
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
              <Input
                placeholder="Proje veya müşteri ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#000000] border-[#222222] text-white placeholder:text-[#888888]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#000000] border border-[#222222] text-white text-sm"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="Devam Ediyor">Devam Ediyor</option>
              <option value="Aktif">Aktif</option>
              <option value="Tamamlandı">Tamamlandı</option>
              <option value="İptal Edildi">İptal Edildi</option>
            </select>
          </div>

          <div className="grid gap-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-lg bg-[#000000] border border-[#222222] hover:border-[#4F8CFF]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-white">{project.name}</h3>
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Badge variant="outline" className={getStageColor(project.stage)}>
                        {project.stage}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#888888] mt-1">{project.customer} • {project.area} m² • {project.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-24 h-1.5 bg-[#222222] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4F8CFF] rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#888888]">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-[#888888]">
              <Filter className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>Sonuç bulunamadı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
