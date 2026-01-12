// client/src/components/game/WordInput.tsx

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSocket } from "../../hooks/useSocket";
import { useGameStore } from "../../stores/gameStore";

export const WordInput: React.FC = () => {
  const [word, setWord] = useState("");
  const { submitWord, changeWord } = useSocket();
  const { currentRoom, username } = useGameStore();

  const currentPlayer = currentRoom?.players.find(
    (p) => p.username === username,
  );
  const canSubmit = word.trim().length > 0 && !currentPlayer?.hasSubmitted;
  const hasSubmitted = currentPlayer?.hasSubmitted || false;

  const handleSubmit = () => {
    if (canSubmit) {
      submitWord(word.trim());
      setWord("");
    }
  };

  const handleChange = () => {
    changeWord();
    setWord("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canSubmit) {
      handleSubmit();
    }
  };

  if (hasSubmitted) {
    return (
      <div className="space-y-4">
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
          <p className="text-sm text-gray-400 mb-2">Your word:</p>
          <p className="text-2xl font-bold">{currentPlayer?.currentWord}</p>
        </div>
        <Button onClick={handleChange} variant="outline" className="w-full">
          Change Word
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Enter your word:
        </label>
        <Input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a word..."
          className="text-lg"
          autoFocus
        />
      </div>
      <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full">
        Submit Word
      </Button>
    </div>
  );
};
