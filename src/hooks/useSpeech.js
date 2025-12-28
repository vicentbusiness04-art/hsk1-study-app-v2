import { useCallback, useRef } from 'react';

const YOUDAO_TTS = (text) => `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`;

export function useSpeech() {
  const audioRef = useRef(null);
  // Usamos un ID de ejecución para cancelar bucles antiguos
  const executionIdRef = useRef(0);

  const stop = useCallback(() => {
    // Incrementamos el ID para invalidar cualquier bucle 'async' anterior
    executionIdRef.current += 1;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
  }, []);

  const speak = useCallback(async (text) => {
    if (!text) return;
    
    // 1. Detener todo lo anterior e invalidar su bucle
    stop();
    
    // 2. Capturar el ID de esta ejecución
    const currentId = executionIdRef.current;

    // 3. Trocear la frase
    const parts = text.split(/[，。！？,.?]/g).filter(p => p.trim().length > 0);
    
    console.log(`Iniciando secuencia [${currentId}] con ${parts.length} partes.`);

    for (const part of parts) {
      // 4. Verificación Crítica: Si el ID cambió, significa que el usuario
      // pulsó otro botón o el mismo de nuevo. Cancelamos este bucle.
      if (currentId !== executionIdRef.current) {
        console.log(`Secuencia [${currentId}] abortada.`);
        return;
      }

      await new Promise((resolve) => {
        const audio = new Audio(YOUDAO_TTS(part.trim()));
        audioRef.current = audio;

        audio.onended = () => {
          audioRef.current = null;
          // Pausa entre fragmentos para que no suene robótico
          setTimeout(resolve, 300);
        };

        audio.onerror = () => {
          audioRef.current = null;
          resolve();
        };

        audio.play().catch(err => {
          console.warn("Auto-play bloqueado o error de carga:", err);
          resolve();
        });
      });
    }
  }, [stop]);

  return { speak, stop };
}