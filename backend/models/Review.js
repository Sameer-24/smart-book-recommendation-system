const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: String,
  book: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
