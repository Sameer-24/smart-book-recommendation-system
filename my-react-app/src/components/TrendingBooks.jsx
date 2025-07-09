import React, { useEffect, useState } from 'react';
import './trending.css';

function TrendingBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/trending')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('❌ Failed to fetch trending books:', err));
  }, []);

  if (books.length === 0) return null;

  return (
    <div className="trending-section ">
      <h2 className="section-title">📈 Trending Books</h2>
      <div className="trending-grid">
        {books.map((book, i) => (
          <div className="trending-card" key={i}>
            <img
              src={book.thumbnail || 'https://via.placeholder.com/150x220?text=No+Image'}
              alt={book.title}
              className="book-thumbnail"
            />
            <div className="info">
              <h5>{book.title}</h5>
              <p className="author">{book.author}</p>
              <a href={book.infoLink} target="_blank" rel="noreferrer" className="read-link">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingBooks;
