import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import User from './User';
import Product from './Product';
import Order from './Order';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product" element={<Product />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
