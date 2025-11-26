"use client";

import React from "react";
import IconButton from "../atoms/IconButton";

type SearchInputProps = {
  placeholder?: string;
  className?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Buscar",
  className,
}) => {
  return (
    <div
      className={`flex items-center border rounded-lg px-3 py-1 bg-white ${
        className || ""
      }`}
    >
      <div className="mr-2">
        <IconButton />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none px-2 py-1 w-48 text-sm bg-transparent"
      />
    </div>
  );
};

export default SearchInput;
