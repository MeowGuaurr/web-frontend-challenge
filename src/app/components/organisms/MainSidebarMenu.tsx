"use client";

import React, { useState } from "react";
import NavItem from "../molecules/NavItem";

const MainSidebarMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Tablero");

  const menuItems = [
    { iconName: "home", text: "Tablero" },
    { iconName: "user", text: "Transferir" },
    { iconName: "credit-card", text: "Pagar" },
    { iconName: "arrow-right-arrow-left", text: "Transferencias" },
  ];

  const handleItemClick = (text: string) => {
    setActiveItem(text);
  };

  return (
    <nav>
      {menuItems.map((item) => (
        <NavItem
          key={item.text}
          iconName={item.iconName}
          text={item.text}
          isActive={activeItem === item.text}
          onClick={() => handleItemClick(item.text)}
        />
      ))}
    </nav>
  );
};

export default MainSidebarMenu;
