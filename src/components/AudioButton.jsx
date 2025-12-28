import { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

export default function AudioButton({ text, className = "" }) {
  const { speak } = useSpeech();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e) => {
    e.stopPropagation();
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      await speak(text);
      // Simulamos un tiempo de "reproducción" visual si es muy corto
      setTimeout(() => setIsPlaying(false), 1000);
    } catch (error) {
      console.error("Audio error:", error);
      setIsPlaying(false);
    }
  };

  return (
    <button 
      onClick={handlePlay}
      disabled={isPlaying}
      className={`p-2 rounded-full hover:bg-teal-50 text-teal-600 transition-all active:scale-95 disabled:opacity-70 ${className}`}
      title="Escuchar pronunciación"
    >
      {isPlaying ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}
