// client/src/components/lobby/CreateRoom.tsx

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSocket } from "../../hooks/useSocket";
import { useGameStore } from "../../stores/gameStore";
import { Plus } from "lucide-react";

export const CreateRoom: React.FC = () => {
  const [totalSets, setTotalSets] = useState(3);
  const [usesCategories, setUsesCategories] = useState(false);
  const { createRoom } = useSocket();
  const { username } = useGameStore();

  const handleCreate = () => {
    if (username && totalSets > 0 && totalSets <= 10) {
      createRoom(username, totalSets, usesCategories);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900">
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

      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
        <input
          type="checkbox"
          id="usesCategories"
          checked={usesCategories}
          onChange={(e) => setUsesCategories(e.target.checked)}
          className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
        />
        <label
          htmlFor="usesCategories"
          className="text-sm font-medium text-gray-900 cursor-pointer flex-1"
        >
          Use Categories
        </label>
      </div>
      {usesCategories && (
        <p className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded p-2">
          💡 A random player will choose a category at the start of each set
        </p>
      )}

      <Button onClick={handleCreate} className="w-full" size="lg">
        <Plus className="w-4 h-4 mr-2" />
        Create Room
      </Button>
    </div>
  );
};
