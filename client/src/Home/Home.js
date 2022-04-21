import React, { useContext, useState } from 'react'
import Login from './Login'
import { UserContext } from './../App'
import LandingPhoto from '../Home/LandingPhoto.png'
import styled from 'styled-components'

const BottomSpan = styled.p`
  background-color: ${props => props.theme.colors.cream};
  padding: 0;
  margin: 0;
`
const StyledImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`
const StyledSpan = styled.h1`
  font-size: calc(32px + 0.5vw);
  /* color: ${props => props.theme.colors.purple}; */
  color: white;
  margin: 0px 10px;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
               0px 8px 13px rgba(0,0,0,0.1),
               0px 18px 23px rgba(0,0,0,0.1);
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
  font-size: calc(12px + 0.5vw);
  color: white;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
               0px 8px 13px rgba(0,0,0,0.1),
               0px 18px 23px rgba(0,0,0,0.1);
`

function Home({ onLogin }) {
  const user = useContext(UserContext)

  return (
    <>
    <Container> 
      <Box>
        <div className="horizontal centered">
          <div className="vertical">
            <StyledSpan>Standards-based,</StyledSpan>
            <StyledSpan>customized questions</StyledSpan>
          </div>
          <div className="vertical centered" style={{'padding': '0'}}>
            <StyledP>Easily generate new assessments and worksheets aligned to <span style={{'fontStyle': 'italic'}}>your</span> state standards.</StyledP>
            <Login onLogin={onLogin} />
          </div>
        </div>
      </Box>
      <section className="rw-wrapper">
    <h2 className="rw-sentence">					
      <div className="rw-words rw-words-1">
        <span>9t = 2 - a</span>
        <span>r - 3 = 10</span>
        <span>6*q = 54</span>
        <span>y = 3x + 1</span>
        <span>t + 4 = 3</span>
      </div>
    </h2>
    </section>
    <StyledImg src={LandingPhoto} alt='background'></StyledImg>
    {/* <BottomSpan>Lovingly created by Rebekah Zhou</BottomSpan> */}
    </Container>
    </>
  )
}

export default Home