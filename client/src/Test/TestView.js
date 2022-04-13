import React, { useState, useEffect } from 'react'
import TestSection from './TestSection'


function TestView() {
  const [test, setTest] = useState({
    title: "",
    sections: [{
      instructions: ""
    }]
  })

  useEffect(() => {
    fetch('/tests/1')
    .then(r => r.json())
    .then(data => setTest(data))
  }, [])

  console.log(test)

  // Another useEffect for questions
    
  return (
    <div className="vertical">
      <h1>{`${test.title}`}</h1>
      {/* Map the sections (when there's more) */}
      <TestSection 
        instructions={test.sections[0].instructions} />
    </div>
  )
}

export default TestView