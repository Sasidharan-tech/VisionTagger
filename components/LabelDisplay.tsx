
import React from 'react';

interface LabelDisplayProps {
  labels: string[];
}

export const LabelDisplay: React.FC<LabelDisplayProps> = ({ labels }) => {
  return (
    <div className="w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-400 font-mono">&gt; SCAN_RESULTS.log</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {labels.map((label, index) => (
          <span
            key={index}
            className="inline-block bg-green-500/10 border-2 border-green-500 text-green-300 text-sm font-medium font-mono px-4 py-2 rounded shadow-lg shadow-green-500/30 hover:bg-green-500/20 hover:shadow-green-500/50 transition-all"
          >
            [{label}]
          </span>
        ))}
      </div>
    </div>
  );
};
