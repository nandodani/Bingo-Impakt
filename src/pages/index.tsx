import type { NextPage } from 'next';
import BingoCard from '../components/BingoCard';
import CustomActions from '../components/CustomActions';
import useBingoStore from '../store/bingoStore';
import Header from '../components/Header';
import MusicPlayer from '../components/MusicPlayer';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const generateCard = useBingoStore((state) => state.generateCard);
  const resetGame = useBingoStore((state) => state.resetGame);

  const titles = ['Bingo do Impakt', 'Parabéns Impakt', 'Feliz Dia Do Pai', "TIRANOOO"]; 
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 1500);
    return () => clearInterval(intervalId); 
  }, [titles.length]);

  const currentTitle = titles[currentTitleIndex];

  return (
    <div className="container">
      <Head>
      <title>{currentTitle}</title> 
      <meta name="description" content="Bingo do Impakt" /> 
      </Head>
      <Header />
      <main className='main'>
        <CustomActions />
        <div className='card-container'>
          <BingoCard />
          <div className='flex justify-center gap-4'>
          <Button variant={'secondary'} onClick={generateCard}>Gerar Cartão</Button> 
          <Button variant='destructive' onClick={resetGame}>Reset</Button> 
          </div>
        </div>
      </main>
      <MusicPlayer/>
    </div>
  );
};

export default Home;
