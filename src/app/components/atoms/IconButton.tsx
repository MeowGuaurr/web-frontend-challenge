"use client";

import React from 'react';

type IconButtonProps = {
  icon?: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, ariaLabel, className }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-gray-100 grid place-items-center ${className || ''}`}
    >
      {icon ?? <span className="w-6 h-6 bg-gray-300 inline-block rounded" />}
    </button>
  );
};

export default IconButton;
