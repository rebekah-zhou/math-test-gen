import React, { useContext, useEffect, useState } from 'react'
import QuestionItem from './QuestionItem'

function TestSection({ section }) {

  console.log(section)
  const questions = section.questions 
  console.log(questions)

  return (
    <div className='vertical'>
      <p>Standard: {`${section.instructions}`}</p>
      <ol>
        {questions?.map(question => {
          return <QuestionItem key={question.id} question={question}/>
        })}
      </ol>
    </div>
  )
}

export default TestSection