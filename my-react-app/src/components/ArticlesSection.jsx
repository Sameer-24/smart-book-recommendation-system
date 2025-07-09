// ArticlesSection.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './articles.css';

const socket = io('http://localhost:5000');

function ArticlesSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles')

      .then((res) => res.json())
      .then((data) => setArticles(data.slice(0, 13)));

    socket.on('new-article', (newArticle) => {
      setArticles((prev) => [newArticle, ...prev].slice(0, 13));
    });

    return () => socket.off('new-article');
  }, []);

  if (!articles.length) return null;

  return (
    <div className="articles-section ">
      <h2 className="section-title">Latest Articles</h2>

      {/* Main Article */}
      <div className="featured-article-wrapper no-image">
        <div className="featured-article-content">
          <h2>{articles[0].title}</h2>
          <p className="desc">{articles[0].desc}</p>
          <a
            className="read-more-btn"
            href={articles[0].link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More →
          </a>
        </div>
      </div>

      {/* Small Articles */}
      <div className="small-articles-grid no-image">
        {articles.slice(1).map((article, idx) => (
          <div className="small-article-card no-image" key={article._id || idx}>
            <div className="small-article-info">
              <h5>{article.title}</h5>
              <p className="desc">{article.desc}</p>
              <a
                className="read-more-sm"
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesSection;
