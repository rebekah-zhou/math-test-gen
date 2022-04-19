import React, { useContext, useEffect, useState } from 'react'
import QuestionItem from './QuestionItem'

function TestSection({ test }) {

console.log(test)
  return (
    <div className='vertical'>
      <p>Instructions: Solve for the unknown variable.</p>
      <ol>
        {/* {questions?.map(question => {
          return <QuestionItem key={question.id} question={question}/>
        })} */}
      </ol>
    </div>
  )
}

export default TestSection