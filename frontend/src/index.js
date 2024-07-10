import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './views/public/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);