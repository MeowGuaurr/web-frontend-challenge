"use client";

import React from "react";
import CardSection from "@/app/components/organisms/CardSection";
import AccountSection from "@/app/components/organisms/AccountSection";

const DashboardHome: React.FC = () => {
  return (
    <div className="p-6">
      <CardSection />
      <AccountSection />
    </div>
  );
};

export default DashboardHome;
