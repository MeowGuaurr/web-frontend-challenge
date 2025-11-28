'use client';

import React, { type ReactNode } from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  ariaLabel?: string;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, ariaLabel, className = '', ...rest }) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`p-2 rounded-full hover:bg-gray-100 grid place-items-center ${className}`}
      type="button"
      {...rest}
    >
      {icon ?? <span className="w-4 h-4 inline-block" />}
    </button>
  );
};

export default IconButton;
