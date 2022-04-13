import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  width: 300px;

`

function Question({ question }) {
  const {content, answers, difficulty, isMultipleChoice} = question
  return (
    <li>
      <p>{content}</p>
      {/* Randomize answer choices */}
        <div className='vertical'>
          <span>A. {answers[0].content} </span>
          <span>B. {answers[1].content} </span>
          <span>C. {answers[2].content}</span>
          <span>D. {answers[3].content}</span>
        </div>
    </li>
  )
}

export default Question