import { combineReducers } from "redux";
import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer
})

export default rootReducer;
