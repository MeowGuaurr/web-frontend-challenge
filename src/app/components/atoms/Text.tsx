import React from "react";

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

const Text: React.FC<TextProps> = ({ children, className }) => {
  return <span className={`text-gray-700 ${className}`}>{children}</span>;
};

export default Text;
