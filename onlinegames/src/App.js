import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TicTacToe from "./pages/Tic-Tac-Toe";
import MemoryGame from "./pages/MemoryGame";
import SnakeGame from "./pages/snake";
import GameDetail from "./pages/GameDetail";
import Play from "./pages/play";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/play" element={<Play />} />
        <Route path="/t" element={<TicTacToe />} />
        <Route path="/m" element={<MemoryGame/>} />
        <Route path="/s" element={<SnakeGame/>} />
      </Routes>
    </Router>
  );
}

export default App;
