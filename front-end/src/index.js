import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login';
import './index.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { BrowserRouter, Routes, Route } from "react-router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
);

