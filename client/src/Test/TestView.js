import React, { useState, useEffect } from 'react'
import TestSection from './TestSection'


function TestView({ test }) {

  // Another useEffect for questions
   
  if (!test) {
    return <h1></h1>
  }

  return (
    <div className="vertical">
      <h1>{`${test.title}`}</h1>
      {/* Map the sections (when there's more) */}
      <TestSection />
    </div>
  )
}

export default TestView