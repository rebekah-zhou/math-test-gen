import React, { useState } from 'react'
import styled from 'styled-components'

const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

function Test() {
const [title, setTitle] = useState('')
const [questionCount, setQuestionCount] = useState("")
const [equations, setEquations] = useState([])

function handleSubmit(e) {
  e.preventDefault()
  fetch('/onestep', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(r => {
    if (r.ok) {
      r.json()
      .then((data) => setEquations(data))
    } else {
      console.log(r.json())
    }
  })
}

console.log(equations)

  return (
    <div>
      <VerticalForm>
        <div className='horizontal'>
          <label>Title:  </label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Linear Equations Test'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='horizontal'>
          <label>Number of Questions:  </label>
          <input
            type='number'
            name='questionCount'
            id='questionCount'
            placeholder='10'
            value={questionCount}
            onChange={e => setQuestionCount(e.target.value)}
            required
          />
        </div>
        <button type='submit' onClick={handleSubmit}>Generate!</button>
      </VerticalForm>
    </div>
  )
}

export default Test