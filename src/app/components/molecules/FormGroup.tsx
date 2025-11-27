"use client";

import React from "react";
import Text from "../atoms/Text";

const FormGroup: React.FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, hint, children }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {hint && <span className="text-xs text-gray-400 ml-2">{hint}</span>}
      </label>
      <div>{children}</div>
    </div>
  );
};

export default FormGroup;
