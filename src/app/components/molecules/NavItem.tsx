import React from "react";
import Icon from "./../atoms/Icon";
import Text from "./../atoms/Text";
import Arrow from "./../atoms/Arrow";
import ActiveBackground from "./../atoms/ActiveBackground";

type NavItemProps = {
  iconName: string;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({
  iconName,
  text,
  isActive,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <ActiveBackground
        isActive={isActive}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100/20"
      >
        <div className="flex items-center">
          <Icon name={iconName} className="mr-4" />
          <Text>{text}</Text>
        </div>
        <Arrow />
      </ActiveBackground>
    </div>
  );
};

export default NavItem;
