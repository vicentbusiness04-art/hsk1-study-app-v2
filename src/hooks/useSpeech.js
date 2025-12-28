import { useCallback, useEffect, useRef } from 'react';

const GOOGLE_TTS_URLS = [
  (text) =>
    `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      text,
    )}&tl=zh-CN&client=gtx`,
  (text) =>
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      text,
    )}&tl=zh-CN&client=tw-ob`,
];

function pickChineseVoice(voices) {
  const normalizedVoices = voices.map((voice) => ({
    voice,
    lang: (voice.lang ?? '').toLowerCase(),
  }));

  return (
    normalizedVoices.find((v) => v.lang === 'zh-cn')?.voice ??
    normalizedVoices.find((v) => v.lang.startsWith('zh'))?.voice ??
    normalizedVoices.find((v) => v.lang.includes('zh'))?.voice ??
    null
  );
}

export function useSpeech() {
  const voicesRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return undefined;

    const synth = window.speechSynthesis;
    const refreshVoices = () => {
      const voices = synth.getVoices?.() ?? [];
      if (voices.length) voicesRef.current = voices;
    };

    refreshVoices();
    synth.addEventListener?.('voiceschanged', refreshVoices);
    return () => synth.removeEventListener?.('voiceschanged', refreshVoices);
  }, []);

  const stopActiveAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {
      // ignore
    } finally {
      audioRef.current = null;
    }
  }, []);

  const playGoogleFallback = useCallback(
    async (text) => {
      stopActiveAudio();

      for (const makeUrl of GOOGLE_TTS_URLS) {
        const url = makeUrl(text);
        try {
          const audio = new Audio(url);
          audio.preload = 'auto';
          audio.crossOrigin = 'anonymous';
          audioRef.current = audio;

          audio.onended = () => {
            if (audioRef.current === audio) audioRef.current = null;
          };
          audio.onerror = () => {
            if (audioRef.current === audio) audioRef.current = null;
          };

          await audio.play();
          return;
        } catch (error) {
          console.error('Error de reproducción (Google TTS):', error);
        }
      }

      alert(
        'No se pudo reproducir el audio. Revisa permisos de audio, conexión a internet y/o prueba otro navegador.',
      );
    },
    [stopActiveAudio],
  );

  const speak = useCallback(
    (text) => {
      if (!text) return;

      stopActiveAudio();

      if (
        !('speechSynthesis' in window) ||
        typeof SpeechSynthesisUtterance === 'undefined'
      ) {
        void playGoogleFallback(text);
        return;
      }

      const synth = window.speechSynthesis;

      try {
        synth.resume?.();
      } catch {
        // ignore
      }

      try {
        synth.cancel();
      } catch {
        // ignore
      }

      const voices =
        voicesRef.current.length > 0
          ? voicesRef.current
          : (synth.getVoices?.() ?? []);

      if (!voices.length) {
        console.warn(
          'SpeechSynthesis no reporta voces disponibles; usando fallback (Google TTS).',
        );
        void playGoogleFallback(text);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      utterance.pitch = 1;

      const chineseVoice = pickChineseVoice(voices);
      if (chineseVoice) utterance.voice = chineseVoice;

      utterance.onerror = (event) => {
        console.error('Error en Web Speech API:', event);
        void playGoogleFallback(text);
      };

      synth.speak(utterance);
    },
    [playGoogleFallback, stopActiveAudio],
  );

  return { speak };
}
