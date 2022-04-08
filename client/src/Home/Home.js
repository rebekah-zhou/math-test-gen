import React from 'react'
import Login from './Login'
import { useAuth } from '../Auth/use-auth'

function Home() {
  const auth = useAuth()

  return (
    <div>
      {auth.user ? null : <Login />}
    </div>
  )
}

export default Home