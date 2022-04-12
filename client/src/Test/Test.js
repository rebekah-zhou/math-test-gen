import React, { useState } from 'react'
import TestForm from './TestForm'
import TestView from './TestView'
import styled from 'styled-components'



function Test() {

  return (
    <div className='horizontal'>
      <TestForm />
      <TestView />
    </div>
  )
}

export default Test