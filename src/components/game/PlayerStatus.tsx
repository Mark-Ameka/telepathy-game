// client/src/components/game/PlayerStatus.tsx

import React from "react";
import { Player } from "../../types";
import { CheckCircle, Clock, Edit } from "lucide-react";

interface PlayerStatusProps {
  player: Player;
  isCurrentPlayer: boolean;
}

export const PlayerStatus: React.FC<PlayerStatusProps> = ({
  player,
  isCurrentPlayer,
}) => {
  const getStatusIcon = () => {
    if (player.isReady) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (player.hasSubmitted) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }
    return <Edit className="w-5 h-5 text-gray-500" />;
  };

  const getStatusText = () => {
    if (player.isReady) return "Ready";
    if (player.hasSubmitted) return "Submitted";
    return "Typing...";
  };

  return (
    <div
      className={`p-4 border rounded-lg ${isCurrentPlayer ? "border-white bg-gray-900" : "border-gray-700 bg-black"}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold">
            {player.username[0].toUpperCase()}
          </div>
          <span className="font-medium">{player.username}</span>
          {isCurrentPlayer && (
            <span className="text-xs text-gray-400">(You)</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm text-gray-400">{getStatusText()}</span>
        </div>
      </div>
      {player.hasSubmitted && player.currentWord && (
        <div className="mt-2 p-2 bg-gray-800 rounded text-center">
          <p className="text-xs text-gray-400 mb-1">Word submitted</p>
          <p className="text-lg font-bold">{player.currentWord}</p>
        </div>
      )}
    </div>
  );
};
