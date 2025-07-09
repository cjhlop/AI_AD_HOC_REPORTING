import { Sparkles } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-4xl w-full">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-blue-600" />
        </div>
        <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-center space-x-1">
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;