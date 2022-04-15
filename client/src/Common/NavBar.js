import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from './math-test.png'
import styled from "styled-components";

const NavUnlisted = styled.ul`
  display: flex;
  background-color: ${props => props.theme.colors.darkPurple};
  a {
    text-decoration: none;
  }
  padding: 1rem;

  li {
    color: ${props => props.theme.colors.white};
    margin: 0 0.8rem;
    padding: 0 1rem;
    font-size: 1.3rem;
    list-style: none;
    display: flex;
    justify-content: center;
    align-content: center;
    
  &:hover{
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.orchid};
    border-radius: 20px;
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

function NavBar({ onLogout, user }) {
  const id = 5
  console.log(user)
  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => onLogout())
  }

  return (
    <NavUnlisted>
      <NavLink to='/'>
        <li>
          <span> Math Test Gen </span>
          <img src={logo} className='nav-img' alt='logo'/>
        </li>
      </NavLink>
      <NavLink to={`/test/${id}`}>
        <li>
          Create New Test
        </li>
      </NavLink>
      <NavLink to='/test'>
        <li> Tests </li>
      </NavLink>
      <NavLink to='/'>
        <li onClick={handleLogout}> Logout </li>
      </NavLink>
    </NavUnlisted>
  );
}

export default NavBar