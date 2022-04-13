import React, { useState, createContext } from 'react'
import TestForm from './TestForm'
import TestView from './TestView'
import styled from 'styled-components'

export const QuestionsContext = createContext()

function Test() {
  const [questions, setQuestions] = useState([])
  
  function handleQuestionFetch(questionFormData, questionCount, title) {
    const questions = []
    for(let i = 0; i < questionCount; i++) {
      questions.push(questionFormData)
    }
    const questionObj = {"questions": questions}
    fetch(`/tests/1`, {
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
        .then((data) => setQuestions(data))
        } else {
        console.log(r.json())
        }
    })
  }

  return (
    <QuestionsContext.Provider value={questions}>
      <div className='horizontal'>
        <TestForm onFormSubmit={handleQuestionFetch}/>
        <TestView />
      </div>
    </QuestionsContext.Provider>
  )
}

export default Test