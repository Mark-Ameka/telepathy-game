# 🧠 Telepathy Game

A real-time multiplayer word-matching game built with React, TypeScript, Socket.IO, and Ollama AI.

## 🎮 Game Overview

Two players compete to think of the same word through telepathy! Submit words, get AI-powered similarity scores, and work together to match exactly. Complete multiple sets to win the game.

## ✨ Features

- **Real-time Multiplayer** - Connect via WebSocket with Socket.IO
- **AI-Powered Word Comparison** - Uses Ollama for semantic similarity analysis (0-100%)
- **Room System** - Create or join rooms with unique 6-digit codes
- **Multiple Sets** - Configure 1-10 sets per game
- **Live Progress Tracking** - See attempts, averages, and best scores
- **Word History** - Review all previous attempts with similarity trends
- **Reconnection Support** - Rejoin if disconnected
- **Modern UI** - Clean black & white design with Tailwind CSS + ShadCN

## 🏗️ Architecture

```
telepathy-game/
├── client/                 # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages (Home, Lobby, Game)
│   │   ├── stores/         # Zustand state management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # Socket.IO service
│   │   └── types/          # TypeScript definitions
│   └── package.json
└── server/                 # Node.js backend (Express + Socket.IO)
    ├── src/
    │   ├── socket/         # WebSocket handlers
    │   ├── services/       # Ollama & room management
    │   └── types/          # Shared type definitions
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v18 or higher)
2. **Ollama** - Install from [ollama.ai](https://ollama.ai)
3. Pull an Ollama model:
   ```bash
   ollama pull mistral
   # or
   ollama pull llama2
   ```

### Installation

#### 1. Clone and Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=3001
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=mistral
CLIENT_URL=http://localhost:5173
EOF

# Start server
npm run dev
```

#### 2. Setup Frontend

```bash
# Open new terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_SOCKET_URL=http://localhost:3001
EOF

# Start client
npm run dev
```

#### 3. Start Ollama (if not running as service)

```bash
# Open new terminal
ollama serve
```

### Access the Game

Open your browser to: **http://localhost:5173**

## 🎯 How to Play

1. **Enter Your Name** on the home page
2. **Create a Room** (set number of sets) OR **Join a Room** (enter 6-digit code)
3. **Submit a Word** - Type any word you think matches your opponent's thought
4. **Choose Ready or Change**:
   - Click **"I'm Ready"** to lock in your word
   - Click **"Change Word"** to edit your submission
5. **View Results** - Once both players are ready, see:
   - Each player's word
   - Similarity percentage (0-100%)
   - Progress toward matching
6. **Keep Trying** - Submit new words until you both match (100% similarity)
7. **Complete Sets** - Match words to complete each set
8. **Win the Game** - Complete all sets to win!

## 🛠️ Technology Stack

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Zustand** - State management
- **Socket.IO Client** - Real-time communication
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - WebSocket server
- **TypeScript** - Type safety
- **Axios** - HTTP client for Ollama

### AI

- **Ollama** - Local LLM for word similarity analysis
- Supported models: Mistral, Llama2, or any Ollama model

## 📁 Key Files

### Frontend Components

- `WordInput.tsx` - Word submission interface
- `PlayerStatus.tsx` - Player state indicators
- `ReadyButton.tsx` - Ready/change controls
- `WordHistory.tsx` - Attempt history with trends
- `GameProgress.tsx` - Set progress & statistics
- `CreateRoom.tsx` - Room creation form
- `JoinRoom.tsx` - Join room interface
- `RoomList.tsx` - Available rooms list

### Backend Services

- `ollamaService.ts` - AI word comparison
- `roomManager.ts` - Room state management
- `handlers.ts` - Socket event handlers

### State Management

- `gameStore.ts` - Game state (room, players)
- `socketStore.ts` - Socket connection state

## 🔧 Configuration

### Environment Variables

**Server (.env)**

```env
PORT=3001                              # Server port
OLLAMA_URL=http://localhost:11434     # Ollama API endpoint
OLLAMA_MODEL=mistral                   # Ollama model name
CLIENT_URL=http://localhost:5173       # Frontend URL (for CORS)
```

**Client (.env)**

```env
VITE_SOCKET_URL=http://localhost:3001  # Backend URL
```

### Customize Ollama Model

Edit `server/.env` and change `OLLAMA_MODEL`:

```env
OLLAMA_MODEL=llama2
# or
OLLAMA_MODEL=phi
# or any other Ollama model
```

## 🎨 UI Customization

The game uses a black & white modern theme. To customize:

1. **Colors**: Edit `client/tailwind.config.js`
2. **Component Styles**: Modify files in `client/src/components/ui/`
3. **Theme**: Update CSS variables in `client/src/index.css`

## 🐛 Troubleshooting

### Ollama Connection Failed

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Start Ollama
ollama serve

# Verify model is downloaded
ollama list
```

### Socket Connection Error

- Ensure backend is running on port 3001
- Check `VITE_SOCKET_URL` in `client/.env`
- Check browser console for connection errors

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Game Mechanics

### Smart Word Matching

The game uses a two-step approach for word comparison:

1. **Direct Comparison** (Instant):
   - Removes all whitespace from both words
   - Converts to lowercase
   - Compares directly
   - Examples that match instantly:
     - "iron man" ↔ "ironman" ✅
     - "New York" ↔ "newyork" ✅
     - "Spider-Man" ↔ "spiderman" ✅

2. **AI Semantic Analysis** (If direct comparison fails):
   - Uses Ollama LLM for semantic similarity
   - Provides 0-100% similarity score
   - Explains the relationship between words

### Similarity Scoring (AI Analysis)

When words don't match directly, Ollama evaluates:

- **0-24%**: Completely unrelated
- **25-49%**: Loosely related
- **50-74%**: Somewhat related
- **75-99%**: Closely related
- **100%**: Perfect synonyms or semantic match

### Clear History Feature

- Reset attempt count and history at any time
- Keeps current set and progress
- Requires confirmation to prevent accidents
- Synced across both players
- Useful for starting fresh without losing set progress

### Set Completion

- Both players must submit the **exact same word** (case-insensitive)
- OR achieve 100% similarity score
- Progress to next set automatically
- Complete all sets to win the game

## 🚢 Production Deployment

### Backend

```bash
cd server
npm run build
npm start
```

### Frontend

```bash
cd client
npm run build
# Deploy 'dist' folder to your hosting service
```

### Docker (Optional)

Create `Dockerfile` for both client and server for containerized deployment.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- **Ollama** for providing local LLM capabilities
- **ShadCN** for beautiful UI components
- **Socket.IO** for real-time communication
- **Zustand** for simple state management

---

**Enjoy playing Telepathy Game! 🧠✨**

For issues or questions, please open a GitHub issue.
