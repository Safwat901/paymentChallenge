import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home';
import Register from './Register';
import Payment from './Payment';
import Completion from './Completion';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        <Route path='/completion' element={<Completion />}></Route>

      </Routes>


    </BrowserRouter>

  );
}

export default App;
