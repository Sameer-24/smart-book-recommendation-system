import React from 'react';

const RankedBookCard = ({ book, rank }) => {
  return (
    <div className="ranked-card relative bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 min-h-[400px]">
      <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold z-10">
        #{rank}
      </span>

      <img
        src={book.coverUrl}
        alt={book.title}
        className="book-cover w-40 h-60 object-cover rounded-md mb-4"
      />

      <div className="book-info text-center">
        <h4 className="text-lg font-semibold mb-1">{book.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <span className="rating text-yellow-500 text-sm font-medium">⭐ {book.rating}</span>
      </div>
    </div>
  );
};

export default RankedBookCard;
