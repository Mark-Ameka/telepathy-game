// client/src/components/game/GameProgress.tsx

import React from "react";
import { Room } from "../../types";
import { CheckCircle, Circle } from "lucide-react";

interface GameProgressProps {
  room: Room;
}

export const GameProgress: React.FC<GameProgressProps> = ({ room }) => {
  const currentSetData = room.sets[room.currentSet - 1];
  const averageSimilarity =
    currentSetData.history.length > 0
      ? Math.round(
        currentSetData.history.reduce(
          (sum, pair) => sum + pair.similarity,
          0,
        ) / currentSetData.history.length,
      )
      : 0;

  const highestSimilarity =
    currentSetData.history.length > 0
      ? Math.max(...currentSetData.history.map((pair) => pair.similarity))
      : 0;

  return (
    <div className="space-y-4">
      {/* Sets Progress */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600 mb-3">Progress</p>
        <div className="flex items-center space-x-2">
          {room.sets.map((set) => (
            <div
              key={set.setNumber}
              className="flex flex-col items-center flex-1"
            >
              <div className="relative w-full">
                {set.isComplete ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                ) : set.setNumber === room.currentSet ? (
                  <Circle className="w-6 h-6 text-gray-900 mx-auto animate-pulse" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 mx-auto" />
                )}
              </div>
              <span
                className={`text-xs mt-1 ${set.isComplete
                    ? "text-green-600"
                    : set.setNumber === room.currentSet
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
              >
                Set {set.setNumber}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Set Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 border border-gray-200 rounded-lg text-center bg-white">
          <p className="text-2xl font-bold text-gray-900">
            {currentSetData.attempts}
          </p>
          <p className="text-xs text-gray-600 mt-1">Attempts</p>
        </div>
        <div className="p-3 border border-gray-200 rounded-lg text-center bg-white">
          <p className="text-2xl font-bold text-blue-600">
            {averageSimilarity}%
          </p>
          <p className="text-xs text-gray-600 mt-1">Avg</p>
        </div>
        <div className="p-3 border border-gray-200 rounded-lg text-center bg-white">
          <p className="text-2xl font-bold text-green-600">
            {highestSimilarity}%
          </p>
          <p className="text-xs text-gray-600 mt-1">Best</p>
        </div>
      </div>
    </div>
  );
};
