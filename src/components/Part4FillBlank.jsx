import { useState } from 'react';
import AudioButton from './AudioButton';

export default function Part4FillBlank({ question, onAnswer }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { options, questions, example } = question;

  const handleSelect = (qId, letter) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: letter }));
  };

  const isComplete = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-4 pb-10">
      <div className="w-full text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">第四部分</h2>
        <p className="text-gray-500 text-sm">第 36-40 题</p>
      </div>

      {/* Word Bank A-F */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 w-full">
        {options.map((opt) => (
          <div key={opt.id} className="bg-white px-4 py-2 border-2 border-gray-100 rounded-xl flex flex-col items-center shadow-sm">
            <div className="text-[10px] text-teal-600 font-bold">{opt.id} {opt.pinyin}</div>
            <div className="text-lg text-gray-800 font-bold">{opt.text}</div>
          </div>
        ))}
      </div>

      {/* Example Box */}
      <div className="w-full bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 relative">
          <div className="text-[10px] font-bold text-teal-500 mb-2">Ejemplo / 例如:</div>
          <div className="flex items-center gap-4">
              <div className="flex-1">
                  <div className="text-[10px] text-teal-600">{example.pinyin}</div>
                  <div className="text-base text-teal-900">{example.text}</div>
              </div>
              <div className="w-10 h-10 bg-teal-200/50 rounded flex items-center justify-center font-bold text-teal-700">
                  D
              </div>
          </div>
      </div>

      {/* Fill-in-the-blank List */}
      <div className="w-full space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-gray-400 font-bold">{q.id}.</div>
            <div className="flex-1">
              <div className="text-[10px] text-teal-600 mb-0.5">{q.pinyin}</div>
              <div className="text-base text-gray-800 flex items-center gap-2 flex-wrap">
                  {q.text.split('(  )').map((part, i, arr) => (
                      <span key={i} className="flex items-center gap-1">
                          {part}
                          {i < arr.length - 1 && (
                              <select 
                                value={selectedAnswers[q.id] || ""}
                                onChange={(e) => handleSelect(q.id, e.target.value)}
                                className="inline-block w-10 h-8 border-b-2 border-teal-400 bg-teal-50 text-center font-bold text-teal-600 outline-none cursor-pointer rounded"
                              >
                                <option value=""></option>
                                {options.map(o => (
                                    <option key={o.id} value={o.id}>{o.id}</option>
                                ))}
                              </select>
                          )}
                      </span>
                  ))}
                  <AudioButton text={q.text.replace('(  )', '')} className="scale-75" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isComplete && (
        <button 
          onClick={() => onAnswer(selectedAnswers[questions[0].id])}
          className="mt-8 px-10 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-xl active:scale-95"
        >
          Finalizar Examen
        </button>
      )}
    </div>
  );
}
