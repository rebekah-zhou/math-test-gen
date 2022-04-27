import './App.css';
import NavBar from './Common/NavBar';
import Home from './Home/Home';
import TestList from './Test/TestList'
import EditTest from './Test/EditTest';
import React, { useEffect, useState, createContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false)
  const navigate = useNavigate()
  const state = useLocation()

  useEffect(() => {
      fetch('https://math-test-gen.herokuapp.com/me').then(r => {
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
      setPageLoaded(true)
    }
  }, [user])
  
  function handleLogin(user, selectedCourses) {
    if (selectedCourses) {
      const userCourses = []

      const coursesArr = selectedCourses?.map(course => {
        return {"id": course.value, "name": course.label}
      })
      setUser({...user, courses: coursesArr})

      selectedCourses.forEach(course => {
        userCourses.push({
          user_id: user.id,
          course_id: course.value
        })
      })

      const userCourseObj = {"userCourses": userCourses}

      fetch('https://math-test-gen.herokuapp.com/user_courses', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCourseObj)
      })
    } else {
      setUser(() => user)
    }
    
    const path = state?.pathname 

    if (path === '/') {
      navigate('/math-test-gen/test')
    } 
  }
  
  function handleLogout() {
    setUser(null)
    navigate('/')
  }
  
  if (!pageLoaded) {
    return <h1></h1>
  }

  return (
    <UserContext.Provider value={user}>
      <NavBar onLogout={handleLogout} />
      {user ?
        <Routes>
          <Route path='/math-test-gen/test/:id' element={<EditTest />} />
          <Route path='/math-test-gen/test' element={<TestList />}/>
          <Route path='/math-test-gen/' element={<Home onLogin={handleLogin}/>} />
        </Routes>
        :
        <Routes>
          <Route path='/math-test-gen/' element={<Home onLogin={handleLogin}/>} />
          <Route path='*' element={<Home onLogin={handleLogin} />}/>
        </Routes>
      } 
    </UserContext.Provider>
  );
}

export default App;
