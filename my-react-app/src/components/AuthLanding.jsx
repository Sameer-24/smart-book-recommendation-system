// src/components/AuthLanding.jsx
import React from 'react';
import './AuthLanding.css';
import { useNavigate } from 'react-router-dom';

function AuthLanding() {
  const navigate = useNavigate();

  return (
    <div className="auth-landing-wrapper">

      <main className="auth-landing text-center" role="main">
        <h1 className="mb-4">Welcome to SmartGuide</h1>
        <p className="mb-4">Discover, explore, and get recommendations tailored to your reading interests.</p>
        <div>
          <button className="btn btn-primary me-3" onClick={() => navigate('/login')}>
            Sign In
          </button>
          <button className="btn btn-outline-primary" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </main>
    </div>
  );
}

export default AuthLanding;
