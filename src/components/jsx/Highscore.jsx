import React from "react";
import "../css/Highscore.css";

function Highscore({ highscores }) {
  const highscoreMapping = Object.entries(highscores).map(
    ([statKey, statValue], statIndex) => {
      const statName = statKey
        .replace(/([A-Z])/g, " $1")
        .replace("Percentage", "%");

      return (
        <div className="highscore-stat" key={statIndex}>
          <div className="stat-name">{statName}</div>
          <div className="stat-value">{statValue}</div>
        </div>
      );
    }
  );

  return (
    <div className="section">
      <div className="section-header">Highscores</div>
      <hr className="horizontal-line" />
      <div className="highscore-stats">{highscoreMapping}</div>
    </div>
  );
}

export default Highscore;
