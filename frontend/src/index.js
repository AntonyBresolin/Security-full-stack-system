import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './views/public/HomePage';
import { AuthProvider } from './routes/AuthProvider.js';
import User from './layouts/User.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/*" element={<User />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
