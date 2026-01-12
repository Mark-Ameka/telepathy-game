// client/src/stores/gameStore.ts

import { create } from "zustand";
import { Room, Player } from "../types";

interface GameState {
  currentRoom: Room | null;
  username: string;
  currentPlayer: Player | null;
  setCurrentRoom: (room: Room | null) => void;
  setUsername: (username: string) => void;
  updateRoom: (room: Room) => void;
  getCurrentPlayer: () => Player | null;
  getOpponentPlayer: () => Player | null;
  reset: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentRoom: null,
  username: "",
  currentPlayer: null,

  setCurrentRoom: (room) => set({ currentRoom: room }),

  setUsername: (username) => set({ username }),

  updateRoom: (room) => set({ currentRoom: room }),

  getCurrentPlayer: () => {
    const { currentRoom, username } = get();
    if (!currentRoom) return null;
    return currentRoom.players.find((p) => p.username === username) || null;
  },

  getOpponentPlayer: () => {
    const { currentRoom, username } = get();
    if (!currentRoom || currentRoom.players.length < 2) return null;
    return currentRoom.players.find((p) => p.username !== username) || null;
  },

  reset: () => set({ currentRoom: null, currentPlayer: null }),
}));
