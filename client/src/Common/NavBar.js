import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from './math-test.png'
import styled from "styled-components";

const NavUnlisted = styled.ul`
  display: flex;

  a {
    text-decoration: none;
  }

  li {
    color: teal;
    margin: 0 0.8rem;
    font-size: 1.3rem;
    list-style: none;
    display: flex;
    justify-content: center;
    align-content: center;
    
  &:hover{
    color: lightblue;
  }
  }

  li > span {
    font-weight: bold;
  }

  .nav-img {
    height: 28px;
    width: auto;
  }

`

function NavBar({ onLogout }) {

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => onLogout())
  }

  return (
    <NavUnlisted>
      <NavLink to='/'>
        <li>
          <span>Math Test Gen</span>
          <img src={logo} className='nav-img' alt='logo'/>
        </li>
      </NavLink>
      <NavLink to='/test'>
        <li>Tests</li>
      </NavLink>
      <NavLink to='/'>
        <li onClick={handleLogout}>Logout</li>
      </NavLink>
    </NavUnlisted>
  );
}

export default NavBar