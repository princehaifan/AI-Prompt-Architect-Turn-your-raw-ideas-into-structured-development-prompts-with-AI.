
import React, { useState, useEffect } from 'react';

interface PromptOutputProps {
  prompt: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-full mt-6"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        <div className="h-4 bg-gray-700 rounded w-full mt-6"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
);


export const PromptOutput: React.FC<PromptOutputProps> = ({ prompt, isLoading, error }) => {
  const [copyStatus, setCopyStatus] = useState<'Copy' | 'Copied!'>('Copy');

  useEffect(() => {
    if (copyStatus === 'Copied!') {
      const timer = setTimeout(() => setCopyStatus('Copy'), 2000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopyStatus('Copied!');
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <p className="text-red-400 text-center">{error}</p>;
    }
    if (prompt) {
      return (
        <>
            <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-3 rounded-md transition-colors"
            >
                {copyStatus}
            </button>
            <pre className="whitespace-pre-wrap text-gray-300 font-sans text-base leading-relaxed">{prompt}</pre>
        </>
      );
    }
    return (
      <div className="text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <p className="mt-2">Your generated prompt will appear here.</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 min-h-[20rem] flex items-center justify-center relative">
      {renderContent()}
    </div>
  );
};
