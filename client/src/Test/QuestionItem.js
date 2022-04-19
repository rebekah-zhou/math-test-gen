import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  width: 300px;

`

function Question({ question }) {
  const {content, answers, difficulty, isMultipleChoice} = question
  const shuffledAnswers = answers.shuffle()
  return (
    <li>
      <p>{content}</p>
      {/* Randomize answer choices */}
        <div className='vertical'>
          <span>A. {shuffledAnswers[0].content} </span>
          <span>B. {shuffledAnswers[1].content} </span>
          <span>C. {shuffledAnswers[2].content}</span>
          <span>D. {shuffledAnswers[3].content}</span>
        </div>
    </li>
  )
}

export default Question