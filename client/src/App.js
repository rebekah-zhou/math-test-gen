import './App.css';
import NavBar from './Common/NavBar';
import Home from './Home/Home';
import Test from './Test/Test'
import React, { useEffect, useState, createContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null);
  const [showNavBar, setShowNavBar] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const navigate = useNavigate()
  const state = useLocation()

  useEffect(() => {
      fetch('/me').then(r => {
        if (r.ok) {
          r.json()
          .then(user => setUser(() => user))
          .then(setPageLoaded(true))
        } else {
          r.json()
          .then(setPageLoaded(true))
        }
      }) 
    }, [])

    
  useEffect(() => {
    if(user) {
      setShowNavBar(true)
      setPageLoaded(true)
    }
  }, [user])
  
  function handleLogin(user) {
    setUser(() => user)
    const path = state?.pathname 
    // if (path === '/') {
    //   navigate('/test')
    // } else {
    //   navigate(path)
    // }
    if (path === '/') {
      navigate('/test')
    } 
  }
  
  function handleLogout() {
    setShowNavBar(false)
    setUser(null)
    navigate('/')
  }
  console.log(user)
  
  if (!pageLoaded) {
    return <h1></h1>
  }

  return (
    <UserContext.Provider value={user}>
      {showNavBar ? <NavBar onLogout={handleLogout} /> : null }
      {user ?
        <Routes>
          <Route path='/test' element={<Test />}/>
          <Route path='/' element={<Home onLogin={handleLogin}/>} />
        </Routes>
        :
        <Routes>
          <Route path='/' element={<Home onLogin={handleLogin}/>} />
          <Route path='*' element={<Home onLogin={handleLogin} />}/>
        </Routes>
      } 
    </UserContext.Provider>
  );
}

export default App;
