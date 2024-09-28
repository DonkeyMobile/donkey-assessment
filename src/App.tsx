import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {LoginPage} from "./pages/LoginPage";
import { Root } from "./components/Root";
import { MainPage } from "./pages/MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <LoginPage />,
        },
        {
          path: "/mainpage",
          element: <MainPage />,
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;