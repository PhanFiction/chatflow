import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
import './index.css';
import App from './App';
// import store from './utils/store';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
