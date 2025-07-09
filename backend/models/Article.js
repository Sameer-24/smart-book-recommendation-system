const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  desc: String,
  link: String, // ✅ Must be here
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);
