"use client";

import React from "react";
import IconButton from "../atoms/IconButton";
import Avatar from "../atoms/Avatar";
import SearchInput from "../molecules/SearchInput";
import user from "../../assets/user.json";

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <header className="flex items-center justify-between h-16 w-full px-6 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <IconButton
          ariaLabel="Abrir/Cerrar menú lateral"
          onClick={onToggleSidebar}
        />
      </div>

      <div className="flex items-center space-x-4">
        <IconButton ariaLabel="Notificaciones" />
        <SearchInput />

        {/* Avatar */}
        <Avatar src={user.profile_photo} alt={user.full_name} size="md" />
      </div>
    </header>
  );
};

export default Header;
