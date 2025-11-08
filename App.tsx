
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { PromptOutput } from './components/PromptOutput';
import { generatePrompt } from './services/geminiService';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('a hostel management system to build for hostels to use');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePrompt = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter an application idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const prompt = await generatePrompt(userInput);
      setGeneratedPrompt(prompt);
    } catch (e) {
      const err = e as Error;
      setError(`Failed to generate prompt: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 space-y-8">
          <PromptInput
            userInput={userInput}
            setUserInput={setUserInput}
            onGenerate={handleGeneratePrompt}
            isLoading={isLoading}
          />
          <PromptOutput
            prompt={generatedPrompt}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
