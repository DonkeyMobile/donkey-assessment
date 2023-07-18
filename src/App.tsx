import React from 'react';
import './App.css';
import {useRoutes} from "react-router-dom";
import SignInPage from "./pages/signin/SignInPage";
import HomePage from "./pages/homepage/HomePage";
import {Uploadposts} from "./pages/uploadpost/Uploadpost";
const App: React.FC = () => {
    const routes = useRoutes([
        { path: '/', element: <SignInPage /> },
        { path: '/homepage', element: <HomePage /> },
        { path: '/uploadpost', element: <Uploadposts /> },
    ]);
  return routes
}
export default App;
