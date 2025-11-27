import React from "react";

type Props = { title?: string; linkText?: string };

const ViewAllHeader: React.FC<Props> = ({
  title = "Transacciones recientes",
  linkText = "Ver todas",
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
        {linkText}
      </a>
    </div>
  );
};

export default ViewAllHeader;
