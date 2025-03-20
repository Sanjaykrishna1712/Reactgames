import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function GameDetail() {
  const { id } = useParams(); // Get game ID from URL
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch game details from backend
  useEffect(() => {
    axios
      .get(`http://localhost:5000/game/${id}`) // Fetch from server
      .then((response) => {
        setGame(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!game) return <p>Game not found!</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{game.title}</h1>
      <img
        src={game.thumbnail}
        alt={game.title}
        style={{ width: "50%", borderRadius: "10px" }}
      />
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Platform:</strong> {game.platform}</p>
      <p><strong>Description:</strong> {game.description}</p>

      <Link to="/">
        <button
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
}

export default GameDetail;
