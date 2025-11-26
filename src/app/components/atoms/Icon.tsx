import React from "react";

type IconProps = {
  name: string;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  // This would typically use a library like react-icons or custom SVGs
  return <div className={`w-6 h-6 bg-gray-300 ${className}`}>{name}</div>;
};

export default Icon;
