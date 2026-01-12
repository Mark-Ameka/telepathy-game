// client/src/components/lobby/CreateRoom.tsx

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSocket } from "../../hooks/useSocket";
import { useGameStore } from "../../stores/gameStore";
import { Plus } from "lucide-react";

export const CreateRoom: React.FC = () => {
  const [totalSets, setTotalSets] = useState(3);
  const { createRoom } = useSocket();
  const { username } = useGameStore();

  const handleCreate = () => {
    if (username && totalSets > 0 && totalSets <= 10) {
      createRoom(username, totalSets);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Number of Sets (1-10):
        </label>
        <Input
          type="number"
          value={totalSets}
          onChange={(e) => setTotalSets(parseInt(e.target.value) || 1)}
          min={1}
          max={10}
          className="text-lg"
        />
        <p className="text-xs text-gray-500 mt-1">
          Each set requires both players to find the same word
        </p>
      </div>
      <Button onClick={handleCreate} className="w-full" size="lg">
        <Plus className="w-4 h-4 mr-2" />
        Create Room
      </Button>
    </div>
  );
};
