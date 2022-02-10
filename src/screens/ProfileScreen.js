import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ message, setMessage ] = useState('');

  //const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const redirect = searchParams.get('redirect') || '/';

  const userLogin = useSelector( state => state.userLogin );
  const { userInfo } = userLogin;

  const userDetails = useSelector( state => state.userDetails );
  const { error, loading, user } = userDetails;

  const userUpdateProfile = useSelector( state => state.userUpdateProfile );
  const { success } = userUpdateProfile;

  useEffect( () => {
    if ( !userInfo ) {
      navigate('/login');
    }
    else {
      if (!user || !user.name || success) {
        dispatch( {type: USER_UPDATE_PROFILE_RESET} );
        dispatch( getUserDetails('profile') );
      }
      else {
        setName( user.name );
        setEmail( user.email );
      }
    }
  }, [navigate, dispatch, userInfo, user, success] );

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    }
    else {
      dispatch( updateUserProfile({
        'id': user._id,
        'name': name,
        'email': email,
        'password': password
      }) );
      setMessage('');
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
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
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}  
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={8}>
        <h2>My Orders</h2>
      </Col>
    </Row>    
  )
}

export default ProfileScreen