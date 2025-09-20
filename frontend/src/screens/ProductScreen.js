import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
  listRecommendedProducts,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  // Product details
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  // User login
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Product review creation
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  // Recommended products
  const productRecommended = useSelector((state) => state.productRecommended)
  const {
    loading: loadingRecommended,
    error: errorRecommended,
    products: recommendedProducts,
  } = productRecommended || { loading: true, products: [] }

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }

    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    // ✅ Always fetch recommended when product changes
    dispatch(listRecommendedProducts(match.params.id))
  }, [dispatch, match, successProductReview, product._id])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Reviews */}
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {/* Recommended Products */}
         {/* Recommended Products */}
<Row className='mt-5'>
  <Col>
   <h2
  style={{
    fontWeight: 'bold',
    fontSize: '2rem',
    background: 'linear-gradient(to right, #36d1dc, #5b86e5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '1px 1px 5px rgba(0,0,0,0.2)',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    marginTop: '20px',
  }}
  onMouseOver={e => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.textShadow = '2px 2px 10px rgba(0,0,0,0.3)';
  }}
  onMouseOut={e => {
    e.target.style.transform = 'scale(1)';
    e.target.style.textShadow = '1px 1px 5px rgba(0,0,0,0.2)';
  }}
>
  Recommended Products
</h2>

    {loadingRecommended ? (
      <Loader />
    ) : errorRecommended ? (
      <Message variant='danger'>{errorRecommended}</Message>
    ) : recommendedProducts.length === 0 ? (
      <Message>No recommended products</Message>
    ) : (
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '15px',
          paddingBottom: '10px',
        }}
      >
        {recommendedProducts.map((rec) => (
          <Card
            key={rec._id}
            className='p-3 rounded'
            style={{
              minWidth: '220px', // ✅ ensures fixed width for scroll
              flex: '0 0 auto', // ✅ prevents shrinking
            }}
          >
            <Link to={`/product/${rec._id}`}>
              <Card.Img
                src={rec.image}
                alt={rec.name}
                style={{
                  height: '200px',
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            </Link>
            <Card.Body>
              <Link to={`/product/${rec._id}`}>
                <Card.Title as='div'>
                  <strong>{rec.name}</strong>
                </Card.Title>
              </Link>
              <Card.Text as='div'>
                <Rating value={rec.rating} text={`${rec.numReviews} reviews`} />
              </Card.Text>
              <Card.Text as='h3'>${rec.price}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    )}
  </Col>
</Row>
</>
      )}
    </>
  )
}

export default ProductScreen
