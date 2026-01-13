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
import { ProcessingLoader } from "../components/game/ProcessingLoader";
import { SetCompleteDialog } from "../components/game/SetCompleteDialog";
import { CategorySelector } from "../components/game/CategorySelector";
import { useGameStore } from "../stores/gameStore";
import { useSocket } from "../hooks/useSocket";
import { Brain, LogOut, Trophy, Tag } from "lucide-react";

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const { currentRoom, username } = useGameStore();
  const { leaveRoom, continueToNextSet, clearHistory, selectCategory } =
    useSocket();

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
  const showSetComplete = currentRoom.showSetComplete || false;
  const waitingForCategory = currentRoom.waitingForCategory || false;
  const isCategoryChooser =
    currentSetData.categoryChooser === currentPlayer?.id;
  const showCategorySelector = waitingForCategory && isCategoryChooser;

  // Get the matched word from the last history entry
  const lastMatch =
    currentSetData.history.length > 0
      ? currentSetData.history[currentSetData.history.length - 1]
      : null;
  const matchedWord =
    lastMatch?.similarity === 100 ? lastMatch.player1Word : "";

  const handleLeave = () => {
    if (confirm("Are you sure you want to leave the game?")) {
      leaveRoom();
    }
  };

  const handleContinue = () => {
    continueToNextSet();
  };

  const handleClearHistory = () => {
    if (
      confirm(
        "Are you sure you want to clear the attempt history? This will reset your attempt count.",
      )
    ) {
      clearHistory();
    }
  };

  const handleSelectCategory = (category: string) => {
    selectCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      {!isGameCompleted && <ProcessingLoader isOpen={isProcessing} />}

      <SetCompleteDialog
        isOpen={showSetComplete}
        setNumber={currentRoom.currentSet}
        totalSets={currentRoom.totalSets}
        matchedWord={matchedWord}
        attempts={currentSetData.attempts}
        onContinue={handleContinue}
      />

      {!isGameCompleted && (
        <CategorySelector
          isOpen={showCategorySelector}
          playerName={currentPlayer?.username || ""}
          onSelect={handleSelectCategory}
        />
      )}

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
                {currentSetData.category && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    <Tag className="w-3 h-3 mr-1" />
                    {currentSetData.category}
                  </span>
                )}
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
        ) : waitingForCategory ? (
          /* Waiting for Category Selection */
          <div className="text-center py-12">
            <div className="mb-6">
              <Tag className="w-24 h-24 mx-auto text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {isCategoryChooser
                ? "Choose a Category"
                : "Waiting for Category..."}
            </h2>
            <p className="text-gray-600">
              {isCategoryChooser
                ? "Select a category for this set"
                : `${currentSetData.categoryChooser === opponent?.id && opponent ? opponent.username : "Your opponent"} is choosing the category...`}
            </p>
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
                  <div className="flex items-center justify-between">
                    <CardTitle>Attempt History</CardTitle>
                    {currentSetData.history.length > 0 && (
                      <Button
                        onClick={handleClearHistory}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                        Clear History
                      </Button>
                    )}
                  </div>
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
                  {currentSetData.category && (
                    <p className="font-medium text-purple-700">
                      🏷️ Think of words in: {currentSetData.category}
                    </p>
                  )}
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
