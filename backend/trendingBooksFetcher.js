const axios = require('axios');
const Book = require('./models/TrendingBook');
require('dotenv').config();

async function fetchTrendingBooks() {
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=18&key=${apiKey}`;
    const { data } = await axios.get(url);

    const trending = data.items.map(item => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.[0] || 'Unknown',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      infoLink: item.volumeInfo.infoLink || '',
      description: item.volumeInfo.description || '',
    }));

    if (trending.length === 18) {
      await Book.deleteMany({});
      await Book.insertMany(trending);
      console.log('✅ Trending books updated.');
    } else {
      console.warn(`⚠️ Only ${trending.length} books fetched. Skipping DB update to avoid data loss.`);
    }
  } catch (err) {
    console.error('❌ Google Books fetch error:', err.message);
  }
}

module.exports = fetchTrendingBooks;
