import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  width: 300px;

`
const StyledLi = styled.li`
  
`

function QuestionItem({ question }) {
  const {content, answers, difficulty, isMultipleChoice} = question

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const shuffledAnswers = shuffle(answers)

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

export default QuestionItem