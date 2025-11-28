import React from 'react';
import Text from './../atoms/Text';
import Arrow from './../atoms/Arrow';
import ActiveBackground from './../atoms/ActiveBackground';

type NavItemProps = {
  icon?: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ icon, text, isActive, onClick }) => {
  const baseClasses =
    'flex items-center justify-between px-4 py-3 rounded-md cursor-pointer transition-colors';

  const activeClasses = 'bg-selectedItem';
  const inactiveClasses = 'text-black hover:bg-gray-100';

  const iconClasses = isActive ? 'text-selectedItemText' : 'text-black';

  return (
    <div onClick={onClick}>
      <ActiveBackground
        isActive={isActive}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        <div className="flex items-center">
          <div className={`mr-3 flex items-center justify-center w-5 h-5 ${iconClasses}`}>
            {icon}
          </div>
          <Text className={`text-sm ${isActive ? 'text-selectedItemText' : 'text-black'}`}>
            {text}
          </Text>
        </div>
        <Arrow className={isActive ? 'text-selectedItemText' : 'text-gray-400'} />
      </ActiveBackground>
    </div>
  );
};

export default NavItem;
