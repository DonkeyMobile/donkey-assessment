import React, { useEffect, useState } from "react";
import userData from "../data/users.json";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

interface LoginPageProps {
  user: User | null;
  onLogin: (data: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ user, onLogin }) => {
  const { users } = userData;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/mainpage");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username) {
      setError("Gebruikersnaam is een verplicht veld");
      return;
    }

    if (!username || !password) {
      setError("Wachtwoord is een verplicht veld");
      return;
    }

    const userLoggingIn = users.find((user) => user.username === username);

    if (userLoggingIn?.password === password) {
      onLogin(userLoggingIn);
      localStorage.setItem("currentUser", JSON.stringify(userLoggingIn));
      navigate("/mainpage");
    } else {
      setError("Gebruikersnaam of wachtwoord is incorrect");
    }
  };
  return (
    <div className="loginBox">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Gebruikersnaam:</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Wachtwoord:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Inloggen</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
