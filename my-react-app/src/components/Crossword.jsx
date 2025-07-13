import React, { useEffect, useState } from 'react';
import './Crossword.css';

function Crossword() {
  const [embedUrl, setEmbedUrl] = useState('');

  useEffect(() => {
    setEmbedUrl('https://crosshare.org/embed');
  }, []);

  return (
    <div className="crossword-container">
      <h2 className="crossword-title">📘 Daily Mini Crossword</h2>

      <div className="crossword-instructions">
        <h3>How to Start:</h3>
        <ol>
          <li>Click on the angry bunny inside the box below.</li>
          <li>Under the <strong>“Daily Mini”</strong> tab, click on today’s daily mini crossword.</li>
          <li>Then click on <strong>“Begin Puzzle”</strong>.</li>
        </ol>
      </div>

      <div className="crossword-frame">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Daily Crossword"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="loading-text">Loading puzzle...</p>
        )}
      </div>

      <p className="crossword-note">🧩 A new crossword appears every 24 hours — powered by <a href="https://crosshare.org" target="_blank" rel="noreferrer">Crosshare</a></p>
    </div>
  );
}

export default Crossword;
