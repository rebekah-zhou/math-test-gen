import React from 'react'
import { useAuth } from "./use-auth.js";
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter as Router,
    Route,
    useNavigate
  } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
    const Navigate = useNavigate()
    
    return (
        <Route
        {...rest}
        render={({ location }) =>
            auth.user ? (
            children
            ) : (
            <Navigate
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}

export default PrivateRoute