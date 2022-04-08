import React from 'react'
import { useAuth } from './use-auth'
import {
    Route,
    Redirect
  } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
    
    return (
        <Route
        {...rest}
        render={({ location }) =>
            auth.user ? (
            children
            ) : (
            <Redirect
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