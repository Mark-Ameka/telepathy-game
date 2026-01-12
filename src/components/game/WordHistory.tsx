// client/src/components/game/WordHistory.tsx

import React from "react";
import { WordPair } from "../../types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface WordHistoryProps {
  history: WordPair[];
}

export const WordHistory: React.FC<WordHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No attempts yet</p>
      </div>
    );
  }

  const getTrendIcon = (current: number, previous?: number) => {
    if (!previous) return <Minus className="w-4 h-4 text-gray-500" />;
    if (current > previous)
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < previous)
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return "text-green-500";
    if (similarity >= 50) return "text-yellow-500";
    if (similarity >= 25) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-2">
      {history
        .slice()
        .reverse()
        .map((pair, index) => {
          const actualIndex = history.length - 1 - index;
          const previousPair =
            actualIndex > 0 ? history[actualIndex - 1] : undefined;

          return (
            <div
              key={pair.timestamp}
              className="p-3 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs text-gray-500">
                      Attempt #{actualIndex + 1}
                    </span>
                    {getTrendIcon(pair.similarity, previousPair?.similarity)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">P1:</span>
                      <span className="ml-2 font-medium">
                        {pair.player1Word}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">P2:</span>
                      <span className="ml-2 font-medium">
                        {pair.player2Word}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text-2xl font-bold ${getSimilarityColor(pair.similarity)}`}
                >
                  {pair.similarity}%
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
