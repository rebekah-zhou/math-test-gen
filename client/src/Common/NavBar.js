import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from './math-test.png'
import NewTest from '../NewTest/NewTest'
import styled from "styled-components";

const NavUnlisted = styled.ul`
  display: flex;
  background-color: ${props => props.theme.colors.blue};
  a {
    display: flex;
    text-decoration: none;
    align-items: center;
  }
  padding: 1rem;

  li {
    color: white;
    margin: 0 0.8rem;
    padding: 0.2rem 1rem;
    font-size: 1.3rem;
    list-style: none;
    display: flex;
    justify-content: center;
    align-content: center;
    
  &:hover{
    background-color: white;
    color: ${props => props.theme.colors.pink};
    border-radius: 20px;
  }
  }

  button {
    background-color: inherit;
    padding: 0;
    margin: 0;
  }

  li > span {
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .nav-img {
    height: 28px;
    width: auto;
  }

`

function NavBar({ onLogout, user }) {
  const [showNewTest, setShowNewTest] = useState(false)

  console.log(user)
  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => onLogout())
  }

  function handleNewTestClick() {
    setShowNewTest(true)
  }

  return (
    <>
    {showNewTest ? <NewTest /> : null}
    <NavUnlisted>
      <NavLink to='/'>
        <li>
          <span> Math Test Gen </span>
          <img src={logo} className='nav-img' alt='logo'/>
        </li>
      </NavLink>
      <button onClick={handleNewTestClick}>
        <li>
          Create New Test
        </li>
      </button>
        <NavLink to='/test'>
          <li> Tests </li>
        </NavLink>
      <button onClick={handleLogout}>
        <li > Logout </li>
      </button>
    </NavUnlisted>
    </>
  );
}

export default NavBar