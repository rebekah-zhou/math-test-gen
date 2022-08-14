import React, { useState, createContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TestForm from './TestForm'
import TestView from './TestView'
import styled from 'styled-components'
import { config } from '../Common/Constants'

export const ShuffledQuestionsContext = createContext()

const SplitDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${props => props.theme.colors.cream};
  height: 100%;
`
function Test() {
  const [test, setTest] = useState([])
  const [questions, setQuestions] = useState([])
  const [shuffledQuestions, setShuffledQuestions] = useState(null)
  const { id } = useParams()
  const url = config.url.API_URL

  useEffect(() => {
    fetch(`${url}/tests/${id}`)
    .then(r => r.json())
    .then(test => setTest(test))
  }, [id, questions, url])
  
  function handleQuestionFetch(questionFormData, questionCount) {
    const questions = []

    for(let i = 0; i < questionCount; i++) {
      questions.push(questionFormData)
    }
    const questionObj = {"questions": questions}

    fetch(`${url}/questions`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(questionObj)
    })
    .then(r => {
        if (r.ok) {
        r.json()
        .then((data) => setQuestions([...questions, data]))
        } else {
        console.log(r.json())
        }
    })
  }
  
  function handleShuffle(section, whatToShuffle) {
    fetch(`${url}/sections/${section.id}/shufflequestions`)
      .then(r => r.json())
      .then(data => setShuffledQuestions(data))
  }

  function handleTitlePatch(title) {
    fetch(`${url}/tests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"title": title})
    })
    .then(r => r.json())
    .then(data => setTest(data))
  }

  if (!test) {
    return <h1></h1>
  }

  return (
    <ShuffledQuestionsContext.Provider value={shuffledQuestions}>
      <SplitDiv>
        <TestForm
          test={test}
          onEditTitle={handleTitlePatch}
          onFormSubmit={handleQuestionFetch}
          onShuffle={handleShuffle}
          />
        <TestView test={test} />
      </SplitDiv>
    </ShuffledQuestionsContext.Provider>
  )
}

export default Test