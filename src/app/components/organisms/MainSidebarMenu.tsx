"use client";

import React, { useState } from "react";
import NavItem from "../molecules/NavItem";
import {
  faGauge,
  faRightLeft,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const MainSidebarMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Tablero");

  const menuItems = [
    { icon: faGauge, text: "Tablero" },
    { icon: faRightLeft, text: "Transferir" },
    { icon: faMoneyBill, text: "Pagar" },
    { icon: faUser, text: "Transferencias" },
  ];

  return (
    <nav>
      {menuItems.map((item) => (
        <NavItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          isActive={activeItem === item.text}
          onClick={() => setActiveItem(item.text)}
        />
      ))}
    </nav>
  );
};

export default MainSidebarMenu;
