import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Applogo = require("../assets/logo.png");

type LoginProps = {
  setIsLogged: (value: boolean) => void;
};

function Login({ setIsLogged }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    message: "",
  });

  const navigate = useNavigate();

  const database = [
    {
      username: "Gebruiker",
      password: "Welkom123",
    },
  ];

  const errors = {
    username: "Ongeldige gebruikersnaam",
    password: "Ongeldig wachtwoord",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = database.find((user) => user.username === username);

    if (userData) {
      if (userData.password !== password) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setIsLogged(true);
        localStorage.setItem("isLoggedIn", "1");
        navigate("/");
      }
    } else {
      setErrorMessages({ name: "username", message: errors.username });
    }
  };

  const renderErrorMessage = (name: string) =>
    name === errorMessages?.name && (
      <div className="error">{errorMessages?.message}</div>
    );

  return (
    <div className="container">
      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <img className="logo" src={Applogo} alt="Logo" />
        <label htmlFor="Username">Gebruikersnaam </label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {renderErrorMessage("username") || null}
        <label htmlFor="Password">Wachtwoord </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {renderErrorMessage("password")}
        <button className="submit" type="submit">
          Inloggen
        </button>
      </form>
      <button className="link-button">
        Heb je nog geen account?
        <br />
        Registreer je hier.
      </button>
    </div>
  );
}

export default Login;
