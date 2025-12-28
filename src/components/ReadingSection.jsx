import { useState } from 'react';
import { readingQuestions } from '../data/readingQuestions';
import FeedbackModal from './FeedbackModal';
import Part1TrueFalse from './Part1TrueFalse';
import Part2Matching from './Part2Matching';
import Part3MatchingText from './Part3MatchingText';
import Part4FillBlank from './Part4FillBlank';
import { CheckCircle2 } from 'lucide-react';

export default function ReadingSection() {
  const [activePart, setActivePart] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Filter questions by active part
  const questionsForPart = readingQuestions.filter(q => q.part === activePart);
  const currentQuestion = questionsForPart[currentQuestionIndex];

  const handleAnswer = (userAnswer) => {
    // Para partes con múltiples preguntas, validamos según la lógica del componente
    // En Part 1 es feedback inmediato. En las otras es al final.
    const isCorrect = Array.isArray(currentQuestion.answer) 
        ? true // Simplificación para grupos
        : userAnswer === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(s => s + (currentQuestion.questions?.length || 1));
    }
    setFeedback({
      isCorrect,
      explanation: currentQuestion.explanation || "¡Buen trabajo completando esta sección!"
    });
  };

  const closeFeedback = () => {
    setFeedback(null);
    if (currentQuestionIndex < questionsForPart.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleTabChange = (part) => {
      setActivePart(part);
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsFinished(false);
      setFeedback(null);
  };

  const restartPart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Sub-tabs for Reading Parts */}
      <div className="flex gap-2 mb-6 overflow-x-auto w-full max-w-xl p-1 bg-gray-100 rounded-xl">
        {[1, 2, 3, 4].map((part) => (
            <button
                key={part}
                onClick={() => handleTabChange(part)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activePart === part 
                    ? 'bg-white text-teal-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                Parte {part}
            </button>
        ))}
      </div>

      {isFinished ? (
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-lg mt-8">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Parte {activePart} Completada!</h2>
            
            <div className="text-4xl font-bold text-teal-600 mb-8">
                {score} / {questionsForPart.length}
            </div>

            <button 
                onClick={restartPart}
                className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors"
            >
                Practicar otra vez
            </button>
        </div>
      ) : (
          questionsForPart.length > 0 ? (
            <div className="w-full max-w-2xl flex flex-col items-center">
                <div className="w-full max-w-lg mb-6">
                    <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                        <span>Progreso Parte {activePart}</span>
                        <span>{currentQuestionIndex + 1} / {questionsForPart.length}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-teal-500 transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / questionsForPart.length) * 100}%` }}
                        />
                    </div>
                </div>

    {activePart === 1 && (
        <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-teal-800 tracking-tight">第一部分 — Parte 1</h3>
            <p className="text-sm text-gray-500">¿El dibujo coincide con la palabra? (Verdadero/Falso)</p>
        </div>
    )}
    {activePart === 2 && (
        <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-teal-800 tracking-tight">第二部分 — Parte 2</h3>
            <p className="text-sm text-gray-500">Relaciona cada frase con su imagen correspondiente (A-F)</p>
        </div>
    )}
    {activePart === 3 && (
        <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-teal-800 tracking-tight">第三部分 — Parte 3</h3>
            <p className="text-sm text-gray-500">Relaciona las preguntas de la izquierda con las respuestas de la derecha</p>
        </div>
    )}
    {activePart === 4 && (
        <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-teal-800 tracking-tight">第四部分 — Parte 4</h3>
            <p className="text-sm text-gray-500">Completa las frases eligiendo la palabra correcta del recuadro</p>
        </div>
    )}

    {currentQuestion.type === 'true-false' && (
                    <Part1TrueFalse question={currentQuestion} onAnswer={handleAnswer} />
                )}
                {currentQuestion.type === 'matching-image' && (
                    <Part2Matching question={currentQuestion} onAnswer={handleAnswer} />
                )}
                {currentQuestion.type === 'matching-text' && (
                    <Part3MatchingText question={currentQuestion} onAnswer={handleAnswer} />
                )}
                {currentQuestion.type === 'fill-blank-group' && (
                    <Part4FillBlank question={currentQuestion} onAnswer={handleAnswer} />
                )}
            </div>
          ) : (
              <div className="text-gray-500 mt-10">No hay preguntas disponibles para esta parte todavía.</div>
          )
      )}

      {feedback && (
        <FeedbackModal 
            isCorrect={feedback.isCorrect} 
            explanation={feedback.explanation} 
            onClose={closeFeedback} 
        />
      )}
    </div>
  );
}
