import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from './Home';
import AuthLanding from './AuthLanding';

function HomeRedirect() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated === undefined) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthLanding />;
  }

  if (user && !user.signupComplete) {
    // 🚨 User is logged in but hasn't finished onboarding
    return <Navigate to="/favorite-onboarding" replace />;
  }

  return <Home />;
}

export default HomeRedirect;
