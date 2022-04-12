import React, { useContext, useState } from 'react'
import Login from './Login'
import { UserContext } from './../App'
import styled from 'styled-components'

const StyledImg = styled.img`
  height: auto;
  width: 300px;

`
const StyledSpan = styled.h1`
  color: ${props => props.theme.colors.orchid};
`

function Home({ onLogin }) {
  const user = useContext(UserContext)

  return (
    <div className='vertical centered'>
      <StyledSpan>Welcome to Math Test Gen!</StyledSpan>
      <StyledImg src='http://pi.math.cornell.edu/~mathclub/Media/adventuretime.gif' alt='example gif of what math test gen does'></StyledImg>
      <Login onLogin={onLogin} />
    </div>
  )
}

export default Home