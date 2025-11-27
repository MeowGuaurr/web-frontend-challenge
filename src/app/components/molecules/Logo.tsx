import React from "react";
import Text from "../atoms/Text";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center p-4">
      <div className="w-10 h-10 mr-4 flex items-center justify-center rounded-md bg-green-800 text-white">
        <img src="" alt="" />
      </div>
      <Text className="text-xl font-bold">Banco LAFISE</Text>
    </div>
  );
};

export default Logo;
