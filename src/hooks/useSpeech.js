import { useCallback, useRef, useEffect } from 'react';

export function useSpeech() {
  const audioRef = useRef(null);
  const voicesRef = useRef([]);

  // Cargar voces disponibles en el sistema
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  const speak = useCallback((text) => {
    if (!text) return;
    stop();

    const cleanText = text.replace(/[?.!,，。！？]/g, ' ').trim();

    // INTENTO 1: Web Speech API (Nativo, sin internet)
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Buscar la mejor voz china en tu Windows
    const allVoices = voicesRef.current.length > 0 ? voicesRef.current : synth.getVoices();
    const chineseVoice = allVoices.find(v => v.lang.includes('zh-CN')) || 
                        allVoices.find(v => v.lang.includes('zh')) ||
                        allVoices.find(v => v.name.includes('Chinese'));

    if (chineseVoice) {
      utterance.voice = chineseVoice;
      utterance.lang = chineseVoice.lang;
    } else {
      utterance.lang = 'zh-CN';
    }

    utterance.rate = 0.8;
    
    // Si la voz nativa falla, saltamos al audio externo
    utterance.onerror = () => {
      console.warn("Voz nativa falló, intentando audio externo...");
      playExternal(cleanText);
    };

    synth.speak(utterance);

    // Función de apoyo para audio externo
    function playExternal(t) {
      // Usamos el endpoint de Google más básico y directo
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(t)}&tl=zh-CN&client=tw-ob`;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play().catch(e => console.error("Fallo total de audio:", e));
    }

  }, [stop]);

  return { speak, stop };
}
