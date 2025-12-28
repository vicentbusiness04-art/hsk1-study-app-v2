import { useCallback, useRef } from 'react';

// Youdao es el motor más fiable para Chino y raramente bloquea peticiones
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
    if (!text) return Promise.resolve();
    stop();

    return new Promise((resolve) => {
      // Usamos el API de Youdao que devuelve un MP3 directo
      const url = YOUDAO_TTS(text);
      console.log("Intentando Youdao para:", text);
      
      const audio = new Audio();
      audio.src = url;
      audioRef.current = audio;

      audio.oncanplaythrough = () => {
        audio.play().catch(err => {
          console.warn("Error al reproducir:", err);
          resolve();
        });
      };

      audio.onended = () => {
        resolve();
      };

      audio.onerror = (e) => {
        console.error("Error crítico en Youdao:", e);
        // Si Youdao falla, como último recurso intentamos la voz del sistema 
        // pero solo como un intento desesperado
        try {
          const ut = new SpeechSynthesisUtterance(text);
          ut.lang = 'zh-CN';
          ut.onend = resolve;
          ut.onerror = resolve;
          window.speechSynthesis.speak(ut);
        } catch {
          resolve();
        }
      };

      // Forzamos carga
      audio.load();
    });
  }, [stop]);

  return { speak, stop };
}
