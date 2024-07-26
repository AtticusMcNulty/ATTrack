import React from "react";
import "../css/History.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function History({ gameHistory, user }) {
  const [gameVisibilities, setGameVisibilities] = React.useState(
    gameHistory.map(() => false)
  );

  const toggleVisibility = (index) => {
    setGameVisibilities((prev) => {
      const newVisibilities = [...prev];
      newVisibilities[index] = !newVisibilities[index];
      return newVisibilities;
    });
  };

  const gamesMapping = gameHistory.map((game, gameIndex) => {
    const excludedStats = ["date", "scored", "conceded"];

    return (
      <div key={gameIndex} className="history-game">
        <div
          className="history-game-header"
          onClick={() => toggleVisibility(gameIndex)}
        >
          <div className="history-game-header-left">
            <div>{game.date}</div>
            <div>{`${user.club} ${game.scored} - ${game.conceded}`}</div>
          </div>
          <div className="history-game-header-right">
            {gameVisibilities[gameIndex] ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
        {gameVisibilities[gameIndex] && (
          <div className="history-game-stats">
            {Object.entries(game)
              .filter(([statKey]) => !excludedStats.includes(statKey))
              .map(([statKey, statValue]) => (
                <div key={statKey} className="history-game-stat">
                  <span>{statKey.replace(/([A-Z])/g, " $1")}</span>
                  <span>{statValue}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="section history-section">
      <div className="section-header">History</div>
      <hr className="horizontal-line" />

      <div className="history-games">{gamesMapping}</div>
    </div>
  );
}

export default History;
