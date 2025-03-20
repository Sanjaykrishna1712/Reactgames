import { useState } from "react";
import { Link } from "react-router-dom";

const games = [
  { name: "Tic Tac Toe", image: "/images/tic.png", link: "/t" },
  { name: "Memory Game", image: "/images/memory.jpeg", link: "/m" },
  { name: "Snake Game", image: "/images/snake.webp", link: "/s" },
];

function Play() { // ✅ Renamed from play to Play
  const [search, setSearch] = useState("");

  // Filter games based on search input
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Home</h1>

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

      {/* Grid Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", justifyContent: "center" }}>
        {filteredGames.map((game, index) => (
          <Link key={index} to={game.link} style={{ textDecoration: "none" }}>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "transform 0.2s",
              }}
            >
              <img
                src={game.image}
                alt={game.name}
                width="150"
                height="150"
                style={{ borderRadius: "10px" }}
              />
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>{game.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Play; // ✅ Updated export name
