
import React from 'react';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 bg-[#575757] border-4 border-[#3A3A3A] animate-spin">
          <div className="w-1/2 h-1/2 bg-[#76F44F]"></div>
        </div>
        <p className="mt-4 text-sm text-gray-300">GENERATING PIXELS...</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex items-center justify-center h-full bg-black/20 text-gray-400 text-center">
        <p className="text-sm p-4">IMAGE WILL APPEAR HERE</p>
    </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false }) => {
  return (
    <div className="bg-[#575757]/80 border-4 border-[#3A3A3A] shadow-lg flex flex-col">
      <h2 className="text-lg text-[#76F44F] bg-[#3A3A3A] p-3 text-center tracking-widest">{title}</h2>
      <div className="aspect-square w-full p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};
