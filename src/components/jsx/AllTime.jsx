import "../css/AllTime.css";

function AllTime({ allTimeStats, setAllTimeStats }) {
  function handlePlusBtn(statKey) {
    setAllTimeStats((prevAllTimeStats) => {
      const newAllTimeStats = { ...prevAllTimeStats };
      newAllTimeStats[statKey] += 1;

      if (
        statKey === "shotsOnTarget" ||
        statKey === "shotsOffTarget" ||
        statKey === "shotsThatHitPost"
      ) {
        newAllTimeStats["shots"] += 1;
        newAllTimeStats["shotsOnTargetPercentage"] = (
          (newAllTimeStats["shotsOnTarget"] / newAllTimeStats["shots"]) *
          100
        ).toFixed(1);
        newAllTimeStats["shotsPerGoal"] =
          newAllTimeStats["goals"] !== 0
            ? (newAllTimeStats["shots"] / newAllTimeStats["goals"]).toFixed(2)
            : 0;
      } else if (statKey === "passesCompleted" || statKey === "passesMissed") {
        newAllTimeStats["passes"] += 1;
        newAllTimeStats["passCompletionPercentage"] = (
          (newAllTimeStats["passesCompleted"] / newAllTimeStats["passes"]) *
          100
        ).toFixed(1);
      } else if (
        statKey === "dribblesCompleted" ||
        statKey === "dribblesFailed"
      ) {
        newAllTimeStats["dribbles"] += 1;
        newAllTimeStats["dribbleCompletionPercentage"] = (
          (newAllTimeStats["dribblesCompleted"] / newAllTimeStats["dribbles"]) *
          100
        ).toFixed(1);
      } else if (statKey === "duelsWon" || statKey === "duelsLost") {
        newAllTimeStats["duels"] += 1;
        newAllTimeStats["duelSuccessPercentage"] = (
          (newAllTimeStats["duelsWon"] / newAllTimeStats["duels"]) *
          100
        ).toFixed(1);
      }

      return newAllTimeStats;
    });
  }

  function handleMinusBtn(statKey) {
    setAllTimeStats((prevAllTimeStats) => {
      const newAllTimeStats = { ...prevAllTimeStats };
      newAllTimeStats[statKey] -= 1;

      if (
        statKey === "shotsOnTarget" ||
        statKey === "shotsOffTarget" ||
        statKey === "shotsThatHitPost"
      ) {
        newAllTimeStats["shots"] -= 1;
        newAllTimeStats["shotsOnTargetPercentage"] =
          newAllTimeStats["shots"] !== 0
            ? (
                (newAllTimeStats["shotsOnTarget"] / newAllTimeStats["shots"]) *
                100
              ).toFixed(1)
            : 0;
        newAllTimeStats["shotsPerGoal"] =
          newAllTimeStats["goals"] !== 0
            ? (newAllTimeStats["shots"] / newAllTimeStats["goals"]).toFixed(2)
            : 0;
      } else if (statKey === "passesCompleted" || statKey === "passesMissed") {
        newAllTimeStats["passes"] -= 1;
        newAllTimeStats["passCompletionPercentage"] =
          newAllTimeStats["passes"] !== 0
            ? (
                (newAllTimeStats["passesCompleted"] /
                  newAllTimeStats["passes"]) *
                100
              ).toFixed(1)
            : 0;
      } else if (
        statKey === "dribblesCompleted" ||
        statKey === "dribblesFailed"
      ) {
        newAllTimeStats["dribbles"] -= 1;
        newAllTimeStats["dribbleCompletionPercentage"] =
          newAllTimeStats["dribbles"] !== 0
            ? (
                (newAllTimeStats["dribblesCompleted"] /
                  newAllTimeStats["dribbles"]) *
                100
              ).toFixed(1)
            : 0;
      } else if (statKey === "duelsWon" || statKey === "duelsLost") {
        newAllTimeStats["duels"] -= 1;
        newAllTimeStats["duelSuccessPercentage"] =
          newAllTimeStats["duels"] !== 0
            ? (
                (newAllTimeStats["duelsWon"] / newAllTimeStats["duels"]) *
                100
              ).toFixed(1)
            : 0;
      }

      return newAllTimeStats;
    });
  }

  const allTimeMapping = Object.entries(allTimeStats).map(
    ([statKey, statValue], statIndex) => {
      let text;
      const statName = statKey.replace(/([A-Z])/g, " $1").trim();

      const noBtns = [
        "record",
        "totalMatchRating",
        "totalMinutes",
        "shotsOnTargetPercentage",
        "passCompletionPercentage",
        "dribbleCompletionPercentage",
        "duelSuccessPercentage",
        "shotsPerGoal",
        "shots",
        "passes",
        "dribbles",
        "duels",
      ];

      if (statKey === "record")
        text = `${statName}: ${statValue[0]}W - ${statValue[1]}T - ${statValue[2]}L`;
      else if (
        statKey === "shotsOnTargetPercentage" ||
        statKey === "passCompletionPercentage" ||
        statKey === "dribbleCompletionPercentage" ||
        statKey === "duelSuccessPercentage"
      )
        text = `${statName}: ${statValue}%`;
      else
        text = `${statName}: ${parseFloat(statValue).toFixed(
          statKey === "totalMatchRating" || statKey === "totalMinutes" ? 1 : 0
        )}`;

      return statKey !== "averageMinutes" &&
        statKey !== "averageMatchRating" ? (
        <div className="stat" key={statIndex}>
          <div className="stat-header">{text.replace("total", "")}</div>

          {noBtns.includes(statKey) ? (
            <div>
              <button className="stat-nan"></button>
              <button className="stat-nan"></button>
            </div>
          ) : (
            <div className="stat-btns">
              <button
                className="stat-plus"
                onClick={() => {
                  handlePlusBtn(statKey);
                }}
              >
                +
              </button>
              <button
                className="stat-minus"
                onClick={() => {
                  if (statValue !== 0) handleMinusBtn(statKey);
                }}
              >
                -
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      );
    }
  );

  return (
    <div className="section">
      <div className="section-header">All Time</div>
      <hr className="horizontal-line" />

      <div className="stats">{allTimeMapping}</div>
    </div>
  );
}

export default AllTime;
