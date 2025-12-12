
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="w-12 h-12 border-4 border-t-green-400 border-green-900 rounded-full animate-spin shadow-lg shadow-green-500/50"></div>
      <p className="text-green-400 font-mono animate-pulse">&gt; ANALYZING_IMAGE.exe...</p>
      <p className="text-green-700 font-mono text-xs">// Neural network processing</p>
    </div>
  );
};
