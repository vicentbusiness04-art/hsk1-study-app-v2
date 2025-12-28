import { useState } from 'react';
import { Search, Volume2 } from 'lucide-react';
import { hsk1Words } from '../data/hsk1Words';
import { useSpeech } from '../hooks/useSpeech';

export default function StudyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { speak } = useSpeech();

  const filteredWords = hsk1Words.filter(word => 
    word.hanzi.includes(searchTerm) ||
    word.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por Hanzi, Pinyin o significado..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map((word) => (
          <div key={word.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
            <button 
                onClick={() => speak(word.hanzi)}
                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-teal-600 transition-colors"
            >
                <Volume2 className="w-5 h-5" />
            </button>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{word.hanzi}</div>
                <div className="text-sm font-medium text-teal-600 mb-2">{word.pinyin}</div>
                <div className="text-gray-600 text-sm leading-snug">{word.meaning}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredWords.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No se encontraron palabras que coincidan con "{searchTerm}"
        </div>
      )}
    </div>
  );
}
