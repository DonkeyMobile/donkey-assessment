import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { BrowserRouter } from "react-router";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route index element={
                <ProtectedRoute>
                    <MainPage />
                </ProtectedRoute>
            } />
            <Route path="inloggen" element={<SignInPage />} />
        </Routes>
    </BrowserRouter>
);