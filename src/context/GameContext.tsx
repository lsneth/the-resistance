import React, { createContext, useContext, useEffect, useState } from 'react';

export type MissionStatus = 'default' | 'success' | 'fail';
export type PlayerCount = 5 | 6 | 7 | 8 | 9 | 10;

interface GameState {
  playerCount: PlayerCount;
  missionStatus: MissionStatus[];
  voteTrack: number;
  gameStarted: boolean;
}

interface GameContextType extends GameState {
  startGame: (count: PlayerCount) => void;
  continueGame: () => void;
  toggleMission: (index: number) => void;
  setVote: (index: number) => void;
  resetGame: () => void;
  hasSavedGame: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'resistance_game_state';

const INITIAL_STATE: GameState = {
  playerCount: 5,
  missionStatus: ['default', 'default', 'default', 'default', 'default'],
  voteTrack: 0,
  gameStarted: false,
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [hasSavedGame, setHasSavedGame] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setHasSavedGame(true);
    }
  }, []);

  const saveState = (newState: GameState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
    setHasSavedGame(true);
  };

  const startGame = (count: PlayerCount) => {
    const newState: GameState = {
      ...INITIAL_STATE,
      playerCount: count,
      gameStarted: true,
    };
    saveState(newState);
  };

  const continueGame = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setState(JSON.parse(saved));
    }
  };

  const toggleMission = (index: number) => {
    const newStatus = [...state.missionStatus];
    const current = newStatus[index];
    if (current === 'default') newStatus[index] = 'success'; // Blue
    else if (current === 'success') newStatus[index] = 'fail'; // Red
    else newStatus[index] = 'default';

    saveState({ ...state, missionStatus: newStatus });
  };

  const setVote = (index: number) => {
    saveState({ ...state, voteTrack: index });
  };

  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_STATE);
    setHasSavedGame(false);
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        startGame,
        continueGame,
        toggleMission,
        setVote,
        resetGame,
        hasSavedGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
