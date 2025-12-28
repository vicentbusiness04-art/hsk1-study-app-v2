import { useCallback, useRef, useMemo } from 'react';
import { hsk1Words } from '../data/hsk1Words';

const YOUDAO_TTS = (text) => {
  const clean = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, " ").trim();
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(clean)}&le=zh`;
};

export function useSpeech() {
  const audioRef = useRef(null);
  const isStopped = useRef(false);

  // Crear un Set de palabras HSK1 para búsqueda rápida
  const vocabularySet = useMemo(() => {
    const set = new Set();
    hsk1Words.forEach(w => {
        if (w.hanzi) set.add(w.hanzi);
    });
    set.add("一块儿"); set.add("一点儿"); set.add("哪儿");
    return set;
  }, []);

  const stop = useCallback(() => {
    isStopped.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  // TOKENIZADOR HSK (Maximum Matching Algorithm)
  const tokenize = (text) => {
      const tokens = [];
      let remaining = text.trim();
      
      while (remaining.length > 0) {
          let matched = false;
          // Intentamos encontrar la palabra más larga posible (Max 4 chars)
          for (let len = Math.min(4, remaining.length); len > 0; len--) {
              const sub = remaining.substring(0, len);
              if (vocabularySet.has(sub)) {
                  tokens.push(sub);
                  remaining = remaining.substring(len);
                  matched = true;
                  break;
              }
          }
          if (!matched) {
              const char = remaining[0];
              if (char.trim()) tokens.push(char);
              remaining = remaining.substring(1);
          }
      }
      return tokens;
  };

  // REPRODUCTOR FLUIDO (GAPLESS)
  // Crea todos los audios a la vez para cargar en paralelo y reducir pausas
  const playSequenceGapless = (texts) => {
    return new Promise((resolve) => {
      if (texts.length === 0) {
          resolve();
          return;
      }

      console.log("Pre-cargando secuencia fluida:", texts);

      // 1. Instanciar todos los audios inmediatamente
      // Esto inicia la descarga en paralelo de todos los fragmentos
      const audioQueue = texts.map(t => ({
          text: t,
          audio: new Audio(YOUDAO_TTS(t))
      }));

      let index = 0;

      const playNext = () => {
          if (isStopped.current || index >= audioQueue.length) {
              resolve();
              return;
          }

          const currentItem = audioQueue[index];
          const audio = currentItem.audio;
          
          // Actualizamos la ref global para que el botón Stop funcione
          audioRef.current = audio;
          
          // Preparamos el siguiente paso
          const handleEnd = () => {
              index++;
              playNext(); // Recursión asíncrona (loop)
          };

          audio.onended = handleEnd;
          
          audio.onerror = (e) => {
              console.warn("Fallo segmento en secuencia:", currentItem.text);
              // Si falla uno, saltamos al siguiente inmediatamente
              handleEnd();
          };

          // Reproducir
          const playPromise = audio.play();
          if (playPromise !== undefined) {
              playPromise.catch(err => {
                  console.warn("Bloqueo secuencia:", err);
                  handleEnd();
              });
          }
      };

      // Iniciar la cadena
      playNext();
    });
  };

  const playSegment = (text) => {
    return new Promise((resolve) => {
      if (isStopped.current || !text.trim()) {
        resolve();
        return;
      }

      const audio = new Audio(YOUDAO_TTS(text));
      audioRef.current = audio;

      let isDone = false;
      const finish = () => {
        if (!isDone) {
          isDone = true;
          clearTimeout(safetyTimeout);
          resolve();
        }
      };

      const safetyTimeout = setTimeout(() => {
        // console.warn("Timeout, saltando...", text); // Silenciamos logs ruidosos
        finish();
      }, 4000);

      audio.onended = finish;

      audio.onerror = async () => {
        if (isDone) return;
        isDone = true;
        clearTimeout(safetyTimeout);

        // FALLBACK INTELIGENTE:
        // Si la frase falla, usamos el tokenizador y el reproductor GAPLESS
        if (text.length > 1) {
            console.warn(`Fallback fluido activado para: '${text}'`);
            
            const tokens = tokenize(text);
            // Si el tokenizador no encuentra nada nuevo, forzamos división por caracteres
            const finalTokens = (tokens.length === 1 && tokens[0] === text)
                ? text.split('') 
                : tokens;

            await playSequenceGapless(finalTokens);
            resolve();
        } else {
            resolve();
        }
      };

      audio.play().catch(err => {
          // Si es error de formato/fuente, tratamos como error de carga
          if (err.name === "NotSupportedError" || err.message.includes("supported source")) {
             audio.onerror(err); 
          } else {
             finish();
          }
      });
    });
  };

  const speak = useCallback(async (text) => {
    if (!text) return;
    stop(); 
    isStopped.current = false;
    
    // Limpieza básica
    const cleanText = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, " ");

    // Intentamos frase completa (o bloques grandes separados por espacios)
    const chunks = cleanText.split(/\s+/).filter(c => c.length > 0);
    const finalChunks = chunks.length > 0 ? chunks : [cleanText];

    for (const chunk of finalChunks) {
        if (isStopped.current) break;
        await playSegment(chunk);
    }
  }, [stop]);

  return { speak, stop };
}
