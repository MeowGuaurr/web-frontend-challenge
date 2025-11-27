"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
};

const FormInput: React.FC<Props> = ({ id, className = "", ...rest }) => {
  return (
    <input
      id={id}
      {...rest}
      className={`w-full p-2 border border-gray-200 rounded ${className}`}
    />
  );
};

export default FormInput;
