import React from "react";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center p-4">
      <Icon name="logo" className="w-10 h-10 mr-4" />
      <Text className="text-xl font-bold">Banco LAFISE</Text>
    </div>
  );
};

export default Logo;
