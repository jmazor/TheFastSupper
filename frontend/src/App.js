import React, { useState } from 'react';
import './App.css';
import './custom.css';
import LoginPage from './pages/LoginPage';
import LoggedInPage from './pages/LoggedInPage';
import Scrambled from './components/Scrambled';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<LoggedInPage />} />
        <Route path="/scrambled" element={<Scrambled />} />
      </Routes>
    </Router>
  );
}


export default App;
