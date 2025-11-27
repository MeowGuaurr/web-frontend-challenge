"use client";

import React from "react";
import Card from "../molecules/Card";
import Text from "../atoms/Text";

//dummy data to consume from api later
const CARDS_DATA = [
  {
    last_digits: "9033",
    holder_name: "Mike Smith",
    expiry_date: "06/22",
    color_class: "bg-green-700",
    type: "debit",
    line: "VISA",
  },
  {
    last_digits: "2847",
    holder_name: "Mike Smith",
    expiry_date: "04/24",
    color_class: "bg-green-800",
    type: "credit",
    line: "MASTER CARD",
  },
  {
    last_digits: "2234",
    holder_name: "Mike Smith",
    expiry_date: "09/24",
    color_class: "bg-green-900",
    type: "credit",
    line: "VISA",
  },
];

const CardSection: React.FC = () => {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between px-6">
        <Text className="text-xl font-bold">Mis tarjetas</Text>
      </div>

      <div className="mt-4 overflow-x-auto px-6">
        <div className="flex gap-4 py-2 w-max">
          {CARDS_DATA.map((c, idx) => (
            <Card
              key={idx}
              last_digits={c.last_digits}
              holder_name={c.holder_name}
              expiry_date={c.expiry_date}
              type={c.type}
              line={c.line}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSection;
