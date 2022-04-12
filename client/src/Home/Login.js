import React, { useState } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'

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
`
const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`
const StyledSpan = styled.span`
  text-decoration: underline;
  &:hover {
    color: teal;
    cursor: pointer;
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
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)'
  }
};

Modal.setAppElement('body')

function Login({ onLogin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('') 
  const [errorMsgs, setErrorMsgs] = useState([])

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
      submitFetch({ username, password, password_confirmation: passwordConfirmation}, '/signup')
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
            <h2>{showLogin ? 'Login' : 'Sign up'}</h2>
            <XButton onClick={closeModal}>x</XButton>
          </Horizontal>
          <VerticalForm onSubmit={handleLoginSubmit}>
            {/* {showLogin ? null :
            // Refactor inputs?
              <input
                type='text'
                name='name'
                placeholder='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />} */}
            <input
              type='text'
              name='username'
              placeholder='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder='password'
              value={password}
              autoComplete='on'
              onChange={e => setPassword(e.target.value)}
            />
            {showLogin ? null :
              <input
                type='password'
                name='password_confirmation'
                placeholder='confirm password'
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
            />}
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