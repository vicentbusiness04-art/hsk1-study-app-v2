import { useCallback, useRef } from 'react';

const YOUDAO_TTS = (text) => `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`;

export function useSpeech() {
  const audioRef = useRef(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  }, []);

  const playSequence = async (parts) => {
    for (const part of parts) {
      if (!part.trim()) continue;
      
      await new Promise((resolve) => {
        const audio = new Audio(YOUDAO_TTS(part.trim()));
        audioRef.current = audio;
        
        audio.onended = resolve;
        audio.onerror = resolve;
        
        audio.play().catch(() => resolve());
      });
    }
  };

  const speak = useCallback(async (text) => {
    if (!text) return;
    stop();

    // Dividimos por comas, puntos o interrogaciones para que las peticiones sean cortas
    const parts = text.split(/[，。！？,.?]/g);
    
    if (parts.length > 1) {
      console.log("Reproduciendo secuencia para frase larga...");
      await playSequence(parts);
    } else {
      console.log("Reproduciendo palabra corta:", text);
      const audio = new Audio(YOUDAO_TTS(text));
      audioRef.current = audio;
      audio.play().catch(e => console.error("Error audio:", e));
    }
  }, [stop]);

  return { speak, stop };
}