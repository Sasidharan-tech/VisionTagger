
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { LabelDisplay } from './components/LabelDisplay';
import { Spinner } from './components/Spinner';
import { Footer } from './components/Footer';
import { generateLabels } from './services/geminiService';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setLabels(null);
    setError(null);
  };

  const handleGenerateLabels = useCallback(async () => {
    if (!imageFile) return;

    setIsLoading(true);
    setError(null);
    setLabels(null);

    try {
      const generatedLabels = await generateLabels(imageFile);
      setLabels(generatedLabels);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate labels. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-green-400 font-mono">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-black/90 backdrop-blur-sm rounded-lg shadow-2xl shadow-green-500/20 p-6 md:p-10 border-2 border-green-500/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,transparent_1px)] bg-[size:20px_20px] opacity-5"></div>
          <p className="text-center text-green-300 mb-6 text-lg relative z-10 font-mono">
            &gt; UPLOAD_IMAGE.exe // Gemini AI Neural Network Active
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center space-y-4">
              <ImageUpload onImageUpload={handleImageUpload} disabled={isLoading} />
              {imageUrl && (
                <div className="mt-4 w-full aspect-square rounded-lg overflow-hidden border-2 border-green-500/50 p-2 bg-black shadow-lg shadow-green-500/30">
                  <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
            
            <div className="flex flex-col justify-center items-center space-y-6 min-h-[200px] md:min-h-full relative z-10">
              {isLoading ? (
                <Spinner />
              ) : error ? (
                <div className="text-center p-4 bg-red-900/30 border-2 border-red-500 rounded-lg font-mono">
                  <p className="font-bold text-red-400">[!] SYSTEM ERROR</p>
                  <p className="text-red-300 text-sm mt-2">{error}</p>
                </div>
              ) : labels ? (
                <LabelDisplay labels={labels} />
              ) : (
                 <div className="text-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h2zm2 14h6a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2zm5-14h.01" /></svg>
                    <p className="mt-2 font-mono">&gt; Awaiting data stream...</p>
                </div>
              )}
            </div>
          </div>

          {imageFile && (
            <div className="mt-8 text-center relative z-10">
              <button
                onClick={handleGenerateLabels}
                disabled={isLoading || !imageFile}
                className="px-8 py-3 bg-green-500/20 text-green-400 font-bold font-mono rounded border-2 border-green-500 hover:bg-green-500 hover:text-black disabled:bg-gray-800 disabled:border-gray-700 disabled:text-gray-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50 hover:shadow-green-500/80"
              >
                {isLoading ? '&gt; ANALYZING...' : '[ EXECUTE SCAN ]'}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
