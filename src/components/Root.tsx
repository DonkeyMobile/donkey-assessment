import { Outlet } from "react-router-dom"
import './Root.css';

export const Root = () => {
    return (
    <div>
        <header>
            <h1>Pidgeon mobile</h1>
        </header>
        <Outlet />
    </div>
    )
}