// src/components/TopAuthors.jsx
import React from 'react';
import './topAuthors.css';

const topAuthors = [
  { name: 'William Shakespeare', image: '/assets/43 Life-Changing Books You Need To Read.jpeg' },
  { name: 'J.K. Rowling', image: '/assets/J_K Rowling.jpeg' },
  { name: 'George Orwell', image: '/assets/George Orwell.jpeg' },
  { name: 'Jane Austen', image: '/assets/jane.jpeg' },
  { name: 'Agatha Christie', image: '/assets/agatha.jpeg' },
  { name: 'Stephen King', image: '/assets/step.jpeg' },
  { name: 'Mark Twain', image: '/assets/mark.jpeg' },
  { name: 'Ernest Hemingway', image: '/assets/ern.jpeg' },
  { name: 'J.R.R. Tolkien', image: '/assets/hap.jpeg' },
  { name: 'Charles Dickens', image: '/assets/download.jpeg' },
  { name: 'Leo Tolstoy', image: '/assets/Leo Tolstoy.jpeg' },
  { name: 'Haruki Murakami', image: '/assets/download (1).jpeg' },
];

function TopAuthors() {
  const handleAuthorClick = (authorName) => {
    alert(`Display Top 10 Books of ${authorName}`);
  };

  return (
    <div className="top-authors-section">
      <div className="left-side">
        <h2> Hall of Fame</h2>
      </div>

      <div className="right-side">
        <div className="authors-grid">
          {topAuthors.map((author, index) => (
            <div
              key={index}
              className="author-img-wrapper"
              onClick={() => handleAuthorClick(author.name)}
              title={author.name}
            >
              <img src={author.image} alt={author.name} className="author-img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopAuthors;
