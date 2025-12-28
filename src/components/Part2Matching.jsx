import AudioButton from './AudioButton';

export default function Part2Matching({ question, onAnswer }) {
  // question: { options: [{id, content, pinyin, image}], explanation, answer }
  // We match against the 'answer' ID defined in the question object.
  
  const targetOption = question.options.find(opt => opt.id === question.answer);

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wide">
        Parte 2: Emparejar (Selecciona la imagen)
      </div>

      <div className="bg-teal-50 p-6 rounded-2xl w-full max-w-md mb-8 text-center relative">
        <h2 className="text-2xl font-bold text-teal-900 mb-1">{targetOption.content}</h2>
        <div className="text-teal-700 font-medium">{targetOption.pinyin}</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
             <AudioButton text={targetOption.content} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {[...question.options].sort(() => Math.random() - 0.5).map((opt) => (
          <button
            key={opt.id}
            onClick={() => onAnswer(opt.id)}
            className="aspect-square bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-teal-500 hover:shadow-md transition-all flex items-center justify-center text-5xl"
          >
            {opt.image}
          </button>
        ))}
      </div>
    </div>
  );
}