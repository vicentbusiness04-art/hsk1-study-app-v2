import AudioButton from './AudioButton';

export default function Part1TrueFalse({ question, onAnswer }) {
  // question structure: { id, question: { text, pinyin, image }, answer, explanation }
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wide">
        Parte 1: Verdadero o Falso
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full max-w-sm flex flex-col items-center mb-8">
        <div className="text-8xl mb-6">{question.question.image}</div>
        <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
                 <h2 className="text-4xl font-bold text-gray-800">{question.question.text}</h2>
                 <AudioButton text={question.question.text} />
            </div>
            <div className="text-xl text-teal-600 font-medium">{question.question.pinyin}</div>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-sm">
        <button
          onClick={() => onAnswer(true)}
          className="flex-1 py-4 rounded-xl bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-700 font-bold text-lg transition-all"
        >
          ✓ Verdadero
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="flex-1 py-4 rounded-xl bg-white border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-700 font-bold text-lg transition-all"
        >
          ✕ Falso
        </button>
      </div>
    </div>
  );
}