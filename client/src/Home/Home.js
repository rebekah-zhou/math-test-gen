import React, { useContext, useState } from 'react'
import Login from './Login'
import { UserContext } from './../App'
import LandingPhoto from '../Home/LandingPhoto.jpeg'
import styled from 'styled-components'

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  z-index: 1;
  object-fit: cover;
`
const StyledSpan = styled.h1`
  font-size: 50px;
  /* color: ${props => props.theme.colors.purple}; */
  color: white;
  margin: 0px 10px;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
               0px 8px 13px rgba(0,0,0,0.1),
               0px 18px 23px rgba(0,0,0,0.1);
  z-index: 2;
`
const Container = styled.div`
  width: 100%;
`
const Box = styled.div` 
  display: flex;
  justify-content: center;
  padding: 20px;
  /* background: rgba(255, 255, 255, 0.5); */
  background: rgba(0, 0, 0, 0.5);
`
const StyledP = styled.p` 
  width: 100%;
  height: auto;
  font-weight: bold;
  color: white;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
               0px 8px 13px rgba(0,0,0,0.1),
               0px 18px 23px rgba(0,0,0,0.1);
`

function Home({ onLogin }) {
  const user = useContext(UserContext)

  return (
    <Container> 
      <Box>
        <div className="horizontal centered">
          <div className="vertical">
            <StyledSpan>Standards-based,</StyledSpan>
            <StyledSpan>customized questions</StyledSpan>
          </div>
          <div className="vertical centered">
            <StyledP>Easily generate new assessments and worksheets aligned to <span style={{'fontStyle': 'italic'}}>your</span> state standards.</StyledP>
            <Login onLogin={onLogin} />
          </div>
        </div>
      </Box>
      <StyledImg src={LandingPhoto} alt='background'></StyledImg>
    </Container>
  )
}

export default Home