import { useCallback, useRef } from 'react';

const YOUDAO_TTS = (text) => `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`;

export function useSpeech() {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    isPlayingRef.current = false;
  }, []);

  const speak = useCallback(async (text) => {
    if (!text) return;
    stop();

    // Dividimos por puntuación y filtramos partes vacías
    const parts = text.split(/[，。！？,.?]/g).filter(p => p.trim().length > 0);
    
    if (parts.length === 0) return;

    isPlayingRef.current = true;

    for (const part of parts) {
      if (!isPlayingRef.current) break;

      await new Promise((resolve) => {
        const audio = new Audio(YOUDAO_TTS(part.trim()));
        audioRef.current = audio;

        audio.onended = () => {
          setTimeout(resolve, 200); // Pausa natural
        };

        audio.onerror = resolve;
        
        audio.play().catch(() => resolve());
      });
    }
    
    isPlayingRef.current = false;
  }, [stop]);

  return { speak, stop };
}
