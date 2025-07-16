import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './nav.css';

function Navbar() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLitPlay, setShowLitPlay] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const litPlayRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const genreColumns = [
    {
      title: "Fiction & Literature",
      items: ["Literature & Fiction", "Romance", "Science Fiction & Fantasy", "Mystery, Thriller & Suspense"]
    },
    {
      title: "Learning & Education",
      items: ["Education & Teaching", "Test Preparation", "Reference", "Computers & Technology"]
    },
    {
      title: "Lifestyle",
      items: ["Cookbooks, Food & Wine", "Crafts, Hobbies & Home", "Self-Help", "Travel"]
    },
    {
      title: "Health & Society",
      items: ["Medical Books", "Health, Fitness & Dieting", "Parenting & Relationships", "Gay & Lesbian"]
    },
    {
      title: "Creative Arts",
      items: ["Arts & Photography", "Comics & Graphic Novels", "Humor & Entertainment"]
    },
    {
      title: "Spiritual & History",
      items: ["Religion & Spirituality", "History", "Christian Books & Bibles"]
    },
    {
      title: "Kids & Teens",
      items: ["Children's Books", "Teen & Young Adult"]
    },
    {
      title: "Professional",
      items: ["Business & Money", "Law", "Politics & Social Sciences", "Engineering & Transportation"]
    },
    {
      title: "Other",
      items: ["Biographies & Memoirs", "Sports & Outdoors", "Calendars", "Science & Math"]
    }
  ];

  const handleGenresClick = (e) => {
    e.preventDefault();
    if (showMegaMenu) return;
    setShowDropdown(!showDropdown);
  };

  const openMegaMenu = () => {
    setShowDropdown(false);
    setShowMegaMenu(true);
  };

  const closeMegaMenu = () => {
    setShowMegaMenu(false);
    setShowDropdown(false);
  };

  const handleLogout = async () => {
  await fetch('http://localhost:5000/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  window.location.href = '/login'; // or use navigate()
};


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !dropdownRef.current?.contains(event.target) &&
        !profileRef.current?.contains(event.target) &&
        !litPlayRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
        setShowMegaMenu(false);
        setShowProfileDropdown(false);
        setShowLitPlay(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand text-white fw-bold custom-font" href="/">
          <img src="/assets/cover.png" alt="SmartGuide Logo" style={{ height: '45px', marginRight: '10px' }} />
          SmartGuide
        </a>

        {/* Mobile Toggle */}
        <button className="navbar-toggler d-lg-none" type="button" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className={`collapse navbar-collapse ${showMobileMenu ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Recommendations</a>
            </li>

            {/* Genres Dropdown */}
            <li className="nav-item dropdown position-static" ref={dropdownRef}>
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" onClick={handleGenresClick}>
                Genres
              </a>

              <AnimatePresence>
                {showDropdown && !showMegaMenu && (
                  <motion.ul
                    className="dropdown-menu show"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <li><a className="dropdown-item" href="#">Science Fiction and Fantasy</a></li>
                    <li><a className="dropdown-item" href="#">Romance</a></li>
                    <li>
                      <button
                        className="dropdown-item fw-semibold"
                        style={{ color: '#0d6efd', background: 'transparent', border: 'none' }}
                        onClick={openMegaMenu}
                      >
                        More genres...
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showMegaMenu && (
                  <motion.div
                    className="mega-menu container-fluid"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="row">
                      {genreColumns.map((col, i) => (
                        <div className="col" key={i}>
                          <h6 className="mega-heading">{col.title}</h6>
                          {col.items.map((item, idx) => (
                            <a href="#" key={idx}>{item}</a>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="text-end mt-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={closeMegaMenu}>
                        Close genres
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* LitPlay Hover Dropdown */}
            <li
              className="nav-item dropdown position-relative"
              ref={litPlayRef}
              onMouseEnter={() => setShowLitPlay(true)}
              onMouseLeave={() => setShowLitPlay(false)}
            >
              <div className="nav-link text-white" role="button">
                LitPlay
              </div>
              <AnimatePresence>
                {showLitPlay && (
                  <motion.ul
                    className="dropdown-menu show position-absolute"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <li><a className="dropdown-item" href="/Crossword">Crossword</a></li>
                    <li><a className="dropdown-item" href="/DailyQuiz">Daily Quiz</a></li>
                    <li><a className="dropdown-item" href="/book-bingo">Book Bingo</a></li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li className="nav-item">
                <Link to="/top-picks" className="nav-link text-light">
                Top Picks
              </Link>
            </li>
          </ul>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="ms-3 position-relative">
            <div
              className="bg-white text-dark fw-bold rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
            </div>

            {showProfileDropdown && (
              <div className="position-absolute end-0 mt-2 bg-white p-3 rounded shadow" style={{ zIndex: 999 }}>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-dark text-white fw-bold rounded-circle d-flex justify-content-center align-items-center me-2"
                    style={{ width: '40px', height: '40px' }}>
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <strong>{user?.name || 'User'}</strong>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>{user?.email}</div>
                  </div>
                </div>

                <ul className="list-unstyled mb-2">
                    <li><Link className="dropdown-item" to="/community" style={{ color: '#000000', fontWeight: '300' }}>Community Talks</Link></li>
                    <li><Link to="/factshelf" className="dropdown-item" style={{ color: '#000000', fontWeight: '300' }}>FactShelf</Link></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>

              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;