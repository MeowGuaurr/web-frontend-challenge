import React from 'react';
import Text from '../atoms/Text';

type CardProps = {
  last_digits: string;
  holder_name: string;
  expiry_date: string;
  color_class?: string; // e.g. 'bg-green-700'
};

const Card: React.FC<CardProps> = ({ last_digits, holder_name, expiry_date, color_class = 'bg-green-700' }) => {
  return (
    <div className={`w-72 h-44 rounded-xl p-4 text-white flex flex-col justify-between ${color_class}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">BANCO LAFISE</div>
        <div className="text-xs opacity-90">VISA</div>
      </div>

      <div className="text-right">
        <Text className="text-sm opacity-75">CARD HOLDER</Text>
        <Text className="block text-lg font-semibold mt-1">{holder_name}</Text>
      </div>

      <div className="flex items-center justify-between text-sm opacity-90">
        <div>•••• •••• •••• {last_digits}</div>
        <div className="text-xs">{expiry_date}</div>
      </div>
    </div>
  );
};

export default Card;
