import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RankedBookCard from './RankedBookCard';
import './topPicks.css';

const TopPicksSection = () => {
  const [books, setBooks] = useState([]);
  const [surpriseBook, setSurpriseBook] = useState(null);

  // Fetch top picks from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/google/top-picks')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch a random surprise book
  const fetchSurpriseBook = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/google/top-picks/random');
      setSurpriseBook(res.data);
    } catch (err) {
      console.error('Failed to fetch surprise book', err);
    }
  };

  // Generate current week's date range
  const getWeekRange = () => {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);
    start.setDate(today.getDate() - today.getDay()); // Sunday
    end.setDate(start.getDate() + 6); // Saturday

    const formatOptions = { day: 'numeric', month: 'short' };
    return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
  };

  // Carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="top-picks-heading mt-16 px-4">
      {/* Heading with week info */}
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 drop-shadow">
        📚 Top Picks of the Week : {getWeekRange()}
      </h2>

      {/* Book Carousel */}
      <div className="carousel-container" style={{ overflowY: 'hidden' }}>
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={book.id} className="px-3">
              <RankedBookCard book={book} rank={index + 1} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Surprise Book Info Displayed Above Button */}

<div className="surprise-section">

  {surpriseBook && (
    <div className="surprise-card">
      <img src={surpriseBook.thumbnail} className="surprise-image" alt="Book Cover" />
      <h2 className="surprise-title">{surpriseBook.title}</h2>
      <p className="surprise-author">by {surpriseBook.authors?.join(', ')}</p>
      <p className="surprise-description">{surpriseBook.description}</p>
    </div>
  )}

  <button className="surprise-button" onClick={fetchSurpriseBook}>
    🎁 Surprise Me!
  </button>
</div>

    </div>
  );
};

export default TopPicksSection;
