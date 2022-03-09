import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '../reducers/authReducer';
import userReducer from '../reducers/userReducer';
import socketReducer from '../reducers/socketReducer';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  socket: socketReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
