import React, {useState} from 'react'
import styled from 'styled-components'
import deleteIcon from './Icons/deleteIcon.png'
import downloadIcon from './Icons/downloadIcon.png'
import copyIcon from './Icons/copyIcon.png'

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

function TestItem({ test, onDelete }) {
  const [isTestSelected, setIsTestSelected] = useState(false)

  function handleDelete() {
	fetch(`tests/${test.id}`, {
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
				<a href={`/test/${test.id}`}>{test.title}</a>
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