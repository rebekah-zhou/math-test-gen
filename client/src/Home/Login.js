import React, { useState } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('') 
  const [errorMsgs, setErrorMsgs] = useState('')

  function openModal(loginOrSignup) {
    setShowLogin(loginOrSignup)
    setIsModalOpen(true)
  }
  
  function closeModal() {
    setIsModalOpen(false);
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
      submitFetch({username, password, password_confirmation: passwordConfirmation}, '/users')
    }
  }

  return (
    <div>
      <button onClick={() => openModal(true)}>Login</button>
      <button onClick={() => openModal(false)}>Signup</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <VerticalForm as='div'>
          <Horizontal>
            <span>{showLogin ? 'Login' : 'Sign up'}</span>
            <button onClick={closeModal}>x</button>
          </Horizontal>
          <VerticalForm onSubmit={handleLoginSubmit}>
            {showLogin ? null :
            // Refactor inputs?
              <input
                type='text'
                name='name'
                placeholder='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />}
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
              {showLogin ? 'Log in!' : "Let's make some tests!"}
            </button>
          </VerticalForm>
          <p>
            {showLogin ? "Don't have an account? " : "Already have an account? "}
            <StyledSpan onClick={() => setShowLogin(!showLogin)}>
              {showLogin ? "Sign up" : "Login"}
            </StyledSpan>
          </p>
      
        </VerticalForm>
      </Modal>
    </div>
  );
}

export default Login