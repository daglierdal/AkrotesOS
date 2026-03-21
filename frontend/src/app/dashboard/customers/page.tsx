'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { SummaryCards } from '@/components/SummaryCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Building2, Phone, Users, TrendingUp, DollarSign, FolderKanban } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  contact: string;
  phone: string;
  projects: number;
  activeProjects: number;
  revenue: number;
}

const mockCustomers: Customer[] = [
  { id: "1", name: "MACFit", contact: "Ahmet Yılmaz", phone: "0532 444 55 66", projects: 5, activeProjects: 3, revenue: 2450000 },
  { id: "2", name: "Yargıcı", contact: "Selin Demir", phone: "0533 222 33 44", projects: 3, activeProjects: 1, revenue: 1180000 },
  { id: "3", name: "Koton", contact: "Murat Kaya", phone: "0535 111 22 33", projects: 2, activeProjects: 1, revenue: 890000 },
  { id: "4", name: "Mavi", contact: "Canan Şahin", phone: "0536 777 88 99", projects: 4, activeProjects: 2, revenue: 1650000 },
  { id: "5", name: "LC Waikiki", contact: "Burak Özdemir", phone: "0537 333 44 55", projects: 6, activeProjects: 4, revenue: 3200000 },
];

export default function CustomersPage() {
  const router = useRouter();
  const [customers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const summaryData = {
    totalCustomers: customers.length,
    totalActiveProjects: customers.reduce((sum, c) => sum + c.activeProjects, 0),
    totalProjects: customers.reduce((sum, c) => sum + c.projects, 0),
    totalRevenue: customers.reduce((sum, c) => sum + c.revenue, 0),
  };

  const summaryCards = [
    {
      label: 'Toplam Müşteri',
      value: summaryData.totalCustomers,
      icon: Users,
      iconColor: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'Aktif Projeler',
      value: summaryData.totalActiveProjects,
      subValue: `Toplam ${summaryData.totalProjects} proje`,
      icon: FolderKanban,
      iconColor: 'bg-green-500/10 text-green-400',
    },
    {
      label: 'Toplam Gelir',
      value: `₺${(summaryData.totalRevenue / 1000000).toFixed(1)}M`,
      subValue: 'Bu yıl',
      icon: DollarSign,
      iconColor: 'bg-[#4F8CFF]/10 text-[#4F8CFF]',
      trend: { value: 12, isPositive: true },
    },
    {
      label: 'Ort. Proje Değeri',
      value: `₺${Math.round(summaryData.totalRevenue / summaryData.totalProjects / 1000)}K`,
      icon: TrendingUp,
      iconColor: 'bg-purple-500/10 text-purple-400',
    },
  ];

  const handleSearch = (query: string) => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(query.toLowerCase()) ||
      customer.contact.toLowerCase().includes(query.toLowerCase()) ||
      customer.phone.includes(query)
    );
    setFilteredCustomers(filtered);
  };

  const handleAddCustomer = () => {
    // TODO: Implement add customer modal/page
    console.log('Add customer clicked');
  };

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
      <TopBar
        title="Müşteriler"
        subtitle="Tüm müşterileri görüntüle ve yönet"
        showSearch={true}
        showFilters={true}
        showAddButton={true}
        addButtonLabel="Yeni Müşteri"
        onAddClick={handleAddCustomer}
        onSearch={handleSearch}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Summary Cards */}
          <SummaryCards cards={summaryCards} columns={4} />

          {/* Customers Table */}
          <Card className="bg-[#111111] border-[#222222]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-white">Müşteri Listesi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-[#222222] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#222222] hover:bg-transparent">
                      <TableHead className="text-[#888888] font-medium">Müşteri</TableHead>
                      <TableHead className="text-[#888888] font-medium">İletişim Kişisi</TableHead>
                      <TableHead className="text-[#888888] font-medium">Telefon</TableHead>
                      <TableHead className="text-[#888888] font-medium text-center">Toplam Proje</TableHead>
                      <TableHead className="text-[#888888] font-medium text-center">Aktif Proje</TableHead>
                      <TableHead className="text-[#888888] font-medium text-right">Gelir</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className="border-[#222222] hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                        onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#4F8CFF]/10 flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-[#4F8CFF]" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{customer.name}</p>
                              <p className="text-xs text-[#888888]">ID: {customer.id}</p>
                            </div>
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
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                            {customer.activeProjects}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-white font-medium">
                            ₺{customer.revenue.toLocaleString('tr-TR')}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCustomers.length === 0 && (
                <div className="text-center py-12 text-[#888888]">
                  <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-medium">Müşteri bulunamadı</p>
                  <p className="text-sm mt-1">Arama kriterlerinizi değiştirin</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
