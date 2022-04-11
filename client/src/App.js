import './App.css';
import NavBar from './Common/NavBar';
import Home from './Home/Home';
import Test from './Test/Test'
import React, { useEffect, useState, createContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

export const UserContext = createContext()

function App() {
    const [user, setUser] = useState(null);
    const [showNavBar, setShowNavBar] = useState(false)
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

      
    useEffect(() => {
      if(user) {
        setShowNavBar(true)
        // setPageLoaded(true)
      }
    }, [user])
    
      function handleLogin(user) {
        setUser(() => user)
        const path = state?.pathname 
        if (path === '/') {
          navigate('/test')
        } else {
          navigate(path)
        }
      }
    
      function handleLogout() {
        setUser(null)
        navigate('/')
      }
    

  return (
    <CenteredDiv>
      <UserContext.Provider value={user}>
        {showNavBar ? <NavBar onLogout={handleLogout} /> : null }
        <Routes>
          <Route path='/test' element={<Test />}/>
          <Route path='/' element={<Home onLogin={handleLogin}/>} />
        </Routes>
      </UserContext.Provider>
    </CenteredDiv>
  );
}

export default App;
