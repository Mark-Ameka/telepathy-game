// client/src/pages/Lobby.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CreateRoom } from "../components/lobby/CreateRoom";
import { JoinRoom } from "../components/lobby/JoinRoom";
import { RoomList } from "../components/lobby/RoomList";
import { useGameStore } from "../stores/gameStore";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export const Lobby: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useGameStore();

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Telepathy Game</h1>
              <p className="text-sm text-gray-600">Welcome, {username}!</p>
            </div>
          </div>
          <Button onClick={() => navigate("/")} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Room</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateRoom />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Join Room</CardTitle>
            </CardHeader>
            <CardContent>
              <JoinRoom />
            </CardContent>
          </Card>
        </div>

        <RoomList />
      </div>
    </div>
  );
};
