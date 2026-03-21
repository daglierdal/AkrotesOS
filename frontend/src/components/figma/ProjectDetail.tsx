"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, FileText, DollarSign, Users, CheckCircle } from "lucide-react";

interface ProjectDetailProps {
  projectId?: string;
  onBack?: () => void;
}

const project = {
  name: "MACFit Ankara Çankaya",
  quotationAmount: 375000,
  procurement: { budget: 185000, spent: 185000, percentage: 49.3 },
  subcontractor: { budget: 145000, spent: 145000, percentage: 38.7 },
  profitLoss: { amount: 33000, percentage: 8.8, color: "green" },
  moduleStatus: [
    { name: "BOQ", status: "Tamamlandı" },
    { name: "Teklif", status: "Kabul Edildi" },
    { name: "Satınalma", status: "Sipariş Verildi" },
    { name: "Taşeron", status: "İş Başladı" }
  ],
  team: [
    { name: "Asiye", role: "Planlama" },
    { name: "Melike", role: "Satınalma" },
    { name: "Erhan", role: "Taşeron" },
    { name: "Buse", role: "Hakediş" }
  ],
  disciplineSummary: [
    { name: "İnşaat", amount: 200000 },
    { name: "Mekanik", amount: 80000 },
    { name: "Elektrik", amount: 60000 },
    { name: "Dekorasyon", amount: 35000 }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Tamamlandı":
    case "Kabul Edildi":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Sipariş Verildi":
    case "İş Başladı":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-[#222222] text-white";
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case "Planlama": return "bg-purple-500/20 text-purple-400";
    case "Satınalma": return "bg-orange-500/20 text-orange-400";
    case "Taşeron": return "bg-blue-500/20 text-blue-400";
    case "Hakediş": return "bg-pink-500/20 text-pink-400";
    default: return "bg-[#222222] text-white";
  }
};

export function ProjectDetail({ onBack }: ProjectDetailProps) {
  const totalDiscipline = project.disciplineSummary.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
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
          <h1 className="text-2xl font-bold text-white">{project.name}</h1>
          <p className="text-[#888888]">Proje Detayları</p>
        </div>
        <Button className="bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-black">
          <Edit className="w-4 h-4 mr-2" />
          Düzenle
        </Button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#4F8CFF]" />
              <p className="text-sm text-[#888888]">Teklif Tutarı</p>
            </div>
            <p className="text-2xl font-bold text-white mt-1">
              ₺{project.quotationAmount.toLocaleString("tr-TR")}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-400" />
              <p className="text-sm text-[#888888]">Satınalma</p>
            </div>
            <p className="text-2xl font-bold text-white mt-1">
              ₺{project.procurement.spent.toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-[#888888]">%{project.procurement.percentage}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <p className="text-sm text-[#888888]">Taşeron</p>
            </div>
            <p className="text-2xl font-bold text-white mt-1">
              ₺{project.subcontractor.spent.toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-[#888888]">%{project.subcontractor.percentage}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <p className="text-sm text-[#888888]">Kar/Zarar</p>
            </div>
            <p className="text-2xl font-bold text-green-400 mt-1">
              ₺{project.profitLoss.amount.toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-green-400">%{project.profitLoss.percentage}</p>
          </CardContent>
        </Card>
      </div>

      {/* Module Status */}
      <Card className="bg-[#111111] border-[#222222]">
        <CardHeader>
          <CardTitle className="text-lg text-white">Modül Durumları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {project.moduleStatus.map((module) => (
              <div key={module.name} className="p-4 rounded-lg bg-[#000000] border border-[#222222]">
                <p className="text-sm text-[#888888]">{module.name}</p>
                <Badge variant="outline" className={`mt-2 ${getStatusColor(module.status)}`}>
                  {module.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team & Discipline Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#111111] border-[#222222]">
          <CardHeader>
            <CardTitle className="text-lg text-white">Proje Ekibi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.team.map((member) => (
                <div key={member.name} className="flex items-center gap-3 p-3 rounded-lg bg-[#000000]">
                  <div className="w-10 h-10 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#4F8CFF]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{member.name}</p>
                  </div>
                  <Badge variant="outline" className={getRoleColor(member.role)}>
                    {member.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[#222222]">
          <CardHeader>
            <CardTitle className="text-lg text-white">Disiplin Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.disciplineSummary.map((discipline) => (
                <div key={discipline.name} className="flex items-center justify-between p-3 rounded-lg bg-[#000000]">
                  <p className="text-white">{discipline.name}</p>
                  <p className="font-medium text-[#4F8CFF]">
                    ₺{discipline.amount.toLocaleString("tr-TR")}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#222222] border border-[#333333]">
                <p className="text-white font-medium">Toplam</p>
                <p className="font-bold text-[#4F8CFF]">
                  ₺{totalDiscipline.toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
