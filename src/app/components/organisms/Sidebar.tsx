import React from "react";
import Logo from "../molecules/Logo";
import MainSidebarMenu from "./MainSidebarMenu";
import CurrencySection from "./CurrencySection";
import SessionInfo from "../molecules/SessionInfo";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-80 bg-white h-screen flex flex-col shadow-lg">
      <Logo />
      <MainSidebarMenu />
      <div className="mt-15">
        <CurrencySection />
      </div>
      <SessionInfo />
    </aside>
  );
};

export default Sidebar;
