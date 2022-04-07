import React from 'react'
import { useAuth } from '../use-auth.js'

function NavBar() {
  const auth = useAuth();

  return (
    <div><p>{`${auth.user}`}</p></div>
  )
}

export default NavBar