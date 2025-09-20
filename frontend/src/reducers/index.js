import { combineReducers } from 'redux'
import { productRecommendedReducer } from './productReducers'
// ...import other reducers

const reducer = combineReducers({
  // ...other reducers
  productRecommended: productRecommendedReducer,
})

export default reducer