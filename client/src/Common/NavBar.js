import React from 'react'
import { useAuth } from '../Auth/use-auth.js'
import { NavLink } from 'react-router-dom'
import logo from './math-test.png'
import styled from "styled-components";

const NavUnlisted = styled.ul`
  display: flex;

  a {
    text-decoration: none;
  }

  li {
    color: red;
    margin: 0 0.8rem;
    font-size: 1.3rem;
    position: relative;
    list-style: none;
  }

  .current {
    li {
      border-bottom: 2px solid black;
    }
  }

  .nav-img {
    height: 100px;
    width: auto;
  }
`;


const links = [
  {name: "Tests", path:"/test"},
  {name: "Logout", path:"/about"},
];

function NavBar() {
  return (
    <NavUnlisted>
      <NavLink to='/home'><img src={logo} className='nav-img' alt='logo'/></NavLink>
      {links.map((link, index) => (
        <NavLink key={index} to={link.path} exact activeClassName="current">
          <li>{link.name}</li>
        </NavLink>
      ))}
    </NavUnlisted>
  );
}

export default NavBar