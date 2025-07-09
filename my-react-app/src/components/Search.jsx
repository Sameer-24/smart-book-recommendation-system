// src/components/Search.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import BackgroundCanvas from './BackgroundCanvas'; // ✅ background canvas import
import './search.css';

function Search() {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState('');

  // ✅ Redirect unauthenticated users
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="search-container">
      <BackgroundCanvas /> {/* ✅ background animation */}

      <div className="search-content">
        <div className="search-box">
          <input
            type="text"
            placeholder="Let's start..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="ask-btn">?</button>
        </div>

        {/* 🔍 Optional: space for suggestions */}
        {/* <ul className="suggestions-list">...</ul> */}
      </div>
    </div>
  );
}

export default Search;
