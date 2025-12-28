import { useState } from 'react';
import AudioButton from './AudioButton';

export default function Part3MultipleChoice({ question, onAnswer }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { options, questions, example } = question;

  const handleSelect = (qId, letter) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: letter }));
  };

  const isComplete = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-4 pb-10">
      <div className="w-full text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">第三部分</h2>
        <p className="text-gray-500 text-sm">第 31-35 题</p>
      </div>

      {/* Answer Bank A-F */}
      <div className="grid grid-cols-2 gap-3 mb-8 w-full">
        {options.map((opt) => (
          <div key={opt.id} className="bg-white p-3 border border-gray-200 rounded-xl flex items-start gap-3 shadow-sm">
            <div className="font-bold text-teal-600 pt-1">{opt.id}</div>
            <div>
              <div className="text-[10px] text-teal-500">{opt.pinyin}</div>
              <div className="text-sm text-gray-800">{opt.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Example Box */}
      <div className="w-full bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 relative">
          <div className="text-[10px] font-bold text-teal-500 mb-2">Ejemplo / 例如:</div>
          <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                  <div className="text-[10px] text-teal-600">{example.q.split(' ').map((_, i) => example.pinyin ? example.pinyin.split(' ')[i] : '').join(' ')}</div>
                  <div className="text-base text-teal-900">{example.q}</div>
              </div>
              <div className="w-10 h-10 border-2 border-teal-300 rounded flex items-center justify-center font-bold text-teal-600">
                  {example.letter}
              </div>
              <div className="flex-1 text-right">
                  <div className="text-base text-teal-900">{example.a}</div>
              </div>
          </div>
      </div>

      {/* Questions List */}
      <div className="w-full space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-gray-400 font-bold">{q.id}.</div>
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
              className="w-12 h-10 border-2 border-gray-200 rounded-lg text-center font-bold text-teal-600 focus:border-teal-500 outline-none cursor-pointer"
            >
              <option value=""></option>
              {options.map(o => (
                  <option key={o.id} value={o.id}>{o.id}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {isComplete && (
        <button 
          onClick={() => onAnswer(selectedAnswers[questions[0].id])}
          className="mt-8 px-10 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-xl active:scale-95"
        >
          Finalizar Parte 3
        </button>
      )}
    </div>
  );
}
