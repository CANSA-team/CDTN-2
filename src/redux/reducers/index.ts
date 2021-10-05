import { combineReducers } from 'redux';
import productReducer from './productReducer';

const rootReducer = combineReducers({
   productReducer
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>