import React from "react";

type ActiveBackgroundProps = {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
};

const ActiveBackground: React.FC<ActiveBackgroundProps> = ({
  children,
  isActive,
  className,
}) => {
  const activeClass = isActive ? "bg-selectedItem" : "";
  return <div className={`${activeClass} ${className}`}>{children}</div>;
};

export default ActiveBackground;
