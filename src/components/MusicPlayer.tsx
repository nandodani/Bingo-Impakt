import React, { useEffect, useRef, useState } from 'react';
import useMusicStore from '../store/musicStore';
import { Music, VolumeX } from 'react-feather';

const MusicPlayer = () => {
  const isPlaying = useMusicStore((state) => state.isPlaying);
  const togglePlay = useMusicStore((state) => state.togglePlay);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.loop = true;

      if (hasInteracted) {
        audioElement.play().catch((error) => {
          console.error("Error playing music:", error);
          togglePlay();
        });
      }

      return () => {
        audioElement.pause();
      };
    }
  }, [hasInteracted, togglePlay]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying && hasInteracted) {
        audioElement.play().catch((error) => console.error("Error playing music:", error));
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying, hasInteracted]);

  const handleUserInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="music-player">
      <audio ref={audioRef} src="/music/happy-birthday.mp3"></audio>
      <button onClick={togglePlay}>
        {isPlaying ? <Music size={32} /> : <VolumeX size={32} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
