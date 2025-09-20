import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
      <Link to='/' className='btn btn-outline-dark rounded-pill px-4'>
  ← Take Me Home
</Link>

      )}
 <h1
  style={{
    fontWeight: '900',
    fontSize: '3rem',
    background: 'linear-gradient(to right, #3aaabdff, #dd2476, #d4e5eaff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: '',
    textShadow: '2px 2px 10px rgba(227, 240, 243, 0.2)',
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
  }}
  onMouseOver={e => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.textShadow = '4px 4px 20px rgba(0,0,0,0.3)';
  }}
  onMouseOut={e => {
    e.target.style.transform = 'scale(1)';
    e.target.style.textShadow = '2px 2px 10px rgba(0,0,0,0.2)';
  }}
>
  Latest Products
</h1>


      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
