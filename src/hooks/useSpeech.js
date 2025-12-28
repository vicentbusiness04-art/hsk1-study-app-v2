import { useCallback, useRef } from 'react';

// --- CONTROLADOR GLOBAL (Fuera del Hook) ---
// Esto garantiza que todos los botones compartan el mismo estado de audio
const globalAudio = {
  current: null,
  executionId: 0,
};

const TTS_SOURCES = [
  (t) => `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(t)}&le=zh`,
  (t) => `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(t)}&tl=zh-CN&client=tw-ob`
];

export function useSpeech() {
  const stop = useCallback(() => {
    // Detener cualquier audio que esté sonando en cualquier parte de la app
    globalAudio.executionId += 1;
    if (globalAudio.current) {
      globalAudio.current.pause();
      globalAudio.current.src = "";
      globalAudio.current = null;
    }
    // También silenciamos la síntesis nativa por si acaso
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback(async (text) => {
    if (!text) return;

    // 1. Detener todo lo anterior (Globalmente)
    stop();
    const myId = globalAudio.executionId;

    // 2. Limpiar el texto: quitamos puntuación y troceamos por longitud
    // Los servidores suelen fallar con más de 100 caracteres
    const cleanText = text.replace(/[?.!,，。！？]/g, ' ').trim();
    const parts = cleanText.match(/.{1,50}(\s|$)/g) || [cleanText];

    console.log(`[Audio] Iniciando secuencia ${myId} (${parts.length} partes)`);

    for (const part of parts) {
      const segment = part.trim();
      if (!segment) continue;

      // 3. Verificación de interrupción: ¿Alguien ha pulsado otro botón?
      if (myId !== globalAudio.executionId) return;

      await new Promise((resolve) => {
        // Intentamos con Youdao y si falla pasamos a Google
        let sourceIdx = 0;

        const playWithFallback = () => {
          if (sourceIdx >= TTS_SOURCES.length || myId !== globalAudio.executionId) {
            resolve();
            return;
          }

          const audio = new Audio(TTS_SOURCES[sourceIdx](segment));
          globalAudio.current = audio;

          audio.onended = () => {
            globalAudio.current = null;
            setTimeout(resolve, 100); // Pausa mínima entre palabras
          };

          audio.onerror = () => {
            console.warn(`[Audio] Fallo en fuente ${sourceIdx}, reintentando...`);
            sourceIdx++;
            playWithFallback();
          };

          audio.play().catch(() => {
            // Si el navegador bloquea el play (auto-play policy)
            sourceIdx++;
            playWithFallback();
          });
        };

        playWithFallback();
      });
    }
  }, [stop]);

  return { speak, stop };
}
