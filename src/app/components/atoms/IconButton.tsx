"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

type IconButtonProps = {
  icon?: IconDefinition;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  ariaLabel,
  className = "",
}) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-gray-100 grid place-items-center ${className}`}
      type="button"
    >
      {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4" />}
    </button>
  );
};

export default IconButton;
