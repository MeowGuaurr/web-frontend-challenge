"use client";

import React from "react";

type SelectProps = {
  options: { value: string; label: string }[];
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({
  options,
  className,
  value,
  onChange,
}) => {
  return (
    <select
      className={`p-2 border rounded border-gray-300 text-sm ${className}`}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
