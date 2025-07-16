import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RankedBookCard from './RankedBookCard';
import './topPicks.css';

const TopPicksSection = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/google/top-picks')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const currentWeek = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="top-picks-heading"> {/* mt-16 shifts data down */}
      <h2 className="text-3xl font-bold text-center mb-6">This Week’s Book World Buzz</h2>
      <Slider {...settings}>
        {books.map((book, index) => (
          <div key={book.id} className="px-3">
            <RankedBookCard book={book} rank={index + 1} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopPicksSection;
