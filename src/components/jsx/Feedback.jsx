import React from "react";
import "../css/Feedback.css";

function Feedback({ prevGameStats, gameHistory }) {
  const [prevGameAvaliable, setPrevGameAvaliable] = React.useState(false);

  React.useEffect(() => {
    setPrevGameAvaliable(true);
  }, [prevGameStats]);

  const feedbackAreas = [
    {
      header: "Scoreline",
      content: `${prevGameStats.scored} - ${prevGameStats.conceded}`,
      icon: "⚽",
    },
    {
      header: "Minutes Played",
      content: `${prevGameStats.minutes}`,
      icon: "⏱️",
    },
    {
      header: "Match Rating",
      content: `${prevGameStats.matchRating.toFixed(1)}`,
      icon: "⭐",
    },
    { header: "Grade", icon: "🏅" },
    { header: "Summary", icon: "📋" },
  ];
  const rankings = [
    {
      minStat: 10,
      summary: "Outstanding performance! You were a real asset to the team!",
      grade: "A+",
    },
    {
      minStat: 9,
      summary:
        "Excellent performance! You made a significant contribution to the team's success.",
      grade: "A",
    },
    {
      minStat: 8.5,
      summary:
        "Great performance! You played an important role in the team's success.",
      grade: "A-",
    },
    {
      minStat: 8,
      summary:
        "Good performance, but there is room for improvement. Keep working hard!",
      grade: "B+",
    },
    {
      minStat: 7.5,
      summary:
        "Solid performance, but there were some areas where you could have done better.",
      grade: "B",
    },
    {
      minStat: 7,
      summary: "Decent performance, but we know you can do better.",
      grade: "B-",
    },
    {
      minStat: 6.5,
      summary:
        "Above average performance. Let's focus on improving in training.",
      grade: "C+",
    },
    {
      minStat: 5.5,
      summary:
        "Average performance. We need you to step up and play to your full potential.",
      grade: "C",
    },
    {
      minStat: 4.5,
      summary:
        "Below average performance. We believe in your abilities, but we need to see more from you.",
      grade: "C-",
    },
    {
      minStat: 4,
      summary:
        "Poor performance. Let's work together to identify areas to improve.",
      grade: "D+",
    },
    {
      minStat: 3.5,
      summary:
        "Terrible performance. We know you can do better than this, let's work on it together.",
      grade: "D",
    },
    {
      minStat: 3,
      summary:
        "Unacceptable performance. We need to see significant improvements in your play.",
      grade: "D-",
    },
    {
      minStat: 0,
      summary:
        "Abysmal performance. You need to step up your game significantly.",
      grade: "F",
    },
  ];
  const adviceList = [
    {
      condition: prevGameStats.shots < 2,
      description: `You took ${
        prevGameStats.shots === 0 ? "0 shots" : "1 shot"
      } this game. Remember, you miss 100% of the shots you don't take. Every missed shot is an opportunity to learn and improve your technique for the next one.`,
    },
    {
      condition: prevGameStats.assists === 0 && prevGameStats.keyPasses === 0,
      description: `You failed to create any notable chances this game. Focus on improving your awareness and decision-making skills on the field, and always look for opportunities to create space and make passes that can open up scoring chances for your team.`,
    },
    {
      condition: prevGameStats.shotsOnTargetPercentage < 0.33,
      description: `Only ${(
        prevGameStats.shotsOnTargetPercentage * 100
      ).toFixed(
        2
      )}% of your shots were on target this game. Take a moment to analyze your shooting technique and approach, practice your accuracy through drills and repetition, and maintain a confident and composed mindset when in front of the goal.`,
    },
    {
      condition: prevGameStats.passes < 20,
      description: `You attempted only ${prevGameStats.passes} passes, suggesting you were not involved enough in the game. Try to be more proactive and engaged by constantly scanning the field, moving into open spaces, and looking to make quick passes to your teammates to help in build-up play.`,
    },
    {
      condition: prevGameStats.passCompletionPercentage < 0.6,
      description: `You completed only ${(
        prevGameStats.passCompletionPercentage * 100
      ).toFixed(
        2
      )}% of your passes. Improve your passing accuracy by focusing on your technique, maintaining your composure under pressure, and constantly communicating with your teammates to better understand their movements and positioning on the field.`,
    },
    {
      condition: prevGameStats.dribbles < 4,
      description: `You attempted ${
        prevGameStats.dribbles === 1
          ? "1 dribble"
          : `${prevGameStats.dribbles} dribbles`
      } this game. Don't be afraid to take on defenders, use your speed and skill to create space, and always be confident in your abilities to beat your opponent and make an impact on the game.`,
    },
    {
      condition: prevGameStats.dribbleSuccessPercentage < 0.4,
      description: `With a dribble completion rate of ${(
        prevGameStats.dribbleSuccessPercentage * 100
      ).toFixed(
        2
      )}%, you lost the ball too much. Work on your dribbling technique and improve your ability to read defenders, anticipate their movements, and execute quick changes of direction to increase your ability to beat your defender. Utilize efficient moves and note the body position of the defender. If you get them to shift their body weight one way, then you should attack the other.`,
    },
    {
      condition: prevGameStats.tackles < 4,
      description: `You attempted ${
        prevGameStats.tackles === 1
          ? "1 tackle"
          : `${prevGameStats.tackles} tackles`
      } this game. Stay alert and engaged in the game, anticipate the movements of the opposing players, and work on your timing and technique to make effective tackles and disrupt their attack, helping your team to regain possession and control the game.`,
    },
    {
      condition: prevGameStats.duelsWon < prevGameStats.duelsLost,
      description: `You lost ${
        prevGameStats.duelsLost - prevGameStats.duelsWon
      } more duels than you won. Improve your physicality and mental toughness, focus on your positioning and timing, and practice your defensive techniques to increase your chances of winning duels and regaining possession for your team.`,
    },
    {
      condition: prevGameStats.turnovers > 2,
      description: `You turned the ball over ${prevGameStats.turnovers} times. Stay aware of your surroundings and constantly scan the field for available passing options before receiving the ball. The best players check their shoulder multiple times before receiving a pass in order to determine the best option.`,
    },
    {
      condition: prevGameStats.redCard === 1,
      description: `You obtained a red card in your match. Although this is never the ideal outcome, sometimes showing passion and determination to defend your team's honor is admirable, so keep that fire burning, learn from the experience, and strive to maintain a balance between assertiveness and sportsmanship in future games.`,
    },
  ];

  const feedbackMapping = feedbackAreas.map((feedbackArea, headerIndex) => {
    const ranking = rankings.find(
      (grade) => prevGameStats.matchRating >= grade.minStat
    );

    return feedbackArea.header !== "Summary" ? (
      <div key={headerIndex} className="feedback-item">
        <div className="feedback-icon">{feedbackArea.icon}</div>
        <div className="feedback-content">
          <div className="feedback-header">{feedbackArea.header}</div>
          <div className="feedback-text">
            {feedbackArea.header !== "Grade"
              ? feedbackArea.content
              : ranking.grade}
          </div>
        </div>
      </div>
    ) : (
      <div key="summary" className="feedback-item">
        <div className="feedback-icon">{feedbackArea.icon}</div>
        <div className="feedback-content">
          <div className="feedback-header">Summary</div>
          {prevGameAvaliable && gameHistory.length > 0 ? (
            <div className="feedback-text">{ranking.summary}</div>
          ) : null}
          {prevGameAvaliable && gameHistory.length > 0
            ? adviceList
                .filter((advice) => advice.condition)
                .map((advice, adviceIndex) => (
                  <div key={adviceIndex} className="feedback-summary-advice">
                    {advice.description}
                  </div>
                ))
            : null}
        </div>
      </div>
    );
  });

  return (
    <div className="section feedback-section">
      <div className="section-header">Feedback</div>
      <hr className="horizontal-line" />

      <div className="feedback">
        {feedbackMapping}
        <div className="notes-content">
          <div className="notes-header">Personal Notes</div>
          <textarea className="notes-textarea"></textarea>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
