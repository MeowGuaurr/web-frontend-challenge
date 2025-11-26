"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import CardSection from "@/app/components/organisms/CardSection";
import AccountSection from "@/app/components/organisms/AccountSection";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar solo se muestra cuando isSidebarOpen es true */}
      {isSidebarOpen && <Sidebar />}

      {/* Contenedor principal: header arriba, contenido abajo */}
      <div className="flex flex-1 flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <CardSection />
            <AccountSection />
          </div>
        </main>
      </div>
    </div>
  );
}
