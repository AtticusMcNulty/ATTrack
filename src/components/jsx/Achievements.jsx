import React from "react";
import "../css/Achievements.css";
import Swal from "sweetalert2";

function Achievements({
  prevGameStats,
  allTimeStats,
  highscores,
  setPoints,
  points,
  setGear,
}) {
  const [tabState, setTabState] = React.useState(0);
  const tabs = ["Creation", "Shooting", "Passing", "Dribbling", "Store"];

  const [achievements, setAchievements] = React.useState(() => {
    const storedAchievments = JSON.parse(
      localStorage.getItem("storedAchievments")
    );
    if (storedAchievments) return storedAchievments;

    return [
      [
        {
          title: "(SG) Creation I:",
          description: "Score a goal",
          points: 50,
          condition: ["prevGameStats", "goals", 0],
          completed: false,
        },
        {
          title: "(SG) Creation II:",
          description: "Score 2 goals in a single game",
          points: 100,
          condition: ["prevGameStats", "goals", 1],
          completed: false,
        },
        {
          title: "(SG) Creation III:",
          description: "Score 3 goals in a single game",
          points: 200,
          condition: ["prevGameStats", "goals", 2],
          completed: false,
        },
        {
          title: "(ATG) Creation I:",
          description: "Score 3 goals",
          points: 50,
          condition: ["allTimeStats", "goals", 2],
          completed: false,
        },
        {
          title: "(ATG) Creation II:",
          description: "Score 6 goals",
          points: 75,
          condition: ["allTimeStats", "goals", 5],
          completed: false,
        },
        {
          title: "(ATG) Creation III:",
          description: "Score 10 goals",
          points: 100,
          condition: ["allTimeStats", "goals", 9],
          completed: false,
        },
        {
          title: "(ATG) Creation IV:",
          description: "Score 15 goals",
          points: 150,
          condition: ["allTimeStats", "goals", 14],
          completed: false,
        },
        {
          title: "(ATG) Creation V:",
          description: "Score 25 goals",
          points: 250,
          condition: ["allTimeStats", "goals", 24],
          completed: false,
        },
        {
          title: "(SA) Creation I:",
          description: "Provide an assist",
          points: 50,
          condition: ["prevGameStats", "assists", 0],
          completed: false,
        },
        {
          title: "(SA) Creation II:",
          description: "Provide 2 assists in a single game",
          points: 100,
          condition: ["prevGameStats", "assists", 1],
          completed: false,
        },
        {
          title: "(SA) Creation III:",
          description: "Provide 3 assists in a single game",
          points: 200,
          condition: ["prevGameStats", "assists", 2],
          completed: false,
        },
        {
          title: "(ATA) Creation I:",
          description: "Provide 3 assists",
          points: 50,
          condition: ["allTimeStats", "assists", 2],
          completed: false,
        },
        {
          title: "(ATA) Creation II:",
          description: "Provide 6 assists",
          points: 75,
          condition: ["allTimeStats", "assists", 5],
          completed: false,
        },
        {
          title: "(ATA) Creation III:",
          description: "Provide 10 assists",
          points: 100,
          condition: ["allTimeStats", "assists", 9],
          completed: false,
        },
        {
          title: "(ATA) Creation IV:",
          description: "Provide 15 assists",
          points: 150,
          condition: ["allTimeStats", "assists", 14],
          completed: false,
        },
        {
          title: "(ATA) Creation V:",
          description: "Provide 20 assists",
          points: 200,
          condition: ["allTimeStats", "assists", 19],
          completed: false,
        },
      ],
      [
        {
          title: "(ST) Shooting I:",
          description: "Take 2 shots in a single game",
          points: 25,
          condition: ["prevGameStats", "shots", 1],
          completed: false,
        },
        {
          title: "(ST) Shooting II:",
          description: "Take 4 shots in a single game",
          points: 75,
          condition: ["prevGameStats", "shots", 3],
          completed: false,
        },
        {
          title: "(ST) Shooting III:",
          description: "Take 6 shots in a single game",
          points: 150,
          condition: ["prevGameStats", "shots", 5],
          completed: false,
        },
        {
          title: "(ATT) Shooting I:",
          description: "Take 10 shots",
          points: 50,
          condition: ["allTimeStats", "shots", 9],
          completed: false,
        },
        {
          title: "(ATT) Shooting II:",
          description: "Take 25 shots",
          points: 100,
          condition: ["allTimeStats", "shots", 24],
          completed: false,
        },
        {
          title: "(ATT) Shooting III:",
          description: "Take 50 shots",
          points: 150,
          condition: ["allTimeStats", "shots", 49],
          completed: false,
        },
        {
          title: "(ATT) Shooting IV:",
          description: "Take 75 shots",
          points: 200,
          condition: ["allTimeStats", "shots", 74],
          completed: false,
        },
        {
          title: "(ATT) Shooting V:",
          description: "Take 100 shots",
          points: 250,
          condition: ["allTimeStats", "shots", 99],
          completed: false,
        },
        {
          title: "(SOT) Shooting I:",
          description: "Record 2 shots on target in a single game",
          points: 25,
          condition: ["prevGameStats", "shotsOnTarget", 1],
          completed: false,
        },
        {
          title: "(SOT) Shooting II:",
          description: "Record 3 shots on target in a single game",
          points: 75,
          condition: ["prevGameStats", "shotsOnTarget", 2],
          completed: false,
        },
        {
          title: "(SOT) Shooting III:",
          description: "Record 4 shots on target in a single game",
          points: 150,
          condition: ["prevGameStats", "shotsOnTarget", 3],
          completed: false,
        },
        {
          title: "(ATOT) Shooting I:",
          description: "Record 10 shots on target",
          points: 50,
          condition: ["allTimeStats", "shotsOnTarget", 9],
          completed: false,
        },
        {
          title: "(ATOT) Shooting II:",
          description: "Record 25 shots on target",
          points: 100,
          condition: ["allTimeStats", "shotsOnTarget", 24],
          completed: false,
        },
        {
          title: "(ATOT) Shooting III:",
          description: "(SAT) Record 50 shots on target",
          points: 175,
          condition: ["allTimeStats", "shotsOnTarget", 49],
          completed: false,
        },
        {
          title: "(SOF) Shooting I:",
          description: "Record 2 shots off target in a single game",
          points: 10,
          condition: ["allTimeStats", "shotsThatHitPost", 1],
          completed: false,
        },
        {
          title: "(SOF) Shooting II:",
          description: "Record 3 shots off target in a single game",
          points: 20,
          condition: ["prevGameStats", "shotsOffTarget", 2],
          completed: false,
        },
        {
          title: "(SOF) Shooting III:",
          description: "Record 4 shots off target in a single game",
          points: 40,
          condition: ["prevGameStats", "shotsOffTarget", 3],
          completed: false,
        },
        {
          title: "(ATOF) Shooting I:",
          description: "Record 10 shots off target",
          points: 20,
          condition: ["allTimeStats", "shotsOffTarget", 9],
          completed: false,
        },
        {
          title: "(ATOF) Shooting II:",
          description: "Record 25 shots off target",
          points: 45,
          condition: ["allTimeStats", "shotsOffTarget", 24],
          completed: false,
        },
        {
          title: "(ATOF) Shooting III:",
          description: "Record 50 shots off target",
          points: 70,
          condition: ["allTimeStats", "shotsOffTarget", 49],
          completed: false,
        },
        {
          title: "(SHP) Shooting I:",
          description: "Hit the post",
          points: 50,
          condition: ["prevGameStats", "shotsThatHitPost", 0],
          completed: false,
        },
        {
          title: "(SHP) Shooting II:",
          description: "Hit the post 2 times in a single game",
          points: 200,
          condition: ["prevGameStats", "shotsThatHitPost", 1],
          completed: false,
        },
        {
          title: "(ATHP) Shooting I:",
          description: "Hit the post 5 times",
          points: 125,
          condition: ["allTimeStats", "shotsThatHitPost", 4],
          completed: false,
        },
        {
          title: "(ATHP) Shooting II:",
          description: "Hit the post 10 times",
          points: 250,
          condition: ["allTimeStats", "shotsThatHitPost", 9],
          completed: false,
        },
      ],
      [
        {
          title: "(SC) Passing I:",
          description: "Complete 10 passes in a single game",
          points: 25,
          condition: ["prevGameStats", "passesCompleted", 9],
          completed: false,
        },
        {
          title: "(SC) Passing II:",
          description: "Complete 15 passes in a single game",
          points: 50,
          condition: ["prevGameStats", "passesCompleted", 14],
          completed: false,
        },
        {
          title: "(SC) Passing III:",
          description: "Complete 20 passes in a single game",
          points: 75,
          condition: ["prevGameStats", "passesCompleted", 19],
          completed: false,
        },
        {
          title: "(SC) Passing IV:",
          description: "Complete 25 passes in a single game",
          points: 100,
          condition: ["prevGameStats", "passesCompleted", 24],
          completed: false,
        },
        {
          title: "(SC) Passing V:",
          description: "Complete 30 passes in a single game",
          points: 125,
          condition: ["prevGameStats", "passesCompleted", 29],
          completed: false,
        },
        {
          title: "(SC) Passing VI:",
          description: "Complete 35 passes in a single game",
          points: 150,
          condition: ["prevGameStats", "passesCompleted", 34],
          completed: false,
        },
        {
          title: "(ATC) Passing I:",
          description: "Complete 50 passes",
          points: 25,
          condition: ["allTimeStats", "passesCompleted", 49],
          completed: false,
        },
        {
          title: "(ATC) Passing II:",
          description: "Complete 100 passes",
          points: 50,
          condition: ["allTimeStats", "passesCompleted", 99],
          completed: false,
        },
        {
          title: "(ATC) Passing III:",
          description: "Complete 200 passes",
          points: 75,
          condition: ["allTimeStats", "passesCompleted", 199],
          completed: false,
        },
        {
          title: "(ATC) Passing IV:",
          description: "Complete 300 passes",
          points: 100,
          condition: ["allTimeStats", "passesCompleted", 299],
          completed: false,
        },
        {
          title: "(ATC) Passing V:",
          description: "Complete 400 passes",
          points: 125,
          condition: ["allTimeStats", "passesCompleted", 399],
          completed: false,
        },
        {
          title: "(ATC) Passing VI:",
          description: "Complete 500 passes",
          points: 150,
          condition: ["allTimeStats", "passesCompleted", 499],
          completed: false,
        },
        {
          title: "(AS) Passing I:",
          description: "Attempt 20 passes in a single game",
          points: 25,
          condition: ["prevGameStats", "passes", 19],
          completed: false,
        },
        {
          title: "(AS) Passing II:",
          description: "Attempt 25 passes in a single game",
          points: 50,
          condition: ["prevGameStats", "passes", 24],
          completed: false,
        },
        {
          title: "(AS) Passing III:",
          description: "Attempt 30 passes in a single game",
          points: 75,
          condition: ["prevGameStats", "passes", 29],
          completed: false,
        },
        {
          title: "(AS) Passing IV:",
          description: "Attempt 35 passes in a single game",
          points: 25,
          condition: ["prevGameStats", "passes", 34],
          completed: false,
        },
        {
          title: "(AS) Passing V:",
          description: "Attempt 40 passes in a single game",
          points: 50,
          condition: ["prevGameStats", "passes", 39],
          completed: false,
        },
        {
          title: "(AS) Passing VI:",
          description: "Attempt 45 passes in a single game",
          points: 75,
          condition: ["prevGameStats", "passes", 44],
          completed: false,
        },
        {
          title: "(AAT) Passing I:",
          description: "Attempt 75 passes",
          points: 30,
          condition: ["prevGameStats", "passes", 74],
          completed: false,
        },
        {
          title: "(AAT) Passing II:",
          description: "Attempt 200 passes",
          points: 60,
          condition: ["prevGameStats", "passes", 199],
          completed: false,
        },
        {
          title: "(AAT) Passing III:",
          description: "Attempt 325 passes",
          points: 90,
          condition: ["prevGameStats", "passes", 324],
          completed: false,
        },
        {
          title: "(AAT) Passing IV:",
          description: "Attempt 450 passes",
          points: 120,
          condition: ["prevGameStats", "passes", 449],
          completed: false,
        },
        {
          title: "(AAT) Passing V:",
          description: "Attempt 575 passes",
          points: 150,
          condition: ["prevGameStats", "passes", 574],
          completed: false,
        },
        {
          title: "(AAT) Passing VI:",
          description: "Attempt 700 passes",
          points: 180,
          condition: ["prevGameStats", "passes", 699],
          completed: false,
        },
        {
          title: "(MS) Passing I:",
          description: "Miss 3 passes in a single game",
          points: 10,
          condition: ["prevGameStats", "passes", 2],
          completed: false,
        },
        {
          title: "(MS) Passing II:",
          description: "Miss 5 passes in a single game",
          points: 20,
          condition: ["prevGameStats", "passesMissed", 4],
          completed: false,
        },
        {
          title: "(MS) Passing III:",
          description: "Miss 7 passes in a single game",
          points: 30,
          condition: ["prevGameStats", "passesMissed", 6],
          completed: false,
        },
        {
          title: "(MS) Passing IV:",
          description: "Miss 9 passes in a single game",
          points: 40,
          condition: ["prevGameStats", "passesMissed", 8],
          completed: false,
        },
        {
          title: "(MS) Passing V:",
          description: "Miss 11 passes in a single game",
          points: 50,
          condition: ["prevGameStats", "passesMissed", 10],
          completed: false,
        },
        {
          title: "(MS) Passing VI:",
          description: "Miss 15 passes in a single game",
          points: 60,
          condition: ["prevGameStats", "passesMissed", 14],
          completed: false,
        },
        {
          title: "(MAT) Passing I:",
          description: "Miss 25 passes",
          points: 25,
          condition: ["allTimeStats", "passesMissed", 24],
          completed: false,
        },
        {
          title: "(MAT) Passing II:",
          description: "Miss 60 passes",
          points: 50,
          condition: ["allTimeStats", "passesMissed", 59],
          completed: false,
        },
        {
          title: "(MAT) Passing III:",
          description: "Miss 120 passes",
          points: 75,
          condition: ["allTimeStats", "passesMissed", 119],
          completed: false,
        },
        {
          title: "(MAT) Passing IV:",
          description: "Miss 200 passes",
          points: 100,
          condition: ["allTimeStats", "passesMissed", 199],
          completed: false,
        },
        {
          title: "(MAT) Passing V:",
          description: "Miss 300 passes",
          points: 125,
          condition: ["allTimeStats", "passesMissed", 299],
          completed: false,
        },
        {
          title: "(MAT) Passing VI:",
          description: "Miss 400 passes",
          points: 150,
          condition: ["allTimeStats", "passesMissed", 399],
          completed: false,
        },
      ],
      [
        {
          title: "(SC) Dribbling I",
          description: "Complete 4 dribbles in a single game",
          points: 25,
          condition: ["prevGameStats", "dribblesCompleted", 3],
          completed: false,
        },
        {
          title: "(SC) Dribbling II",
          description: "Complete 6 dribbles in a single game",
          points: 50,
          condition: ["prevGameStats", "dribblesCompleted", 5],
          completed: false,
        },
        {
          title: "(SC) Dribbling III",
          description: "Complete 8 dribbles in a single game",
          points: 75,
          condition: ["prevGameStats", "dribblesCompleted", 7],
          completed: false,
        },
        {
          title: "(SC) Dribbling IV",
          description: "Complete 10 dribbles in a single game",
          points: 100,
          condition: ["prevGameStats", "dribblesCompleted", 9],
          completed: false,
        },
        {
          title: "(SC) Dribbling V",
          description: "Complete 12 dribbles in a single game",
          points: 125,
          condition: ["prevGameStats", "dribblesCompleted", 11],
          completed: false,
        },
        {
          title: "(SC) Dribbling VI",
          description: "Complete 14 dribbles in a single game",
          points: 150,
          condition: ["prevGameStats", "dribblesCompleted", 13],
          completed: false,
        },
        {
          title: "(ATC) Dribbling I",
          description: "Complete 15 dribbles",
          points: 25,
          condition: ["allTimeStats", "dribblesCompleted", 14],
          completed: false,
        },
        {
          title: "(ATC) Dribbling II",
          description: "Complete 25 dribbles",
          points: 50,
          condition: ["allTimeStats", "dribblesCompleted", 24],
          completed: false,
        },
        {
          title: "(ATC) Dribbling III",
          description: "Complete 35 dribbles",
          points: 75,
          condition: ["allTimeStats", "dribblesCompleted", 34],
          completed: false,
        },
        {
          title: "(ATC) Dribbling IV",
          description: "Complete 50 dribbles",
          points: 125,
          condition: ["allTimeStats", "dribblesCompleted", 49],
          completed: false,
        },
        {
          title: "(ATC) Dribbling V",
          description: "Complete 75 dribbles",
          points: 200,
          condition: ["allTimeStats", "dribblesCompleted", 74],
          completed: false,
        },
        {
          title: "(ATC) Dribbling VI",
          description: "Complete 100 dribbles",
          points: 300,
          condition: ["allTimeStats", "dribblesCompleted", 99],
          completed: false,
        },
        {
          title: "(AS) Dribbling I",
          description: "Attempt 5 dribbles in a single game",
          points: 30,
          condition: ["prevGameStats", "dribbles", 4],
          completed: false,
        },
        {
          title: "(AS) Dribbling II",
          description: "Attempt 8 dribbles in a single game",
          points: 60,
          condition: ["prevGameStats", "dribbles", 7],
          completed: false,
        },
        {
          title: "(AS) Dribbling III",
          description: "Attempt 11 dribbles in a single game",
          points: 90,
          condition: ["prevGameStats", "dribbles", 10],
          completed: false,
        },
        {
          title: "(AS) Dribbling IV",
          description: "Attempt 14 dribbles in a single game",
          points: 120,
          condition: ["prevGameStats", "dribbles", 13],
          completed: false,
        },
        {
          title: "(AS) Dribbling V",
          description: "Attempt 17 dribbles in a single game",
          points: 150,
          condition: ["prevGameStats", "dribbles", 16],
          completed: false,
        },
        {
          title: "(AS) Dribbling VI",
          description: "Attempt 20 dribbles in a single game",
          points: 180,
          condition: ["prevGameStats", "dribbles", 19],
          completed: false,
        },
        {
          title: "(AAT) Dribbling I",
          description: "Attempt 20 dribbles",
          points: 25,
          condition: ["allTimeStats", "dribbles", 19],
          completed: false,
        },
        {
          title: "(AAT) Dribbling II",
          description: "Attempt 40 dribbles",
          points: 50,
          condition: ["allTimeStats", "dribbles", 39],
          completed: false,
        },
        {
          title: "(AAT) Dribbling III",
          description: "Attempt 60 dribbles",
          points: 75,
          condition: ["allTimeStats", "dribbles", 59],
          completed: false,
        },
        {
          title: "(AAT) Dribbling IV",
          description: "Attempt 75 dribbles",
          points: 100,
          condition: ["allTimeStats", "dribbles", 74],
          completed: false,
        },
        {
          title: "(AAT) Dribbling V",
          description: "Attempt 100 dribbles",
          points: 125,
          condition: ["allTimeStats", "dribbles", 99],
          completed: false,
        },
        {
          title: "(AAT) Dribbling VI",
          description: "Attempt 150 dribbles",
          points: 175,
          condition: ["allTimeStats", "dribbles", 149],
          completed: false,
        },
        {
          title: "(MS) Dribbling I",
          description: "Fail 2 dribbles in a single game",
          points: 10,
          condition: ["prevGameStats", "dribblesFailed", 1],
          completed: false,
        },
        {
          title: "(MS) Dribbling II",
          description: "Fail 4 dribbles in a single game",
          points: 20,
          condition: ["prevGameStats", "dribblesFailed", 3],
          completed: false,
        },
        {
          title: "(MS) Dribbling III",
          description: "Fail 6 dribbles in a single game",
          points: 30,
          condition: ["prevGameStats", "dribblesFailed", 5],
          completed: false,
        },
        {
          title: "(MS) Dribbling IV",
          description: "Fail 8 dribbles in a single game",
          points: 40,
          condition: ["prevGameStats", "dribblesFailed", 7],
          completed: false,
        },
        {
          title: "(MS) Dribbling V",
          description: "Fail 10 dribbles in a single game",
          points: 50,
          condition: ["prevGameStats", "dribblesFailed", 9],
          completed: false,
        },
        {
          title: "(MS) Dribbling VI",
          description: "Fail 12 dribbles in a single game",
          points: 100,
          condition: ["prevGameStats", "dribblesFailed", 11],
          completed: false,
        },
        {
          title: "(MAT) Dribbling I",
          description: "Fail 15 dribbles",
          points: 10,
          condition: ["allTimeStats", "dribblesFailed", 14],
          completed: false,
        },
        {
          title: "(MAT) Dribbling II",
          description: "Fail 30 dribbles",
          points: 20,
          condition: ["allTimeStats", "dribblesFailed", 29],
          completed: false,
        },
        {
          title: "(MAT) Dribbling III",
          description: "Fail 45 dribbles",
          points: 30,
          condition: ["allTimeStats", "dribblesFailed", 44],
          completed: false,
        },
        {
          title: "(MAT) Dribbling IV",
          description: "Fail 60 dribbles",
          points: 40,
          condition: ["allTimeStats", "dribblesFailed", 59],
          completed: false,
        },
        {
          title: "(MAT) Dribbling V",
          description: "Fail 75 dribbles",
          points: 50,
          condition: ["allTimeStats", "dribblesFailed", 74],
          completed: false,
        },
        {
          title: "(MAT) Dribbling VI",
          description: "Fail 90 dribbles",
          points: 60,
          condition: ["allTimeStats", "dribblesFailed", 89],
          completed: false,
        },
      ],
    ];
  });
  const [storeItems, setStoreItems] = React.useState(() => {
    const storedStoreItems = JSON.parse(localStorage.getItem("storeItems"));
    if (storedStoreItems) return storedStoreItems;

    return [
      {
        title: "Argentina Jersey",
        cost: 250,
        redeemed: false,
      },
      {
        title: "Argentina Shorts",
        cost: 250,
        redeemed: false,
      },
      {
        title: "Argentina Shoes",
        cost: 250,
        redeemed: false,
      },
      {
        title: "Argentina Badge",
        cost: 250,
        redeemed: false,
      },
      {
        title: "Brazil Jersey",
        cost: 150,
        redeemed: false,
      },
      {
        title: "Brazil Shorts",
        cost: 150,
        redeemed: false,
      },
      {
        title: "Brazil Shoes",
        cost: 150,
        redeemed: false,
      },
      {
        title: "Brazil Badge",
        cost: 150,
        redeemed: false,
      },
      {
        title: "France Jersey",
        cost: 150,
        redeemed: false,
      },
      {
        title: "France Shorts",
        cost: 150,
        redeemed: false,
      },
      {
        title: "France Shoes",
        cost: 150,
        redeemed: false,
      },
      {
        title: "France Badge",
        cost: 150,
        redeemed: false,
      },
    ];
  });

  function getBackgroundColor(achievementIndex) {
    if (tabState === 0) {
      if (achievementIndex >= 0 && achievementIndex < 3) {
        return "#8852b7";
      } else if (achievementIndex >= 3 && achievementIndex < 8) {
        return "#5b347c";
      } else if (achievementIndex >= 8 && achievementIndex < 11) {
        return "#5282b7";
      } else {
        return "#2c598b";
      }
    } else if (tabState === 1) {
      if (achievementIndex >= 0 && achievementIndex < 3) {
        return "#8852b7";
      } else if (achievementIndex >= 3 && achievementIndex < 8) {
        return "#5b347c";
      } else if (achievementIndex >= 8 && achievementIndex < 11) {
        return "#5282b7";
      } else if (achievementIndex >= 11 && achievementIndex < 14) {
        return "#2c598b";
      } else if (achievementIndex >= 14 && achievementIndex < 17) {
        return "#b75552";
      } else if (achievementIndex >= 17 && achievementIndex < 20) {
        return "#983733";
      } else if (achievementIndex >= 20 && achievementIndex < 22) {
        return "#81b752";
      } else {
        return "#527731";
      }
    } else if (tabState === 2 || tabState === 3) {
      if (achievementIndex >= 0 && achievementIndex < 6) {
        return "#8852b7";
      } else if (achievementIndex >= 6 && achievementIndex < 12) {
        return "#5b347c";
      } else if (achievementIndex >= 12 && achievementIndex < 18) {
        return "#5282b7";
      } else if (achievementIndex >= 18 && achievementIndex < 24) {
        return "#2c598b";
      } else if (achievementIndex >= 24 && achievementIndex < 30) {
        return "#b75552";
      } else if (achievementIndex >= 30 && achievementIndex < 36) {
        return "#983733";
      }
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
  React.useEffect(() => {
    if (tabState !== 4) {
      const updatedAchievements = [...achievements];
      let pointsToAdd = 0;
      let newCompletes = 0;

      updatedAchievements[tabState].forEach((achievement, index) => {
        let percent = 0;

        if (achievement.condition[0] === "prevGameStats") {
          if (
            prevGameStats[achievement.condition[1]] > achievement.condition[2]
          ) {
            percent = 100;
          } else {
            percent = (
              (highscores[achievement.condition[1]] /
                (achievement.condition[2] + 1)) *
              100
            ).toFixed(0);
          }
        } else if (achievement.condition[0] === "allTimeStats") {
          if (
            allTimeStats[achievement.condition[1]] > achievement.condition[2]
          ) {
            percent = 100;
          } else {
            percent = (
              (allTimeStats[achievement.condition[1]] /
                (achievement.condition[2] + 1)) *
              100
            ).toFixed(0);
          }
        }

        if (percent === 100 && !achievement.completed) {
          updatedAchievements[tabState][index].completed = true;
          pointsToAdd += achievement.points;
          newCompletes += 1;
        }
      });

      if (pointsToAdd > 0) {
        setAchievements(() => {
          localStorage.setItem(
            "storedAchievments",
            JSON.stringify(updatedAchievements)
          );
          return updatedAchievements;
        });
        setPoints((prevPoints) => {
          const newPoints = prevPoints + pointsToAdd;
          localStorage.setItem("storedPoints", newPoints);
          return newPoints;
        });

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
        let newPoints = points + pointsToAdd;

        for (let i = titles.length - 1; i >= 0; i--) {
          if (newPoints >= titles[i].requirement) {
            newTitle = titles[i].title;
            level = i;
            break;
          }
        }

        Toast.fire({
          icon: "success",
          title: `You completed ${newCompletes} new achievements`,
          text: `This has awarded you ${pointsToAdd} points`,
        }).then(() => {
          if (currentTitle !== newTitle)
            Toast.fire({
              icon: "success",
              title: `You are now level ${level}`,
              text: `This has awarded you the ${newTitle} title`,
            });
        });
      }
    }
  }, [
    prevGameStats,
    allTimeStats,
    highscores,
    tabState,
    achievements,
    setPoints,
    points,
  ]);

  const tabsMapping = tabs.map((tab, tabIndex) => {
    return (
      <div
        key={tabIndex}
        className={
          tabIndex === tabState ? `achievement-tab active` : `achievement-tab`
        }
        onClick={() => {
          setTabState(tabIndex);
        }}
      >
        {tab}
      </div>
    );
  });

  const achievementsMapping =
    tabState !== 4
      ? achievements[tabState].map((achievement, achievementIndex) => {
          let percent = 0;

          if (achievement.condition[0] === "prevGameStats") {
            percent =
              prevGameStats[achievement.condition[1]] > achievement.condition[2]
                ? 100
                : (
                    (highscores[achievement.condition[1]] /
                      (achievement.condition[2] + 1)) *
                    100
                  ).toFixed(0);
          } else if (achievement.condition[0] === "allTimeStats") {
            percent =
              allTimeStats[achievement.condition[1]] > achievement.condition[2]
                ? 100
                : (
                    (allTimeStats[achievement.condition[1]] /
                      (achievement.condition[2] + 1)) *
                    100
                  ).toFixed(0);
          }

          return (
            <div
              className={`achievement ${
                parseInt(percent) === 100 ? "completed" : ""
              }`}
              style={{ backgroundColor: getBackgroundColor(achievementIndex) }}
              key={achievementIndex}
            >
              <div className="achievement-top">
                <div className="achievement-header">{achievement.title}</div>
                {parseInt(percent) !== 100 ? (
                  <div className="achievement-progressbar-outer">
                    <div
                      className="achievement-progressbar-inner"
                      style={{
                        width: `${
                          parseInt(percent) < 5
                            ? "10px"
                            : `${parseInt(percent) - 2}%`
                        }`,
                      }}
                    >
                      {percent}%
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="achievement-description">
                {achievement.description}
              </div>
              <div
                className={`achievement-points ${
                  parseInt(percent) === 100 ? "completed" : ""
                }`}
              >
                {achievement.points} pts
              </div>
            </div>
          );
        })
      : storeItems.map((storeItem, storeItemIndex) => {
          return (
            <div
              className={`achievement-store ${
                storeItem.redeemed ? "redeemed" : ""
              }`}
              key={storeItemIndex}
            >
              <div className="achievement-store-header">{storeItem.title}</div>
              <div className="achievement-store-body">
                <div className="achievement-store-cost">
                  {storeItem.cost} pts
                </div>
                <button
                  className={`achievement-store-btn ${
                    storeItem.redeemed ? "redeemed" : ""
                  }`}
                  onClick={() => {
                    if (!storeItem.redeemed && storeItem.cost <= points) {
                      const newPoints = points - storeItem.cost;

                      setGear((prevGear) => {
                        const newGear = { ...prevGear };

                        const [itemName, itemType] = storeItem.title.split(" ");

                        newGear[itemType.toLowerCase()].push(itemName);

                        localStorage.setItem("gear", JSON.stringify(newGear));

                        console.log(newGear);

                        return newGear;
                      });
                      setPoints(() => {
                        localStorage.setItem("storedPoints", newPoints);
                        return newPoints;
                      });
                      setStoreItems((prevStoreItems) => {
                        const newStoreItems = [...prevStoreItems];
                        newStoreItems[storeItemIndex].redeemed = true;
                        localStorage.setItem(
                          "storeItems",
                          JSON.stringify(newStoreItems)
                        );
                        return newStoreItems;
                      });

                      Toast.fire({
                        icon: "success",
                        title: `You have purchased ${storeItem.title}`,
                        text: `This leaves you with ${newPoints} points`,
                      });
                    } else if (storeItem.cost > points) {
                      Toast.fire({
                        icon: "error",
                        title: `${points} out of ${storeItem.cost} required for ${storeItem.title}`,
                      });
                    }
                  }}
                >
                  {storeItem.redeemed ? "Redeemed" : "Reedem"}
                </button>
              </div>
            </div>
          );
        });

  return (
    <div className="section">
      <div className="section-header">Achievements</div>
      <hr className="horizontal-line" />

      <div className="achievements-content">
        <div className="achievement-tabs">{tabsMapping}</div>
        <div className="achievements">{achievementsMapping}</div>
      </div>
    </div>
  );
}

export default Achievements;
