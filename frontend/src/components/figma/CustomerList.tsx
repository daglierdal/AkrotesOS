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
import { Search, Plus, Building2, Phone } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  contact: string;
  phone: string;
  projects: number;
  activeProjects: number;
  revenue: number;
}

const customers: Customer[] = [
  { id: "1", name: "MACFit", contact: "Ahmet Yılmaz", phone: "0532 444 55 66", projects: 5, activeProjects: 3, revenue: 2450000 },
  { id: "2", name: "Yargıcı", contact: "Selin Demir", phone: "0533 222 33 44", projects: 3, activeProjects: 1, revenue: 1180000 },
  { id: "3", name: "Koton", contact: "Murat Kaya", phone: "0535 111 22 33", projects: 2, activeProjects: 1, revenue: 890000 }
];

const summary = { totalCustomers: 3, totalActiveProjects: 5, totalRevenue: 4520000 };

export function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#888888]">Toplam Müşteri</p>
            <p className="text-2xl font-bold text-white">{summary.totalCustomers}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#888888]">Aktif Projeler</p>
            <p className="text-2xl font-bold text-green-400">{summary.totalActiveProjects}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#222222]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#888888]">Toplam Gelir</p>
            <p className="text-2xl font-bold text-[#4F8CFF]">₺{summary.totalRevenue.toLocaleString("tr-TR")}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#111111] border-[#222222]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-white">Müşteriler</CardTitle>
            <Button className="bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-black">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Müşteri
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
              <Input
                placeholder="Müşteri veya iletişim kişisi ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#000000] border-[#222222] text-white placeholder:text-[#888888]"
              />
            </div>
          </div>

          <div className="rounded-lg border border-[#222222] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-[#222222] hover:bg-transparent">
                  <TableHead className="text-[#888888]">Müşteri</TableHead>
                  <TableHead className="text-[#888888]">İletişim Kişisi</TableHead>
                  <TableHead className="text-[#888888]">Telefon</TableHead>
                  <TableHead className="text-[#888888] text-center">Toplam Proje</TableHead>
                  <TableHead className="text-[#888888] text-center">Aktif Proje</TableHead>
                  <TableHead className="text-[#888888] text-right">Gelir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="border-[#222222] hover:bg-[#1a1a1a] cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-[#4F8CFF]" />
                        </div>
                        <p className="font-medium text-white">{customer.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-white">{customer.contact}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-[#888888]">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-white">{customer.projects}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {customer.activeProjects}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-white font-medium">
                        ₺{customer.revenue.toLocaleString("tr-TR")}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12 text-[#888888]">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>Müşteri bulunamadı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
