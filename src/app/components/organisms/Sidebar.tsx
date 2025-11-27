import React from "react";
import Image from "next/image";
import Logo from "../molecules/Logo";
import MainSidebarMenu from "./MainSidebarMenu";
import CurrencySection from "./CurrencySection";
import SessionInfo from "../molecules/SessionInfo";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const mobileClasses = isOpen ? "translate-x-0" : "-translate-x-full";
  const ariaHidden = !isOpen;
  const paddingClass = "px-6 py-6";

  return (
    <>
      <aside
        aria-hidden={ariaHidden}
        className={`
          w-72
          bg-white
          h-screen
          border-r border-gray-200
          shadow-sm      
          flex flex-col
          ${paddingClass}     
          ${mobileClasses}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="mb-8 justify-center flex">
          <Image
            src="/assets/logo.png"
            alt="Banco LAFISE"
            width={192}
            height={63}
          />
        </div>

        <MainSidebarMenu />

        <div className="mt-8">
          <CurrencySection />
        </div>

        <div className="flex-1" />

        <div className="mt-4 pt-4 border-t border-gray-100 justify-center flex">
          <SessionInfo />
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => onClose?.()}
        />
      )}
    </>
  );
};

export default Sidebar;
