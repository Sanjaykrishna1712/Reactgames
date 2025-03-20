import React, { useState, useEffect } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameOver) return;
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [snake, direction, gameOver]);

  function moveSnake() {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true);
      return;
    }

    if (head.x === food.x && head.y === food.y) {
      newSnake.unshift(food);
      setFood(generateFood());
      setScore(score + 10);
    } else {
      newSnake.pop();
      newSnake.unshift(head);
    }

    setSnake(newSnake);
  }

  function generateFood() {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  function restartGame() {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Snake Game</h2>
      <h3>Score: {score}</h3>
      {gameOver ? <h3>Game Over!</h3> : null}
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "400px",
          background: "lightgray",
          margin: "auto",
          border: "2px solid black",
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              backgroundColor: index === 0 ? "darkgreen" : "green",
              left: `${segment.x * 20}px`,
              top: `${segment.y * 20}px`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            backgroundColor: "red",
            borderRadius: "50%",
            left: `${food.x * 20}px`,
            top: `${food.y * 20}px`,
          }}
        />
      </div>
      <button onClick={restartGame} style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}>Restart</button>
      <button onClick={() => window.location.href = "/"} style={{ marginTop: "10px", padding: "10px", fontSize: "16px", marginLeft: "10px" }}>Home</button>
    </div>
  );
};

export default SnakeGame;
