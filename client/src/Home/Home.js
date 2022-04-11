import React, { useContext, useState } from 'react'
import Login from './Login'
import { UserContext } from './../App'
import { centeredDiv } from './../App'

function Home({ onLogin }) {
  const user = useContext(UserContext)

  return (
    <CenteredDiv>
      <img src='http://pi.math.cornell.edu/~mathclub/Media/adventuretime.gif' alt='example gif of what math test gen does'/>
      <Login onLogin={onLogin} />
    </CenteredDiv>
  )
}

export default Home