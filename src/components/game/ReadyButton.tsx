// client/src/components/game/ReadyButton.tsx

import React from "react";
import { Button } from "../ui/button";
import { useSocket } from "../../hooks/useSocket";
import { useGameStore } from "../../stores/gameStore";
import { CheckCircle } from "lucide-react";

export const ReadyButton: React.FC = () => {
  const { setReady } = useSocket();
  const { currentRoom, username } = useGameStore();

  const currentPlayer = currentRoom?.players.find(
    (p) => p.username === username,
  );
  const canReady = currentPlayer?.hasSubmitted && !currentPlayer?.isReady;
  const isReady = currentPlayer?.isReady || false;

  if (!currentPlayer?.hasSubmitted) {
    return null;
  }

  if (isReady) {
    return (
      <div className="flex items-center justify-center space-x-2 p-4 border border-green-600 rounded-lg bg-green-50">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-green-700 font-medium">You are ready!</span>
      </div>
    );
  }

  return (
    <Button
      onClick={setReady}
      disabled={!canReady}
      variant="default"
      className="w-full bg-green-600 hover:bg-green-700 text-white"
    >
      I'm Ready
    </Button>
  );
};
