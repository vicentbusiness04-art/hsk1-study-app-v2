import AudioButton from './AudioButton';

export default function Part3MultipleChoice({ question, onAnswer }) {
  // question: { question, pinyin, options: [{id, text, pinyin, image}], answer: id }

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wide">
        Parte 3: Opción Múltiple
      </div>

      <div className="w-full max-w-md mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            {question.question}
            <AudioButton text={question.question} />
        </h2>
        <div className="text-teal-600 font-medium mb-2">{question.pinyin}</div>
        <p className="text-gray-500 text-sm">Selecciona la imagen correcta.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 w-full max-w-md">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onAnswer(opt.id)}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all text-left group"
          >
            <div className="text-4xl">{opt.image}</div>
            <div>
                <div className="font-bold text-gray-800 group-hover:text-teal-700">{opt.text}</div>
                <div className="text-sm text-gray-500 group-hover:text-teal-600">{opt.pinyin}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}