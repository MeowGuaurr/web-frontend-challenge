"use client";

import React from "react";
import Text from "@/app/components/atoms/Text";
import CardSection from "@/app/components/organisms/CardSection";
import AccountSection from "@/app/components/organisms/AccountSection";
import TransactionTable from "../components/organisms/TransactionTable";

const DashboardHome: React.FC = () => {
  return (
    <div className="p-0">
      <CardSection />
      <AccountSection />
      <div className="flex items-center justify-between px-4 sm:px-6 mt-4">
        <Text className="text-xl font-bold">Transacciones</Text>
      </div>
      <TransactionTable />
    </div>
  );
};

export default DashboardHome;
