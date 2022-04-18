import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
import Select from 'react-select'
import { UserContext } from '../App';

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
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
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("")
  const [standards, setStandards] = useState([])
  const [selectedStandards, setSelectedStandards] = useState([])
  const user = useContext(UserContext)

  useEffect(() => {
    fetch(`./courses/${selectedCourse.id}`)
    .then(r => r.json())
    .then(courses => setStandards(courses.standards))
  }, [selectedCourse])

  console.log(standards)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function handleCourseClick(id) {
    setSelectedCourse(user.courses[id - 1])
  }

  function handleStandardClick(id) {
    setSelectedStandards(() => [...selectedStandards, standards[id - 1]])
  }

  const courses = user.courses.map(course => {
    return (<button 
      onClick={() => handleCourseClick(course.id)}>
      {course.name}</button>)
  })

  const standardOptions = standards?.map()

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className='vertical'>
        <Horizontal>
          <h1>Create New Test</h1>
          <XButton onClick={closeModal}>x</XButton>
        </Horizontal>
        <h3>Select the course:</h3>
        <div>
          {courses}
        </div>
        {selectedCourse ? 
          <>
          <h3>Select the standard(s):</h3>
          <Select 
            options={standardOptions}
            onChange={setSelectedStandards}
            placeholder='Type or select...'/>
          </>
          : null
        }
      </div>
    </Modal>
  )
}

export default NewTest