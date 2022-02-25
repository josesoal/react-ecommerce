import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`)
    }
    else {
      /* do nothing, stay in the same page */
    }
  }

  return (
    <div>
      <Form className='d-flex' onSubmit={submitHandler}>
        <Form.Control 
          type="text" 
          placeholder="Enter some words"
          className='m-2'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button 
          variant="secondary" 
          type="submit"
          className='my-2 mr-2'
        >
          Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchBox