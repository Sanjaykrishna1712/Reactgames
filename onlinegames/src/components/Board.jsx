import React, { useState } from "react";
import Square from "./square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = [...squares];
    newSquares[index] = isXTurn ? "X" : "O";
    setSquares(newSquares);
    setIsXTurn(!isXTurn);
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next Player: ${isXTurn ? "X" : "O"}`;

  return (
    <div>
      <h2>{status}</h2>
      <div className="board">
        {squares.map((square, index) => (
          <Square key={index} value={square} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button className="reset-btn" onClick={() => setSquares(Array(9).fill(null))}>
        Restart Game
      </button>
    </div>
  );
};

// Function to check for a winner
const calculateWinner = (squares) => {
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default Board;
