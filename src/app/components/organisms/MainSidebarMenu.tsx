import React from "react";
import NavItem from "../molecules/NavItem";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Repeat, CreditCard, User } from "lucide-react";

const MainSidebarMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, text: "Tablero", to: "/" },
    {
      icon: <Repeat className="w-5 h-5" />,
      text: "Transferir",
      to: "/transfers",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      text: "Pagar",
      to: "/payments",
    },
    {
      icon: <User className="w-5 h-5" />,
      text: "Transacciones",
      to: "/transactions",
    },
  ];

  return (
    <nav className="mt-4 space-y-1">
      {menuItems.map((item) => {
        const relativePath =
          location.pathname.replace(/^\/dashboard/, "") || "/";
        const isActive = relativePath === item.to;

        return (
          <NavItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            isActive={isActive}
            onClick={() => navigate(item.to)}
          />
        );
      })}
    </nav>
  );
};

export default MainSidebarMenu;
