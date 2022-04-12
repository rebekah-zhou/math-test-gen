import React, { useState } from 'react'
import TestForm from './TestForm'
import TestView from './TestView'
import styled from 'styled-components'



function Test() {
  const [questions, setQuestions] = useState([])
  
  function handleQuestionFetch(formData, questionCount) {
    const questions = []
    for(let i = 0; i < questionCount; i++) {
      questions.push(formData)
    }
    const questionObj = {"questions": questions}
    console.log()
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

  console.log(questions)

  return (
    <div className='horizontal'>
      <TestForm onFormSubmit={handleQuestionFetch}/>
      <TestView questions={questions}/>
    </div>
  )
}

export default Test