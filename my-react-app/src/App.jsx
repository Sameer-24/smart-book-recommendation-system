import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AuthLanding from './components/AuthLanding';
import FavoriteOnboarding from './components/FavoriteOnboarding';
import Crossword from './components/Crossword';
import DailyQuiz from './components/DailyQuiz';
import BingoBoard from './components/BingoBoard';
import Terms from './components/Terms';
import ProtectedRoute from './components/ProtectedRoute';
import HomeRedirect from './components/HomeRedirect';
import FactShelf from './components/FactShelf';
import CommunityTalks from './components/CommunityTalks';

import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        {/* Auth Pages with Container Layout */}
        <Route path="/login" element={<div className="container mt-4"><Login /></div>} />
        <Route path="/signup" element={<div className="container mt-4"><Signup /></div>} />
        <Route path="/terms" element={<div className="container mt-4"><Terms /></div>} />

        {/* Other Full-Width Pages */}
        <Route path="/favorite-onboarding" element={<FavoriteOnboarding />} />
        <Route path="/crossword" element={<ProtectedRoute><Crossword /></ProtectedRoute>} />
        <Route path="/dailyquiz" element={<ProtectedRoute><DailyQuiz /></ProtectedRoute>} />
        <Route path="/book-bingo" element={<ProtectedRoute><BingoBoard /></ProtectedRoute>} />
        <Route path="/factshelf" element={<ProtectedRoute><FactShelf /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityTalks /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<h3 className="text-center mt-5">404 - Page Not Found</h3>} />
      </Routes>
    </Router>
  );
}

export default App;
