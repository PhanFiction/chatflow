import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Layout from './components/Layout';

class App extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
