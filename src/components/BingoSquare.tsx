import React from 'react';
import useBingoStore from '../store/bingoStore';

interface BingoSquareProps {
  id: number;
  action: string;
}

const BingoSquare: React.FC<BingoSquareProps> = ({ id, action }) => {
  const markSquare = useBingoStore((state) => state.markSquare);
  const marked = useBingoStore((state) => state.marked);

  return (
    <div
      className={`bingo-square ${marked[id] ? 'marked' : ''}`}
      onClick={() => markSquare(id)}
    >
      {action}
    </div>
  );
};

export default BingoSquare;
