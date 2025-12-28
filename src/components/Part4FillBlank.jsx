import AudioButton from './AudioButton';

export default function Part4FillBlank({ question, onAnswer }) {
  // question: { sentence, pinyin, options: [{id, text}], answer: id }

  const parts = question.sentence.split('___');

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wide">
        Parte 4: Rellenar el hueco
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md mb-8 text-center">
        <div className="text-2xl font-bold text-gray-800 mb-2 leading-relaxed">
            {parts[0]}
            <span className="inline-block w-16 border-b-2 border-gray-300 mx-1"></span>
            {parts[1]}
        </div>
        <div className="text-teal-600 font-medium mb-2">{question.pinyin}</div>
        <div className="flex justify-center">
            <AudioButton text={question.sentence.replace('___', ' ')} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onAnswer(opt.id)}
            className="py-3 px-4 bg-white rounded-xl border-2 border-gray-200 hover:border-teal-500 hover:text-teal-600 font-bold text-lg transition-all"
          >
            {opt.text}
            <div className="text-xs font-normal text-gray-400 mt-1">{opt.word}</div>
          </button>
        ))}
      </div>
    </div>
  );
}