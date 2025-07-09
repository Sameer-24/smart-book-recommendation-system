// src/components/QuoteOfTheDay.jsx
import React, { useEffect, useState } from 'react';
import './QuoteOfTheDay.css';

function QuoteOfTheDay() {
  const [quote, setQuote] = useState({
    text: "A reader lives a thousand lives before he dies.",
    author: "George R.R. Martin"
  });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent('https://zenquotes.io/api/today')}`
        );
        const data = await res.json();
        const parsed = JSON.parse(data.contents);

        if (Array.isArray(parsed) && parsed[0]?.q && parsed[0]?.a) {
          setQuote({
            text: parsed[0].q,
            author: parsed[0].a
          });
        }
      } catch (err) {
        console.error('❌ Failed to fetch quote:', err.message);
        // fallback quote already set
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="quote-box">
        <h3>Quote Of The Day</h3>
      <p className="quote-text">“{quote.text}”</p>
      <p className="quote-author">— {quote.author}</p>
    </div>
  );
}

export default QuoteOfTheDay;
