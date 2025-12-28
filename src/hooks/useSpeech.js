import { useCallback, useRef, useMemo } from 'react';
import { hsk1Words } from '../data/hsk1Words';

const YOUDAO_TTS = (text) => {
  const clean = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, " ").trim();
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(clean)}&le=zh`;
};

export function useSpeech() {
  const audioRef = useRef(null);
  const isStopped = useRef(false);

  // Crear un Set de palabras HSK1 para búsqueda rápida O(1)
  const vocabularySet = useMemo(() => {
    const set = new Set();
    hsk1Words.forEach(w => {
        if (w.hanzi) set.add(w.hanzi);
    });
    // Añadimos también palabras comunes que podrían faltar o variantes
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

  // Función para reproducir secuencia de palabras
  const playSequence = async (texts) => {
      for (const t of texts) {
          if (isStopped.current) break;
          await playSegment(t, false); // false = no reintentar recursivamente
      }
  };

  // TOKENIZADOR HSK (Maximum Matching Algorithm)
  // Divide una frase en palabras válidas del vocabulario HSK1
  const tokenize = (text) => {
      const tokens = [];
      let remaining = text.trim();
      
      while (remaining.length > 0) {
          let matched = false;
          // Intentamos encontrar la palabra más larga posible desde el inicio (Max 4 chars para HSK1)
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
              // Si no encontramos palabra, cogemos el primer caracter (fallback caracter a caracter)
              // O intentamos saltar puntuación si la hubiera quedado
              const char = remaining[0];
              // Solo añadimos si es un caracter chino o relevante, o lo añadimos siempre para no perder info
              if (char.trim()) tokens.push(char);
              remaining = remaining.substring(1);
          }
      }
      return tokens;
  };

  const playSegment = (text, allowFallback = true) => {
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
        console.warn("Timeout Youdao, saltando...", text);
        finish();
      }, 5000);

      audio.onended = finish;

      const handleError = async () => {
          if (isDone) return;
          isDone = true;
          clearTimeout(safetyTimeout);

          if (allowFallback && text.length > 1) {
              console.warn(`Fallo frase '${text}'. Activando Tokenizador HSK1...`);
              
              // Usamos el tokenizador inteligente
              const tokens = tokenize(text);
              console.log("Tokens generados:", tokens);
              
              // Si el tokenizador devuelve lo mismo (ej: no encontró nada conocido), 
              // forzamos división caracter a caracter para asegurar sonido.
              if (tokens.length === 1 && tokens[0] === text) {
                   const chars = text.split('');
                   await playSequence(chars);
              } else {
                   await playSequence(tokens);
              }
              resolve();
          } else {
              resolve();
          }
      };

      audio.onerror = () => handleError();
      
      audio.play().catch(err => {
         if (allowFallback) handleError();
         else finish();
      });
    });
  };

  const speak = useCallback(async (text) => {
    if (!text) return;
    stop(); 
    isStopped.current = false;
    
    // 1. Limpieza inicial básica
    // Quitamos puntuación para el split lógico de frases
    const cleanText = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, " ");

    // 2. Dividir por espacios si los hubiera (raro en chino) o bloques lógicos grandes
    const chunks = cleanText.split(/\s+/).filter(c => c.length > 0);
    const finalChunks = chunks.length > 0 ? chunks : [cleanText];

    for (const chunk of finalChunks) {
        if (isStopped.current) break;
        await playSegment(chunk);
    }
  }, [stop]);

  return { speak, stop };
}
