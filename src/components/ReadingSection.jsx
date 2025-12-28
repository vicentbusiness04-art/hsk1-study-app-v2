import { useState, useEffect } from 'react';
import { readingQuestions } from '../data/readingQuestions';
import FeedbackModal from './FeedbackModal';
import Part1TrueFalse from './Part1TrueFalse';
import Part2Matching from './Part2Matching';
import Part3MatchingText from './Part3MatchingText';
import Part4FillBlank from './Part4FillBlank';
import { CheckCircle2, RefreshCw } from 'lucide-react';

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function ReadingSection() {
  const [activePart, setActivePart] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);
  const [examQuestions, setExamQuestions] = useState(null);

  const generateNewExam = () => {
    const p1 = shuffleArray(readingQuestions.filter(q => q.part === 1)).slice(0, 5);
    
    // Pick one random group for parts 2, 3, 4 and shuffle its internal questions
    const getGroup = (part) => {
        const groups = readingQuestions.filter(q => q.part === part);
        const selected = { ...groups[Math.floor(Math.random() * groups.length)] };
        if (selected.sentences) selected.sentences = shuffleArray(selected.sentences);
        if (selected.questions) selected.questions = shuffleArray(selected.questions);
        return selected;
    };

    setExamQuestions({
      1: p1,
      2: [getGroup(2)],
      3: [getGroup(3)],
      4: [getGroup(4)]
    });
    
    // Reset state for new exam
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalPossibleScore(0);
    setIsFinished(false);
    setFeedback(null);
  };

  useEffect(() => {
    generateNewExam();
  }, []);

  if (!examQuestions) {
      return <div className="flex items-center justify-center h-64 text-gray-500 font-medium">Generando examen...</div>;
  }

  // Filter questions by active part
  const questionsForPart = examQuestions[activePart] || [];
  const currentQuestion = questionsForPart[currentQuestionIndex];

  const handleAnswer = (userAnswer) => {
    let correctCount = 0;
    let incrementTotal = 0;

    if (typeof userAnswer === 'object' && !Array.isArray(userAnswer)) {
        // Para grupos (Partes 2, 3, 4)
        const subQuestions = currentQuestion.sentences || currentQuestion.questions;
        subQuestions.forEach(sq => {
            if (userAnswer[sq.id] === sq.answer) correctCount++;
        });
        incrementTotal = subQuestions.length;
    } else {
        // Para individuales (Parte 1)
        if (userAnswer === currentQuestion.answer) correctCount = 1;
        incrementTotal = 1;
    }
    
    setScore(s => s + correctCount);
    setTotalPossibleScore(t => t + incrementTotal);

    setFeedback({
      isCorrect: correctCount > 0,
      explanation: correctCount === incrementTotal 
        ? "¡Excelente! Todo correcto." 
        : `Has acertado ${correctCount} de ${incrementTotal}.`
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
      setTotalPossibleScore(0);
      setIsFinished(false);
      setFeedback(null);
  };

  const restartPart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalPossibleScore(0);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Header with New Exam Button */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6 px-2">
          <h2 className="text-xl font-bold text-gray-800">Lectura HSK1</h2>
          <button 
            onClick={generateNewExam}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
            title="Generar un examen completamente nuevo"
          >
            <RefreshCw className="w-4 h-4" />
            Nuevo Examen
          </button>
      </div>

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
                {score} / {totalPossibleScore}
            </div>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={restartPart}
                    className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors"
                >
                    Practicar esta parte otra vez
                </button>
                <button 
                    onClick={generateNewExam}
                    className="w-full py-3 bg-white border-2 border-teal-100 text-teal-600 rounded-xl font-bold hover:bg-teal-50 transition-colors"
                >
                    Generar nuevo examen completo
                </button>
            </div>
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
