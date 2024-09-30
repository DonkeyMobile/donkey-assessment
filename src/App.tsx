import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Root } from "./components/Root";
import { MainPage } from "./pages/MainPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { User } from "./types";

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await localStorage.getItem("currentUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogin = (userLoggingIn: User | null) => {
    setUser(userLoggingIn);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} onLogout={handleLogout} />,
      children: [
        {
          path: "/",
          element: <LoginPage user={user} onLogin={handleLogin} />,
        },
        {
          path: "/mainpage",
          element: (
            <ProtectedRoute user={user}>
              <MainPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
