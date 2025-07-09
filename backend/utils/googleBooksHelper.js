const axios = require('axios');
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

function formatBook(item) {
  const info = item.volumeInfo;
  return {
    title: info.title,
    author: info.authors?.[0] || 'Unknown',
    thumbnail: info.imageLinks?.thumbnail || '',
    infoLink: info.infoLink || '',
  };
}

async function getBookByPrompt(prompt) {
  try {
    const url = `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(prompt)}&maxResults=1&key=${API_KEY}`;
    const { data } = await axios.get(url);
    if (data.items && data.items.length > 0) {
      return formatBook(data.items[0]);
    }
  } catch (err) {
    console.error(`❌ Google API Error for prompt "${prompt}":`, err.message);
  }

  // Fallback object if API fails or no result
  return {
    title: prompt,
    author: 'Unknown',
    thumbnail: '',
    infoLink: ''
  };
}

module.exports = { getBookByPrompt };
