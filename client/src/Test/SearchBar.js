import React, { useState } from 'react'
import styled from 'styled-components'
import searchIcon	from './Icons/searchIcon.png'

const StyledForm = styled.form`
	display: flex;
	align-items: center;
	padding-left: 10px;
	margin: 0 0 0 20px;
	width: 30%;
	border: 1px solid ${props => props.theme.colors.purple};
	border-radius: 20px;

	&:focus {
		box-shadow: 0 0 3px 0 #1183d6;
  	border-color: #1183d6;
		outline: pink;
	}
`
const StyledSearchBar = styled.input`
	border: none;
	background: transparent;
	margin: 0 0px 0 20px;
  padding: 7px 8px 8px 0px;
	width: fit-content;
  font-family: Roboto;
  font-size: large;

	&:focus {
		border: none;
		outline: none;
	}
`

function SearchBar({ onSearchChange }) {
	const [searchText, setSearchText] = useState("")

	function handleSearchChange(text) {
		setSearchText(text)
		onSearchChange(text)
	}

  return (
    <div style={{'padding': '10px 0px'}}>
			<StyledForm>
						<img src={searchIcon}></img>
						<StyledSearchBar 
							type='text'
							placeholder='Search tests...'
							value={searchText}
							onChange={(e) => handleSearchChange(e.target.value)}
						/>
			</StyledForm>
		</div>
  )
}

export default SearchBar