import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Board from './pages/Board';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
