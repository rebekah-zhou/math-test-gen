import React, { useState, createContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TestForm from './TestForm'
import TestView from './TestView'
import styled from 'styled-components'

export const QuestionsContext = createContext()

function Test() {
  const [test, setTest] = useState([])
  const [questions, setQuestions] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetch(`/tests/${id}`)
    .then(r => r.json())
    .then(test => setTest(test))
  }, [id])
  
  function handleQuestionFetch(questionFormData, questionCount, title) {
    const questions = []

    for(let i = 0; i < questionCount; i++) {
      questions.push(questionFormData)
    }
    const questionObj = {"questions": questions}
    
    fetch(`/tests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"title": title})
    })

    fetch('/questions', {
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

  if (!test) {
    return <h1></h1>
  }

  return (
    <QuestionsContext.Provider value={questions}>
      <div className='horizontal'>
        <TestForm onFormSubmit={handleQuestionFetch}/>
        <TestView test={test}/>
      </div>
    </QuestionsContext.Provider>
  )
}

export default Test