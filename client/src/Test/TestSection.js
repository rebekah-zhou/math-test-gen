import React, { useContext, useEffect, useState } from 'react'
import { QuestionsContext } from './Test'
import QuestionItem from './QuestionItem'

function TestSection({ instructions="" }) {
  const questions = useContext(QuestionsContext)
 
  console.log(questions)

  return (
    <div className='vertical'>
      <p>Instructions: {instructions || "Solve."}</p>
      <ol>
        {questions?.map(question => {
          return <QuestionItem key={question.id} question={question}/>
        })}
      </ol>
    </div>
  )
}

export default TestSection