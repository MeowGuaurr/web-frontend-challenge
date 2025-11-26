import React from "react";
import Text from "../atoms/Text";
import CurrencySelector from "../molecules/CurrencySelector";
import Divider from "../atoms/Divider";

const CurrencySection: React.FC = () => {
  return (
    <div className="p-4">
      <Divider />
      <Text className="font-bold">Tasa de cambio</Text>
      <div className="mt-2">
        <CurrencySelector />
      </div>
      <Divider />
    </div>
  );
};

export default CurrencySection;
