import React, { useState, useEffect } from 'react'
import TestSection from './TestSection'
import styled from 'styled-components'

const LetterDiv = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: 8.5/11;
  max-width: 40%;
  border: 1px solid grey;
  padding: 40px;
  margin-top: 40px;
  background-color: white;
  box-shadow: 10px 5px 20px grey;
`
const SectionTitle = styled.span`
  font-size: large;
  font-weight: bold;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
function TestView({ test }) {

  // Another useEffect for questions
   
  if (!test) {
    return <h1></h1>
  }

  const sections = test.sections?.map((section, index) => {
      return (
      <div>
        <SectionTitle key={index}>Section {`${index + 1}`}</SectionTitle>
        <TestSection section={section} key={section.id} />
      </div>)
    })

  return (
    <LetterDiv>
      <Header>
        <h1>{`${test.title}`}</h1>
        <div style={{'width':'35%'}}>
          <p>Name: ____________________________</p>
          <p>Period: _____ Date: ________________</p>
        </div>
      </Header>
      {sections}
    </LetterDiv>
  )
}

export default TestView