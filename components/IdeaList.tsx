
import React from 'react';
import type { Idea } from '../types';

interface IdeaListProps {
  ideas: Idea[];
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        {[...Array(10)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-600"></div>
        ))}
    </div>
);

export const IdeaList: React.FC<IdeaListProps> = ({ ideas, isLoading }) => {
  return (
    <div className="bg-[#575757]/80 p-6 border-4 border-[#3A3A3A] shadow-lg">
      <h2 className="text-xl text-[#76F44F] mb-4">2. GET IDEAS</h2>
      <div className="bg-[#3A3A3A] p-4 min-h-[200px] text-xs">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <ul className="space-y-3">
            {ideas.map((idea) => (
              <li key={idea.id} className="text-gray-300 hover:text-white transition-colors">
                <span className="text-[#76F44F] mr-2">{idea.id}.</span>
                {idea.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
