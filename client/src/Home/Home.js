import React, { useContext, useState } from 'react'
import Login from './Login'
import { UserContext } from './../App'

function Home({ onLogin }) {
  const user = useContext(UserContext)

  return (
    <div>
      <Login onLogin={onLogin} />
    </div>
  )
}

export default Home