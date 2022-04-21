import React, { useState, createContext, useEffect } from 'react'
import styled from 'styled-components'
import FormSection from './FormSection'

const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 10px;
`
const TitleInput = styled.input`
  margin: 0;
`
const HorizontalDiv = styled.form`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`
const Label = styled.label`
  text-align: center;
`
const TitleLabel = styled.span` 
  font-size: large;
  padding-top: 3px;
`
const SectionTitle = styled.span`
  font-size: calc(12px + 0.5vw);
  font-weight: bold;
`
const Container = styled.div`
  padding: 30px;
  background-color: white;
  margin-top: 40px;
  height: fit-content;  
  border-radius: 20px;
`
const FormTitleSpan = styled.span`
  font-size: calc(30px + 0.1vw);
  color: ${props => props.theme.colors.purple};
  margin-bottom: -20px;
  font-family: 'lobster';
  text-align: center;
  /* text-decoration: underline; */
  font-weight: bold;
`
const SpanButton = styled.span`
  cursor: pointer;
  color: ${props => props.theme.colors.orange};
  background: transparent;
`

function TestForm({ test, onFormSubmit, onEditTitle, onShuffle }) {
  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState("")


 
  function handleEditTitle() {
    setEditTitle(false)
    onEditTitle(title) 
  }

  useEffect(() => {
    if (test) {
    setTitle(test.title)
    }
  }, [test])
  

  const formSections = test.sections?.map((section, index) => {
    const notation = section.instructions.split(":")
    return (
      <div className='vertical centered' >
        <SectionTitle>Section {`${index + 1}: ${notation[0]}`} </SectionTitle>
        <div className='vertical centered' >
          <button onClick={() => onShuffle(section, "questions")}>Shuffle Questions & Answers!</button>
        </div>
        <FormSection section={section} onFormSubmit={onFormSubmit}/>
      </div>
    )
  })

  return (
    <Container>
      <div className='vertical' style={{'gap': '30px'}}>
        <FormTitleSpan>Edit Test Form</FormTitleSpan>
        <div className='vertical ' style={{'gap':'10px'}}>
          <HorizontalDiv >
            <SectionTitle as='label' htmlFor='title'>Title:  </SectionTitle>
            {editTitle ? <TitleInput
            type='text'
            name='title'
            id='title'
            placeholder=''
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          : <TitleLabel>{test.title}</TitleLabel>}
          </HorizontalDiv>
          {editTitle ?
              <div className='horizontal' style={{'gap':'10px'}}>
                <SpanButton onClick={handleEditTitle}>Save</SpanButton>
                <SpanButton onClick={() => setEditTitle(false)}>Cancel</SpanButton>
              </div>
            : <SpanButton onClick={() => setEditTitle(true)}>Edit Title</SpanButton>}
        </div>
        {formSections}
      </div>
    </Container>
  )
}

export default TestForm