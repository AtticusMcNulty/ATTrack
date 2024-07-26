import React from "react";
import "../css/InGame.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Swal from "sweetalert2";

function InGame({
  ingameStats,
  setIngameStats,
  setAllTimeStats,
  setPrevGameStats,
  setGameHistory,
  setHighscores,
  user,
  points,
  setPoints,
}) {
  const statsArr = [
    ["Goals", "Goals"],
    ["Creation", "Assists", "Key Passes"],
    ["Shots", "On Target", "Off Target", "Hit Post"],
    ["Passes", "Completed", "Missed"],
    ["Dribbles", "Successful", "Failed", "Fouls Won"],
    ["Defense", "Tackles", "Clearances", "Interceptions"],
    ["Possession", "Duels Won", "Duels Lost", "Turnovers"],
    ["Violations", "Fouls", "Yellow Cards", "Red Card"],
  ];
  const ingameStatKeys = [
    "minutes",
    "matchRating",
    "goals",
    "assists",
    "keyPasses",
    "shotsOnTarget",
    "shotsOffTarget",
    "shotsThatHitPost",
    "passesCompleted",
    "passesMissed",
    "dribblesCompleted",
    "dribblesFailed",
    "foulsWon",
    "tackles",
    "clearances",
    "interceptions",
    "duelsWon",
    "duelsLost",
    "turnovers",
    "fouls",
    "yellowCards",
    "redCard",
  ];

  /* TIMER */
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [timerInterval, setTimerInterval] = React.useState(null);

  React.useEffect(() => {
    if (elapsedTime >= 100 * 60 * 1000) clearInterval(timerInterval);
  }, [elapsedTime]);

  function startTimer() {
    const startTime = Date.now() - elapsedTime;
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);
    setTimerInterval(interval);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function timeToString(time) {
    let totalSeconds = Math.floor(time / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let formattedMinutes = minutes.toString().padStart(2, "0");
    let formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  /* MODIFY STATS */
  const [subtractState, setSubtractState] = React.useState(false);
  function calculateMatchRating(curStats) {
    return parseFloat(
      curStats.goals * 0.9 +
        curStats.assists * 0.7 +
        curStats.keyPasses * 0.2 +
        curStats.shotsOnTarget * 0.1 +
        curStats.shotsOffTarget * -0.1 +
        curStats.shotsThatHitPost * 0.15 +
        curStats.passesCompleted * 0.05 +
        curStats.passesMissed * -0.05 +
        curStats.dribblesCompleted * 0.1 +
        curStats.dribblesFailed * -0.1 +
        curStats.foulsWon * 0.1 +
        curStats.tackles * 0.1 +
        curStats.clearances * 0.05 +
        curStats.interceptions * 0.1 +
        curStats.duelsWon * 0.1 +
        curStats.duelsLost * -0.1 +
        curStats.turnovers * -0.15 +
        curStats.fouls * -0.1 +
        curStats.yellowCards * -0.5 +
        curStats.redCard * -1.5 +
        6.0
    ).toFixed(1);
  }

  const [score, setScore] = React.useState([0, 0]);
  function notifyUser() {
    const titles = [
      { title: "Rookie", requirement: 0 },
      { title: "Beginner", requirement: 150 },
      { title: "Novice", requirement: 300 },
      { title: "Amateur", requirement: 500 },
      { title: "Casual", requirement: 750 },
      { title: "Average", requirement: 1000 },
      { title: "Apprentice", requirement: 1250 },
      { title: "Skilled", requirement: 1500 },
      { title: "Competent", requirement: 1750 },
      { title: "Experienced", requirement: 2000 },
      { title: "Proficient", requirement: 2250 },
      { title: "Advanced", requirement: 2500 },
      { title: "Seasoned", requirement: 2750 },
      { title: "Expert", requirement: 3000 },
      { title: "Master", requirement: 3250 },
      { title: "Grandmaster", requirement: 3500 },
      { title: "Legend", requirement: 3750 },
      { title: "Mythical", requirement: 4000 },
      { title: "Transcendent", requirement: 4250 },
      { title: "God", requirement: 4500 },
    ];

    let currentTitle = titles[0].title;
    let level;

    for (let i = titles.length - 1; i >= 0; i--) {
      if (points >= titles[i].requirement) {
        currentTitle = titles[i].title;
        level = i;
        break;
      }
    }

    let newTitle;
    let newPoints = points + (Math.round(ingameStats.matchRating) - 6) * 20;

    for (let i = titles.length - 1; i >= 0; i--) {
      if (newPoints >= titles[i].requirement) {
        newTitle = titles[i].title;
        level = i;
        break;
      }
    }

    const Toast = Swal.mixin({
      customClass: "swal",
      toast: true,
      position: "top-end",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: `You scored a match rating of ${ingameStats.matchRating.toFixed(
        1
      )}`,
      text: `This has awarded you ${
        (Math.round(ingameStats.matchRating) - 6) * 20
      } points`,
    }).then(() => {
      if (currentTitle !== newTitle)
        Toast.fire({
          icon: "success",
          title: `You are now level ${level}`,
          text: `This has awarded you the ${newTitle} title`,
        });
    });

    setPoints((prevPoints) => {
      const newPoints =
        prevPoints + (Math.round(ingameStats.matchRating) - 6) * 20;
      localStorage.setItem("storedPoints", newPoints);
      return newPoints;
    });
  }

  async function update_stats() {
    // update minutes and matchrating ingamestats
    ingameStats.minutes = ((elapsedTime % 60000) / 60000).toFixed(2);
    ingameStats.matchRating = parseFloat(
      document.getElementById("ingame-matchrating-num").textContent
    );

    notifyUser();

    // update allTimeStats
    await setAllTimeStats((prevAllTimeStats) => {
      const newAllTimeStats = { ...prevAllTimeStats };

      Object.keys(ingameStats).forEach((stat) => {
        if (stat !== "minutes" && stat !== "matchRating")
          newAllTimeStats[stat] += Number(ingameStats[stat]);
      });

      // update advanced stats
      newAllTimeStats.record = [
        score[0] > score[1]
          ? newAllTimeStats.record[0] + 1
          : newAllTimeStats.record[0],
        score[0] === score[1]
          ? newAllTimeStats.record[1] + 1
          : newAllTimeStats.record[1],
        score[0] < score[1]
          ? newAllTimeStats.record[2] + 1
          : newAllTimeStats.record[2],
      ];

      newAllTimeStats.gamesPlayed += 1;

      newAllTimeStats.scored += score[0];
      newAllTimeStats.conceded += score[1];

      // update minutes and match rating per game
      newAllTimeStats.totalMinutes =
        parseFloat(newAllTimeStats.totalMinutes) +
        parseFloat(ingameStats.minutes);
      newAllTimeStats.averageMinutes =
        newAllTimeStats.totalMinutes / newAllTimeStats.gamesPlayed;

      newAllTimeStats.totalMatchRating =
        ingameStats.matchRating + newAllTimeStats.totalMatchRating;
      newAllTimeStats.averageMatchRating =
        newAllTimeStats.totalMatchRating / newAllTimeStats.gamesPlayed;

      // update other stats
      newAllTimeStats.shots =
        ingameStats.shotsOnTarget +
        ingameStats.shotsOffTarget +
        ingameStats.shotsThatHitPost +
        (newAllTimeStats.shots || 0);
      newAllTimeStats.shotsOnTargetPercentage = newAllTimeStats.shots
        ? (newAllTimeStats.shotsOnTarget / newAllTimeStats.shots).toFixed(2)
        : 0;
      newAllTimeStats.shotsPerGoal = newAllTimeStats.shots
        ? (newAllTimeStats.goals / newAllTimeStats.shots).toFixed(2)
        : 0;
      newAllTimeStats.passes =
        ingameStats.passesCompleted +
        ingameStats.passesMissed +
        (newAllTimeStats.passes || 0);
      newAllTimeStats.passCompletionPercentage = newAllTimeStats.passes
        ? (newAllTimeStats.passesCompleted / newAllTimeStats.passes).toFixed(2)
        : 0;
      newAllTimeStats.dribbles =
        ingameStats.dribblesCompleted +
        ingameStats.dribblesFailed +
        (newAllTimeStats.dribbles || 0);
      newAllTimeStats.dribbleCompletionPercentage = newAllTimeStats.dribbles
        ? (
            newAllTimeStats.dribblesCompleted / newAllTimeStats.dribbles
          ).toFixed(2)
        : 0;
      newAllTimeStats.duels =
        ingameStats.duelsWon +
        ingameStats.duelsLost +
        (newAllTimeStats.duels || 0);
      newAllTimeStats.duelSuccessPercentage = newAllTimeStats.duels
        ? (newAllTimeStats.duelsWon / newAllTimeStats.duels).toFixed(2)
        : 0;

      localStorage.setItem("allTimeStats", JSON.stringify(newAllTimeStats));

      return newAllTimeStats;
    });

    // update prevGameStats and highscores
    setPrevGameStats((prevGameStats) => {
      const newPrevGameStats = { ...prevGameStats, ...ingameStats };

      // Update advanced stats
      const shots =
        ingameStats.shotsOnTarget +
        ingameStats.shotsOffTarget +
        ingameStats.shotsThatHitPost;
      const passes = ingameStats.passesCompleted + ingameStats.passesMissed;
      const dribbles =
        ingameStats.dribblesCompleted + ingameStats.dribblesFailed;
      const duels = ingameStats.duelsWon + ingameStats.duelsLost;

      newPrevGameStats.scored = score[0];
      newPrevGameStats.conceded = score[1];

      newPrevGameStats.shots = shots;
      newPrevGameStats.shotsOnTargetPercentage = shots
        ? (ingameStats.shotsOnTarget / shots).toFixed(2)
        : 0;
      newPrevGameStats.shotsPerGoal = shots
        ? (ingameStats.goals / shots).toFixed(2)
        : 0;

      newPrevGameStats.passes = passes;
      newPrevGameStats.passCompletionPercentage = passes
        ? (ingameStats.passesCompleted / passes).toFixed(2)
        : 0;

      newPrevGameStats.dribbles = dribbles;
      newPrevGameStats.dribbleCompletionPercentage = dribbles
        ? (ingameStats.dribblesCompleted / dribbles).toFixed(2)
        : 0;

      newPrevGameStats.duels = duels;
      newPrevGameStats.duelSuccessPercentage = duels
        ? (ingameStats.duelsWon / duels).toFixed(2)
        : 0;

      localStorage.setItem("prevGameStats", JSON.stringify(newPrevGameStats));

      // update highscores
      setHighscores((prevHighscores) => {
        const newHighscores = { ...prevHighscores };

        Object.entries(newPrevGameStats).forEach(
          ([statKey, statValue], statIndex) => {
            if (statValue > prevHighscores[statKey])
              newHighscores[statKey] = statValue;
          }
        );

        localStorage.setItem("highscores", JSON.stringify(newHighscores));

        return newHighscores;
      });

      return newPrevGameStats;
    });

    // update gameHistory
    setGameHistory((prevGameHistory) => {
      // convert minutes to decimal
      ingameStats.minutes = parseFloat(ingameStats.minutes);

      // add history stats to ingame to be copied
      ingameStats.scored = score[0];
      ingameStats.conceded = score[1];

      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      ingameStats.date = `${month}/${day}/${year}`;

      localStorage.setItem(
        "gameHistory",
        JSON.stringify([ingameStats, ...prevGameHistory])
      );

      return [ingameStats, ...prevGameHistory];
    });

    // reset ingameStats and score
    setIngameStats({
      scored: 0,
      conceded: 0,
      minutes: 0,
      matchRating: 6.0,
      goals: 0,
      assists: 0,
      keyPasses: 0,
      shots: 0,
      shotsOnTarget: 0,
      shotsOffTarget: 0,
      shotsThatHitPost: 0,
      shotsPerGoal: 0,
      passes: 0,
      passesCompleted: 0,
      passesMissed: 0,
      dribbles: 0,
      dribblesCompleted: 0,
      dribblesFailed: 0,
      foulsWon: 0,
      tackles: 0,
      clearances: 0,
      interceptions: 0,
      duels: 0,
      duelsWon: 0,
      duelsLost: 0,
      turnovers: 0,
      fouls: 0,
      yellowCards: 0,
      redCard: 0,
    });

    setScore([0, 0]);

    // reset match rating and timer
    document.getElementById("ingame-matchrating-num").textContent = "6.0";

    clearInterval(timerInterval);
    setElapsedTime(0);
  }

  /* MAPPINGS */
  const [buttonHoverVisibilities, setButtonHoverVisibilities] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [buttonClickVisibilities, setButtonClickVisibilities] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  let globalStatIndex = 2;
  const statMapping = statsArr.map((statRow, rowIndex) => {
    const buttons = statRow.slice(1).map((stat, statIndex) => {
      const currentStatIndex = globalStatIndex;
      globalStatIndex += 1;

      return (
        <button
          key={statIndex}
          className={`ingame-stats-btn ${
            buttonHoverVisibilities[rowIndex] ||
            buttonClickVisibilities[rowIndex]
              ? "show"
              : ""
          } ${subtractState ? "subtract" : ""}`}
          onClick={() => {
            setIngameStats((prevIngameStats) => {
              const newStats = { ...prevIngameStats };

              // handle changes to clicked stat
              if (!subtractState) {
                newStats[ingameStatKeys[currentStatIndex]] += 1;

                if (ingameStatKeys[currentStatIndex] === "goals")
                  newStats["shotsOnTarget"] += 1;
              } else if (newStats[ingameStatKeys[currentStatIndex]] !== 0) {
                newStats[ingameStatKeys[currentStatIndex]] -= 1;

                if (ingameStatKeys[currentStatIndex] === "goals")
                  newStats["shotsOnTarget"] -= 1;
              }

              document.getElementById("ingame-matchrating-num").textContent =
                calculateMatchRating(newStats);

              return newStats;
            });

            // handle corresponding changes to score
            if (
              ingameStatKeys[currentStatIndex] === "goals" ||
              ingameStatKeys[currentStatIndex] === "assists"
            )
              setScore((prevScore) => {
                if (!subtractState) return [prevScore[0] + 1, prevScore[1]];
                else if (prevScore[0] !== 0)
                  return [prevScore[0] - 1, prevScore[1]];
                else return prevScore;
              });
          }}
        >
          {`${stat} > ${ingameStats[ingameStatKeys[currentStatIndex]] || 0}`}
        </button>
      );
    });

    return (
      <div
        key={rowIndex}
        className="ingame-stats-row"
        onMouseEnter={() => {
          setButtonHoverVisibilities((prevButtonVisbilities) => {
            const newButtonVisbilities = [...prevButtonVisbilities];
            newButtonVisbilities[rowIndex] = !prevButtonVisbilities[rowIndex];
            return newButtonVisbilities;
          });
        }}
        onMouseLeave={() => {
          setButtonHoverVisibilities((prevButtonVisbilities) => {
            const newButtonVisbilities = [...prevButtonVisbilities];
            newButtonVisbilities[rowIndex] = !prevButtonVisbilities[rowIndex];
            return newButtonVisbilities;
          });
        }}
      >
        <div
          className="ingame-stats-header"
          onClick={() =>
            setButtonClickVisibilities((prevButtonVisbilities) => {
              const newButtonVisbilities = [...prevButtonVisbilities];
              newButtonVisbilities[rowIndex] = !prevButtonVisbilities[rowIndex];
              return newButtonVisbilities;
            })
          }
        >
          <div> {statRow[0]}</div>
          <div>
            {buttonHoverVisibilities[rowIndex] ||
            buttonClickVisibilities[rowIndex] ? (
              <FaAngleUp />
            ) : (
              <FaAngleDown />
            )}
          </div>
        </div>
        <div
          className={`ingame-stats-btns ${
            buttonHoverVisibilities[rowIndex] ||
            buttonClickVisibilities[rowIndex]
              ? "show"
              : ""
          }`}
        >
          {buttons}
        </div>
      </div>
    );
  });

  return (
    <div className="section">
      <div className="section-header">In Game Stats</div>
      <hr className="horizontal-line" />

      <div className="ingame">
        <div className="ingame-header">
          <div className="timer">
            <button className="section-button" onClick={startTimer}>
              Start
            </button>
            <div id="timer-text">{timeToString(elapsedTime)}</div>
            <button className="section-button" onClick={stopTimer}>
              Stop
            </button>
          </div>

          <div className="scoreboard">
            <div>
              {`${user.club} `}
              <span
                className={`scoreboard-score ${
                  subtractState ? "subtract" : ""
                }`}
                onClick={() => {
                  setScore((prevScore) => {
                    if (!subtractState) return [prevScore[0] + 1, prevScore[1]];
                    else if (prevScore[0] !== 0)
                      return [prevScore[0] - 1, prevScore[1]];
                    else return prevScore;
                  });
                }}
              >
                {score[0]}
              </span>
            </div>
            <div>-</div>
            <div>
              <span
                className={`scoreboard-score ${
                  subtractState ? "subtract" : ""
                }`}
                onClick={() => {
                  setScore((prevScore) => {
                    if (!subtractState) return [prevScore[0], prevScore[1] + 1];
                    else if (prevScore[1] !== 0)
                      return [prevScore[0], prevScore[1] - 1];
                    else return prevScore;
                  });
                }}
              >
                {score[1]}
              </span>
            </div>
          </div>
        </div>

        <div className="ingame-content">
          <div className="ingame-matchrating">
            Match Rating: <span id="ingame-matchrating-num">6.0</span>
          </div>
          <div className="ingame-stats">{statMapping}</div>
        </div>

        <div className="ingame-modify-btns">
          <button className="ingame-update" onClick={update_stats}>
            Update Stats
          </button>
          <button
            className="ingame-subtract"
            onClick={() => {
              setSubtractState(!subtractState);
            }}
          >
            Subtract Stat
          </button>
        </div>
      </div>
    </div>
  );
}

export default InGame;
