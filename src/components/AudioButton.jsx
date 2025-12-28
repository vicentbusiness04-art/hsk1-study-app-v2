import { useState } from 'react';
import { Volume2, Loader2, Square } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

export default function AudioButton({ text, className = "" }) {
  const { speak, stop } = useSpeech();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e) => {
    e.stopPropagation();
    
    if (isPlaying) {
        stop();
        setIsPlaying(false);
        return;
    }

    setIsPlaying(true);
    try {
      await speak(text);
    } catch (error) {
      console.error("Audio error:", error);
    } finally {
      // Si el componente se desmonta, esto podría dar error, pero en React 18 es benigno
      setIsPlaying(false);
    }
  };

  return (
    <button 
      onClick={handlePlay}
      className={`p-2 rounded-full hover:bg-teal-50 text-teal-600 transition-all active:scale-95 disabled:opacity-70 ${className}`}
      title={isPlaying ? "Detener" : "Escuchar pronunciación"}
    >
      {isPlaying ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}
