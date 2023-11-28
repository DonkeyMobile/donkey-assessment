import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn && loggedIn === "1") {
      setIsLoggedIn(true);
    } 
  }, [isLoggedIn]);

  return (
    <div className="main-container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Main /> : <Login setIsLogged={setIsLoggedIn} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
