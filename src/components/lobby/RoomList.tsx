// client/src/components/lobby/RoomList.tsx

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSocket } from "../../hooks/useSocket";
import { useGameStore } from "../../stores/gameStore";
import { socketService } from "../../services/socket";
import { SOCKET_EVENTS, Room } from "../../types";
import { Users, RefreshCw } from "lucide-react";

export const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { joinRoom } = useSocket();
  const { username } = useGameStore();

  const fetchRooms = () => {
    socketService.emit(SOCKET_EVENTS.GET_ROOMS);
  };

  useEffect(() => {
    const socket = socketService.getSocket();
    if (!socket) return;

    socket.on(SOCKET_EVENTS.ROOMS_LIST, (roomsList: Room[]) => {
      setRooms(roomsList);
    });

    fetchRooms();

    // Refresh every 5 seconds
    const interval = setInterval(fetchRooms, 5000);

    return () => {
      socket.off(SOCKET_EVENTS.ROOMS_LIST);
      clearInterval(interval);
    };
  }, []);

  const handleJoinRoom = (roomCode: string) => {
    if (username) {
      joinRoom(username, roomCode);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Available Rooms</CardTitle>
          <Button onClick={fetchRooms} variant="ghost" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {rooms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No available rooms</p>
            <p className="text-sm">Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {rooms.map((room) => (
              <div
                key={room.code}
                className="p-3 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors bg-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-lg font-bold text-gray-900">
                      {room.code}
                    </p>
                    <p className="text-sm text-gray-600">
                      {room.players[0]?.username}'s room • {room.totalSets} sets
                    </p>
                  </div>
                  <Button onClick={() => handleJoinRoom(room.code)} size="sm">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
