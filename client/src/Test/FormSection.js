import React, { useState } from 'react'
import styled from 'styled-components'

const FormSectionForm = styled.form`
  border: 1px solid ${props => props.theme.colors.blue};
  padding: 10px;
  border-radius: 20px;
`
const Input = styled.input`
  margin: 0;
`
const Label = styled.label`
  text-align: center;
`

function FormSection({ section, onFormSubmit }) {
    const [questionFormData, setQuestionFormData] = useState({
        isMultipleChoice: true,
        difficulty: "easy",
        section_id: 1,
        standard_id: 129
    })
    const [questionCount, setQuestionCount] = useState(1)


    function handleSubmit(e) {
        e.preventDefault()
        onFormSubmit(questionFormData, questionCount)
    }
  
  return (
    <FormSectionForm onSubmit={handleSubmit}>
      <div className='vertical'>
        <Label htmlFor='questionCount'>Number of Questions  </Label>
        <Input
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
        <div className='horizontal centered'>
          <Input
            type='radio'
            name='isMultipleChoice'
            id='multipleChoice'
            value={questionFormData.isMultipleChoice}
            onChange={() => setQuestionFormData({...questionFormData, isMultipleChoice: true, section_id: section.id})}
            required
          />
            <Label htmlFor='multipleChoice'>Multiple Choice</Label>
        </div>
        <div className='horizontal centered'>
          <Input
            type='radio'
            name='isMultipleChoice'
            id='freeResponse'
            value={questionFormData.isMultipleChoice}
            onChange={() => setQuestionFormData({...questionFormData, isMultipleChoice: false, section_id: section.id})}
            required
          />
          <Label htmlFor='freeResponse'>Free Response</Label>
        </div>
      </div>
      <button type='submit'>Generate questions!</button>
    </FormSectionForm>)
}

export default FormSection