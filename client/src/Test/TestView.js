import React, { useState, useEffect } from 'react'
import TestSection from './TestSection'
import styled from 'styled-components'

const LetterDiv = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: 8.5/11;
  max-width: 40%;
  border: 1px solid black;
  padding: 40px;
  background-color: white;
`
const SectionTitle = styled.span`
  font-size: large;
  font-weight: bold;
`
function TestView({ test }) {

  // Another useEffect for questions
   
  if (!test) {
    return <h1></h1>
  }

  const sections = test.sections?.map((section, index) => {
    return (
      <div>
        <SectionTitle>Section {`${index + 1}`}</SectionTitle>
        <TestSection section={section} key={section.id} />
      </div>)
  })

  console.log(test)

  return (
    <LetterDiv>
      <h1>{`${test.title}`}</h1>
      {sections}
    </LetterDiv>
  )
}

export default TestView