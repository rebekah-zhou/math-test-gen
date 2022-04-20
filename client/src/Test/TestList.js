import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../App'
import TestItem from './TestItem'
import SearchBar from './SearchBar'

const FlexGridDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px 20px;
`
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 20px;
`
const TitleDiv = styled.div`
  display: flex;
  gap: 10px;
`
const ColumnHeaderDiv = styled.div`
  display: flex;
  gap: 50px;
`
const ColumnDiv = styled.div`
  flex: 1;
`
const ColumnHeaderSpan = styled.span`
  font-family: Lato, sans-serif;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`
const IconSpan = styled(ColumnHeaderSpan)`
	width: 200px;
`
const OwnerSpan = styled(ColumnHeaderSpan)`
	width: 75px;
`
const DateSpan = styled(ColumnHeaderSpan)`
	width: 125px;
`
const StyledHr = styled.hr`
  margin: -10px 20px;
  border-top: 0.01px;
  border-color: rgba(0,0,0,0.1);
`

function TestList() {
  const [tests, setTests] = useState([])
  const [searchedTests, setSearchedTests] = useState([])
  const user = useContext(UserContext)

 useEffect(() => {
  if (user) {
    fetch(`/users/${user.id}/tests`)
    .then(r => r.json())
    .then(testData => {
      setTests(testData)
      setSearchedTests(testData)
    }
  )}}, [])

  function onSearchChange(text) {
    const newTests = []
    tests.forEach(test => {
      if (test.title.toLowerCase().includes(text.toLowerCase())){
        newTests.push(test)
      }
    })
    setSearchedTests(newTests)
  }

  return (
    <>
    <FlexGridDiv>
      <ColumnDiv><SearchBar onSearchChange={onSearchChange}/></ColumnDiv>
      <ColumnDiv>
        <RowDiv>
          <TitleDiv>
            <input type='checkbox'/>
            <ColumnHeaderSpan>Title</ColumnHeaderSpan>
          </TitleDiv>
          <ColumnHeaderDiv>
            <OwnerSpan>Owner</OwnerSpan>
            <DateSpan>Last Modified</DateSpan>
            <IconSpan>Actions</IconSpan>
          </ColumnHeaderDiv>
        </RowDiv>
      </ColumnDiv>
      <ColumnDiv><StyledHr/></ColumnDiv>
      {searchedTests?.map(test => {
        return <><TestItem key={test.id} test={test} /><ColumnDiv><StyledHr/></ColumnDiv> </>
      })}
    </FlexGridDiv>
    </>
  )
}

export default TestList