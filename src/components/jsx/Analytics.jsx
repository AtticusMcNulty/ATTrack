import React from "react";
import { Chart, registerables } from "chart.js";
import "../css/Analytics.css";

// register the necessary components for Chart.js
Chart.register(...registerables);

function Analytics({
  prevGameStats,
  allTimeStats,
  setAllTimeStats,
  gameHistory,
}) {
  const statKeys = [
    "scored",
    "conceded",
    "minutes",
    "matchRating",
    "goals",
    "assists",
    "keyPasses",
    "shots",
    "shotsOnTarget",
    "shotsOffTarget",
    "shotsThatHitPost",
    "shotsOnTargetPercentage",
    "shotsPerGoal",
    "passes",
    "passesCompleted",
    "passesMissed",
    "passCompletionPercentage",
    "dribbles",
    "dribblesCompleted",
    "dribblesFailed",
    "dribbleCompletionPercentage",
    "duels",
    "duelsWon",
    "duelsLost",
    "duelSuccessPercentage",
    "foulsWon",
    "tackles",
    "clearances",
    "interceptions",
    "turnovers",
    "fouls",
    "yellowCards",
    "redCard",
  ];

  const [curStatKey, setCurStatKey] = React.useState("minutes");

  React.useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

    const xVals = Array.from(
      { length: allTimeStats.gamesPlayed },
      (_, i) => i + 1
    );

    // create array of a given stats history
    const yVals = gameHistory.map((game) => game[curStatKey]).reverse();

    let maxY =
      yVals.length !== 0 && Math.max(...yVals) >= 1 ? Math.max(...yVals) : 1;

    const chart = document.getElementById("analytics-chart").getContext("2d");
    chartRef.current = new Chart(chart, {
      type: "line",
      data: {
        labels: xVals,
        datasets: [
          {
            fill: false, // fill underneath line
            tension: 0, // line curvature
            backgroundColor: "rgba(255,255,255,1)",
            borderColor: "rgba(255,255,255,0.3)",
            data: yVals,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            displayColors: false,
            backgroundColor: "rgba(0,0,0,0.7)",
            bodyColor: "rgba(255,255,255,0.9)",
            usePointStyle: false,
            callbacks: {
              title: () => {
                return "";
              },
              label: (context) => {
                return `Game #${context.label}: ${context.raw}`;
              },
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: maxY,
            ticks: {
              color: "rgba(255,255,255,1)",
              stepSize: maxY / 5, // adjust as needed
            },
            grid: {
              color: "rgba(255,255,255,0.3)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Games",
              color: "rgba(255,255,255,1)",
              padding: { top: 0 },
            },
            ticks: {
              color: "rgba(255,255,255,1)",
            },
            grid: {
              color: "rgba(255,255,255,0.3)",
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [allTimeStats.gamesPlayed, gameHistory, curStatKey]);

  const chartMapping = statKeys.map((statKey, statIndex) => {
    let statName = statKey.replace(/([A-Z])/g, " $1").trim();

    return (
      <option key={statIndex} value={statKey}>
        {statName}
      </option>
    );
  });

  const lastMatchMapping = Object.entries(prevGameStats)
    .filter(([statKey, statValue]) => statKey !== "date")
    .map(([statKey, statValue], statIndex) => {
      const statName = statKey.replace(/([A-Z])/g, " $1").trim();
      let text;

      if (
        statKey === "shotsOnTargetPercentage" ||
        statKey === "passCompletionPercentage" ||
        statKey === "dribbleCompletionPercentage" ||
        statKey === "duelSuccessPercentage"
      )
        text = `${statName.replace("Percentage", "%")}: ${statValue}`;
      else
        text = `${statName}: ${parseFloat(statValue).toFixed(
          statKey === "matchRating" || statKey === "minutes"
            ? 1
            : statKey === "scored" || statKey === "conceded"
            ? 0
            : 2
        )}`;

      return (
        <div className="analytics-stat" key={statIndex}>
          {text}
        </div>
      );
    });

  const perGameMapping = Object.entries(allTimeStats)
    .map(([statKey, statValue], statIndex) => {
      const statName = statKey.replace(/([A-Z])/g, " $1").trim();
      let text = "";

      if (
        ![
          "record",
          "gamesPlayed",
          "averageMinutes",
          "averageMatchRating",
        ].includes(statKey)
      ) {
        if (
          [
            "shotsOnTargetPercentage",
            "passCompletionPercentage",
            "dribbleCompletionPercentage",
            "duelSuccessPercentage",
            "shotsPerGoal",
          ].includes(statKey)
        ) {
          text = `${statName.replace("Percentage", "%")}: ${parseFloat(
            statValue
          ).toFixed(2)}`;
        } else {
          const value = (
            parseFloat(statValue) / allTimeStats.gamesPlayed
          ).toFixed(
            statKey === "totalMatchRating" || statKey === "totalMinutes"
              ? 1
              : statKey === "scored" || statKey === "conceded"
              ? 0
              : 2
          );
          text = `${statName.replace("total ", "")}: ${
            allTimeStats.gamesPlayed !== 0 ? value : "0"
          }`;
        }
      }

      return text ? (
        <div className="analytics-stat" key={statIndex}>
          {text}
        </div>
      ) : null;
    })
    .filter((item) => item !== null);

  const comparisonMapping = statKeys.map((statKey, statIndex) => {
    let text;

    const lastMatchNum = Number(
      lastMatchMapping[statIndex].props.children.split(": ")[1]
    );
    const perGameNum = Number(
      perGameMapping[statIndex].props.children.split(": ")[1]
    );

    const toRound = statKey === "matchRating" ? 1 : 2;

    if (lastMatchNum > perGameNum)
      text = `${(lastMatchNum - perGameNum).toFixed(toRound)} ⬆️`;
    else if (lastMatchNum < perGameNum)
      text = `${(perGameNum - lastMatchNum).toFixed(toRound)} ⬇️`;
    else text = `${lastMatchNum} = ${perGameNum}`;

    return (
      <div key={statIndex} className="analytics-stat">
        {text}
      </div>
    );
  });

  const chartRef = React.useRef(null);

  return (
    <div className="section">
      <div className="section-header">Analytics</div>

      <hr className="horizontal-line" />

      <div className="analytics">
        <div className="analytics-topSection">
          <select
            className="analytics-dropdown"
            onChange={(event) => setCurStatKey(event.target.value)}
          >
            {chartMapping}
          </select>
          <canvas id="analytics-chart"></canvas>
        </div>

        <div className="analytics-bottomSection">
          <div className="analytics-gp">
            <div className="analytics-gp-header">
              Games Played: {allTimeStats.gamesPlayed}
            </div>
            <button
              className="analytics-gp-plus"
              onClick={() => {
                setAllTimeStats((prevAllTimeStats) => {
                  const newAllTimeStats = { ...prevAllTimeStats };
                  newAllTimeStats.gamesPlayed += 1;
                  return newAllTimeStats;
                });
              }}
            >
              +
            </button>
            <button
              className="analytics-gp-minus"
              onClick={() => {
                if (allTimeStats.gamesPlayed > 0)
                  setAllTimeStats((prevAllTimeStats) => {
                    const newAllTimeStats = { ...prevAllTimeStats };
                    newAllTimeStats.gamesPlayed -= 1;
                    return newAllTimeStats;
                  });
              }}
            >
              -
            </button>
          </div>
          <div className="analytics-stats">
            <div className="analytics-stats-column">
              <div className="analytics-stats-header">Last Match:</div>
              {lastMatchMapping}
            </div>
            <div className="analytics-stats-column">
              <div className="analytics-stats-header">Per Game:</div>
              {perGameMapping}
            </div>
            <div className="analytics-stats-column">
              <div className="analytics-stats-header">Comparison:</div>
              {comparisonMapping}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
