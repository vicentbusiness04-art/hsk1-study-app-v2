import AudioButton from './AudioButton';

export default function Part1TrueFalse({ question, onAnswer }) {
  // question structure: { id, question: { text, pinyin, image }, example }
  
  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      <div className="w-full text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">第一部分</h2>
        <p className="text-gray-500 text-sm">第 21-25 题</p>
      </div>

      {/* Example Box */}
      {question.id === 21 && (
        <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 mb-8 bg-gray-50">
          <div className="text-xs font-bold text-gray-400 mb-2 uppercase">Ejemplo / 例如:</div>
          <div className="flex items-center justify-around">
            <div className="text-center">
               <img src="https://img.icons8.com/color/96/television.png" alt="tv" className="w-16 h-16 mx-auto mb-2 opacity-60" />
               <div className="text-xs text-gray-400">diànshì</div>
               <div className="text-lg text-gray-400">电视</div>
            </div>
            <div className="text-2xl text-red-400 font-bold">✕</div>
            <div className="border-l border-gray-200 h-12"></div>
            <div className="text-center">
               <img src="https://img.icons8.com/color/96/airplane-take-off.png" alt="plane" className="w-16 h-16 mx-auto mb-2 opacity-60" />
               <div className="text-xs text-gray-400">fēijī</div>
               <div className="text-lg text-gray-400">飞机</div>
            </div>
            <div className="text-2xl text-green-400 font-bold">✓</div>
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 w-full flex flex-col items-center mb-8">
        <div className="relative mb-6">
            <img 
                src={question.question.image} 
                alt="word" 
                className="w-48 h-48 object-contain"
            />
        </div>
        
        <div className="flex flex-col items-center mb-2">
            <div className="text-teal-600 font-medium text-lg mb-1">{question.question.pinyin}</div>
            <div className="flex items-center gap-3">
                 <h2 className="text-5xl font-bold text-gray-800 tracking-widest">{question.question.text}</h2>
                 <AudioButton text={question.question.text} />
            </div>
        </div>
      </div>

      {/* True/False Buttons - Exact HSK style */}
      <div className="flex gap-6 w-full px-4">
        <button
          onClick={() => onAnswer(true)}
          className="flex-1 py-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-green-600 transition-all flex flex-col items-center group"
        >
          <span className="text-4xl mb-1 group-hover:scale-110 transition-transform">✓</span>
          <span className="text-xs font-bold text-gray-400 uppercase">Correcto</span>
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="flex-1 py-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 text-red-600 transition-all flex flex-col items-center group"
        >
          <span className="text-4xl mb-1 group-hover:scale-110 transition-transform">✕</span>
          <span className="text-xs font-bold text-gray-400 uppercase">Incorrecto</span>
        </button>
      </div>
    </div>
  );
}
