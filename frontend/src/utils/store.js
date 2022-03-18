import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '../reducers/authReducer';
import userReducer from '../reducers/userReducer';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
