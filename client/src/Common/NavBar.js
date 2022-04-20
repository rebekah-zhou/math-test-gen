import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NewTest from '../NewTest/NewTest'
import styled from "styled-components";

const StyledTitle = styled.span`
  font-family: 'Lobster';
  font-weight: 300;
  font-size: xx-large;
`

const NavUnlisted = styled.ul`
  display: flex;
  justify-content: space-between;
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
    padding: 0rem 1rem;
    font-size: 1.3rem;
    font-weight: bold;
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
    color: inherit;
    font-size: inherit;
    padding: 0;
    margin: 0;
  }

  li > span {
    font-weight: bold;
    display: flex;
    align-items: center;
    height: 40px;
  }

  .nav-img {
    height: 28px;
    width: auto;
  }

`

function NavBar({ onLogout, user }) {

  console.log(user)
  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => onLogout())
  }


  return (
    <>
    <NavUnlisted>
      <NavLink to='/'>
        <li>
          <StyledTitle> Math Test Gen </StyledTitle>
        </li>
      </NavLink>
      <div className='horizontal'>
          <li>
            <NewTest />
          </li>
          <NavLink to='/test'>
            <li> <span>Tests</span> </li>
          </NavLink>
        <li>
          <button onClick={handleLogout}>
          Logout
          </button>
        </li>
      </div>
    </NavUnlisted>
    </>
  );
}

export default NavBar