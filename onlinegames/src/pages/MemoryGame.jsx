import React, { useState, useEffect } from "react";
import "../styles/MemoryGame.css";
import { Link } from "react-router-dom";
const symbols = [
  "🍎", "🍌", "🍇", "🍉", "🍍", "🥕", "🥑", "🍒", "🌽", "🍕",
  "🍎", "🍌", "🍇", "🍉", "🍍", "🥕", "🥑", "🍒", "🌽", "🍕"
];

const shuffleCards = () => {
  return [...symbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({ id: index, symbol, isFlipped: false, isMatched: false }));
};

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.symbol === second.symbol) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.symbol === first.symbol ? { ...card, isMatched: true } : card
          )
        );
        setScores(prevScores => ({
          ...prevScores,
          [playerTurn === 1 ? "player1" : "player2"]: prevScores[playerTurn === 1 ? "player1" : "player2"] + 1
        }));
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === first.id || card.id === second.id ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
          setPlayerTurn(playerTurn === 1 ? 2 : 1);
        }, 1000);
      }
    }
  }, [flippedCards, playerTurn]);

  // Check for game over (all pairs matched)
  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      setGameOver(true);
      if (scores.player1 > scores.player2) {
        setWinner("Player 1 Wins! 🎉");
      } else if (scores.player2 > scores.player1) {
        setWinner("Player 2 Wins! 🎉");
      } else {
        setWinner("It's a Draw! 🤝");
      }
    }
  }, [cards, scores]);

  const handleCardClick = (card) => {
    if (gameOver || card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    setCards(prevCards =>
      prevCards.map(c =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      )
    );
    setFlippedCards([...flippedCards, card]);
  };

  const restartGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setPlayerTurn(1);
    setScores({ player1: 0, player2: 0 });
    setGameOver(false);
    setWinner("");
  };

  return (
    <div className="memory-game-container">
      <h1>Memory Game</h1>
      {gameOver ? (
        <h2 className="winner-text">{winner}</h2>
      ) : (
        <h2>Player {playerTurn}'s Turn</h2>
      )}
      <div className="scores">
        <p>Player 1: {scores.player1}</p>
        <p>Player 2: {scores.player2}</p>
      </div>
      <div className="board1">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            {card.isFlipped || card.isMatched ? card.symbol : "❓"}
          </div>
        ))}
      </div>
      <button className="reset-btn" onClick={restartGame}>Restart Game</button>
      <button className="reset-btn">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Go back to Home
              </Link>
            </button>
    </div>
    
  );
};

export default MemoryGame;
