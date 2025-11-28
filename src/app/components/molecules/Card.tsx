import React from 'react';
import Text from '../atoms/Text';

type CardProps = {
  last_digits: string;
  holder_name: string;
  expiry_date: string;
  type?: string;
  line?: string;
};

const Card: React.FC<CardProps> = ({ last_digits, holder_name, expiry_date, type, line }) => {
  return (
    <div
      className={`w-80 h-52 rounded-lg p-4 text-white flex flex-col justify-between shrink-0 ${
        type === 'debit'
          ? 'bg-linear-to-br from-carddDebitFrom to-cardCDebitTo'
          : 'bg-linear-to-br from-cardCreditFrom to-cardCCreditTo'
      } ${line ? 'border-2 border-white' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">BANCO LAFISE</div>
      </div>

      <div className="text-xl font-quicksand ">
        <div>**** **** **** {last_digits}</div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <Text className="text-sm font-lato text-white">{holder_name}</Text>
        <div className="text-xs tracking-wide">{expiry_date}</div>
      </div>
    </div>
  );
};

export default Card;
