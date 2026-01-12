// client/src/components/game/PlayerStatus.tsx

import React from "react";
import { Player } from "../../types";
import { CheckCircle, Clock, Edit, EyeOff } from "lucide-react";

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
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (player.hasSubmitted) {
      return <Clock className="w-5 h-5 text-yellow-600" />;
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
      className={`p-4 border rounded-lg ${isCurrentPlayer ? "border-gray-900 bg-gray-50" : "border-gray-300 bg-white"}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-sm font-bold text-white">
            {player.username[0].toUpperCase()}
          </div>
          <span className="font-medium text-gray-900">{player.username}</span>
          {isCurrentPlayer && (
            <span className="text-xs text-gray-500">(You)</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm text-gray-600">{getStatusText()}</span>
        </div>
      </div>
      {player.hasSubmitted && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-center border border-gray-200">
          {isCurrentPlayer && player.currentWord ? (
            <>
              <p className="text-xs text-gray-500 mb-1">Your word</p>
              <p className="text-lg font-bold text-gray-900">
                {player.currentWord}
              </p>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-500 mb-1">Word submitted</p>
              <div className="flex items-center justify-center space-x-2">
                <EyeOff className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-400">Hidden</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
