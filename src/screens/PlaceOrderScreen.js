import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {
  const [ itemsPrice, setItemsPrice] = useState('');
  const [ shippingPrice, setShippingPrice] = useState('');
  const [ taxPrice, setTaxPrice] = useState('');
  const [ totalPrice, setTotalPrice] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector( state => state.cart );
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const orderCreate = useSelector( state => state.orderCreate );
  const { order, error, success } = orderCreate;

  if ( !paymentMethod ) {
    navigate('/payment');
  }
 
  useEffect( () => {
    setItemsPrice( cartItems.reduce( 
      (acc, item) => acc + item.price * item.qty, 0 
    ).toFixed(2) );

    setShippingPrice( (itemsPrice > 100 ? 0 : 10).toFixed(2) );
    setTaxPrice( (0.082 * itemsPrice).toFixed(2) );
    setTotalPrice( (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2) );  

  }, [cartItems, itemsPrice, shippingPrice, taxPrice] );

  useEffect( () => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, navigate] );

  const placeOrder = (e) => {
    dispatch( createOrder({
      orderItems: cartItems,
      'shippingAddress': shippingAddress,
      'paymentMethod': paymentMethod,

      'itemsPrice': itemsPrice,
      'shippingPrice': shippingPrice,
      'taxPrice': taxPrice,
      'totalPrice': totalPrice
    }) ) 
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong> 
                {shippingAddress.address}, {' '} 
                {shippingAddress.city} {' '}
                {shippingAddress.postalCode}, {' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> 
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
               
              {cart.cartItems.length === 0 ? (
                <Message variant='info'>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map( (item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        
                        <Col md={4}>
                          {item.qty} x $ {item.price} = $ {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Item: </Col>
                  <Col>$ {itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>$ {shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>$ {taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>$ {totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  disabled={cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen