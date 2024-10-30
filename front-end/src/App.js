import React from 'react';
import CreateUserForm from './form';
import ListUsers from './ListUsers';
import LoginForm from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConductorDashboard from './ConductorDashboard';
import PasajeroDashboard from './PasajeroDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/conductor-dashboard" element={<ConductorDashboard />} />
        <Route path="/pasajero-dashboard" element={<PasajeroDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;