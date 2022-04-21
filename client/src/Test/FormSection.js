import React, { useState } from 'react'
import styled from 'styled-components'

const FormSectionForm = styled.form`
  border: 2px solid ${props => props.theme.colors.blue};
  padding: 15px 20px 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  margin: 3px 10px 10px;
`
const RadioInput = styled.input`
  margin: 10px 2px 10px 0px;
`
const RadioLabel = styled.label`

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
    const [questionCount, setQuestionCount] = useState(null)


    function handleSubmit(e) {
        e.preventDefault()
        onFormSubmit(questionFormData, questionCount)
    }
  
  return (
    <FormSectionForm onSubmit={handleSubmit}>
      <div className='vertical'>
        <Label htmlFor='questionCount'>Number of questions to add?</Label>
        <Input
          type='number'
          name='questionCount'
          id='questionCount'
          placeholder='Multiples of 4 recommended.'
          min='1'
          value={questionCount}
          onChange={e => setQuestionCount(e.target.value)}
          required
        />
      </div>
      <div className="horizontal centered" style={{'gap': '15px'}}>
        <div className='horizontal centered'>
          <RadioInput
            type='radio'
            name='isMultipleChoice'
            id={`multipleChoice${section.id}`}
            value={questionFormData.isMultipleChoice}
            onChange={() => setQuestionFormData({...questionFormData, isMultipleChoice: true, section_id: section.id})}
            required
          />
            <RadioLabel htmlFor={`multipleChoice${section.id}`}>Multiple Choice</RadioLabel>
        </div>
        <div className='horizontal centered'>
          <RadioInput
            type='radio'
            name='isMultipleChoice'
            id={`freeResponse${section.id}`}
            value={questionFormData.isMultipleChoice}
            onChange={() => setQuestionFormData({...questionFormData, isMultipleChoice: false, section_id: section.id})}
            required
          />
          <RadioLabel htmlFor={`freeResponse${section.id}`}>Free Response</RadioLabel>
        </div>
      </div>
      <button type='submit'>Generate questions!</button>
    </FormSectionForm>)
}

export default FormSection