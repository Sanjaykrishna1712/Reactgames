import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("shooter");

  const navigate = useNavigate();
  // Fetch games from backend
  useEffect(() => {
    axios
      .get(`http://localhost:5000/games?category=${category}`)
      .then((response) => setGames(response.data))
      .catch((error) => console.error("Error fetching games:", error));
  }, [category]);

  // Filter games based on search input
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Free To Play Games</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "50%",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px",
          marginLeft: "10px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        <option value="shooter">Shooter</option>
        <option value="mmorpg">MMORPG</option>
        <option value="moba">MOBA</option>
        <option value="strategy">Strategy</option>
        <option value="racing">Racing</option>
      </select>
      <button
    style={{
      padding: "10px 20px",
      background: "green",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    }}
    onClick={() => navigate("/play")}
  >
    Play
  </button>
      {/* Grid Layout for Games */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {filteredGames.map((game) => (
          <div
            key={game.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "transform 0.2s",
              width: "250px",
              maxWidth: "100%",
              margin: "auto",
            }}
          >
            <img
              src={game.thumbnail}
              alt={game.title}
              width="100%"
              height="150px"
              style={{
                borderRadius: "10px",
                objectFit: "cover",
                maxWidth: "100%",
              }}
            />
            <h3>{game.title}</h3>
            <Link to={`/game/${game.id}`}>
              <button
                style={{
                  padding: "10px 20px",
                  background: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Info
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
