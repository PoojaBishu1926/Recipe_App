import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  console.log({ _ });
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      console.log(res.data);
      // {res.data.status!=200?"Please enter valid user or password":""}
      setCookies("access_token", res.data.token);
      console.log(`UserID for setting the value of user Id ${JSON.stringify(res.data)}`)
      window.localStorage.setItem("userID", res.data.userID);
      navigate("/");
    } catch (e) {
      console.log(`Error In Login`, e);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now Login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div
      className="cold-4 position-relative"
      style={{ margin: "auto", width: "10%", textAlign: "center" }}
    >
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="input-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            className="cold-4 position-relative"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            className="cold-4 position-relative"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {label}
        </button>
      </form>
    </div>
  );
};
