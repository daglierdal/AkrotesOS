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
  status: "active" | "completed" | "on-hold" | "cancelled";
  progress: number;
  budget: number;
  startDate: string;
}

const mockProjects: Project[] = [
  { id: "1", name: "Zara İstanbul", customer: "Inditex", status: "active", progress: 75, budget: 2500000, startDate: "2025-01-15" },
  { id: "2", name: "Mango Ankara", customer: "Mango Group", status: "completed", progress: 100, budget: 1800000, startDate: "2024-08-01" },
  { id: "3", name: "H&M İzmir", customer: "H&M Turkey", status: "on-hold", progress: 30, budget: 3200000, startDate: "2025-02-20" },
  { id: "4", name: "LC Waikiki Bursa", customer: "LC Waikiki", status: "active", progress: 45, budget: 1500000, startDate: "2025-03-01" },
];

const statusColors = {
  active: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  "on-hold": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
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
              <option value="active">Aktif</option>
              <option value="completed">Tamamlandı</option>
              <option value="on-hold">Beklemede</option>
              <option value="cancelled">İptal</option>
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
                      <Badge variant="outline" className={statusColors[project.status]}>
                        {project.status === "active" && "Aktif"}
                        {project.status === "completed" && "Tamamlandı"}
                        {project.status === "on-hold" && "Beklemede"}
                        {project.status === "cancelled" && "İptal"}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#888888] mt-1">{project.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">
                      ₺{project.budget.toLocaleString("tr-TR")}
                    </p>
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
