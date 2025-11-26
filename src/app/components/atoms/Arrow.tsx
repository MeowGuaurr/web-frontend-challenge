import React from "react";

type ArrowProps = {
  className?: string;
};

const Arrow: React.FC<ArrowProps> = ({ className }) => {
  return <div className={className}>&gt;</div>;
};

export default Arrow;
