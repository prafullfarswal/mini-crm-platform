import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SegmentBuilder from './components/SegmentBuilder';
import CampaignHistory from './components/CampaignHistory';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId="your_google_oauth_client_id_here">
      <AuthProvider>
        <Router>
          <div className="App">
            <AppContent />
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path="/segment-builder" 
          element={user ? <SegmentBuilder /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/campaign-history" 
          element={user ? <CampaignHistory /> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  );
}

export default App;