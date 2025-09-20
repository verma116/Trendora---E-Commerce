import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getRecommendedProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// 📌 Specific routes FIRST
router.get('/top', getTopProducts)
router.get('/:id/recommend', getRecommendedProducts) // ✅ now works

// 📌 Public routes
router.get('/', getProducts)
router.get('/:id', getProductById)

// 📌 Reviews
router.route('/:id/reviews').post(protect, createProductReview)

// 📌 Admin routes
router.route('/').post(protect, admin, createProduct)
router
  .route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
