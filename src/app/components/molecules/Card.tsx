import React from "react";
import Text from "../atoms/Text";

type CardProps = {
  last_digits: string;
  holder_name: string;
  expiry_date: string;
  type?: string;
  line?: string;
};

const Card: React.FC<CardProps> = ({
  last_digits,
  holder_name,
  expiry_date,
  type,
  line,
}) => {
  return (
    <div
      className={`w-96 h-52 rounded-lg p-4 text-white flex flex-col justify-between ${
        type === "debit"
          ? "bg-linear-to-br from-carddDebitFrom to-cardCDebitTo"
          : "bg-linear-to-br from-cardCreditFrom to-cardCCreditTo"
      } ${line ? "border-2 border-white" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">BANCO LAFISE</div>
      </div>

      <div className="text-2xl font-quicksand">
        <div>**** **** **** {last_digits}</div>
      </div>

      <div className="text-left flex">
        <Text className="block text-lg font-lato mt-1 text-white">
          {holder_name}
        </Text>
        <div className="text-xs ml-6">{expiry_date}</div>
      </div>
    </div>
  );
};

export default Card;
