import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ postalCode, setPostalCode ] = useState('');
  const [ country, setCountry ] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector( state => state.cart);
  const { shippingAddress } = cart;

  useEffect( () => {
    setAddress( shippingAddress.address );
    setCity( shippingAddress.city );
    setPostalCode( shippingAddress.postalCode );
    setCountry( shippingAddress.country );
  }, [] );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch( saveShippingAddress({
      address, city, postalCode, country
    }) );

    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)} 
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)} 
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}  
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}  
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen