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
    position: relative;
    list-style: none;
    
  &:hover{
    color: lightblue;
  }
  }

  .nav-img {
    height: 100px;
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
      <NavLink to='/home'>
        <li><img src={logo} className='nav-img' alt='logo'/></li>
      </NavLink>
      <NavLink to='/test'>
        <li>Tests</li>
      </NavLink>
      <NavLink to='/home'>
        <li onClick={handleLogout}>Logout</li>
      </NavLink>
    </NavUnlisted>
  );
}

export default NavBar