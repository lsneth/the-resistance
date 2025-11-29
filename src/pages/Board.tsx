import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { MISSION_COUNTS, FAILS_REQUIRED, ROLE_COUNTS } from '../lib/game-rules';
import { cn } from '../lib/utils';
import { LogOut } from 'lucide-react';

export default function Board() {
  const { 
    playerCount, 
    missionStatus, 
    voteTrack, 
    toggleMission, 
    setVote, 
    resetGame,
    gameStarted 
  } = useGame();
  const navigate = useNavigate();

  if (!gameStarted) {
    navigate('/');
    return null;
  }

  const missionCounts = MISSION_COUNTS[playerCount];
  const failsRequired = FAILS_REQUIRED[playerCount];
  const roleCounts = ROLE_COUNTS[playerCount];

  const handleReset = () => {
    if (confirm('Are you sure you want to abort the mission? This will reset all progress.')) {
      resetGame();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-board-bg text-white p-3 md:p-4 flex flex-col items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-resistance-blue to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 via-board-bg to-board-bg -z-10" />

      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold tracking-wider uppercase">The Resistance</h1>
        <button 
          onClick={handleReset}
          className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
          title="Abort Mission"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center gap-8">
        
        {/* Mission Track */}
        <div className="w-full max-w-3xl bg-board-surface/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
          <div className="relative w-full flex justify-between items-center px-2 md:px-8">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-800 rounded-full" style={{ zIndex: 0 }} />
            {missionStatus.map((status, index) => (
              <div key={index} className="flex flex-col items-center gap-2 relative group" style={{ zIndex: 1 }}>
                {failsRequired[index] && (
                  <span className="absolute -top-6 text-[9px] md:text-[10px] uppercase tracking-tighter text-gray-400 whitespace-nowrap bg-board-bg px-1.5 border border-gray-800 rounded-full">
                    Two Fails Req.
                  </span>
                )}
                
                <button
                  onClick={() => toggleMission(index)}
                  className={cn(
                    "w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold transition-all duration-300 border-4 shadow-lg",
                    status === 'default' && "bg-board-card border-gray-600 text-gray-400 hover:border-gray-400",
                    status === 'success' && "bg-resistance-blue/20 border-resistance-blue text-resistance-blue shadow-[0_0_30px_rgba(0,191,255,0.4)]",
                    status === 'fail' && "bg-spy-red/20 border-spy-red text-spy-red shadow-[0_0_30px_rgba(255,65,54,0.4)]"
                  )}
                >
                  {missionCounts[index]}
                </button>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Mission {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vote Track & Info Panel */}
        <div className="w-full max-w-3xl flex justify-between items-end">
          {/* Vote Track */}
          <div className="flex flex-col items-start gap-3">
            <span className="text-xs uppercase tracking-widest text-gray-400">Vote Track</span>
            <div className="flex gap-3 md:gap-6">
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setVote(num)}
                  className={cn(
                    "w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-base font-bold transition-all duration-200 border-2",
                    voteTrack === num 
                      ? "bg-white text-black border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                      : "bg-transparent border-gray-700 text-gray-600 hover:border-gray-500",
                    num === 5 && voteTrack !== 5 && "border-spy-red/50 text-spy-red/50 hover:border-spy-red hover:text-spy-red",
                    num === 5 && voteTrack === 5 && "!bg-spy-red !border-spy-red !text-white shadow-[0_0_20px_rgba(255,65,54,0.5)]"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="flex items-center gap-6 text-sm pb-2">
            <span className="text-resistance-blue">{roleCounts.resistance} Resistance</span>
            <span className="text-gray-600">|</span>
            <span className="text-spy-red">{roleCounts.spies} Spies</span>
          </div>
        </div>

      </main>
      
      <div className="absolute bottom-2 right-3 text-xs text-gray-700">
        {playerCount} Players
      </div>
    </div>
  );
}
