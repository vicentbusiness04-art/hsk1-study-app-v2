import { useCallback, useRef, useEffect } from 'react';

// Instancia única para evitar que se mezclen audios
let globalUtterance = null;

export function useSpeech() {
  const voicesRef = useRef([]);

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
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback((text) => {
    if (!text) return;
    stop();

    // 1. Intentar con la voz nativa del sistema (Windows/Chrome)
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Buscar voz china
    const voices = voicesRef.current.length > 0 ? voicesRef.current : synth.getVoices();
    const chineseVoice = voices.find(v => v.lang.toLowerCase().includes('zh'));

    if (chineseVoice) {
      utterance.voice = chineseVoice;
      utterance.lang = chineseVoice.lang;
    } else {
      utterance.lang = 'zh-CN';
    }

    utterance.rate = 0.85;

    // Si la voz nativa falla (porque no hay voces instaladas), usamos el audio externo
    utterance.onerror = (event) => {
      console.warn("Voz nativa no disponible, usando audio de Google...");
      const cleanText = text.replace(/[?.!,，。！？]/g, ' ').trim();
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=zh-CN&client=tw-ob`;
      const audio = new Audio(url);
      audio.play().catch(e => console.error("Error crítico de audio:", e));
    };

    // Truco para Chrome: forzar el resume antes del speak
    synth.resume();
    synth.speak(utterance);
    
    // Guardamos referencia para poder cancelarlo
    globalUtterance = utterance;

  }, [stop]);

  return { speak, stop };
}