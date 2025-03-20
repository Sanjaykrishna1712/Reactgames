import React, { useState } from "react";
import "../styles/TicTacToe.css"; // CSS file for styling
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningSquares = result ? result.winningSquares : [];

  // Check for a draw (no winner and all squares are filled)
  const isDraw = !winner && squares.every((square) => square !== null);

  const handleClick = (index) => {
    if (squares[index] || winner || isDraw) return; // Disable clicking if game is over
    const newSquares = [...squares];
    newSquares[index] = isXTurn ? "X" : "O";
    setSquares(newSquares);
    setIsXTurn(!isXTurn);
  };

  return (
    <div className="tictactoe-container">
      <h1>Tic-Tac-Toe</h1>
      <h2>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "Draw!"
          : `Next Player: ${isXTurn ? "X" : "O"}`}
      </h2>
      <div className="board">
        {squares.map((square, index) => (
          <button
            key={index}
            className={`square ${winningSquares.includes(index) ? "winner" : ""}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="reset-btn" onClick={() => setSquares(Array(9).fill(null))}>
        Restart Game
      </button>
      <button className="reset-btn">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Go back to Home
        </Link>
      </button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: pattern }; // Return winner and winning squares
    }
  }
  return null;
};

export default TicTacToe;
