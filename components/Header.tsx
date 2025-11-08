
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        AI Prompt Architect
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Turn your raw ideas into structured development prompts with AI.
      </p>
    </header>
  );
};
