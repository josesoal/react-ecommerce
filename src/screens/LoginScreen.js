import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';


function LoginScreen() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = searchParams.get('redirect') || '/';

  const userLogin = useSelector( state => state.userLogin );
  const { error, loading, userInfo } = userLogin;

  useEffect( () => {
    /* if user logged in go to (navigate to) to the content of the
       redirect constant, which is either some other-place or 
       the HomeScreen ('/')
    */
    if ( userInfo ) {
      navigate( redirect === '/' ? redirect : '/'+redirect );
    }
  }, [navigate, redirect, userInfo] );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch( login( email, password ) );
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Costumer? <Link 
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
          Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen