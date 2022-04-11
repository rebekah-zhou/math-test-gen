import React, { createContext, useContext, useState } from 'react'

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
return (
  <authContext.Provider value={auth}>
    {children}
  </authContext.Provider>
)}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [errorMsgs, setErrorMsgs] = useState('')

  function submitFetch(userObj, routeString) { 
    fetch(routeString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then(r => {
        if (r.ok) {
          r.json().then(user => setUser(user)) 
        } else {
          r.json().then(data => setErrorMsgs(() => data[routeString === '/login' ? 'error' : 'errors']))
        }
      }) 
  }

  const signin = (username, password) => {
    return submitFetch({ username, password }, '/login')
  }

  const signup = (username, password, passwordConfirmation) => {
    return submitFetch({username, password, password_confirmation: passwordConfirmation}, '/users')
  }

  const signout = () => {
    return (
      fetch('/logout', {method: 'DELETE'})
      .then(r => r.json())
      .then(() => setUser(false))
    )
  }

  return {
    user,
    errorMsgs,
    signin,
    signup,
    signout,
  }
}
