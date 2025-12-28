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

  const speak = useCallback((text) => {
    if (!text) return;
    stop();

    // Limpiamos un poco el texto para que la URL sea válida
    const cleanText = text.trim();
    console.log("Reproduciendo con Youdao:", cleanText);

    const audio = new Audio(YOUDAO_TTS(cleanText));
    audioRef.current = audio;

    audio.play().catch(err => {
      console.error("Error al reproducir audio:", err);
    });
  }, [stop]);

  return { speak, stop };
}
