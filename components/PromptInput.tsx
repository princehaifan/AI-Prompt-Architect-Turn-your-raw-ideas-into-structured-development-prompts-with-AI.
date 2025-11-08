
import React from 'react';

interface PromptInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const PromptInput: React.FC<PromptInputProps> = ({ userInput, setUserInput, onGenerate, isLoading }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <label htmlFor="idea-input" className="block text-sm font-medium text-gray-300 mb-2">
        What is your Input:
      </label>
      <textarea
        id="idea-input"
        rows={4}
        className="w-full p-4 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-200 text-white placeholder-gray-500 resize-none"
        placeholder="e.g., a social media app for pet owners"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={isLoading}
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? (
            <>
                <LoadingSpinner />
                Generating...
            </>
          ) : (
            'Generate Prompt'
          )}
        </button>
      </div>
    </div>
  );
};
