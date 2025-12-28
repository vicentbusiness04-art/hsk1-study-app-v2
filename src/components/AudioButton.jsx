import { Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

export default function AudioButton({ text, className = "" }) {
  const { speak } = useSpeech();

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      className={`p-2 rounded-full hover:bg-gray-100 text-teal-600 transition-colors ${className}`}
      title="Escuchar pronunciación"
    >
      <Volume2 className="w-5 h-5" />
    </button>
  );
}
