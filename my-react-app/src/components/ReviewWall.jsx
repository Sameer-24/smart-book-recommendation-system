// src/components/ReviewWall.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './ReviewWall.css';

const socket = io('http://localhost:5000'); // ✅ Replace with deployed server if needed

function ReviewWall() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: '', book: '', text: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('❌ Failed to fetch reviews:', err));

    socket.on('new-review', (review) => {
      setReviews(prev => [review, ...prev].slice(0, 8));
    });

    return () => socket.off('new-review');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, book, text } = newReview;
    if (!user.trim() || !book.trim() || !text.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/reviews', { // ✅ FIXED URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });

      const savedReview = await res.json();

      // ✅ Optional: show instantly if server returns success
      socket.emit('new-review', savedReview);

      setNewReview({ user: '', book: '', text: '' });
    } catch (err) {
      console.error('❌ Failed to submit review:', err);
    }
  };

  return (
    <div className="review-wall">
      <h2 className="review-title">💬 Mini Review Wall</h2>

      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Book name"
          value={newReview.book}
          onChange={(e) => setNewReview({ ...newReview, book: e.target.value })}
        />
        <input
          type="text"
          placeholder="Your review"
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="review-marquee">
        <div className="review-track">
          {reviews.map((review, index) => (
            <div className="review-box" key={index}>
              <span role="img" aria-label="quote">💬</span> “{review.text}”
              <div className="review-author">— {review.user} on <em>{review.book}</em></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewWall;
