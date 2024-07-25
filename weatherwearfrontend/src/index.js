import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import OutfitHistory from './components/OutfitHistory';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <OutfitHistory />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>,
  document.getElementById('root')
);
