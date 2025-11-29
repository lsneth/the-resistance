import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, type PlayerCount } from '../context/GameContext';
import { Play, RotateCcw } from 'lucide-react';

export default function Home() {
  const { startGame, continueGame, hasSavedGame } = useGame();
  const navigate = useNavigate();
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);

  const handleStartClick = () => {
    setShowPlayerSelect(true);
  };

  const handlePlayerCountSelect = (count: PlayerCount) => {
    startGame(count);
    navigate('/board');
  };

  const handleContinue = () => {
    continueGame();
    navigate('/board');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-board-bg text-white p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-resistance-dark/20 via-board-bg to-board-bg z-0" />
      
      <div className="z-10 flex flex-col items-center space-y-12 max-w-md w-full">
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 font-sans uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            The Resistance
          </h1>
        </div>

        <div className="flex flex-col space-y-4 w-full">
          {!showPlayerSelect ? (
            <>
              <button
                onClick={handleStartClick}
                className="group relative w-full py-4 px-6 bg-gradient-to-r from-resistance-dark to-blue-900/50 border border-resistance-blue/30 rounded-lg overflow-hidden transition-all hover:border-resistance-blue hover:shadow-[0_0_20px_rgba(0,191,255,0.2)]"
              >
                <div className="absolute inset-0 bg-resistance-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-3 text-xl font-semibold tracking-wide">
                  <Play className="w-5 h-5" />
                  Start
                </span>
              </button>

              {hasSavedGame && (
                <button
                  onClick={handleContinue}
                  className="group relative w-full py-4 px-6 bg-board-card border border-gray-700 rounded-lg overflow-hidden transition-all hover:border-gray-500"
                >
                  <span className="relative flex items-center justify-center gap-3 text-xl font-semibold tracking-wide text-gray-300 group-hover:text-white">
                    <RotateCcw className="w-5 h-5" />
                    Continue
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-center">
                <h2 className="text-xl text-resistance-blue font-medium mb-2">Select the number of players</h2>
                <div className="grid grid-cols-3 gap-3">
                  {([5, 6, 7, 8, 9, 10] as PlayerCount[]).map((count) => (
                    <button
                      key={count}
                      onClick={() => handlePlayerCountSelect(count)}
                      className="py-3 px-4 bg-board-surface border border-gray-700 rounded hover:bg-resistance-blue/20 hover:border-resistance-blue transition-colors text-lg font-bold"
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowPlayerSelect(false)}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                CANCEL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
