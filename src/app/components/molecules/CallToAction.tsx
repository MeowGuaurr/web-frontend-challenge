"use client";

import React from "react";

const CallToAction: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
  }
> = ({ variant = "primary", children, ...rest }) => {
  const base = "px-4 py-2 rounded-md font-medium";
  if (variant === "primary") {
    return (
      <button
        {...rest}
        className={`${base} bg-green-600 text-white hover:bg-green-700`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      {...rest}
      className={`${base} border border-gray-300 text-gray-700 bg-white hover:bg-gray-50`}
    >
      {children}
    </button>
  );
};

export default CallToAction;
