import { useCallback, useRef } from 'react';

// Servidores de audio (MP3 directo)
const TTS_SOURCES = [
  (text) => `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`,
  (text) => `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-CN&client=tw-ob`,
  (text) => `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-CN&client=gtx`,
];

export function useSpeech() {
  const audioRef = useRef(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  }, []);

  const playWithSource = (text, sourceIndex = 0) => {
    return new Promise((resolve) => {
      if (sourceIndex >= TTS_SOURCES.length) {
        console.error("Todos los servidores de audio fallaron.");
        // Último recurso: Voz del sistema (aunque sea silenciosa en algunos PCs)
        try {
          const ut = new SpeechSynthesisUtterance(text);
          ut.lang = 'zh-CN';
          ut.onend = resolve;
          ut.onerror = resolve;
          window.speechSynthesis.speak(ut);
        } catch {
          resolve();
        }
        return;
      }

      const url = TTS_SOURCES[sourceIndex](text);
      const audio = new Audio();
      audio.src = url;
      audioRef.current = audio;

      // Tiempo de espera para frases largas
      const timeout = setTimeout(() => {
        console.warn(`Timeout en servidor ${sourceIndex}, probando siguiente...`);
        audio.src = "";
        resolve(playWithSource(text, sourceIndex + 1));
      }, 4000);

      audio.onplay = () => clearTimeout(timeout);
      
      audio.onended = () => {
        clearTimeout(timeout);
        resolve();
      };

      audio.onerror = () => {
        clearTimeout(timeout);
        console.warn(`Error en servidor ${sourceIndex}, probando siguiente...`);
        resolve(playWithSource(text, sourceIndex + 1));
      };

      audio.play().catch(() => {
        clearTimeout(timeout);
        resolve(playWithSource(text, sourceIndex + 1));
      });
    });
  };

  const speak = useCallback((text) => {
    if (!text) return Promise.resolve();
    stop();

    // Limpiamos el texto de caracteres que pueden romper la URL
    const cleanText = text.replace(/[?.!,，。！？]/g, ' ').trim();
    console.log("Solicitando audio para:", cleanText);

    return playWithSource(cleanText, 0);
  }, [stop]);

  return { speak, stop };
}
