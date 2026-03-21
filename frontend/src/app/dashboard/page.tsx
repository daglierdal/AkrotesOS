"use client";

import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { SummaryCards } from "@/components/SummaryCards";
import { ProjectTable } from "@/components/ProjectTable";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8">
          <SummaryCards />
          <ProjectTable />
        </main>
      </div>
    </div>
  );
}
