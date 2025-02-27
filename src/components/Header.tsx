import React from 'react';
import useBingoStore from '../store/bingoStore';

const Header = () => {
  const streamerName = useBingoStore((state) => state.streamerName);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>{streamerName}'s Bingo</h1>
      </div>
    </header>
  );
};

export default Header;
