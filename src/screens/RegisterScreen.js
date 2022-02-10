import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions';

function RegisterScreen() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ message, setMessage ] = useState('');

  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = searchParams.get('redirect') || '/';

  const userRegister = useSelector( state => state.userRegister );
  const { error, loading, userInfo } = userRegister;

  useEffect( () => {
    if ( userInfo ) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo] );

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    }
    else {
      dispatch( register( name, email, password ) );
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}  
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account? <Link 
            to={redirect ? `login?redirect=${redirect}` : '/login'}
          >
          Sign in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen