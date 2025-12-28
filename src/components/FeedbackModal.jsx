import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

export default function FeedbackModal({ isCorrect, explanation, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
      >
        <div className={`p-6 text-center ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          {isCorrect ? (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </h2>
        </div>
        
        <div className="p-6">
          <h3 className="text-gray-900 font-semibold mb-2">Explicación:</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {explanation}
          </p>
          
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${
              isCorrect 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Continuar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
