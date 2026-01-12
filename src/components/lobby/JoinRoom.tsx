// client/src/components/lobby/JoinRoom.tsx

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSocket } from "../../hooks/useSocket";
import { useGameStore } from "../../stores/gameStore";
import { LogIn } from "lucide-react";

export const JoinRoom: React.FC = () => {
  const [roomCode, setRoomCode] = useState("");
  const { joinRoom } = useSocket();
  const { username } = useGameStore();

  const handleJoin = () => {
    if (username && roomCode.trim().length === 6) {
      joinRoom(username, roomCode.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && roomCode.trim().length === 6) {
      handleJoin();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Room Code:</label>
        <Input
          type="text"
          value={roomCode}
          onChange={(e) =>
            setRoomCode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          onKeyPress={handleKeyPress}
          placeholder="Enter 6-digit code"
          className="text-lg text-center tracking-widest"
          maxLength={6}
        />
      </div>
      <Button
        onClick={handleJoin}
        disabled={roomCode.trim().length !== 6}
        variant="outline"
        className="w-full"
        size="lg"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Join Room
      </Button>
    </div>
  );
};
