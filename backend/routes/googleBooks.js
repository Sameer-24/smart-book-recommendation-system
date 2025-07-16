const express = require('express'); 
const axios = require('axios');
require('dotenv').config(); // Load env vars

const router = express.Router();

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const GOOGLE_API_KEY = process.env.GOOGLE_BOOKS_API_KEY; // Now using env var

router.get('/top-picks', async (req, res) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}`, {
      params: {
        q: 'subject:fiction',
        orderBy: 'relevance',
        maxResults: 10,
        key: GOOGLE_API_KEY
      }
    });

    const books = response.data.items.map((item) => {
      const volume = item.volumeInfo;
      return {
        id: item.id,
        title: volume.title,
        author: volume.authors?.[0] || 'Unknown',
        rating: volume.averageRating || 'N/A',
        coverUrl: volume.imageLinks?.thumbnail || '',
        description: volume.description || '',
        publishedDate: volume.publishedDate || ''
      };
    });

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching top picks:', error.message);
    res.status(500).json({ message: 'Failed to fetch top picks' });
  }
});

module.exports = router;
