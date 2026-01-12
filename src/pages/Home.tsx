// client/src/pages/Home.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useGameStore } from "../stores/gameStore";
import { Brain } from "lucide-react";

export const Home: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useGameStore();

  const handleStart = () => {
    if (name.trim()) {
      setUsername(name.trim());
      navigate("/lobby");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim()) {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-400 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-black" />
            </div>
          </div>
          <CardTitle className="text-3xl mb-2">Telepathy Game</CardTitle>
          <p className="text-gray-400 text-sm">
            Connect minds, guess the same word
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter your name:
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your name"
              className="text-lg"
              autoFocus
            />
          </div>
          <Button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full"
            size="lg"
          >
            Start Playing
          </Button>

          <div className="pt-4 border-t border-gray-800">
            <h3 className="font-medium mb-2 text-sm">How to Play:</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Both players think of a word</li>
              <li>• Submit your word and get ready</li>
              <li>• See how similar your words are</li>
              <li>• Match exactly to complete a set</li>
              <li>• Complete all sets to win!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
