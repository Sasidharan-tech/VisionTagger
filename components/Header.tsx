
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 bg-black border-b-2 border-green-500/50 shadow-lg shadow-green-500/20">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-400 font-mono tracking-wider animate-pulse">
          &gt; VISIONTAGGER.sys
        </h1>
        <p className="text-green-600 mt-2 font-mono text-sm">[GEMINI NEURAL NETWORK ONLINE]</p>
      </div>
    </header>
  );
};
