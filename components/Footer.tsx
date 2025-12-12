
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-4 mt-8 bg-black border-t-2 border-green-500/50">
      <div className="container mx-auto text-center text-green-600 text-sm font-mono">
        <p>&gt; {new Date().getFullYear()} VISIONTAGGER // All_Rights_Reserved</p>
        <p className="mt-1">DEV: <span className="text-green-400 font-bold">SASIDHARAN</span></p>
      </div>
    </footer>
  );
};
