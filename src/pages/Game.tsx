// client/src/pages/Game.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { WordInput } from "../components/game/WordInput";
import { PlayerStatus } from "../components/game/PlayerStatus";
import { ReadyButton } from "../components/game/ReadyButton";
import { GameProgress } from "../components/game/GameProgress";
import { WordHistory } from "../components/game/WordHistory";
import { useGameStore } from "../stores/gameStore";
import { useSocket } from "../hooks/useSocket";
import { Brain, LogOut, Trophy } from "lucide-react";
import { ProcessingLoader } from "@/components/game/ProcessingLoader";

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const { currentRoom, username } = useGameStore();
  const { leaveRoom } = useSocket();

  useEffect(() => {
    if (!currentRoom || !username) {
      navigate("/lobby");
    }
  }, [currentRoom, username, navigate]);

  if (!currentRoom) {
    return null;
  }

  const currentPlayer = currentRoom.players.find(
    (p) => p.username === username,
  );
  const opponent = currentRoom.players.find((p) => p.username !== username);
  const currentSetData = currentRoom.sets[currentRoom.currentSet - 1];
  const isGameCompleted = currentRoom.status === "completed";
  const isProcessing = currentRoom.isProcessing || false;

  const handleLeave = () => {
    if (confirm("Are you sure you want to leave the game?")) {
      leaveRoom();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      {isProcessing && <ProcessingLoader />}

      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Room: {currentRoom.code}</h1>
              <p className="text-sm text-gray-600">
                Set {currentRoom.currentSet} of {currentRoom.totalSets}
              </p>
            </div>
          </div>
          <Button onClick={handleLeave} variant="destructive" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Leave Game
          </Button>
        </div>

        {isGameCompleted ? (
          /* Game Completed */
          <div className="text-center py-12">
            <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-500" />
            <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
            <p className="text-xl text-gray-600 mb-8">
              You've completed all {currentRoom.totalSets} sets!
            </p>
            <Button onClick={handleLeave} size="lg">
              Back to Lobby
            </Button>
          </div>
        ) : currentRoom.players.length < 2 ? (
          /* Waiting for Opponent */
          <div className="text-center py-12">
            <div className="animate-pulse mb-6">
              <Brain className="w-24 h-24 mx-auto text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Waiting for opponent...</h2>
            <p className="text-gray-600 mb-4">
              Share this room code with a friend:
            </p>
            <div className="inline-block px-8 py-4 bg-gray-900 text-white rounded-lg">
              <p className="text-4xl font-bold font-mono tracking-wider">
                {currentRoom.code}
              </p>
            </div>
          </div>
        ) : (
          /* Active Game */
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Game Play */}
            <div className="lg:col-span-2 space-y-6">
              {/* Player Status Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {currentPlayer && (
                  <PlayerStatus player={currentPlayer} isCurrentPlayer={true} />
                )}
                {opponent && (
                  <PlayerStatus player={opponent} isCurrentPlayer={false} />
                )}
              </div>

              {/* Word Input / Ready */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Turn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <WordInput />
                  <ReadyButton />
                </CardContent>
              </Card>

              {/* History */}
              <Card>
                <CardHeader>
                  <CardTitle>Attempt History</CardTitle>
                </CardHeader>
                <CardContent>
                  <WordHistory history={currentSetData.history} />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Progress */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Game Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <GameProgress room={currentRoom} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>• Think about what your opponent might choose</p>
                  <p>• Use the similarity scores to guide your next guess</p>
                  <p>• Higher percentages mean you're getting closer</p>
                  <p>• You need 100% to match and complete the set</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
