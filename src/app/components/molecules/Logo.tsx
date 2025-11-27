import React from "react";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import { faBank } from "@fortawesome/free-solid-svg-icons";

const Logo: React.FC = () => {
  return (
    //Dummy logo
    <div className="flex items-center p-4">
      <Icon name={faBank} className="w-10 h-10 mr-4" />
      <Text className="text-xl font-bold">Banco LAFISE</Text>
    </div>
  );
};

export default Logo;
