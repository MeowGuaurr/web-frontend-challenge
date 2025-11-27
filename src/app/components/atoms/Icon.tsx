import React from "react";

type IconProps = {
  icon?: React.ReactNode;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ icon, className = "" }) => {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: [className, (icon.props as any)?.className || ""]
        .join(" ")
        .trim(),
    } as any);
  }
  return <span className={className}>{icon}</span>;
};

export default Icon;
