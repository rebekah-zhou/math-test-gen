import React, { useContext, useEffect, useState } from 'react'
import QuestionItem from './QuestionItem'
import styled from 'styled-components'
import { ShuffledQuestionsContext } from './EditTest'

const FlexGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`
const Ol = styled.ol`
  padding: 0;
`
const StyledP = styled.p`
  margin-top: 0px;
`

function TestSection({ section }) {
  const shuffledQs = useContext(ShuffledQuestionsContext)
  const questions = section.questions
  let questionsToShow = []

  if (shuffledQs) {
    if (shuffledQs[0].section.id === section.id) {
      questionsToShow = shuffledQs?.map(question => {
        return <QuestionItem key={question.id} question={question}/>
      })
    } else {
      questionsToShow = questions?.map(question => {
        return <QuestionItem key={question.id} question={question}/>
      })
    }
  } else {
      questionsToShow = questions?.map(question => {
        return <QuestionItem key={question.id} question={question}/>
      })
    }

  return (
    <div className='vertical'>
      <StyledP>{`${section.instructions}`}</StyledP>
        <Ol>
          <FlexGrid>
            {questionsToShow}
          </FlexGrid>
        </Ol>
    </div>
  )
}

export default TestSection