// src/components/TopAuthors.jsx
import React from 'react';
import './topAuthors.css';
import { useNavigate } from 'react-router-dom';

// Add a slug for each author (used in URL)
const topAuthors = [
  { name: 'William Shakespeare', image: '/assets/43 Life-Changing Books You Need To Read.jpeg', slug: 'william-shakespeare' },
  { name: 'J.K. Rowling', image: '/assets/J_K Rowling.jpeg', slug: 'j-k-rowling' },
  { name: 'George Orwell', image: '/assets/George Orwell.jpeg', slug: 'george-orwell' },
  { name: 'Jane Austen', image: '/assets/jane.jpeg', slug: 'jane-austen' },
  { name: 'Agatha Christie', image: '/assets/agatha.jpeg', slug: 'agatha-christie' },
  { name: 'Stephen King', image: '/assets/step.jpeg', slug: 'stephen-king' },
  { name: 'Mark Twain', image: '/assets/mark.jpeg', slug: 'mark-twain' },
  { name: 'Ernest Hemingway', image: '/assets/ern.jpeg', slug: 'ernest-hemingway' },
  { name: 'J.R.R. Tolkien', image: '/assets/hap.jpeg', slug: 'jrr-tolkien' },
  { name: 'Charles Dickens', image: '/assets/download.jpeg', slug: 'charles-dickens' },
  { name: 'Leo Tolstoy', image: '/assets/Leo Tolstoy.jpeg', slug: 'leo-tolstoy' },
  { name: 'Haruki Murakami', image: '/assets/download (1).jpeg', slug: 'haruki-murakami' },
];

function TopAuthors() {
  const navigate = useNavigate();

  const handleAuthorClick = (slug) => {
    navigate(`/hall-of-fame/${slug}`);
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
              onClick={() => handleAuthorClick(author.slug)}
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
