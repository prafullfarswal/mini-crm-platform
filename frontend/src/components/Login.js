import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { loginWithGoogle } from '../services/api';
import './Login.css';

const Login = () => {
  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await loginWithGoogle(credentialResponse.credential);
      login(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    console.log('Login Failed');
    alert('Google login failed. Please try again.');
  };

  // For development - temporary login button
  const handleDevLogin = () => {
    const userData = {
      id: 'dev-user-123',
      email: 'developer@example.com',
      name: 'Developer User'
    };
    login(userData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Mini CRM Platform</h1>
        <p>Sign in to access your customer segmentation and campaign tools</p>
        
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        {/* Development login button */}
        <div className="dev-login">
          <button onClick={handleDevLogin} className="btn-primary">
            Developer Login (For Testing)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;