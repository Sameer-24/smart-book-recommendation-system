// models/TrendingBook.js
const mongoose = require('mongoose');

const trendingBookSchema = new mongoose.Schema({
  title: String,
  author: String,
  thumbnail: String,
  infoLink: String,
  description: String,
  genres: [String], // ✅ Add genres (from volumeInfo.categories)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrendingBook', trendingBookSchema);
