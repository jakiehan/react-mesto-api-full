import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, isAuthLoading, children }) => {
    if (isAuthLoading) {
        return (loggedIn ? children : <Navigate to="/sign-in" />)
    }
};

export default ProtectedRoute;