import React from 'react';
import useBingoStore from '../store/bingoStore';
import BingoSquare from './BingoSquare';

const BingoCard = () => {
  const card = useBingoStore((state) => state.card);

  return (
    <div className="bingo-card">
      {card.map((item) => (
        <BingoSquare key={item.id} id={item.id} action={item.action} />
      ))}
    </div>
  );
};

export default BingoCard;
