"use client";

import React from "react";
import IconButton from "../atoms/IconButton";
import Avatar from "../atoms/Avatar";
import SearchInput from "../molecules/SearchInput";
import { Bell, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/app/context/UserContext";
import fallbackUser from "../../assets/user.json";

type HeaderProps = {
  isSidebarOpen?: boolean;
  onToggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, onToggleSidebar }) => {
  const navigate = useNavigate();
  const { user, setUser, setAccountId } = useUser();

  const handleLogout = () => {
    try {
      setUser(null);
      setAccountId(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("app_user");
        localStorage.removeItem("app_accountId");
      }
    } catch {}
    navigate("/login");
  };

  return (
    <header
      className="
        w-full
        h-16 bg-white border-b border-gray-200
        z-40 flex items-center justify-between
        px-6
      "
    >
      <div className="flex items-center space-x-2">
        <IconButton
          icon={<Menu className="w-6 h-6" />}
          ariaLabel="Toggle Sidebar"
          onClick={onToggleSidebar}
        />
      </div>

      <div className="flex items-center space-x-4">
        <IconButton
          ariaLabel="Notificaciones"
          icon={<Bell className="w-6 h-6" />}
        />
        <IconButton
          ariaLabel="Cerrar sesión"
          onClick={handleLogout}
          icon={<LogOut className="w-6 h-6" />}
        />
        <div className="hidden sm:block">
          <SearchInput />
        </div>
        <Avatar
          src={user?.profile_photo ?? fallbackUser.profile_photo}
          alt={user?.full_name ?? fallbackUser.full_name}
          size="md"
        />
      </div>
    </header>
  );
};

export default Header;
