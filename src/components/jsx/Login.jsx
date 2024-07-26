import React from "react";
import "../css/Login.css";

function Login({ users, setUsers, setLoggedIn, setUser }) {
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });
  const [createAccData, setCreateAccData] = React.useState({
    username: "",
    password: "",
    name: "",
    age: "",
    club: "",
    dateOfBirth: "",
  });
  const [formType, setFormType] = React.useState("login");
  const [showError, setShowError] = React.useState(false);

  const createAccountMapping = Object.entries(createAccData).map(
    ([infoKey, infoValue], infoIndex) => {
      let infoName = infoKey.replace(/([A-Z])/g, " $1");
      infoName = infoName.charAt(0).toUpperCase() + infoName.slice(1);

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
          value={createAccData[infoKey]}
          onChange={(event) =>
            setCreateAccData({
              ...createAccData,
              [event.target.name]: event.target.value,
            })
          }
          placeholder={`${infoName}`}
          minLength={infoKey === "password" ? 8 : "none"}
          maxLength={infoKey === "password" ? 16 : "none"}
          required
        />
      );
    }
  );

  const handleLogin = () => {
    const user = users.find(
      (user) =>
        user.username === loginData.username &&
        user.password === loginData.password
    );

    if (user) {
      setUser(() => {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      });
      setLoggedIn(() => {
        localStorage.setItem("loggedIn", true);
        return true;
      });
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
    }
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => {
      localStorage.setItem("users", JSON.stringify([...prevUsers, newUser]));
      return [...prevUsers, newUser];
    });
  };

  return (
    <div className="login-overlay">
      {formType === "login" ? (
        <div className="login-content">
          <h2>Login</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleLogin();
            }}
            className="login-form"
          >
            <input
              className="login-input"
              type="username"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  [event.target.name]: event.target.value,
                })
              }
              required
            />
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  [event.target.name]: event.target.value,
                })
              }
              required
            />
            <div className={`login-error ${showError ? "show" : ""}`}>
              Invalid username or password
            </div>
            <button type="submit" className="login-submit">
              Login
            </button>
          </form>
          <div
            className="login-switch"
            onClick={() => setFormType("createAccount")}
          >
            Create Account
          </div>
        </div>
      ) : (
        <div className="login-content">
          <h2>Create Account</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addUser(createAccData);
              setFormType("login");
            }}
            className="login-form"
          >
            {createAccountMapping}
            <button type="submit" className="login-submit">
              Create Account
            </button>
          </form>
          <div
            className="login-switch createAcc"
            onClick={() => setFormType("login")}
          >
            Login
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
