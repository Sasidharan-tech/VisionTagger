
import React, { useCallback, useState } from 'react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  disabled: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="w-full relative z-10">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`flex justify-center items-center w-full h-48 px-4 transition bg-black border-2 ${isDragging ? 'border-green-400 shadow-lg shadow-green-500/50' : 'border-green-500/50'} border-dashed rounded-md appearance-none cursor-pointer hover:border-green-400 hover:bg-green-950/20 focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex flex-col items-center space-y-2 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="font-medium text-green-400 font-mono">
            &gt; DROP_IMAGE or <span className="text-green-300 underline">BROWSE</span>
          </span>
           <p className="text-xs text-green-700 font-mono">// PNG, JPG, GIF &lt;= 10MB</p>
        </div>
        <input 
          type="file" 
          name="file_upload" 
          className="hidden" 
          accept="image/png, image/jpeg, image/gif"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </label>
    </div>
  );
};
