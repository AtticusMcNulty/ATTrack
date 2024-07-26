import React from "react";
import "../css/Profile.css";

function Profile({ user, setUsers, points, setLoggedIn, gear }) {
  const [updateInfo, setUpdateInfo] = React.useState(false);
  const [titles, setTitles] = React.useState([
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
  ]);
  const [level, setLevel] = React.useState(1);
  const [title, setTitle] = React.useState("Rookie");
  const [curGear, setCurGear] = React.useState(() => {
    const storedCurGear = JSON.parse(localStorage.getItem("curGear"));
    if (storedCurGear) return storedCurGear;

    return [
      ["Default", "Default"],
      ["Default", "Default"],
    ];
  });

  React.useEffect(() => {
    if (updateInfo) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [updateInfo]);

  React.useEffect(() => {
    setTitle(() => {
      let currentTitle = titles[0].title;

      for (let i = titles.length - 1; i >= 0; i--) {
        if (points >= titles[i].requirement) {
          currentTitle = titles[i].title;
          setLevel(i + 1);
          break;
        }
      }

      return currentTitle;
    });
  }, [points]);

  const profileMapping = Object.entries(user).map(
    ([infoKey, infoValue], infoIndex) => {
      const infoName = infoKey.replace(/([A-Z])/g, " $1");

      return (
        <div className="profile-info" key={infoIndex}>
          <div className="profile-info-label">{infoName}:</div>
          <div className="profile-info-value">{infoValue}</div>
        </div>
      );
    }
  );

  const updateMapping = Object.entries(user).map(
    ([infoKey, infoValue], infoIndex) => {
      const infoName = infoKey.replace(/([A-Z])/g, " $1");

      return (
        <input
          key={infoIndex}
          className="login-input"
          type={
            infoKey !== "dateOfBirth" && infoKey !== "age"
              ? `${infoKey}`
              : infoKey !== "age"
              ? "date"
              : "number"
          }
          name={`${infoKey}`}
          value={infoValue}
          onChange={(event) =>
            setUsers(() => {
              localStorage.setItem(
                "users",
                JSON.stringify({
                  ...user,
                  [event.target.name]: event.target.value,
                })
              );
              return {
                ...user,
                [event.target.name]: event.target.value,
              };
            })
          }
          placeholder={`${infoName}`}
          required
        />
      );
    }
  );

  const rows = [
    ["row1", "jersey", "shorts"],
    ["row2", "shoes", "badge"],
  ];

  const gearMapping = rows.map((row, rowIndex) => {
    const gearTypes = [rows[rowIndex][1], rows[rowIndex][2]].map(
      (type, typeIndex) => {
        return (
          <div key={typeIndex} className="profile-gear-item">
            <select
              className="profile-gear-select"
              value={curGear[rowIndex][typeIndex]}
              onChange={(event) =>
                setCurGear((prevCurGear) => {
                  const newCurGear = [...prevCurGear];
                  newCurGear[rowIndex][typeIndex] = event.target.value;
                  localStorage.setItem("curGear", JSON.stringify(newCurGear));
                  return newCurGear;
                })
              }
            >
              {gear[type].map((item, itemIndex) => (
                <option key={itemIndex}>{item}</option>
              ))}
            </select>
            <img
              className="profile-gear-img"
              src={`images/${curGear[rowIndex][
                typeIndex
              ].toLowerCase()}_${type}.png`}
              alt={`${type}`}
            />
          </div>
        );
      }
    );

    return (
      <div key={rowIndex} className="profile-gear-row">
        {gearTypes}
      </div>
    );
  });

  return (
    <div className="section">
      {updateInfo ? (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <div className="profile-modal-header">
              <div className="profile-modal-title">Profile</div>
              <div
                className="profile-modal-close"
                onClick={() => {
                  setUpdateInfo(false);
                }}
              >
                &times;
              </div>
            </div>
            {updateMapping}
            <button
              className="profile-modal-btn"
              onClick={() => setUpdateInfo(false)}
            >
              Update Info
            </button>
          </div>
        </div>
      ) : null}

      <div className="section-header">Profile</div>
      <hr className="horizontal-line" />
      <div className="profile">
        <div className="profile-content">
          <div className="profile-infos">
            {profileMapping}
            <div className="profile-info">
              <div className="profile-info-label">Title:</div>
              <div className="profile-info-value title">{title}</div>
            </div>
            <div className="profile-info">
              <div className="profile-info-label">Level:</div>
              <div className="profile-info-value level">{level}</div>
            </div>
            <div className="profile-info">
              <div className="profile-info-label">Points:</div>
              <div className="profile-info-value points">
                {titles[level]
                  ? `${points} /
                ${titles[level].requirement}`
                  : points}
              </div>
            </div>
          </div>
          <button
            className="profile-updatebtn"
            onClick={() => setUpdateInfo(true)}
          >
            Update Info
          </button>
          <button
            className="profile-logoutbtn"
            onClick={() =>
              setLoggedIn(() => {
                localStorage.setItem("loggedIn", false);
                return false;
              })
            }
          >
            Logout
          </button>
        </div>
        <div className="profile-gear">
          <div className="profile-gear-header">Gear</div>
          {gearMapping}
        </div>
      </div>
    </div>
  );
}

export default Profile;
