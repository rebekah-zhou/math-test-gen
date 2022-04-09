import './App.css';
import NavBar from './Common/NavBar';
import Home from './Home/Home';
import Test from './Test/Test'
import React, { useEffect, useState, createContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext()

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const state = useLocation()

    useEffect(() => {
        fetch('/me').then(r => {
          if (r.ok) {
            r.json()
            .then(user => setUser(() => user))
          } else {
            r.json()
          }
        }) 
      }, [])
    
      function handleLogin(user) {
        setUser(() => user)
        const path = state?.pathname 
        navigate(path || '/test')
      }
    
      function handleLogout() {
        setUser(null)
        navigate('/')
      }
    

  return (
    <UserContext.Provider value={user}>
      <NavBar onLogout={handleLogout} />
      <Routes>
        <Route path='/test' element={<Test />}/>
        <Route path='/' element={<Home onLogin={handleLogin}/>} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
