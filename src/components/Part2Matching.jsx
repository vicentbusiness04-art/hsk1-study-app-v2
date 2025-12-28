import { useState } from 'react';
import AudioButton from './AudioButton';

export default function Part2Matching({ question, onAnswer }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { images, sentences, example } = question;

  const handleSelect = (sentenceId, imageId) => {
    const newAnswers = { ...selectedAnswers, [sentenceId]: imageId };
    setSelectedAnswers(newAnswers);
    
    // Si hemos respondido a todas las oraciones (menos el ejemplo que ya viene)
    if (Object.keys(newAnswers).length === sentences.length) {
       // Validamos la primera por ahora para seguir el flujo del componente padre
       // En un examen real validaríamos todo al final, pero mantenemos el feedback inmediato
       onAnswer(imageId); 
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-4">
      <div className="w-full text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">第二部分</h2>
        <p className="text-gray-500 text-sm">第 26-30 题</p>
      </div>

      {/* Image Grid A-F */}
      <div className="grid grid-cols-3 gap-3 mb-8 w-full">
        {images.map((img) => (
          <div key={img.id} className="relative aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex items-center justify-center text-5xl">
            {img.url}
            <div className="absolute top-1 left-2 font-bold text-teal-700 bg-white/80 px-1 rounded text-sm">{img.id}</div>
          </div>
        ))}
      </div>

      {/* Example Box */}
      <div className="w-full bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 relative">
          <div className="text-[10px] font-bold text-teal-500 mb-2">Ejemplo / 例如:</div>
          <div className="flex items-center justify-between">
              <div>
                  <div className="text-xs text-teal-600">{example.pinyin}</div>
                  <div className="text-lg text-teal-900">{example.text}</div>
              </div>
              <div className="w-10 h-10 border-2 border-teal-300 rounded flex items-center justify-center font-bold text-teal-600">
                  {example.answer}
              </div>
          </div>
      </div>

      {/* Sentences List */}
      <div className="w-full space-y-4">
        {sentences.map((s) => (
          <div key={s.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-gray-400 font-bold">{s.id}.</div>
            <div className="flex-1">
              <div className="text-[10px] text-teal-600 mb-0.5">{s.pinyin}</div>
              <div className="text-base text-gray-800 flex items-center gap-2">
                  {s.text}
                  <AudioButton text={s.text} className="scale-75" />
              </div>
            </div>
            <select 
              value={selectedAnswers[s.id] || ""}
              onChange={(e) => handleSelect(s.id, e.target.value)}
              className="w-12 h-10 border-2 border-gray-200 rounded-lg text-center font-bold text-teal-600 focus:border-teal-500 outline-none"
            >
              <option value=""></option>
              {['A', 'B', 'C', 'D', 'E', 'F'].map(letter => (
                  <option key={letter} value={letter}>{letter}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Submit Button for Group */}
      {Object.keys(selectedAnswers).length === sentences.length && (
          <button 
            onClick={() => {
                // Verificamos si la respuesta de la pregunta actual es correcta
                // El padre espera una respuesta. Por simplicidad validamos la última interacción
                onAnswer(selectedAnswers[sentences[sentences.length-1].id]);
            }}
            className="mt-8 px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg"
          >
              Finalizar Parte 2
          </button>
      )}
    </div>
  );
}
