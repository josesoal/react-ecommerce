import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'

function HomeScreen() {
  const dispatch = useDispatch()
  const [ searchParams ] = useSearchParams();
  const keyword_param = searchParams.get('keyword')
  const page_param = searchParams.get('page')
  
  const productList = useSelector( state => state.productList )
  const { products, loading, error, page, pages } = productList

  useEffect( () => {
    dispatch( listProducts(keyword_param, page_param) )

  }, [dispatch, keyword_param, page_param] )

  return (
    <div>
      {!keyword_param && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
        <Row>
          {products.map( product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ) )}
        </Row>
        <Paginate keyword={keyword_param} page={page} pages={pages} />
        </div>
      )
      }
    </div>
  );
}

export default HomeScreen;
