import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authors } from '../data/authors';
import './AuthorDetails.css';

const AuthorDetails = () => {
  const { authorSlug } = useParams();
  const navigate = useNavigate();

  const author = authors.find((a) => a.slug === authorSlug);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!author) return;

    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/author-books?name=${encodeURIComponent(author.name)}`,
          { withCredentials: true }
        );

        const docs = res.data.docs;

        const booksData = docs
          .filter((doc) => doc.title)
          .slice(0, 10)
          .map((book) => ({
            title: book.title,
            cover: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : 'https://via.placeholder.com/150x220?text=No+Cover',
          }));

        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [author]);

  if (!author) {
    return <div className="author-not-found">❌ Author not found.</div>;
  }

  return (
    <div className="author-details-container">
      <div className="author-details-content">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="author-header">
          <img src={author.image} alt={author.name} className="author-image" />
          <div className="author-info">
            <h1 className="author-name">{author.name}</h1>
            <p className="author-bio">{author.bio}</p>
          </div>
        </div>

        <h2 className="books-heading">Top 10 Books</h2>

        {loading ? (
          <p className="loading">Loading books...</p>
        ) : (
          <div className="books-grid">
            {books.map((book, idx) => (
              <div key={idx} className="book-card">
                <img src={book.cover} alt={book.title} className="book-cover" />
                <p className="book-title">{book.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDetails;
