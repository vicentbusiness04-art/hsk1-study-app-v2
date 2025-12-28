import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2 } from 'lucide-react';
import { hsk1Words } from '../data/hsk1Words';
import { useSpeech } from '../hooks/useSpeech';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState([...Array(hsk1Words.length).keys()]);
  const { speak } = useSpeech();

  const currentWord = hsk1Words[shuffledIndices[currentIndex]];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % hsk1Words.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + hsk1Words.length) % hsk1Words.length);
    }, 150);
  };

  const handleShuffle = () => {
      setIsFlipped(false);
      const newIndices = [...shuffledIndices].sort(() => Math.random() - 0.5);
      setShuffledIndices(newIndices);
      setCurrentIndex(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div 
        className="relative w-full max-w-md aspect-[4/3] perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 preserve-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center p-8">
            <span className="text-8xl font-bold text-gray-800 mb-4">{currentWord.hanzi}</span>
            <span className="text-gray-400 text-sm mt-4">Toca para ver el significado</span>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-teal-50 rounded-2xl shadow-lg border border-teal-100 rotate-y-180 flex flex-col items-center justify-center p-8">
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    speak(currentWord.hanzi);
                }}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm text-teal-600 hover:bg-teal-100"
             >
                 <Volume2 className="w-6 h-6" />
             </button>
             <span className="text-3xl font-bold text-teal-600 mb-2">{currentWord.pinyin}</span>
             <span className="text-xl text-gray-700 text-center">{currentWord.meaning}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-full bg-white shadow hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <span className="font-mono text-gray-500">
          {currentIndex + 1} / {hsk1Words.length}
        </span>

        <button 
          onClick={handleNext}
          className="p-3 rounded-full bg-white shadow hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

       <button 
          onClick={handleShuffle}
          className="mt-6 flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Barajar cartas
        </button>
      
      {/* Styles for 3D flip */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
