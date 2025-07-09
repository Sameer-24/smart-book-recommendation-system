import React, { useEffect, useState } from 'react';
import './Crossword.css';

function Crossword() {
  const [embedUrl, setEmbedUrl] = useState('');

  useEffect(() => {
    // Crosshare daily mini crossword embed URL
    setEmbedUrl('https://crosshare.org/embed');
  }, []);

  return (
    <div className="crossword-container">
      <h2 className="crossword-title">📘 Daily Mini Crossword</h2>
      <div className="crossword-frame">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Daily Crossword"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          'Loading...'
        )}
      </div>
      <p className="crossword-note">New crossword every 24 hours — powered by Crosshare.org</p>
    </div>
  );
}

export default Crossword;
