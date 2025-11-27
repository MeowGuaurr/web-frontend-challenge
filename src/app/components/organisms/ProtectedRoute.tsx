"use client";

import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@/app/context/UserContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
