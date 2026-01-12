// client/src/hooks/useSocket.ts

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socketService } from "../services/socket";
import { useGameStore } from "../stores/gameStore";
import { useSocketStore } from "../stores/socketStore";
import { SOCKET_EVENTS, Room, ComparisonResult } from "../types/index";

export const useSocket = () => {
  const navigate = useNavigate();
  const { setCurrentRoom, updateRoom, reset } = useGameStore();
  const { setSocket, setIsConnected } = useSocketStore();

  useEffect(() => {
    const socket = socketService.connect();
    setSocket(socket);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on(SOCKET_EVENTS.ROOM_CREATED, (room: Room) => {
      setCurrentRoom(room);
      navigate("/game");
    });

    socket.on(SOCKET_EVENTS.ROOM_JOINED, (room: Room) => {
      setCurrentRoom(room);
      navigate("/game");
    });

    socket.on(SOCKET_EVENTS.PLAYER_JOINED, (room: Room) => {
      updateRoom(room);
    });

    socket.on(SOCKET_EVENTS.ROOM_UPDATED, (room: Room) => {
      updateRoom(room);
    });

    socket.on(SOCKET_EVENTS.PLAYER_LEFT, (room: Room) => {
      updateRoom(room);
    });

    socket.on(SOCKET_EVENTS.COMPARISON_RESULT, (result: ComparisonResult) => {
      console.log("Comparison result:", result);
    });

    socket.on(
      SOCKET_EVENTS.SET_COMPLETED,
      ({ setNumber, room }: { setNumber: number; room: Room }) => {
        console.log(`Set ${setNumber} completed!`);
        updateRoom(room);
      },
    );

    socket.on(SOCKET_EVENTS.GAME_COMPLETED, (room: Room) => {
      console.log("Game completed!");
      updateRoom(room);
    });

    socket.on(SOCKET_EVENTS.ERROR, ({ message }: { message: string }) => {
      console.error("Socket error:", message);
      alert(message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(SOCKET_EVENTS.ROOM_CREATED);
      socket.off(SOCKET_EVENTS.ROOM_JOINED);
      socket.off(SOCKET_EVENTS.PLAYER_JOINED);
      socket.off(SOCKET_EVENTS.ROOM_UPDATED);
      socket.off(SOCKET_EVENTS.PLAYER_LEFT);
      socket.off(SOCKET_EVENTS.COMPARISON_RESULT);
      socket.off(SOCKET_EVENTS.SET_COMPLETED);
      socket.off(SOCKET_EVENTS.GAME_COMPLETED);
      socket.off(SOCKET_EVENTS.ERROR);
    };
  }, []);

  const createRoom = (username: string, totalSets: number) => {
    socketService.emit(SOCKET_EVENTS.CREATE_ROOM, { username, totalSets });
  };

  const joinRoom = (username: string, roomCode: string) => {
    socketService.emit(SOCKET_EVENTS.JOIN_ROOM, { username, roomCode });
  };

  const leaveRoom = () => {
    socketService.emit(SOCKET_EVENTS.LEAVE_ROOM);
    reset();
    navigate("/lobby");
  };

  const submitWord = (word: string) => {
    socketService.emit(SOCKET_EVENTS.SUBMIT_WORD, { word });
  };

  const setReady = () => {
    socketService.emit(SOCKET_EVENTS.READY);
  };

  const changeWord = () => {
    socketService.emit(SOCKET_EVENTS.CHANGE_WORD);
  };

  const getRooms = () => {
    socketService.emit(SOCKET_EVENTS.GET_ROOMS);
  };

  return {
    createRoom,
    joinRoom,
    leaveRoom,
    submitWord,
    setReady,
    changeWord,
    getRooms,
  };
};
