import { useState } from 'react';
import AudioButton from './AudioButton';

export default function Part3MatchingText({ question, onAnswer }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { options, questions, example } = question;

  const handleSelect = (qId, letter) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: letter }));
  };

  const isComplete = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl px-4 pb-10">
      <div className="w-full text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 tracking-widest">第三部分</h2>
        <p className="text-gray-500 text-sm">第 31-35 题</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Columna de Preguntas (Izquierda) */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Preguntas / 问题</h4>
          
          {/* Ejemplo */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300 opacity-70">
            <span className="text-gray-400 font-bold">例如：</span>
            <div className="flex-1">
                <div className="text-[10px] text-teal-600">Nǐ hē shuǐ ma?</div>
                <div className="text-base text-gray-800">{example.q}</div>
            </div>
            <div className="w-8 h-8 border-2 border-teal-400 rounded flex items-center justify-center font-bold text-teal-600 bg-white">
                F
            </div>
          </div>

          {questions.map((q) => (
            <div key={q.id} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-teal-200 transition-colors">
              <span className="text-gray-400 font-bold">{q.id}.</span>
              <div className="flex-1">
                <div className="text-[10px] text-teal-600 mb-0.5">{q.pinyin}</div>
                <div className="text-base text-gray-800 flex items-center gap-2">
                    {q.text}
                    <AudioButton text={q.text} className="scale-75" />
                </div>
              </div>
              <select 
                value={selectedAnswers[q.id] || ""}
                onChange={(e) => handleSelect(q.id, e.target.value)}
                className="w-10 h-10 border-2 border-gray-200 rounded-lg text-center font-bold text-teal-600 focus:border-teal-500 outline-none cursor-pointer bg-teal-50/30"
              >
                <option value=""></option>
                {options.map(o => (
                    <option key={o.id} value={o.id}>{o.id}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Columna de Opciones de Respuesta (Derecha) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Opciones / 选项</h4>
          <div className="grid grid-cols-1 gap-2">
            {options.map((opt) => (
              <div key={opt.id} className="bg-white p-3 border border-gray-100 rounded-xl flex items-start gap-4 shadow-sm">
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center font-bold text-teal-600 bg-teal-50 rounded text-sm">
                  {opt.id}
                </div>
                <div>
                  <div className="text-[10px] text-teal-500 leading-none mb-1">{opt.pinyin}</div>
                  <div className="text-sm text-gray-700">{opt.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isComplete && (
        <button 
          onClick={() => onAnswer(selectedAnswers[questions[0].id])}
          className="mt-10 px-12 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-xl active:scale-95"
        >
          Finalizar Parte 3
        </button>
      )}
    </div>
  );
}
