// client/src/types/index.ts

export interface Player {
  id: string;
  username: string;
  socketId: string;
  isReady: boolean;
  currentWord: string | null;
  hasSubmitted: boolean;
}

export interface WordPair {
  player1Word: string;
  player2Word: string;
  similarity: number;
  timestamp: number;
}

export interface GameSet {
  setNumber: number;
  isComplete: boolean;
  attempts: number;
  history: WordPair[];
}

export interface Room {
  id: string;
  code: string;
  hostId: string;
  players: Player[];
  totalSets: number;
  currentSet: number;
  sets: GameSet[];
  status: "waiting" | "playing" | "completed";
  createdAt: number;
  isProcessing?: boolean;
}

export interface ComparisonResult {
  word1: string;
  word2: string;
  similarity: number;
  explanation: string;
}

export const SOCKET_EVENTS = {
  CREATE_ROOM: "create_room",
  JOIN_ROOM: "join_room",
  LEAVE_ROOM: "leave_room",
  SUBMIT_WORD: "submit_word",
  READY: "ready",
  CHANGE_WORD: "change_word",
  GET_ROOMS: "get_rooms",
  ROOM_CREATED: "room_created",
  ROOM_JOINED: "room_joined",
  ROOM_LEFT: "room_left",
  ROOM_UPDATED: "room_updated",
  PLAYER_JOINED: "player_joined",
  PLAYER_LEFT: "player_left",
  WORD_SUBMITTED: "word_submitted",
  PLAYER_READY: "player_ready",
  COMPARISON_RESULT: "comparison_result",
  SET_COMPLETED: "set_completed",
  GAME_COMPLETED: "game_completed",
  ROOMS_LIST: "rooms_list",
  ERROR: "error",
  RECONNECTED: "reconnected",
} as const;
