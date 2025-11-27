"use client";

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/app/context/UserContext";
import Sidebar from "@/app/components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import DashboardHome from "@/app/dashboard/Home";
import TransfersPage from "@/app/modules/transfers";
import AccountsIndex from "@/app/modules/accounts";
import PaymentsIndex from "@/app/modules/payments";
import TransactionsIndex from "@/app/modules/transactions";
import LoginIndex from "@/app/modules/login";

const ProtectedLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useUser();

  if (!user) return <Navigate to="/login" replace />;

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <Sidebar />}
      <div className="flex flex-1 flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />

        <main
          className={`flex-1 pt-16 p-6 bg-gray-50 overflow-y-auto transition-all duration-200 ${
            isSidebarOpen ? "md:ml-80" : "md:ml-0"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/transfers" element={<TransfersPage />} />
              <Route path="/accounts" element={<AccountsIndex />} />
              <Route path="/payments" element={<PaymentsIndex />} />
              <Route path="/transactions" element={<TransactionsIndex />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <UserProvider>
      <BrowserRouter basename="/dashboard">
        <Routes>
          <Route path="/login" element={<LoginIndex />} />
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
