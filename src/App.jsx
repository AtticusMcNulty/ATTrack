import React from "react";
import "./App.css";

import Login from "./components/jsx/Login";
import Tabs from "./components/jsx/Tabs";
import InGame from "./components/jsx/InGame";
import Analytics from "./components/jsx/Analytics";
import Feedback from "./components/jsx/Feedback";
import AllTime from "./components/jsx/AllTime";
import Highscore from "./components/jsx/Highscore";
import Achievements from "./components/jsx/Achievements";
import History from "./components/jsx/History";
import Profile from "./components/jsx/Profile";

function App() {
  const [tabStates, setTabStates] = React.useState([1, 0, 0, 0, 0, 0, 0, 0]);
  const [ingameStats, setIngameStats] = React.useState({
    minutes: 0,
    matchRating: 6.0,
    goals: 0,
    assists: 0,
    keyPasses: 0,
    shotsOnTarget: 0,
    shotsOffTarget: 0,
    shotsThatHitPost: 0,
    passesCompleted: 0,
    passesMissed: 0,
    dribblesCompleted: 0,
    dribblesFailed: 0,
    foulsWon: 0,
    tackles: 0,
    clearances: 0,
    interceptions: 0,
    duelsWon: 0,
    duelsLost: 0,
    turnovers: 0,
    fouls: 0,
    yellowCards: 0,
    redCard: 0,
  });
  const [prevGameStats, setPrevGameStats] = React.useState(() => {
    const storedPrevGameStats = JSON.parse(
      localStorage.getItem("prevGameStats")
    );
    if (storedPrevGameStats) return storedPrevGameStats;

    return {
      scored: 0,
      conceded: 0,
      minutes: 0,
      matchRating: 0,
      goals: 0,
      assists: 0,
      keyPasses: 0,
      shots: 0,
      shotsOnTarget: 0,
      shotsOffTarget: 0,
      shotsThatHitPost: 0,
      shotsOnTargetPercentage: 0,
      shotsPerGoal: 0,
      passes: 0,
      passesCompleted: 0,
      passesMissed: 0,
      passCompletionPercentage: 0,
      dribbles: 0,
      dribblesCompleted: 0,
      dribblesFailed: 0,
      dribbleCompletionPercentage: 0,
      duels: 0,
      duelsWon: 0,
      duelsLost: 0,
      duelSuccessPercentage: 0,
      foulsWon: 0,
      tackles: 0,
      clearances: 0,
      interceptions: 0,
      turnovers: 0,
      fouls: 0,
      yellowCards: 0,
      redCard: 0,
    };
  });
  const [allTimeStats, setAllTimeStats] = React.useState(() => {
    const storedAllTimeStats = JSON.parse(localStorage.getItem("allTimeStats"));
    if (storedAllTimeStats) return storedAllTimeStats;

    return {
      record: [0, 0, 0],
      gamesPlayed: 0,
      scored: 0,
      conceded: 0,
      totalMinutes: 0,
      averageMinutes: 0,
      totalMatchRating: 0,
      averageMatchRating: 0,
      goals: 0,
      assists: 0,
      keyPasses: 0,
      shots: 0,
      shotsOnTarget: 0,
      shotsOffTarget: 0,
      shotsThatHitPost: 0,
      shotsOnTargetPercentage: 0,
      shotsPerGoal: 0,
      passes: 0,
      passesCompleted: 0,
      passesMissed: 0,
      passCompletionPercentage: 0,
      dribbles: 0,
      dribblesCompleted: 0,
      dribblesFailed: 0,
      dribbleCompletionPercentage: 0,
      duels: 0,
      duelsWon: 0,
      duelsLost: 0,
      duelSuccessPercentage: 0,
      foulsWon: 0,
      tackles: 0,
      clearances: 0,
      interceptions: 0,
      turnovers: 0,
      fouls: 0,
      yellowCards: 0,
      redCard: 0,
    };
  });
  const [highscores, setHighscores] = React.useState(() => {
    const storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores) return storedHighscores;

    return {
      scored: 0,
      conceded: 0,
      minutes: 0,
      matchRating: 0,
      goals: 0,
      assists: 0,
      keyPasses: 0,
      shots: 0,
      shotsOnTarget: 0,
      shotsOffTarget: 0,
      shotsThatHitPost: 0,
      shotsOnTargetPercentage: 0,
      shotsPerGoal: 0,
      passes: 0,
      passesCompleted: 0,
      passesMissed: 0,
      passCompletionPercentage: 0,
      dribbles: 0,
      dribblesCompleted: 0,
      dribblesFailed: 0,
      dribbleCompletionPercentage: 0,
      duels: 0,
      duelsWon: 0,
      duelsLost: 0,
      duelSuccessPercentage: 0,
      foulsWon: 0,
      tackles: 0,
      clearances: 0,
      interceptions: 0,
      turnovers: 0,
      fouls: 0,
      yellowCards: 0,
      redCard: 0,
    };
  });
  const [gameHistory, setGameHistory] = React.useState(() => {
    const storedGameHistory = JSON.parse(localStorage.getItem("gameHistory"));
    if (storedGameHistory) return storedGameHistory;

    return [];
  });
  const [users, setUsers] = React.useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) return storedUsers;

    return [];
  });
  const [user, setUser] = React.useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) return storedUser;

    return {};
  });
  const [points, setPoints] = React.useState(() => {
    const storedPoints = localStorage.getItem("storedPoints");
    if (storedPoints) return storedPoints;

    return 0;
  });
  const [gear, setGear] = React.useState(() => {
    const storedGear = JSON.parse(localStorage.getItem("gear"));
    if (storedGear) return storedGear;

    return {
      jersey: ["default"],
      shorts: ["default"],
      shoes: ["default"],
      badge: ["default"],
    };
  });
  const [loggedIn, setLoggedIn] = React.useState(() => {
    const storedLog = JSON.parse(localStorage.getItem("loggedIn"));
    if (storedLog || typeof storedLog === false) return storedLog;

    return false;
  });

  return loggedIn ? (
    <div className="app">
      <Tabs tabStates={tabStates} setTabStates={setTabStates} />

      <div className="content">
        {tabStates[0] ? (
          <InGame
            ingameStats={ingameStats}
            setIngameStats={setIngameStats}
            setAllTimeStats={setAllTimeStats}
            setPrevGameStats={setPrevGameStats}
            setGameHistory={setGameHistory}
            setHighscores={setHighscores}
            user={user}
            points={points}
            setPoints={setPoints}
          />
        ) : (
          <div></div>
        )}
        {tabStates[1] ? (
          <Analytics
            prevGameStats={prevGameStats}
            allTimeStats={allTimeStats}
            setAllTimeStats={setAllTimeStats}
            gameHistory={gameHistory}
          />
        ) : (
          <div></div>
        )}
        {tabStates[2] ? (
          <Feedback prevGameStats={prevGameStats} gameHistory={gameHistory} />
        ) : (
          <div></div>
        )}
        {tabStates[3] ? (
          <AllTime
            allTimeStats={allTimeStats}
            setAllTimeStats={setAllTimeStats}
          />
        ) : (
          <div></div>
        )}
        {tabStates[4] ? <Highscore highscores={highscores} /> : <div></div>}
        {tabStates[5] ? (
          <Achievements
            prevGameStats={prevGameStats}
            allTimeStats={allTimeStats}
            highscores={highscores}
            setPoints={setPoints}
            points={points}
            setGear={setGear}
          />
        ) : (
          <div></div>
        )}
        {tabStates[6] ? (
          <History gameHistory={gameHistory} user={user} />
        ) : (
          <div></div>
        )}
        {tabStates[7] ? (
          <Profile
            user={user}
            setUser={setUser}
            points={points}
            setLoggedIn={setLoggedIn}
            gear={gear}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  ) : (
    <Login
      users={users}
      setUsers={setUsers}
      setLoggedIn={setLoggedIn}
      setUser={setUser}
    />
  );
}

export default App;
