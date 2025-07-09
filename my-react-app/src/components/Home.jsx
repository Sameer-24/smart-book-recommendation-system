// src/components/Home.jsx
import React from 'react';
import Search from './Search';
import { useAuth } from '../context/AuthContext';
import TopAuthors from './TopAuthor';
import ArticlesSection from './ArticlesSection';
import QuoteOfTheDay from './QuoteOfTheDay';
import './home.css';
import TrendingBooks from './TrendingBooks';
import ReviewWall from './ReviewWall';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="happy" style={{ minHeight: '100vh' }}>
      <h1 className="text-center my-5">Welcome to SmartGuide</h1>

      {isAuthenticated && (
        <>
          <div className="section-spacer"><Search /></div>
          <div className="section-spacer"><QuoteOfTheDay /></div>
          <div className="section-spacer"><TopAuthors /></div>
          <div className="section-spacer"><ArticlesSection /></div>
          <div className="section-spacer"><TrendingBooks /></div>
          <div className="section-spacer"><ReviewWall /></div>
        </>
      )}
    </div>
  );
}

export default Home;
