import React from 'react'
import TestSection from './TestSection'

function TestView({ questions }) {
    const { answers, content, isMultipleChoice, standard } = questions
  return (
    <div className="vertical">
        <TestSection />
    </div>
  )
}

export default TestView