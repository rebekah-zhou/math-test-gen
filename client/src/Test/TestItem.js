import React, {useState} from 'react'
import styled from 'styled-components'
import deleteIcon from './Icons/deleteIcon.png'
import downloadIcon from './Icons/downloadIcon.png'
import copyIcon from './Icons/copyIcon.png'
import { useNavigate } from 'react-router-dom'
import { config } from '../Common/Constants'

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 20px;
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
const IconButton = styled.button`
	background: none;
	border: none;
`
const IconSpan = styled.span`
	width: 200px;
`
const OwnerSpan = styled.span`
	width: 75px;
`
const DateSpan = styled.span`
	width: 125px;
`
const Button = styled.button`
	background: none;
	color: black;
	border: none;
	padding: 0 0 23px 10px;
	margin: 0;

&:hover {
	text-decoration: underline;
}
`

function TestItem({ test, onDelete }) {
  const [isTestSelected, setIsTestSelected] = useState(false)
  const navigate = useNavigate()
  const url = config.url.API_URL

  function handleDelete() {
	fetch(`${url}/tests/${test.id}`, {
		method: 'DELETE'
	})
	.then(r => {
		if (r.ok) {
			onDelete(test)
		} else {
			r.json()
			.then((data) => console.log(data))
		}
	})
  }

  function handleTestClick() {
	navigate(`/math-test-gen/test/${test.id}`)
  }

  return (
    <ColumnDiv>
		<RowDiv>
			<TitleDiv>
				<input
					type='checkbox'
					name='selectTest'
					value={isTestSelected}
					onChange={() => setIsTestSelected(!isTestSelected)}
				/>
				<Button onClick={handleTestClick}>{test.title}</Button>
			</TitleDiv>
			<ColumnHeaderDiv>
				<OwnerSpan>You</OwnerSpan>
				<DateSpan>{test.updated_at.slice(0,10)}</DateSpan>
				<IconSpan>
					{/* Add functionality */}
					<IconButton><img src={copyIcon}></img></IconButton>
					<IconButton><img src={downloadIcon}></img></IconButton>
					<IconButton onClick={handleDelete}><img src={deleteIcon}></img></IconButton>
				</IconSpan>
			</ColumnHeaderDiv>
		</RowDiv>
    </ColumnDiv>
  )
}

export default TestItem