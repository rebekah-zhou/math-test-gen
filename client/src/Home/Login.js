import React, { useState } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
import Select from 'react-select'
import states from './states.json'

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
`
const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 10px;
`
const StyledSpan = styled.span`
  text-decoration: underline;
  &:hover {
    color: teal;
    cursor: pointer;
  }
`
const StyledInput = styled.input`
  border-radius: 4px;
  margin: 6px 0px 20px;
  padding: 8px 10px;
  border-color: black;
  border: 0.01rem solid rgba(0, 0, 0, 0.25);
  font-family: Roboto;
  font-size: medium;
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

const courses = ["Algebra I", "Algebra II", "Geometry", "Integrated Math I",
  "Integrated Math II", "Integrated Math III", "Bridge Math", "Precalculus", 
  "Statistics", "Applied Mathemtaical Concepts", "Calculus"]
const stateOptions = states.map(state => ({ value: state.abbreviation, label: state.name }))
const courseOptions = courses.map(course => {
  const courseValue = course.toLowerCase().replace(/\s+\g, ''/)
  return ({ value: courseValue, label: course })
})

Modal.setAppElement('body')

function Login({ onLogin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('') 
  const [errorMsgs, setErrorMsgs] = useState([])
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  function openModal(loginOrSignup) {
    setShowLogin(loginOrSignup)
    setIsModalOpen(true)
  }
  
  function closeModal() {
    setIsModalOpen(false);
    setUsername('')
    setPassword('')
    setPasswordConfirmation('')
  }

  function submitFetch(userObj, routeString) { 
    fetch(routeString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then(r => {
        if (r.ok) {
          r.json()
          .then((user) => onLogin(user))
        } else {
          r.json().then(data => setErrorMsgs(() => data[routeString === '/login' ? 'error' : 'errors']))
        }
      }) 
  }
  
  function handleLoginSubmit(e) {
    e.preventDefault()
    if (showLogin) {
      submitFetch({ username, password }, '/login')
    } else {
      submitFetch({ 
        username, 
        password, 
        password_confirmation: passwordConfirmation
      }, '/signup')
    }
  }

  function handleChangeFormClick() {
    setErrorMsgs("")
    setShowLogin(!showLogin)
    setPassword("")
  }

  let errors = []
  if (!showLogin && errorMsgs) {
    for (let i = 0; i < errorMsgs.length; i++) {
      errors.push(<span key={`${i}`} style={{'color': 'red'}}>{errorMsgs[i]}</span>)
    }
  }

  return (
    <div className='horizontal centered'>
      <button onClick={() => openModal(true)}>Login</button>
      <button onClick={() => openModal(false)}>Signup</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <VerticalForm as='div'>
          <Horizontal>
            <h1>{showLogin ? 'Login' : 'Sign up'}</h1>
            <XButton onClick={closeModal}>x</XButton>
          </Horizontal>
          <VerticalForm onSubmit={handleLoginSubmit}>
            <div className='horizontal'>
              <div className='vertical'>
                <label htmlFor='username'>Username</label>
                <StyledInput
                  type='text'
                  name='username'
                  // placeholder='username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <StyledInput
                  type="password"
                  name="password"
                  // placeholder='password'
                  value={password}
                  autoComplete='on'
                  onChange={e => setPassword(e.target.value)}
                />
                {showLogin ? null :
                  <><label htmlFor='password_confirmation'>Confirm Password</label>
                  <StyledInput
                    type='password'
                    name='password_confirmation'
                    // placeholder='confirm password'
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                /></>
                }
              </div>
              {showLogin ? null : 
                <>
                <div style={{'width': '50px'}}></div>
                <div className='vertical' style={{'width': '250px', 'gap': '20px'}}>
                    <div className='vertical' style={{'gap':'5px'}}>
                      <label>What state do you teach in?</label>
                      <Select
                        options={stateOptions}
                        onChange={setSelectedState}
                        placeholder='Type or select...'
                      />
                    </div>
                    <div className='vertical' style={{'gap':'5px'}}>
                      <label>Which courses do you teach?</label>
                      <Select 
                        options={courseOptions} 
                        onChange={setSelectedCourse}
                        placeholder='Type or select...' 
                        isMulti={true}
                      />
                    </div>
                </div>
                </>
              }
            </div>
              <button
                type='submit'
              >
                {showLogin ? 'Login >>' : "Let's make some tests >>"}
              </button>
          </VerticalForm>
          {showLogin && errorMsgs.length > 1 ? <p style={{'color': 'red'}}>{errorMsgs}</p>: null}
          {errors}
          <p>
            {showLogin ? "Don't have an account? " : "Already have an account? "}
            <StyledSpan onClick={handleChangeFormClick}>
              {showLogin ? "Sign up" : "Login"}
            </StyledSpan>
          </p>
      
        </VerticalForm>
      </Modal>
    </div>
  );
}

export default Login