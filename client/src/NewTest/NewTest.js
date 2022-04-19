import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
import Select from 'react-select'
import { UserContext } from '../App';

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
  font-size: inherit;
  &:hover {
    color: inherit;
  }
`
const InverseButton = styled.button`
  background-color: white;
  color: ${props => props.theme.colors.melon};
  border: 2px solid ${props => props.theme.colors.melon};
`
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
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
  const [selectedStandards, setSelectedStandards] = useState([])
  const [testTitle, setTestTitle] = useState('')
  const [test, setTest] = useState([])
  const [showStandardsDropdown, setShowStandardsDropdown] = useState(false)
  const user = useContext(UserContext)

  useEffect(() => {
    fetch(`/courses/${selectedCourse.id}`)
    .then(r => r.json())
    .then(courses => setStandards(courses.standards))
  }, [selectedCourse])

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function handleCourseClick(id) {
    setSelectedCourse(user.courses[id - 1])
  }

  let courses = []
  if (user) {
    courses = user.courses?.map(course => {
    return (<InverseButton 
      type='button'
      onClick={() => handleCourseClick(course.id)}>
      {course.name}</InverseButton>)
  })}

  const standardOptions = standards?.map(standard => {
    return ({ value: standard.id, label: standard.notation })
  })

  function handleCreateNewTestClick(e) {
    e.preventDefault();

    fetch(`/tests`, {
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
      setShowStandardsDropdown(true)
    })
  }

  function handleCreateSectionsClick(e) {
    e.preventDefault();

    const sections = []

    selectedStandards.forEach(standard => {
      sections.push({
        instructions: standard.description,
        test_id: test.id
      })
    })
    const sectionObj = {"sections": sections}

    fetch(`/sections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sectionObj)
    })
    .then(r => r.json())
    .then(data => console.log(data))

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
          <form onSubmit={handleCreateNewTestClick}>
            <div className='vertical'>
              <label htmlFor='testTitle'>Test Title</label>
              <input 
                type='text'
                name='testTitle' 
                value={testTitle}
                onChange={e => setTestTitle(e.target.value)}
              />
            </div>
            <h3>Select the course:</h3>
            <div>
              {courses}
            </div>
            {selectedCourse ? <button type='submit'>Select Standards {'>>'}</button> : null}
          </form>}
        {showStandardsDropdown ? 
          <form onSubmit={handleCreateSectionsClick}>
            <h3>Select the standard(s):</h3>
            <Select
              options={standardOptions}
              onChange={setSelectedStandards}
              isMulti={true}
              placeholder='Type or select...'/>
            <button type='submit'>Generate Test!</button>
          </form>
        : null}
      </div>
    </Modal>
    </>
  )
}

export default NewTest