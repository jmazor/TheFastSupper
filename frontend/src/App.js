import React, { useState } from 'react';
import './App.css';
import './custom.css';
import LoginPage from './pages/LoginPage';
import LoggedInPage from './pages/LoggedInPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<LoggedInPage />} />
      </Routes>
    </Router>
  );
}


export default App;
