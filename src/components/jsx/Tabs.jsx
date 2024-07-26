import React from "react";
import "../css/Tabs.css";

function Tabs({ tabStates, setTabStates }) {
  const handleTabClick = (index) => {
    setTabStates(() => {
      const newStates = [0, 0, 0, 0, 0, 0, 0, 0];
      newStates[index] = 1;
      return newStates;
    });
  };

  return (
    <ul className="tabs">
      <li
        className={tabStates[0] === 1 ? `tab active` : `tab`}
        onClick={() => handleTabClick(0)}
      >
        In Game
      </li>
      <li
        className={tabStates[1] === 1 ? `tab active` : `tab`}
        onClick={() => handleTabClick(1)}
      >
        Analytics
      </li>
      <li
        className={tabStates[2] === 1 ? `tab active` : `tab`}
        onClick={() => handleTabClick(2)}
      >
        Feedback
      </li>
      <li
        className={tabStates[3] === 1 ? `tab active` : `tab`}
        onClick={() => handleTabClick(3)}
      >
        All Time
      </li>
      <li
        className={tabStates[4] === 1 ? `tab active` : `tab`}
        onClick={() => handleTabClick(4)}
      >
        Highscores
      </li>
      <li
        className={tabStates[5] === 1 ? `tab active` : `tab`}
        onClick={() => handleTabClick(5)}
      >
        Achievements
      </li>
      <li
        className={tabStates[6] === 1 ? `tab active` : `tab`}
        onClick={() => handleTabClick(6)}
      >
        History
      </li>
      <img
        className="profile-picture"
        src="images/default_avatar_img.jpeg"
        onClick={() => handleTabClick(7)}
      />
    </ul>
  );
}

export default Tabs;
