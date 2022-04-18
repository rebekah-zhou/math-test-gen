import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NewTest from '../NewTest/NewTest'
import styled from "styled-components";

const NavUnlisted = styled.ul`
  display: flex;
  background-color: ${props => props.theme.colors.black};
  a {
    display: flex;
    text-decoration: none;
    align-items: center;
  }
  padding: 1rem;
  margin: 0;

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
    background-color: ${props => props.theme.colors.cream};
    color: ${props => props.theme.colors.black};
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