
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { IdeaList } from './components/IdeaList';
import { generateMinecraftImage, generateIdeas } from './services/geminiService';
import type { Idea } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = useCallback(async () => {
    setIsLoadingIdeas(true);
    setError(null);
    try {
      const ideaTexts = await generateIdeas();
      setIdeas(ideaTexts.map((text, index) => ({ id: index + 1, text })));
    } catch (err) {
      setError('Failed to generate ideas. Please try again later.');
      console.error(err);
    } finally {
      setIsLoadingIdeas(false);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Cleanup object URL to prevent memory leaks
    return () => {
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }
    };
  }, [originalImageUrl]);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setGeneratedImageUrl(null);
    if (originalImageUrl) {
      URL.revokeObjectURL(originalImageUrl);
    }
    setOriginalImageUrl(URL.createObjectURL(file));
  };

  const handleGenerateClick = async () => {
    if (!originalImage) {
      setError('Please upload an image first!');
      return;
    }

    setIsLoadingImage(true);
    setGeneratedImageUrl(null);
    setError(null);

    try {
      const generatedImage = await generateMinecraftImage(originalImage);
      setGeneratedImageUrl(generatedImage);
    } catch (err) {
      setError('Failed to generate Minecraft image. The model may be overloaded. Please try again.');
      console.error(err);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <div className="bg-[#3A3A3A] min-h-screen text-white p-4 sm:p-8" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23575757' fill-opacity='0.2'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
      <div className="container mx-auto">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-[#575757]/80 p-6 border-4 border-[#3A3A3A] shadow-lg">
                <h2 className="text-xl text-[#76F44F] mb-4">1. UPLOAD IMAGE</h2>
                <ImageUploader onImageUpload={handleImageUpload} />
                <button
                  onClick={handleGenerateClick}
                  disabled={isLoadingImage || !originalImage}
                  className="w-full mt-4 bg-[#76F44F] text-[#3A3A3A] px-4 py-3 text-lg border-b-4 border-green-700 hover:bg-green-400 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:border-gray-700 transition-all duration-150 ease-in-out focus:outline-none"
                >
                  {isLoadingImage ? 'CRAFTING...' : 'MINECRAFTIFY!'}
                </button>
              </div>

              <IdeaList ideas={ideas} isLoading={isLoadingIdeas} />
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageDisplay title="YOUR IMAGE" imageUrl={originalImageUrl} />
              <ImageDisplay title="MINECRAFT STYLE" imageUrl={generatedImageUrl} isLoading={isLoadingImage} />
            </div>
          </div>
          {error && (
            <div className="mt-8 bg-red-800/80 border-2 border-red-600 text-white p-4 text-center text-sm">
              <p>ERROR: {error}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
