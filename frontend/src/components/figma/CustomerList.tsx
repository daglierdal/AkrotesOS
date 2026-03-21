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
import { Search, Plus, Building2, Mail, Phone } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  type: "corporate" | "individual";
  projectCount: number;
  totalBudget: number;
  status: "active" | "inactive";
}

const mockCustomers: Customer[] = [
  { id: "1", name: "Ali Yılmaz", company: "Inditex", email: "ali@inditex.com", phone: "+90 532 123 4567", type: "corporate", projectCount: 3, totalBudget: 7500000, status: "active" },
  { id: "2", name: "Ayşe Kaya", company: "Mango Group", email: "ayse@mango.com", phone: "+90 533 234 5678", type: "corporate", projectCount: 2, totalBudget: 4200000, status: "active" },
  { id: "3", name: "Mehmet Demir", company: "H&M Turkey", email: "mehmet@hm.com", phone: "+90 534 345 6789", type: "corporate", projectCount: 1, totalBudget: 3200000, status: "active" },
  { id: "4", name: "Zeynep Şahin", company: "LC Waikiki", email: "zeynep@lcwaikiki.com", phone: "+90 535 456 7890", type: "corporate", projectCount: 4, totalBudget: 6800000, status: "active" },
  { id: "5", name: "Can Özdemir", company: "Özdemir İnşaat", email: "can@ozdemir.com", phone: "+90 536 567 8901", type: "individual", projectCount: 1, totalBudget: 850000, status: "inactive" },
];

export function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || customer.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
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
                placeholder="Müşteri, şirket veya e-posta ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#000000] border-[#222222] text-white placeholder:text-[#888888]"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#000000] border border-[#222222] text-white text-sm"
            >
              <option value="all">Tümü</option>
              <option value="corporate">Kurumsal</option>
              <option value="individual">Bireysel</option>
            </select>
          </div>

          <div className="rounded-lg border border-[#222222] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-[#222222] hover:bg-transparent">
                  <TableHead className="text-[#888888]">Müşteri</TableHead>
                  <TableHead className="text-[#888888]">İletişim</TableHead>
                  <TableHead className="text-[#888888]">Tip</TableHead>
                  <TableHead className="text-[#888888]">Projeler</TableHead>
                  <TableHead className="text-[#888888] text-right">Toplam Bütçe</TableHead>
                  <TableHead className="text-[#888888] text-center">Durum</TableHead>
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
                        <div>
                          <p className="font-medium text-white">{customer.name}</p>
                          <p className="text-sm text-[#888888]">{customer.company}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-[#888888]">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#888888]">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={customer.type === "corporate"
                          ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                          : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }
                      >
                        {customer.type === "corporate" ? "Kurumsal" : "Bireysel"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-white">{customer.projectCount}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-white font-medium">
                        ₺{customer.totalBudget.toLocaleString("tr-TR")}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={`w-2 h-2 rounded-full mx-auto ${
                        customer.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`} />
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
