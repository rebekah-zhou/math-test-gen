import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5%;
`
const StyledLi = styled.li`
  width: 23.5%;
  margin-left: 1.5%;
  list-style-position: inside;
  padding-bottom: 5%;
`
const StyledP = styled.p`
  margin: 0;
  font-weight: bold;
  text-align: center;
`

function QuestionItem({ question }) {
  const {content, answers, difficulty, isMultipleChoice} = question
  const [shuffledAnswers, setShuffledAnswers] = useState([])

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

  useEffect(() => {
    setShuffledAnswers(shuffle(answers))
  }, [question])

  return (
    <StyledLi>
      <StyledP>{content}</StyledP>
      {isMultipleChoice ? <StyledDiv>
        <span>A. {shuffledAnswers[0]?.content} </span>
        <span>B. {shuffledAnswers[1]?.content} </span>
        <span>C. {shuffledAnswers[2]?.content}</span>
        <span>D. {shuffledAnswers[3]?.content}</span>
      </StyledDiv>
      : <div style={{'height':'50px'}}></div>}
    </StyledLi>
  )
}

export default QuestionItem