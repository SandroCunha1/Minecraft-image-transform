
import React from 'react';

const CubeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-[#76F44F] inline-block mr-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16.5c0 .83-.67 1.5-1.5 1.5h-15c-.83 0-1.5-.67-1.5-1.5v-12c0-.83.67-1.5 1.5-1.5h15c.83 0 1.5.67 1.5 1.5v12zm-3-9.5h-2v2h2v-2zm-4 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm-2 4h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center bg-[#575757]/80 p-4 border-4 border-[#3A3A3A] shadow-lg">
      <h1 className="text-2xl sm:text-4xl font-bold tracking-wider flex items-center justify-center">
        <CubeIcon />
        <span>MINECRAFT STYLER</span>
      </h1>
      <p className="text-xs sm:text-sm text-gray-300 mt-2">POWERED BY GEMINI 2.5 FLASH IMAGE</p>
    </header>
  );
};
