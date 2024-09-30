import { Outlet } from "react-router-dom";
import "./Root.css";
import { User } from "../types";

interface RootProps {
  user: User | null;
  onLogout: () => void;
}

export const Root: React.FC<RootProps> = ({ user, onLogout }) => {
  return (
    <div>
      <header>
        <h1>Pidgeon mobile</h1>
        {user && <button onClick={onLogout}>Uitloggen</button>}
      </header>
      <Outlet />
    </div>
  );
};
