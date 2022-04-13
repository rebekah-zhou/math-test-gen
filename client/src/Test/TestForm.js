import React, { useState } from 'react'
import styled from 'styled-components'

const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

function TestForm({ onFormSubmit }) {
    const [questionFormData, setQuestionFormData] = useState({
        isMultipleChoice: true,
        difficulty: "easy",
        section_id: 1,
        standard_id: 129
    })
    const [title, setTitle] = useState("")
    const [questionCount, setQuestionCount] = useState(1)

    function handleSubmit(e) {
        e.preventDefault()
        onFormSubmit(questionFormData, questionCount, title)
    }
  return (
    <div>
        <VerticalForm onSubmit={handleSubmit}>
        <div className='horizontal'>
          <label htmlFor='title'>Title:  </label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder=''
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='horizontal'>
          <label htmlFor='questionCount' >Number of Questions:  </label>
          <input
            type='number'
            name='questionCount'
            id='questionCount'
            placeholder='1'
            min='1'
            value={questionCount}
            onChange={e => setQuestionCount(e.target.value)}
            required
          />
        </div>
        <div className="horizontal">
            <div className='horizontal'>
              <input
                type='radio'
                name='isMultipleChoice'
                id='multipleChoice'
                value={questionFormData.isMultipleChoice}
                onChange={() => setQuestionFormData({...questionFormData, isMultipleChoice: true})}
                required
                />
                <label htmlFor='multipleChoice'>Multiple Choice</label>
            </div>
            <div className='horizontal'>
              <input
                type='radio'
                name='isMultipleChoice'
                id='freeResponse'
                value={questionFormData.isMultipleChoice}
                onChange={() => setQuestionFormData({...questionFormData, isMultipleChoice: false})}
                required
                />
                <label htmlFor='freeResponse'>Free Response</label>
            </div>
        </div>
        <button type='submit'>Generate!</button>
      </VerticalForm>
    </div>
  )
}

export default TestForm