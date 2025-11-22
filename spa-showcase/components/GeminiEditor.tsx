import React, { useState } from 'react';
import { enhanceDescription } from '../services/geminiService';

interface GeminiEditorProps {
  initialText: string;
  onSave: (newText: string) => void;
  onClose: () => void;
}

export const GeminiEditor: React.FC<GeminiEditorProps> = ({ initialText, onSave, onClose }) => {
  const [text, setText] = useState(initialText);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnhance = async () => {
    setIsLoading(true);
    const enhanced = await enhanceDescription(text);
    setText(enhanced);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">✨</span> AI Description Enhancer
        </h3>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 bg-slate-800 border border-slate-600 rounded p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none mb-4 resize-none"
          placeholder="Enter a rough description..."
        />

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white text-sm"
          >
            Cancel
          </button>
          <div className="flex gap-2">
             <button
              onClick={handleEnhance}
              disabled={isLoading}
              className={`px-4 py-2 rounded text-white text-sm font-medium transition-all ${
                isLoading ? 'bg-blue-800 cursor-wait' : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {isLoading ? 'Magic at work...' : '✨ Enhance with Gemini'}
            </button>
            <button
              onClick={() => onSave(text)}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white text-sm font-medium"
            >
              Use This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};