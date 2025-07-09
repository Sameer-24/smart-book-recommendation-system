import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './factShelf.css';

const FactShelf = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFacts = async () => {
    try {
      setLoading(true);
      const responses = await Promise.all(
        Array.from({ length: 10 }).map(() =>
          axios.get('http://numbersapi.com/random/trivia?json', {
            baseURL: '',
            withCredentials: false,
          })
        )
      );
      const factTexts = responses.map(res => res.data.text);
      setFacts(factTexts);
    } catch (err) {
      console.error('❌ Error fetching facts:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  const handleReload = () => {
    setRefreshing(true);
    fetchFacts();
  };

  return (
    <div className="fact-shelf-container">
      <h2>📚 Daily Trivia Facts</h2>
      <button className="reload-button" onClick={handleReload} disabled={refreshing}>
        {refreshing ? 'Refreshing...' : '🔁 Reload Facts'}
      </button>

      {loading ? (
        <p>Loading facts...</p>
      ) : (
        <ul className="fact-list">
          {facts.map((fact, index) => (
            <li key={index} className="fade-in">
              🔸 {fact}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FactShelf;
