import React from 'react'

function Test() {


  return (
    <div>
      <form>
        <label>Title: </label>
        <input 
          type='text'
          name='title'
          id='title' 
          required
        />
      </form>
    </div>
  )
}

export default Test