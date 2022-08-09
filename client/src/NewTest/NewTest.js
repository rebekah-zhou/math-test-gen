import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Select from 'react-select'
import { UserContext } from '../App';
import { config } from '../Common/Constants'

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const FlexForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`
const XButton = styled.button`
  height: 20px;
  width: 20px;
  padding-left: 5px;
  text-align: center;
  border: none;
  background: none;
  color: black;
  font-family: 'Roboto';
`
const Button = styled.button`
  color: inherit;
  font-size: 1.3rem;
  padding: -0.3rem;
  margin: -0.3rem;

  &:hover {
    color: inherit;
  }
`
const InverseButton = styled.button`
  background-color: white;
  color: ${props => props.theme.colors.melon};
  border: 2px solid ${props => props.theme.colors.melon};

  &:hover {
    color: white;
    background-color: ${props => props.theme.colors.melon};
    border: 2px solid ${props => props.theme.colors.melon};
  }

  &:focus {
    color: white;
    background-color: ${props => props.theme.colors.melon};
    border: 2px solid ${props => props.theme.colors.melon};
  }
`
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minHeight: '400px',
    minWidth: '300px'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)'
  }
};

Modal.setAppElement('body')

function NewTest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("")
  const [standards, setStandards] = useState([])
  const [selectedStandards, setSelectedStandards] = useState(null)
  const [testTitle, setTestTitle] = useState('')
  const [test, setTest] = useState([])
  const [showStandardsDropdown, setShowStandardsDropdown] = useState(false)
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const url = config.url.API_URL

  useEffect(() => {
    if (selectedCourse) {
      fetch(`/courses/${selectedCourse.id}`)
      .then(r => r.json())
      .then(courses => setStandards(courses.standards))
    }
  }, [selectedCourse])

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setSelectedCourse(null)
    setStandards(null)
    setSelectedStandards(null)
    setTestTitle('')
    setShowStandardsDropdown(false)
  }

  function handleCourseClick(index) {
    setSelectedCourse(user.courses[index])
  }

  let courses = []
  if (user) {
    courses = user.courses?.map((course, index) => {
    return (<InverseButton 
      key={index}
      type='button'
      onClick={() => handleCourseClick(index)}>
      {course.name}</InverseButton>)
  })}

  const standardOptions = standards?.map(standard => {
    return ({ value: standard.id, label: standard.notation })
  })

  function handleCreateNewTestClick(e) {
    setShowStandardsDropdown(true)
    e.preventDefault();

    fetch(`${url}/tests`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        title: testTitle,
        user_id: user.id
      })
    })
    .then(r => r.json())
    .then(testData => {
      setTest(testData)
    })
  }

  function handleCreateSectionsClick(e) {
    e.preventDefault();

    closeModal();

    const sections = []

    selectedStandards.forEach(standard => {
      const std = standards.find(s => s.id === standard.value)
      sections.push({
        instructions: `${std?.notation}: ${std?.description}`,
        test_id: test.id
      })
    })
    const sectionObj = {"sections": sections}

    fetch(`${url}/sections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sectionObj)
    })
    .then(r => r.json())
    .then(navigate(`/test/${test.id}`))

  }

  return (
    <>
    <Button onClick={openModal}>Create New Test</Button>
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className='vertical'>
        <Horizontal>
          <XButton onClick={closeModal}>x</XButton>
        </Horizontal>
        {showStandardsDropdown ? 
          null: 
          <FlexForm onSubmit={handleCreateNewTestClick}>
            <div className='vertical'>
              <label htmlFor='testTitle'>Test Title</label>
              <input 
                type='text'
                name='testTitle' 
                value={testTitle}
                onChange={e => setTestTitle(e.target.value)}
              />
            </div>
            <label>Select the Course:</label>
            <div>
              {courses}
            </div>
            {selectedCourse && testTitle ? <button type='submit'>Select Standards {'>>'}</button> : null}
          </FlexForm>}
        {showStandardsDropdown ? 
          <FlexForm onSubmit={handleCreateSectionsClick}>
            <div>
              <label>Select the Standard(s):</label>
              <Select
                options={standardOptions}
                onChange={setSelectedStandards}
                isMulti={true}
                placeholder='Type or select...'
              />
            </div>
            {selectedStandards ? <button type='submit'>Generate Test!</button> : null}
          </FlexForm>
        : null}
      </div>
    </Modal>
    </>
  )
}

export default NewTest