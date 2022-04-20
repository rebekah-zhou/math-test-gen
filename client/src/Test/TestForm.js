import React, { useState } from 'react'
import styled from 'styled-components'
import FormSection from './FormSection'

const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 10px;
`
const Label = styled.label`
  text-align: center;
`
const SectionTitle = styled.span`
  font-size: large;
  font-weight: bold;
`
const Container = styled.div`
  padding: 20px;
  background-color: white;
`
const SpanButton = styled.span`
  cursor: pointer;
  color: ${props => props.theme.colors.orange};
  background: transparent;
`

function TestForm({ test, onFormSubmit, onEditTitle }) {
  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState("")

 
  function handleEditTitle() {
    setEditTitle(false)
    onEditTitle(title) 
  }

  const formSections = test.sections?.map((section, index) => {
    const notation = section.instructions.split(":")
    return (
      <>
      <SectionTitle>Section {`${index + 1}: ${notation[0]}`} </SectionTitle>
      <FormSection section={section} onFormSubmit={onFormSubmit}/>
      </>
    )
  })

  return (
    <Container>
      <div>
        <div className='vertical'>
          <div className='horizontal'>
            <label htmlFor='title'>Title:  </label>
            
            {editTitle ?
              <div>
                <SpanButton onClick={handleEditTitle}>Save</SpanButton>
                <SpanButton onClick={() => setEditTitle(false)}>Cancel</SpanButton>
              </div>
            : <SpanButton onClick={() => setEditTitle(true)}>Edit Title</SpanButton>}
          </div>
          {editTitle ? <input
            type='text'
            name='title'
            id='title'
            placeholder=''
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          : <span>{test.title}</span>}
        </div>
        {formSections}
      </div>
    </Container>
  )
}

export default TestForm