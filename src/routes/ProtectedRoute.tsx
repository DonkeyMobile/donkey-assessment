import React, {ReactNode} from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: {children: ReactNode}) => {
    const isAuthenticated = Boolean(localStorage.getItem("authToken"));

    if (!isAuthenticated) {
        return <Navigate to="/inloggen" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
