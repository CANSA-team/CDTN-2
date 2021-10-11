import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import sliderReducer from './sliderReducer';
import commentReducer from './commentReducer';
import cartReducer from './cartReducer';
import shopReducer from './shopReducer';
import accessReducer from './accessReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
   productReducer,
   categoryReducer,
   cartReducer,
   sliderReducer,
   commentReducer,
   shopReducer,
   accessReducer,
   userReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>